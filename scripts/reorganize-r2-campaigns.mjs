import { createClient } from '@supabase/supabase-js';
import { S3Client, ListObjectsV2Command, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import * as fs from 'fs';
import * as path from 'path';

function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx !== -1) {
          const key = trimmed.slice(0, eqIdx).trim();
          let val = trimmed.slice(eqIdx + 1).trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    }
  }
}

loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucketName = process.env.R2_BUCKET_NAME || 'project-ruang-senyum-kebahagiaan';

if (!supabaseUrl || !serviceKey || !accountId || !accessKeyId || !secretAccessKey) {
  console.error('❌ Credentials missing in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

async function reorganize() {
  console.log('🧹 Memulai perapihan folder & penamaan foto Cloudflare R2...');
  console.log(`🪣 Target Bucket: ${bucketName}`);

  // 1. Ambil data campaigns dari Supabase
  const { data: campaigns, error: campErr } = await supabase
    .from('campaigns')
    .select('id, title, slug, cover_image');

  if (campErr || !campaigns) {
    console.error('Gagal mengambil data campaigns:', campErr);
    return;
  }

  // 2. Ambil semua object lama yang ada di R2
  const listRes = await r2.send(
    new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: 'campaigns/',
    })
  );

  const existingObjects = listRes.Contents || [];
  console.log(`📦 Ditemukan ${existingObjects.length} file lama di Cloudflare R2.`);

  // 3. Untuk setiap campaign, simpan langsung sebagai campaigns/<slug>.jpg
  for (const campaign of campaigns) {
    const slug = campaign.slug;
    const cleanKey = `campaigns/${slug}.jpg`;
    console.log(`\n--------------------------------------------------`);
    console.log(`📌 Memproses: "${campaign.title}"`);
    console.log(`   🎯 Target nama file baru: ${cleanKey}`);

    let imageBuffer = null;
    let contentType = 'image/jpeg';

    // Cari file lama di R2 yang cocok dengan campaign.id
    const oldR2Obj = existingObjects.find((obj) => obj.Key.includes(campaign.id));

    if (oldR2Obj) {
      console.log(`   📥 Mengambil dari file lama di R2: ${oldR2Obj.Key}...`);
      const getRes = await r2.send(
        new GetObjectCommand({
          Bucket: bucketName,
          Key: oldR2Obj.Key,
        })
      );
      contentType = getRes.ContentType || 'image/jpeg';
      const byteArray = await getRes.Body.transformToByteArray();
      imageBuffer = Buffer.from(byteArray);
    } else if (campaign.cover_image && campaign.cover_image.startsWith('http')) {
      console.log(`   📥 Mengunduh dari URL: ${campaign.cover_image}...`);
      const resp = await fetch(campaign.cover_image);
      contentType = resp.headers.get('content-type') || 'image/jpeg';
      imageBuffer = Buffer.from(await resp.arrayBuffer());
    }

    if (imageBuffer) {
      console.log(`   ⬆️  Menyimpan langsung file: ${cleanKey} [${imageBuffer.length} bytes]...`);
      await r2.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: cleanKey,
          Body: imageBuffer,
          ContentType: contentType,
        })
      );
      console.log(`   ✅ File berhasil disimpan tanpa subfolder!`);

      // Update record database Supabase
      const newUrl = `/api/media/${cleanKey}`;
      await supabase
        .from('campaigns')
        .update({ cover_image: newUrl })
        .eq('id', campaign.id);

      console.log(`   🔄 Database Supabase diperbarui -> ${newUrl}`);
    } else {
      console.log(`   ⚠️  Tidak ada file gambar yang ditemukan untuk campaign ini.`);
    }
  }

  // 4. Hapus folder/file UUID lama di R2 yang berantakan
  console.log('\n🗑️  Membersihkan file & folder UUID lama di Cloudflare R2...');
  for (const obj of existingObjects) {
    // Jika object memiliki pola folder UUID (misal campaigns/11111111.../ atau campaigns/66a13bc1...)
    if (obj.Key.includes('/') && obj.Key.split('/').length > 2) {
      console.log(`   Menghapus file lama: ${obj.Key}...`);
      await r2.send(
        new DeleteObjectCommand({
          Bucket: bucketName,
          Key: obj.Key,
        })
      );
    }
  }

  console.log('\n==================================================');
  console.log('🎉 Selesai! Sekarang semua foto berada langsung di dalam folder "campaigns/"');
  console.log('   Contoh: campaigns/operasi-jantung-untuk-dik-budi.jpg');
  console.log('   Tidak ada lagi subfolder UUID yang membingungkan!');
}

reorganize().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});

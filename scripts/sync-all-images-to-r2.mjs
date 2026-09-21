import { createClient } from '@supabase/supabase-js';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
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

async function syncAllImages() {
  console.log('🚀 Memulai backup semua gambar aplikasi ke Cloudflare R2...');
  console.log(`📦 Database: Supabase PostgreSQL (${supabaseUrl})`);
  console.log(`🪣 Target R2: ${bucketName}`);

  // 1. Ambil semua campaign
  const { data: campaigns, error: campError } = await supabase
    .from('campaigns')
    .select('id, title, slug, cover_image');

  if (campError) {
    console.error('❌ Gagal mengambil data campaigns:', campError.message);
    return;
  }

  console.log(`📋 Ditemukan ${campaigns.length} campaigns di database.`);

  for (const campaign of campaigns) {
    const currentCover = campaign.cover_image;
    console.log(`\n--------------------------------------------------`);
    console.log(`📌 Campaign: "${campaign.title}" (ID: ${campaign.id})`);
    console.log(`   Current Cover: ${currentCover}`);

    if (!currentCover) {
      console.log('   ⚠️  Tidak ada cover image, skip.');
      continue;
    }

    if (currentCover.startsWith('/api/media/')) {
      console.log('   ✅ Sudah menggunakan path R2 (/api/media/), skip upload.');
      continue;
    }

    try {
      console.log(`   ⏳ Mengunduh gambar dari sumber external...`);
      const response = await fetch(currentCover);
      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type') || 'image/jpeg';
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      let ext = 'jpg';
      if (contentType.includes('png')) ext = 'png';
      else if (contentType.includes('webp')) ext = 'webp';

      const r2Key = `campaigns/${campaign.id}/cover_${Date.now()}.${ext}`;

      console.log(`   ⬆️  Mengunggah ke Cloudflare R2 (${r2Key}) [${buffer.length} bytes]...`);
      await r2.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: r2Key,
          Body: buffer,
          ContentType: contentType,
        })
      );
      console.log(`   ✅ Sukses diunggah ke R2!`);

      // Update database row
      const newCoverUrl = `/api/media/${r2Key}`;
      console.log(`   🔄 Memperbarui database Supabase -> ${newCoverUrl}...`);
      const { error: updateError } = await supabase
        .from('campaigns')
        .update({ cover_image: newCoverUrl })
        .eq('id', campaign.id);

      if (updateError) {
        throw new Error(`Gagal update Supabase: ${updateError.message}`);
      }

      console.log(`   🎉 Berhasil diperbarui di database!`);
    } catch (err) {
      console.error(`   ❌ Gagal memproses campaign "${campaign.title}":`, err.message);
    }
  }

  console.log('\n==================================================');
  console.log('✨ Semua gambar berhasil dimigrasikan ke Cloudflare R2');
  console.log('✨ Struktur database Supabase telah diperbarui menggunakan R2 image path!');
}

syncAllImages().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});

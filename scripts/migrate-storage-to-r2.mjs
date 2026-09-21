import { createClient } from '@supabase/supabase-js';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import * as fs from 'fs';
import * as path from 'path';

// Parse .env if not loaded
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
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucketName = process.env.R2_BUCKET_NAME || 'project-ruang-senyum-kebahagiaan';
const r2PublicUrl = (process.env.R2_PUBLIC_URL || '').replace(/\/+$/, '');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase credentials missing in .env');
  process.exit(1);
}

if (!accountId || !accessKeyId || !secretAccessKey) {
  console.error('❌ Cloudflare R2 credentials (R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY) missing in .env');
  console.error('Silakan lengkapi credential R2 di .env terlebih dahulu.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

async function listAllFiles(prefix = '') {
  const allFiles = [];
  const { data, error } = await supabase.storage.from('campaigns').list(prefix, {
    limit: 100,
    offset: 0,
  });

  if (error) {
    console.error(`Gagal list folder "${prefix}":`, error.message);
    return allFiles;
  }

  for (const item of data || []) {
    const itemPath = prefix ? `${prefix}/${item.name}` : item.name;
    if (item.id === null && (!item.metadata || Object.keys(item.metadata).length === 0)) {
      // It's a directory / folder
      const subFiles = await listAllFiles(itemPath);
      allFiles.push(...subFiles);
    } else {
      // It's a file
      allFiles.push({
        name: item.name,
        path: itemPath,
        metadata: item.metadata,
      });
    }
  }

  return allFiles;
}

async function migrate() {
  console.log('🚀 Memulai backup dan migrasi gambar dari Supabase Storage ke Cloudflare R2...');
  console.log(`📦 Supabase URL: ${supabaseUrl}`);
  console.log(`🪣 Target R2 Bucket: ${bucketName}`);

  const files = await listAllFiles('');
  console.log(`📁 Ditemukan ${files.length} file di Supabase Storage bucket "campaigns"`);

  let successCount = 0;
  let failCount = 0;

  for (const file of files) {
    const filePath = file.path;
    const r2Key = `campaigns/${filePath}`;
    console.log(`\n⏳ Mengunduh: ${filePath}...`);

    const { data: blob, error: downloadError } = await supabase.storage
      .from('campaigns')
      .download(filePath);

    if (downloadError || !blob) {
      console.error(`❌ Gagal mengunduh ${filePath}:`, downloadError?.message);
      failCount++;
      continue;
    }

    const buffer = Buffer.from(await blob.arrayBuffer());
    const contentType = file.metadata?.mimetype || 'image/jpeg';

    console.log(`⬆️  Mengunggah ke Cloudflare R2 (${r2Key}) [${buffer.length} bytes]...`);

    try {
      await r2.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: r2Key,
          Body: buffer,
          ContentType: contentType,
        })
      );
      console.log(`✅ Berhasil diunggah ke R2: ${r2Key}`);
      successCount++;
    } catch (uploadError) {
      console.error(`❌ Gagal upload ke R2:`, uploadError.message);
      failCount++;
    }
  }

  console.log('\n----------------------------------------');
  console.log(`📊 Hasil Backup:`);
  console.log(`   - Berhasil : ${successCount}`);
  console.log(`   - Gagal    : ${failCount}`);

  // Sinkronisasi database Supabase jika R2_PUBLIC_URL terpasang
  if (r2PublicUrl) {
    console.log('\n🔍 Memeriksa apakah ada URL gambar di database Supabase yang perlu diperbarui...');
    const { data: campaigns, error: dbError } = await supabase
      .from('campaigns')
      .select('id, title, cover_image');

    if (dbError) {
      console.error('Gagal mengambil data campaigns:', dbError.message);
    } else {
      let updatedDb = 0;
      for (const campaign of campaigns || []) {
        if (campaign.cover_image && campaign.cover_image.includes('supabase.co/storage')) {
          // Extract filename/path
          const parts = campaign.cover_image.split('/campaigns/');
          if (parts[1]) {
            const newUrl = `${r2PublicUrl}/campaigns/${parts[1]}`;
            const { error: updateError } = await supabase
              .from('campaigns')
              .update({ cover_image: newUrl })
              .eq('id', campaign.id);

            if (!updateError) {
              console.log(`🔄 Diperbarui: "${campaign.title}" -> ${newUrl}`);
              updatedDb++;
            } else {
              console.error(`Gagal update DB campaign ${campaign.id}:`, updateError.message);
            }
          }
        }
      }
      console.log(`✅ Selesai memperbarui ${updatedDb} baris data di database Supabase.`);
    }
  } else {
    console.log('\nℹ️  R2_PUBLIC_URL belum diisi di .env, database tidak diubah (gambar tetap aman ter-backup di R2).');
  }

  console.log('\n🎉 Proses backup selesai!');
}

migrate().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});

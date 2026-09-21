import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucketName = process.env.R2_BUCKET_NAME || 'project-ruang-senyum-kebahagiaan';
const publicUrl = process.env.R2_PUBLIC_URL || '';

export const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: accessKeyId || '',
    secretAccessKey: secretAccessKey || '',
  },
});

export interface UploadOptions {
  fileBuffer: Buffer | Uint8Array;
  fileName: string;
  contentType: string;
}

/**
 * Upload a buffer or Uint8Array directly to Cloudflare R2 bucket.
 */
export async function uploadToR2({
  fileBuffer,
  fileName,
  contentType,
}: UploadOptions): Promise<{ key: string; url: string }> {
  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error('Cloudflare R2 credentials (R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY) are missing in environment variables.');
  }

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    Body: fileBuffer,
    ContentType: contentType,
  });

  await r2Client.send(command);

  // Use public domain (custom domain) or fallback to local proxy /api/media
  const baseUrl = publicUrl ? publicUrl.replace(/\/+$/, '') : '/api/media';

  const cleanFileName = fileName.startsWith('/') ? fileName.slice(1) : fileName;
  const url = `${baseUrl}/${cleanFileName}`;

  return { key: cleanFileName, url };
}

/**
 * Delete an object from Cloudflare R2 bucket by key.
 */
export async function deleteFromR2(key: string): Promise<void> {
  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error('Cloudflare R2 credentials are not configured.');
  }

  const cleanKey = key.startsWith('/') ? key.slice(1) : key;
  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: cleanKey,
  });

  await r2Client.send(command);
}

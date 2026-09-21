import { NextRequest, NextResponse } from 'next/server';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { r2Client } from '@/lib/r2';

const bucketName = process.env.R2_BUCKET_NAME || 'project-ruang-senyum-kebahagiaan';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    if (!path || path.length === 0) {
      return new NextResponse('File path is required', { status: 400 });
    }

    const key = path.join('/');

    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    const response = await r2Client.send(command);

    if (!response.Body) {
      return new NextResponse('File not found', { status: 404 });
    }

    const byteArray = await response.Body.transformToByteArray();

    return new NextResponse(byteArray as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': response.ContentType || 'image/jpeg',
        'Content-Length': (response.ContentLength || byteArray.length).toString(),
        'Cache-Control': 'public, max-age=31536000, immutable',
        ...(response.ETag ? { ETag: response.ETag } : {}),
      },
    });
  } catch (error: unknown) {
    const err = error as { name?: string; $metadata?: { httpStatusCode?: number } };
    if (err?.name === 'NoSuchKey' || err?.$metadata?.httpStatusCode === 404) {
      return new NextResponse('File not found', { status: 404 });
    }
    console.error('Error retrieving file from R2:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}

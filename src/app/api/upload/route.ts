import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { uploadToR2 } from '@/lib/r2';
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE } from '@/lib/constants';

export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate user via Supabase
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized: Silakan login terlebih dahulu' },
        { status: 401 }
      );
    }

    // 2. Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'campaigns';

    if (!file) {
      return NextResponse.json(
        { error: 'File tidak ditemukan' },
        { status: 400 }
      );
    }

    // 3. Validate file type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Format file tidak didukung. Gunakan JPG, PNG, atau WEBP.' },
        { status: 400 }
      );
    }

    // 4. Validate file size
    if (file.size > MAX_IMAGE_SIZE) {
      return NextResponse.json(
        { error: 'Ukuran file melebihi batas maksimum 5MB.' },
        { status: 400 }
      );
    }

    // 5. Generate clean filename directly in folder
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const customFileName = (formData.get('customFileName') as string | null)?.trim();
    const sanitizedFolder = folder.replace(/[^a-zA-Z0-9_-]/g, '') || 'campaigns';

    let fileName: string;
    if (customFileName) {
      const sanitizedName = customFileName.replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase();
      fileName = `${sanitizedFolder}/${sanitizedName}.${ext}`;
    } else {
      const timestamp = Date.now();
      fileName = `${sanitizedFolder}/cover_${timestamp}.${ext}`;
    }

    // 6. Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 7. Upload to Cloudflare R2
    const { key, url } = await uploadToR2({
      fileBuffer: buffer,
      fileName,
      contentType: file.type,
    });

    return NextResponse.json({
      success: true,
      url,
      key,
    });
  } catch (error: unknown) {
    console.error('Error uploading file to R2:', error);
    const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat mengunggah gambar';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

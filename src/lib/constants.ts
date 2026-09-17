export const APP_NAME = 'Ruang Senyum Kebahagiaan';
export const APP_DESCRIPTION = 'Platform donasi dan crowdfunding sosial untuk membantu sesama yang membutuhkan.';

export const DONATION_PRESETS = [10000, 25000, 50000, 100000];

export const MIN_DONATION_AMOUNT = 10000;
export const MAX_DONATION_AMOUNT = 1000000000; // 1 billion

export const CAMPAIGN_STATUS_LABELS: Record<string, string> = {
  DRAFT: 'Draf',
  ACTIVE: 'Aktif',
  COMPLETED: 'Selesai',
  CLOSED: 'Ditutup',
};

export const PAYMENT_STATUS_LABELS: Record<string, string> = {
  PENDING: 'Menunggu',
  SUCCESS: 'Berhasil',
  FAILED: 'Gagal',
  EXPIRED: 'Kedaluwarsa',
};

export const CAMPAIGNS_PER_PAGE = 9;

export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export const SUPABASE_STORAGE_BUCKET = 'campaigns';

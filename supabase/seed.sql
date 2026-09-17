-- Run this script in the Supabase SQL Editor after running schema.sql
-- This script creates 5 demo campaigns as requested in the prompt.

-- =============================================
-- DEMO CAMPAIGNS
-- =============================================
INSERT INTO campaigns (id, title, slug, description, goal_amount, current_amount, status, cover_image)
VALUES 
  (
    '11111111-1111-1111-1111-111111111111', 
    'Bantuan Sembako untuk Panti Asuhan Kasih Bunda', 
    'bantuan-sembako-untuk-panti-asuhan-kasih-bunda',
    'Panti Asuhan Kasih Bunda saat ini menampung 45 anak yatim piatu. Akibat kondisi ekonomi yang sulit, donasi bulanan menurun drastis sehingga mereka kesulitan memenuhi kebutuhan pokok harian. Donasi Anda akan digunakan untuk membeli sembako berupa beras, minyak goreng, telur, susu, dan kebutuhan mandi. Mari berbagi rezeki untuk senyum mereka.',
    25000000, 
    5000000, 
    'ACTIVE',
    'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1200'
  ),
  (
    '22222222-2222-2222-2222-222222222222', 
    'Operasi Jantung untuk Dik Budi', 
    'operasi-jantung-untuk-dik-budi',
    'Dik Budi (5 tahun) divonis mengalami kelainan jantung bawaan sejak lahir. Dokter menyarankan operasi sesegera mungkin agar kondisinya tidak memburuk. Ayah Budi yang bekerja sebagai buruh harian lepas tidak mampu membiayai biaya operasi yang mencapai ratusan juta. Bantuan Anda sangat berarti untuk kehidupan Budi.',
    150000000, 
    45000000, 
    'ACTIVE',
    'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=1200'
  ),
  (
    '33333333-3333-3333-3333-333333333333', 
    'Pembangunan Madrasah Al-Ikhlas Pelosok Desa', 
    'pembangunan-madrasah-al-ikhlas-pelosok-desa',
    'Madrasah Al-Ikhlas yang terletak di pelosok desa kondisinya sangat memprihatinkan. Atap bocor, dinding retak, dan fasilitas belajar sangat minim. Namun semangat belajar anak-anak di sana tidak pernah padam. Kami berinisiatif mengumpulkan dana untuk merenovasi total bangunan ini menjadi tempat yang layak dan aman untuk belajar.',
    75000000, 
    75000000, 
    'COMPLETED',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200'
  ),
  (
    '44444444-4444-4444-4444-444444444444', 
    'Bantuan Air Bersih Kekeringan Gunung Kidul', 
    'bantuan-air-bersih-kekeringan-gunung-kidul',
    'Musim kemarau panjang menyebabkan beberapa desa di Gunung Kidul mengalami krisis air bersih. Warga harus berjalan berkilo-kilometer hanya untuk mendapatkan air yang bahkan tidak layak minum. Donasi yang terkumpul akan digunakan untuk mengirimkan tangki air bersih secara rutin ke desa-desa terdampak.',
    50000000, 
    0, 
    'ACTIVE',
    'https://images.unsplash.com/photo-1541888018151-51859663ce9a?auto=format&fit=crop&q=80&w=1200'
  ),
  (
    '55555555-5555-5555-5555-555555555555', 
    'Modal Usaha untuk Ibu-ibu Tangguh UMKM', 
    'modal-usaha-untuk-ibu-ibu-tangguh-umkm',
    'Program pemberdayaan perempuan dengan memberikan bantuan modal dan pelatihan usaha bagi ibu-ibu rumah tangga dari keluarga prasejahtera. Tujuannya agar mereka dapat memiliki penghasilan mandiri dan membantu ekonomi keluarga tanpa harus meninggalkan anak-anak di rumah.',
    30000000, 
    2500000, 
    'ACTIVE',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200'
  );

-- =============================================
-- DEMO TRANSACTIONS
-- =============================================
-- These will trigger the `update_campaign_current_amount` function and set the campaign current_amount
INSERT INTO transactions (transaction_code, campaign_id, donor_name, donor_email, amount, payment_method, payment_status, midtrans_order_id, midtrans_transaction_id, message, is_anonymous)
VALUES
  -- Transactions for Campaign 1
  ('BS-DEMO-11A', '11111111-1111-1111-1111-111111111111', 'Budi Santoso', 'budi@example.com', 2000000, 'qris', 'SUCCESS', 'ORDER-BS-DEMO-11A', 'midtrans-id-1', 'Semoga bermanfaat untuk anak-anak', false),
  ('BS-DEMO-11B', '11111111-1111-1111-1111-111111111111', 'Anonim', 'anonim@example.com', 3000000, 'bank_transfer', 'SUCCESS', 'ORDER-BS-DEMO-11B', 'midtrans-id-2', '', true),
  ('BS-DEMO-11C', '11111111-1111-1111-1111-111111111111', 'Siti', 'siti@example.com', 500000, 'qris', 'PENDING', 'ORDER-BS-DEMO-11C', 'midtrans-id-3', 'Bismillah', false),
  
  -- Transactions for Campaign 2
  ('BS-DEMO-22A', '22222222-2222-2222-2222-222222222222', 'Ahmad', 'ahmad@example.com', 45000000, 'bank_transfer', 'SUCCESS', 'ORDER-BS-DEMO-22A', 'midtrans-id-4', 'Semoga lekas sembuh dik Budi', false),
  ('BS-DEMO-22B', '22222222-2222-2222-2222-222222222222', 'Rina', 'rina@example.com', 100000, 'qris', 'FAILED', 'ORDER-BS-DEMO-22B', 'midtrans-id-5', 'GWS Budi', false),
  
  -- Transactions for Campaign 3
  ('BS-DEMO-33A', '33333333-3333-3333-3333-333333333333', 'Hamba Allah', 'hamba@example.com', 75000000, 'bank_transfer', 'SUCCESS', 'ORDER-BS-DEMO-33A', 'midtrans-id-6', 'Untuk pembangunan madrasah', true),
  
  -- Transactions for Campaign 5
  ('BS-DEMO-55A', '55555555-5555-5555-5555-555555555555', 'Putri', 'putri@example.com', 2500000, 'qris', 'SUCCESS', 'ORDER-BS-DEMO-55A', 'midtrans-id-7', 'Semangat ibu-ibu!', false),
  ('BS-DEMO-55B', '55555555-5555-5555-5555-555555555555', 'Joko', 'joko@example.com', 500000, 'bank_transfer', 'EXPIRED', 'ORDER-BS-DEMO-55B', 'midtrans-id-8', '', false);

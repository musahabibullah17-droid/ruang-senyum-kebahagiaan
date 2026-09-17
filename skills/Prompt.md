Saya ingin kamu membangun sebuah website donasi/crowdfunding sosial yang profesional, modern, responsive, dan benar-benar berfungsi.

Website ini dibuat menggunakan STACK YANG SUDAH DITENTUKAN berikut:

- Next.js
- TypeScript
- Supabase
- Midtrans

JANGAN mengganti stack tersebut dengan teknologi lain.

==================================================
1. TECH STACK
==================================================

Frontend / Application:
- Next.js
- TypeScript

Database / Backend:
- Supabase
- Supabase PostgreSQL
- Supabase Auth jika diperlukan
- Supabase Storage untuk penyimpanan gambar

Payment Gateway:
- Midtrans

Styling:
- Gunakan Tailwind CSS jika tersedia dalam project.

==================================================
2. TUJUAN WEBSITE
==================================================

Website merupakan platform donasi sederhana yang memungkinkan pengguna:

1. Melihat campaign donasi
2. Melihat target dan progress donasi
3. Membaca deskripsi campaign
4. Melihat gallery foto campaign
5. Melakukan donasi
6. Membayar menggunakan Midtrans
7. Admin melihat dan mengelola campaign
8. Admin melihat transaksi donasi
9. Progress campaign otomatis diperbarui berdasarkan transaksi yang berhasil

Website harus dibuat sebagai aplikasi yang benar-benar functional, bukan hanya UI mockup.

==================================================
3. FITUR CAMPAIGN
==================================================

Setiap campaign memiliki:

- ID
- Judul
- Slug
- Foto utama
- Target donasi
- Total donasi terkumpul
- Progress donasi
- Deskripsi
- Gallery
- Status
- Tanggal dibuat
- Tanggal mulai
- Tanggal berakhir

Status campaign:

- DRAFT
- ACTIVE
- COMPLETED
- CLOSED

Campaign hanya dapat menerima donasi ketika statusnya ACTIVE.

==================================================
4. HOMEPAGE
==================================================

Buat homepage yang menampilkan:

- Navbar
- Logo / nama website
- Hero section
- Penjelasan singkat mengenai website
- Campaign unggulan
- Campaign terbaru
- Campaign aktif
- CTA donasi
- Footer

Campaign ditampilkan dalam bentuk card.

Campaign card minimal menampilkan:

- Foto campaign
- Judul
- Deskripsi singkat
- Target donasi
- Dana terkumpul
- Progress bar
- Tombol "Lihat Campaign"

==================================================
5. CAMPAIGN LISTING
==================================================

Route:

/campaigns

Tampilkan seluruh campaign aktif.

Sediakan:

- Search
- Filter
- Pagination atau infinite scroll

Campaign yang sudah CLOSED atau DRAFT tidak ditampilkan sebagai campaign aktif.

==================================================
6. CAMPAIGN DETAIL
==================================================

Route:

/campaign/[slug]

Halaman harus menampilkan:

- Foto utama
- Judul campaign
- Target donasi
- Dana terkumpul
- Progress bar
- Persentase progress
- Deskripsi lengkap
- Gallery foto
- Tombol "Donasi Sekarang"

Gallery menggunakan Supabase Storage.

Ketika foto diklik, tampilkan image viewer/lightbox.

==================================================
7. DONATION FLOW
==================================================

Ketika user menekan:

"Donasi Sekarang"

arahkah user ke:

/campaign/[slug]/donate

User mengisi:

- Nominal donasi
- Nama donatur
- Email
- Pesan/doa
- Pilihan donasi anonim

Nominal preset:

Rp10.000
Rp25.000
Rp50.000
Rp100.000

User juga dapat memasukkan nominal custom.

==================================================
8. MIDTRANS
==================================================

Gunakan Midtrans sebagai payment gateway.

Jangan membuat sistem pembayaran palsu.

Gunakan Midtrans secara benar sesuai dokumentasi resmi dan environment yang digunakan.

Gunakan:

- Server-side Midtrans API
- Client-side Snap jika menggunakan Snap
- Server Key hanya di server
- Client Key sesuai kebutuhan frontend
- Webhook/notification handler Midtrans

JANGAN pernah expose:

MIDTRANS_SERVER_KEY

ke client/browser.

Gunakan environment variables.

Contoh:

MIDTRANS_SERVER_KEY=
MIDTRANS_CLIENT_KEY=
MIDTRANS_IS_PRODUCTION=false

Nama environment variable dapat disesuaikan dengan konfigurasi Midtrans yang digunakan.

==================================================
9. PAYMENT FLOW
==================================================

Flow yang diinginkan:

User
 ↓
Campaign
 ↓
Donasi Sekarang
 ↓
Isi nominal + data
 ↓
Create transaction
 ↓
Backend membuat transaksi Midtrans
 ↓
Midtrans memberikan payment token
 ↓
Frontend membuka Midtrans Snap
 ↓
User melakukan pembayaran
 ↓
Midtrans memproses pembayaran
 ↓
Midtrans mengirim notification/webhook
 ↓
Backend memverifikasi status transaksi
 ↓
Database Supabase diperbarui
 ↓
Jika pembayaran berhasil:
transaction = SUCCESS
 ↓
Progress campaign diperbarui

JANGAN menentukan status SUCCESS hanya berdasarkan callback frontend.

Status pembayaran harus diverifikasi melalui mekanisme server-side/webhook Midtrans.

==================================================
10. TRANSACTION DATABASE
==================================================

Buat tabel transactions di Supabase.

Minimal field:

id
transaction_code
campaign_id
donor_name
donor_email
amount
payment_method
payment_status
midtrans_order_id
midtrans_transaction_id
message
is_anonymous
created_at
updated_at

payment_status:

PENDING
SUCCESS
FAILED
EXPIRED

Pastikan transaction_code/order_id unik.

==================================================
11. DONATION CALCULATION
==================================================

Dana campaign hanya menghitung transaksi:

payment_status = SUCCESS

Contoh:

Target:
Rp50.000.000

Transactions:

Rp100.000 SUCCESS
Rp250.000 SUCCESS
Rp500.000 PENDING
Rp200.000 FAILED

Dana terkumpul:

Rp350.000

Jangan memasukkan PENDING atau FAILED ke progress.

Progress:

(total_success_amount / campaign_goal) * 100

Batasi nilai progress maksimum 100% pada tampilan.

==================================================
12. MIDTRANS WEBHOOK
==================================================

Buat endpoint/server route khusus untuk menerima notification dari Midtrans.

Contoh:

/api/midtrans/notification

Endpoint harus:

1. Menerima notification
2. Memverifikasi notification
3. Memastikan transaction/order ID sesuai
4. Memeriksa status pembayaran
5. Mengubah transaction status di Supabase
6. Memastikan campaign progress menggunakan transaksi SUCCESS
7. Menangani duplicate notification dengan aman

Webhook harus idempotent.

Jika notification yang sama dikirim lebih dari sekali, jangan membuat transaksi ganda atau menambahkan donasi dua kali.

==================================================
13. ADMIN DASHBOARD
==================================================

Buat admin dashboard.

Route:

/admin

Admin dashboard harus terlindungi authentication.

Dashboard menampilkan:

- Total campaign
- Campaign aktif
- Total transaksi
- Total dana berhasil
- Transaksi pending
- Transaksi terbaru

==================================================
14. ADMIN CAMPAIGN MANAGEMENT
==================================================

Admin dapat:

- Create campaign
- Edit campaign
- Delete campaign
- Publish campaign
- Unpublish campaign
- Mengatur target
- Mengatur deskripsi
- Mengatur tanggal
- Upload foto utama
- Upload gallery
- Delete gallery image
- Mengubah status campaign

Gunakan:

Supabase Database
+
Supabase Storage

==================================================
15. ADMIN TRANSACTION MANAGEMENT
==================================================

Route:

/admin/transactions

Admin dapat melihat:

- Transaction code
- Campaign
- Nama donor
- Email
- Nominal
- Payment method
- Payment status
- Midtrans transaction ID
- Tanggal transaksi

Admin dapat filter:

- SUCCESS
- PENDING
- FAILED
- EXPIRED

Transaksi yang berasal dari Midtrans harus mengikuti status pembayaran dari Midtrans.

Jangan menyediakan tombol manual "SUCCESS" yang dapat digunakan sembarangan untuk transaksi Midtrans tanpa proses verifikasi yang sesuai.

==================================================
16. ADMIN AUTHENTICATION
==================================================

Gunakan Supabase Auth.

Hanya user dengan role admin yang dapat mengakses:

/admin

Jangan hanya menyembunyikan halaman admin dari frontend.

Authorization harus dilakukan di server/backend juga.

Jangan menyimpan password secara manual di database.

Gunakan mekanisme authentication Supabase.

==================================================
17. DATABASE SCHEMA
==================================================

Minimal buat tabel:

profiles
campaigns
campaign_images
transactions

Contoh relasi:

profiles
   │
   └── admin

campaigns
   │
   ├── campaign_images
   │
   └── transactions

Gunakan foreign key yang sesuai.

==================================================
18. SUPABASE STORAGE
==================================================

Gunakan Supabase Storage untuk:

- Campaign thumbnail
- Campaign cover image
- Campaign gallery

Buat struktur storage yang rapi.

Contoh:

campaigns/
    campaign-id/
        cover/
        gallery/

Perhatikan:

- file type validation
- file size limit
- authorization
- upload permissions
- delete permissions

Jangan membuat bucket terbuka tanpa alasan.

==================================================
19. SECURITY
==================================================

Terapkan:

- Supabase Row Level Security (RLS)
- Authentication
- Authorization
- Server-side validation
- Input validation
- Secure file upload
- Environment variables
- Jangan expose secret key
- Jangan expose Supabase service role key ke browser
- Jangan expose Midtrans Server Key
- Validasi webhook Midtrans

Frontend tidak boleh memiliki akses ke:

SUPABASE_SERVICE_ROLE_KEY
MIDTRANS_SERVER_KEY

==================================================
20. RESPONSIVE UI
==================================================

Website harus responsive untuk:

- Desktop
- Laptop
- Tablet
- Mobile

Prioritaskan UX halaman donasi.

Tombol "Donasi Sekarang" harus mudah ditemukan.

Gunakan desain:

- modern
- profesional
- bersih
- terpercaya
- humanitarian
- tidak terlalu ramai

Jangan menyalin desain website donasi lain secara langsung.

==================================================
21. ERROR HANDLING
==================================================

Tangani:

- Campaign tidak ditemukan
- Campaign sudah ditutup
- Invalid donation amount
- Payment gagal
- Payment expired
- Midtrans error
- Webhook error
- Database error
- Upload error
- Unauthorized
- Forbidden
- Server error

Berikan error message yang mudah dipahami user.

==================================================
22. DEMO DATA
==================================================

Buat minimal 5 campaign demo.

Setiap campaign memiliki:

- Judul
- Foto
- Target
- Deskripsi
- Gallery
- Data transaksi

Buat variasi transaksi:

SUCCESS
PENDING
FAILED
EXPIRED

Gunakan data tersebut untuk memastikan progress campaign bekerja.

==================================================
23. ROUTE STRUCTURE
==================================================

Minimal:

/
 
/campaigns

/campaign/[slug]

/campaign/[slug]/donate

/admin

/admin/campaigns

/admin/campaigns/new

/admin/campaigns/[id]/edit

/admin/transactions

==================================================
24. API / SERVER ROUTES
==================================================

Buat endpoint yang diperlukan.

Minimal:

POST /api/donations

POST /api/midtrans/notification

GET /api/campaigns

GET /api/campaigns/[id]

Endpoint internal/admin harus dilindungi authorization.

Jangan melakukan operasi sensitif langsung dari client.

==================================================
25. ACCEPTANCE CRITERIA
==================================================

Website dianggap selesai jika:

[ ] Homepage bekerja
[ ] Campaign listing bekerja
[ ] Campaign detail bekerja
[ ] Gallery bekerja
[ ] Search/filter bekerja
[ ] Donation form bekerja
[ ] Midtrans Snap bekerja dalam Sandbox
[ ] Transaction dibuat di Supabase
[ ] Midtrans order ID tersimpan
[ ] Midtrans notification dapat diterima
[ ] Payment status diperbarui
[ ] SUCCESS transaction dihitung sebagai donasi
[ ] PENDING tidak dihitung
[ ] FAILED tidak dihitung
[ ] EXPIRED tidak dihitung
[ ] Progress campaign otomatis berubah
[ ] Admin login bekerja
[ ] Admin dapat membuat campaign
[ ] Admin dapat edit campaign
[ ] Admin dapat delete campaign
[ ] Admin dapat upload gallery
[ ] Admin dapat melihat transaksi
[ ] Supabase RLS diterapkan
[ ] Secret key tidak terekspos
[ ] Website responsive

==================================================
26. DEVELOPMENT APPROACH
==================================================

Jangan langsung membuat seluruh aplikasi sekaligus.

Kerjakan secara bertahap.

PHASE 1
Analisis requirement.

PHASE 2
Buat architecture plan.

PHASE 3
Buat database schema Supabase.

PHASE 4
Buat RLS policies.

PHASE 5
Buat Supabase Auth dan admin authorization.

PHASE 6
Buat campaign CRUD.

PHASE 7
Buat public campaign pages.

PHASE 8
Buat donation flow.

PHASE 9
Integrasikan Midtrans Sandbox.

PHASE 10
Buat Midtrans notification/webhook.

PHASE 11
Buat admin transaction dashboard.

PHASE 12
Testing.

PHASE 13
Responsive optimization.

PHASE 14
Security review.

PHASE 15
Final cleanup.

==================================================
27. IMPORTANT RULES
==================================================

1. Gunakan Next.js + TypeScript.
2. Gunakan Supabase.
3. Gunakan Midtrans.
4. Jangan mengganti stack.
5. Jangan menggunakan database lokal sebagai database utama.
6. Jangan menggunakan payment gateway lain.
7. Jangan hardcode secret.
8. Jangan membuat fake payment success.
9. Gunakan Midtrans Sandbox untuk development.
10. Gunakan webhook/notification server-side.
11. Gunakan Supabase RLS.
12. Jangan expose service role key.
13. Jangan expose Midtrans Server Key.
14. Jangan membuat progress donation hardcoded.
15. Semua data utama harus berasal dari database.
16. Buat kode modular dan mudah dikembangkan.

==================================================
28. OUTPUT SETELAH DEVELOPMENT
==================================================

Setelah selesai, berikan:

1. Struktur folder project
2. Database schema
3. Supabase tables
4. RLS policies
5. Daftar routes
6. API routes
7. Environment variables
8. Cara menjalankan project
9. Cara menjalankan Supabase
10. Cara mengatur Midtrans Sandbox
11. Cara testing payment
12. Daftar fitur yang sudah selesai
13. Daftar fitur yang masih perlu konfigurasi production
14. Security considerations

Sebelum menyatakan project selesai, jalankan dan test aplikasi.

Jika terdapat error, perbaiki terlebih dahulu.
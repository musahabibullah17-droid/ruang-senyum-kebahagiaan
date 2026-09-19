Saya ingin kamu berperan sebagai security engineer yang melakukan hardening menyeluruh
terhadap website donasi saya ini. Website ini menangani data pribadi donatur dan transaksi
pembayaran, jadi keamanannya kritis. Lakukan audit dan perbaikan di setiap area berikut,
sesuaikan dengan stack teknologi yang saya pakai (Next.js/React, deployment di Vercel):

1. AUTENTIKASI & SESI
   - Pastikan password di-hash dengan algoritma yang benar (bcrypt/argon2), JANGAN pernah
     disimpan plain text atau di-hash dengan MD5/SHA1
   - Terapkan rate limiting pada endpoint login untuk mencegah brute force
   - Gunakan session token yang aman (httpOnly, secure, sameSite cookie), dengan expiry
     yang wajar
   - Terapkan validasi ulang di server untuk setiap aksi sensitif, jangan percaya validasi
     client-side saja

2. INPUT VALIDATION & INJEKSI
   - Validasi dan sanitasi SEMUA input dari user (form donasi, pencarian campaign, komentar,
     dll) di sisi server, bukan cuma client
   - Cek dan pastikan semua query database menggunakan parameterized query/ORM yang aman
     dari SQL injection — jangan ada string concatenation langsung ke query
   - Cegah XSS: escape semua output yang berasal dari input user sebelum dirender ke HTML

3. OTORISASI
   - Pastikan setiap endpoint API mengecek apakah user yang request benar-benar berhak
     mengakses/mengubah data tersebut (cek ownership, bukan cuma cek "sudah login")
   - Cek khusus endpoint admin/dashboard donasi — pastikan tidak bisa diakses tanpa role
     yang tepat

4. DATA SENSITIF & SECRETS
   - Pastikan tidak ada API key, secret, atau kredensial database yang ter-hardcode di
     kode atau ter-commit ke repository — semua harus lewat environment variable
   - Untuk data pembayaran, JANGAN simpan data kartu kredit sendiri — gunakan payment
     gateway tersertifikasi PCI-DSS (Midtrans, Xendit, dll) dan cukup simpan referensi
     transaksinya
   - Enkripsi data pribadi sensitif donatur saat disimpan jika relevan

5. HTTP HEADERS & KONFIGURASI
   - Terapkan security headers: Content-Security-Policy, X-Frame-Options,
     X-Content-Type-Options, Strict-Transport-Security (HSTS), Referrer-Policy
   - Pastikan HTTPS dipaksa di semua koneksi (redirect otomatis dari HTTP)
   - Nonaktifkan informasi versi framework/server yang bocor di header response

6. FILE UPLOAD (kalau ada, misal upload bukti transfer/foto campaign)
   - Validasi tipe file dan ukuran file di server (bukan cuma dari ekstensi nama file)
   - Simpan file upload di luar folder yang bisa dieksekusi sebagai script
   - Scan/validasi ulang bahwa file yang diupload benar-benar sesuai tipe yang diklaim

7. DEPENDENSI & SUPPLY CHAIN
   - Cek package.json, cari dependency dengan known vulnerability (jalankan npm audit
     atau setara), dan usulkan update/perbaikan
   - Hapus dependency yang tidak terpakai

8. RATE LIMITING & ABUSE PREVENTION
   - Terapkan rate limiting di endpoint publik yang rawan disalahgunakan (form donasi,
     kontak, pencarian) untuk mencegah spam/DoS sederhana
   - Tambahkan CAPTCHA di form-form kritis jika belum ada

9. ERROR HANDLING & LOGGING
   - Pastikan pesan error yang ditampilkan ke user tidak membocorkan detail internal
     (stack trace, query database, struktur folder)
   - Log aktivitas sensitif (login gagal, perubahan data penting) untuk keperluan audit,
     tapi jangan log data sensitif seperti password/token

10. CSRF PROTECTION
    - Pastikan ada proteksi CSRF pada form/aksi yang mengubah state (donasi, update profil,
      dll), terutama kalau menggunakan cookie-based session

SETELAH melakukan audit, buat laporan singkat berisi:
- Daftar kerentanan yang ditemukan, diurutkan dari yang paling kritis
- Perbaikan yang sudah diterapkan untuk masing-masing
- Rekomendasi yang PERLU saya lakukan secara manual (misalnya: setup payment gateway
  bersertifikat, setup monitoring, penetration testing berkala) karena beberapa hal ini
  di luar kemampuan perbaikan kode otomatis
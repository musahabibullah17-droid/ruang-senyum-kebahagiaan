'use client';

import Link from 'next/link';
import { ArrowLeft, Shield, FileCheck, HeartHandshake } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';

export default function SyaratKetentuanClient() {
  const sections = [
    {
      id: 'definisi',
      title: '1. Definisi & Ketentuan Umum',
      content: [
        `Yayasan Ruang Senyum Kebahagiaan ("Kami", "Platform", atau "Yayasan") adalah lembaga sosial nirlaba berbadan hukum resmi yang menyediakan platform crowdfunding dan donasi online untuk menghubungkan para donatur dengan penerima manfaat yang membutuhkan bantuan di Indonesia.`,
        `"Donatur" atau "Orang Baik" adalah setiap individu, kelompok, atau badan hukum yang menggunakan platform ${APP_NAME} untuk menyalurkan dana bantuan atau sedekah secara sukarela.`,
        `"Penerima Manfaat" adalah individu, keluarga, yayasan binaan, atau komunitas yang telah lolos proses verifikasi dan asesmen lapangan tim Yayasan untuk menerima bantuan.`,
        `"Campaign" atau "Program Donasi" adalah halaman inisiatif penggalangan dana kemanusiaan, medis, pendidikan, yatim piatu, dhuafa, atau bantuan bencana alam yang tayang di platform.`,
      ],
    },
    {
      id: 'donatur',
      title: '2. Ketentuan Donatur',
      content: [
        `Donatur wajib memastikan bahwa data identitas (nama, nomor telepon/WhatsApp, dan alamat email) yang dimasukkan adalah valid dan dapat dihubungi.`,
        `Donatur memiliki hak penuh untuk memilih opsi "Sembunyikan nama saya (Hamba Allah/Anonim)" saat berdonasi demi menjaga privasi nama pada daftar donatur publik.`,
        `Dana yang didonasikan adalah dana halal milik sah donatur secara hukum, serta bukan berasal dari tindak pidana korupsi, pencucian uang (money laundering), terorisme, atau kejahatan keuangan lainnya.`,
        `Donasi yang disalurkan bersifat sukarela, ikhlas, dan tidak mengikat timbal balik berupa imbalan jasa komersial apapun dari Yayasan maupun penerima manfaat.`,
      ],
    },
    {
      id: 'penyaluran',
      title: '3. Pengelolaan & Penyaluran Donasi',
      content: [
        `Setiap campaign yang dibuka telah melalui proses verifikasi data, dokumen pendukung medis/sosial, serta survei kelayakan oleh tim relawan Yayasan.`,
        `Yayasan berwenang penuh menyalurkan dana yang terkumpul kepada penerima manfaat secara bertahap atau sekaligus sesuai dengan kebutuhan riil di lapangan.`,
        `Penyaluran dapat berbentuk pembayaran langsung biaya rumah sakit/faskes, santunan tunai terkontrol, penyediaan paket sembako, biaya pendidikan, renovasi, atau sarana air bersih.`,
        `Yayasan berkewajiban memberikan pembaruan berita/laporan penyaluran (Kabar Terbaru) yang dapat diakses oleh publik dan para donatur pada halaman detail campaign.`,
      ],
    },
    {
      id: 'biaya',
      title: '4. Biaya Operasional & Payment Gateway',
      content: [
        `Untuk menjaga kelangsungan platform teknologi, server, sistem verifikasi lapangan, serta operasional tim relawan, Yayasan mengalokasikan persentase operasional maksimal sesuai batas regulasi peraturan perundang-undangan pengumpulan donasi di Indonesia.`,
        `Biaya transaksi payment gateway perbankan (Virtual Account) atau QRIS adalah biaya pihak ketiga penyedia layanan pembayaran resmi (Midtrans) yang transparan dan otomatis tercatat pada rincian pembayaran.`,
        `Yayasan tidak membebankan biaya tersembunyi apapun di luar rincian yang tertera pada saat transaksi donasi dibuat.`,
      ],
    },
    {
      id: 'privasi',
      title: '5. Kebijakan Privasi & Kerahasiaan Data',
      content: [
        `Yayasan berkomitmen melindungi kerahasiaan data pribadi seluruh donatur dan penerima manfaat.`,
        `Informasi kontak (nomor WhatsApp dan email) hanya digunakan untuk pengiriman bukti transaksi, laporan penyaluran donasi, atau verifikasi darurat jika terjadi kegagalan sistem.`,
        `Kami menjamin tidak akan pernah menjual, menyewakan, atau menyalahgunakan data pribadi donatur kepada pihak ketiga tanpa izin resmi dari donatur.`,
      ],
    },
    {
      id: 'refund',
      title: '6. Kebijakan Pembatalan & Pengembalian Dana',
      content: [
        `Donasi yang telah berhasil dibayarkan dan diverifikasi sistem pada dasarnya bersifat final dan tidak dapat ditarik kembali karena langsung dialokasikan ke pos bantuan program.`,
        `Pengembalian dana (refund) hanya dapat diproses apabila terjadi kesalahan teknis perbankan seperti pendebetan ganda (double charge) atas satu kode tagihan yang sama, dengan menyertakan bukti mutasi rekening resmi dalam waktu maksimal 3x24 jam sejak transaksi dilakukan.`,
      ],
    },
    {
      id: 'tanggung-jawab',
      title: '7. Hak Cipta & Batasan Tanggung Jawab',
      content: [
        `Seluruh konten, logo, materi visual foto dokumentasi, dan teks pada platform ${APP_NAME} adalah hak kekayaan intelektual Yayasan Ruang Senyum Kebahagiaan atau telah mendapatkan izin publikasi dari penerima manfaat.`,
        `Dilarang keras menyalin, menduplikasi, atau menyalahgunakan materi campaign untuk tujuan penipuan atau keuntungan komersial pribadi.`,
        `Yayasan tidak bertanggung jawab atas kerugian akibat kelalaian donatur dalam menjaga keamanan perangkat perbankan pribadi atau mentransfer dana ke rekening tidak resmi di luar instruksi platform.`,
      ],
    },
    {
      id: 'perubahan',
      title: '8. Perubahan Ketentuan Layanan',
      content: [
        `Yayasan berhak mengubah, memperbarui, atau melengkapi Syarat & Ketentuan ini sewaktu-waktu sesuai dengan perkembangan regulasi hukum dan operasional platform.`,
        `Perubahan akan diumumkan secara transparan pada halaman ini dengan pembaruan tanggal revisi.`,
      ],
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 sm:py-8 space-y-7">
      {/* Mobile Back Header */}
      <div className="flex items-center gap-3.5">
        <Link
          href="/user"
          className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-slate-900 shadow-sm active:scale-95 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Syarat & Ketentuan
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-0.5">
            Pedoman penggunaan layanan dan donasi di {APP_NAME}
          </p>
        </div>
      </div>

      {/* Trust Badge Banner */}
      <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
          <Shield className="w-6 h-6 text-sky-600" />
        </div>
        <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-1">
          <p className="font-bold text-sky-900 text-base sm:text-lg">Komitmen Amanah & Legalitas</p>
          <p className="text-slate-600">
            Seluruh aktivitas donasi dan penyaluran diatur secara terbuka dan bertanggung jawab sesuai ketentuan perundang-undangan sosial Republik Indonesia.
          </p>
        </div>
      </div>

      {/* Table of Content pills */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-3">
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
          Daftar Isi Ketentuan
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="p-2.5 rounded-xl text-slate-700 hover:text-sky-600 hover:bg-sky-50 font-medium transition-colors truncate flex items-center gap-2.5"
            >
              <FileCheck className="w-4 h-4 text-sky-500 shrink-0" />
              <span className="truncate">{section.title}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Sections List */}
      <div className="space-y-5">
        {sections.map((section) => (
          <div
            key={section.id}
            id={section.id}
            className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-7 shadow-sm space-y-3.5 scroll-mt-20"
          >
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <span>{section.title}</span>
            </h2>
            <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              {section.content.map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Support Box */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 text-center shadow-sm space-y-3">
        <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
          <HeartHandshake className="w-6 h-6" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900">
          Punya Pertanyaan Mengenai Ketentuan Ini?
        </h3>
        <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
          Tim legal dan pengurus Yayasan siap memberikan penjelasan terbuka seputar amanah donasi.
        </p>
        <div className="pt-2">
          <a
            href="https://wa.me/6282232552327?text=Halo%20Admin%20Ruang%20Senyum,%20saya%20ingin%20bertanya%20mengenai%20syarat%20dan%20ketentuan"
            target="_blank"
            rel="noopener noreferrer"
            className="tf-btn style-solid !rounded-xl !h-12 !text-sm sm:!text-base !font-bold !bg-slate-900 !border-slate-900 !text-white hover:!bg-slate-800 inline-flex items-center px-6"
          >
            <span>Hubungi Tim Ruang Senyum</span>
          </a>
        </div>
      </div>
    </div>
  );
}

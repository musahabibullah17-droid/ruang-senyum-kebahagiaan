'use client';

import Link from 'next/link';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Scale, 
  Building2, 
  Eye, 
  CheckCircle2, 
  AlertTriangle,
  FileSpreadsheet,
  PhoneCall
} from 'lucide-react';
import { APP_NAME } from '@/lib/constants';

export default function AkuntabilitasClient() {
  const transparencyPillars = [
    {
      icon: <Building2 className="w-7 h-7 text-sky-600" />,
      title: 'Legalitas Badan Hukum Resmi',
      description:
        'Yayasan Ruang Senyum Kebahagiaan didirikan dengan Akta Notaris resmi dan telah disahkan oleh Kementerian Hukum dan HAM Republik Indonesia sebagai badan hukum sosial nirlaba.',
      badges: ['Badan Hukum Kemenkumham', 'NPWP Resmi Yayasan', 'Izin Kegiatan Sosial'],
    },
    {
      icon: <Eye className="w-7 h-7 text-sky-600" />,
      title: 'Verifikasi & Seleksi Ketat Lapangan',
      description:
        'Setiap penerima manfaat wajib melalui proses asesmen langsung oleh tim relawan kami. Kami memverifikasi surat keterangan medis rumah sakit, identitas kependudukan, serta kondisi ekonomi riil calon penerima bantuan.',
      badges: ['Asesmen Tim Lapangan', 'Verifikasi Dokumen Medis', 'Anti Data Fiktif'],
    },
    {
      icon: <FileSpreadsheet className="w-7 h-7 text-sky-600" />,
      title: 'Dokumentasi & Kabar Terbaru Penyaluran',
      description:
        'Penyaluran donasi diabadikan melalui foto, video, kuitansi pembayaran faskes, serta bukti serah terima yang diunggah ke tab "Kabar Terbaru" pada masing-masing halaman campaign agar donatur dapat melihat manfaat nyata donasinya.',
      badges: ['Kuitansi & Bukti Resmi', 'Dokumentasi Foto/Video', 'Update Berkala'],
    },
    {
      icon: <Scale className="w-7 h-7 text-sky-600" />,
      title: 'Tata Kelola Keuangan Terpisah & Amanah',
      description:
        'Semua dana donasi dikelola melalui rekening bank resmi atas nama Yayasan Ruang Senyum Kebahagiaan. Dana donasi tidak pernah dicampuradukkan dengan rekening pribadi pengurus demi menjaga integritas amanah donatur.',
      badges: ['Rekening Khusus Yayasan', 'Pencatatan Real-time', 'Audit Berkala'],
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 sm:py-8 space-y-7">
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
            Akuntabilitas & Transparansi
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-0.5">
            Standar integritas dan pertanggungjawaban {APP_NAME}
          </p>
        </div>
      </div>

      {/* Hero Banner Card - Samakan style dan background dengan Akun & Layanan Utama */}
      <div className="bg-gradient-to-br from-sky-600 via-sky-500 to-blue-600 rounded-2xl p-5 sm:p-6 text-white shadow-lg shadow-sky-600/15 relative overflow-hidden space-y-3.5">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-24 h-24 bg-white/10 rounded-full blur-lg pointer-events-none" />

        <div className="flex items-center gap-3.5 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shrink-0 shadow-inner">
            <ShieldCheck className="w-7 h-7 text-white fill-white/20" />
          </div>
          <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full text-xs sm:text-sm font-semibold text-sky-50 border border-white/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Prinsip Amanah & Transparan
          </div>
        </div>

        <div className="relative z-10 space-y-1.5">
          <h2 className="text-xl sm:text-2xl font-bold leading-tight text-white tracking-tight">
            Amanah Donatur, Harapan Penerima Manfaat
          </h2>
          <p className="text-sm sm:text-base text-sky-100 leading-relaxed font-normal">
            Kami menyadari bahwa setiap rupiah yang Anda titipkan adalah amanah suci. Karena itu, transparansi dan akuntabilitas adalah fondasi utama operasional Yayasan Ruang Senyum Kebahagiaan.
          </p>
        </div>
      </div>

      {/* 4 Pillars Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider px-1">
          Pilar Akuntabilitas Lembaga
        </h3>

        <div className="grid grid-cols-1 gap-4.5">
          {transparencyPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-sm space-y-3.5 hover:border-sky-100 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center shrink-0 mt-0.5">
                  {pillar.icon}
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900">
                    {pillar.title}
                  </h4>
                  <p className="text-sm sm:text-base text-slate-600 mt-1.5 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
                {pillar.badges.map((badge, bIdx) => (
                  <span
                    key={bIdx}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold bg-slate-50 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Caution Box */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
          <AlertTriangle className="w-6 h-6 text-amber-600" />
        </div>
        <div className="text-sm sm:text-base text-amber-900 leading-relaxed space-y-1">
          <p className="font-bold text-base sm:text-lg">Waspada Penipuan Mengatasnamakan Yayasan</p>
          <p className="text-amber-800 leading-relaxed font-normal">
            Yayasan Ruang Senyum Kebahagiaan tidak pernah meminta donasi dikirim ke rekening atas nama pribadi perorangan. Seluruh transaksi resmi hanya diproses melalui sistem pembayaran website ini atau rekening resmi lembaga.
          </p>
        </div>
      </div>

      {/* Whistleblowing & Inquiry Box */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 text-center shadow-sm space-y-3">
        <div className="w-12 h-12 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center mx-auto">
          <PhoneCall className="w-6 h-6" />
        </div>
        <h4 className="text-base sm:text-lg font-bold text-slate-900">
          Layanan Verifikasi & Pengaduan Transparansi
        </h4>
        <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
          Apabila Anda menemukan ketidaksesuaian data atau memerlukan konfirmasi keabsahan program, laporkan langsung kepada pengawas yayasan.
        </p>
        <div className="pt-2">
          <a
            href="https://wa.me/6282232552327?text=Halo%20Pengurus%20Yayasan%20Ruang%20Senyum,%20saya%20ingin%20mengajukan%20pertanyaan/aduan%20terkait%20transparansi"
            target="_blank"
            rel="noopener noreferrer"
            className="tf-btn style-solid !rounded-xl !h-12 !text-sm sm:!text-base !font-bold !bg-sky-600 !border-sky-600 !text-white hover:!bg-sky-700 inline-flex items-center px-6 shadow-md shadow-sky-600/30"
          >
            <span>Hubungi Saluran Transparansi</span>
          </a>
        </div>
      </div>
    </div>
  );
}

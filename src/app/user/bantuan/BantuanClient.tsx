'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Search, 
  ChevronDown, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { APP_NAME } from '@/lib/constants';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: 'Donasi',
    question: 'Bagaimana cara berdonasi di Ruang Senyum Kebahagiaan?',
    answer: 'Anda cukup memilih campaign yang ingin dibantu, klik tombol "Donasi Sekarang", pilih atau masukkan nominal donasi, isi nama & kontak Anda (atau centang "Donasi Anonim / Hamba Allah"), kemudian pilih metode pembayaran dan selesaikan pembayaran.',
  },
  {
    category: 'Donasi',
    question: 'Berapa batas minimal donasi?',
    answer: 'Batas minimal donasi di platform kami adalah Rp10.000. Anda bebas berdonasi dalam nominal berapa pun sesuai kemampuan dan keikhlasan hati.',
  },
  {
    category: 'Donasi',
    question: 'Apakah saya bisa berdonasi tanpa mencantumkan nama (Hamba Allah / Anonim)?',
    answer: 'Ya, tentu saja. Pada halaman pembayaran, terdapat opsi "Sembunyikan nama saya (Hamba Allah)". Nama Anda tidak akan ditampilkan pada daftar donatur publik di halaman campaign.',
  },
  {
    category: 'Pembayaran',
    question: 'Metode pembayaran apa saja yang didukung?',
    answer: 'Kami menyediakan berbagai metode pembayaran yang aman dan otomatis melalui payment gateway Midtrans: QRIS (GoPay, OVO, Dana, LinkAja, ShopeePay), Transfer Virtual Account (BCA, Mandiri, BNI, BRI, Permata), dan Transfer Bank.',
  },
  {
    category: 'Pembayaran',
    question: 'Apakah saya perlu mengirim bukti transfer secara manual?',
    answer: 'Tidak perlu. Semua pembayaran melalui Virtual Account dan QRIS diproses secara otomatis oleh sistem dalam hitungan detik. Status donasi Anda akan langsung berubah menjadi "Berhasil".',
  },
  {
    category: 'Pembayaran',
    question: 'Bagaimana jika status pembayaran belum terverifikasi atau gagal?',
    answer: 'Jika dalam waktu 15 menit status donasi belum terupdate padahal saldo Anda sudah terpotong, silakan hubungi tim kami via WhatsApp di 0822-3255-2327 dengan melampirkan bukti transfer dan Order ID donasi.',
  },
  {
    category: 'Penyaluran',
    question: 'Bagaimana dana donasi disalurkan kepada penerima manfaat?',
    answer: 'Tim relawan Ruang Senyum Kebahagiaan melakukan verifikasi lapangan (assessment) terlebih dahulu. Penyaluran dana dilakukan secara berkala dan terdokumentasi, baik berupa bantuan pengobatan medis langsung ke rumah sakit, sembako, biaya pendidikan, maupun bantuan modal.',
  },
  {
    category: 'Penyaluran',
    question: 'Di mana saya bisa melihat laporan dan kabar terbaru penyaluran donasi?',
    answer: 'Setiap campaign memiliki tab "Kabar Terbaru" dan galeri dokumentasi penyaluran. Donatur juga dapat memantau dokumentasi kegiatan sosial kami melalui akun resmi media sosial dan website yayasan.',
  },
  {
    category: 'Keamanan',
    question: 'Apakah Yayasan Ruang Senyum Kebahagiaan berizin resmi?',
    answer: 'Ya. Yayasan Ruang Senyum Kebahagiaan merupakan lembaga sosial berbadan hukum resmi yang terdaftar di Kementerian Hukum dan HAM Republik Indonesia serta memiliki legalitas operasional sosial.',
  },
  {
    category: 'Teknis',
    question: 'Mengapa halaman website lambat atau tidak bisa memuat data?',
    answer: 'Hal ini biasanya disebabkan oleh cache browser yang usang. Anda dapat menggunakan fitur "Hapus Cache" di menu Akun untuk membersihkan cache website dan memperbarui data secara instan.',
  },
];

export default function BantuanClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = ['Semua', 'Donasi', 'Pembayaran', 'Penyaluran', 'Keamanan', 'Teknis'];

  const filteredFaqs = faqs.filter((faq) => {
    const matchQuery =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory =
      activeCategory === 'Semua' || faq.category === activeCategory;
    return matchQuery && matchCategory;
  });

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
            Pusat Bantuan
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-0.5">
            Pertanyaan umum & panduan layanan {APP_NAME}
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          placeholder="Cari kendala, cara donasi, pembayaran..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-base sm:text-[17px] focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 shadow-sm placeholder:text-slate-400 transition-all"
        />
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
              activeCategory === cat
                ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-100">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="transition-colors">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-5 py-4.5 text-left flex items-center justify-between gap-3.5 hover:bg-slate-50/70 transition-colors cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-sky-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-2 text-sm sm:text-base text-slate-700 leading-relaxed bg-slate-50/50 border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center text-slate-500 text-base">
            Tidak ada jawaban yang sesuai dengan pencarian Anda. Silakan hubungi kami langsung di bawah ini.
          </div>
        )}
      </div>

      {/* Contact Channels Card (Clean 3-color palette: White, Slate, Sky Blue) */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
            <MessageCircle className="w-5 h-5 text-sky-600" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">Butuh Bantuan Lebih Lanjut?</h3>
            <p className="text-sm text-slate-600 mt-0.5">Tim kami siap membantu Anda dengan sepenuh hati</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          <a
            href="https://wa.me/6282232552327?text=Halo%20Admin%20Ruang%20Senyum%20Kebahagiaan,%20saya%20butuh%20bantuan%20terkait%20website/donasi"
            target="_blank"
            rel="noopener noreferrer"
            className="tf-btn style-solid !rounded-xl !h-12 !text-sm sm:!text-base !font-bold !bg-sky-600 !border-sky-600 !text-white hover:!bg-sky-700 flex items-center justify-between px-4.5 shadow-sm group"
          >
            <div className="flex items-center gap-2.5">
              <Phone className="w-4.5 h-4.5 shrink-0" />
              <span>Chat WhatsApp</span>
            </div>
            <ExternalLink className="w-4 h-4 opacity-80 group-hover:translate-x-0.5 transition-transform" />
          </a>

          <a
            href="mailto:yayasanruangsenyumkebahagiaan@gmail.com"
            className="tf-btn style-border !rounded-xl !h-12 !text-sm sm:!text-base !font-bold !border-slate-300 !text-slate-700 hover:!border-sky-600 hover:!text-sky-600 hover:!bg-sky-50 flex items-center justify-between px-4.5 group"
          >
            <div className="flex items-center gap-2.5">
              <Mail className="w-4.5 h-4.5 shrink-0" />
              <span>Kirim Email</span>
            </div>
            <ExternalLink className="w-4 h-4 opacity-80 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 pt-3 border-t border-slate-100">
          <Clock className="w-4 h-4 shrink-0 text-slate-400" />
          <span>Jam Layanan: Senin - Minggu (08.00 - 21.00 WIB)</span>
        </div>
      </div>
    </div>
  );
}

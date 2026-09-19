import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Search, MousePointerClick, CreditCard, HeartHandshake } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';

export const metadata = {
  title: `Cara Donasi | ${APP_NAME}`,
  description: 'Panduan lengkap langkah demi langkah untuk melakukan donasi.',
};

export default function CaraDonasiPage() {
  const steps = [
    {
      icon: <Search className="w-8 h-8 text-[#0284c7]" />,
      title: '1. Pilih Campaign',
      description: 'Cari dan pilih campaign atau program sosial yang ingin Anda bantu melalui halaman utama atau halaman daftar campaign.',
    },
    {
      icon: <MousePointerClick className="w-8 h-8 text-[#0284c7]" />,
      title: '2. Klik "Donasi Sekarang"',
      description: 'Setelah membaca detail dan cerita campaign, klik tombol "Donasi Sekarang" yang tersedia di halaman tersebut.',
    },
    {
      icon: <CreditCard className="w-8 h-8 text-[#0284c7]" />,
      title: '3. Isi Nominal & Metode Pembayaran',
      description: 'Masukkan nominal donasi terbaik Anda, isi data diri singkat (atau pilih donasi anonim), dan pilih metode pembayaran (Transfer Bank, e-Wallet, atau QRIS).',
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-[#0284c7]" />,
      title: '4. Selesai & Bagikan',
      description: 'Selesaikan pembayaran sesuai instruksi. Donasi Anda akan otomatis terverifikasi dan disalurkan. Jangan lupa bagikan campaign untuk mengajak lebih banyak orang baik!',
    }
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-slate-50 pb-16 md:pb-0">
        {/* Hero Section */}
        <section className="relative py-20 bg-white overflow-hidden border-b border-slate-100 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Cara Berdonasi
            </h1>
            <p className="text-lg md:text-xl text-slate-600">
              Hanya butuh waktu kurang dari 2 menit untuk mulai menyebarkan kebaikan bersama {APP_NAME}.
            </p>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-6 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Support Box */}
            <div className="mt-16 bg-[#0284c7] rounded-3xl p-8 md:p-12 text-center text-white shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Masih Mengalami Kendala?</h3>
              <p className="text-sky-100 mb-8 max-w-xl mx-auto">
                Jika Anda mengalami kesulitan atau memiliki pertanyaan seputar donasi, jangan ragu untuk menghubungi layanan dukungan kami.
              </p>
              <a 
                href="mailto:support@ruangsenyum.org" 
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#0284c7] font-bold rounded-full hover:bg-sky-50 transition-colors"
              >
                Hubungi Bantuan
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

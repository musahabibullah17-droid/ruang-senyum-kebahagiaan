import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SearchX, Home } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-8">
          {/* Icon Animation */}
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 bg-sky-100 rounded-full animate-ping opacity-75"></div>
            <div className="relative bg-white rounded-full w-full h-full flex items-center justify-center shadow-lg border border-sky-50">
              <SearchX className="w-16 h-16 text-[#0284c7]" />
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Ups! Halaman Kosong
            </h1>
            <p className="text-lg text-slate-600">
              Maaf, halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau Anda salah mengetik alamat URL.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#0284c7] text-white font-bold rounded-full hover:bg-sky-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <Home className="w-5 h-5" />
              Kembali ke Beranda
            </Link>
            <Link 
              href="/campaigns"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-slate-700 font-bold rounded-full hover:bg-slate-50 transition-all border border-slate-200 shadow-sm"
            >
              Lihat Donasi
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

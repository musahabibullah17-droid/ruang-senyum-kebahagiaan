import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import { Target, Heart, Users } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';

export const metadata = {
  title: `Tentang Kami | ${APP_NAME}`,
  description: 'Mengenal lebih dekat visi, misi, dan nilai-nilai Ruang Senyum Kebahagiaan.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-slate-50 pb-16 md:pb-0">
        {/* Hero Section */}
        <section className="relative py-20 bg-white overflow-hidden border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
              Tentang Kami
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Kami percaya bahwa setiap kebaikan sekecil apa pun memiliki kekuatan untuk mengubah hidup seseorang. <strong className="text-[#0284c7]">{APP_NAME}</strong> hadir untuk menjembatani kebaikan Anda dengan mereka yang paling membutuhkan.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            
            {/* Visi & Misi */}
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 bg-sky-100 text-[#0284c7] rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Visi Kami</h3>
                <p className="text-slate-600 leading-relaxed">
                  Menjadi platform donasi dan penggalangan dana sosial paling terpercaya di Indonesia yang mampu menginspirasi jutaan orang untuk berbagi kebahagiaan setiap harinya.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 bg-sky-100 text-[#0284c7] rounded-xl flex items-center justify-center mb-6">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Misi Kami</h3>
                <ul className="text-slate-600 leading-relaxed space-y-3 list-disc list-inside marker:text-[#0284c7]">
                  <li>Menyediakan platform donasi yang transparan, aman, dan mudah digunakan.</li>
                  <li>Memastikan setiap donasi tersalurkan tepat sasaran kepada penerima manfaat.</li>
                  <li>Membangun ekosistem kepedulian sosial yang kuat di masyarakat.</li>
                </ul>
              </div>
            </div>

            {/* Tim & Transparansi */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Komitmen Transparansi</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    Bagi kami, kepercayaan Anda adalah amanah terbesar. Oleh karena itu, kami berkomitmen untuk selalu memberikan laporan penyaluran dana secara berkala dan transparan. Anda dapat melacak ke mana donasi Anda mengalir dan melihat langsung senyum kebahagiaan dari para penerima manfaat.
                  </p>
                </div>
                <div className="relative h-64 md:h-auto bg-slate-200">
                  <Image
                    src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80"
                    alt="Kebersamaan"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

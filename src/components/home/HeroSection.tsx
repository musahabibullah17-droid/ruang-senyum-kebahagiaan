import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=2070"
        alt="Anak-anak dan masyarakat yang membutuhkan bantuan"
        fill
        className="object-cover"
        priority
      />
      
      {/* Blue Overlay */}
      <div className="absolute inset-0 bg-primary-900/75 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/50 to-transparent" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded text-white text-xs font-bold uppercase tracking-wider">
          Platform Donasi Terpercaya
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight shadow-sm">
          Satu Kebaikan, Mengubah Jutaan Kehidupan.
        </h1>

        <p className="text-lg md:text-xl text-primary-50 leading-relaxed max-w-2xl mx-auto drop-shadow">
          Salurkan bantuan Anda kepada mereka yang paling membutuhkan secara transparan dan aman. Berikan harapan baru hari ini.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/campaigns"
            className="inline-flex items-center justify-center px-10 py-4 bg-white text-primary-700 text-base font-bold rounded-lg hover:bg-gray-50 shadow-lg transition-all hover:-translate-y-0.5"
          >
            Mulai Berdonasi
          </Link>
          <Link
            href="/campaigns"
            className="inline-flex items-center justify-center px-10 py-4 bg-primary-600/30 backdrop-blur-sm text-white text-base font-semibold rounded-lg border border-white/50 hover:bg-primary-600/50 transition-colors"
          >
            Lihat Campaign
          </Link>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  const [activeBtn, setActiveBtn] = useState<number>(0);

  return (
    <section className="relative min-h-[580px] sm:min-h-[620px] flex items-center justify-center overflow-hidden rounded-b-[28px] sm:rounded-b-none shadow-lg shadow-black/15 sm:shadow-none">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=2070"
        alt="Anak-anak dan masyarakat yang membutuhkan bantuan"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Deep Blue Overlay matching screenshot */}
      <div className="absolute inset-0 bg-[#0c2f4d]/75 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a253c]/95 via-[#0c2f4d]/60 to-[#0a253c]/50" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-xl sm:max-w-3xl lg:max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-14 sm:pb-20 text-center flex flex-col items-center">
        
        {/* Badge Pill */}
        <div className="inline-flex items-center px-3.5 py-1 bg-black/35 backdrop-blur-md rounded text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-6 sm:mb-8 border border-white/10">
          PLATFORM DONASI TERPERCAYA
        </div>

        {/* Hero Title */}
        <h1 className="text-[32px] sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.18] sm:leading-tight tracking-tight shadow-sm mb-5 sm:mb-6 max-w-lg sm:max-w-2xl">
          Satu Kebaikan, <br className="sm:hidden" />
          Mengubah Jutaan <br className="sm:hidden" />
          Kehidupan.
        </h1>

        {/* Hero Subtitle */}
        <p className="text-[13.5px] sm:text-lg text-slate-100/90 leading-relaxed max-w-md sm:max-w-2xl mx-auto drop-shadow mb-8 sm:mb-10 font-normal">
          Salurkan bantuan Anda kepada mereka yang paling membutuhkan secara transparan dan aman. Berikan harapan baru hari ini.
        </p>

        {/* Action Buttons with left-to-right fill animation */}
        <div 
          className="btn-pair-group flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-[340px] sm:max-w-none sm:w-auto justify-center"
          onMouseLeave={() => setActiveBtn(0)}
        >
          <Link
            href="/campaigns"
            onMouseEnter={() => setActiveBtn(0)}
            onClick={() => setActiveBtn(0)}
            className={`tf-btn btn-pair-item size-lg !rounded-lg w-full sm:w-auto ${
              activeBtn === 0 ? 'is-active' : 'is-inactive'
            }`}
          >
            <span>Mulai Berdonasi</span>
          </Link>
          <Link
            href="/campaigns"
            onMouseEnter={() => setActiveBtn(1)}
            onClick={() => setActiveBtn(1)}
            className={`tf-btn btn-pair-item size-lg !rounded-lg w-full sm:w-auto ${
              activeBtn === 1 ? 'is-active' : 'is-inactive'
            }`}
          >
            <span>Lihat Campaign</span>
          </Link>
        </div>

      </div>
    </section>
  );
}

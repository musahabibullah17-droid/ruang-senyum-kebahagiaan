'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CTASection() {
  const [activeBtn, setActiveBtn] = useState<number>(0);

  return (
    <section className="py-6 sm:py-24 px-3.5 sm:px-0 bg-transparent sm:bg-primary-600">
      <div className="max-w-3xl mx-auto bg-primary-600 rounded-[26px] sm:rounded-none py-14 sm:py-0 px-5 sm:px-6 lg:px-8 text-center flex flex-col items-center shadow-xl shadow-primary-950/15 sm:shadow-none">
        
        {/* Title matching large font */}
        <h2 className="text-[29px] sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.2] max-w-xl mx-auto mb-4 sm:mb-5">
          Siap Membuat Perubahan <br className="sm:hidden" />
          Hari Ini?
        </h2>

        {/* Description matching large font */}
        <p className="text-base sm:text-lg md:text-xl text-primary-100 leading-relaxed max-w-md sm:max-w-xl mx-auto mb-8 font-normal">
          Jadilah bagian dari ribuan orang baik yang telah membantu sesama. Berapapun donasi Anda, akan mengukir senyum bagi mereka yang membutuhkan.
        </p>

        {/* Action Buttons: Mulai Donasi Sekarang & Tata Cara Donasi */}
        <div 
          className="btn-pair-group flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-[340px] sm:max-w-none sm:w-auto justify-center items-center mx-auto"
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
            <span>Mulai Donasi Sekarang</span>
          </Link>
          <Link
            href="/cara-donasi"
            onMouseEnter={() => setActiveBtn(1)}
            onClick={() => setActiveBtn(1)}
            className={`tf-btn btn-pair-item size-lg !rounded-lg w-full sm:w-auto ${
              activeBtn === 1 ? 'is-active' : 'is-inactive'
            }`}
          >
            <span>Tata Cara Donasi</span>
          </Link>
        </div>

      </div>
    </section>
  );
}

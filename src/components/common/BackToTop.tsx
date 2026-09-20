'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [scrolled, setScrolled] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(500);
  const [visible, setVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      setScrolled(currentScroll);
      setVisible(currentScroll > 250);

      const totalScrollHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollHeight(totalScrollHeight || 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const strokeDashoffset = Math.max(
    0,
    307.919 - (scrolled / scrollHeight) * 307.919
  );

  return (
    <button
      onClick={scrollToTop}
      aria-label="Kembali ke atas"
      className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-white text-primary-600 shadow-xl border border-primary-100 hover:border-primary-400 hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
      }`}
    >
      {/* Circular Progress Ring */}
      <svg
        className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5"
        viewBox="-1 -1 102 102"
      >
        <path
          d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
          fill="none"
          stroke="#e0f2fe"
          strokeWidth="6"
        />
        <path
          d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
          fill="none"
          stroke="#0284c7"
          strokeWidth="6"
          strokeLinecap="round"
          style={{
            strokeDasharray: '307.919, 307.919',
            strokeDashoffset: strokeDashoffset,
            transition: 'stroke-dashoffset 100ms linear',
          }}
        />
      </svg>
      <ArrowUp className="w-5 h-5 text-primary-600 group-hover:-translate-y-0.5 transition-transform duration-200" />
    </button>
  );
}

import React from 'react';

export default function Logo({ className = "h-10 w-auto", showText = true }: { className?: string, showText?: boolean }) {
  return (
    <svg
      viewBox={showText ? "0 0 420 100" : "0 0 100 100"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g>
        {/* Base Background - Primary Blue */}
        <rect width="100" height="100" rx="24" fill="#0284c7" />
        
        {/* Outer Border for the box */}
        <rect x="2" y="2" width="96" height="96" rx="22" stroke="#fcd34d" strokeOpacity="0.8" strokeWidth="2" />

        {/* The "Ruang" (Room/Window Arch) */}
        <path 
          d="M28 76 V46 A22 22 0 0 1 72 46 V76" 
          stroke="#fcd34d" 
          strokeWidth="7" 
          strokeLinecap="round" 
        />

        {/* The "Cahaya" (Sun / Smile) */}
        <path 
          d="M38 76 A12 12 0 0 1 62 76 Z" 
          fill="#fcd34d" 
        />

        {/* Sinar Cahaya (Rays) */}
        <path 
          d="M50 58 L50 44 M41 61 L33 52 M59 61 L67 52" 
          stroke="#fcd34d" 
          strokeWidth="5" 
          strokeLinecap="round" 
        />
        
        {/* Lantai / Dasar (Ground) */}
        <path 
          d="M20 76 L80 76" 
          stroke="#fcd34d" 
          strokeWidth="6" 
          strokeLinecap="round" 
        />
      </g>

      {showText && (
        <g transform="translate(120, 0)">
          <text x="0" y="44" fill="currentColor" fontSize="34" fontWeight="900" fontFamily="var(--font-heading)" letterSpacing="-0.01em">
            RUANG SENYUM
          </text>
          <text x="0" y="82" fill="#0284c7" fontSize="34" fontWeight="900" fontFamily="var(--font-heading)" letterSpacing="-0.01em">
            KEBAHAGIAAN
          </text>
        </g>
      )}
    </svg>
  );
}

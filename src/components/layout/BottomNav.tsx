'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Heart, HelpCircle, Headphones } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  // Don't show bottom nav on admin routes
  if (pathname?.startsWith('/master')) {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-navy-100 z-50 pb-safe">
      <div className="flex justify-around items-center h-16 px-1 pb-1">
        <Link 
          href="/" 
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${pathname === '/' ? 'text-[#0284c7]' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[11px] font-semibold text-center leading-tight">Beranda</span>
        </Link>
        
        <Link 
          href="/campaigns" 
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${pathname === '/campaigns' || pathname?.startsWith('/campaign/') ? 'text-[#0284c7]' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Heart className="w-5 h-5" />
          <span className="text-[11px] font-semibold text-center leading-tight">Donasi</span>
        </Link>

        <Link 
          href="/cara-donasi" 
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${pathname === '/cara-donasi' ? 'text-[#0284c7]' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <HelpCircle className="w-5 h-5" />
          <span className="text-[11px] font-semibold text-center leading-tight">Cara Donasi</span>
        </Link>

        <Link 
          href="/user" 
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${pathname === '/user' || pathname?.startsWith('/user') || pathname?.startsWith('/layanan') ? 'text-[#0284c7]' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Headphones className="w-5 h-5" />
          <span className="text-[11px] font-semibold text-center leading-tight">Layanan</span>
        </Link>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Heart, Info, HelpCircle } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  // Don't show bottom nav on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-navy-100 z-50 pb-safe">
      <div className="flex justify-around items-end h-16 px-2 pb-2">
        <Link 
          href="/" 
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${pathname === '/' ? 'text-[#0284c7]' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Home className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-[10px] font-medium text-center leading-tight">Beranda</span>
        </Link>
        
        <Link 
          href="/campaigns" 
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${pathname === '/campaigns' || pathname?.startsWith('/campaign/') ? 'text-[#0284c7]' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-[10px] font-medium text-center leading-tight">Donasi</span>
        </Link>
        
        <Link 
          href="/about" 
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${pathname === '/about' ? 'text-[#0284c7]' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Info className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-[10px] font-medium text-center leading-tight">Tentang<br/>Kami</span>
        </Link>

        <Link 
          href="/cara-donasi" 
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${pathname === '/cara-donasi' ? 'text-[#0284c7]' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-[10px] font-medium text-center leading-tight">Cara<br/>Donasi</span>
        </Link>
      </div>
    </div>
  );
}

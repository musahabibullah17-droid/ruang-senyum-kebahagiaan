'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Heart, LayoutGrid, Search } from 'lucide-react';

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
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${pathname === '/' ? 'text-primary-600' : 'text-navy-400 hover:text-navy-600'}`}
        >
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-medium">Beranda</span>
        </Link>
        

        
        <Link 
          href="/campaigns" 
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${pathname === '/campaigns' && (typeof window === 'undefined' || !window.location.search.includes('focus=search')) ? 'text-primary-600' : 'text-navy-400 hover:text-navy-600'}`}
        >
          <Heart className="w-6 h-6" />
          <span className="text-[10px] font-medium">Donasi</span>
        </Link>
        
        <Link 
          href="/campaigns" 
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${pathname === '/campaigns' && (typeof window === 'undefined' || !window.location.search.includes('focus=search')) ? 'text-primary-600' : 'text-navy-400 hover:text-navy-600'}`}
        >
          <LayoutGrid className="w-6 h-6" />
          <span className="text-[10px] font-medium">Program</span>
        </Link>
      </div>
    </div>
  );
}

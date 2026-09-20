'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Search } from 'lucide-react';
import Logo from '@/components/ui/Logo';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [stickyState, setStickyState] = useState<'normal' | 'prepared' | 'sticky'>('normal');
  const router = useRouter();
  const pathname = usePathname();

  const isHomePage = pathname === '/';
  const isTransparent = isHomePage && stickyState === 'normal';

  // Scroll detection for transparent to sticky transition
  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY > 300) {
        setStickyState('sticky');
      } else if (scrollY > 120) {
        setStickyState('prepared');
      } else {
        setStickyState('normal');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    animationFrameId = window.requestAnimationFrame(handleScroll);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/campaigns?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const getHeaderClass = () => {
    if (stickyState === 'sticky') {
      return 'header-main header-sticky is-sticky';
    }
    if (stickyState === 'prepared') {
      return 'header-main header-sticky';
    }
    if (isTransparent) {
      return 'header-main header-transparent';
    }
    return 'header-main';
  };

  return (
    <nav className={getHeaderClass()}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="header-inner">
          
          {/* Logo: Compact on mobile, full on tablet/desktop */}
          <Link href="/" className="flex items-center group shrink-0">
            <div className={`logo-container transition-colors duration-300 ${isTransparent ? 'text-white' : 'text-slate-800'}`}>
              <Logo
                showText={false}
                className="h-8 w-8 sm:hidden group-hover:scale-105 transition-transform duration-300"
              />
              <Logo
                showText={true}
                className="hidden sm:block h-10 w-auto group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>

          {/* Mobile Search: Only logo + search on mobile (no sidebar/hamburger) */}
          <form onSubmit={handleSearch} className="md:hidden mobile-search-form">
            <input
              type="text"
              placeholder="Cari Campaign Ruang Senyum..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mobile-search-input"
            />
            <Search className="mobile-search-icon" />
          </form>

          {/* Desktop Navigation Links & Action */}
          <div className="desktop-nav">
            <Link
              href="/"
              className={`nav-link ${pathname === '/' ? 'active' : ''}`}
            >
              Beranda
            </Link>

            <Link
              href="/campaigns"
              className={`nav-link ${pathname.startsWith('/campaign') ? 'active' : ''}`}
            >
              Campaign
            </Link>

            <Link
              href="/about"
              className={`nav-link ${pathname === '/about' ? 'active' : ''}`}
            >
              Tentang Kami
            </Link>

            <Link
              href="/cara-donasi"
              className={`nav-link ${pathname === '/cara-donasi' ? 'active' : ''}`}
            >
              Cara Donasi
            </Link>

            {/* Desktop Search Input */}
            <form onSubmit={handleSearch} className="nav-search-wrap">
              <input
                type="text"
                placeholder="Cari campaign..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="nav-search-input"
              />
              <Search className="search-icon" />
            </form>

            {/* CTA Button: Belum aktif (transparan + outline biru + tulisan biru), Aktif (background biru + tulisan putih) */}
            <Link
              href="/campaigns"
              className="btn-nav-donate ml-2"
            >
              <span>Donasi Sekarang</span>
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}

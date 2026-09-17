'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Search } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/campaigns?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-navy-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center shadow group-hover:shadow-md transition-shadow">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-xl font-bold text-navy-900 tracking-tight">
              {APP_NAME}
            </span>
          </Link>

          {/* Desktop Navigation (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-navy-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
            >
              Beranda
            </Link>
            <Link
              href="/campaigns"
              className="px-4 py-2 text-sm font-medium text-navy-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
            >
              Campaign
            </Link>

            <form onSubmit={handleSearch} className="relative ml-2 mr-2">
              <input
                type="text"
                placeholder="Cari campaign..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 bg-navy-50 border border-transparent focus:border-primary-300 focus:bg-white rounded-lg text-sm transition-all outline-none w-48 focus:w-64"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
            </form>

            <Link
              href="/campaigns"
              className="ml-2 inline-flex items-center justify-center px-6 py-2.5 bg-primary-600 text-white text-sm font-bold rounded-lg hover:bg-primary-700 shadow-sm transition-colors"
            >
              Donasi Sekarang
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

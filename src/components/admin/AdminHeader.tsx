'use client';

import Link from 'next/link';
import Logo from '@/components/ui/Logo';

export default function AdminHeader() {
  return (
    <header className="header-dashboard">
      <div className="flex items-center gap-4">
        <Link href="/master" className="dashboard-brand">
          <Logo showText={false} className="w-9 h-9 drop-shadow-sm" />
          <div className="flex flex-col">
            <span className="leading-tight text-base font-bold text-navy-900">Ruang Senyum</span>
            <span className="text-[11px] font-medium text-primary-600 tracking-wider uppercase">Admin Portal</span>
          </div>
        </Link>
      </div>

      <div className="header-actions">
        <div className="user-profile-badge">
          <span className="avatar-dot" />
          <span>Administrator</span>
        </div>
      </div>
    </header>
  );
}

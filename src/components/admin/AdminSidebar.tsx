'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Megaphone, Receipt, LogOut, ExternalLink } from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const isDashboardActive = pathname === '/master';
  const isCampaignsActive = pathname.startsWith('/master/campaigns');
  const isTransactionsActive = pathname.startsWith('/master/transactions');

  return (
    <aside className="sidebar-menu-dashboard">
      <div>
        <div className="menu-heading mb-3">Menu Utama</div>
        <ul className="box-menu-dashboard">
          <li className={`nav-menu-item ${isDashboardActive ? 'active' : ''}`}>
            <Link href="/master" className="nav-menu-link">
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className={`nav-menu-item ${isCampaignsActive ? 'active' : ''}`}>
            <Link href="/master/campaigns" className="nav-menu-link">
              <Megaphone className="w-5 h-5" />
              <span>Campaigns</span>
            </Link>
          </li>
          <li className={`nav-menu-item ${isTransactionsActive ? 'active' : ''}`}>
            <Link href="/master/transactions" className="nav-menu-link">
              <Receipt className="w-5 h-5" />
              <span>Transaksi</span>
            </Link>
          </li>
        </ul>

        <div className="menu-heading mt-6 mb-3">Tautan Luar</div>
        <ul className="box-menu-dashboard">
          <li className="nav-menu-item">
            <Link href="/" target="_blank" className="nav-menu-link">
              <ExternalLink className="w-5 h-5" />
              <span>Lihat Website</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="sidebar-bottom">
        <form action="/auth/signout" method="post">
          <button type="submit" className="btn-logout">
            <LogOut className="w-5 h-5" />
            <span>Keluar</span>
          </button>
        </form>
      </div>
    </aside>
  );
}

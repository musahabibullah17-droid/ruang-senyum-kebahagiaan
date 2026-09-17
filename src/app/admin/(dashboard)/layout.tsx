import Link from 'next/link';
import { LayoutDashboard, Megaphone, Receipt, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-navy-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-navy-900 text-white flex-shrink-0 flex flex-col">
        <div className="p-6 border-b border-navy-800">
          <Link href="/admin" className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center shadow-inner">
              BS
            </span>
            Admin Panel
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-navy-300 hover:text-white hover:bg-navy-800 transition-colors"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link
            href="/admin/campaigns"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-navy-300 hover:text-white hover:bg-navy-800 transition-colors"
          >
            <Megaphone className="w-5 h-5" />
            Campaigns
          </Link>
          <Link
            href="/admin/transactions"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-navy-300 hover:text-white hover:bg-navy-800 transition-colors"
          >
            <Receipt className="w-5 h-5" />
            Transaksi
          </Link>
        </nav>

        <div className="p-4 border-t border-navy-800">
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-red-400 hover:text-red-300 hover:bg-navy-800 transition-colors text-left"
            >
              <LogOut className="w-5 h-5" />
              Keluar
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}

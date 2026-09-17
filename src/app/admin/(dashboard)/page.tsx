import { createClient } from '@/lib/supabase/server';
import { Target, Users, TrendingUp, Clock, FileText, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { formatRupiah, formatDate } from '@/lib/utils';
import { Transaction } from '@/types/transaction';

async function getAdminStats() {
  const supabase = await createClient();

  const [campaignsRes, activeRes, transactionsRes] = await Promise.all([
    supabase.from('campaigns').select('id', { count: 'exact' }),
    supabase.from('campaigns').select('id', { count: 'exact' }).eq('status', 'ACTIVE'),
    supabase.from('transactions').select('amount, payment_status'),
  ]);

  const totalCampaigns = campaignsRes.count || 0;
  const activeCampaigns = activeRes.count || 0;

  const txs = transactionsRes.data || [];
  const totalTransactions = txs.length;
  const totalSuccessAmount = txs
    .filter((t) => t.payment_status === 'SUCCESS')
    .reduce((sum, t) => sum + t.amount, 0);
  const pendingTransactions = txs.filter((t) => t.payment_status === 'PENDING').length;

  return {
    totalCampaigns,
    activeCampaigns,
    totalTransactions,
    totalSuccessAmount,
    pendingTransactions,
  };
}

async function getRecentTransactions(): Promise<(Transaction & { campaigns: { title: string } })[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('transactions')
    .select('*, campaigns(title)')
    .order('created_at', { ascending: false })
    .limit(5);

  return (data as any) || [];
}

export default async function AdminDashboardPage() {
  const [stats, recentTransactions] = await Promise.all([
    getAdminStats(),
    getRecentTransactions(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Dashboard Admin</h1>
        <p className="text-navy-500">Ringkasan aktivitas platform donasi</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-navy-200 p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-navy-500">Total Donasi Berhasil</p>
              <h3 className="text-xl font-bold text-navy-900">{formatRupiah(stats.totalSuccessAmount)}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-navy-200 p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent-50 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-accent-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-navy-500">Campaign Aktif</p>
              <h3 className="text-xl font-bold text-navy-900">{stats.activeCampaigns} / {stats.totalCampaigns}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-navy-200 p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-info" />
            </div>
            <div>
              <p className="text-sm font-medium text-navy-500">Total Transaksi</p>
              <h3 className="text-xl font-bold text-navy-900">{stats.totalTransactions}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-navy-200 p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-sm font-medium text-navy-500">Transaksi Pending</p>
              <h3 className="text-xl font-bold text-navy-900">{stats.pendingTransactions}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-white rounded-xl border border-navy-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-navy-100 flex justify-between items-center">
            <h2 className="text-base font-bold text-navy-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-navy-400" />
              Transaksi Terbaru
            </h2>
            <Link
              href="/admin/transactions"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
            >
              Lihat Semua <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-navy-100">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="p-4 hover:bg-navy-50 transition-colors">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-sm font-medium text-navy-900">{tx.donor_name}</p>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      tx.payment_status === 'SUCCESS'
                        ? 'bg-green-100 text-green-700'
                        : tx.payment_status === 'PENDING'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {tx.payment_status}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-navy-500 truncate max-w-[200px]">
                    {tx.campaigns.title}
                  </p>
                  <p className="text-sm font-bold text-primary-600">
                    {formatRupiah(tx.amount)}
                  </p>
                </div>
              </div>
            ))}
            {recentTransactions.length === 0 && (
              <div className="p-6 text-center text-navy-500 text-sm">
                Belum ada transaksi.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

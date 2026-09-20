import { createClient } from '@/lib/supabase/server';
import { Target, Users, TrendingUp, Clock, FileText, ChevronRight, ArrowUpRight } from 'lucide-react';
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
    .limit(6);

  return (data as any) || [];
}

export default async function AdminDashboardPage() {
  const [stats, recentTransactions] = await Promise.all([
    getAdminStats(),
    getRecentTransactions(),
  ]);

  return (
    <div className="space-y-8">
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900 tracking-tight">Ringkasan Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Pantau donasi masuk dan status campaign secara real-time</p>
        </div>
        <div>
          <Link
            href="/master/campaigns/new"
            className="tf-btn primary"
          >
            <span>Buat Campaign</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Stats Grid (.flat-counter-v2) */}
      <div className="flat-counter-v2">
        <div className="counter-box">
          <div className="box-icon icon-success">
            <TrendingUp />
          </div>
          <div className="content-box">
            <div className="title-count">Donasi Berhasil</div>
            <div className="number">{formatRupiah(stats.totalSuccessAmount)}</div>
          </div>
        </div>

        <div className="counter-box">
          <div className="box-icon">
            <Target />
          </div>
          <div className="content-box">
            <div className="title-count">Campaign Aktif</div>
            <div className="number">{stats.activeCampaigns} / {stats.totalCampaigns}</div>
          </div>
        </div>

        <div className="counter-box">
          <div className="box-icon icon-accent">
            <Users />
          </div>
          <div className="content-box">
            <div className="title-count">Total Transaksi</div>
            <div className="number">{stats.totalTransactions}</div>
          </div>
        </div>

        <div className="counter-box">
          <div className="box-icon icon-warning">
            <Clock />
          </div>
          <div className="content-box">
            <div className="title-count">Donasi Menunggu</div>
            <div className="number">{stats.pendingTransactions}</div>
          </div>
        </div>
      </div>

      {/* Recent Transactions (.widget-box-2 + .wrap-table) */}
      <div className="widget-box-2">
        <div className="widget-header">
          <h2 className="title">
            <FileText className="w-5 h-5 text-primary-500" />
            Transaksi Donasi Terbaru
          </h2>
          <Link
            href="/master/transactions"
            className="tf-btn-link text-primary-600 hover:text-primary-700 font-semibold text-sm inline-flex items-center gap-1.5"
          >
            <span>Lihat Semua Transaksi</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="wrap-table">
          <table>
            <thead>
              <tr>
                <th>Donatur</th>
                <th>Campaign</th>
                <th>Jumlah Donasi</th>
                <th>Status</th>
                <th>Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td>
                    <div className="font-semibold text-navy-900">{tx.donor_name}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{tx.transaction_code}</div>
                  </td>
                  <td>
                    <div className="max-w-[280px] truncate text-slate-700 font-medium">
                      {tx.campaigns?.title || 'Umum'}
                    </div>
                  </td>
                  <td>
                    <span className="font-bold text-primary-600">
                      {formatRupiah(tx.amount)}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`status-badge ${
                        tx.payment_status === 'SUCCESS'
                          ? 'status-success'
                          : tx.payment_status === 'PENDING'
                          ? 'status-pending'
                          : 'status-failed'
                      }`}
                    >
                      {tx.payment_status === 'SUCCESS'
                        ? 'Berhasil'
                        : tx.payment_status === 'PENDING'
                        ? 'Menunggu'
                        : tx.payment_status}
                    </span>
                  </td>
                  <td>
                    <span className="text-xs text-slate-500 font-medium">
                      {formatDate(tx.created_at)}
                    </span>
                  </td>
                </tr>
              ))}
              {recentTransactions.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    Belum ada transaksi donasi yang tercatat.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

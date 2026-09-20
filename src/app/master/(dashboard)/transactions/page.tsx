'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, ChevronDown, Loader2, Receipt } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Transaction } from '@/types/transaction';
import { formatRupiah, formatDate } from '@/lib/utils';
import { PAYMENT_STATUS_LABELS } from '@/lib/constants';

type TxWithCampaign = Transaction & { campaigns: { title: string } };
type StatusFilter = 'ALL' | 'SUCCESS' | 'PENDING' | 'FAILED' | 'EXPIRED';

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<TxWithCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    
    let query = supabase
      .from('transactions')
      .select('*, campaigns(title)')
      .order('created_at', { ascending: false });

    if (statusFilter !== 'ALL') {
      query = query.eq('payment_status', statusFilter);
    }

    if (search.trim()) {
      query = query.or(`donor_name.ilike.%${search}%,transaction_code.ilike.%${search}%`);
    }

    const { data, error } = await query.limit(100);

    if (error) {
      console.error('Error fetching transactions:', error);
    } else {
      setTransactions((data as any) || []);
    }
    setLoading(false);
  }, [statusFilter, search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTransactions();
    }, 400);
    return () => clearTimeout(timer);
  }, [fetchTransactions]);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'SUCCESS': return 'status-success';
      case 'PENDING': return 'status-warning';
      case 'FAILED': return 'status-failed';
      case 'EXPIRED': return 'status-draft';
      default: return 'status-draft';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900 tracking-tight">Manajemen Transaksi</h1>
          <p className="text-sm text-slate-500 mt-1">Daftar seluruh riwayat donasi masuk dari para donatur</p>
        </div>
      </div>

      <div className="widget-box-2">
        {/* Filters (.wd-filter) */}
        <div className="wd-filter">
          <div className="ip-group">
            <Search className="icon-search w-4 h-4" />
            <input
              type="text"
              placeholder="Cari nama donatur atau kode transaksi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="select-group">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            >
              <option value="ALL">Semua Status</option>
              <option value="SUCCESS">Berhasil (Success)</option>
              <option value="PENDING">Menunggu (Pending)</option>
              <option value="FAILED">Gagal (Failed)</option>
              <option value="EXPIRED">Kedaluwarsa (Expired)</option>
            </select>
            <ChevronDown className="select-arrow w-4 h-4" />
          </div>
        </div>

        {/* Table (.wrap-table) */}
        <div className="wrap-table">
          <table>
            <thead>
              <tr>
                <th>Kode & Donatur</th>
                <th>Program Campaign</th>
                <th>Nominal</th>
                <th>Status Pembayaran</th>
                <th>Metode</th>
                <th>Waktu Transaksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary-500 mx-auto" />
                    <p className="text-sm text-slate-500 mt-2">Memuat daftar transaksi...</p>
                  </td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-slate-500">
                    Tidak ada transaksi yang cocok dengan pencarian.
                  </td>
                </tr>
              ) : (
                transactions.map((tx) => (
                  <tr key={tx.id}>
                    <td>
                      <div className="font-semibold text-navy-900">{tx.donor_name}</div>
                      <div className="text-xs font-mono text-slate-400 mt-0.5">{tx.transaction_code}</div>
                    </td>
                    <td>
                      <div className="max-w-[280px] truncate font-medium text-slate-700">
                        {tx.campaigns?.title || 'Umum'}
                      </div>
                    </td>
                    <td>
                      <span className="font-bold text-primary-600">
                        {formatRupiah(tx.amount)}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${getStatusBadgeClass(tx.payment_status)}`}>
                        {PAYMENT_STATUS_LABELS[tx.payment_status] || tx.payment_status}
                      </span>
                    </td>
                    <td>
                      <span className="text-xs uppercase font-semibold text-slate-600 px-2 py-1 bg-slate-100 rounded-md">
                        {tx.payment_method || 'Midtrans'}
                      </span>
                    </td>
                    <td>
                      <span className="text-xs text-slate-500 font-medium">
                        {formatDate(tx.created_at)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

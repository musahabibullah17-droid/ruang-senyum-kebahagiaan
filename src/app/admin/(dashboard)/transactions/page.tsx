'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, Filter, Loader2, FileText } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Transaction } from '@/types/transaction';
import { formatRupiah, formatDateShort } from '@/lib/utils';
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
      // Supabase doesn't easily support OR on relation fields in standard query builder without raw SQL,
      // so we filter by donor_name or transaction_code here.
      query = query.or(`donor_name.ilike.%${search}%,transaction_code.ilike.%${search}%`);
    }

    const { data, error } = await query.limit(100); // Limit to 100 recent for now

    if (error) {
      console.error('Error fetching transactions:', error);
    } else {
      setTransactions((data as any) || []);
    }
    setLoading(false);
  }, [statusFilter, search]);

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      fetchTransactions();
    }, 500);
    return () => clearTimeout(timer);
  }, [fetchTransactions]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SUCCESS': return 'bg-green-100 text-green-700';
      case 'PENDING': return 'bg-yellow-100 text-yellow-700';
      case 'FAILED': return 'bg-red-100 text-red-700';
      case 'EXPIRED': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Manajemen Transaksi</h1>
          <p className="text-navy-500">Daftar semua donasi yang masuk</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-navy-200 shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
          <input
            type="text"
            placeholder="Cari nama donatur atau kode transaksi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-navy-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-navy-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className="py-2 px-3 border border-navy-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
          >
            <option value="ALL">Semua Status</option>
            <option value="SUCCESS">Berhasil</option>
            <option value="PENDING">Menunggu</option>
            <option value="FAILED">Gagal</option>
            <option value="EXPIRED">Kedaluwarsa</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-navy-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-navy-50 border-b border-navy-200 text-navy-600">
              <tr>
                <th className="px-6 py-4 font-semibold">Transaksi</th>
                <th className="px-6 py-4 font-semibold">Donatur</th>
                <th className="px-6 py-4 font-semibold">Campaign</th>
                <th className="px-6 py-4 font-semibold">Nominal</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Tanggal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <Loader2 className="w-6 h-6 animate-spin text-primary-500 mx-auto" />
                  </td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-navy-500">
                    <div className="flex flex-col items-center gap-2">
                      <FileText className="w-8 h-8 text-navy-300" />
                      Tidak ada transaksi yang ditemukan
                    </div>
                  </td>
                </tr>
              ) : (
                transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-navy-50/50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-navy-900">{tx.transaction_code}</div>
                      <div className="text-xs text-navy-400 mt-1">Midtrans: {tx.midtrans_order_id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-navy-900">
                        {tx.is_anonymous ? 'Hamba Allah (Anonim)' : tx.donor_name}
                      </div>
                      <div className="text-xs text-navy-500 mt-1">{tx.donor_email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-navy-900 truncate max-w-[200px]">
                        {tx.campaigns.title}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-primary-600">
                        {formatRupiah(tx.amount)}
                      </div>
                      <div className="text-xs text-navy-500 mt-1">{tx.payment_method || '-'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(tx.payment_status)}`}>
                        {PAYMENT_STATUS_LABELS[tx.payment_status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-navy-500 text-sm">
                      {formatDateShort(tx.created_at)}
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

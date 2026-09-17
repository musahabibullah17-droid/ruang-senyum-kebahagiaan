'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, Filter, Loader2, Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Campaign } from '@/types/campaign';
import { formatRupiah, formatDateShort } from '@/lib/utils';
import { CAMPAIGN_STATUS_LABELS } from '@/lib/constants';

export default function AdminCampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [statusLoading, setStatusLoading] = useState<string | null>(null);

  const fetchCampaigns = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    
    let query = supabase
      .from('campaigns')
      .select('*')
      .order('created_at', { ascending: false });

    if (statusFilter !== 'ALL') {
      query = query.eq('status', statusFilter);
    }

    if (search.trim()) {
      query = query.ilike('title', `%${search.trim()}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching campaigns:', error);
    } else {
      setCampaigns((data as Campaign[]) || []);
    }
    setLoading(false);
  }, [statusFilter, search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCampaigns();
    }, 500);
    return () => clearTimeout(timer);
  }, [fetchCampaigns]);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Yakin ingin menghapus campaign "${title}"? Tindakan ini tidak dapat dibatalkan.`)) {
      return;
    }

    setDeleteLoading(id);
    const supabase = createClient();
    const { error } = await supabase.from('campaigns').delete().eq('id', id);

    if (error) {
      alert(`Gagal menghapus: ${error.message}`);
    } else {
      setCampaigns(campaigns.filter(c => c.id !== id));
    }
    setDeleteLoading(null);
  };

  const handleToggleStatus = async (campaign: Campaign) => {
    const newStatus = campaign.status === 'ACTIVE' ? 'DRAFT' : 'ACTIVE';
    const confirmMessage = newStatus === 'ACTIVE' 
      ? `Publish campaign "${campaign.title}"?`
      : `Sembunyikan (Unpublish) campaign "${campaign.title}"?`;

    if (!window.confirm(confirmMessage)) return;

    setStatusLoading(campaign.id);
    const supabase = createClient();
    const { error } = await supabase
      .from('campaigns')
      .update({ status: newStatus })
      .eq('id', campaign.id);

    if (error) {
      alert(`Gagal mengubah status: ${error.message}`);
    } else {
      setCampaigns(campaigns.map(c => c.id === campaign.id ? { ...c, status: newStatus } : c));
    }
    setStatusLoading(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-700';
      case 'COMPLETED': return 'bg-blue-100 text-blue-700';
      case 'CLOSED': return 'bg-gray-100 text-gray-700';
      case 'DRAFT': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Manajemen Campaign</h1>
          <p className="text-navy-500">Kelola semua program donasi</p>
        </div>
        <Link
          href="/admin/campaigns/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 shadow-md transition-all"
        >
          <Plus className="w-5 h-5" />
          Buat Campaign
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-navy-200 shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
          <input
            type="text"
            placeholder="Cari judul campaign..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-navy-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-navy-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-2 px-3 border border-navy-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
          >
            <option value="ALL">Semua Status</option>
            <option value="ACTIVE">Aktif</option>
            <option value="DRAFT">Draf</option>
            <option value="COMPLETED">Selesai</option>
            <option value="CLOSED">Ditutup</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-navy-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-navy-50 border-b border-navy-200 text-navy-600">
              <tr>
                <th className="px-6 py-4 font-semibold">Judul Campaign</th>
                <th className="px-6 py-4 font-semibold">Terkumpul</th>
                <th className="px-6 py-4 font-semibold">Target</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Dibuat Pada</th>
                <th className="px-6 py-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <Loader2 className="w-6 h-6 animate-spin text-primary-500 mx-auto" />
                  </td>
                </tr>
              ) : campaigns.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-navy-500">
                    Tidak ada campaign yang ditemukan
                  </td>
                </tr>
              ) : (
                campaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-navy-50/50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-navy-900 truncate max-w-[300px]">
                        {campaign.title}
                      </div>
                      <div className="text-xs text-navy-400 mt-1">Slug: {campaign.slug}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-primary-600">
                        {formatRupiah(campaign.current_amount)}
                      </div>
                      <div className="text-xs text-navy-500 mt-1">
                        {Math.round((campaign.current_amount / campaign.goal_amount) * 100)}%
                      </div>
                    </td>
                    <td className="px-6 py-4 text-navy-600">
                      {formatRupiah(campaign.goal_amount)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(campaign.status)}`}>
                        {CAMPAIGN_STATUS_LABELS[campaign.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-navy-500 text-sm">
                      {formatDateShort(campaign.created_at)}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleToggleStatus(campaign)}
                        disabled={statusLoading === campaign.id || ['COMPLETED', 'CLOSED'].includes(campaign.status)}
                        className={`p-2 rounded-lg transition-colors ${
                          ['COMPLETED', 'CLOSED'].includes(campaign.status)
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-navy-500 hover:text-navy-900 hover:bg-navy-100'
                        }`}
                        title={campaign.status === 'ACTIVE' ? 'Sembunyikan' : 'Publish'}
                      >
                        {statusLoading === campaign.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : campaign.status === 'ACTIVE' ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                      <Link
                        href={`/admin/campaigns/${campaign.id}/edit`}
                        className="inline-block p-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(campaign.id, campaign.title)}
                        disabled={deleteLoading === campaign.id}
                        className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus"
                      >
                        {deleteLoading === campaign.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
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

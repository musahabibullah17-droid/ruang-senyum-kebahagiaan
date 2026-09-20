'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, ChevronDown, Loader2, Plus, Edit, Trash2, Eye, EyeOff, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Campaign } from '@/types/campaign';
import { formatRupiah, formatDateShort } from '@/lib/utils';
import { CAMPAIGN_STATUS_LABELS } from '@/lib/constants';
import CircularProgress from '@/components/admin/CircularProgress';

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
    }, 400);
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

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'status-active';
      case 'COMPLETED': return 'status-completed';
      case 'CLOSED': return 'status-closed';
      case 'DRAFT': return 'status-draft';
      default: return 'status-draft';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900 tracking-tight">Manajemen Campaign</h1>
          <p className="text-sm text-slate-500 mt-1">Kelola dan publikasikan program donasi Ruang Senyum</p>
        </div>
        <Link
          href="/master/campaigns/new"
          className="tf-btn primary"
        >
          <span>Buat Campaign</span>
          <Plus className="w-4 h-4" />
        </Link>
      </div>

      <div className="widget-box-2">
        {/* Filters (.wd-filter) */}
        <div className="wd-filter">
          <div className="ip-group">
            <Search className="icon-search w-4 h-4" />
            <input
              type="text"
              placeholder="Cari judul campaign..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="select-group">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">Semua Status</option>
              <option value="ACTIVE">Aktif (Published)</option>
              <option value="DRAFT">Draf (Disembunyikan)</option>
              <option value="COMPLETED">Selesai</option>
              <option value="CLOSED">Ditutup</option>
            </select>
            <ChevronDown className="select-arrow w-4 h-4" />
          </div>
        </div>

        {/* Table (.wrap-table) */}
        <div className="wrap-table">
          <table>
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Terkumpul</th>
                <th>Target</th>
                <th>Ketercapaian</th>
                <th>Status</th>
                <th>Dibuat Pada</th>
                <th className="text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary-500 mx-auto" />
                    <p className="text-sm text-slate-500 mt-2">Memuat daftar campaign...</p>
                  </td>
                </tr>
              ) : campaigns.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-slate-500">
                    Tidak ada campaign yang sesuai kriteria pencarian.
                  </td>
                </tr>
              ) : (
                campaigns.map((campaign) => {
                  const percentage = campaign.goal_amount > 0
                    ? Math.round((campaign.current_amount / campaign.goal_amount) * 100)
                    : 0;

                  return (
                    <tr key={campaign.id}>
                      <td>
                        <div className="campaign-media">
                          <div className="thumbnail">
                            {campaign.cover_image ? (
                              <img
                                src={campaign.cover_image}
                                alt={campaign.title}
                                loading="lazy"
                              />
                            ) : (
                              <div className="placeholder-icon">
                                <ImageIcon className="w-5 h-5 text-slate-400" />
                              </div>
                            )}
                          </div>
                          <div className="info">
                            <div className="title" title={campaign.title}>
                              {campaign.title}
                            </div>
                            <div className="meta">Slug: {campaign.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="font-bold text-primary-600 text-[15px]">
                          {formatRupiah(campaign.current_amount)}
                        </div>
                      </td>
                      <td>
                        <span className="font-semibold text-slate-700">
                          {formatRupiah(campaign.goal_amount)}
                        </span>
                      </td>
                      <td>
                        <CircularProgress percentage={percentage} />
                      </td>
                      <td>
                        <span className={`status-badge ${getStatusBadgeClass(campaign.status)}`}>
                          {CAMPAIGN_STATUS_LABELS[campaign.status]}
                        </span>
                      </td>
                      <td>
                        <span className="text-xs text-slate-500 font-medium">
                          {formatDateShort(campaign.created_at)}
                        </span>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button
                            onClick={() => handleToggleStatus(campaign)}
                            disabled={statusLoading === campaign.id || ['COMPLETED', 'CLOSED'].includes(campaign.status)}
                            className={`btn-action-icon ${
                              ['COMPLETED', 'CLOSED'].includes(campaign.status)
                                ? 'opacity-40 cursor-not-allowed'
                                : ''
                            }`}
                            title={campaign.status === 'ACTIVE' ? 'Sembunyikan' : 'Publish'}
                          >
                            {statusLoading === campaign.id ? (
                              <Loader2 className="w-4 h-4 animate-spin text-primary-600" />
                            ) : campaign.status === 'ACTIVE' ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4 text-emerald-600" />
                            )}
                          </button>
                          <Link
                            href={`/master/campaigns/${campaign.id}/edit`}
                            className="btn-action-icon"
                            title="Edit Campaign"
                          >
                            <Edit className="w-4 h-4 text-primary-600" />
                          </Link>
                          <button
                            onClick={() => handleDelete(campaign.id, campaign.title)}
                            disabled={deleteLoading === campaign.id}
                            className="btn-action-icon delete"
                            title="Hapus Campaign"
                          >
                            {deleteLoading === campaign.id ? (
                              <Loader2 className="w-4 h-4 animate-spin text-red-500" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, Filter, Loader2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CampaignCard from '@/components/campaign/CampaignCard';
import { createClient } from '@/lib/supabase/client';
import { Campaign } from '@/types/campaign';
import { CAMPAIGNS_PER_PAGE } from '@/lib/constants';
import { cn } from '@/lib/utils';

type FilterStatus = 'ALL' | 'ACTIVE' | 'COMPLETED';

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterStatus>('ALL');
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchCampaigns = useCallback(
    async (pageNum: number, append = false) => {
      const supabase = createClient();
      let query = supabase
        .from('campaigns')
        .select('*')
        .order('created_at', { ascending: false })
        .range(pageNum * CAMPAIGNS_PER_PAGE, (pageNum + 1) * CAMPAIGNS_PER_PAGE - 1);

      if (filter === 'ALL') {
        query = query.in('status', ['ACTIVE', 'COMPLETED']);
      } else {
        query = query.eq('status', filter);
      }

      if (search.trim()) {
        query = query.ilike('title', `%${search.trim()}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching campaigns:', error);
        return;
      }

      const results = (data as Campaign[]) || [];
      setHasMore(results.length === CAMPAIGNS_PER_PAGE);

      if (append) {
        setCampaigns((prev) => [...prev, ...results]);
      } else {
        setCampaigns(results);
      }
    },
    [filter, search]
  );

  // Parse initial search query from URL on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('q');
      if (q) setSearch(q);
    }
  }, []);

  // Initial load and filter/search changes
  useEffect(() => {
    setLoading(true);
    setPage(0);
    fetchCampaigns(0).finally(() => setLoading(false));
  }, [fetchCampaigns]);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchCampaigns(nextPage, true);
    setLoadingMore(false);
  };

  const filterButtons: { label: string; value: FilterStatus }[] = [
    { label: 'Semua', value: 'ALL' },
    { label: 'Aktif', value: 'ACTIVE' },
    { label: 'Selesai', value: 'COMPLETED' },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-white pt-16 pb-8 border-b border-navy-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-navy-900 mb-3 tracking-tight">
              Eksplorasi Campaign
            </h1>
            <p className="text-lg text-navy-600 max-w-2xl">
              Temukan campaign yang membutuhkan bantuan Anda. Setiap donasi memberikan dampak yang nyata.
            </p>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="py-8 bg-white border-b border-navy-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              {/* Search */}
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                <input
                  type="text"
                  placeholder="Cari campaign..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-navy-200 rounded-lg text-sm text-navy-900 placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-navy-400" />
                {filterButtons.map((btn) => (
                  <button
                    key={btn.value}
                    onClick={() => setFilter(btn.value)}
                    className={cn(
                      'px-4 py-2 text-sm font-medium rounded-lg transition-all',
                      filter === btn.value
                        ? 'bg-primary-500 text-white shadow-md'
                        : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
                    )}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Campaign Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-lg overflow-hidden border border-navy-100 shadow-sm">
                    <div className="skeleton h-48" />
                    <div className="p-5 space-y-3">
                      <div className="skeleton h-5 w-3/4" />
                      <div className="skeleton h-4 w-full" />
                      <div className="skeleton h-2 w-full" />
                      <div className="skeleton h-4 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : campaigns.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-navy-400" />
                </div>
                <h3 className="text-lg font-semibold text-navy-700 mb-2">
                  Campaign tidak ditemukan
                </h3>
                <p className="text-sm text-navy-500">
                  Coba ubah kata kunci pencarian atau filter Anda.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
                  {campaigns.map((campaign) => (
                    <CampaignCard key={campaign.id} campaign={campaign} />
                  ))}
                </div>

                {/* Load More */}
                {hasMore && (
                  <div className="text-center mt-10">
                    <button
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      className="inline-flex items-center gap-2 px-8 py-3 bg-white text-primary-600 text-sm font-semibold rounded-lg border border-primary-200 hover:bg-primary-50 disabled:opacity-50 transition-all shadow-sm"
                    >
                      {loadingMore ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Memuat...
                        </>
                      ) : (
                        'Muat Lebih Banyak'
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

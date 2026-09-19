import { HandHeart, Banknote, Users } from 'lucide-react';
import { formatRupiah } from '@/lib/utils';

interface StatsSectionProps {
  stats: {
    totalCampaigns: number;
    totalAmount: number;
    totalDonations: number;
  };
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="bg-primary-600 border-b-4 border-primary-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-white/20">
          <div className="flex-1 px-6 py-10 sm:py-12 flex flex-col items-center justify-center text-center group">
            <HandHeart className="w-10 h-10 text-white/90 mb-4 group-hover:scale-110 transition-transform" />
            <p className="text-4xl md:text-5xl font-black text-white tracking-tight mb-1">{stats.totalCampaigns}</p>
            <p className="text-xs md:text-sm font-bold text-primary-100 uppercase tracking-widest">Campaign</p>
          </div>
          <div className="flex-1 px-6 py-10 sm:py-12 flex flex-col items-center justify-center text-center group">
            <Banknote className="w-10 h-10 text-white/90 mb-4 group-hover:scale-110 transition-transform" />
            <p className="text-4xl md:text-5xl font-black text-white tracking-tight mb-1">{formatRupiah(stats.totalAmount)}</p>
            <p className="text-xs md:text-sm font-bold text-primary-100 uppercase tracking-widest">Dana Tersalurkan</p>
          </div>
          <div className="flex-1 px-6 py-10 sm:py-12 flex flex-col items-center justify-center text-center group">
            <Users className="w-10 h-10 text-white/90 mb-4 group-hover:scale-110 transition-transform" />
            <p className="text-4xl md:text-5xl font-black text-white tracking-tight mb-1">{stats.totalDonations}</p>
            <p className="text-xs md:text-sm font-bold text-primary-100 uppercase tracking-widest">Orang Baik Terlibat</p>
          </div>
        </div>
      </div>
    </section>
  );
}

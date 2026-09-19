import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import CampaignCard from '@/components/campaign/CampaignCard';
import MobileCampaignCarousel from '@/components/campaign/MobileCampaignCarousel';
import { Campaign } from '@/types/campaign';

interface LatestCampaignsSectionProps {
  campaigns: Campaign[];
}

export default function LatestCampaignsSection({ campaigns }: LatestCampaignsSectionProps) {
  if (campaigns.length === 0) return null;

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900">
              Campaign Terbaru
            </h2>
          </div>
          <Link
            href="/campaigns"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
          >
            Lihat Semua
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
        
        <MobileCampaignCarousel campaigns={campaigns} />

        <div className="md:hidden mt-6 text-center">
          <Link
            href="/campaigns"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600"
          >
            Lihat Semua Campaign
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

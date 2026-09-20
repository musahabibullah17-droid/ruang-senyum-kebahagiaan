import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import CampaignCard from '@/components/campaign/CampaignCard';
import MobileCampaignCarousel from '@/components/campaign/MobileCampaignCarousel';
import { Campaign } from '@/types/campaign';

interface FeaturedCampaignsSectionProps {
  campaigns: Campaign[];
}

export default function FeaturedCampaignsSection({ campaigns }: FeaturedCampaignsSectionProps) {
  if (campaigns.length === 0) return null;

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900">
              Butuh Bantuan Segera
            </h2>
          </div>
          <Link
            href="/campaigns"
            className="tf-btn-link hidden sm:inline-flex !text-sm !font-bold"
          >
            <span>Lihat Semua</span>
            <ArrowRight className="w-4 h-4 link-icon" />
          </Link>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>

        {/* Mobile Carousel */}
        <MobileCampaignCarousel campaigns={campaigns} />

        <div className="sm:hidden mt-6 text-center">
          <Link
            href="/campaigns"
            className="tf-btn-link inline-flex !text-sm !font-bold"
          >
            <span>Lihat Semua Campaign</span>
            <ArrowRight className="w-4 h-4 link-icon" />
          </Link>
        </div>
      </div>
    </section>
  );
}

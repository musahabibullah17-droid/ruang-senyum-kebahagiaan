import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import FeaturedCampaignsSection from '@/components/home/FeaturedCampaignsSection';
import LatestCampaignsSection from '@/components/home/LatestCampaignsSection';
import StatsSection from '@/components/home/StatsSection';
import GallerySection from '@/components/home/GallerySection';
import CTASection from '@/components/home/CTASection';
import { createPublicClient } from '@/lib/supabase/public';
import { Campaign } from '@/types/campaign';

export const revalidate = 60; // 60 seconds ISR

async function getStats() {
  const supabase = createPublicClient();

  const [campaignsRes, transactionsRes] = await Promise.all([
    supabase
      .from('campaigns')
      .select('id', { count: 'exact' })
      .in('status', ['ACTIVE', 'COMPLETED']),
    supabase
      .from('transactions')
      .select('amount')
      .eq('payment_status', 'SUCCESS'),
  ]);

  const totalCampaigns = campaignsRes.count || 0;
  const totalDonations = transactionsRes.data?.length || 0;
  const totalAmount = transactionsRes.data?.reduce((sum, t) => sum + t.amount, 0) || 0;

  return { totalCampaigns, totalDonations, totalAmount };
}

async function getFeaturedCampaigns(): Promise<Campaign[]> {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from('campaigns')
    .select('*')
    .eq('status', 'ACTIVE')
    .order('current_amount', { ascending: false })
    .limit(3);

  return (data as Campaign[]) || [];
}

async function getLatestCampaigns(): Promise<Campaign[]> {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from('campaigns')
    .select('*')
    .in('status', ['ACTIVE', 'COMPLETED'])
    .order('created_at', { ascending: false })
    .limit(4);

  return (data as Campaign[]) || [];
}

export default async function HomePage() {
  const [stats, featuredCampaigns, latestCampaigns] = await Promise.all([
    getStats(),
    getFeaturedCampaigns(),
    getLatestCampaigns(),
  ]);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <WhyChooseUsSection />
        <FeaturedCampaignsSection campaigns={featuredCampaigns} />
        <LatestCampaignsSection campaigns={latestCampaigns} />
        <StatsSection stats={stats} />
        <GallerySection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

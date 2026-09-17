import { notFound } from 'next/navigation';
import { createPublicClient } from '@/lib/supabase/public';
import { CampaignWithImages } from '@/types/campaign';
import { Transaction } from '@/types/transaction';
import CampaignDetailClient from './CampaignDetailClient';

export const revalidate = 60; // 60 seconds ISR

interface CampaignDetailPageProps {
  params: Promise<{ slug: string }>;
}

async function getCampaign(slug: string): Promise<CampaignWithImages | null> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('campaigns')
    .select('*, campaign_images(*)')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;
  return data as CampaignWithImages;
}

async function getRecentDonors(campaignId: string): Promise<Transaction[]> {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from('transactions')
    .select('*')
    .eq('campaign_id', campaignId)
    .eq('payment_status', 'SUCCESS')
    .order('created_at', { ascending: false })
    .limit(10);

  return (data as Transaction[]) || [];
}

async function getDonorCount(campaignId: string): Promise<number> {
  const supabase = createPublicClient();
  const { count } = await supabase
    .from('transactions')
    .select('id', { count: 'exact' })
    .eq('campaign_id', campaignId)
    .eq('payment_status', 'SUCCESS');

  return count || 0;
}

export async function generateMetadata({ params }: CampaignDetailPageProps) {
  const { slug } = await params;
  const campaign = await getCampaign(slug);
  if (!campaign) return { title: 'Campaign Tidak Ditemukan' };

  return {
    title: campaign.title,
    description: campaign.description.substring(0, 160),
  };
}

export default async function CampaignDetailPage({ params }: CampaignDetailPageProps) {
  const { slug } = await params;
  const campaign = await getCampaign(slug);

  if (!campaign) {
    notFound();
  }

  const [recentDonors, donorCount] = await Promise.all([
    getRecentDonors(campaign.id),
    getDonorCount(campaign.id),
  ]);

  return (
    <CampaignDetailClient
      campaign={campaign}
      recentDonors={recentDonors}
      donorCount={donorCount}
    />
  );
}

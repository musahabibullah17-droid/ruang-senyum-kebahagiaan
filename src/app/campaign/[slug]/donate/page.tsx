import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Campaign } from '@/types/campaign';
import DonationFormClient from './DonationFormClient';

interface DonatePageProps {
  params: Promise<{ slug: string }>;
}

async function getCampaign(slug: string): Promise<Campaign | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'ACTIVE')
    .single();

  if (error || !data) return null;
  return data as Campaign;
}

export async function generateMetadata({ params }: DonatePageProps) {
  const { slug } = await params;
  const campaign = await getCampaign(slug);
  if (!campaign) return { title: 'Campaign Tidak Ditemukan' };

  return {
    title: `Donasi untuk ${campaign.title}`,
    description: `Berikan donasi untuk campaign ${campaign.title}`,
  };
}

export default async function DonatePage({ params }: DonatePageProps) {
  const { slug } = await params;
  const campaign = await getCampaign(slug);

  if (!campaign) {
    notFound();
  }

  return <DonationFormClient campaign={campaign} />;
}

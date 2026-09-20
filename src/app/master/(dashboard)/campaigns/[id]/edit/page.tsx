import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import CampaignForm from '@/components/admin/CampaignForm';
import { createClient } from '@/lib/supabase/server';
import { Campaign } from '@/types/campaign';

interface EditCampaignPageProps {
  params: Promise<{ id: string }>;
}

async function getCampaign(id: string): Promise<Campaign | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return null;
  return data as Campaign;
}

export default async function EditCampaignPage({ params }: EditCampaignPageProps) {
  const { id } = await params;
  const campaign = await getCampaign(id);

  if (!campaign) {
    notFound();
  }

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/master/campaigns"
          className="p-2 bg-white text-navy-500 hover:text-navy-900 border border-navy-200 rounded-lg shadow-sm transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Edit Campaign</h1>
          <p className="text-navy-500">Ubah detail program donasi</p>
        </div>
      </div>

      <CampaignForm initialData={campaign} isEdit={true} />
    </div>
  );
}

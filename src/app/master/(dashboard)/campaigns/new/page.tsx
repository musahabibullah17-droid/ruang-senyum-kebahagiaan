import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import CampaignForm from '@/components/admin/CampaignForm';

export default function NewCampaignPage() {
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
          <h1 className="text-2xl font-bold text-navy-900">Buat Campaign Baru</h1>
          <p className="text-navy-500">Mulai program donasi baru</p>
        </div>
      </div>

      <CampaignForm isEdit={false} />
    </div>
  );
}

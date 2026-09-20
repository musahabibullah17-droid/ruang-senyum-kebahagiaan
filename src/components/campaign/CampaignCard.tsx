import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Campaign } from '@/types/campaign';
import { formatRupiah, calculateProgress, truncateText } from '@/lib/utils';

interface CampaignCardProps {
  campaign: Campaign;
}

export default function CampaignCard({ campaign }: CampaignCardProps) {
  const progress = calculateProgress(campaign.current_amount, campaign.goal_amount);
  const isCompleted = campaign.status === 'COMPLETED';

  return (
    <Link
      href={`/campaign/${campaign.slug}`}
      className="group block bg-white rounded-lg overflow-hidden border border-navy-100 hover:border-primary-200 transition-all duration-300 hover:shadow-md h-full flex flex-col justify-between"
    >
      {/* Top Image Container */}
      <div>
        <div className="relative aspect-[16/10] overflow-hidden bg-navy-100">
          {campaign.cover_image ? (
            <Image
              src={campaign.cover_image}
              alt={campaign.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 text-sm font-semibold">
              Foto Campaign
            </div>
          )}

          {/* Status Badge */}
          {isCompleted && (
            <div className="absolute top-3 left-3 px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded shadow-sm">
              Selesai
            </div>
          )}
        </div>

        {/* Card Content Body */}
        <div className="p-5 space-y-4">
          <h3 className="text-base font-bold text-navy-900 leading-snug group-hover:text-primary-600 transition-colors line-clamp-2">
            {campaign.title}
          </h3>
          <p className="text-sm text-navy-500 leading-relaxed line-clamp-2">
            {truncateText(campaign.description.replace(/<[^>]*>/g, ''), 95)}
          </p>

          {/* Progress Section */}
          <div className="space-y-2">
            <div className="w-full h-2 bg-navy-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-600 rounded-full progress-bar-animated transition-all duration-500"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <div className="flex justify-between items-baseline">
              <div>
                <span className="text-sm font-bold text-primary-600">
                  {formatRupiah(campaign.current_amount)}
                </span>
                <span className="text-xs text-navy-400 ml-1">terkumpul</span>
              </div>
              <span className="text-xs text-navy-400">{Math.round(progress)}%</span>
            </div>
            <p className="text-xs text-navy-400">
              Target: {formatRupiah(campaign.goal_amount)}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="px-5 pb-5 pt-3 border-t border-navy-50">
        <span className="tf-btn-link !text-xs !font-bold">
          <span>Lihat Campaign</span>
          <ArrowRight className="w-3.5 h-3.5 link-icon" />
        </span>
      </div>
    </Link>
  );
}

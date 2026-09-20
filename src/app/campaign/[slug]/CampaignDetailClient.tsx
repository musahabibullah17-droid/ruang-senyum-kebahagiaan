'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Share2, Clock, Users, Calendar, ArrowLeft, Camera } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Lightbox from '@/components/ui/Lightbox';
import { CampaignWithImages } from '@/types/campaign';
import { Transaction } from '@/types/transaction';
import { formatRupiah, calculateProgress, getRemainingDays, formatDate } from '@/lib/utils';

interface CampaignDetailClientProps {
  campaign: CampaignWithImages;
  recentDonors: Transaction[];
  donorCount: number;
}

export default function CampaignDetailClient({
  campaign,
  recentDonors,
  donorCount,
}: CampaignDetailClientProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const progress = calculateProgress(campaign.current_amount, campaign.goal_amount);
  const remainingDays = getRemainingDays(campaign.end_date);
  const isActive = campaign.status === 'ACTIVE';

  const galleryImages = campaign.campaign_images
    ?.sort((a, b) => a.sort_order - b.sort_order)
    .map((img) => ({ url: img.image_url, caption: img.caption })) || [];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: campaign.title,
          text: `Bantu donasi untuk: ${campaign.title}`,
          url: window.location.href,
        });
      } catch {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link berhasil disalin!');
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 pb-24 md:pb-8">
        {/* Breadcrumb */}
        <div className="bg-white md:bg-transparent border-b border-slate-100 md:border-none md:pt-6 md:pb-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-0">
            <Link
              href="/campaigns"
              className="inline-flex items-center gap-2 md:gap-1.5 px-1 py-1 pr-4 md:px-0 md:py-0 bg-slate-50 border border-slate-100 md:bg-transparent md:border-none rounded-full md:rounded-none text-sm font-semibold text-slate-600 hover:text-[#0284c7] transition-all w-fit"
            >
              <div className="md:hidden w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100">
                <ArrowLeft className="w-3.5 h-3.5 text-slate-700" />
              </div>
              <ArrowLeft className="hidden md:block w-4 h-4" />
              Kembali
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Cover Image */}
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-navy-100 shadow-lg">
                {campaign.cover_image ? (
                  <Image
                    src={campaign.cover_image}
                    alt={campaign.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary-200 to-primary-400 flex items-center justify-center">
                    <Heart className="w-20 h-20 text-white/50" />
                  </div>
                )}

                {/* Status overlay */}
                {campaign.status === 'COMPLETED' && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="px-6 py-3 bg-accent-500 text-white font-bold rounded-full text-lg shadow-xl">
                      Target Tercapai! ✓
                    </div>
                  </div>
                )}
                {campaign.status === 'CLOSED' && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="px-6 py-3 bg-navy-700 text-white font-bold rounded-full text-lg shadow-xl">
                      Campaign Ditutup
                    </div>
                  </div>
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-bold text-navy-900 leading-tight">
                {campaign.title}
              </h1>

              {/* Stats on mobile */}
              <div className="lg:hidden">
                <CampaignSidebar
                  campaign={campaign}
                  progress={progress}
                  remainingDays={remainingDays}
                  donorCount={donorCount}
                  isActive={isActive}
                  onShare={handleShare}
                />
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl p-6 border border-navy-100 shadow-sm">
                <h2 className="text-lg font-bold text-navy-900 mb-4">Tentang Campaign</h2>
                <div
                  className={`prose prose-sm prose-navy max-w-none text-navy-700 leading-relaxed whitespace-pre-wrap ${
                    !showFullDescription && campaign.description.length > 500
                      ? 'max-h-60 overflow-hidden relative'
                      : ''
                  }`}
                >
                  {campaign.description}
                  {!showFullDescription && campaign.description.length > 500 && (
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
                  )}
                </div>
                {campaign.description.length > 500 && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="mt-3 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    {showFullDescription ? 'Tampilkan Lebih Sedikit' : 'Baca Selengkapnya'}
                  </button>
                )}
              </div>

              {/* Gallery */}
              {galleryImages.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-navy-100 shadow-sm">
                  <h2 className="text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
                    <Camera className="w-5 h-5 text-primary-500" />
                    Galeri Dokumentasi
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {galleryImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => openLightbox(index)}
                        className="relative aspect-square rounded-xl overflow-hidden bg-navy-100 group cursor-pointer"
                      >
                        <Image
                          src={img.url}
                          alt={img.caption || `Gallery ${index + 1}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Donors */}
              {recentDonors.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-navy-100 shadow-sm">
                  <h2 className="text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary-500" />
                    Donatur ({donorCount})
                  </h2>
                  <div className="space-y-3">
                    {recentDonors.map((donor) => (
                      <div
                        key={donor.id}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-navy-50 transition-colors"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-bold text-primary-700">
                            {donor.is_anonymous
                              ? '?'
                              : donor.donor_name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-navy-900">
                            {donor.is_anonymous ? 'Hamba Allah' : donor.donor_name}
                          </p>
                          <p className="text-sm text-primary-600 font-medium">
                            {formatRupiah(donor.amount)}
                          </p>
                          {donor.message && (
                            <p className="text-xs text-navy-500 mt-1 line-clamp-2">
                              &quot;{donor.message}&quot;
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar (Desktop) */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <CampaignSidebar
                  campaign={campaign}
                  progress={progress}
                  remainingDays={remainingDays}
                  donorCount={donorCount}
                  isActive={isActive}
                  onShare={handleShare}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sticky bottom bar (mobile) */}
        {isActive && (
          <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-navy-100 p-4 md:hidden z-40">
            <div className="flex gap-3">
              <button
                onClick={handleShare}
                className="tf-btn style-border !h-12 !w-12 !p-0 !rounded-xl text-primary-600 shrink-0"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <Link
                href={`/campaign/${campaign.slug}/donate`}
                className="tf-btn style-solid flex-1 !h-12 !rounded-xl text-white font-bold"
              >
                <Heart className="w-5 h-5" />
                <span>Donasi Sekarang</span>
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer />

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={galleryImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}

// Sidebar subcomponent
function CampaignSidebar({
  campaign,
  progress,
  remainingDays,
  donorCount,
  isActive,
  onShare,
}: {
  campaign: CampaignWithImages;
  progress: number;
  remainingDays: number | null;
  donorCount: number;
  isActive: boolean;
  onShare: () => void;
}) {
  const [activeBtn, setActiveBtn] = useState<number>(0);

  return (
    <div className="bg-white rounded-2xl border border-navy-100 shadow-sm overflow-hidden">
      {/* Progress */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <span className="text-2xl font-bold text-primary-600">
              {formatRupiah(campaign.current_amount)}
            </span>
            <span className="text-sm text-navy-400">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full h-3 bg-navy-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full progress-bar-animated"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-navy-500">
            terkumpul dari {formatRupiah(campaign.goal_amount)}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-navy-50 rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-navy-900">{donorCount}</p>
            <p className="text-xs text-navy-500">Donatur</p>
          </div>
          <div className="bg-navy-50 rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-navy-900">
              {remainingDays !== null ? remainingDays : '∞'}
            </p>
            <p className="text-xs text-navy-500">Hari Lagi</p>
          </div>
        </div>

        {/* Dates */}
        {(campaign.start_date || campaign.end_date) && (
          <div className="flex items-center gap-2 text-xs text-navy-500 pt-2 border-t border-navy-100">
            <Calendar className="w-3.5 h-3.5" />
            <span>
              {campaign.start_date && formatDate(campaign.start_date)}
              {campaign.end_date && ` - ${formatDate(campaign.end_date)}`}
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-4 bg-navy-50/50 border-t border-navy-100">
        <div 
          className="btn-campaign-pair"
          onMouseLeave={() => setActiveBtn(0)}
        >
          {isActive ? (
            <Link
              href={`/campaign/${campaign.slug}/donate`}
              onMouseEnter={() => setActiveBtn(0)}
              onClick={() => setActiveBtn(0)}
              className={`btn-campaign-item ${activeBtn === 0 ? 'is-active' : 'is-inactive'}`}
            >
              <Heart className="w-5 h-5" />
              <span>Donasi Sekarang</span>
            </Link>
          ) : (
            <div className="text-center py-3.5 bg-navy-200 text-navy-500 font-medium rounded-xl">
              Campaign Tidak Aktif
            </div>
          )}
          <button
            onClick={onShare}
            onMouseEnter={() => setActiveBtn(1)}
            className={`btn-campaign-item ${activeBtn === 1 ? 'is-active' : 'is-inactive'}`}
          >
            <Share2 className="w-4 h-4" />
            <span>Bagikan Campaign</span>
          </button>
        </div>
      </div>
    </div>
  );
}

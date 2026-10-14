'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronRight, 
  Trash2, 
  CheckCircle2, 
  RefreshCw, 
  X, 
  Heart, 
  Phone, 
  Mail, 
  Share2,
  MapPin,
  Clock,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { APP_NAME } from '@/lib/constants';

// Custom icons tailored to match Kitabisa's visual style with crisp details
function BantuanIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M20 11.5C20 16.1944 16.1944 20 11.5 20C9.897 20 8.3979 19.5559 7.11979 18.7885L3.5 20L4.7115 16.3802C3.9441 15.1021 3.5 13.603 3.5 12C3.5 7.30558 7.30558 3.5 12 3.5C16.6944 3.5 20 7.30558 20 11.5Z" 
        stroke="#0284c7" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M10.2 9.5C10.2 8.4 11 7.6 12 7.6C13 7.6 13.8 8.4 13.8 9.4C13.8 10.6 12 11.2 12 12.3" 
        stroke="#0284c7" 
        strokeWidth="1.8" 
        strokeLinecap="round"
      />
      <circle cx="12" cy="15.2" r="0.8" fill="#0284c7" />
    </svg>
  );
}

function TentangIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="#0284c7" strokeWidth="1.8" />
      <circle cx="12" cy="8" r="1.8" fill="#0284c7" />
      <circle cx="8" cy="15" r="1.8" fill="#0284c7" />
      <circle cx="16" cy="15" r="1.8" fill="#0284c7" />
      <path d="M12 9.8V12M12 12L9.3 13.7M12 12L14.7 13.7" stroke="#0284c7" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function SyaratIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M6 3.5H15.5L19 7V19.5C19 20.3284 18.3284 21 17.5 21H6.5C5.67157 21 5 20.3284 5 19.5V4.5C5 3.67157 5.67157 3.5 6 3.5Z" 
        stroke="#64748b" 
        strokeWidth="1.6" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path d="M14.5 3.5V7.5H18.5" stroke="#64748b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path 
        d="M17 11.5H19.5V17L18.25 16L17 17V11.5Z" 
        fill="#0284c7" 
        stroke="#0284c7" 
        strokeWidth="1.2" 
        strokeLinejoin="round"
      />
      <line x1="8" y1="9" x2="12" y2="9" stroke="#94a3b8" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="8" y1="13" x2="14" y2="13" stroke="#94a3b8" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="8" y1="17" x2="13" y2="17" stroke="#94a3b8" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function AkuntabilitasIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M6 3.5H15.5L19 7V13.5M5 4.5V19.5C5 20.3284 5.67157 21 6.5 21H12.5" 
        stroke="#64748b" 
        strokeWidth="1.6" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path d="M14.5 3.5V7.5H18.5" stroke="#64748b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="8" y1="9" x2="12" y2="9" stroke="#94a3b8" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="8" y1="13" x2="11" y2="13" stroke="#94a3b8" strokeWidth="1.6" strokeLinecap="round" />
      {/* Magnifying glass badge */}
      <circle cx="16.5" cy="17.5" r="3" stroke="#0284c7" strokeWidth="1.8" />
      <path d="M18.8 19.8L21.5 22.5" stroke="#0284c7" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function LayananBantuanCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
          Layanan Bantuan Resmi
        </h3>
        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
          Online
        </span>
      </div>

      <div className="space-y-3">
        <a
          href="https://wa.me/6282232552327"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Phone className="w-5 h-5" />
            </div>
            <p className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
              Hubungi Kami via WhatsApp
            </p>
          </div>
          <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors shrink-0" />
        </a>

        <a
          href="mailto:yayasanruangsenyumkebahagiaan@gmail.com"
          className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/80 hover:border-sky-300 hover:bg-sky-50/20 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <p className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
              Hubungi Kami via Email
            </p>
          </div>
          <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-sky-600 transition-colors shrink-0" />
        </a>
      </div>

      <div className="space-y-2 pt-2 border-t border-slate-100 text-xs sm:text-sm text-slate-600">
        <div className="flex items-start gap-2.5">
          <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <span>Senin - Minggu (08.00 - 21.00 WIB)</span>
        </div>
        <div className="flex items-start gap-2.5">
          <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <span>Jl. Mr. Wahid, Wirowongso, Ajung, Jember, Jawa Timur</span>
        </div>
      </div>
    </div>
  );
}

export default function UserClient() {
  const [showClearModal, setShowClearModal] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [clearedSuccess, setClearedSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeBannerBtn, setActiveBannerBtn] = useState<number>(0);

  const handleClearCache = async () => {
    if (clearing) return;
    setClearing(true);
    try {
      if (typeof window !== 'undefined') {
        // Clear caches API if available
        if ('caches' in window) {
          try {
            const names = await window.caches.keys();
            await Promise.all(names.map(name => window.caches.delete(name)));
          } catch (e) {
            console.warn('Cache API clear:', e);
          }
        }
        // Clear storages
        try {
          localStorage.clear();
          sessionStorage.clear();
        } catch (e) {
          console.warn('Storage clear:', e);
        }
        // Unregister service worker if any
        if ('serviceWorker' in navigator) {
          try {
            const registrations = await navigator.serviceWorker.getRegistrations();
            await Promise.all(registrations.map(r => r.unregister()));
          } catch (e) {
            console.warn('ServiceWorker unregister:', e);
          }
        }
      }
      setTimeout(() => {
        setClearing(false);
        setClearedSuccess(true);
        setTimeout(() => {
          setShowClearModal(false);
          setClearedSuccess(false);
          window.location.reload();
        }, 1200);
      }, 700);
    } catch {
      setClearing(false);
      setShowClearModal(false);
      window.location.reload();
    }
  };

  const handleShare = async () => {
    if (typeof window !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: APP_NAME,
          text: 'Mari berbagi kebahagiaan dan kebaikan bersama Ruang Senyum Kebahagiaan.',
          url: window.location.origin,
        });
      } catch {
        // user cancelled or share unsupported
      }
    } else {
      if (typeof window !== 'undefined') {
        navigator.clipboard.writeText(window.location.origin);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      }
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-8 lg:space-y-7">
      
      {/* Desktop Page Title Header (Visible on Desktop) */}
      <div className="hidden lg:flex items-center justify-between pb-6 border-b border-slate-200/80">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Layanan Kami
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mt-1">
            Pusat informasi dan bantuan resmi {APP_NAME}.
          </p>
        </div>
        <Link
          href="/campaigns"
          className="btn-nav-donate !h-11 !px-5 !rounded-xl !text-sm sm:!text-base !font-bold flex items-center gap-2"
        >
          <Heart className="w-4 h-4 fill-current shrink-0" />
          <span>Mulai Berdonasi</span>
        </Link>
      </div>

      {/* Main Grid: Responsive 2-Column on Desktop (12 cols) / 1-Column on Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start lg:items-stretch">
        
        {/* Right Column on Desktop (5 cols) / Top on Mobile - Profile, Contact & Legal Info */}
        <div className="lg:col-span-5 lg:space-y-6 order-1 lg:order-2">
          
          {/* Header Profile / Welcome Banner */}
          <div className="bg-gradient-to-br from-sky-600 via-sky-500 to-blue-600 rounded-2xl p-5 sm:p-6 text-white shadow-lg shadow-sky-600/15 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-24 h-24 bg-white/10 rounded-full blur-lg pointer-events-none" />

            <div className="flex items-center gap-4 relative z-10">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shrink-0 shadow-inner">
                <Heart className="w-8 h-8 text-white fill-white/80" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl sm:text-2xl font-bold truncate tracking-tight text-white">
                  Sahabat Kebaikan
                </h2>
                <p className="text-sm sm:text-base text-sky-100 mt-1 line-clamp-1 font-medium">
                  {APP_NAME}
                </p>
                <div className="inline-flex items-center gap-1.5 mt-2 bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full text-xs sm:text-sm font-semibold text-sky-50 border border-white/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Platform Donasi Terverifikasi
                </div>
              </div>
            </div>

            {/* Quick Action Buttons (Mengadopsi style tf-btn & btn-pair dari Beranda) */}
            <div 
              className="btn-pair-group grid grid-cols-2 gap-3 mt-6 pt-5 border-t border-white/20 relative z-10"
              onMouseLeave={() => setActiveBannerBtn(0)}
            >
              <Link
                href="/campaigns"
                onMouseEnter={() => setActiveBannerBtn(0)}
                onClick={() => setActiveBannerBtn(0)}
                className={`tf-btn btn-pair-item !rounded-xl !h-12 !text-sm sm:!text-base !font-bold w-full ${
                  activeBannerBtn === 0 ? 'is-active' : 'is-inactive'
                }`}
              >
                <Heart className="w-4 h-4 mr-2 fill-current shrink-0" />
                <span>Donasi Sekarang</span>
              </Link>
              <button
                type="button"
                onMouseEnter={() => setActiveBannerBtn(1)}
                onClick={() => {
                  setActiveBannerBtn(1);
                  handleShare();
                }}
                className={`tf-btn btn-pair-item !rounded-xl !h-12 !text-sm sm:!text-base !font-bold w-full ${
                  activeBannerBtn === 1 ? 'is-active' : 'is-inactive'
                }`}
              >
                <Share2 className="w-4 h-4 mr-2 shrink-0" />
                <span>{copiedLink ? 'Tersalin!' : 'Bagikan'}</span>
              </button>
            </div>
          </div>

          {/* Layanan Bantuan Resmi Card (Desktop View) */}
          <div className="hidden lg:block">
            <LayananBantuanCard />
          </div>



        </div>

        {/* Left Column on Desktop (7 cols) / Bottom on Mobile - Menu Cards */}
        <div className="lg:col-span-7 order-2 lg:order-1 h-full flex flex-col">



          {/* MOBILE VIEW (lg:hidden) - Menu list first, then Layanan Bantuan Resmi */}
          <div className="lg:hidden space-y-5">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden divide-y divide-slate-100">
              {/* Item 1: Bantuan */}
              <Link
                href="/user/bantuan"
                className="flex items-center justify-between px-5 py-4.5 hover:bg-slate-50/80 active:bg-slate-100/80 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                    <BantuanIcon className="w-7 h-7" />
                  </div>
                  <span className="text-base sm:text-lg font-semibold text-slate-800 group-hover:text-sky-600 transition-colors">
                    Bantuan
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>

              {/* Item 2: Tentang Ruang Senyum */}
              <Link
                href="/about"
                className="flex items-center justify-between px-5 py-4.5 hover:bg-slate-50/80 active:bg-slate-100/80 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                    <TentangIcon className="w-7 h-7" />
                  </div>
                  <span className="text-base sm:text-lg font-semibold text-slate-800 group-hover:text-sky-600 transition-colors">
                    Tentang Kami
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>

              {/* Item 3: Syarat & Ketentuan */}
              <Link
                href="/user/syarat-ketentuan"
                className="flex items-center justify-between px-5 py-4.5 hover:bg-slate-50/80 active:bg-slate-100/80 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                    <SyaratIcon className="w-7 h-7" />
                  </div>
                  <span className="text-base sm:text-lg font-semibold text-slate-800 group-hover:text-sky-600 transition-colors">
                    Syarat & Ketentuan
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>

              {/* Item 4: Akuntabilitas & Transparansi */}
              <Link
                href="/user/akuntabilitas"
                className="flex items-center justify-between px-5 py-4.5 hover:bg-slate-50/80 active:bg-slate-100/80 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                    <AkuntabilitasIcon className="w-7 h-7" />
                  </div>
                  <span className="text-base sm:text-lg font-semibold text-slate-800 group-hover:text-sky-600 transition-colors">
                    Akuntabilitas & Transparansi
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>

              {/* Item 5: Hapus Cache */}
              <button
                type="button"
                onClick={() => setShowClearModal(true)}
                className="w-full flex items-center justify-between px-5 py-4.5 hover:bg-slate-50/80 active:bg-slate-100/80 transition-colors group text-left cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-slate-500">
                    <Trash2 className="w-6 h-6 text-slate-500 group-hover:text-rose-500 transition-colors" />
                  </div>
                  <span className="text-base sm:text-lg font-semibold text-slate-800 group-hover:text-rose-600 transition-colors">
                    Hapus Cache
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
              </button>
            </div>

            {/* Layanan Bantuan Resmi Card (Mobile View - placed below menus) */}
            <LayananBantuanCard />
          </div>

          {/* DESKTOP VIEW (hidden lg:flex) - Rich Expansive Service Cards Grid */}
          <div className="hidden lg:flex lg:flex-col lg:justify-between h-full gap-3">
            
            {/* Desktop Card 1: Bantuan */}
            <Link
              href="/user/bantuan"
              className="bg-white rounded-2xl border border-slate-200/80 py-5.5 px-6 shadow-sm hover:border-sky-300 hover:shadow-md transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <BantuanIcon className="w-7 h-7" />
                </div>
                <div className="flex items-center gap-2.5">
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    Pusat Bantuan & FAQ
                  </h4>
                  <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-md">
                    Panduan
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-sm font-bold text-sky-600 shrink-0 ml-4 group-hover:translate-x-1 transition-transform">
                <span>Buka</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Desktop Card 2: Tentang Kami */}
            <Link
              href="/about"
              className="bg-white rounded-2xl border border-slate-200/80 py-5.5 px-6 shadow-sm hover:border-sky-300 hover:shadow-md transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <TentangIcon className="w-7 h-7" />
                </div>
                <div className="flex items-center gap-2.5">
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    Tentang Kami
                  </h4>
                  <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-md">
                    Profil Yayasan
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-sm font-bold text-sky-600 shrink-0 ml-4 group-hover:translate-x-1 transition-transform">
                <span>Profil</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Desktop Card 3: Syarat & Ketentuan */}
            <Link
              href="/user/syarat-ketentuan"
              className="bg-white rounded-2xl border border-slate-200/80 py-5.5 px-6 shadow-sm hover:border-sky-300 hover:shadow-md transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <SyaratIcon className="w-7 h-7" />
                </div>
                <div className="flex items-center gap-2.5">
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    Syarat & Ketentuan Layanan
                  </h4>
                  <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md">
                    Ketentuan
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-sm font-bold text-sky-600 shrink-0 ml-4 group-hover:translate-x-1 transition-transform">
                <span>Baca</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Desktop Card 4: Akuntabilitas & Transparansi */}
            <Link
              href="/user/akuntabilitas"
              className="bg-white rounded-2xl border border-slate-200/80 py-5.5 px-6 shadow-sm hover:border-sky-300 hover:shadow-md transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <AkuntabilitasIcon className="w-7 h-7" />
                </div>
                <div className="flex items-center gap-2.5">
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    Akuntabilitas & Transparansi
                  </h4>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                    Amanah
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-sm font-bold text-sky-600 shrink-0 ml-4 group-hover:translate-x-1 transition-transform">
                <span>Lihat</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Desktop Card 5: Hapus Cache */}
            <div
              className="bg-white rounded-2xl border border-slate-200/80 py-5.5 px-6 shadow-sm hover:border-rose-300 hover:shadow-md transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 group-hover:text-rose-500 group-hover:bg-rose-50 transition-colors">
                  <Trash2 className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2.5">
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                    Hapus Cache Website
                  </h4>
                  <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md">
                    Sistem
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowClearModal(true)}
                className="tf-btn style-border !rounded-xl !h-10 !px-4 !text-sm !font-bold !text-slate-700 !border-slate-300 hover:!border-rose-400 hover:!text-rose-600 hover:!bg-rose-50 shrink-0 ml-4 cursor-pointer"
              >
                <span>Bersihkan</span>
              </button>
            </div>

          </div>



        </div>

      </div>

      {/* Modal / Confirmation Dialog for Hapus Cache */}
      {showClearModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity"
          onClick={() => !clearing && setShowClearModal(false)}
        >
          <div 
            className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl p-6 pb-12 sm:pb-6 shadow-2xl border border-slate-100 transition-all relative z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                  <Trash2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Hapus Cache Website
                </h3>
              </div>
              <button
                onClick={() => !clearing && setShowClearModal(false)}
                className="w-9 h-9 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                disabled={clearing}
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3.5">
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Fitur ini akan membersihkan data penyimpanan sementara browser untuk memastikan Anda selalu mendapatkan versi terbaru dan mengatasi kendala tampilan website.
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm text-slate-600 space-y-2">
                <div className="flex items-center justify-between">
                  <span>Penyimpanan Lokal:</span>
                  <span className="font-semibold text-slate-800">Cache Browser & Storage</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Status:</span>
                  <span className="font-semibold text-emerald-600">Aman dibersihkan</span>
                </div>
              </div>

              {clearedSuccess && (
                <div className="flex items-center gap-2.5 p-3.5 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-semibold border border-emerald-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Cache berhasil dibersihkan! Memuat ulang halaman...</span>
                </div>
              )}
            </div>

            {/* Tombol Aksi Modal: Menggunakan style button seperti beranda */}
            <div className="grid grid-cols-2 gap-3 pt-3">
              <button
                type="button"
                onClick={() => setShowClearModal(false)}
                disabled={clearing}
                className="tf-btn style-border !rounded-xl !h-12 !text-sm sm:!text-base !font-bold w-full !text-slate-700 !border-slate-300 hover:!border-slate-400 hover:!bg-slate-100 cursor-pointer"
              >
                <span>Batal</span>
              </button>
              <button
                type="button"
                onClick={handleClearCache}
                disabled={clearing || clearedSuccess}
                className="tf-btn style-solid !rounded-xl !h-12 !text-sm sm:!text-base !font-bold w-full !bg-sky-600 !border-sky-600 !text-white hover:!bg-sky-700 shadow-md shadow-sky-600/30 cursor-pointer"
              >
                {clearing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin mr-2 shrink-0" />
                    <span>Membersihkan...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2 shrink-0" />
                    <span>Bersihkan Sekarang</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Heart, CheckCircle, Loader2, AlertCircle, User, Mail, MessageSquare } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Campaign } from '@/types/campaign';
import { formatRupiah, calculateProgress, cn } from '@/lib/utils';
import { DONATION_PRESETS, MIN_DONATION_AMOUNT } from '@/lib/constants';

declare global {
  interface Window {
    snap: {
      pay: (token: string, options: {
        onSuccess?: (result: unknown) => void;
        onPending?: (result: unknown) => void;
        onError?: (result: unknown) => void;
        onClose?: () => void;
      }) => void;
    };
  }
}

interface DonationFormClientProps {
  campaign: Campaign;
}

type DonationStep = 'form' | 'processing' | 'success' | 'error';

export default function DonationFormClient({ campaign }: DonationFormClientProps) {
  const [step, setStep] = useState<DonationStep>('form');
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const amount = selectedPreset || parseInt(customAmount) || 0;
  const progress = calculateProgress(campaign.current_amount, campaign.goal_amount);

  const handlePresetClick = (preset: number) => {
    setSelectedPreset(preset);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setCustomAmount(numericValue);
    setSelectedPreset(null);
  };

  const isFormValid = () => {
    return (
      amount >= MIN_DONATION_AMOUNT &&
      donorName.trim().length >= 2 &&
      donorEmail.trim().includes('@') &&
      donorEmail.trim().includes('.')
    );
  };

  const loadMidtransScript = () => {
    return new Promise<void>((resolve, reject) => {
      if (window.snap) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY
        ? `https://app.sandbox.midtrans.com/snap/snap.js`
        : `https://app.sandbox.midtrans.com/snap/snap.js`;
      script.setAttribute(
        'data-client-key',
        process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || ''
      );
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Midtrans'));
      document.head.appendChild(script);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setLoading(true);
    setError('');

    try {
      // 1. Create transaction via API
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaign_id: campaign.id,
          donor_name: donorName.trim(),
          donor_email: donorEmail.trim(),
          amount,
          message: message.trim() || undefined,
          is_anonymous: isAnonymous,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Gagal membuat transaksi');
      }

      // 2. Load Midtrans Snap
      await loadMidtransScript();

      // 3. Open Snap payment popup
      setStep('processing');
      window.snap.pay(data.snap_token, {
        onSuccess: () => {
          setStep('success');
        },
        onPending: () => {
          setStep('success');
        },
        onError: () => {
          setStep('error');
          setError('Pembayaran gagal. Silakan coba lagi.');
        },
        onClose: () => {
          setStep('form');
          setLoading(false);
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
      setStep('error');
    } finally {
      setLoading(false);
    }
  };

  // Success state
  if (step === 'success') {
    return (
      <>
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-20 px-4">
          <div className="max-w-md w-full text-center space-y-6 animate-fade-in">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-primary-600" />
            </div>
            <h1 className="text-2xl font-bold text-navy-900">Terima Kasih!</h1>
            <p className="text-navy-600 leading-relaxed">
              Donasi Anda sebesar <strong className="text-primary-600">{formatRupiah(amount)}</strong> sedang diproses. Anda akan menerima konfirmasi melalui email.
            </p>
            <div className="flex flex-col gap-3 pt-4">
              <Link
                href={`/campaign/${campaign.slug}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors"
              >
                Kembali ke Campaign
              </Link>
              <Link
                href="/campaigns"
                className="text-sm text-navy-500 hover:text-primary-600 transition-colors"
              >
                Lihat Campaign Lainnya
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-6">
          {/* Back link */}
          <Link
            href={`/campaign/${campaign.slug}`}
            className="inline-flex items-center gap-1 text-sm text-navy-500 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Campaign
          </Link>

          {/* Campaign Summary */}
          <div className="bg-white rounded-2xl p-5 border border-navy-100 shadow-sm flex gap-4 items-center">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-navy-100 flex-shrink-0">
              {campaign.cover_image ? (
                <Image
                  src={campaign.cover_image}
                  alt={campaign.title}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary-400" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-bold text-navy-900 line-clamp-1">{campaign.title}</h2>
              <div className="mt-1.5 w-full h-1.5 bg-navy-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-navy-500 mt-1">
                {formatRupiah(campaign.current_amount)} dari {formatRupiah(campaign.goal_amount)}
              </p>
            </div>
          </div>

          {/* Error */}
          {(step === 'error' || error) && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 animate-fade-in">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-800">Terjadi Kesalahan</p>
                <p className="text-sm text-red-600 mt-1">{error || 'Pembayaran gagal. Silakan coba lagi.'}</p>
              </div>
            </div>
          )}

          {/* Donation Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nominal Selection */}
            <div className="bg-white rounded-2xl p-6 border border-navy-100 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-navy-900">Pilih Nominal Donasi</h3>

              <div className="grid grid-cols-2 gap-3">
                {DONATION_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => handlePresetClick(preset)}
                    className={cn(
                      'py-3.5 px-4 rounded-xl text-sm font-semibold border-2 transition-all',
                      selectedPreset === preset
                        ? 'bg-primary-50 border-primary-500 text-primary-700 shadow-md'
                        : 'bg-white border-navy-200 text-navy-700 hover:border-primary-300 hover:bg-primary-50/50'
                    )}
                  >
                    {formatRupiah(preset)}
                  </button>
                ))}
              </div>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-navy-500">
                  Rp
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Nominal lainnya"
                  value={customAmount ? parseInt(customAmount).toLocaleString('id-ID') : ''}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  className={cn(
                    'w-full pl-10 pr-4 py-3.5 border-2 rounded-xl text-sm font-medium text-navy-900 placeholder-navy-400 focus:outline-none transition-all',
                    customAmount && !selectedPreset
                      ? 'border-primary-500 ring-2 ring-primary-100'
                      : 'border-navy-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100'
                  )}
                />
              </div>

              {amount > 0 && amount < MIN_DONATION_AMOUNT && (
                <p className="text-xs text-red-500">
                  Minimal donasi {formatRupiah(MIN_DONATION_AMOUNT)}
                </p>
              )}
            </div>

            {/* Donor Info */}
            <div className="bg-white rounded-2xl p-6 border border-navy-100 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-navy-900">Informasi Donatur</h3>

              <div className="space-y-3">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                  <input
                    type="text"
                    placeholder="Nama lengkap"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 border-2 border-navy-200 rounded-xl text-sm text-navy-900 placeholder-navy-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 border-2 border-navy-200 rounded-xl text-sm text-navy-900 placeholder-navy-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                  />
                </div>

                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-navy-400" />
                  <textarea
                    placeholder="Pesan / Doa (opsional)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="w-full pl-10 pr-4 py-3 border-2 border-navy-200 rounded-xl text-sm text-navy-900 placeholder-navy-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all resize-none"
                  />
                </div>

                {/* Anonymous toggle */}
                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl hover:bg-navy-50 transition-colors">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-6 bg-navy-200 rounded-full peer-checked:bg-primary-500 transition-colors" />
                    <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm peer-checked:translate-x-4 transition-transform" />
                  </div>
                  <span className="text-sm text-navy-700">Donasi sebagai anonim</span>
                </label>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!isFormValid() || loading || step === 'processing'}
              className="w-full py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-base rounded-2xl shadow-lg hover:from-primary-600 hover:to-primary-700 hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {loading || step === 'processing' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  <Heart className="w-5 h-5" />
                  {amount >= MIN_DONATION_AMOUNT
                    ? `Donasi ${formatRupiah(amount)}`
                    : 'Donasi Sekarang'}
                </>
              )}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

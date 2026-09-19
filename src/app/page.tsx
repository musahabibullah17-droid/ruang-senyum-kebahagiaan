import Link from 'next/link';
import Image from 'next/image';
import { Heart, TrendingUp, Users, Target, ArrowRight, Sparkles, HandHeart, Banknote, HeartHandshake, Sprout, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CampaignCard from '@/components/campaign/CampaignCard';
import MobileCampaignCarousel from '@/components/campaign/MobileCampaignCarousel';
import { createPublicClient } from '@/lib/supabase/public';
import { Campaign } from '@/types/campaign';
import { formatRupiah, formatCompactNumber } from '@/lib/utils';
import { APP_NAME } from '@/lib/constants';

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
        {/* Hero Section */}
        <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <Image
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=2070"
            alt="Anak-anak dan masyarakat yang membutuhkan bantuan"
            fill
            className="object-cover"
            priority
          />
          
          {/* Blue Overlay */}
          <div className="absolute inset-0 bg-primary-900/75 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/50 to-transparent" />
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded text-white text-xs font-bold uppercase tracking-wider">
              Platform Donasi Terpercaya
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight shadow-sm">
              Satu Kebaikan, Mengubah Jutaan Kehidupan.
            </h1>

            <p className="text-lg md:text-xl text-primary-50 leading-relaxed max-w-2xl mx-auto drop-shadow">
              Salurkan bantuan Anda kepada mereka yang paling membutuhkan secara transparan dan aman. Berikan harapan baru hari ini.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/campaigns"
                className="inline-flex items-center justify-center px-10 py-4 bg-white text-primary-700 text-base font-bold rounded-lg hover:bg-gray-50 shadow-lg transition-all hover:-translate-y-0.5"
              >
                Mulai Berdonasi
              </Link>
              <Link
                href="/campaigns"
                className="inline-flex items-center justify-center px-10 py-4 bg-primary-600/30 backdrop-blur-sm text-white text-base font-semibold rounded-lg border border-white/50 hover:bg-primary-600/50 transition-colors"
              >
                Lihat Campaign
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-8 md:py-16 bg-primary-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* --- TAMPILAN DESKTOP/WEB --- */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 items-start">
              <div className="flex flex-col justify-center h-full mb-4 lg:mb-0">
                <h2 className="text-2xl lg:text-3xl font-extrabold text-navy-900 tracking-tight uppercase leading-snug">
                  Mengapa Berbagi<br/>
                  Bersama<br/>
                  {APP_NAME}?
                </h2>
              </div>
              
              {/* Feature 1 */}
              <div className="flex flex-col gap-4">
                <div className="flex-shrink-0">
                  <HeartHandshake className="w-10 h-10 text-primary-600" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy-900 mb-2">Responsif</h3>
                  <p className="text-navy-600 text-sm leading-relaxed">
                    Merespon kebutuhan masyarakat dengan cepat dan tepat sasaran.
                  </p>
                </div>
              </div>
              
              {/* Feature 2 */}
              <div className="flex flex-col gap-4">
                <div className="flex-shrink-0">
                  <Sprout className="w-10 h-10 text-primary-600" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy-900 mb-2">Sustainable Program</h3>
                  <p className="text-navy-600 text-sm leading-relaxed">
                    Program jangka panjang untuk kemandirian umat secara berkelanjutan.
                  </p>
                </div>
              </div>
              
              {/* Feature 3 */}
              <div className="flex flex-col gap-4">
                <div className="flex-shrink-0">
                  <ShieldCheck className="w-10 h-10 text-primary-600" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy-900 mb-2">Credibility</h3>
                  <p className="text-navy-600 text-sm leading-relaxed">
                    Bertanggung jawab penuh menjalankan amanah program dengan transparan.
                  </p>
                </div>
              </div>
            </div>

            {/* --- TAMPILAN MOBILE --- */}
            <div className="md:hidden flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-extrabold text-navy-900 tracking-tight uppercase leading-snug">
                  Mengapa Berbagi Bersama {APP_NAME}?
                </h2>
              </div>
              
              {/* Feature 1 */}
              <div className="flex flex-row gap-4 items-start">
                <div className="flex-shrink-0 mt-1">
                  <HeartHandshake className="w-8 h-8 text-primary-600" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy-900 mb-1">Responsif</h3>
                  <p className="text-navy-600 text-sm leading-relaxed">
                    Merespon kebutuhan masyarakat dengan cepat dan tepat sasaran.
                  </p>
                </div>
              </div>
              
              {/* Feature 2 */}
              <div className="flex flex-row gap-4 items-start">
                <div className="flex-shrink-0 mt-1">
                  <Sprout className="w-8 h-8 text-primary-600" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy-900 mb-1">Sustainable Program</h3>
                  <p className="text-navy-600 text-sm leading-relaxed">
                    Program jangka panjang untuk kemandirian umat secara berkelanjutan.
                  </p>
                </div>
              </div>
              
              {/* Feature 3 */}
              <div className="flex flex-row gap-4 items-start">
                <div className="flex-shrink-0 mt-1">
                  <ShieldCheck className="w-8 h-8 text-primary-600" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy-900 mb-1">Credibility</h3>
                  <p className="text-navy-600 text-sm leading-relaxed">
                    Bertanggung jawab penuh menjalankan amanah program dengan transparan.
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </section>

        {/* Featured Campaigns */}
        {featuredCampaigns.length > 0 && (
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
                  className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                >
                  Lihat Semua
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
                {featuredCampaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
              </div>
              
              <MobileCampaignCarousel campaigns={featuredCampaigns} />

              <div className="sm:hidden mt-6 text-center">
                <Link
                  href="/campaigns"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600"
                >
                  Lihat Semua Campaign
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Latest Campaigns */}
        {latestCampaigns.length > 0 && (
          <section className="py-16 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-navy-900">
                    Campaign Terbaru
                  </h2>
                </div>
                <Link
                  href="/campaigns"
                  className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                >
                  Lihat Semua
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
                {latestCampaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
              </div>
              
              <MobileCampaignCarousel campaigns={latestCampaigns} />

              <div className="md:hidden mt-6 text-center">
                <Link
                  href="/campaigns"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600"
                >
                  Lihat Semua Campaign
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Stats Section */}
        <section className="bg-primary-600 border-b-4 border-primary-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-white/20">
              <div className="flex-1 px-6 py-10 sm:py-12 flex flex-col items-center justify-center text-center group">
                <HandHeart className="w-10 h-10 text-white/90 mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-4xl md:text-5xl font-black text-white tracking-tight mb-1">{stats.totalCampaigns}</p>
                <p className="text-xs md:text-sm font-bold text-primary-100 uppercase tracking-widest">Campaign</p>
              </div>
              <div className="flex-1 px-6 py-10 sm:py-12 flex flex-col items-center justify-center text-center group">
                <Banknote className="w-10 h-10 text-white/90 mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-4xl md:text-5xl font-black text-white tracking-tight mb-1">{formatRupiah(stats.totalAmount)}</p>
                <p className="text-xs md:text-sm font-bold text-primary-100 uppercase tracking-widest">Dana Tersalurkan</p>
              </div>
              <div className="flex-1 px-6 py-10 sm:py-12 flex flex-col items-center justify-center text-center group">
                <Users className="w-10 h-10 text-white/90 mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-4xl md:text-5xl font-black text-white tracking-tight mb-1">{stats.totalDonations}</p>
                <p className="text-xs md:text-sm font-bold text-primary-100 uppercase tracking-widest">Orang Baik Terlibat</p>
              </div>
            </div>
          </div>
        </section>

        {/* Galeri Kebaikan Section */}
        <section className="py-24 bg-[#fbfaf8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              
              {/* Text Content (Left) */}
              <div className="lg:w-1/3 space-y-6 text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0284c7] tracking-tight">
                  Galeri Kebaikan
                </h2>
                <p className="text-base text-slate-600 leading-relaxed font-serif">
                  Ratusan penerima manfaat telah mendapatkan layanan yang sesuai dengan kebutuhannya dari bantuan yang dititipkan kepada <strong className="font-semibold text-slate-900">Ruang Senyum Kebahagiaan</strong>.
                </p>
                <div className="pt-2 flex justify-center lg:justify-start">
                  <div className="w-12 h-[2px] bg-yellow-400"></div>
                </div>
              </div>

              {/* Scattered Polaroid Layout (Right) */}
              <div className="lg:w-2/3 w-full relative h-[400px] sm:h-[500px] lg:h-[550px] max-w-2xl mx-auto">
                
                {/* Photo 1 (Main Large - Top Left) */}
                <div className="absolute top-0 left-0 w-[60%] h-[55%] bg-white p-2 sm:p-3 shadow-xl -rotate-2 z-20 transition-transform hover:scale-105 hover:z-50">
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80"
                      alt="Senyum anak-anak"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                    <p className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-white text-xs sm:text-sm font-semibold">
                      Senyum yang tak ternilai
                    </p>
                  </div>
                </div>

                {/* Photo 2 (Top Right - Small) */}
                <div className="absolute top-[5%] right-[5%] w-[35%] h-[40%] bg-white p-2 shadow-lg rotate-3 z-10 transition-transform hover:scale-105 hover:z-50">
                  <div className="relative w-full h-full overflow-hidden border border-slate-100">
                    <Image
                      src="https://images.unsplash.com/photo-1518398046578-8cca57782e17?auto=format&fit=crop&w=400&q=80"
                      alt="Kegiatan bantuan"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Photo 3 (Bottom Left - B&W) */}
                <div className="absolute bottom-[10%] left-[5%] w-[35%] h-[35%] bg-white p-2 shadow-md rotate-2 z-10 transition-transform hover:scale-105 hover:z-50">
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=400&q=80"
                      alt="Seeking human kindness"
                      fill
                      className="object-cover grayscale"
                    />
                  </div>
                </div>

                {/* Photo 4 (Bottom Right - Medium) */}
                <div className="absolute bottom-0 right-[2%] w-[55%] h-[45%] bg-white p-2 sm:p-3 shadow-xl -rotate-1 z-30 transition-transform hover:scale-105 hover:z-50">
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=500&q=80"
                      alt="Kebersamaan"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                    <p className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-white text-xs sm:text-sm font-semibold">
                      Bersama, kita bisa lebih
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl text-center md:text-left space-y-4">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  Siap Membuat Perubahan Hari Ini?
                </h2>
                <p className="text-lg text-primary-100 leading-relaxed">
                  Jadilah bagian dari ribuan orang baik yang telah membantu sesama. Berapapun donasi Anda, akan mengukir senyum bagi mereka yang membutuhkan.
                </p>
              </div>
              <div className="flex-shrink-0 w-full md:w-auto mt-4 md:mt-0">
                <Link
                  href="/campaigns"
                  className="w-full md:w-auto inline-flex items-center justify-center px-10 py-4 bg-white text-primary-700 text-base font-bold rounded-lg hover:bg-primary-50 transition-colors shadow-sm"
                >
                  Mulai Donasi Sekarang
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BantuanClient from './BantuanClient';
import { APP_NAME } from '@/lib/constants';

export const metadata = {
  title: `Pusat Bantuan & FAQ | ${APP_NAME}`,
  description: 'Pusat bantuan resmi dan tanya jawab seputar donasi di Ruang Senyum Kebahagiaan.',
};

export default function BantuanPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-slate-50 min-h-screen pb-20 md:pb-12">
        <BantuanClient />
      </main>
      <Footer />
    </>
  );
}

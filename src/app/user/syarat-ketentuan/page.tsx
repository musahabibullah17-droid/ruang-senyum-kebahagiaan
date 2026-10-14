import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SyaratKetentuanClient from './SyaratKetentuanClient';
import { APP_NAME } from '@/lib/constants';

export const metadata = {
  title: `Syarat & Ketentuan | ${APP_NAME}`,
  description: 'Syarat dan ketentuan umum donasi dan penggunaan platform Ruang Senyum Kebahagiaan.',
};

export default function SyaratKetentuanPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-slate-50 min-h-screen pb-20 md:pb-12">
        <SyaratKetentuanClient />
      </main>
      <Footer />
    </>
  );
}

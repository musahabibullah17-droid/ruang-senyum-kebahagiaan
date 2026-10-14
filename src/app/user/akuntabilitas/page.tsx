import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AkuntabilitasClient from './AkuntabilitasClient';
import { APP_NAME } from '@/lib/constants';

export const metadata = {
  title: `Akuntabilitas & Transparansi | ${APP_NAME}`,
  description: 'Komitmen transparansi pengelolaan donasi, audit, dan legalitas resmi Yayasan Ruang Senyum Kebahagiaan.',
};

export default function AkuntabilitasPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-slate-50 min-h-screen pb-20 md:pb-12">
        <AkuntabilitasClient />
      </main>
      <Footer />
    </>
  );
}

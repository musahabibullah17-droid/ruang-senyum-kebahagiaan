import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import UserClient from './UserClient';
import { APP_NAME } from '@/lib/constants';

export const metadata = {
  title: `Layanan Kami | ${APP_NAME}`,
  description: 'Pusat bantuan, informasi, tentang kami, syarat & ketentuan, dan transparansi Ruang Senyum Kebahagiaan.',
};

export default function UserPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-slate-50 min-h-[calc(100vh-72px)] flex flex-col justify-start md:justify-center">
        {/* Mobile Top Header */}
        <div className="md:hidden bg-white border-b border-slate-100 px-4 py-3 sticky top-0 z-40">
          <h2 className="text-lg font-bold text-slate-900 text-center">Layanan Kami</h2>
        </div>

        {/* Content */}
        <UserClient />
      </main>
      <Footer />
    </>
  );
}

import Link from 'next/link';
import { Heart, Mail, MapPin } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';
import Logo from '@/components/ui/Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-navy-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center group">
              <Logo className="h-10 w-auto text-white group-hover:scale-105 transition-transform duration-300" />
            </Link>
            <p className="text-sm text-navy-400 leading-relaxed max-w-sm">
              Platform donasi dan crowdfunding sosial untuk membantu sesama yang membutuhkan. Bersama kita bisa membuat perubahan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Navigasi
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-navy-400 hover:text-primary-400 transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/campaigns" className="text-sm text-navy-400 hover:text-primary-400 transition-colors">
                  Semua Campaign
                </Link>
              </li>
              <li>
                <Link href="/campaigns" className="text-sm text-navy-400 hover:text-primary-400 transition-colors">
                  Donasi Sekarang
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Kontak
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-navy-400">
                <Mail className="w-4 h-4 text-primary-400" />
                info@ruangsenyumkebahagiaan.id
              </li>
              <li className="flex items-start gap-2 text-sm text-navy-400">
                <MapPin className="w-4 h-4 text-primary-400 mt-0.5" />
                Jakarta, Indonesia
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-800 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-navy-500">
            &copy; {currentYear} {APP_NAME}. Semua hak dilindungi.
          </p>
          <p className="text-xs text-navy-500">
            Dibuat dengan <Heart className="w-3 h-3 inline text-primary-400 fill-primary-400" /> untuk kebaikan
          </p>
        </div>
      </div>
    </footer>
  );
}

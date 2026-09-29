import Link from 'next/link';
import { Heart, Mail, MapPin, Phone } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';
import Logo from '@/components/ui/Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-navy-300 rounded-t-[30px] sm:rounded-t-none overflow-hidden shadow-2xl sm:shadow-none">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand & Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center group">
              <Logo
                showText={true}
                className="h-10 w-auto text-white group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <p className="text-sm text-navy-400 leading-relaxed max-w-sm">
              Platform donasi dan crowdfunding sosial untuk membantu sesama yang membutuhkan. Bersama kita bisa membuat perubahan.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Navigasi
            </h3>
            <div className="grid grid-cols-2 gap-x-6 sm:gap-x-8 max-w-xs">
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
              </ul>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-sm text-navy-400 hover:text-primary-400 transition-colors">
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link href="/cara-donasi" className="text-sm text-navy-400 hover:text-primary-400 transition-colors">
                    Cara Donasi
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Kontak
            </h3>
            <ul className="space-y-3.5">
              <li>
                <a
                  href="https://wa.me/6282232552327"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-navy-400 hover:text-primary-400 transition-colors group"
                >
                  <Phone className="w-4 h-4 text-primary-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span>0822-3255-2327 (WhatsApp)</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:yayasanruangsenyumkebahagiaan@gmail.com"
                  className="flex items-start gap-2.5 text-sm text-navy-400 hover:text-primary-400 transition-colors group"
                >
                  <Mail className="w-4 h-4 text-primary-400 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="break-all">yayasanruangsenyumkebahagiaan@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-navy-400">
                <MapPin className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                <span className="leading-relaxed">
                  Jl. Mr. Wahid, Wirowongso, Ajung, Jember, Jawa Timur
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-800 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-navy-500">
            © {currentYear} {APP_NAME}. Semua hak dilindungi.
          </p>
          <p className="text-xs text-navy-500 flex items-center gap-1">
            Dibuat dengan{' '}
            <Heart className="w-3 h-3 inline text-primary-400 fill-primary-400" />{' '}
            untuk kebaikan
          </p>
        </div>
      </div>
    </footer>
  );
}

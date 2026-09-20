import LoginForm from '@/components/admin/LoginForm';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/components/ui/Logo';

export default function AdminLoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Image matching Hero Section */}
      <Image
        src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=2070"
        alt="Ruang Senyum Kebahagiaan Admin"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Deep Blue Overlays matching Hero Section */}
      <div className="absolute inset-0 bg-[#0c2f4d]/75 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a253c]/95 via-[#0c2f4d]/60 to-[#0a253c]/50" />

      {/* Login Card with Glassmorphism */}
      <div className="relative z-10 max-w-md w-full bg-white/95 backdrop-blur-xl p-8 sm:p-10 rounded-2xl shadow-2xl border border-white/20">
        <div className="text-center mb-8">
          {/* Official Logo matching user view */}
          <Link href="/" className="inline-flex flex-col items-center group mb-4">
            <Logo
              showText={false}
              className="w-14 h-14 drop-shadow-md group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
          <h2 className="text-2xl font-bold text-navy-900 tracking-tight">
            Admin Portal
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Masuk untuk mengelola program dan donasi Ruang Senyum
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

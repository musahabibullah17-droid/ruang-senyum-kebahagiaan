'use client';

import Link from 'next/link';
import { 
  HeartPulse, 
  GraduationCap, 
  Baby, 
  Flame, 
  Utensils, 
  Building2, 
  ArrowRight 
} from 'lucide-react';

const CATEGORIES = [
  {
    name: 'Bantuan Medis',
    slug: 'Kesehatan',
    description: 'Bantu biaya pengobatan & operasi pasien darurat',
    icon: HeartPulse,
    count: '12+ Program',
    color: 'text-rose-500 bg-rose-50 border-rose-100 group-hover:border-rose-300',
  },
  {
    name: 'Pendidikan & Yatim',
    slug: 'Pendidikan',
    description: 'Dukungan perlengkapan sekolah & beasiswa anak bangsa',
    icon: GraduationCap,
    count: '8+ Program',
    color: 'text-primary-600 bg-primary-50 border-primary-100 group-hover:border-primary-300',
  },
  {
    name: 'Panti Asuhan',
    slug: 'Panti Asuhan',
    description: 'Santunan operasional & masa depan anak-anak panti',
    icon: Baby,
    count: '6+ Program',
    color: 'text-amber-600 bg-amber-50 border-amber-100 group-hover:border-amber-300',
  },
  {
    name: 'Tanggap Bencana',
    slug: 'Bencana Alam',
    description: 'Bantuan logistik & evakuasi korban bencana alam',
    icon: Flame,
    count: '4+ Program',
    color: 'text-orange-500 bg-orange-50 border-orange-100 group-hover:border-orange-300',
  },
  {
    name: 'Pangan & Sembako',
    slug: 'Kemanusiaan',
    description: 'Paket makanan bergizi untuk dhuafa dan lansia',
    icon: Utensils,
    count: '9+ Program',
    color: 'text-emerald-600 bg-emerald-50 border-emerald-100 group-hover:border-emerald-300',
  },
  {
    name: 'Infrastruktur Umat',
    slug: 'Infrastruktur',
    description: 'Renovasi tempat ibadah, madrasah & jembatan desa',
    icon: Building2,
    count: '5+ Program',
    color: 'text-indigo-600 bg-indigo-50 border-indigo-100 group-hover:border-indigo-300',
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-primary-700 bg-primary-100/80 mb-3">
            Kategori Program
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy-950 tracking-tight">
            Pilih Kategori Kebaikan Sesuai Hati Anda
          </h2>
          <p className="mt-3 text-sm sm:text-base text-navy-600 leading-relaxed">
            Berbagai sektor penyaluran bantuan telah kami verifikasi secara ketat agar setiap rupiah donasi Anda memberikan dampak nyata.
          </p>
        </div>

        {/* Categories Grid (project_diproperti Category style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                href={`/campaigns?category=${encodeURIComponent(cat.slug)}`}
                className="group relative bg-white p-6 rounded-2xl border border-navy-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Top Row: Icon & Count Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110 ${cat.color}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-navy-600 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                    {cat.count}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-bold text-navy-900 group-hover:text-primary-600 transition-colors mb-1.5">
                    {cat.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-navy-500 leading-relaxed mb-4">
                    {cat.description}
                  </p>
                </div>

                {/* Bottom Action Link */}
                <div className="flex items-center gap-1.5 text-xs font-bold text-primary-600 group-hover:text-primary-700 pt-2 border-t border-slate-100">
                  <span>Lihat Program</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

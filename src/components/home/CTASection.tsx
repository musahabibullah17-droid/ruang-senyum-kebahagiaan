import Link from 'next/link';

export default function CTASection() {
  return (
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
  );
}

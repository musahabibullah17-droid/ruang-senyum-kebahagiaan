import Image from 'next/image';

export default function GallerySection() {
  return (
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
                  sizes="(max-width: 768px) 100vw, 600px"
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
                  sizes="(max-width: 768px) 100vw, 400px"
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
                  sizes="(max-width: 768px) 100vw, 400px"
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
                  sizes="(max-width: 768px) 100vw, 500px"
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
  );
}

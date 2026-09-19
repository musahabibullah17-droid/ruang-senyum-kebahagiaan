import { HeartHandshake, Sprout, ShieldCheck } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';

export default function WhyChooseUsSection() {
  return (
    <section className="py-8 md:py-16 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- TAMPILAN DESKTOP/WEB --- */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 items-start">
          <div className="flex flex-col justify-center h-full mb-4 lg:mb-0">
            <h2 className="text-2xl lg:text-3xl font-extrabold text-navy-900 tracking-tight uppercase leading-snug">
              Mengapa Berbagi<br/>
              Bersama<br/>
              {APP_NAME}?
            </h2>
          </div>
          
          {/* Feature 1 */}
          <div className="flex flex-col gap-4">
            <div className="flex-shrink-0">
              <HeartHandshake className="w-10 h-10 text-primary-600" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">Responsif</h3>
              <p className="text-navy-600 text-sm leading-relaxed">
                Merespon kebutuhan masyarakat dengan cepat dan tepat sasaran.
              </p>
            </div>
          </div>
          
          {/* Feature 2 */}
          <div className="flex flex-col gap-4">
            <div className="flex-shrink-0">
              <Sprout className="w-10 h-10 text-primary-600" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">Sustainable Program</h3>
              <p className="text-navy-600 text-sm leading-relaxed">
                Program jangka panjang untuk kemandirian umat secara berkelanjutan.
              </p>
            </div>
          </div>
          
          {/* Feature 3 */}
          <div className="flex flex-col gap-4">
            <div className="flex-shrink-0">
              <ShieldCheck className="w-10 h-10 text-primary-600" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">Credibility</h3>
              <p className="text-navy-600 text-sm leading-relaxed">
                Bertanggung jawab penuh menjalankan amanah program dengan transparan.
              </p>
            </div>
          </div>
        </div>

        {/* --- TAMPILAN MOBILE --- */}
        <div className="md:hidden flex flex-col gap-6">
          <div>
            <h2 className="text-xl font-extrabold text-navy-900 tracking-tight uppercase leading-snug">
              Mengapa Berbagi Bersama {APP_NAME}?
            </h2>
          </div>
          
          {/* Feature 1 */}
          <div className="flex flex-row gap-4 items-start">
            <div className="flex-shrink-0 mt-1">
              <HeartHandshake className="w-8 h-8 text-primary-600" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-base font-bold text-navy-900 mb-1">Responsif</h3>
              <p className="text-navy-600 text-sm leading-relaxed">
                Merespon kebutuhan masyarakat dengan cepat dan tepat sasaran.
              </p>
            </div>
          </div>
          
          {/* Feature 2 */}
          <div className="flex flex-row gap-4 items-start">
            <div className="flex-shrink-0 mt-1">
              <Sprout className="w-8 h-8 text-primary-600" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-base font-bold text-navy-900 mb-1">Sustainable Program</h3>
              <p className="text-navy-600 text-sm leading-relaxed">
                Program jangka panjang untuk kemandirian umat secara berkelanjutan.
              </p>
            </div>
          </div>
          
          {/* Feature 3 */}
          <div className="flex flex-row gap-4 items-start">
            <div className="flex-shrink-0 mt-1">
              <ShieldCheck className="w-8 h-8 text-primary-600" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-base font-bold text-navy-900 mb-1">Credibility</h3>
              <p className="text-navy-600 text-sm leading-relaxed">
                Bertanggung jawab penuh menjalankan amanah program dengan transparan.
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}

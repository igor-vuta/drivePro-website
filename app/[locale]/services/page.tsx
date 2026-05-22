import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const machines = ['exc_1_5', 'exc_2', 'exc_4', 'loader_small', 'loader_big'] as const;

export function generateStaticParams() {
  return [{ locale: 'ru' }, { locale: 'kz' }];
}

export default async function ServicesPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('services');
  const tEq = await getTranslations('equipment');

  return (
    <main className="bg-jet-black min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="relative bg-charcoal py-20 overflow-hidden">
        <div className="absolute inset-0 bg-blood-red opacity-10" style={{ clipPath: 'polygon(70% 0, 100% 0, 100% 100%, 50% 100%)' }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="w-16 h-1 bg-blood-red mb-4" />
          <p className="text-gold font-bold tracking-widest text-sm uppercase mb-2">{t('subtitle')}</p>
          <h1 className="text-4xl md:text-6xl font-black text-cream uppercase tracking-wider">
            <span className="text-blood-red">★</span> {t('title')}
          </h1>
        </div>
      </section>

      {/* Equipment catalogue */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          {machines.map((key, i) => (
            <div key={key} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 border border-charcoal`}>
              {/* Large mockup placeholder */}
              <div
                className="lg:w-1/2 h-64 lg:h-auto min-h-64 flex items-center justify-center"
                style={{
                  background: '#111',
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(192,57,43,0.1) 10px, rgba(192,57,43,0.1) 11px)',
                }}
              >
                <div className="text-center">
                  <span className="text-gold font-black text-lg tracking-widest uppercase border-2 border-gold/50 px-6 py-3 bg-jet-black/90 block">
                    {tEq(`machines.${key}.placeholder`)}
                  </span>
                  <div className="mt-4 text-cream/20 text-xs tracking-widest">{t('specs_title')}</div>
                </div>
              </div>

              {/* Details */}
              <div className="lg:w-1/2 p-8 flex flex-col justify-center">
                <span className="inline-block bg-blood-red text-cream text-xs font-black tracking-widest uppercase px-3 py-1 mb-4 self-start">
                  {tEq('tonnage_label')}: {tEq(`machines.${key}.tonnage`)}
                </span>
                <h2 className="text-3xl font-black text-cream uppercase tracking-wider mb-3">
                  {tEq(`machines.${key}.name`)}
                </h2>
                <p className="text-cream/60 mb-6">{tEq(`machines.${key}.description`)}</p>

                {/* Specs */}
                <div className="border-t border-charcoal pt-6">
                  <h3 className="text-gold font-black text-sm tracking-widest uppercase mb-4">{t('specs_title')}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {(['weight', 'bucket', 'depth', 'reach'] as const).map(spec => (
                      <div key={spec} className="bg-jet-black p-3 border-l-2 border-blood-red">
                        <div className="text-cream/40 text-xs uppercase tracking-wider">{t(`specs.${spec}`)}</div>
                        <div className="text-cream font-bold text-sm">{t(`machines.${key}.specs.${spec}`)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

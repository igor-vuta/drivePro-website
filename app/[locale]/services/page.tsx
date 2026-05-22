import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const machines = ['exc_1_5', 'exc_2', 'exc_4', 'loader_small', 'loader_big', 'tractor'] as const;

const machineImages: Record<(typeof machines)[number], string> = {
  exc_1_5: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80',
  exc_2: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  exc_4: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  loader_small: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
  loader_big: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
  tractor: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
};

const attachments = [
  'standard_bucket',
  'narrow_bucket',
  'wide_bucket',
  'grading_bucket',
  'rock_bucket',
  'hydraulic_hammer',
  'pallet_forks',
  'blade',
  'rear_bucket',
  'auger',
  'tiller',
  'trailer',
] as const;

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

      <section className="relative bg-charcoal py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-blood-red opacity-10" style={{ clipPath: 'polygon(70% 0, 100% 0, 100% 100%, 50% 100%)' }} />
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 relative z-10">
          <div className="w-16 h-1 bg-blood-red mb-4" />
          <p className="text-gold font-bold tracking-widest text-sm uppercase mb-2">{t('subtitle')}</p>
          <h1 className="text-3xl md:text-6xl font-black text-cream uppercase tracking-wider">
            <span className="text-gold">◆</span> {t('title')}
          </h1>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 space-y-16">
          {machines.map((key, i) => (
            <div key={key} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 border border-charcoal`}>
              <div className="lg:w-1/2">
                <Image
                  src={machineImages[key]}
                  alt={tEq(`machines.${key}.image_alt`)}
                  width={800}
                  height={600}
                  className="w-full h-full min-h-64 object-cover"
                />
              </div>

              <div className="lg:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                <span className="inline-block bg-blood-red text-cream text-xs font-black tracking-widest uppercase px-3 py-1 mb-4 self-start">
                  {tEq('tonnage_label')}: {tEq(`machines.${key}.tonnage`)}
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-cream uppercase tracking-wider mb-3">
                  {tEq(`machines.${key}.name`)}
                </h2>
                <p className="text-cream/70 mb-6">{tEq(`machines.${key}.description`)}</p>

                <div className="border-t border-charcoal pt-6">
                  <h3 className="text-gold font-black text-sm tracking-widest uppercase mb-4">{t('specs_title')}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {(['weight', 'bucket', 'depth', 'reach'] as const).map(spec => (
                      <div key={spec} className="bg-jet-black p-3 border-l-2 border-blood-red">
                        <div className="text-cream/50 text-xs uppercase tracking-wider">{t(`specs.${spec}`)}</div>
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

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="border-l-4 border-gold bg-charcoal p-6 md:p-8">
            <h2 className="text-2xl md:text-4xl font-black text-cream uppercase tracking-wider mb-6">{t('attachments_title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {attachments.map(key => (
                <div key={key} className="bg-jet-black p-4 border-l-2 border-blood-red">
                  <h3 className="text-gold font-bold uppercase tracking-wider text-sm mb-2">{t(`attachments.${key}.name`)}</h3>
                  <p className="text-cream/70 text-sm">{t(`attachments.${key}.desc`)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PricingBanner from '@/components/PricingBanner';
import Link from 'next/link';

const machines = ['exc_1_5', 'exc_2', 'exc_4', 'loader_small', 'loader_big', 'tractor'] as const;

export function generateStaticParams() {
  return [{ locale: 'ru' }, { locale: 'kz' }];
}

export default async function PricingPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('pricing');
  const tEq = await getTranslations('equipment');

  return (
    <main className="bg-jet-black min-h-screen">
      <Navbar />

      <section className="relative bg-charcoal py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-blood-red opacity-10" style={{ clipPath: 'polygon(70% 0, 100% 0, 100% 100%, 50% 100%)' }} />
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 relative z-10">
          <div className="w-16 h-1 bg-blood-red mb-4" />
          <h1 className="text-3xl md:text-6xl font-black text-cream uppercase tracking-wider">
            <span className="text-gold">◆</span> {t('page_title')}
          </h1>
          <p className="text-gold font-bold tracking-widest text-base md:text-xl uppercase mt-4">{t('page_tagline')}</p>
        </div>
      </section>

      <PricingBanner />

      <section className="bg-jet-black py-12">
        <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="border-2 border-gold p-6 md:p-8 text-center">
            <p className="text-gold font-bold text-base md:text-lg tracking-wide">{t('first_order_note')}</p>
          </div>
        </div>
      </section>

      <section className="py-12 pb-20">
        <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr className="bg-blood-red">
                  <th className="text-cream font-black text-sm uppercase tracking-widest py-4 px-4 md:px-6 text-left">{t('table_machine')}</th>
                  <th className="text-cream font-black text-sm uppercase tracking-widest py-4 px-4 md:px-6 text-center">{t('table_hour')}</th>
                  <th className="text-cream font-black text-sm uppercase tracking-widest py-4 px-4 md:px-6 text-center">{t('table_shift')}</th>
                </tr>
              </thead>
              <tbody>
                {machines.map((key, i) => (
                  <tr key={key} className={i % 2 === 0 ? 'bg-charcoal' : 'bg-jet-black'}>
                    <td className="text-cream font-bold text-sm uppercase tracking-wider py-4 px-4 md:px-6">{tEq(`machines.${key}.name`)}</td>
                    <td className="text-gold font-black text-center py-4 px-4 md:px-6">{t(`machines.${key}.hour`)}</td>
                    <td className="text-gold font-black text-center py-4 px-4 md:px-6">{t(`machines.${key}.shift`)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-cream/60 text-xs tracking-wide uppercase mt-4 text-center">{t('fine_print')}</p>

          <div className="mt-10 text-center">
            <Link
              href={`/${locale}/contact`}
              className="inline-block w-full sm:w-auto px-12 py-5 bg-blood-red text-cream font-black text-sm tracking-widest uppercase hover:bg-deep-red transition-colors"
            >
              {t('call_to_action')}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

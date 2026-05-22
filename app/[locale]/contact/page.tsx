import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';

export function generateStaticParams() {
  return [{ locale: 'ru' }, { locale: 'kz' }];
}

export default async function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  return (
    <main className="bg-jet-black min-h-screen">
      <Navbar />

      <section className="relative bg-charcoal py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-blood-red opacity-10" style={{ clipPath: 'polygon(70% 0, 100% 0, 100% 100%, 50% 100%)' }} />
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 relative z-10">
          <div className="w-16 h-1 bg-blood-red mb-4" />
          <h1 className="text-3xl md:text-6xl font-black text-cream uppercase tracking-wider">
            <span className="text-gold">◆</span> {t('title')}
          </h1>
        </div>
      </section>

      <ContactSection />

      <section className="bg-charcoal py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div
            className="w-full h-64 md:h-96 flex items-center justify-center"
            style={{
              background: '#0D0D0D',
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(212,160,23,0.07) 30px, rgba(212,160,23,0.07) 31px), repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(212,160,23,0.07) 30px, rgba(212,160,23,0.07) 31px)',
            }}
          >
            <span className="text-gold font-bold text-sm md:text-lg tracking-widest uppercase border-2 border-gold/40 px-4 md:px-8 py-4 bg-jet-black/80 text-center">
              {t('map_placeholder')}
            </span>
          </div>
          <p className="text-center text-cream/50 text-xs md:text-sm tracking-wider mt-6 uppercase">{t('service_area')}</p>
          <p className="text-center text-cream/60 text-xs md:text-sm tracking-wider mt-2 uppercase">{t('languages')}</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

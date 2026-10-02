import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { locales, pageMetadata, type Locale } from '@/lib/site';
import { whatsappDraftHref } from '@/lib/quote.mjs';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return pageMetadata(locale, 'mopeds');
}

export default async function MopedsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('mopeds');
  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER || '+7 (777) 207-16-97';
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '77772071697';
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/drivepro.moped.almaty/';

  return (
    <main className="min-h-screen bg-jet-black">
      <Navbar />
      <header className="relative overflow-hidden bg-charcoal px-4 py-12 md:px-8 md:py-20 lg:px-16">
        <div className="pointer-events-none absolute inset-0 bg-blood-red/10" style={{ clipPath: 'polygon(70% 0, 100% 0, 100% 100%, 50% 100%)' }} />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-4 h-1 w-16 bg-blood-red" />
          <h1 className="text-3xl font-black uppercase tracking-wide text-cream md:text-6xl">{t('title')}</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-cream md:text-lg">{t('intro')}</p>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20 lg:px-16" aria-labelledby="updates-heading">
        <div className="mb-5 h-1 w-16 bg-blood-red" />
        <h2 id="updates-heading" className="text-2xl font-black uppercase tracking-wide text-cream md:text-4xl">{t('updates_title')}</h2>
        <div className="mt-6 border-l-4 border-gold bg-charcoal p-6 md:p-8">
          <p className="max-w-3xl text-base leading-relaxed text-cream">{t('feed_unavailable')}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="action-outline">{t('instagram_action')}</a>
            <a href={whatsappDraftHref(whatsappNumber, t('message'))} target="_blank" rel="noopener noreferrer" className="action-primary">{t('whatsapp_action')}</a>
            <a href={`tel:${phoneNumber.replace(/[^+\d]/g, '')}`} className="action-outline">{t('call_action')}</a>
          </div>
          <p className="mt-4 text-sm text-cream/90">{t('whatsapp_help')}</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}

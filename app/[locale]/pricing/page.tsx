import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuoteBrief from '@/components/QuoteBrief';
import { locales, pageMetadata, type Locale } from '@/lib/site';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return pageMetadata(locale, 'pricing');
}

export default async function PricingPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('quote');
  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER || '+7 (777) 207-16-97';
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '77772071697';

  return (
    <main className="min-h-screen bg-jet-black">
      <Navbar />
      <header className="relative overflow-hidden bg-charcoal px-4 py-12 md:px-8 md:py-20 lg:px-16">
        <div className="pointer-events-none absolute inset-0 bg-blood-red/10" style={{ clipPath: 'polygon(70% 0, 100% 0, 100% 100%, 50% 100%)' }} />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-4 h-1 w-16 bg-blood-red" />
          <h1 className="max-w-5xl text-3xl font-black uppercase tracking-wide text-cream md:text-6xl">{t('title')}</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-cream md:text-lg">{t('intro')}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`tel:${phoneNumber.replace(/[^+\d]/g, '')}`} className="action-primary">{t('call_action')}</a>
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="action-outline">WhatsApp</a>
          </div>
        </div>
      </header>

      <section className="bg-blood-red px-4 py-8 md:px-8 lg:px-16" aria-labelledby="quote-factors">
        <div className="mx-auto max-w-7xl">
          <h2 id="quote-factors" className="text-2xl font-black uppercase tracking-wide text-cream md:text-3xl">{t('factors_title')}</h2>
          <p className="mt-3 max-w-4xl text-base leading-relaxed text-cream">{t('factors_text')}</p>
          <p className="mt-3 max-w-4xl text-sm text-cream">{t('other_note')}</p>
        </div>
      </section>
      <QuoteBrief />
      <Footer />
    </main>
  );
}

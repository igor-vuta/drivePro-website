import Link from 'next/link';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { locales, pageMetadata, type Locale } from '@/lib/site';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return pageMetadata(locale, 'services');
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('services');
  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER || '+7 (777) 207-16-97';
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '77772071697';
  const sections = ['operator', 'jobs', 'access', 'other'] as const;
  const questions = ['operator', 'price', 'unknown', 'whatsapp'] as const;

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
            <Link href={`/${locale}/pricing`} className="action-primary">{t('quote_action')}</Link>
            <a href={`tel:${phoneNumber.replace(/[^+\d]/g, '')}`} className="action-outline">{t('call_action')}</a>
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="action-outline">WhatsApp</a>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 md:grid-cols-2 md:px-8 md:py-20 lg:px-16" aria-label={t('title')}>
        {sections.map((key, index) => (
          <article key={key} className={`border-t-4 ${index % 2 ? 'border-gold' : 'border-blood-red'} bg-charcoal p-6`}>
            <h2 className="text-2xl font-black uppercase tracking-wide text-cream">{t(`${key}_title`)}</h2>
            <p className="mt-3 text-base leading-relaxed text-cream/90">{t(`${key}_text`)}</p>
          </article>
        ))}
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-12 md:px-8 md:pb-20 lg:px-16" aria-labelledby="services-faq-title">
        <h2 id="services-faq-title" className="text-3xl font-black uppercase tracking-wide text-cream">{t('faq_title')}</h2>
        <dl className="mt-6 grid gap-6 md:grid-cols-2">
          {questions.map(key => (
            <div key={key} className="border-t-4 border-gold bg-charcoal p-6">
              <dt className="text-xl font-black text-cream">{t(`faq_${key}_question`)}</dt>
              <dd className="mt-3 text-base leading-relaxed text-cream/90">{t(`faq_${key}_answer`)}</dd>
            </div>
          ))}
        </dl>
      </section>
      <Footer />
    </main>
  );
}

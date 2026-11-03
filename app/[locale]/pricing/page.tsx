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

  return (
    <main className="min-h-screen bg-jet-black">
      <a href="#quote-brief" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-cream focus:p-3 focus:text-jet-black">{t('skip_brief')}</a>
      <Navbar />
      <header className="mx-auto max-w-[752px] px-4 pb-7 pt-8 md:pt-12">
        <h1 className="text-balance text-[28px] font-bold leading-tight text-cream md:text-[40px]">{t('title')}</h1>
        <p className="mt-3 text-base leading-relaxed text-cream/90">{t('intro')}</p>
      </header>
      <QuoteBrief />
      <section className="mx-auto max-w-[752px] px-4 pb-12" aria-labelledby="quote-factors">
        <details data-quote-factors className="border-t border-cream/20">
          <summary className="min-h-12 cursor-pointer py-3 text-base font-semibold text-gold hover:text-cream"><h2 id="quote-factors" className="inline text-base">{t('factors_title')}</h2></summary>
          <p className="mt-3 max-w-4xl text-base leading-relaxed text-cream">{t('factors_text')}</p>
          <p className="mt-3 max-w-4xl text-sm text-cream">{t('other_note')}</p>
        </details>
      </section>
      <Footer />
    </main>
  );
}

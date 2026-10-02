import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import { locales, pageMetadata, type Locale } from '@/lib/site';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return pageMetadata(locale, 'contact');
}

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  return (
    <main className="min-h-screen bg-jet-black">
      <Navbar />
      <header className="bg-charcoal px-4 py-12 md:px-8 md:py-20 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 h-1 w-16 bg-blood-red" />
          <h1 className="text-3xl font-black uppercase tracking-wide text-cream md:text-6xl">{t('title')}</h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-cream md:text-lg">{t('intro')}</p>
        </div>
      </header>
      <ContactSection showHeading={false} />
      <p className="mx-auto max-w-7xl px-4 pb-12 text-sm text-cream/90 md:px-8 lg:px-16">{t('service_area')}</p>
      <Footer />
    </main>
  );
}

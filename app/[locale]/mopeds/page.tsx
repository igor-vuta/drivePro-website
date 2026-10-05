import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import InstagramGallery from '@/components/InstagramGallery';
import Footer from '@/components/Footer';
import { locales, pageMetadata, type Locale } from '@/lib/site';

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

  return (
    <main className="min-h-screen bg-jet-black">
      <a href="#moped-photos" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-cream focus:p-3 focus:text-jet-black">{t('skip_photos')}</a>
      <Navbar />
      <header className="mx-auto max-w-7xl px-4 pb-2 pt-8 md:px-8 md:pt-12 lg:px-16">
        <h1 className="text-balance text-[28px] font-bold leading-tight text-cream md:text-[40px]">{t('title')}</h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-cream/90">{t('intro')}</p>
      </header>

      <InstagramGallery />
      <section className="mx-auto max-w-7xl px-4 pb-12 md:px-8 lg:px-16">
        <a href={`tel:${phoneNumber.replace(/[^+\d]/g, '')}`} className="action-outline">{t('call_action')}</a>
        <p className="mt-4 text-sm text-cream">{t('whatsapp_help')}</p>
      </section>
      <Footer />
    </main>
  );
}

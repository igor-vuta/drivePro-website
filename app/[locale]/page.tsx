import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import styles from '@/components/Welcome.module.css';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { locales, pageMetadata, type Locale } from '@/lib/site';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return pageMetadata(locale, '');
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');
  return (
    <div className={styles.home}>
      <a href="#welcome" className={styles.skip}>{t('skip')}</a>
      <Navbar mode="welcome" />
      <main className={styles.main}>
      <Hero />
      </main>
      <Footer compact />
    </div>
  );
}

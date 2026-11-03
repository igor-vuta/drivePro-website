import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import styles from '@/components/Welcome.module.css';
import messages from '@/messages/ru.json';
import { pageMetadata } from '@/lib/site';

export async function generateMetadata() {
  return pageMetadata('ru', '');
}

export default function RootPage() {
  setRequestLocale('ru');
  return <NextIntlClientProvider locale="ru" messages={messages}>
    <div className={styles.home}>
      <a href="#welcome" className={styles.skip}>{messages.home.skip}</a>
      <Navbar mode="welcome" />
      <main className={styles.main}><Hero /></main>
      <Footer compact />
    </div>
  </NextIntlClientProvider>;
}

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import OptionalPlay from '@/components/OptionalPlay';
import WhyUs from '@/components/WhyUs';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { setRequestLocale } from 'next-intl/server';
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
  return (
    <main>
      <Navbar />
      <Hero />
      <OptionalPlay />
      <WhyUs />
      <ContactSection />
      <Footer />
    </main>
  );
}

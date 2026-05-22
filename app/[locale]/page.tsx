import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PricingBanner from '@/components/PricingBanner';
import EquipmentGrid from '@/components/EquipmentGrid';
import WhyUs from '@/components/WhyUs';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { setRequestLocale } from 'next-intl/server';

export function generateStaticParams() {
  return [{ locale: 'ru' }, { locale: 'kz' }];
}

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return (
    <main>
      <Navbar />
      <Hero />
      <PricingBanner />
      <EquipmentGrid />
      <WhyUs />
      <ContactSection />
      <Footer />
    </main>
  );
}

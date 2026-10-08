import ServicesPage from '../services/page';
import { locales, pageMetadata, type Locale } from '@/lib/site';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return pageMetadata(locale, 'excavators');
}

export default ServicesPage;

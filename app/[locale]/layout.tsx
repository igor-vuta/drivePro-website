import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { languageByLocale, locales, siteBasePath, siteOrigin, type Locale } from '@/lib/site';
import '../globals.css';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: routeLocale } = await params;
  if (!locales.some(locale => locale === routeLocale)) throw new Error(`Unknown locale: ${routeLocale}`);
  const locale = routeLocale as Locale;
  setRequestLocale(locale);
  const messages = await getMessages();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Drive Pro',
    url: `${siteOrigin}${siteBasePath}/`,
  };

  return (
    <html lang={languageByLocale[locale]}>
      <body className="bg-jet-black text-cream">
        <script type="application/ld+json">{JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}

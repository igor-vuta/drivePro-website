import type { Metadata } from 'next';

export const locales = ['ru', 'kz', 'en'] as const;
export type Locale = (typeof locales)[number];
export const pages = ['', 'services', 'pricing', 'contact', 'mopeds'] as const;
export type Page = (typeof pages)[number];
export const siteOrigin = 'https://igor-vuta.github.io';
export const siteBasePath = '/drivePro-website';
export const languageByLocale: Record<Locale, string> = { ru: 'ru', kz: 'kk', en: 'en' };

export function siteUrl(locale: Locale, page: Page = '') {
  return `${siteOrigin}${siteBasePath}/${locale}/${page ? `${page}/` : ''}`;
}

export function languageAlternates(page: Page) {
  return Object.fromEntries(locales.map(locale => [languageByLocale[locale], siteUrl(locale, page)]));
}

export async function pageMetadata(locale: Locale, page: Page): Promise<Metadata> {
  const messages = (await import(`../messages/${locale}.json`)).default;
  const entry = messages.seo[page || 'home'];
  return {
    title: entry.title,
    description: entry.description,
    alternates: {
      canonical: siteUrl(locale, page),
      languages: languageAlternates(page),
    },
    openGraph: {
      title: entry.title,
      description: entry.description,
      url: siteUrl(locale, page),
      type: 'website',
      locale: locale === 'kz' ? 'kk_KZ' : locale === 'ru' ? 'ru_KZ' : 'en_KZ',
    },
  };
}

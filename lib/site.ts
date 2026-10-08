import type { Metadata } from 'next';

export const locales = ['ru', 'kz', 'en'] as const;
export type Locale = (typeof locales)[number];
export const pages = ['', 'services', 'pricing', 'contact', 'mopeds', 'excavators'] as const;
export type Page = (typeof pages)[number];
export const siteOrigin = 'https://igor-vuta.github.io';
export const siteBasePath = '/drivePro-website';
export const languageByLocale: Record<Locale, string> = { ru: 'ru', kz: 'kk', en: 'en' };

export function siteUrl(locale: Locale, page: Page = '') {
  return `${siteOrigin}${siteBasePath}/${locale}/${page ? `${page}/` : ''}`;
}

export type Section = 'excavators' | 'mopeds';

export function sectionPath(locale: Locale, section: Section) {
  return locale === 'ru' ? `/${section}` : `/${locale}/${section}`;
}

export function sectionUrl(locale: Locale, section: Section) {
  return `${siteOrigin}${siteBasePath}${sectionPath(locale, section)}/`;
}

function canonicalUrl(locale: Locale, page: Page) {
  if (page === 'services' || page === 'excavators') return sectionUrl(locale, 'excavators');
  if (page === 'mopeds') return sectionUrl(locale, 'mopeds');
  return siteUrl(locale, page);
}

export function languageAlternates(page: Page) {
  return {
    ...Object.fromEntries(locales.map(locale => [languageByLocale[locale], canonicalUrl(locale, page)])),
    'x-default': page === '' ? `${siteOrigin}${siteBasePath}/` : canonicalUrl('ru', page),
  };
}

export async function pageMetadata(locale: Locale, page: Page): Promise<Metadata> {
  const messages = (await import(`../messages/${locale}.json`)).default;
  const entry = messages.seo[page === 'excavators' ? 'services' : page || 'home'];
  const canonical = canonicalUrl(locale, page);
  return {
    title: entry.title,
    description: entry.description,
    alternates: {
      canonical,
      languages: languageAlternates(page),
    },
    openGraph: {
      title: entry.title,
      description: entry.description,
      url: canonical,
      type: 'website',
      locale: locale === 'kz' ? 'kk_KZ' : locale === 'ru' ? 'ru_KZ' : 'en_KZ',
    },
  };
}

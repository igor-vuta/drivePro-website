import type { MetadataRoute } from 'next';
import { languageAlternates, locales, pages, siteUrl } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap(locale =>
    pages.map(page => ({
      url: siteUrl(locale, page),
      alternates: { languages: languageAlternates(page) },
    }))
  );
}

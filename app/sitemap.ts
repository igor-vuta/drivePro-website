import type { MetadataRoute } from 'next';
import { languageAlternates, locales, sectionUrl, siteUrl } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap(locale =>
    (['', 'pricing', 'contact', 'excavators', 'mopeds'] as const).map(page => ({
      url: page === 'excavators' || page === 'mopeds' ? sectionUrl(locale, page) : siteUrl(locale, page),
      alternates: { languages: languageAlternates(page) },
    }))
  );
}

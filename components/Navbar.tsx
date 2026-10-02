'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { locales, type Locale } from '@/lib/site';

const languageNames: Record<Locale, string> = { ru: 'RU', kz: 'ҚАЗ', en: 'EN' };

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const route = pathname.match(/\/(?:ru|kz|en)(\/.*)?$/)?.[1] || '';
  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER || '+7 (777) 207-16-97';

  const links = [
    { path: '', label: t('home') },
    { path: '/services', label: t('services') },
    { path: '/pricing', label: t('pricing') },
    { path: '/mopeds', label: t('mopeds') },
    { path: '/contact', label: t('contact') },
  ];

  const languages = (
    <div className="flex flex-wrap items-center gap-2" aria-label={t('languages')}>
      {locales.map(target => (
        <Link
          key={target}
          href={`/${target}${route}`}
          hrefLang={target === 'kz' ? 'kk' : target}
          lang={target === 'kz' ? 'kk' : target}
          aria-current={target === locale ? 'page' : undefined}
          className={`inline-flex min-h-11 min-w-11 items-center justify-center border px-2 text-xs font-black tracking-wider ${target === locale ? 'border-gold bg-gold text-jet-black' : 'border-gold text-gold hover:bg-gold hover:text-jet-black'}`}
        >
          {languageNames[target]}
        </Link>
      ))}
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 border-b-2 border-blood-red bg-jet-black" aria-label={t('company')}>
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-4 md:px-8 lg:px-16">
        <Link href={`/${locale}`} className="flex min-w-0 items-center gap-2 text-base font-black uppercase tracking-widest text-cream sm:text-lg">
          <span className="text-xl text-gold" aria-hidden="true">◆</span>
          <span className="truncate">{t('company')}</span>
        </Link>

        <div className="hidden items-center gap-4 lg:flex">
          {links.map(link => (
            <Link key={link.path} href={`/${locale}${link.path}`} className="whitespace-nowrap text-sm font-bold uppercase tracking-wide text-cream hover:text-gold">
              {link.label}
            </Link>
          ))}
          {languages}
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <a href={`tel:${phoneNumber.replace(/[^+\d]/g, '')}`} className="text-sm font-bold text-gold">{t('contact')}</a>
          <details className="group relative">
            <summary className="flex min-h-11 min-w-11 cursor-pointer list-none items-center justify-center border border-gold text-gold" aria-label={t('open_menu')}>
              <span aria-hidden="true">☰</span>
            </summary>
            <div className="absolute right-0 top-full mt-2 w-[min(90vw,22rem)] border border-blood-red bg-charcoal p-4 shadow-xl">
              {links.map(link => (
                <Link key={link.path} href={`/${locale}${link.path}`} className="block border-b border-jet-black px-2 py-3 text-sm font-bold uppercase tracking-wide text-cream hover:text-gold">
                  {link.label}
                </Link>
              ))}
              <div className="pt-4">{languages}</div>
            </div>
          </details>
        </div>
      </div>
    </nav>
  );
}

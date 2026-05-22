'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const otherLocale = locale === 'ru' ? 'kz' : 'ru';
  const switchedPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const links = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/services`, label: t('services') },
    { href: `/${locale}/pricing`, label: t('pricing') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-jet-black border-b-2 border-blood-red">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex items-center justify-between h-16 gap-4">
        <Link href={`/${locale}`} className="min-w-0 flex items-center gap-2 text-blood-red font-black text-base sm:text-lg md:text-xl tracking-widest uppercase">
          <span className="text-gold text-xl md:text-2xl">◆</span>
          <span className="truncate">{t('company')}</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map(link => (
            <Link key={link.href} href={link.href} className="text-cream hover:text-blood-red transition-colors text-sm font-bold tracking-widest uppercase whitespace-nowrap">
              {link.label}
            </Link>
          ))}
          <Link href={switchedPath} className="ml-2 px-3 py-1 border border-gold text-gold text-xs font-bold tracking-widest hover:bg-gold hover:text-jet-black transition-colors">
            {otherLocale.toUpperCase()}
          </Link>
        </div>

        <button
          className="md:hidden text-cream text-2xl leading-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-charcoal border-t border-blood-red">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-3 text-cream hover:text-blood-red font-bold tracking-widest uppercase text-sm border-b border-jet-black"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={switchedPath}
            className="block px-4 py-3 text-gold font-bold tracking-widest text-sm border-b border-jet-black"
            onClick={() => setMenuOpen(false)}
          >
            {otherLocale.toUpperCase()}
          </Link>
        </div>
      )}
    </nav>
  );
}

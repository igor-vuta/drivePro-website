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
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href={`/${locale}`} className="flex items-center gap-2 text-blood-red font-black text-xl tracking-widest uppercase">
          <span className="text-gold text-2xl">★</span>
          {t('company')}
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <Link key={link.href} href={link.href} className="text-cream hover:text-blood-red transition-colors text-sm font-bold tracking-widest uppercase">
              {link.label}
            </Link>
          ))}
          <Link href={switchedPath} className="ml-4 px-3 py-1 border border-gold text-gold text-xs font-bold tracking-widest hover:bg-gold hover:text-jet-black transition-colors">
            {otherLocale.toUpperCase()}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-cream text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-charcoal border-t border-blood-red">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-6 py-3 text-cream hover:text-blood-red font-bold tracking-widest uppercase text-sm border-b border-charcoal"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={switchedPath}
            className="block px-6 py-3 text-gold font-bold tracking-widest text-sm"
            onClick={() => setMenuOpen(false)}
          >
            {otherLocale.toUpperCase()}
          </Link>
        </div>
      )}
    </nav>
  );
}

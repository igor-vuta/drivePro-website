import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale();

  const links = [
    { href: `/${locale}`, label: tNav('home') },
    { href: `/${locale}/services`, label: tNav('services') },
    { href: `/${locale}/pricing`, label: tNav('pricing') },
    { href: `/${locale}/contact`, label: tNav('contact') },
  ];

  return (
    <footer className="bg-jet-black border-t-2 border-blood-red py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-gold text-2xl">◆</span>
              <span className="text-blood-red font-black text-xl tracking-widest uppercase">{t('company')}</span>
            </div>
            <p className="text-cream/60 text-sm tracking-wider">{t('tagline')}</p>
          </div>

          <div>
            <h4 className="text-gold font-black text-sm tracking-widest uppercase mb-4">{t('links_title')}</h4>
            <ul className="space-y-2">
              {links.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-cream/70 hover:text-blood-red text-sm tracking-wider transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gold font-black text-sm tracking-widest uppercase mb-4">{t('social_title')}</h4>
            <div className="space-y-2">
              <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '77772071697'}`} target="_blank" rel="noopener noreferrer" className="block text-cream/70 hover:text-blood-red text-sm tracking-wider transition-colors">
                WhatsApp
              </a>
              <a href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/drivepro.moped.almaty'} target="_blank" rel="noopener noreferrer" className="block text-cream/70 hover:text-blood-red text-sm tracking-wider transition-colors break-all">
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-charcoal pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream/40 text-xs tracking-wider text-center md:text-left">{t('copyright')}</p>
          <div className="flex gap-2 text-blood-red text-xl font-black" aria-hidden>
            <span>—</span><span>◆</span><span>—</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('home');
  const locale = useLocale();
  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER || '+7 (777) 207-16-97';
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '77772071697';

  return (
    <section className="relative overflow-hidden bg-jet-black py-6 md:py-16">
      <div className="pointer-events-none absolute inset-0 bg-blood-red/10" style={{ clipPath: 'polygon(65% 0, 100% 0, 100% 100%, 40% 100%)' }} />
      <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(192,57,43,.5) 10px, rgba(192,57,43,.5) 11px)' }} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
        <div className="mb-3 h-1 w-20 bg-blood-red md:mb-5" />
        <h1 className="max-w-5xl text-2xl font-black uppercase leading-tight tracking-wide text-cream sm:text-4xl md:text-6xl">
          {t('headline')}
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-cream md:mt-4 md:text-lg">{t('intro')}</p>

        <div className="mt-4 grid gap-3 md:mt-7 md:grid-cols-2 md:gap-4">
          <article className="flex flex-col justify-between border-t-4 border-blood-red bg-charcoal p-4 md:p-7">
            <div>
              <h2 className="text-lg font-black uppercase tracking-wide text-cream md:text-2xl">{t('equipment_title')}</h2>
              <p className="mt-1 text-sm leading-relaxed text-cream/90 md:mt-2 md:text-base">{t('equipment_text')}</p>
            </div>
            <Link href={`/${locale}/pricing`} className="action-primary mt-3 self-start md:mt-5">{t('equipment_action')}</Link>
          </article>
          <article className="flex flex-col justify-between border-t-4 border-gold bg-charcoal p-4 md:p-7">
            <div>
              <h2 className="text-lg font-black uppercase tracking-wide text-cream md:text-2xl">{t('moped_title')}</h2>
              <p className="mt-1 text-sm leading-relaxed text-cream/90 md:mt-2 md:text-base">{t('moped_text')}</p>
            </div>
            <Link href={`/${locale}/mopeds`} className="action-outline mt-3 self-start md:mt-5">{t('moped_action')}</Link>
          </article>
        </div>

        <div className="mt-4 flex flex-wrap gap-3 md:mt-6">
          <a href={`tel:${phoneNumber.replace(/[^+\d]/g, '')}`} className="text-sm font-bold text-gold underline underline-offset-4">{t('call')}</a>
          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-cream underline underline-offset-4">{t('whatsapp')}</a>
        </div>
      </div>
    </section>
  );
}

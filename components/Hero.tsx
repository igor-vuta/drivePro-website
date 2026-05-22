 'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';

const HERO_IMAGE_URL = 'https://images.unsplash.com/photo-1590644365607-5c695c636ec1?w=1600&q=80';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '77772071697';
  const [imgError, setImgError] = useState(false);

  return (
    <section className="relative min-h-[calc(100vh-4rem)] bg-jet-black flex items-center overflow-hidden">
      {!imgError && (
        <Image
          src={HERO_IMAGE_URL}
          alt={t('background_alt')}
          width={1600}
          height={900}
          className="absolute inset-0 h-full w-full object-cover"
          priority
          onError={() => setImgError(true)}
        />
      )}

      <div className="absolute inset-0 bg-jet-black/70" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(192,57,43,0.15) 10px, rgba(192,57,43,0.15) 11px)',
        }}
      />
      <div
        className="absolute inset-0 bg-blood-red"
        style={{ clipPath: 'polygon(60% 0, 100% 0, 100% 100%, 40% 100%)', opacity: 0.18 }}
      />
      <div
        className="absolute inset-0 bg-deep-red opacity-30"
        style={{ clipPath: 'polygon(55% 0, 60% 0, 45% 100%, 40% 100%)' }}
      />

      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-cream opacity-10 font-black text-[20vw] leading-none select-none pointer-events-none">
        {t('year')}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-20 w-full">
        <div className="w-24 h-1 bg-blood-red mb-8" />

        <h1 className="text-3xl md:text-6xl lg:text-8xl font-black text-cream uppercase tracking-wider leading-tight mb-6 max-w-5xl">
          {t('headline')}
        </h1>

        <p className="text-base md:text-xl text-cream/80 max-w-3xl mb-10 font-medium tracking-wide">
          {t('subheadline')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <Link
            href={`/${locale}/pricing`}
            className="w-full sm:w-auto text-center px-8 py-4 bg-blood-red text-cream font-black text-sm tracking-widest uppercase hover:bg-deep-red transition-colors border-2 border-blood-red"
          >
            {t('cta_pricing')}
          </Link>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center px-8 py-4 bg-transparent text-cream font-black text-sm tracking-widest uppercase border-2 border-cream hover:bg-cream hover:text-jet-black transition-colors"
          >
            {t('cta_whatsapp')}
          </a>
        </div>

        <div className="mt-16 flex gap-3">
          <div className="w-32 h-0.5 bg-blood-red" />
          <div className="w-8 h-0.5 bg-gold" />
          <div className="w-4 h-0.5 bg-cream/30" />
        </div>
      </div>
    </section>
  );
}

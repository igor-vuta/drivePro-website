import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '77XXXXXXXXX';

  return (
    <section className="relative min-h-screen bg-jet-black flex items-center overflow-hidden">
      {/* Diagonal red slash */}
      <div
        className="absolute inset-0 bg-blood-red"
        style={{ clipPath: 'polygon(60% 0, 100% 0, 100% 100%, 40% 100%)', opacity: 0.15 }}
      />
      {/* Diagonal accent line */}
      <div
        className="absolute inset-0 bg-deep-red opacity-30"
        style={{ clipPath: 'polygon(55% 0, 60% 0, 45% 100%, 40% 100%)' }}
      />

      {/* Large decorative year */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-cream opacity-5 font-black text-[20vw] leading-none select-none pointer-events-none">
        {t('year')}
      </div>

      {/* Star decorations */}
      <div className="absolute top-8 left-8 text-blood-red text-6xl opacity-30 select-none">★</div>
      <div className="absolute bottom-16 right-16 text-gold text-4xl opacity-20 select-none">★</div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Red top border accent */}
        <div className="w-24 h-1 bg-blood-red mb-8" />

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-cream uppercase tracking-wider leading-tight mb-6 max-w-4xl">
          {t('headline')}
        </h1>

        <p className="text-lg md:text-xl text-cream/70 max-w-2xl mb-10 font-medium tracking-wide">
          {t('subheadline')}
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href={`/${locale}/pricing`}
            className="px-8 py-4 bg-blood-red text-cream font-black text-sm tracking-widest uppercase hover:bg-deep-red transition-colors border-2 border-blood-red"
          >
            {t('cta_pricing')}
          </Link>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-transparent text-cream font-black text-sm tracking-widest uppercase border-2 border-cream hover:bg-cream hover:text-jet-black transition-colors"
          >
            {t('cta_whatsapp')}
          </a>
        </div>

        {/* Constructivist decorative lines */}
        <div className="mt-16 flex gap-3">
          <div className="w-32 h-0.5 bg-blood-red" />
          <div className="w-8 h-0.5 bg-gold" />
          <div className="w-4 h-0.5 bg-cream/30" />
        </div>
      </div>
    </section>
  );
}

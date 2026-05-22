import { useTranslations } from 'next-intl';

export default function PricingBanner() {
  const t = useTranslations('pricing');

  return (
    <section className="relative bg-blood-red py-12 md:py-16 overflow-hidden">
      <div
        className="absolute inset-0 bg-deep-red"
        style={{ clipPath: 'polygon(0 0, 45% 0, 30% 100%, 0 100%)' }}
      />
      <div
        className="absolute top-0 right-0 bottom-0 w-32 bg-deep-red opacity-50"
        style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-16 text-center">
        <div className="flex items-center justify-center gap-3 mb-4 text-gold text-2xl md:text-3xl font-black">
          <span>◆</span>
          <span>◆</span>
          <span>◆</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-cream uppercase tracking-wider mb-3 break-words">
          {t('banner_title')}
        </h2>
        <p className="text-base sm:text-lg md:text-2xl font-bold text-cream/95 uppercase tracking-wide mb-3">
          {t('banner_delivery')}
        </p>
        <p className="text-sm md:text-lg text-gold font-black tracking-wider uppercase mb-2">{t('banner_secondary')}</p>
        <p className="text-cream/80 tracking-wider uppercase text-[10px] md:text-xs">{t('fine_print')}</p>
      </div>
    </section>
  );
}

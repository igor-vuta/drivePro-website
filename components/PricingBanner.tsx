import { useTranslations } from 'next-intl';

export default function PricingBanner() {
  const t = useTranslations('pricing');

  return (
    <section className="relative bg-blood-red py-16 overflow-hidden">
      {/* Diagonal accent */}
      <div
        className="absolute inset-0 bg-deep-red"
        style={{ clipPath: 'polygon(0 0, 45% 0, 30% 100%, 0 100%)' }}
      />
      <div
        className="absolute top-0 right-0 bottom-0 w-32 bg-deep-red opacity-50"
        style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="text-gold text-3xl">★</span>
          <span className="text-gold text-3xl">★</span>
          <span className="text-gold text-3xl">★</span>
        </div>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-cream uppercase tracking-wider mb-4">
          {t('banner_title')}
        </h2>
        <p className="text-xl md:text-2xl font-bold text-cream/90 uppercase tracking-wider mb-4">
          {t('banner_delivery')}
        </p>
        <p className="text-gold font-bold tracking-widest uppercase text-sm">
          {t('banner_urgency')}
        </p>
      </div>
    </section>
  );
}

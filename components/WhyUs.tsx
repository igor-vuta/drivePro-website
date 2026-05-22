import { useTranslations } from 'next-intl';

export default function WhyUs() {
  const t = useTranslations('whyus');
  const reasons = ['experience', 'projects', 'fast', 'reliable'] as const;

  return (
    <section className="bg-charcoal py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <div className="w-16 h-1 bg-blood-red mb-4" />
          <h2 className="text-4xl md:text-5xl font-black text-cream uppercase tracking-wider">
            {t('title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map(key => (
            <div key={key} className="border-l-4 border-blood-red pl-6 py-4">
              <div className="text-blood-red text-3xl mb-3">★</div>
              <h3 className="text-cream font-black text-lg uppercase tracking-wider mb-2">
                {t(`reasons.${key}.title`)}
              </h3>
              <p className="text-cream/60 text-sm leading-relaxed">
                {t(`reasons.${key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useTranslations } from 'next-intl';

export default function WhyUs() {
  const t = useTranslations('home');
  const steps = ['step1', 'step2', 'step3'] as const;

  return (
    <section className="bg-charcoal py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="mb-12">
          <div className="w-16 h-1 bg-blood-red mb-4" />
          <h2 className="text-3xl md:text-5xl font-black text-cream normal-case tracking-normal">
          {t('process_title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {steps.map((key, index) => (
            <div key={key} className="border-l-4 border-gold pl-6 py-4">
              <div className="text-blood-red text-3xl mb-3 font-black">{`0${index + 1}`}</div>
              <h3 className="text-cream font-black text-lg normal-case tracking-normal mb-2">
                {t(`${key}_title`)}
              </h3>
              <p className="text-cream/70 text-sm leading-relaxed">
                {t(`${key}_text`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

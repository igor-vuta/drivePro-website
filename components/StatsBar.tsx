import { useTranslations } from 'next-intl';

export default function StatsBar() {
  const t = useTranslations('stats');
  const stats = ['projects', 'founded', 'machines', 'support'] as const;

  return (
    <section className="bg-blood-red py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(key => (
            <div key={key} className="border-l-4 border-gold pl-4">
              <div className="text-2xl md:text-4xl font-black text-cream tracking-widest">{t(`${key}.value`)}</div>
              <div className="text-[11px] md:text-sm font-bold text-cream/90 uppercase tracking-wider">{t(`${key}.label`)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

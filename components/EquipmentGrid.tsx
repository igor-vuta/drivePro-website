import EquipmentCard from './EquipmentCard';
import { useTranslations } from 'next-intl';

export default function EquipmentGrid() {
  const t = useTranslations('equipment');
  const machines = ['exc_1_5', 'exc_2', 'exc_4', 'loader_small', 'loader_big'] as const;

  return (
    <section className="bg-jet-black py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-12">
          <div className="w-16 h-1 bg-blood-red mb-4" />
          <h2 className="text-4xl md:text-5xl font-black text-cream uppercase tracking-wider">
            <span className="text-blood-red">★</span> {t('title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {machines.map(key => (
            <EquipmentCard key={key} machineKey={key} />
          ))}
        </div>
      </div>
    </section>
  );
}

import EquipmentCard from './EquipmentCard';
import { useTranslations } from 'next-intl';

export default function EquipmentGrid() {
  const t = useTranslations('equipment');
  const machines = ['exc_1_5', 'exc_2', 'exc_4', 'loader_small', 'loader_big', 'tractor'] as const;

  return (
    <section className="bg-jet-black py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="mb-12">
          <div className="w-16 h-1 bg-blood-red mb-4" />
          <h2 className="text-3xl md:text-5xl font-black text-cream uppercase tracking-wider">
            <span className="text-gold">◆</span> {t('title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {machines.map(key => (
            <EquipmentCard key={key} machineKey={key} />
          ))}
        </div>
      </div>
    </section>
  );
}

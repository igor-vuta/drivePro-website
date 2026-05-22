import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

interface EquipmentCardProps {
  machineKey: 'exc_1_5' | 'exc_2' | 'exc_4' | 'loader_small' | 'loader_big';
}

export default function EquipmentCard({ machineKey }: EquipmentCardProps) {
  const t = useTranslations('equipment');
  const locale = useLocale();

  return (
    <div className="bg-charcoal border-t-4 border-blood-red flex flex-col">
      {/* Mockup photo placeholder */}
      <div
        className="w-full h-48 flex items-center justify-center relative overflow-hidden"
        style={{
          background: '#111',
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(192,57,43,0.15) 8px, rgba(192,57,43,0.15) 9px)',
        }}
      >
        <span className="text-gold font-bold text-sm tracking-widest uppercase border border-gold/50 px-4 py-2 bg-jet-black/80">
          {t(`machines.${machineKey}.placeholder`)}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1">
        {/* Tonnage badge */}
        <span className="inline-block bg-blood-red text-cream text-xs font-black tracking-widest uppercase px-3 py-1 mb-3 self-start">
          {t('tonnage_label')}: {t(`machines.${machineKey}.tonnage`)}
        </span>

        <h3 className="text-cream font-black text-xl uppercase tracking-wider mb-3">
          {t(`machines.${machineKey}.name`)}
        </h3>
        <p className="text-cream/60 text-sm leading-relaxed flex-1 mb-6">
          {t(`machines.${machineKey}.description`)}
        </p>

        <Link
          href={`/${locale}/contact`}
          className="block text-center bg-blood-red text-cream font-black text-sm tracking-widest uppercase py-3 hover:bg-deep-red transition-colors"
        >
          {t('order_btn')}
        </Link>
      </div>
    </div>
  );
}

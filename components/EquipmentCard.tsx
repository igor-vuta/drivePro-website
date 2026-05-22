'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';

interface EquipmentCardProps {
  machineKey: 'exc_1_5' | 'exc_2' | 'exc_4' | 'loader_small' | 'loader_big' | 'tractor';
}

const MACHINE_IMAGES: Record<EquipmentCardProps['machineKey'], string> = {
  exc_1_5: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80',
  exc_2: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  exc_4: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  loader_small: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
  loader_big: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
  tractor: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
};

export default function EquipmentCard({ machineKey }: EquipmentCardProps) {
  const t = useTranslations('equipment');
  const locale = useLocale();
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-charcoal border-t-4 border-blood-red flex flex-col">
      <div className="w-full aspect-[4/3] relative overflow-hidden bg-jet-black">
        {!imgError ? (
          <Image
            src={MACHINE_IMAGES[machineKey]}
            alt={t(`machines.${machineKey}.image_alt`)}
            width={800}
            height={600}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background: '#111',
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(192,57,43,0.15) 8px, rgba(192,57,43,0.15) 9px)',
            }}
          >
            <span className="text-gold font-bold text-sm tracking-widest uppercase border border-gold/50 px-4 py-2 bg-jet-black/80 text-center">
              {t(`machines.${machineKey}.fallback_label`)}
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <span className="inline-block bg-blood-red text-cream text-xs font-black tracking-widest uppercase px-3 py-1 mb-3 self-start">
          {t('tonnage_label')}: {t(`machines.${machineKey}.tonnage`)}
        </span>

        <h3 className="text-cream font-black text-xl uppercase tracking-wider mb-3">
          {t(`machines.${machineKey}.name`)}
        </h3>
        <p className="text-cream/70 text-sm leading-relaxed flex-1 mb-6">
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

'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function ContactSection({ showHeading = true }: { showHeading?: boolean }) {
  const t = useTranslations('contact');
  const [phone, setPhone] = useState('');

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '77772071697';
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/drivepro.moped.almaty';
  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER || '+7 (777) 207-16-97';

  function handleCallback(e: React.FormEvent) {
    e.preventDefault();
    if (!phone.trim()) return;
    const message = encodeURIComponent(`${t('callback_whatsapp_message')}${phone.trim()}`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  }

  return (
    <section className="bg-jet-black py-12 md:py-20" aria-label={t('title')}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        {showHeading && <div className="mb-12">
          <div className="w-16 h-1 bg-blood-red mb-4" />
          <h2 className="text-3xl md:text-5xl font-black text-cream uppercase tracking-wider">
            <span className="text-gold">◆</span> {t('title')}
          </h2>
        </div>}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-charcoal p-6 border-t-4 border-blood-red">
            <h3 className="text-cream font-black text-lg uppercase tracking-wider mb-4">
              {t('callback_title')}
            </h3>
            <form onSubmit={handleCallback}>
              <label htmlFor="callback-phone" className="block text-cream text-base mb-2">
                {t('callback_label')}
              </label>
              <input
                id="callback-phone"
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder={t('callback_placeholder')}
                aria-describedby="callback-help"
                className="form-field mb-4"
                required
              />
              <p id="callback-help" className="text-cream/90 text-sm leading-relaxed mb-4">
                {t('callback_help')}
              </p>
              <button
                type="submit"
                className="action-primary w-full"
              >
                {t('callback_btn')}
              </button>
            </form>
          </div>

          <div className="bg-charcoal p-6 border-t-4 border-gold">
            <h3 className="text-cream font-black text-lg uppercase tracking-wider mb-4">
              {t('phone_title')}
            </h3>
            <a
              href={`tel:${phoneNumber.replace(/[^+\d]/g, '')}`}
              className="block text-2xl font-black text-gold tracking-wider hover:text-blood-red transition-colors break-words"
            >
              {phoneNumber}
            </a>
          </div>

          <div className="bg-charcoal p-6 border-t-4 border-blood-red">
            <h3 className="text-cream font-black text-lg uppercase tracking-wider mb-4">
              {t('whatsapp_title')}
            </h3>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-blood-red text-cream font-black text-xs tracking-widest uppercase py-3 hover:bg-deep-red transition-colors"
            >
              {t('whatsapp_btn')}
            </a>
          </div>

          <div className="bg-charcoal p-6 border-t-4 border-gold">
            <h3 className="text-cream font-black text-lg uppercase tracking-wider mb-4">
              {t('instagram_title')}
            </h3>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-gold text-jet-black font-black text-xs tracking-widest uppercase py-3 hover:bg-deep-red hover:text-cream transition-colors"
            >
              {t('instagram_btn')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

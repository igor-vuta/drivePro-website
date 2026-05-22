'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function ContactSection() {
  const t = useTranslations('contact');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '77XXXXXXXXX';
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/yourhandle';
  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER || '+7XXXXXXXXXX';

  function handleCallback(e: React.FormEvent) {
    e.preventDefault();
    if (!phone.trim()) return;
    // Open WhatsApp with the provided phone number pre-filled as context
    const message = encodeURIComponent(`Перезвоните мне: ${phone}`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
    setPhone('');
  }

  return (
    <section className="bg-jet-black py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <div className="w-16 h-1 bg-blood-red mb-4" />
          <h2 className="text-4xl md:text-5xl font-black text-cream uppercase tracking-wider">
            <span className="text-blood-red">★</span> {t('title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Callback form */}
          <div className="bg-charcoal p-6 border-t-4 border-blood-red">
            <h3 className="text-cream font-black text-lg uppercase tracking-wider mb-4">
              {t('callback_title')}
            </h3>
            {submitted ? (
              <p className="text-gold font-bold text-sm tracking-wider">{t('callback_success')}</p>
            ) : (
              <form onSubmit={handleCallback}>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder={t('callback_placeholder')}
                  className="w-full bg-jet-black border border-cream/20 text-cream px-4 py-3 mb-4 text-sm focus:outline-none focus:border-blood-red"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blood-red text-cream font-black text-xs tracking-widest uppercase py-3 hover:bg-deep-red transition-colors"
                >
                  {t('callback_btn')}
                </button>
              </form>
            )}
          </div>

          {/* 2. Phone */}
          <div className="bg-charcoal p-6 border-t-4 border-gold">
            <h3 className="text-cream font-black text-lg uppercase tracking-wider mb-4">
              {t('phone_title')}
            </h3>
            <a
              href={`tel:${phoneNumber}`}
              className="block text-2xl font-black text-gold tracking-wider hover:text-blood-red transition-colors"
            >
              {phoneNumber}
            </a>
          </div>

          {/* 3. WhatsApp */}
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

          {/* 4. Instagram */}
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

'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { createQuoteMessage, quoteFields, whatsappDraftHref } from '@/lib/quote.mjs';

type Field = 'job' | 'location' | 'date' | 'volume' | 'access' | 'conditions' | 'removal';
const fields = quoteFields as Field[];
const emptyAnswers: Record<Field, string> = {
  job: '', location: '', date: '', volume: '', access: '', conditions: '', removal: '',
};

export default function QuoteBrief() {
  const t = useTranslations('quote');
  const [answers, setAnswers] = useState<Record<Field, string>>(emptyAnswers);
  const [manualSummary, setManualSummary] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState('');
  const summaryRevisionRef = useRef(0);
  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER || '+7 (777) 207-16-97';
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '77772071697';

  const labels = Object.fromEntries(fields.map(key => [key, t(`summary_labels.${key}`)])) as Record<Field, string>;
  const unknowns = Object.fromEntries(fields.map(key => [key, t(`fields.${key}.unknown`)])) as Record<Field, string>;
  const generated = createQuoteMessage({
    intro: t('message_intro'), outro: t('message_outro'), labels, unknowns, answers,
  });
  const summary = manualSummary ?? generated;

  function invalidateCopyStatus() {
    summaryRevisionRef.current += 1;
    setCopyStatus('');
  }

  async function copySummary() {
    const revision = summaryRevisionRef.current;
    try {
      await navigator.clipboard.writeText(summary);
      if (revision === summaryRevisionRef.current) setCopyStatus(t('copy_success'));
    } catch {
      if (revision === summaryRevisionRef.current) setCopyStatus(t('copy_error'));
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20 lg:px-16" aria-labelledby="brief-title">
      <div className="mb-7 h-1 w-16 bg-blood-red" />
      <h2 id="brief-title" className="text-2xl font-black uppercase tracking-wide text-cream md:text-4xl">{t('brief_title')}</h2>
      <p className="mt-3 max-w-3xl text-base leading-relaxed text-cream/90">{t('optional_note')}</p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {fields.map(key => (
          <div key={key} className="border-l-2 border-gold bg-charcoal p-4">
            <label htmlFor={`brief-${key}`} className="block text-base font-bold text-cream">{t(`fields.${key}.label`)}</label>
            <p id={`brief-${key}-hint`} className="my-2 text-sm leading-relaxed text-cream/90">{t(`fields.${key}.hint`)}</p>
            {key === 'conditions' || key === 'job' ? (
              <textarea
                id={`brief-${key}`}
                aria-describedby={`brief-${key}-hint`}
                rows={2}
                value={answers[key]}
                onChange={event => {
                  setAnswers(current => ({ ...current, [key]: event.target.value }));
                  invalidateCopyStatus();
                }}
                placeholder={t(`fields.${key}.unknown`)}
                className="form-field"
              />
            ) : (
              <input
                id={`brief-${key}`}
                aria-describedby={`brief-${key}-hint`}
                type="text"
                value={answers[key]}
                onChange={event => {
                  setAnswers(current => ({ ...current, [key]: event.target.value }));
                  invalidateCopyStatus();
                }}
                placeholder={t(`fields.${key}.unknown`)}
                className="form-field"
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 border-t-4 border-blood-red bg-charcoal p-5 md:p-8">
        <h3 className="text-xl font-black uppercase tracking-wide text-cream md:text-2xl">{t('summary_heading')}</h3>
        <p className="mt-2 text-sm font-bold text-gold">{t('summary_operator')}</p>
        <p className="mt-2 text-sm text-cream/90">{t('summary_edit_note')}</p>
        <label htmlFor="quote-summary" className="sr-only">{t('summary_heading')}</label>
        <textarea
          id="quote-summary"
          rows={12}
          value={summary}
          onChange={event => {
            setManualSummary(event.target.value);
            invalidateCopyStatus();
          }}
          className="form-field mt-2 min-h-64 leading-relaxed"
        />
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={() => { setManualSummary(null); invalidateCopyStatus(); }} className="action-outline">{t('refresh_summary')}</button>
          <button type="button" onClick={copySummary} className="action-outline">{t('copy_summary')}</button>
        </div>
        <p role="status" aria-live="polite" className="mt-2 min-h-6 text-sm text-gold">{copyStatus}</p>

        <div className="mt-5 flex flex-wrap gap-3">
          <a href={whatsappDraftHref(whatsappNumber, summary)} target="_blank" rel="noopener noreferrer" className="action-primary">{t('whatsapp_action')}</a>
          <a href={`tel:${phoneNumber.replace(/[^+\d]/g, '')}`} className="action-outline">{t('call_action')}</a>
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-cream/90">{t('whatsapp_help')}</p>
        <p className="mt-1 text-sm text-cream/90">{t('call_help')}</p>
      </div>
    </section>
  );
}

'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { createQuoteMessage, quoteFields, whatsappDraftHref } from '@/lib/quote.mjs';

type Field = 'job' | 'location' | 'date' | 'volume' | 'access' | 'conditions' | 'removal';
const fields = quoteFields as Field[];
const basicFields: Field[] = ['job', 'location', 'volume'];
const extraFields: Field[] = ['date', 'access', 'conditions', 'removal'];
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
  const generated = createQuoteMessage({
    intro: t('message_intro'), outro: t('message_outro'), emptyMessage: t('empty_message'), labels, answers,
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

  function renderField(key: Field, compact = false) {
    const props = {
      id: `brief-${key}`,
      name: key,
      autoComplete: 'off',
      'aria-describedby': `brief-${key}-hint`,
      value: answers[key],
      onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAnswers(current => ({ ...current, [key]: event.target.value }));
        invalidateCopyStatus();
      },
      placeholder: compact ? t(`fields.${key}.placeholder`) : t(`fields.${key}.unknown`),
      className: 'form-field mt-2 rounded-md border-cream/25 bg-charcoal focus-visible:border-gold',
    };
    return (
      <div key={key}>
        <label htmlFor={props.id} className="block text-base font-semibold text-cream">{t(`fields.${key}.label`)}</label>
        <p id={`brief-${key}-hint`} className={compact ? 'sr-only' : 'mt-1 text-sm leading-relaxed text-cream/90'}>{t(`fields.${key}.hint`)}</p>
        {key === 'job' || key === 'conditions' ? <textarea {...props} rows={2} /> : <input {...props} type="text" />}
      </div>
    );
  }

  return (
    <section id="quote-brief" className="mx-auto max-w-[752px] scroll-mt-4 px-4 pb-12" aria-labelledby="brief-title">
      <h2 id="brief-title" className="sr-only">{t('brief_title')}</h2>
      <div data-quote-basic className="grid gap-4">
        {basicFields.map(key => renderField(key, true))}
      </div>

      <details data-quote-extra className="mt-5 border-b border-cream/20">
        <summary className="min-h-12 cursor-pointer py-3 text-base font-semibold text-gold hover:text-cream">{t('extra_details')}</summary>
        <div className="grid gap-4 pb-5">{extraFields.map(key => renderField(key))}</div>
      </details>

      <details data-quote-editor className="border-b border-cream/20">
        <summary className="min-h-12 cursor-pointer py-3 text-base font-semibold text-gold hover:text-cream">{t('summary_heading')}</summary>
        <p className="mt-2 text-sm leading-relaxed text-cream/90">{t('summary_edit_note')}</p>
        <label htmlFor="quote-summary" className="sr-only">{t('summary_heading')}</label>
        <textarea
          id="quote-summary"
          name="message"
          autoComplete="off"
          rows={12}
          value={summary}
          onChange={event => {
            setManualSummary(event.target.value);
            invalidateCopyStatus();
          }}
          className="form-field mt-2 min-h-64 leading-relaxed"
        />
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={() => { setManualSummary(null); invalidateCopyStatus(); }} className="action-outline font-semibold">{t('refresh_summary')}</button>
          <button type="button" onClick={copySummary} className="action-outline font-semibold">{t('copy_summary')}</button>
        </div>
        <p role="status" aria-live="polite" className="my-2 min-h-6 text-sm text-gold">{copyStatus}</p>
      </details>

      <p className="mt-4 text-sm leading-relaxed text-cream/90">{t('optional_note')}</p>
      <div data-quote-actions className="mt-5">
        <div className="grid grid-cols-2 gap-3">
          <a href={whatsappDraftHref(whatsappNumber, summary)} target="_blank" rel="noopener noreferrer" className="action-primary rounded-md px-3 font-semibold">{t('whatsapp_action')}</a>
          <a href={`tel:${phoneNumber.replace(/[^+\d]/g, '')}`} className="action-outline rounded-md border-cream/80 px-3 font-semibold">{t('call_action')}</a>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-cream/90">{t('whatsapp_help')}</p>
      </div>
    </section>
  );
}

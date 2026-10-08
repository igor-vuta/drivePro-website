'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteBasePath } from '@/lib/site';
import { whatsappDraftHref } from '@/lib/quote.mjs';
import { createEquipmentMessage, equipmentChoices, resolveEquipmentMessage } from '@/lib/website-journeys.mjs';
import styles from './EquipmentExperience.module.css';

type EquipmentId = (typeof equipmentChoices)[number]['id'];
type AnswerKey = 'work' | 'timing' | 'access';
type Answers = Record<AnswerKey, string>;

const machines = [
  { id: 'mini-excavator', art: 'mini', detail: 'Примерно 1–2 т' },
  { id: 'loader', art: 'loader', detail: '' },
  { id: 'breaker', art: 'breaker', detail: '' },
  { id: 'tractor', art: 'tractor', detail: '' },
] as const;

const initialAnswers: Answers = { work: '', timing: '', access: '' };

export default function EquipmentExperience({ phoneNumber, whatsappNumber, faqTitle, faq }: { phoneNumber: string; whatsappNumber: string; faqTitle: string; faq: { key: string; question: string; answer: string }[] }) {
  const enhanced = useSyncExternalStore(() => () => {}, () => true, () => false);
  const [selected, setSelected] = useState<EquipmentId>('advice');
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [manualMessage, setManualMessage] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState('');
  const [failedArt, setFailedArt] = useState<string[]>([]);
  const sceneRef = useRef<HTMLDivElement>(null);
  const phoneHref = `tel:${phoneNumber.replace(/[^+\d]/g, '')}`;
  const adviceMessage = createEquipmentMessage({ equipment: 'advice' });
  const currentMessage = resolveEquipmentMessage({ equipment: selected, answers, manualMessage });
  const selectedLabel = equipmentChoices.find(item => item.id === selected)?.label;
  const currentHref = whatsappDraftHref(whatsappNumber, currentMessage);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || failedArt.length) return;
    let frame = 0;
    const update = () => {
      const rect = scene.getBoundingClientRect();
      const range = Math.max(window.innerHeight * 0.78, 1);
      const progress = Math.max(0, Math.min(1, (window.innerHeight * 0.8 - rect.top) / range));
      scene.style.setProperty('--reveal', String(progress));
      frame = 0;
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) window.cancelAnimationFrame(frame);
      scene.style.removeProperty('--reveal');
    };
  }, [failedArt.length]);

  const updateAnswer = (key: AnswerKey, value: string) => {
    setAnswers(previous => ({ ...previous, [key]: value }));
    setCopyStatus('');
  };

  const choose = (id: EquipmentId, target?: HTMLElement) => {
    setSelected(id);
    setCopyStatus('');
    if (target && window.innerWidth <= 700) {
      const bottom = target.getBoundingClientRect().bottom;
      if (bottom > window.innerHeight - 100) window.scrollBy(0, bottom - window.innerHeight + 100);
    }
  };

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(currentMessage);
      setCopyStatus('Текст скопирован.');
    } catch {
      setCopyStatus('Не удалось скопировать. Выделите текст сообщения и скопируйте вручную.');
    }
  };

  const art = (kind: string, label: string, className: string, eager = false) => failedArt.includes(kind)
    ? <span className={`${styles.artFallback} ${className}`} role="img" aria-label={`Иллюстрация недоступна: ${label}`}>{label}</span>
    : <Image className={className} src={`${siteBasePath}/equipment-sample/equipment-${kind}.png`} width={606} height={606} alt={`Иллюстрация: ${label}`} loading={eager ? 'eager' : 'lazy'} onError={() => setFailedArt(previous => previous.includes(kind) ? previous : [...previous, kind])} />;

  return (
    <main className={styles.page} id="main" data-enhanced={enhanced ? 'true' : 'false'}>
      <a className={styles.skip} href="#equipment-machines">К технике</a>
      <header className={styles.topbar}>
        <Link className={styles.brand} href="/ru" prefetch={false}>Drive <span>Pro</span></Link>
        <nav aria-label="Навигация по странице" className={styles.nav}>
          <a href="#equipment-machines">Техника</a>
          <Link href="/ru/contact" prefetch={false}>Контакты</Link>
        </nav>
        <nav aria-label="Язык" className={styles.languages}>
          <Link href="/excavators" hrefLang="ru" lang="ru" aria-current="page" prefetch={false}>RU</Link>
          <Link href="/kz/excavators" hrefLang="kk" lang="kk" prefetch={false}>ҚАЗ</Link>
          <Link href="/en/excavators" hrefLang="en" lang="en" prefetch={false}>EN</Link>
        </nav>
        <a className={styles.headerCall} href={phoneHref} aria-label={`Позвонить: ${phoneNumber}`}>Позвонить</a>
      </header>

      <section className={styles.hero} aria-labelledby="equipment-title">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Алматы · техника для работ</p>
            <h1 id="equipment-title">Спецтехника и земляные работы в Алматы</h1>
            <p className={styles.lead}>Экскаватор — с нашим оператором. Стоимость работы рассчитываем индивидуально.</p>
            <div className={styles.heroActions}>
              <a className={styles.heroContact} data-active={enhanced && selected !== 'advice' ? 'true' : 'false'} href={enhanced ? currentHref : whatsappDraftHref(whatsappNumber, adviceMessage)} target="_blank" rel="noopener noreferrer">{enhanced && selected !== 'advice' ? 'Написать по выбранной технике ↗' : 'Написать в WhatsApp ↗'}</a>
              <a className={styles.heroJump} href="#equipment-machines">Выбрать технику ↓</a>
            </div>
          </div>
          <figure className={styles.heroStage}>
            {art('mini', 'мини-экскаватор', styles.heroImage, true)}
            <figcaption>Иллюстрация техники</figcaption>
          </figure>
        </div>
      </section>

      <section className={styles.machineSection} id="equipment-machines" aria-labelledby="machines-title">
        <div className={styles.wrap}>
          <div className={styles.sectionHeading}>
            <p className={styles.blueEyebrow}>Техника</p>
            <h2 id="machines-title">Выберите машину</h2>
          </div>
          <div className={styles.machineLayout}>
            <div ref={sceneRef} className={styles.machineScene} data-motion={!failedArt.length ? 'on' : 'off'}>
              <span className={styles.sceneMark} aria-hidden="true">DP</span>
              {machines.map(machine => {
                const choice = equipmentChoices.find(item => item.id === machine.id)!;
                const content = <>
                  <span className={styles.machineArt}>{art(machine.art, choice.label, styles.machineImage)}</span>
                  <span className={styles.machineText}>
                    <span className={styles.machineName}>{choice.label}</span>
                    {machine.detail && <span className={styles.machineDetail}>{machine.detail}</span>}
                    <span className={styles.machinePrompt}>{enhanced ? selected === machine.id ? 'Выбрано ✓' : 'Выбрать →' : 'Написать в WhatsApp ↗'}</span>
                  </span>
                </>;
                return <article className={styles.machine} data-selected={enhanced && selected === machine.id ? 'true' : 'false'} key={machine.id}>
                  {enhanced
                    ? <button className={styles.machineChoice} type="button" aria-pressed={selected === machine.id} onClick={event => choose(machine.id, event.currentTarget)}>{content}</button>
                    : <a className={styles.machineChoice} href={whatsappDraftHref(whatsappNumber, createEquipmentMessage({ equipment: machine.id }))} target="_blank" rel="noopener noreferrer">{content}</a>}
                </article>;
              })}
            </div>
            <aside className={styles.contactPanel} data-active={enhanced && selected !== 'advice' ? 'true' : 'false'} aria-label="Связаться по выбранной технике">
              <p className={styles.panelEyebrow}>Связаться</p>
              <p className={styles.panelChoice} key={enhanced ? selected : 'static'}>{enhanced ? selectedLabel : 'Помощь с выбором'}</p>
              <a className={styles.yellowButton} href={enhanced ? currentHref : whatsappDraftHref(whatsappNumber, adviceMessage)} target="_blank" rel="noopener noreferrer">Спросить в WhatsApp ↗</a>
              <a className={styles.quietCall} href={phoneHref}>Позвонить</a>
              <p className={styles.contactNote}>Видео участка можно приложить в чате WhatsApp.</p>
            </aside>
          </div>
          {enhanced && <button className={styles.adviceChoice} type="button" aria-pressed={selected === 'advice'} onClick={() => choose('advice')}>Помогите выбрать технику →</button>}
        </div>
      </section>

      <section className={styles.briefSection} id="equipment-brief" aria-label="Дополнительные детали заявки">
        <div className={styles.wrap}>
          {enhanced && <div className={styles.disclosures}>
            <details className={styles.disclosure}>
              <summary>Добавить детали работы, если знаете</summary>
              <div className={styles.fields}>
                <label htmlFor="equipment-work">Работа и примерный объём</label>
                <textarea id="equipment-work" value={answers.work} onChange={event => updateAnswer('work', event.target.value)} rows={3} placeholder="Например: траншея, примерно 20 м³" />
                <label htmlFor="equipment-timing">Когда начать или к какому сроку</label>
                <textarea id="equipment-timing" value={answers.timing} onChange={event => updateAnswer('timing', event.target.value)} rows={2} placeholder="Например: на следующей неделе" />
                <details className={styles.nestedDisclosure}>
                  <summary>Доступ и другие условия</summary>
                  <label htmlFor="equipment-access">Что нужно учесть?</label>
                  <textarea id="equipment-access" value={answers.access} onChange={event => updateAnswer('access', event.target.value)} rows={2} />
                </details>
              </div>
            </details>
            <details className={styles.disclosure}>
              <summary>Изменить текст сообщения</summary>
              <div className={styles.editor}>
                <label htmlFor="equipment-draft">Текст для WhatsApp</label>
                <textarea id="equipment-draft" value={currentMessage} onChange={event => { setManualMessage(event.target.value); setCopyStatus(''); }} rows={7} />
                <div className={styles.draftTools}>
                  <button type="button" onClick={() => { setManualMessage(null); setCopyStatus(''); }}>Сбросить правки</button>
                  <button type="button" onClick={copyMessage}>Скопировать текст</button>
                </div>
                <p className={styles.copyStatus} role="status">{copyStatus}</p>
              </div>
            </details>
          </div>}
          <p className={styles.briefNote}>Сообщение откроется в WhatsApp. Отправить его можно там.</p>
        </div>
      </section>

      <section className={styles.faq} aria-labelledby="services-faq-title">
        <div className={styles.wrap}>
          <details className={styles.helpDisclosure}>
            <summary><h2 id="services-faq-title">{faqTitle}</h2></summary>
            <dl>{faq.map(item => <div key={item.key}><dt>{item.question}</dt><dd>{item.answer}</dd></div>)}</dl>
          </details>
        </div>
      </section>

      <footer className={styles.footer}>
        <nav aria-label="Разделы сайта">
          <Link href="/ru" prefetch={false}>Главная</Link>
          <Link href="/excavators" prefetch={false}>Техника</Link>
          <Link href="/ru/pricing" prefetch={false}>Запросить расчёт</Link>
          <Link href="/mopeds" prefetch={false}>Мопеды</Link>
          <Link href="/ru/contact" prefetch={false}>Контакты</Link>
        </nav>
        <div className={styles.footerContact}>
          <a href={phoneHref}>{phoneNumber}</a>
          <a href={enhanced ? currentHref : whatsappDraftHref(whatsappNumber, adviceMessage)} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/drivepro.moped.almaty'} target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
        <small>© 2026 Drive Pro</small>
      </footer>
    </main>
  );
}

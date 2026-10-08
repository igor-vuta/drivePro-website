'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import photos from '@/data/moped-photos.json';
import highlights from '@/data/highlights.json';
import russian from '@/messages/ru.json';
import { siteBasePath } from '@/lib/site';
import { whatsappDraftHref } from '@/lib/quote.mjs';
import { createMopedModelMessage, createMopedSourceMessage, mopedGroups } from '@/lib/website-journeys.mjs';
import styles from './MopedExperience.module.css';

type Selection = { kind: 'none' } | { kind: 'highlight'; id: string } | { kind: 'model'; brand: string; model: string } | { kind: 'source'; index: number };
type ExperienceState = { selection: Selection; manual: string | null; manualFor: Selection | null; viewer: number | null };
type Brand = 'Все' | 'Honda' | 'Yamaha' | 'Suzuki';
const brands: Brand[] = ['Все', 'Honda', 'Yamaha', 'Suzuki'];
const generalMessage = 'Здравствуйте! Интересует покупка мопеда в Алматы. Подскажите доступные варианты.';
const initial: ExperienceState = { selection: { kind: 'none' }, manual: null, manualFor: null, viewer: null };
const highlightMessage = (item: (typeof highlights.items)[number]) => `Здравствуйте! Интересует ${item.title} из вашего Highlight: ${item.url}\nПодскажите наличие и условия покупки.`;
const generatedMessage = (selection: Selection) => {
  if (selection.kind === 'model') return createMopedModelMessage(selection.brand, selection.model);
  if (selection.kind === 'source') return createMopedSourceMessage(photos[selection.index].permalink);
  if (selection.kind === 'highlight') {
    const item = highlights.items.find(entry => entry.id === selection.id);
    return item ? highlightMessage(item) : generalMessage;
  }
  return generalMessage;
};
const sameSelection = (a: Selection, b: Selection) => a.kind === b.kind && (a.kind === 'none' ||
  (a.kind === 'highlight' && b.kind === 'highlight' && a.id === b.id) ||
  (a.kind === 'model' && b.kind === 'model' && a.brand === b.brand && a.model === b.model) ||
  (a.kind === 'source' && b.kind === 'source' && a.index === b.index));
const highlightBrand = (title: string): Brand | null => title.startsWith('Honda ') ? 'Honda' : title.startsWith('Yamaha ') ? 'Yamaha' : title.startsWith('Suzuki ') ? 'Suzuki' : null;
const contextName = (selection: Selection | null) => {
  if (selection?.kind === 'highlight') return highlights.items.find(item => item.id === selection.id)?.title;
  if (selection?.kind === 'model') return `${selection.brand} ${selection.model}`;
  if (selection?.kind === 'source') return 'другой публикации';
  return 'общего вопроса';
};
function alignPublicationText(manual: string | null, previous: Selection, nextIndex: number) {
  if (manual === null) return null;
  const selectedUrl = previous.kind === 'source' ? photos[previous.index].permalink : null;
  const matches = photos.filter(photo => manual.includes(photo.permalink));
  const previousUrl = selectedUrl && manual.includes(selectedUrl) ? selectedUrl : matches.length === 1 ? matches[0].permalink : null;
  return previousUrl ? manual.replaceAll(previousUrl, photos[nextIndex].permalink) : manual;
}

export default function MopedExperience({ phoneNumber, whatsappNumber }: { phoneNumber: string; whatsappNumber: string }) {
  const enhanced = useSyncExternalStore(() => () => {}, () => true, () => false);
  const [state, setState] = useState<ExperienceState>(initial);
  const [brand, setBrand] = useState<Brand>('Все');
  const [failed, setFailed] = useState<string[]>([]);
  const [closing, setClosing] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const detailRef = useRef<HTMLElement>(null);
  const highlightGridRef = useRef<HTMLDivElement>(null);
  const brandMotionReadyRef = useRef(false);
  const swipeRef = useRef<number | null>(null);
  const phoneHref = `tel:${phoneNumber.replace(/[^+\d]/g, '')}`;
  const draft = state.manual === null ? generatedMessage(state.selection) : state.manual;
  const highlightId = state.selection.kind === 'highlight' ? state.selection.id : null;
  const selectedHighlight = highlightId ? highlights.items.find(item => item.id === highlightId) : null;
  const selectedPhoto = state.selection.kind === 'source' ? photos[state.selection.index] : null;
  const currentPhoto = state.viewer === null ? null : photos[state.viewer];
  const viewerOpen = state.viewer !== null;
  const sourceUrl = selectedHighlight?.url ?? selectedPhoto?.permalink ?? null;
  const originalContext = contextName(state.manualFor);
  const changedContext = state.manual !== null && state.manualFor !== null && !sameSelection(state.manualFor, state.selection);
  const sourceMisaligned = state.manual !== null && sourceUrl !== null &&
    (!state.manual.includes(sourceUrl) || [...photos.map(photo => photo.permalink), ...highlights.items.map(item => item.url)].some(url => url !== sourceUrl && state.manual!.includes(url)));
  const draftStatus = changedContext ? `Ваш текст сохранён для ${originalContext ?? 'предыдущего выбора'}. Сбросьте правки, чтобы составить сообщение о текущем выборе.`
    : sourceMisaligned ? 'Ваш текст сохранён, но ссылка на выбранный источник отсутствует или в тексте есть другая ссылка. Сбросьте правки для нового сообщения.'
      : state.manual !== null ? 'Ваш текст сохранён вручную.' : '';
  const selectedName = selectedHighlight?.title ?? (state.selection.kind === 'model' ? `${state.selection.brand} ${state.selection.model}` : selectedPhoto ? 'Фото из публикации' : null);
  const filteredHighlights = brand === 'Все' ? highlights.items : highlights.items.filter(item => highlightBrand(item.title) === brand);
  const selectionKey = state.selection.kind === 'highlight' ? `highlight-${state.selection.id}` : state.selection.kind === 'model' ? `model-${state.selection.brand}-${state.selection.model}` : state.selection.kind === 'source' ? `source-${state.selection.index}` : 'none';

  useEffect(() => () => { if (closeTimerRef.current !== null) clearTimeout(closeTimerRef.current); }, []);

  useEffect(() => {
    if (!enhanced) return;
    if (!brandMotionReadyRef.current) { brandMotionReadyRef.current = true; return; }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const animation = highlightGridRef.current?.animate([
      { opacity: 0.76, transform: 'translateY(8px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ], { duration: 230, easing: 'ease-out' });
    return () => animation?.cancel();
  }, [brand, enhanced]);

  useEffect(() => {
    if (!viewerOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (!dialog.open) dialog.showModal();
    closeRef.current?.focus();
    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus({ preventScroll: true });
    };
  }, [viewerOpen]);

  function select(selection: Selection) {
    setState(previous => ({ ...previous, selection }));
    const narrow = window.matchMedia('(max-width: 760px)').matches;
    if (selection.kind === 'model' || narrow) requestAnimationFrame(() => {
      const target = selection.kind === 'model' && !narrow ? document.getElementById('moped-models') : detailRef.current;
      target?.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    });
  }
  function changeBrand(option: Brand) {
    setBrand(option);
  }
  function cancelClose() {
    if (closeTimerRef.current !== null) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
    setClosing(false);
  }
  function selectPhoto(index: number, trigger: HTMLButtonElement) {
    cancelClose();
    triggerRef.current = trigger;
    setState(previous => {
      const manual = alignPublicationText(previous.manual, previous.selection, index);
      const manualFor = previous.manualFor?.kind === 'source' && manual !== previous.manual ? { kind: 'source', index } as Selection : previous.manualFor;
      return { ...previous, selection: { kind: 'source', index }, manual, manualFor, viewer: index };
    });
  }
  function moveTo(index: number) {
    cancelClose();
    const bounded = (index + photos.length) % photos.length;
    setState(previous => {
      const manual = alignPublicationText(previous.manual, previous.selection, bounded);
      const manualFor = previous.manualFor?.kind === 'source' && manual !== previous.manual ? { kind: 'source', index: bounded } as Selection : previous.manualFor;
      return { ...previous, selection: { kind: 'source', index: bounded }, manual, manualFor, viewer: bounded };
    });
  }
  function moveBy(delta: number) {
    cancelClose();
    setState(previous => {
      const bounded = ((previous.viewer ?? 0) + delta + photos.length) % photos.length;
      const manual = alignPublicationText(previous.manual, previous.selection, bounded);
      const manualFor = previous.manualFor?.kind === 'source' && manual !== previous.manual ? { kind: 'source', index: bounded } as Selection : previous.manualFor;
      return { ...previous, selection: { kind: 'source', index: bounded }, manual, manualFor, viewer: bounded };
    });
  }
  function closeViewer() {
    if (closeTimerRef.current !== null) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setState(previous => ({ ...previous, viewer: null }));
      return;
    }
    setClosing(true);
    closeTimerRef.current = setTimeout(() => {
      closeTimerRef.current = null;
      setState(previous => ({ ...previous, viewer: null }));
      setClosing(false);
    }, 170);
  }
  function mediaFailed(id: string) { setFailed(previous => previous.includes(id) ? previous : [...previous, id]); }
  function editor(id: string) {
    return <details className={styles.editorDetails}>
      <summary>Изменить сообщение</summary>
      <label htmlFor={id}>Текст для WhatsApp</label>
      <textarea id={id} value={draft} onChange={event => setState(previous => ({ ...previous, manual: event.target.value, manualFor: previous.manualFor ?? previous.selection }))} rows={4} />
      <button type="button" onClick={() => setState(previous => ({ ...previous, manual: null, manualFor: null }))}>Сбросить правки</button>
    </details>;
  }

  const detail = <aside ref={detailRef} className={styles.detail} aria-label="Выбор и сообщение" id="moped-enquiry">
    <div key={selectionKey} className={styles.detailTop}><span className={styles.detailOverline}>{selectedHighlight ? 'Выбрана подборка' : selectedPhoto ? 'Выбрана публикация' : state.selection.kind === 'model' ? 'Выбрана модель' : 'Спросить о мопеде'}</span><h3>{enhanced && selectedName ? selectedName : 'Поможем с выбором'}</h3></div>
    {selectedHighlight && <div key={selectedHighlight.id} className={styles.selectedMedia}>{failed.includes(selectedHighlight.id) ? <span>Обложка недоступна</span> : <Image src={selectedHighlight.cover} width={150} height={150} alt={`Обложка ${selectedHighlight.title}`} onError={() => mediaFailed(selectedHighlight.id)} />}<p>Название и ссылка — из сохранённого Highlight. Наличие уточняйте.</p></div>}
    {state.selection.kind === 'model' && <p className={styles.detailNote}>Эта модель указана в каталоге. Фото для неё здесь не подтверждено.</p>}
    {selectedPhoto && <p className={styles.detailNote}>Модель на фото не установлена.</p>}
    {sourceUrl && <a className={styles.sourceLink} href={sourceUrl} target="_blank" rel="noopener noreferrer">Открыть источник в Instagram ↗</a>}
    {draftStatus && <p className={styles.draftStatus} role="status">{draftStatus}</p>}
    <a className={styles.yellowButton} href={whatsappDraftHref(whatsappNumber, draft)} target="_blank" rel="noopener noreferrer">{selectedName ? `Спросить о ${selectedName} ↗` : 'Написать в WhatsApp ↗'}</a>
    <a className={styles.quietCall} href={phoneHref}>Позвонить: {phoneNumber}</a>
    {enhanced && state.viewer === null && editor('moped-draft')}
  </aside>;

  return <main className={styles.page} id="main" data-enhanced={enhanced}>
    <a className={styles.skip} href="#moped-highlights">К мопедам</a>
    <header className={styles.topbar}>
      <Link className={styles.brand} href="/ru" prefetch={false}>Drive <span>Pro</span></Link>
      <nav className={styles.nav} aria-label="Навигация по странице"><a href="#moped-highlights">Мопеды</a><a href="#moped-models">Модели</a><a href="#moped-photos">Фото</a></nav>
      <nav className={styles.languages} aria-label="Язык"><Link href="/mopeds" hrefLang="ru" lang="ru" aria-current="page" prefetch={false}>RU</Link><Link href="/kz/mopeds" hrefLang="kk" lang="kk" prefetch={false}>ҚАЗ</Link><Link href="/en/mopeds" hrefLang="en" lang="en" prefetch={false}>EN</Link></nav>
    </header>
    <section className={styles.intro} aria-labelledby="mopeds-title"><div className={styles.wrap}>
      <div><p className={styles.eyebrow}>Drive Pro · Алматы</p><h1 id="mopeds-title">Мопеды в продаже</h1><p>Смотрите подборки и спросите о покупке. Наличие уточняйте в сообщении.</p></div>
    </div></section>
    <section className={styles.showcase} id="moped-highlights" aria-labelledby="highlights-title"><div className={styles.wrap}>
      <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Подборки Instagram</p><h2 id="highlights-title">Выберите мопед</h2></div><p>Сохранённые подборки с названиями и обложками.</p></div>
      <div className={styles.filters} role="group" aria-label="Марка в подборках">{brands.map(option => <button key={option} type="button" aria-pressed={brand === option} onClick={() => changeBrand(option)}>{option}</button>)}</div>
      <div className={state.selection.kind === 'model' ? styles.browseLayoutModelSelected : styles.browseLayout}>
        <div className={styles.highlightGrid} ref={highlightGridRef}>{filteredHighlights.map(item => <div className={styles.highlightCard} key={item.id} data-selected={state.selection.kind === 'highlight' && state.selection.id === item.id}>
          {enhanced ? <button type="button" aria-pressed={state.selection.kind === 'highlight' && state.selection.id === item.id} onClick={() => select({ kind: 'highlight', id: item.id })} aria-label={`Выбрать ${item.title}`}>
            <span className={styles.cover}>{failed.includes(item.id) ? <span className={styles.missingCover}>Обложка недоступна</span> : <Image src={item.cover} width={150} height={150} alt="" loading="eager" onError={() => mediaFailed(item.id)} />}</span><span className={styles.highlightTitle}>{item.title}</span><span className={styles.selectMark} aria-hidden="true">↗</span>
          </button> : <a href={whatsappDraftHref(whatsappNumber, highlightMessage(item))} target="_blank" rel="noopener noreferrer"><span className={styles.cover}>{failed.includes(item.id) ? <span className={styles.missingCover}>Обложка недоступна</span> : <Image src={item.cover} width={150} height={150} alt="" loading="eager" onError={() => mediaFailed(item.id)} />}</span><span className={styles.highlightTitle}>{item.title}</span><span className={styles.selectMark} aria-hidden="true">↗</span></a>}
        </div>)}</div>
        {state.selection.kind !== 'model' && detail}
      </div>
      {!enhanced && <details className={styles.sourceIndex} id="instagram-gallery-title"><summary>{russian.gallery.saved}</summary><div>{highlights.items.map(item => <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer">{item.title} ↗</a>)}</div></details>}
    </div></section>
    <section className={styles.models} id="moped-models" aria-labelledby="models-title"><div className={styles.wrap}>
      <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Другие названия для запроса</p><h2 id="models-title">Модели по маркам</h2></div><p>Спросите о конкретной модели, даже если для неё нет подборки.</p></div>
      <div className={state.selection.kind === 'model' ? styles.modelLayoutSelected : styles.modelLayout}><div className={styles.modelGrid}>{mopedGroups.map(group => <div className={styles.modelGroup} key={group.brand}><h3>{group.brand}</h3><div className={styles.modelList}>{group.models.map(model => <div className={styles.modelRow} key={model}>{enhanced ? <button type="button" aria-pressed={state.selection.kind === 'model' && state.selection.brand === group.brand && state.selection.model === model} onClick={() => select({ kind: 'model', brand: group.brand, model })}>{model}<span aria-hidden="true">↗</span></button> : <a href={whatsappDraftHref(whatsappNumber, createMopedModelMessage(group.brand, model))} target="_blank" rel="noopener noreferrer">{model}<span aria-hidden="true">↗</span></a>}</div>)}</div></div>)}</div>{state.selection.kind === 'model' && detail}</div>
    </div></section>
    <section className={styles.photos} id="moped-photos" aria-labelledby="photos-title"><div className={styles.wrap}>
      <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Ещё посмотреть</p><h2 id="photos-title">Публикации Instagram</h2></div><p>{russian.photos.note} Названия моделей для этих фото не подтверждены.</p></div>
      <div className={styles.photoRail}>{photos.map((photo, index) => <div className={styles.photoCard} key={photo.id}>{enhanced ? <button data-photo-id={photo.id} type="button" onClick={event => selectPhoto(index, event.currentTarget)} aria-label={`Смотреть публикацию ${index + 1}`}>
        {failed.includes(photo.id) ? <span className={styles.failed}>Превью недоступно</span> : <Image src={`${siteBasePath}${photo.image}`} width={photo.width} height={photo.height} alt={russian.photos[`image_${photo.id}` as keyof typeof russian.photos]} loading={index === 0 ? 'eager' : 'lazy'} onError={() => mediaFailed(photo.id)} />}<span>Публикация {String(index + 1).padStart(2, '0')} ↗</span>
      </button> : <a data-photo-id={photo.id} href={photo.permalink} target="_blank" rel="noopener noreferrer" aria-label={`Открыть публикацию ${index + 1}`}>{failed.includes(photo.id) ? <span className={styles.failed}>Превью недоступно</span> : <Image src={`${siteBasePath}${photo.image}`} width={photo.width} height={photo.height} alt={russian.photos[`image_${photo.id}` as keyof typeof russian.photos]} loading={index === 0 ? 'eager' : 'lazy'} onError={() => mediaFailed(photo.id)} />}<span>Публикация {String(index + 1).padStart(2, '0')} ↗</span></a>}
      </div>)}</div>
    </div></section>
    <footer className={styles.footer}><div className={styles.wrap}><strong>Drive <span>Pro</span></strong><nav aria-label="Ссылки сайта"><Link href="/ru" prefetch={false}>Главная</Link><Link href="/excavators" prefetch={false}>Земляные работы</Link><Link href="/ru/pricing" prefetch={false}>Запросить расчёт</Link><Link href="/ru/contact" prefetch={false}>Контакты</Link></nav><a href="https://www.instagram.com/drivepro.moped.almaty/" target="_blank" rel="noopener noreferrer">Instagram ↗</a></div></footer>
    {enhanced && <dialog ref={dialogRef} className={styles.dialog} data-closing={closing} aria-labelledby="moped-viewer-title" onCancel={event => { event.preventDefault(); closeViewer(); }} onKeyDown={event => {
      if (event.target instanceof HTMLTextAreaElement && ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      if (event.key === 'ArrowLeft') { event.preventDefault(); moveBy(-1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); moveBy(1); }
      if (event.key === 'Home') { event.preventDefault(); moveTo(0); }
      if (event.key === 'End') { event.preventDefault(); moveTo(photos.length - 1); }
      if (event.key === 'Tab') { const nodes = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button, a[href], textarea, summary') ?? []).filter(node => !node.hasAttribute('disabled')); if (nodes.length) { const first = nodes[0], last = nodes[nodes.length - 1]; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); } } }
    }}>
      {currentPhoto && <div className={styles.viewer}><div className={styles.viewerTop}><h2 id="moped-viewer-title">Публикация {state.viewer! + 1} из {photos.length}</h2><button ref={closeRef} type="button" onClick={closeViewer}>Закрыть ×</button></div>
        <div className={styles.viewerMedia} key={currentPhoto.id} onTouchStart={event => { swipeRef.current = event.touches.length === 1 ? event.touches[0].clientX : null; }} onTouchEnd={event => { if (swipeRef.current !== null && event.changedTouches.length === 1) { const delta = event.changedTouches[0].clientX - swipeRef.current; if (Math.abs(delta) > 50) moveBy(delta < 0 ? 1 : -1); } swipeRef.current = null; }}>
          {failed.includes(currentPhoto.id) ? <p className={styles.failed}>Превью недоступно. <a href={currentPhoto.permalink} target="_blank" rel="noopener noreferrer">Открыть источник ↗</a></p> : <Image src={`${siteBasePath}${currentPhoto.image}`} width={currentPhoto.width} height={currentPhoto.height} alt={`Превью публикации ${state.viewer! + 1}; модель не подтверждена`} loading="eager" onError={() => mediaFailed(currentPhoto.id)} />}
        </div><div className={styles.viewerControls}><button type="button" onClick={() => moveBy(-1)}>← Назад</button><span role="status">{state.viewer! + 1} / {photos.length}</span><button type="button" onClick={() => moveBy(1)}>Далее →</button></div>
        <div className={styles.viewerDraft}><p>Модель на фото не установлена.</p><a className={styles.sourceLink} href={currentPhoto.permalink} target="_blank" rel="noopener noreferrer">Исходная публикация ↗</a>{draftStatus && <p className={styles.draftStatus} role="status">{draftStatus}</p>}<a className={styles.yellowButton} href={whatsappDraftHref(whatsappNumber, draft)} target="_blank" rel="noopener noreferrer">Спросить об этом фото ↗</a>{editor('moped-viewer-draft')}</div>
      </div>}
    </dialog>}
  </main>;
}

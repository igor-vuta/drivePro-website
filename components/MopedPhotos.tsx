'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import photos from '@/data/moped-photos.json';
import { siteBasePath } from '@/lib/site';
import { whatsappDraftHref } from '@/lib/quote.mjs';
import styles from './MopedPhotos.module.css';

export default function MopedPhotos() {
  const t = useTranslations('photos');
  const [selected, setSelected] = useState<number | null>(null);
  const [failedIds, setFailedIds] = useState<string[]>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLAnchorElement | null>(null);
  const touchRef = useRef<number | null>(null);
  const open = selected !== null;
  const item = selected === null ? null : photos[selected];

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    closeRef.current?.focus();
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      triggerRef.current?.focus({ preventScroll: true });
    };
  }, [open]);

  function move(delta: number) {
    setSelected(current => current === null ? null : (current + delta + photos.length) % photos.length);
  }

  function mediaFailed(id: string) {
    setFailedIds(current => current.includes(id) ? current : [...current, id]);
  }

  return <section id="moped-photos" className={styles.section} aria-labelledby="moped-photos-title">
    <header className={styles.header}>
      <h3 id="moped-photos-title">{t('title')}</h3>
      <p>{t('note')}</p>
    </header>
    <div className={styles.grid}>
      {photos.map((photo, index) => <a key={photo.id} href={photo.permalink} target="_blank" rel="noopener noreferrer" data-photo-id={photo.id} className={styles.card}
        aria-label={t('view_number', { number: index + 1 })}
        onClick={event => {
          if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0 || !dialogRef.current?.showModal) return;
          event.preventDefault();
          triggerRef.current = event.currentTarget;
          setSelected(index);
        }}>
        {failedIds.includes(photo.id) ? <span className={styles.failed}>{t('failed')}<br />{t('original')}</span> : <Image src={`${siteBasePath}${photo.image}`} width={photo.width} height={photo.height} alt={t(`image_${photo.id}`)} loading={index < 3 ? 'eager' : 'lazy'} onError={() => mediaFailed(photo.id)} />}
        <span className={styles.caption}>{t('view')} <span aria-hidden="true">↗</span></span>
      </a>)}
    </div>
    <dialog ref={dialogRef} className={styles.dialog} aria-labelledby="photo-viewer-title" onCancel={() => setSelected(null)} onClose={() => setSelected(null)}
      onKeyDown={event => {
        if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
        if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
        if (event.key === 'Home') { event.preventDefault(); setSelected(0); }
        if (event.key === 'End') { event.preventDefault(); setSelected(photos.length - 1); }
      }}>
      {item && <div className={styles.viewer}>
        <header className={styles.viewerHeader}>
          <h3 id="photo-viewer-title">{t('title')}</h3>
          <button ref={closeRef} type="button" onClick={() => setSelected(null)}>{t('close')} <span aria-hidden="true">×</span></button>
        </header>
        <div className={styles.media} onTouchStart={event => { touchRef.current = event.touches.length === 1 ? event.touches[0].clientX : null; }}
          onTouchEnd={event => {
            if (touchRef.current !== null && event.changedTouches.length === 1) {
              const delta = event.changedTouches[0].clientX - touchRef.current;
              if (Math.abs(delta) > 50) move(delta < 0 ? 1 : -1);
            }
            touchRef.current = null;
          }}>
          {failedIds.includes(item.id) ? <p className={styles.failed}>{t('failed')} <a href={item.permalink} target="_blank" rel="noopener noreferrer">{t('original')}</a></p> : <Image src={`${siteBasePath}${item.image}`} width={item.width} height={item.height} alt={t(`image_${item.id}`)} onError={() => mediaFailed(item.id)} />}
        </div>
        <nav className={styles.controls} aria-label={t('navigation')}>
          <button type="button" onClick={() => move(-1)}>{t('previous')}</button>
          <p role="status" aria-live="polite">{t('counter', { current: selected! + 1, total: photos.length })}</p>
          <button type="button" onClick={() => move(1)}>{t('next')}</button>
        </nav>
        <div className={styles.links}>
          <a href={item.permalink} target="_blank" rel="noopener noreferrer">{t('original')}</a>
          <a href={whatsappDraftHref(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '77772071697', `${t('message')}\n${item.permalink}`)} target="_blank" rel="noopener noreferrer">{t('ask')}</a>
        </div>
      </div>}
    </dialog>
  </section>;
}

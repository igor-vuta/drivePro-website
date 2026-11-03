'use client';

import Image from 'next/image';
import { useLocale } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { currentStories, type Story } from '@/lib/stories.mjs';
import { whatsappDraftHref } from '@/lib/quote.mjs';
import { siteBasePath } from '@/lib/site';
import GalleryRail from './GalleryRail';
import styles from './InstagramGallery.module.css';

type Copy = { title: string; empty: string; failed: string; retry: string; open: string; previous: string; next: string; ask: string; message: string; updated: string };
export default function LiveStories({ copy }: { copy: Copy }) {
  const locale = useLocale();
  const [stories, setStories] = useState<Story[]>([]);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const failedIdsRef = useRef(new Set<string>());
  const snapshotRef = useRef<unknown>(null);
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    let expiryTimer: ReturnType<typeof setTimeout>;
    function update() {
      clearTimeout(expiryTimer);
      const next = currentStories(snapshotRef.current).filter(story => !failedIdsRef.current.has(story.id));
      setStories(next);
      const snapshot = snapshotRef.current;
      const rawUpdatedAt = snapshot && typeof snapshot === 'object' && 'updatedAt' in snapshot ? snapshot.updatedAt : null;
      setUpdatedAt(next.length && typeof rawUpdatedAt === 'string' && Number.isFinite(Date.parse(rawUpdatedAt)) ? rawUpdatedAt : null);
      if (next.length) expiryTimer = setTimeout(update, Math.max(1, Math.min(60000, Math.min(...next.map(story => Date.parse(story.expiresAt))) - Date.now())));
    }
    const visibility = () => { if (!document.hidden) update(); };
    document.addEventListener('visibilitychange', visibility);
    const timeout = setTimeout(() => controller.abort(), 10000);
    fetch(`${siteBasePath}/instagram/stories.json`, { signal: controller.signal, cache: 'no-store' })
      .then(response => { if (!response.ok) throw new Error('Feed unavailable'); return response.json(); })
      .then(snapshot => { if (!controller.signal.aborted) { snapshotRef.current = snapshot; setFailed(false); update(); } })
      .catch(() => { if (active) { snapshotRef.current = null; setStories([]); setFailed(true); } })
      .finally(() => clearTimeout(timeout));
    return () => { active = false; controller.abort(); clearTimeout(timeout); clearTimeout(expiryTimer); document.removeEventListener('visibilitychange', visibility); };
  }, [attempt]);
  function mediaFailed(id: string) {
    failedIdsRef.current.add(id);
    setStories(current => current.filter(item => item.id !== id));
    setFailed(true);
  }
  return <div className={styles.live}>
    {stories.length > 0 ? <>
      <h3>{copy.title}</h3>
      {updatedAt && <p className={styles.updated}>{copy.updated} <time dateTime={updatedAt}>{new Intl.DateTimeFormat(locale === 'kz' ? 'kk' : locale, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(updatedAt))}</time></p>}
      <GalleryRail title={copy.title} previous={copy.previous} next={copy.next}>
        {stories.map(story => <article className={styles.story} key={story.id}>
          {story.mediaType === 'VIDEO' ? <video controls muted playsInline preload="none" poster={story.thumbnailUrl} src={story.mediaUrl} onError={() => mediaFailed(story.id)} aria-label={copy.title} /> : <Image unoptimized src={story.mediaUrl} width={280} height={400} alt={copy.title} onError={() => mediaFailed(story.id)} />}
          <a href={story.permalink} target="_blank" rel="noopener noreferrer">{copy.open}</a>
          <a href={whatsappDraftHref(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '77772071697', `${copy.message}
${story.permalink}`)} target="_blank" rel="noopener noreferrer">{copy.ask}</a>
        </article>)}
      </GalleryRail>
    </> : <p>{failed ? copy.failed : copy.empty}</p>}
    {failed && <div className={styles.failure}>
      <button type="button" onClick={() => { failedIdsRef.current.clear(); setFailed(false); setAttempt(current => current + 1); }}>{copy.retry}</button>
      <a href="https://www.instagram.com/drivepro.moped.almaty/" target="_blank" rel="noopener noreferrer">{copy.open}</a>
    </div>}
  </div>;
}

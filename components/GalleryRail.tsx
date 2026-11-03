'use client';

import { useRef, type ReactNode } from 'react';
import styles from './InstagramGallery.module.css';

export default function GalleryRail({ children, title, previous, next }: { children: ReactNode; title: string; previous: string; next: string }) {
  const railRef = useRef<HTMLDivElement>(null);
  function scroll(direction: number) {
    const element = railRef.current;
    if (!element) return;
    const card = element.firstElementChild;
    element.scrollBy({ left: direction * ((card?.getBoundingClientRect().width || 280) + 16), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
  return <>
    <div className={styles.navigation}>
      <button type="button" onClick={() => scroll(-1)} aria-label={previous}>←</button>
      <button type="button" onClick={() => scroll(1)} aria-label={next}>→</button>
    </div>
    <div ref={railRef} className={styles.rail} role="region" aria-label={title}>{children}</div>
  </>;
}

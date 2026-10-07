'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import styles from './Welcome.module.css';

export default function WelcomeArrival({ children }: { children: ReactNode }) {
  const stageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const images = Array.from(stage.querySelectorAll<HTMLImageElement>('[data-welcome-art]'));
    let active = true;
    let settled = false;
    let frame = 0;

    function settle() {
      settled = true;
      stage!.dataset.motion = 'settled';
    }
    function onVisibility() {
      if (document.hidden) settle();
    }
    function onPreference() {
      if (motionPreference.matches) settle();
    }
    function onIntent() {
      settle();
    }
    function onImageError(event: Event) {
      const image = event.target;
      if (image instanceof HTMLImageElement) image.dataset.failed = 'true';
      settle();
    }
    function onAnimationEnd(event: AnimationEvent) {
      if (event.target instanceof HTMLImageElement && event.target.hasAttribute('data-welcome-art')) settle();
    }

    stage.addEventListener('animationend', onAnimationEnd);
    stage.addEventListener('pointerdown', onIntent);
    stage.addEventListener('keydown', onIntent);
    document.addEventListener('visibilitychange', onVisibility);
    motionPreference.addEventListener('change', onPreference);
    images.forEach(image => image.addEventListener('error', onImageError));

    if (document.hidden || motionPreference.matches) settle();
    else {
      Promise.allSettled(images.map(image => image.decode())).then(() => {
        if (!active) return;
        const failed = images.filter(image => !image.naturalWidth);
        failed.forEach(image => { image.dataset.failed = 'true'; });
        if (failed.length || document.hidden || motionPreference.matches || settled) { settle(); return; }
        frame = requestAnimationFrame(() => {
          if (active && !settled && !document.hidden && !motionPreference.matches) stage.dataset.motion = 'arriving';
        });
      });
    }

    return () => {
      active = false;
      cancelAnimationFrame(frame);
      stage.removeEventListener('animationend', onAnimationEnd);
      stage.removeEventListener('pointerdown', onIntent);
      stage.removeEventListener('keydown', onIntent);
      document.removeEventListener('visibilitychange', onVisibility);
      motionPreference.removeEventListener('change', onPreference);
      images.forEach(image => image.removeEventListener('error', onImageError));
    };
  }, []);

  return <section ref={stageRef} id="welcome" className={styles.stage} data-welcome-stage data-motion="static" aria-labelledby="welcome-title" tabIndex={-1}>{children}</section>;
}

'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { movePile, movedCount, newPlayState, nextPile, pausePlay, pileNumbers, resetPlay, resumePlay, type PlayState } from '@/lib/play.mjs';
import ClearSiteScene from './ClearSiteScene';
import styles from './ClearSiteController.module.css';

export default function ClearSiteController({ startPaused, onExit }: { startPaused: boolean; onExit: () => void }) {
  const t = useTranslations('play');
  const initiallyPaused = startPaused || (typeof document !== 'undefined' && document.hidden);
  const [state, setState] = useState<PlayState>(() => newPlayState(initiallyPaused));
  const [announcement, setAnnouncement] = useState(() => initiallyPaused ? t('paused') : t('progress', { count: 0 }));
  const pileButtonsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const resetRef = useRef<HTMLButtonElement>(null);
  const resumeRef = useRef<HTMLButtonElement>(null);
  const focusTargetRef = useRef<'next' | 'reset' | 'resume' | null>(initiallyPaused ? 'resume' : 'next');

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden && state.phase === 'active') {
        setState(current => pausePlay(current));
        setAnnouncement(t('paused'));
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [state.phase, t]);

  useLayoutEffect(() => {
    if (document.hidden) {
      focusTargetRef.current = null;
      return;
    }
    const target = focusTargetRef.current;
    focusTargetRef.current = null;
    if (target === 'next') {
      const number = nextPile(state);
      if (number) pileButtonsRef.current[number - 1]?.focus();
    } else if (target === 'reset') resetRef.current?.focus();
    else if (target === 'resume') resumeRef.current?.focus();
  }, [state]);

  function move(number: number) {
    const next = movePile(state, number);
    if (next === state) return;
    focusTargetRef.current = next.phase === 'completed' ? 'reset' : 'next';
    setState(next);
    setAnnouncement(next.phase === 'completed' ? t('complete') : t('progress', { count: movedCount(next) }));
  }

  function pause() {
    setState(current => pausePlay(current));
    setAnnouncement(t('paused'));
  }

  function resume() {
    if (document.hidden) return;
    focusTargetRef.current = 'next';
    setState(current => resumePlay(current));
    setAnnouncement(t('progress', { count: movedCount(state) }));
  }

  function reset() {
    focusTargetRef.current = 'next';
    setState(resetPlay());
    setAnnouncement(t('reset_status'));
  }

  return (
    <div className={styles.controller}>
      <ClearSiteScene cleared={state.cleared} />
      <p className={styles.progress}>{t('progress', { count: movedCount(state) })}</p>
      <p className="optional-play-status" role="status" aria-live="polite">{announcement}</p>
      <div className={styles.piles}>
        {pileNumbers.map(number => (
          <button
            key={number}
            ref={element => { pileButtonsRef.current[number - 1] = element; }}
            type="button"
            className={`optional-play-action ${styles.pile}`}
            onClick={() => move(number)}
            disabled={state.phase !== 'active' || Boolean(state.cleared & (1 << (number - 1)))}
          >
            {t('move_pile', { N: number })}
          </button>
        ))}
      </div>
      <div className={styles.controls}>
        {state.phase === 'active' && <button type="button" className="optional-play-action" onClick={pause}>{t('pause')}</button>}
        {state.phase === 'paused' && <button ref={resumeRef} type="button" className="optional-play-action" onClick={resume}>{t('resume')}</button>}
        <button ref={resetRef} type="button" className="optional-play-action" onClick={reset}>{t('reset')}</button>
        <button type="button" className="optional-play-action" onClick={onExit}>{t('exit')}</button>
      </div>
    </div>
  );
}

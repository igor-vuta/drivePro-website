'use client';

import { createElement, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { acceptsLoad } from '@/lib/play.mjs';

const subscribeToHydration = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

export default function PlayActivation() {
  const t = useTranslations('play');
  const ready = useSyncExternalStore(subscribeToHydration, clientReady, serverReady);
  const [mode, setMode] = useState<'idle' | 'loading' | 'failed' | 'open'>('idle');
  const [controllerElement, setControllerElement] = useState<ReactNode>(null);
  const playRef = useRef<HTMLButtonElement>(null);
  const mountedRef = useRef(false);
  const loadingRef = useRef(false);
  const hiddenDuringLoadRef = useRef(false);
  const requestRef = useRef(0);
  const returnFocusRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    const onVisibility = () => {
      if (document.hidden && loadingRef.current) hiddenDuringLoadRef.current = true;
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      mountedRef.current = false;
      requestRef.current += 1;
      loadingRef.current = false;
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  useEffect(() => {
    if (mode === 'idle' && returnFocusRef.current) {
      returnFocusRef.current = false;
      playRef.current?.focus();
    }
  }, [mode]);

  async function play() {
    if (loadingRef.current || controllerElement) return;
    const currentRequest = ++requestRef.current;
    hiddenDuringLoadRef.current = document.hidden;
    loadingRef.current = true;
    setMode('loading');
    try {
      // This is the only request for the controller. It runs after an explicit click.
      const loaded = await import('./ClearSiteController');
      if (!acceptsLoad(currentRequest, requestRef.current, mountedRef.current)) return;
      setControllerElement(createElement(loaded.default, {
        startPaused: hiddenDuringLoadRef.current || document.hidden,
        onExit: exit,
      }));
      setMode('open');
    } catch {
      if (!acceptsLoad(currentRequest, requestRef.current, mountedRef.current)) return;
      setMode('failed');
    } finally {
      if (currentRequest === requestRef.current) loadingRef.current = false;
    }
  }

  function exit() {
    requestRef.current += 1;
    loadingRef.current = false;
    setControllerElement(null);
    returnFocusRef.current = true;
    setMode('idle');
  }

  if (!ready) return null;

  return (
    <div className="optional-play-enhancement" data-play-open={mode === 'open'}>
      {mode !== 'open' && (
        <button ref={playRef} type="button" className="optional-play-action optional-play-start" onClick={play} aria-disabled={mode === 'loading'}>
          {t('play')}
        </button>
      )}
      {(mode === 'loading' || mode === 'failed') && (
        <p className="optional-play-status" role="status" aria-live="polite">
          {t(mode === 'loading' ? 'loading' : 'load_failure')}
        </p>
      )}
      {mode === 'open' && controllerElement}
    </div>
  );
}

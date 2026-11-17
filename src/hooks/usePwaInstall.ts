/**
 * React hook for Chrome's `beforeinstallprompt` PWA installation flow and standalone detection.
 * Captures the install prompt globally so it is never missed across tab switches.
 */

import { useCallback, useEffect, useState } from 'react';

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

let cachedInstallPrompt: BeforeInstallPromptEvent | null = null;
const promptListeners = new Set<() => void>();

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e: Event) => {
    e.preventDefault();
    cachedInstallPrompt = e as BeforeInstallPromptEvent;
    promptListeners.forEach((cb) => cb());
  });
  window.addEventListener('appinstalled', () => {
    cachedInstallPrompt = null;
    promptListeners.forEach((cb) => cb());
  });
}

export function isMobileDevice(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  if (/Android|iPhone|iPad|iPod|Mobile/i.test(ua)) return true;
  if (typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)')?.matches) {
    return (navigator.maxTouchPoints ?? 0) > 0;
  }
  return false;
}

export function isRunningStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  const standaloneMq = window.matchMedia?.('(display-mode: standalone)')?.matches ?? false;
  const iosStandalone = Boolean(
    (window.navigator as Navigator & { standalone?: boolean }).standalone,
  );
  return standaloneMq || iosStandalone;
}

export function usePwaInstall() {
  const [hasPrompt, setHasPrompt] = useState<boolean>(() => cachedInstallPrompt !== null);
  const [isStandalone, setIsStandalone] = useState<boolean>(() => isRunningStandalone());
  const [isMobile] = useState<boolean>(() => isMobileDevice());
  const [swReady, setSwReady] = useState<boolean>(false);

  useEffect(() => {
    const syncPrompt = () => {
      setHasPrompt(cachedInstallPrompt !== null);
      setIsStandalone(isRunningStandalone());
    };
    promptListeners.add(syncPrompt);

    const mq = window.matchMedia?.('(display-mode: standalone)');
    const onMqChange = () => setIsStandalone(isRunningStandalone());
    mq?.addEventListener?.('change', onMqChange);

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then(() => setSwReady(true))
        .catch(() => setSwReady(false));
    }

    return () => {
      promptListeners.delete(syncPrompt);
      mq?.removeEventListener?.('change', onMqChange);
    };
  }, []);

  const promptInstall = useCallback(async (): Promise<'accepted' | 'dismissed' | 'unavailable'> => {
    if (!cachedInstallPrompt) return 'unavailable';
    await cachedInstallPrompt.prompt();
    const choice = await cachedInstallPrompt.userChoice;
    if (choice.outcome === 'accepted') {
      cachedInstallPrompt = null;
      promptListeners.forEach((cb) => cb());
    }
    return choice.outcome;
  }, []);

  return {
    canInstall: hasPrompt && !isStandalone && isMobile,
    isStandalone,
    isMobile,
    swReady,
    promptInstall,
  };
}

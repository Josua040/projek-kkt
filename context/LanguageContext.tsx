'use client';

import React, { createContext, useContext, useSyncExternalStore, useCallback } from 'react';

export type Language = 'id' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'id',
  setLang: () => {},
  toggleLang: () => {},
});

let currentLang: Language = 'id';
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getSnapshot(): Language {
  if (typeof window === 'undefined') return 'id';
  try {
    const saved = localStorage.getItem('kumelembuay_lang') as Language | null;
    if (saved === 'id' || saved === 'en') {
      currentLang = saved;
    }
  } catch {
    // ignore
  }
  return currentLang;
}

function getServerSnapshot(): Language {
  return 'id';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLang = useCallback((newLang: Language) => {
    currentLang = newLang;
    try {
      localStorage.setItem('kumelembuay_lang', newLang);
    } catch {
      // ignore
    }
    notify();
  }, []);

  const toggleLang = useCallback(() => {
    setLang(currentLang === 'id' ? 'en' : 'id');
  }, [setLang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

'use client';

import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

type Lang = 'pt' | 'en';

export function useLanguage() {
  const context = useContext(LanguageContext);
  const lang: Lang = ['pt', 'en'].includes(context.language) ? context.language as Lang : 'pt';

  return {
    ...context,
    lang
  };
}

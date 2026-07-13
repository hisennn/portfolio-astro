'use client';

import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { LanguageProvider } from '../contexts/LanguageContext';

export default function PageChrome({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <div className="site-shell min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <Header />
        {children}
        <Footer />
      </div>
    </LanguageProvider>
  );
}

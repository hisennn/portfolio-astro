'use client';

import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { LanguageProvider } from '../contexts/LanguageContext';

export default function PageChrome({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <div className="site-shell min-h-screen text-[var(--text-primary)]">
        <div className="site-lift">
          <Header projectPage />
          {children}
        </div>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

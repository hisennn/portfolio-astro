'use client';

import { useLanguage } from '../hooks/useLanguage';

export default function Header() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage = language === 'pt' ? 'en' : 'pt';
    setLanguage(newLanguage);
  };

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-primary)]/80 backdrop-blur-xl">
      <div className="max-w-[1200px] mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <a href="/" className="font-heading font-bold text-xl tracking-tight text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors">
          GL.
        </a>
        <div className="flex items-center gap-6">
          <button
            onClick={toggleLanguage}
            className="text-[12px] font-body uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            aria-label={language === 'pt' ? 'Mudar para inglês' : 'Switch to Portuguese'}
          >
            {language === 'pt' ? 'PT_BR' : 'EN_US'}
          </button>
        </div>
      </div>
    </header>
  );
}

'use client';
 
import { useLanguage } from '../hooks/useLanguage';
 
export default function Header() {
  const { language, setLanguage } = useLanguage();
 
  const toggleLanguage = () => {
    const newLanguage = language === 'pt' ? 'en' : 'pt';
    setLanguage(newLanguage);
  };
 
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]/80 backdrop-blur-xl">
      <div className="max-w-[1200px] mx-auto px-6 py-5 flex items-center justify-between">
        <a href="/" className="font-heading font-bold text-xl tracking-tight text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors">
          GL.
        </a>
        <div className="flex items-center gap-6">
          <div className="flex items-center border border-[var(--border)] bg-transparent divide-x divide-[var(--border)] h-[28px] overflow-hidden select-none font-heading font-bold text-[10px] tracking-widest text-[var(--text-primary)]">
            <button
              onClick={() => language !== 'pt' && setLanguage('pt')}
              className={`px-3 h-full flex items-center justify-center transition-all duration-200 cursor-pointer uppercase ${
                language === 'pt'
                  ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]/50'
              }`}
            >
              PT
            </button>
            <button
              onClick={() => language !== 'en' && setLanguage('en')}
              className={`px-3 h-full flex items-center justify-center transition-all duration-200 cursor-pointer uppercase ${
                language === 'en'
                  ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]/50'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

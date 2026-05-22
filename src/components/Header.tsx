'use client';
 
import { useLanguage } from '../hooks/useLanguage';
import BoxIcon from './BoxIcon';
 
export default function Header() {
  const { language, setLanguage, isDarkTheme, toggleTheme } = useLanguage();
 
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg-primary)]">
      <div className="max-w-[1200px] mx-auto px-2.5 md:px-6 py-4 flex items-center justify-between">
        <a href="/" className="font-heading font-bold text-base tracking-tight text-[var(--text-primary)] hover:opacity-60 transition-opacity duration-200">
          Gabriel
        </a>
        <div className="flex items-center gap-3">
          <div className="relative flex items-center border border-[var(--border)] h-[28px] overflow-hidden select-none font-body font-medium text-[11px] tracking-wide">
            <div
              className="absolute top-0 bottom-0 w-1/2 bg-[var(--text-primary)] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{ transform: language === 'en' ? 'translateX(100%)' : 'translateX(0)' }}
            />
            <button
              onClick={() => language !== 'pt' && setLanguage('pt')}
              className={`relative z-10 px-2.5 h-full flex items-center justify-center cursor-pointer transition-colors duration-300 ${
                language === 'pt'
                  ? 'text-[var(--bg-primary)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              PT
            </button>
            <button
              onClick={() => language !== 'en' && setLanguage('en')}
              className={`relative z-10 px-2.5 h-full flex items-center justify-center cursor-pointer transition-colors duration-300 ${
                language === 'en'
                  ? 'text-[var(--bg-primary)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              EN
            </button>
          </div>

          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-7 h-7 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-opacity duration-200 cursor-pointer"
            aria-label="Toggle theme"
          >
            <BoxIcon name={isDarkTheme ? 'bx-sun' : 'bx-moon'} size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}

'use client';
 
import { useLanguage } from '../hooks/useLanguage';
import BoxIcon from './BoxIcon';
 
export default function Header() {
  const { language, setLanguage, isDarkTheme, toggleTheme } = useLanguage();
 
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg-primary)]">
      <div className="max-w-[1100px] mx-auto px-5 md:px-6 py-3 flex items-center justify-between">
        <a href="/" className="font-heading font-bold text-base tracking-tight text-[var(--text-primary)] hover:opacity-60 transition-opacity duration-200">
          Gabriel
        </a>
        <div className="flex items-center gap-3">
          <div className="relative flex h-9 items-center overflow-hidden border border-[var(--border)] font-body text-[11px] font-medium tracking-wide select-none">
            <div
              className="absolute top-0 bottom-0 w-1/2 bg-[var(--text-primary)] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{ transform: language === 'en' ? 'translateX(100%)' : 'translateX(0)' }}
            />
            <button
              onClick={() => language !== 'pt' && setLanguage('pt')}
              aria-pressed={language === 'pt'}
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
              aria-pressed={language === 'en'}
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
            className="flex size-9 cursor-pointer items-center justify-center text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--text-primary)]"
            aria-label="Toggle theme"
          >
            <BoxIcon name={isDarkTheme ? 'bx-sun' : 'bx-moon'} size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}

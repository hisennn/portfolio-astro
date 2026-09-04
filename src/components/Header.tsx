'use client';

import { useRef, useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import BoxIcon from './BoxIcon';

export default function Header({ projectPage = false }: { projectPage?: boolean }) {
  const { language, setLanguage, isDarkTheme, toggleTheme } = useLanguage();
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const languageMenuButton = useRef<HTMLButtonElement>(null);
  const languageMenuPointerType = useRef<string | null>(null);

  const selectLanguage = (nextLanguage: 'pt' | 'en') => {
    setLanguage(nextLanguage);
    setIsLanguageMenuOpen(false);
    languageMenuButton.current?.focus({ preventScroll: true });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg-primary)]">
      <div className={`site-header-inner max-w-[1100px] mx-auto px-5 md:px-6 py-3 ${projectPage ? 'site-header-project' : 'flex items-center justify-between'}`}>
        {projectPage && (
          <a
            href="/#projects"
            className="project-header-back font-body text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200"
          >
            <BoxIcon name="bx-arrow-left" size={16} />
            <span>{language === 'en' ? 'Back' : 'Voltar'}</span>
          </a>
        )}
        <a href="/" className="site-header-brand font-heading font-bold text-base tracking-tight text-[var(--text-primary)] hover:opacity-60 transition-opacity duration-200">
          Gabriel
        </a>
        <div className="site-header-controls flex items-center gap-3">
          <div
            className={`language-menu ${isLanguageMenuOpen ? 'is-open' : ''}`}
            onPointerEnter={(event) => event.pointerType === 'mouse' && setIsLanguageMenuOpen(true)}
            onPointerLeave={(event) => event.pointerType === 'mouse' && setIsLanguageMenuOpen(false)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setIsLanguageMenuOpen(false);
              }
            }}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                setIsLanguageMenuOpen(false);
                languageMenuButton.current?.focus({ preventScroll: true });
              }
            }}
          >
            <button
              ref={languageMenuButton}
              type="button"
              className="language-menu-trigger"
              aria-expanded={isLanguageMenuOpen}
              aria-haspopup="true"
              aria-controls="language-menu-options"
              onPointerDown={(event) => {
                languageMenuPointerType.current = event.pointerType;
              }}
              onClick={() => {
                setIsLanguageMenuOpen((isOpen) =>
                  languageMenuPointerType.current === 'mouse' ? true : !isOpen
                );
                languageMenuPointerType.current = null;
              }}
            >
              <span className="language-menu-code" aria-hidden="true">
                {language === 'en' ? 'EN' : 'PT'}
              </span>
              <span className="language-menu-label">
                {language === 'en' ? 'English' : 'Português'}
              </span>
              <BoxIcon name="bx-chevron-down" size={15} className="language-menu-chevron" />
            </button>

            <div
              id="language-menu-options"
              className="language-menu-panel"
              aria-hidden={!isLanguageMenuOpen}
            >
              <div className="language-menu-surface">
                <button
                  type="button"
                  className="language-menu-option"
                  data-selected={language === 'pt'}
                  tabIndex={isLanguageMenuOpen ? 0 : -1}
                  onClick={() => selectLanguage('pt')}
                >
                  <span>Português</span>
                  <span aria-hidden="true">PT</span>
                </button>
                <button
                  type="button"
                  className="language-menu-option"
                  data-selected={language === 'en'}
                  tabIndex={isLanguageMenuOpen ? 0 : -1}
                  onClick={() => selectLanguage('en')}
                >
                  <span>English</span>
                  <span aria-hidden="true">EN</span>
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className="theme-toggle flex size-9 cursor-pointer items-center justify-center text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--text-primary)]"
            aria-label="Toggle theme"
          >
            <BoxIcon name={isDarkTheme ? 'bx-sun' : 'bx-moon'} size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}

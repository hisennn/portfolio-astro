'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import Icon from './Icon';

export default function Header({ projectPage = false }: { projectPage?: boolean }) {
  const { language, setLanguage, isDarkTheme, toggleTheme } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const languageMenuButton = useRef<HTMLButtonElement>(null);
  const languageMenuPointerType = useRef<string | null>(null);

  useEffect(() => {
    const updateScroll = () => {
      setIsScrolled(current => window.scrollY > 80 ? true : window.scrollY < 16 ? false : current);
    };
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  const selectLanguage = (nextLanguage: 'pt' | 'en') => {
    setLanguage(nextLanguage);
    setIsLanguageMenuOpen(false);
    languageMenuButton.current?.focus({ preventScroll: true });
  };

  return (
    <header className="site-nav sticky top-0 z-50" data-scrolled={isScrolled}>
      <div className={`site-header-inner ${projectPage ? 'site-header-project' : 'flex items-center justify-between'}`}>
        {projectPage && (
          <a
            href="/#projects"
            className="project-header-back font-body text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200"
          >
            <Icon name="arrow-left" size={16} />
            <span>{language === 'en' ? 'Back' : 'Voltar'}</span>
          </a>
        )}
        <a href="/" className="site-header-brand font-body font-bold text-base tracking-tight text-[var(--text-primary)] hover:opacity-60 transition-opacity duration-200">
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
              aria-label={language === 'en' ? 'English — change language' : 'Português — alterar idioma'}
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
              <img className="language-flag" src={`/icons/flag-${language === 'en' ? 'us' : 'br'}.svg`} width={20} height={14} alt="" />
              <span className="language-menu-label">
                {language === 'en' ? 'English' : 'Português'}
              </span>
              <Icon name="caret-down" size={15} className="language-menu-chevron" />
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
                  <img className="language-flag" src="/icons/flag-br.svg" width={20} height={14} alt="" />
                  <span>Português</span>
                </button>
                <button
                  type="button"
                  className="language-menu-option"
                  data-selected={language === 'en'}
                  tabIndex={isLanguageMenuOpen ? 0 : -1}
                  onClick={() => selectLanguage('en')}
                >
                  <img className="language-flag" src="/icons/flag-us.svg" width={20} height={14} alt="" />
                  <span>English</span>
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className="theme-toggle flex size-9 cursor-pointer items-center justify-center text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--text-primary)]"
            aria-label="Toggle theme"
          >
            <Icon name={isDarkTheme ? 'sun' : 'moon'} size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}

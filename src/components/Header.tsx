'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import Icon from './Icon';

export default function Header({ projectPage = false }: { projectPage?: boolean }) {
  const { language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isPastContent, setIsPastContent] = useState(false);
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

  useEffect(() => {
    const hero = document.querySelector(projectPage ? '.project-detail-band' : '.project-featured-group');

    let heroObserver: IntersectionObserver | null = null;
    if (hero) {
      heroObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.target === hero) {
              setIsPastHero(entry.boundingClientRect.bottom <= 0);
            }
          }
        },
        { threshold: [0, 0.05] }
      );
      heroObserver.observe(hero);
    }

    const HIDE_AT = 0.98;
    let frame = 0;
    const updatePastContent = () => {
      frame = 0;
      const lift = document.querySelector('.site-lift') as HTMLElement | null;
      if (!lift) {
        setIsPastContent(false);
        return;
      }
      const viewportH = window.innerHeight || 1;
      const liftBottom = lift.offsetTop + lift.offsetHeight;
      const gap = document.documentElement.scrollHeight - liftBottom;
      const progress = gap > 0
        ? (window.scrollY + viewportH - liftBottom) / gap
        : 1;
      setIsPastContent(gap > 0 && progress >= HIDE_AT);
    };
    const schedulePastContent = () => {
      if (!frame) frame = requestAnimationFrame(updatePastContent);
    };

    updatePastContent();
    window.addEventListener('scroll', schedulePastContent, { passive: true });
    window.addEventListener('resize', schedulePastContent);
    return () => {
      heroObserver?.disconnect();
      window.removeEventListener('scroll', schedulePastContent);
      window.removeEventListener('resize', schedulePastContent);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [projectPage]);

  const selectLanguage = (nextLanguage: 'pt' | 'en') => {
    setLanguage(nextLanguage);
    setIsLanguageMenuOpen(false);
    languageMenuButton.current?.focus({ preventScroll: true });
  };

  return (
    <header className="site-nav top-0 z-50" data-scrolled={isScrolled} data-past-hero={isPastHero} data-past-content={isPastContent}>
      <div className={`site-header-inner ${projectPage ? 'site-header-project' : 'flex items-center justify-between'}`}>
        {projectPage && (
          <a
            href="/#projects"
            className="project-header-back"
          >
            <Icon name="arrow-left" size={14} />
            <span>{language === 'en' ? 'Back' : 'Voltar'}</span>
          </a>
        )}
        <a href="/" className="site-header-brand">
          Gabriel
        </a>
        {!projectPage && (
          <nav className="site-header-links" aria-label={language === 'en' ? 'Main navigation' : 'Navegação principal'}>
            <a href="#projects">{language === 'en' ? 'Work' : 'Projetos'}</a>
            <a href="#experience">{language === 'en' ? 'Experience' : 'Experiência'}</a>
            <a href="#contact">{language === 'en' ? 'Contact' : 'Contato'}</a>
          </nav>
        )}
        <div className="site-header-controls flex items-center gap-2">
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
              <span className="language-menu-label">
                {language === 'en' ? 'EN' : 'PT'}
              </span>
              <Icon name="caret-down" size={13} className="language-menu-chevron" />
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
                  <span className="language-flag-mono" aria-hidden="true">
                    <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <rect x="0.6" y="0.6" width="14.8" height="14.8" />
                      <polygon points="8,2.8 13.2,8 8,13.2 2.8,8" />
                      <circle cx="8" cy="8" r="2.2" />
                    </svg>
                  </span>
                  <span>Português</span>
                  {language === 'pt' && <Icon name="check" size={12} className="language-menu-check ml-auto" />}
                </button>
                <button
                  type="button"
                  className="language-menu-option"
                  data-selected={language === 'en'}
                  tabIndex={isLanguageMenuOpen ? 0 : -1}
                  onClick={() => selectLanguage('en')}
                >
                  <span className="language-flag-mono" aria-hidden="true">
                    <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <rect x="0.6" y="0.6" width="14.8" height="14.8" />
                      <rect x="0.6" y="0.6" width="6.6" height="6.6" fill="currentColor" />
                      <line x1="7.2" y1="2.6" x2="15.4" y2="2.6" />
                      <line x1="7.2" y1="5" x2="15.4" y2="5" />
                      <line x1="0.6" y1="9.4" x2="15.4" y2="9.4" />
                      <line x1="0.6" y1="12.2" x2="15.4" y2="12.2" />
                    </svg>
                  </span>
                  <span>English</span>
                  {language === 'en' && <Icon name="check" size={12} className="language-menu-check ml-auto" />}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}

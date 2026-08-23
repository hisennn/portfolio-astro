'use client';

import { useLanguage } from '../hooks/useLanguage';
import BoxIcon from './BoxIcon';

const texts = {
  pt: {
    greeting: 'Olá, sou',
    name: 'Gabriel Lemes',
    role: 'Desenvolvedor Web Full Stack',
    location: 'Batatais, SP, Brasil',
    downloadResume: 'Currículo',
    portuguese: 'Português',
    english: 'Inglês',
    native: 'nativo',
    advanced: 'avançado'
  },
  en: {
    greeting: "Hi, I'm",
    name: 'Gabriel Lemes',
    role: 'Full-stack Web Developer',
    location: 'Batatais, SP, Brazil',
    downloadResume: 'Resume',
    portuguese: 'Portuguese',
    english: 'English',
    native: 'native',
    advanced: 'C1 advanced'
  }
} as const;

export default function Hero() {
  const { lang } = useLanguage();
  const resumeHref =
    lang === 'en'
      ? '/gabriel-lemes-resume-eng.pdf'
      : '/gabriel-lemes-resume-ptbr.pdf';
  const resumeDownloadName =
    lang === 'en' ? 'Gabriel Lemes - Resume.pdf' : 'Gabriel Lemes - Currículo.pdf';

  return (
    <section className="hero-intro">
      <div className="hero-heading">
        <p className="hero-kicker">{texts[lang].greeting}</p>
        <h1 className="hero-title">{texts[lang].name}</h1>
        <p className="hero-role">{texts[lang].role}</p>
        <span className="hero-rule" aria-hidden="true" />
      </div>

      <div className="hero-panel">
        <div className="hero-contact-grid">
          <a href="mailto:gabrielsilvarz@outlook.com" className="hero-contact-link">
            <span className="hero-icon">
              <BoxIcon name="bx-envelope" size={15} />
            </span>
            <span>gabrielsilvarz@outlook.com</span>
          </a>
          <div className="hero-contact-item">
            <span className="hero-icon">
              <BoxIcon name="bx-phone" size={15} />
            </span>
            <span>+55 16 9 9390-9231</span>
          </div>
        </div>

        <div className="hero-meta-row">
          <span className="hero-icon">
            <BoxIcon name="bx-message-circle-detail" size={15} />
          </span>
          <span>
            {texts[lang].portuguese}{' '}
            <span className="text-[var(--text-muted)]">{texts[lang].native}</span>
          </span>
          <span className="text-[var(--text-muted)]">/</span>
          <span>
            {texts[lang].english}{' '}
            <span className="text-[var(--text-muted)]">{texts[lang].advanced}</span>
          </span>
        </div>

        <p className="hero-location">
          <BoxIcon name="bx-location-pin" size={13} />
          {texts[lang].location}
        </p>

        <div className="hero-actions">
          <a
            href="https://www.linkedin.com/in/gabrieldslemes/"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-action-link"
            aria-label="LinkedIn"
          >
            <BoxIcon name="bxl-linkedin" size={16} />
            LinkedIn
          </a>
          <a
            href="https://github.com/Hisennn"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-action-link"
            aria-label="GitHub"
          >
            <BoxIcon name="bxl-github" size={16} />
            GitHub
          </a>
          <a
            href={resumeHref}
            download={resumeDownloadName}
            className="hero-action-link"
          >
            <BoxIcon name="bx-arrow-to-bottom-stroke" size={16} />
            {texts[lang].downloadResume}
          </a>
        </div>
      </div>
    </section>
  );
}

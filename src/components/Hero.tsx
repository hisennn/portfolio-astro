'use client';

import { useLanguage } from '../hooks/useLanguage';
import Icon from './Icon';

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
    role: 'Full-Stack Web Developer',
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
      ? '/gabriel-lemes-resume-dev-en.pdf'
      : '/gabriel-lemes-curriculo-dev-pt-br.pdf';
  const resumeDownloadName =
    lang === 'en' ? 'Gabriel Lemes - Resume.pdf' : 'Gabriel Lemes - Currículo.pdf';

  return (
    <section className="hero-intro">
      <div className="hero-heading">
        <p className="hero-kicker">
          {texts[lang].greeting}
        </p>
        <h1 className="hero-title">{texts[lang].name}</h1>
        <p className="hero-role">{texts[lang].role}</p>
      </div>

      <div className="hero-panel">
        <div className="hero-contact-grid">
          <a href="mailto:gabrielsilvarz@outlook.com" className="hero-contact-link">
            <span className="hero-icon">
              <Icon name="envelope" size={15} />
            </span>
            <span>gabrielsilvarz@outlook.com</span>
          </a>
          <div className="hero-contact-item">
            <span className="hero-icon">
              <Icon name="phone" size={15} />
            </span>
            <span>+55 16 9 9390-9231</span>
          </div>
          <p className="hero-location">
            <Icon name="map-pin" size={13} />
            {texts[lang].location}
          </p>
        </div>

        <div className="hero-meta-row">
          <span className="hero-icon">
            <Icon name="translate" size={15} />
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

        <div className="hero-actions">
          <a
            href="https://www.linkedin.com/in/gabrieldslemes/"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-action-link"
            aria-label="LinkedIn"
          >
            <Icon name="linkedin-logo" size={16} />
            LinkedIn
          </a>
          <a
            href="https://github.com/Hisennn"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-action-link hero-action-primary"
            aria-label="GitHub"
          >
            <Icon name="github-logo" size={16} />
            GitHub
          </a>
          <a
            href={resumeHref}
            download={resumeDownloadName}
            className="hero-action-link"
          >
            <Icon name="download-simple" size={16} />
            {texts[lang].downloadResume}
          </a>
        </div>
      </div>
    </section>
  );
}

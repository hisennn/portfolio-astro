'use client';

import { useLanguage } from '../hooks/useLanguage';
import Icon from './Icon';

const texts = {
  pt: {
    name: 'Gabriel Lemes',
    role: 'Desenvolvedor Web Full Stack',
    location: 'Batatais, SP, Brasil',
    downloadResume: 'Currículo',
    about: 'Crio e mantenho sites e sistemas para empresas e profissionais. Trabalho na interface, no banco de dados, nas integrações e na publicação dos projetos.',
    projects: 'Conheça meu trabalho'
  },
  en: {
    name: 'Gabriel Lemes',
    role: 'Full-Stack Web Developer',
    location: 'Batatais, SP, Brazil',
    downloadResume: 'Resume',
    about: 'I build and maintain websites and systems for businesses and professionals. My work covers user interfaces, database management, integration, and deployment.',
    projects: 'Explore my work'
  }
} as const;

export default function Hero() {
  const { lang } = useLanguage();
  const resumeHref =
    lang === 'en'
      ? '/gabriel-lemes-resume-original-en.pdf'
      : '/gabriel-lemes-resume-original-pt-br.pdf';
  const resumeDownloadName =
    lang === 'en' ? 'Gabriel_CV_en.pdf' : 'Gabriel_CV_ptbr.pdf';

  return (
    <section className="hero-intro">
      <div className="hero-heading">
        <h1 className="hero-title">{texts[lang].name}</h1>
      </div>

      <div className="hero-content">
        <div className="hero-identity">
          <p className="hero-role">{texts[lang].role}</p>
          <div className="hero-contacts">
            <a href="mailto:gabrielsilvarz@outlook.com" className="hero-contact-item">
              <Icon name="envelope" size={15} />
              <span>gabrielsilvarz@outlook.com</span>
            </a>
            <a href="tel:+5516993909231" className="hero-contact-item">
              <Icon name="phone" size={15} />
              <span>+55 16 9 9390-9231</span>
            </a>
          </div>
          <p className="hero-location">{texts[lang].location}</p>
        </div>
        <div className="hero-description">
          <p className="hero-about">{texts[lang].about}</p>
          <div className="hero-actions">
            <a href="#projects" className="hero-action-link hero-action-primary">
              <span>{texts[lang].projects}</span>
              <Icon name="arrow-down" size={14} />
            </a>
            <a
              href={resumeHref}
              download={resumeDownloadName}
              className="hero-action-link"
            >
              <Icon name="download-simple" size={14} />
              <span>{texts[lang].downloadResume}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

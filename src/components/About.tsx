'use client';

import { useLanguage } from '../hooks/useLanguage';

const texts = {
  pt: {
    title: 'Sobre',
    about: 'Sou desenvolvedor web. Crio e mantenho sites, aplicações e sistemas internos para empresas e profissionais. Trabalho na interface, no banco de dados, nas integrações e na publicação dos projetos.'
  },
  en: {
    title: 'About',
    about: "I'm a web developer who builds and maintains websites, applications, and internal systems for businesses and professionals. My work covers user interfaces, database management, integration, and deployment."
  }
} as const;

export default function About() {
  const { lang } = useLanguage();

  return (
    <section className="about-section" aria-label={texts[lang].title}>
      <div className="about-inner">
        <p className="about-text">
          {texts[lang].about}
        </p>
      </div>
    </section>
  );
}

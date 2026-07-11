'use client';

import { useLanguage } from '../hooks/useLanguage';

const texts = {
  pt: {
    title: 'Sobre',
    about: 'Desenvolvedor web full stack trabalhando principalmente com TypeScript, React, Node.js e PostgreSQL. Trabalho recente inclui sistemas internos, sites institucionais e projetos para clientes, passando por front-end, lógica da aplicação, recursos com banco de dados e deploy.'
  },
  en: {
    title: 'About',
    about: 'Full-stack web developer working mainly with TypeScript, React, Node.js, and PostgreSQL. Recent work includes internal systems, company websites, and client projects, covering frontend implementation, application logic, database-backed features, and deployment.'
  }
} as const;

export default function About() {
  const { lang } = useLanguage();

  return (
    <section className="about-section">
      <div className="flex flex-col gap-4">
        <h2 className="text-[15px] font-body font-medium uppercase tracking-[0.1em] text-[var(--text-muted)]">
          {texts[lang].title}
        </h2>
        <p className="max-w-[680px] text-[var(--text-secondary)] text-base font-body font-normal leading-[1.7]">
          {texts[lang].about}
        </p>
      </div>
    </section>
  );
}

'use client';

import { useLanguage } from '../hooks/useLanguage';

const texts = {
  pt: {
    title: 'Sobre',
    about: 'Trabalho como desenvolvedor web full stack, principalmente com TypeScript, React, Node.js e PostgreSQL. No dia a dia, desenvolvo e mantenho sistemas internos, sites institucionais e projetos para clientes. Cuido do front-end, da lógica da aplicação, do banco de dados e da publicação.'
  },
  en: {
    title: 'About',
    about: 'I am a full-stack web developer working mainly with TypeScript, React, Node.js, and PostgreSQL. My recent work includes an internal client portal, company websites, and small projects for clients. I usually handle the work from development through revisions and deployment.'
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

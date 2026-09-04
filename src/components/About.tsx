'use client';

import { useLanguage } from '../hooks/useLanguage';

const texts = {
  pt: {
    title: 'Sobre',
    about: 'Sou desenvolvedor web full stack e trabalho principalmente com TypeScript, React, Node.js e PostgreSQL. Desenvolvo e mantenho aplicações web, sites e sistemas internos, atuando no front-end, back-end, banco de dados e deploy.'
  },
  en: {
    title: 'About',
    about: "I'm a full-stack web developer working mainly with TypeScript, React, Node.js, and PostgreSQL. I build and maintain web applications, websites, and internal systems across frontend, backend, databases, and deployment."
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

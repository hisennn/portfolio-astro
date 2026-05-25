'use client';

import { useLanguage } from '../hooks/useLanguage';

const texts = {
  pt: {
    title: 'Sobre',
    about: 'Sou estudante de frontend e desenvolvimento web. Curso Análise e Desenvolvimento de Sistemas e trabalho com sites, interfaces e pequenos sistemas web. Também sigo aprofundando meus conhecimentos para construir projetos mais completos, organizados e fáceis de usar.'
  },
  en: {
    title: 'About',
    about: "I'm a frontend and web development student, currently studying Systems Analysis and Development. I work on websites, interfaces, and small web systems, while continuing to deepen my knowledge to build projects that are more complete, organized, and easy to use."
  }
} as const;

export default function About() {
  const { lang } = useLanguage();

  return (
    <section>
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

'use client';

import { useLanguage } from '../hooks/useLanguage';

const texts = {
  pt: {
    title: 'Sobre',
    about: 'Sou estudante de frontend e desenvolvimento web. Curso Análise e Desenvolvimento de Sistemas e estou aprendendo a criar e organizar sites e aplicações. Tenho alguns conhecimentos em UI/UX e pretendo me aprofundar em Node.js no futuro para fazer projetos mais completos.'
  },
  en: {
    title: 'About',
    about: "I'm a frontend and web development student. Studying Systems Analysis and Development and learning how to build and organize websites and applications. I have some knowledge of UI/UX and plan to deepen my skills in Node.js in the future to work on more complete projects."
  }
} as const;

export default function About() {
  const { lang } = useLanguage();

  return (
    <section>
      <div className="flex flex-col gap-6">
        <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight text-[var(--text-primary)]">
          {texts[lang].title}
        </h2>
        <p className="max-w-full text-[var(--text-secondary)] text-[17px] md:text-[18px] font-body font-normal leading-relaxed break-words">
          {texts[lang].about}
        </p>
      </div>
    </section>
  );
}

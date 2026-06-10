'use client';

import { useLanguage } from '../hooks/useLanguage';

const texts = {
  pt: {
    title: 'Sobre',
    about: 'Sou desenvolvedor web. Trabalho com sites, interfaces e sistemas, do institucional a projetos mais completos como o BRC Client Portal, um sistema de gestão de obras e clientes. Gosto de construir coisas organizadas e diretas de usar.'
  },
  en: {
    title: 'About',
    about: "I'm a web developer. I work on websites, interfaces, and systems, from simple institutional sites to more complete builds like BRC Client Portal, a project and client management system. I like things organized and easy to use."
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

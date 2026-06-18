'use client';

import { useLanguage } from '../hooks/useLanguage';

const texts = {
  pt: {
    title: 'Sobre',
    about: 'Sou desenvolvedor full-stack com experiência em construir e manter aplicações web em produção usando TypeScript, JavaScript, React, Node.js, PostgreSQL e Cloudflare.'
  },
  en: {
    title: 'About',
    about: 'Full-stack web developer with experience building and maintaining production web applications using TypeScript, JavaScript, React, Node.js, PostgreSQL, and Cloudflare.'
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

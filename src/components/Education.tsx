'use client';

import { useLanguage } from '../hooks/useLanguage';

const texts = {
  pt: {
    title: 'Formação',
    text: 'Estou no sexto e último semestre de Análise e Desenvolvimento de Sistemas. Também continuo aprendendo para melhorar minhas habilidades.',
    status: 'Em andamento',
    uni: 'Claretiano',
    uniDate: 'jan 2024 - jul 2026',
    uniCourse: 'Análise e Desenvolvimento de Sistemas',
    uniType: 'Tecnólogo'
  },
  en: {
    title: 'Education',
    text: 'Sixth and final semester of Systems Analysis and Development. Also continuing to learn to improve my skills.',
    status: 'In progress',
    uni: 'Claretiano',
    uniDate: 'jan 2024 - jul 2026',
    uniCourse: 'Systems Analysis and Development',
    uniType: 'Associate Degree'
  }
} as const;

export default function Education() {
  const { lang } = useLanguage();

  return (
    <section>
      <div className="flex flex-col gap-6">
        <h2 className="text-[15px] font-body font-medium uppercase tracking-[0.1em] text-[var(--text-muted)]">
          {texts[lang].title}
        </h2>

        <div className="flex flex-col gap-6">
          <p className="text-[var(--text-secondary)] font-body text-base font-normal leading-[1.7] max-w-[680px]">
            {texts[lang].text}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-3 items-baseline">
            <span className="text-[13px] font-body font-medium text-[var(--text-muted)]">
              {texts[lang].status}
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="text-[17px] font-body font-medium tracking-tight text-[var(--text-primary)]">
                {texts[lang].uniCourse}
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 font-body font-normal text-[13px] text-[var(--text-muted)]">
                <span>{texts[lang].uni}</span>
                <span className="hidden sm:inline">·</span>
                <span>{texts[lang].uniType}</span>
                <span className="hidden sm:inline">·</span>
                <span>{texts[lang].uniDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

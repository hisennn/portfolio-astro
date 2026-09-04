'use client';

import { useLanguage } from '../hooks/useLanguage';

const texts = {
  pt: {
    title: 'Formação',
    status: 'Concluído',
    uni: 'Centro Universitário Claretiano',
    uniCourse: 'Análise e Desenvolvimento de Sistemas',
    uniType: 'Tecnólogo'
  },
  en: {
    title: 'Education',
    status: 'Completed',
    uni: 'Claretiano University Center',
    uniCourse: 'Systems Analysis and Development',
    uniType: 'Technologist Degree'
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

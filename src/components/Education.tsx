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
    <section className="education-section" aria-labelledby="education-heading">
      <div className="flex flex-col gap-6">
        <h2 id="education-heading" className="section-heading">
          {texts[lang].title}
        </h2>

        <div className="education-record experience-timeline">
          <span aria-hidden="true" className="experience-timeline-dot absolute left-0 top-[9px] h-[9px] w-[9px] -translate-x-1/2 rounded-full" />
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
          <span className="education-status">{texts[lang].status}</span>
        </div>
      </div>
    </section>
  );
}

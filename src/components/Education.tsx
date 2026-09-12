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
      <h2 id="education-heading" className="section-heading">{texts[lang].title}</h2>

      <div className="education-record">
        <div className="education-main">
          <h3>
            {texts[lang].uniCourse}
          </h3>
          <p className="education-meta">
            <span>{texts[lang].uni}</span>
            <span aria-hidden="true"> · </span>
            <span>{texts[lang].uniType}</span>
          </p>
        </div>
        <span className="education-status">{texts[lang].status}</span>
      </div>
    </section>
  );
}

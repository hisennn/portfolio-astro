'use client';

import { useLanguage } from '../hooks/useLanguage';

const texts = {
  pt: {
    title: 'Experiência',
    remote: 'Remoto',
    onsite: 'Presencial'
  },
  en: {
    title: 'Experience',
    remote: 'Remote',
    onsite: 'On-site'
  }
} as const;

const experiences = [
  {
    company: 'Baltimore Re-Construction, LLC',
    role: { pt: 'Assistente Operacional', en: 'Operations Assistant' },
    date: { pt: 'out 2025 - presente', en: 'oct 2025 - present' },
    items: {
      pt: [
        'Criei o site da empresa usando Squarespace, com foco em SEO',
        'Desenvolvo o BRC Client Portal para organizar clientes, obras, arquivos e comunicação com clientes',
        'Ajudo com planilhas e organização interna',
        'Colaboro com ideias para otimizar processos e organizar o fluxo de trabalho',
        'Apoio em marketing e divulgação'
      ],
      en: [
        'Built the company website using Squarespace, with a focus on SEO',
        'Developing the BRC Client Portal to organize clients, jobs, files, and client communication',
        'Helping with spreadsheets and internal organization',
        'Collaborating with ideas to optimize processes and organize workflow',
        'Supporting marketing and outreach'
      ]
    },
    locationDetails: { pt: 'Baltimore, MD, EUA', en: 'Baltimore, MD, USA' },
    type: 'remote' as const
  },
  {
    company: 'Freelancer',
    role: { pt: 'Desenvolvedor Web', en: 'Web Developer' },
    date: { pt: 'abr 2025 - presente', en: 'apr 2025 - present' },
    items: {
      pt: [
        'Criação e manutenção de sites e pequenos sistemas web',
        'Layouts responsivos e ajustes usando HTML, CSS, JavaScript e React',
        'Atendimento a clientes de forma independente'
      ],
      en: [
        'Building and maintaining websites and small web systems',
        'Responsive layouts and adjustments using HTML, CSS, JavaScript and React',
        'Handling clients independently'
      ]
    },
    locationDetails: null
  },
  {
    company: 'Trail Dev',
    role: { pt: 'Estagiário', en: 'Intern' },
    date: { pt: 'mar 2025 - jul 2025', en: 'mar 2025 - jul 2025' },
    items: {
      pt: [
        'Acompanhei o dia a dia de um escritório de programação',
        'Converti um site de Ruby on Rails para Next.js (Pluralsign)',
        'Ajustes em site com Strapi para gestão de conteúdos (Inovaice)'
      ],
      en: [
        'Followed the daily routine of a software development office',
        'Converted a website from Ruby on Rails to Next.js (Pluralsign)',
        'Adjustments to a Strapi site for content management (Inovaice)'
      ]
    },
    locationDetails: { pt: 'Batatais, SP, BR', en: 'Batatais, SP, BR' },
    type: 'onsite' as const
  }
];

export default function Experience() {
  const { lang } = useLanguage();

  return (
    <section>
      <div className="flex flex-col gap-8">
        <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight text-[var(--text-primary)]">
          {texts[lang].title}
        </h2>

        <div className="flex flex-col divide-y divide-[var(--border)] border-t border-[var(--border)] pt-2">
          {experiences.map((exp) => (
            <div key={exp.company} className="flex flex-col gap-5 py-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex min-w-0 flex-col gap-1">
                  <h3 className="text-[20px] md:text-[23px] font-body font-semibold text-[var(--text-primary)] tracking-tight leading-tight">
                    {exp.role[lang]}
                  </h3>

                  <span className="text-[17px] md:text-[19px] font-body font-medium tracking-normal leading-tight text-[var(--accent)]">
                    {exp.company}
                  </span>

                  {(exp.locationDetails || ('type' in exp && exp.type)) && (
                    <div className="flex flex-wrap items-center gap-1.5 text-[14px] font-heading font-semibold tracking-normal text-[var(--text-secondary)] opacity-85">
                      {exp.locationDetails && <span>{exp.locationDetails[lang]}</span>}
                      {exp.locationDetails && 'type' in exp && exp.type && (
                        <span>·</span>
                      )}
                      {'type' in exp && exp.type && <span>{texts[lang][exp.type]}</span>}
                    </div>
                  )}
                </div>

                <span className="text-[12px] font-heading font-semibold tracking-normal text-[var(--text-muted)] whitespace-nowrap md:shrink-0 md:pt-1.5">
                  {exp.date[lang]}
                </span>
              </div>

              <ul className="text-[16px] font-body font-normal text-[var(--text-secondary)] leading-relaxed space-y-2 list-disc list-outside ml-4 marker:text-[var(--text-muted)]">
                {exp.items[lang].map((item, i) => (
                  <li key={i} className="pl-1">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

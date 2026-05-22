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
    role: { pt: 'Operations & Web Developer', en: 'Operations & Web Developer' },
    date: { pt: 'out 2025 - presente', en: 'oct 2025 - present' },
    items: {
      pt: [
        'Desenvolvo o BRC Client Portal para organizar clientes, obras, arquivos e comunicação com clientes',
        'Criei o site da empresa usando Astro, Tailwind e Cloudflare e cuidei da parte de SEO',
        'Ajudo com planilhas e organização interna',
        'Colaboro com ideias para otimizar processos e organizar o fluxo de trabalho',
        'Apoio em marketing e divulgação'
      ],
      en: [
        'Developing the BRC Client Portal to organize clients, jobs, files, and client communication',
        'Built the company website using Astro, Tailwind, and Cloudflare and handled SEO',
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
      <div className="flex flex-col gap-6">
        <h2 className="text-xs font-body font-medium uppercase tracking-[0.1em] text-[var(--text-muted)]">
          {texts[lang].title}
        </h2>

        <div className="experience-timeline relative ml-0.5 flex flex-col gap-10 pl-6">
          {experiences.map((exp) => (
            <div key={exp.company} className="group relative flex flex-col gap-3">
              <div className="experience-timeline-dot absolute left-[-24px] top-[9px] h-[9px] w-[9px] -translate-x-1/2 rounded-full transition-all duration-300 group-hover:scale-125" />

              <div className="flex flex-col gap-1.5 md:flex-row md:items-start md:justify-between w-full">
                <div className="flex min-w-0 flex-col gap-0.5">
                  <h3 className="text-[17px] font-body font-medium text-[var(--text-primary)] tracking-tight leading-snug">
                    {exp.role[lang]}
                  </h3>

                  <span className="text-[16px] font-body font-normal text-[var(--text-secondary)]">
                    {exp.company}
                  </span>

                  {(exp.locationDetails || ('type' in exp && exp.type)) && (
                    <div className="flex flex-wrap items-center gap-1 text-[13px] font-body font-normal text-[var(--text-muted)]">
                      {exp.locationDetails && <span>{exp.locationDetails[lang]}</span>}
                      {exp.locationDetails && 'type' in exp && exp.type && (
                        <span>·</span>
                      )}
                      {'type' in exp && exp.type && <span>{texts[lang][exp.type]}</span>}
                    </div>
                  )}
                </div>

                <span className="text-[12px] font-body font-normal text-[var(--text-muted)] md:shrink-0 md:mt-0.5 self-start">
                  {exp.date[lang]}
                </span>
              </div>

              <ul className="text-[15px] font-body font-normal text-[var(--text-secondary)] leading-[1.7] space-y-1.5">
                {exp.items[lang].map((item, i) => (
                  <li key={i} className="relative pl-4 before:content-['–'] before:absolute before:left-0 before:text-[var(--text-muted)]">
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

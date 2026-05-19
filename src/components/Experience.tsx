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
      <div className="flex flex-col gap-8">
        <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight text-[var(--text-primary)]">
          {texts[lang].title}
        </h2>

        <div className="border-t border-[var(--border)] pt-10">
          <div className="flex flex-col gap-12 border-l border-[var(--border)] pl-6 sm:pl-8 ml-1.5 relative w-full">
            {experiences.map((exp) => (
              <div key={exp.company} className="relative flex flex-col gap-4">
                <div className="absolute -left-[31px] sm:-left-[39px] top-2.5 w-3 h-3 bg-[var(--bg-primary)] border-2 border-[var(--accent)] rounded-full transition-transform duration-300 hover:scale-125" />
                
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between w-full">
                  <div className="flex min-w-0 flex-col gap-1">
                    <h3 className="text-[20px] md:text-[22px] font-body font-semibold text-[var(--text-primary)] tracking-tight leading-tight">
                      {exp.role[lang]}
                    </h3>

                    <span className="text-[16px] md:text-[18px] font-body font-medium tracking-normal leading-tight text-[var(--accent)]">
                      {exp.company}
                    </span>

                    {(exp.locationDetails || ('type' in exp && exp.type)) && (
                      <div className="flex flex-wrap items-center gap-1.5 text-[13px] font-heading font-bold tracking-normal text-[var(--text-secondary)] opacity-85">
                        {exp.locationDetails && <span>{exp.locationDetails[lang]}</span>}
                        {exp.locationDetails && 'type' in exp && exp.type && (
                          <span>·</span>
                        )}
                        {'type' in exp && exp.type && <span>{texts[lang][exp.type]}</span>}
                      </div>
                    )}
                  </div>

                  <span className="text-[12px] font-heading font-bold uppercase tracking-wider text-[var(--text-muted)] bg-[var(--bg-secondary)] px-2 py-1 select-none md:shrink-0 md:mt-1 self-start md:self-auto">
                    {exp.date[lang]}
                  </span>
                </div>

                <ul className="text-[15px] font-body font-normal text-[var(--text-secondary)] leading-relaxed space-y-2.5">
                  {exp.items[lang].map((item, i) => (
                    <li key={i} className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:border before:border-[var(--text-muted)]/60 before:bg-transparent">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

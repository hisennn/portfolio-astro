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
        'Desenvolvo e mantenho o BRC Client Portal para organizar clientes, obras, arquivos e comunicação com clientes',
        'Cuido do site da empresa, incluindo manutenção, deploy na Cloudflare, atualizações de conteúdo e SEO técnico',
        'Mantenho planilhas e organização interna para manter dados de obras e clientes consistentes',
        'Apoio em marketing, divulgação e ideias para otimizar processos'
      ],
      en: [
        'Develop and maintain the BRC Client Portal to organize clients, projects, files, and client communication',
        'Manage the company website, including maintenance, Cloudflare deployment, content updates, and technical SEO',
        'Maintain spreadsheets and internal workflows to keep project and client data consistent',
        'Support marketing, outreach, and ideas to improve internal processes'
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
        'Construo aplicações web responsivas em React e TypeScript a partir dos requisitos do cliente',
        'Defino escopo, gerencio ciclos de revisão e entrego projetos de forma independente'
      ],
      en: [
        'Build responsive React and TypeScript web applications from client requirements through delivery',
        'Scope implementation work, manage revision cycles, and deliver projects independently'
      ]
    },
    locationDetails: { pt: 'Brasil', en: 'Brazil' },
    type: 'remote' as const
  },
  {
    company: 'Trail Dev',
    role: { pt: 'Estagiário em Desenvolvimento de Software', en: 'Software Development Intern' },
    date: { pt: 'mar 2025 - jul 2025', en: 'mar 2025 - jul 2025' },
    items: {
      pt: [
        'Reconstruí um site Ruby on Rails em Next.js para a Pluralsign, preservando páginas e funcionalidades',
        'Atualizei um site com Strapi para a Inovaice, apoiando gestão de conteúdo e ajustes de frontend'
      ],
      en: [
        'Rebuilt a Ruby on Rails website in Next.js for Pluralsign, preserving its existing pages and functionality',
        'Updated a Strapi-based website for Inovaice to support content management and frontend adjustments'
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
        <h2 className="text-[15px] font-body font-medium uppercase tracking-[0.1em] text-[var(--text-muted)]">
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

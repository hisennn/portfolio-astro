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
    role: { pt: 'Desenvolvedor Web e Operações', en: 'Operations & Web Developer' },
    date: { pt: 'out. 2025 - atual', en: 'Oct. 2025 - Present' },
    items: {
      pt: [
        'Desenvolvo o portal interno da BRC para centralizar clientes, projetos, arquivos, comentários e comunicação',
        'Mantenho o site público da empresa, ajustando conteúdo, páginas de marketing e SEO técnico quando necessário',
        'Organizo dados de projetos e clientes entre planilhas, site e fluxo interno'
      ],
      en: [
        "Build BRC's internal portal to keep clients, projects, files, comments, and communication in one place",
        'Maintain the public company website, updating content, marketing pages, and technical SEO when needed',
        'Keep project and client data organized across spreadsheets, the website, and the internal workflow'
      ]
    },
    locationDetails: { pt: 'Baltimore, MD, EUA', en: 'Baltimore, MD, USA' },
    type: 'remote' as const
  },
  {
    company: 'Freelancer',
    role: { pt: 'Desenvolvedor Web', en: 'Web Developer' },
    date: { pt: 'abr. 2025 - atual', en: 'Apr. 2025 - Present' },
    items: {
      pt: [
        'Desenvolvo sites e pequenas aplicações em React e TypeScript, cuidando de interface, lógica de front-end e entrega',
        'Trabalho direto com clientes para definir escopo, implementar ajustes e fechar o projeto'
      ],
      en: [
        'Build websites and small React and TypeScript applications, covering interface work, frontend logic, and delivery',
        'Work directly with clients to define scope, implement revisions, and finish the project'
      ]
    },
    locationDetails: { pt: 'Brasil', en: 'Brazil' },
    type: 'remote' as const
  },
  {
    company: 'Trail Dev',
    role: { pt: 'Estagiário em Desenvolvimento de Software', en: 'Software Development Intern' },
    date: { pt: 'mar. 2025 - jul. 2025', en: 'Mar. 2025 - Jul. 2025' },
    items: {
      pt: [
        'Recriei em Next.js um site da Pluralsign originalmente desenvolvido em Ruby on Rails, preservando páginas e funcionalidades',
        'Fiz atualizações no CMS Strapi e no front-end do site da Inovaice'
      ],
      en: [
        'Rebuilt a Ruby on Rails website in Next.js for Pluralsign, preserving its existing pages and functionality',
        "Made CMS and frontend updates to Inovaice's Strapi-based website"
      ]
    },
    locationDetails: { pt: 'Batatais, SP, Brasil', en: 'Batatais, SP, Brazil' },
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

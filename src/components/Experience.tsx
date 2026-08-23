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
        'Desenvolvo e mantenho a aplicação interna da BRC para gerenciar clientes, projetos, arquivos e comunicação.',
        'Cuido do site público, dos deploys na Cloudflare, das atualizações de conteúdo, do SEO técnico e do Perfil da Empresa no Google (Google Business Profile).',
        'Organizo planilhas e processos internos ligados aos dados de projetos e clientes.'
      ],
      en: [
        "I build and maintain BRC's internal web application for managing clients, projects, files, and communication.",
        'I maintain the company website, update its content and technical SEO, manage Cloudflare deployments, and look after its Google Business Profile.',
        'I keep the spreadsheets and project records used by the team organized.'
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
        'Desenvolvo sites responsivos e aplicações web de pequeno porte com React e TypeScript, incluindo layout, lógica de front-end e deploy.',
        'Trabalho diretamente com clientes para definir escopo, implementar ajustes e entregar projetos de forma independente.'
      ],
      en: [
        'I build responsive websites and small web applications in React and TypeScript, from layout and frontend logic through deployment.',
        'I work directly with clients to agree on the scope, make revisions, and deliver each project.'
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
        'Recriei em Next.js um site da Pluralsign originalmente desenvolvido em Ruby on Rails, preservando as páginas e funcionalidades existentes.',
        'Fiz atualizações no CMS Strapi e no front-end do site da Inovaice.'
      ],
      en: [
        'I rebuilt a Ruby on Rails website in Next.js for Pluralsign while preserving its existing pages and functionality.',
        "I made CMS and frontend updates to Inovaice's Strapi-based website."
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

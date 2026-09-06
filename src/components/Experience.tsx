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
    role: { pt: 'Desenvolvedor Full Stack e Operações', en: 'Full-Stack Developer & Operations' },
    date: { pt: 'out. 2025 - atual', en: 'Oct 2025 - Present' },
    items: {
      pt: [
        'Desenvolvo e mantenho o BRC Client Portal, usado para organizar clientes, projetos, arquivos, seleções de materiais, contratos, notificações e comunicação.',
        'Criei e mantenho o site da empresa, incluindo conteúdo, SEO técnico, deploys na Cloudflare e o Perfil da Empresa no Google.',
        'Apoio as operações diárias organizando planilhas, documentos e informações de clientes, projetos, materiais e estimativas.'
      ],
      en: [
        'Develop and maintain the BRC Client Portal for organizing clients, projects, files, material selections, contracts, notifications, and communication.',
        'Built and maintain the company website, including content updates, technical SEO, Cloudflare deployments, and its Google Business Profile.',
        'Support daily operations by organizing spreadsheets, documents, and information related to clients, projects, materials, and estimates.'
      ]
    },
    locationDetails: { pt: 'Baltimore, MD, EUA', en: 'Baltimore, MD, USA' },
    type: 'remote' as const
  },
  {
    company: 'Freelancer',
    role: { pt: 'Desenvolvedor Web', en: 'Web Developer' },
    date: { pt: 'abr. 2025 - atual', en: 'Apr 2025 - Present' },
    items: {
      pt: [
        'Desenvolvo sites responsivos e aplicações web para profissionais e pequenas empresas com React, Next.js, TypeScript e Tailwind CSS.',
        'Levanto requisitos, defino o escopo, implemento ajustes e publico os projetos na Vercel.'
      ],
      en: [
        'Build responsive websites and web applications for professionals and small businesses using React, Next.js, TypeScript, and Tailwind CSS.',
        'Gather requirements, define scope, implement revisions, and deploy projects to Vercel.'
      ]
    },
    locationDetails: { pt: 'Brasil', en: 'Brazil' },
    type: 'remote' as const
  },
  {
    company: 'Trail Dev',
    role: { pt: 'Estagiário em Desenvolvimento de Software', en: 'Software Development Intern' },
    date: { pt: 'mar. 2025 - jul. 2025', en: 'Mar 2025 - Jul 2025' },
    items: {
      pt: [
        'Recriei em Next.js um site da Pluralsign originalmente desenvolvido em Ruby on Rails, preservando as páginas e funcionalidades existentes.',
        'Fiz atualizações no CMS Strapi e no front-end do site da Inovaice.'
      ],
      en: [
        'Rebuilt a Ruby on Rails website in Next.js for Pluralsign while preserving its existing pages and functionality.',
        "Updated content and frontend components on Inovaice's Strapi-based website."
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
        <h2 className="section-heading">
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

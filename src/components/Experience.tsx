'use client';

import Icon from './Icon';
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
    role: { pt: 'Desenvolvedor Web e Operações', en: 'Web Developer & Operations' },
    date: { pt: 'out. 2025 — atual', en: 'Oct 2025 — Present' },
    items: {
      pt: [
        'Desenvolvo e mantenho o Portal do Cliente BRC para gerenciar clientes, projetos, etapas, arquivos e seleção de materiais, com React Router, TypeScript e PostgreSQL.',
        'Implementei autenticação, permissões de acesso, assinatura eletrônica de contratos com SignWell e atualizações em tempo real com Ably.',
        'Mantenho testes automatizados com node:test e Playwright e um fluxo de testes, verificação de tipos, build e deploy no GitHub Actions.',
        'Criei e mantenho o site da empresa, incluindo conteúdo, SEO técnico e deploys na Cloudflare.',
        'Cuido do Perfil da Empresa no Google e do Instagram, além da comunicação com clientes. O site recebeu contatos de potenciais clientes e cliques provenientes do perfil no Google.',
        'Apoio as operações diárias organizando planilhas, documentos e informações de clientes, projetos, materiais e estimativas.'
      ],
      en: [
        'Develop and maintain the BRC Client Portal for managing clients, projects, phases, files, and material selections, using React Router, TypeScript, and PostgreSQL.',
        'Implemented authentication, access permissions, electronic contract signing with SignWell, and real-time updates with Ably.',
        'Maintain automated tests with node:test and Playwright and a GitHub Actions workflow for testing, type checking, builds, and deployment.',
        'Develop and maintain the company website, including content updates, technical SEO, and Cloudflare deployments.',
        'Manage the Google Business Profile and Instagram account, and communicate with clients. The website has received prospective customer inquiries and clicks from the Google profile.',
        'Support daily operations by organizing spreadsheets, documents, and information related to clients, projects, materials, and estimates.'
      ]
    },
    locationDetails: { pt: 'Baltimore, MD, EUA', en: 'Baltimore, MD, USA' },
    type: 'remote' as const
  },
  {
    company: 'Freelancer',
    role: { pt: 'Desenvolvedor Web', en: 'Web Developer' },
    date: { pt: 'abr. 2025 — atual', en: 'Apr 2025 — Present' },
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
    date: { pt: 'mar. 2025 — jul. 2025', en: 'Mar 2025 — Jul 2025' },
    items: {
      pt: [
        'Recriei em Next.js um site da Pluralsign originalmente desenvolvido em Ruby on Rails, preservando as páginas e funcionalidades existentes.',
        'Atualizei o CMS Strapi e o front-end do site da Inovaice.'
      ],
      en: [
        'Rebuilt a Ruby on Rails website in Next.js for Pluralsign while preserving its existing pages and functionality.',
        "Updated the Strapi CMS and frontend of Inovaice's website."
      ]
    },
    locationDetails: { pt: 'Batatais, SP, Brasil', en: 'Batatais, SP, Brazil' },
    type: 'onsite' as const
  }
];

export default function Experience() {
  const { lang } = useLanguage();

  return (
    <section id="experience" className="experience-section" aria-labelledby="experience-heading">
      <h2 id="experience-heading" className="section-heading">{texts[lang].title}</h2>
      <div className="experience-records">
        {experiences.map((exp) => (
          <article key={exp.company} className="experience-entry">
            <div className="experience-main">
              <div className="experience-entry-heading">
                <div className="experience-entry-meta">
                  <h3>{exp.role[lang]}</h3>
                  <p className="experience-company">{exp.company}</p>
                  <p className="experience-place">
                    <Icon name="map-pin" size={14} />
                    <span>
                      {exp.locationDetails[lang]} · {texts[lang][exp.type]}
                    </span>
                  </p>
                </div>
                <p className="experience-date">{exp.date[lang]}</p>
              </div>
              <ul>
                {exp.items[lang].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

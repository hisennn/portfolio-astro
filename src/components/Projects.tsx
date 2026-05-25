'use client';

import { useLanguage } from '../hooks/useLanguage';
import BoxIcon from './BoxIcon';

const texts = {
  pt: {
    title: 'Projetos',
    brcPortal:
      'Portal fechado para a Baltimore Re-Construction gerenciar clientes, obras, etapas, arquivos, comentários, escolhas de materiais, assinatura de contratos e consultas administrativas sobre projetos.',
    coord:
      'Ferramenta para salvar e organizar coordenadas no Minecraft, com uma experiência simples de lista e consulta rápida.',
    baltre:
      'Site institucional para a Baltimore Re-Construction apresentar serviços, áreas atendidas e canais de contato.',
    isaPsi:
      'Site institucional para Isadora Tomazini Psicóloga apresentar atendimento presencial e online, áreas de atuação, informações profissionais e contato com formulário.',
    ana:
      'Portfólio profissional para arquiteta, com foco em apresentação visual dos projetos e contato direto.',
    previewTitle: 'portal / overview',
    clients: 'clientes',
    projects: 'projetos',
    files: 'arquivos',
    realtime: 'tempo real'
  },
  en: {
    title: 'Projects',
    brcPortal:
      'Private portal for Baltimore Re-Construction to manage clients, projects, phases, files, comments, material selections, contract signing, and admin questions about project data.',
    coord:
      'Tool for saving and organizing Minecraft coordinates, with a simple list-based flow for quick lookup.',
    baltre:
      'Company website for Baltimore Re-Construction, focused on services, service areas, and contact paths.',
    isaPsi:
      'Professional website for Isadora Tomazini Psicóloga, presenting in-person and online care, practice areas, professional information, and a contact form.',
    ana:
      'Professional portfolio for an architect, focused on presenting project work clearly and making contact easy.',
    previewTitle: 'portal / overview',
    clients: 'clients',
    projects: 'projects',
    files: 'files',
    realtime: 'real time'
  }
} as const;

const projects = [
  {
    name: 'BRC Client Portal',
    tech: ['React Router 7', 'TypeScript', 'Cloudflare Workers', 'Neon', 'Drizzle', 'Ably', 'SignWell'],
    descKey: 'brcPortal' as const,
    variant: 'featured' as const
  },
  {
    name: 'Baltimore Re-Construction Website',
    url: 'https://baltimorereconstruction.com/',
    tech: ['Astro', 'Tailwind', 'Cloudflare'],
    descKey: 'baltre' as const
  },
  {
    name: 'Isadora Tomazini Psicóloga',
    url: 'https://isadoratomazini.com.br/',
    tech: ['Astro', 'Cloudflare Pages Functions', 'Mailgun'],
    descKey: 'isaPsi' as const
  },
  {
    name: 'Ana Zabala Portfolio',
    url: 'https://anazabala-arquiteta.vercel.app/',
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    descKey: 'ana' as const
  },
  {
    name: 'Minecraft Coordinates Manager',
    url: 'https://mc-coordinate-saver.vercel.app/',
    tech: ['HTML', 'CSS', 'JS'],
    descKey: 'coord' as const
  }
];

export default function Projects() {
  const { lang } = useLanguage();
 
  return (
    <section>
      <div className="flex flex-col gap-6">
        <h2 className="text-[15px] font-body font-medium uppercase tracking-[0.1em] text-[var(--text-muted)]">
          {texts[lang].title}
        </h2>
 
        <div className="w-full">
          <div className="project-card-grid">
            {projects.map((project) => {
              const isLinked = 'url' in project && project.url;
              const isFeatured = 'variant' in project && project.variant === 'featured';
              const CardElement = isLinked ? 'a' : 'article';
              const cardProps = isLinked
                ? {
                    href: project.url,
                    target: '_blank',
                    rel: 'noopener noreferrer'
                  }
                : {};
 
              return (
                <CardElement
                  key={project.name}
                  className={[
                    'project-card',
                    isFeatured ? 'project-card-featured' : '',
                    isLinked ? 'project-card-linked' : '',
                    !isLinked ? 'project-card-hoverable' : ''
                  ].filter(Boolean).join(' ')}
                  {...cardProps}
                >
                  <div className="project-card-body h-full justify-between">
                    <div className="flex flex-col gap-3">
                      {isLinked ? (
                        <span className="project-link-shell">
                          <span className="project-link-text text-[17px] font-body font-medium tracking-tight leading-snug">
                            {project.name}
                            <BoxIcon
                              name="bx-arrow-up-right-stroke"
                              size={13}
                              className="project-link-icon shrink-0"
                            />
                          </span>
                          <span aria-hidden="true" className="project-link-bar" />
                        </span>
                      ) : (
                        <span className="project-link-static text-[17px] font-body font-medium tracking-tight leading-snug">
                          {project.name}
                        </span>
                      )}
 
                      <p className="project-card-copy text-[15px] leading-[1.65]">
                        {texts[lang][project.descKey]}
                      </p>
 
                      {isFeatured && (
                        <div className="project-card-preview" aria-hidden="true">
                          <div className="project-card-preview-head">
                            <div className="flex gap-1.5">
                              <span />
                              <span />
                              <span />
                            </div>
                            <strong>
                              {texts[lang].previewTitle}
                            </strong>
                          </div>
                          <div className="project-card-preview-grid">
                            <span>
                              <BoxIcon name="bx-user" size={13} className="text-[var(--text-muted)]" />
                              {texts[lang].clients}
                            </span>
                            <span>
                              <BoxIcon name="bx-layout" size={13} className="text-[var(--text-muted)]" />
                              {texts[lang].projects}
                            </span>
                            <span>
                              <BoxIcon name="bx-folder" size={13} className="text-[var(--text-muted)]" />
                              {texts[lang].files}
                            </span>
                            <span>
                              <BoxIcon name="bx-broadcast" size={13} className="text-[var(--text-muted)]" />
                              {texts[lang].realtime}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
 
                    <div className="project-card-footer">
                      <div className="project-card-tech">
                        {project.tech.map((item, index) => (
                          <span key={item}>
                            {item}
                            {index < project.tech.length - 1 ? ',' : ''}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardElement>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

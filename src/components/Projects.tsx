'use client';

import { useLanguage } from '../hooks/useLanguage';
import BoxIcon from './BoxIcon';
import type { MouseEvent } from 'react';

const texts = {
  pt: {
    title: 'Projetos',
    brcPortal:
      'Portal fechado para a Baltimore Re-Construction gerenciar clientes, projetos, etapas, arquivos, comentários e escolhas de materiais em tempo real.',
    coord:
      'Ferramenta para salvar e organizar coordenadas no Minecraft, com uma experiência simples de lista e consulta rápida.',
    baltre:
      'Site institucional para a Baltimore Re-Construction apresentar serviços, áreas atendidas e canais de contato.',
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
      'Private portal for Baltimore Re-Construction to manage clients, projects, phases, files, comments, and material selections in real time.',
    coord:
      'Tool for saving and organizing Minecraft coordinates, with a simple list-based flow for quick lookup.',
    baltre:
      'Company website for Baltimore Re-Construction, focused on services, service areas, and contact paths.',
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
    tech: ['React Router 7', 'TypeScript', 'Cloudflare Workers', 'Neon', 'Drizzle', 'Ably'],
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

  const handleCardLight = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--project-light-x', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--project-light-y', `${event.clientY - rect.top}px`);
  };

  return (
    <section>
      <div className="flex flex-col gap-8">
        <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight text-[var(--text-primary)]">
          {texts[lang].title}
        </h2>

        <div className="border-t border-[var(--border)] pt-8">
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
                  onMouseMove={handleCardLight}
                  {...cardProps}
                >
                  <div className="project-card-body">
                    {isLinked ? (
                      <span className="project-link-shell">
                        <span className="project-link-text text-[19px] md:text-[22px] font-body font-semibold tracking-tight leading-tight">
                          {project.name}
                          <BoxIcon
                            name="bx-link-external"
                            size={15}
                            className="project-link-icon shrink-0"
                          />
                        </span>
                        <span aria-hidden="true" className="project-link-bar" />
                      </span>
                    ) : (
                      <span className="project-link-static text-[19px] md:text-[22px] font-body font-semibold tracking-tight leading-tight">
                        {project.name}
                      </span>
                    )}

                    <p className="project-card-copy">
                      {texts[lang][project.descKey]}
                    </p>

                    {isFeatured && (
                      <div className="project-card-preview" aria-hidden="true">
                        <div className="project-card-preview-head">
                          <span />
                          <span />
                          <span />
                          <strong>{texts[lang].previewTitle}</strong>
                        </div>
                        <div className="project-card-preview-grid">
                          <span>
                            <BoxIcon name="bx-user" size={15} />
                            {texts[lang].clients}
                          </span>
                          <span>
                            <BoxIcon name="bx-layout" size={15} />
                            {texts[lang].projects}
                          </span>
                          <span>
                            <BoxIcon name="bx-folder" size={15} />
                            {texts[lang].files}
                          </span>
                          <span>
                            <BoxIcon name="bx-broadcast" size={15} />
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
                </CardElement>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

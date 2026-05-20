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
      'Private portal for Baltimore Re-Construction to manage clients, projects, phases, files, comments, and material selections in real time.',
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
 
  const handleCardLight = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--project-light-x', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--project-light-y', `${event.clientY - rect.top}px`);
  };
 
  return (
    <section className="border-t border-[var(--border)] pt-12 md:pt-16">
      <div className="flex flex-col gap-8">
        <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight text-[var(--text-primary)]">
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
                  onMouseMove={handleCardLight}
                  {...cardProps}
                >
                  <div className="project-card-body h-full justify-between">
                    <div className="flex flex-col gap-4">
                      {isLinked ? (
                        <span className="project-link-shell">
                          <span className="project-link-text text-[18px] md:text-[20px] font-body font-semibold tracking-tight leading-tight">
                            {project.name}
                            <BoxIcon
                              name="bx-arrow-up-right-stroke"
                              size={15}
                              className="project-link-icon shrink-0"
                            />
                          </span>
                          <span aria-hidden="true" className="project-link-bar" />
                        </span>
                      ) : (
                        <span className="project-link-static text-[18px] md:text-[20px] font-body font-semibold tracking-tight leading-tight">
                          {project.name}
                        </span>
                      )}
 
                      <p className="project-card-copy text-[14px] md:text-[15px] leading-relaxed">
                        {texts[lang][project.descKey]}
                      </p>
 
                      {isFeatured && (
                        <div className="project-card-preview mt-4 border border-[var(--border)]" aria-hidden="true">
                          <div className="project-card-preview-head bg-[var(--bg-secondary)]/50 px-4 py-2 border-b border-[var(--border)] flex items-center gap-2">
                            <div className="flex gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#e46f61] opacity-90" />
                              <span className="w-2.5 h-2.5 rounded-full bg-[#d8ad4f] opacity-90" />
                              <span className="w-2.5 h-2.5 rounded-full bg-[#63b876] opacity-90" />
                            </div>
                            <strong className="text-[10px] font-heading font-bold tracking-[0.12em] uppercase text-[var(--text-muted)] ml-2">
                              {texts[lang].previewTitle}
                            </strong>
                          </div>
                          <div className="project-card-preview-grid grid grid-cols-2 gap-2 p-3 bg-[var(--bg-primary)]">
                            <span className="flex items-center gap-2.5 border border-[var(--border-subtle)] bg-[var(--card-bg)] px-3 py-2 text-xs font-heading font-semibold text-[var(--text-secondary)] rounded-sm">
                              <BoxIcon name="bx-user" size={14} className="text-[var(--accent)]" />
                              {texts[lang].clients}
                            </span>
                            <span className="flex items-center gap-2.5 border border-[var(--border-subtle)] bg-[var(--card-bg)] px-3 py-2 text-xs font-heading font-semibold text-[var(--text-secondary)] rounded-sm">
                              <BoxIcon name="bx-layout" size={14} className="text-[var(--accent)]" />
                              {texts[lang].projects}
                            </span>
                            <span className="flex items-center gap-2.5 border border-[var(--border-subtle)] bg-[var(--card-bg)] px-3 py-2 text-xs font-heading font-semibold text-[var(--text-secondary)] rounded-sm">
                              <BoxIcon name="bx-folder" size={14} className="text-[var(--accent)]" />
                              {texts[lang].files}
                            </span>
                            <span className="flex items-center gap-2.5 border border-[var(--border-subtle)] bg-[var(--card-bg)] px-3 py-2 text-xs font-heading font-semibold text-[var(--text-secondary)] rounded-sm">
                              <BoxIcon name="bx-broadcast" size={14} className="text-[var(--accent)]" />
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

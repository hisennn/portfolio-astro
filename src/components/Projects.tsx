'use client';

import { useLanguage } from '../hooks/useLanguage';
import BoxIcon from './BoxIcon';

const texts = {
  pt: {
    title: 'Projetos',
    brcPortal:
      'Portal fechado para a Baltimore Re-Construction gerenciar clientes, obras, etapas, arquivos, comentários, escolhas de materiais, assinatura de contratos e consultas administrativas sobre projetos.',
    kiromilog:
      'Aplicativo social para acompanhar anime e mangá, com listas pessoais, favoritos, busca de títulos, personagens e usuários, perfis, follows, mensagens e upload de avatar.',
    coord:
      'Ferramenta para salvar e organizar coordenadas no Minecraft, com uma experiência simples de lista e consulta rápida.',
    baltre:
      'Site institucional para a Baltimore Re-Construction apresentar serviços, áreas atendidas e canais de contato.',
    isaPsi:
      'Site institucional para Isadora Tomazini Psicóloga apresentar atendimento presencial e online, áreas de atuação, informações profissionais e contato com formulário.',
    ana:
      'Portfólio profissional para arquiteta, com foco em apresentação visual dos projetos e contato direto.',
    previewTitle: 'portal / overview',
    kiromilogPreviewTitle: 'tracker / social',
    brcBadge: 'Ativo',
    clients: 'clientes',
    projects: 'projetos',
    files: 'arquivos',
    realtime: 'tempo real',
    anime: 'anime',
    manga: 'mangá',
    favorites: 'favoritos',
    messages: 'mensagens'
  },
  en: {
    title: 'Projects',
    brcPortal:
      'Private portal for Baltimore Re-Construction to manage clients, projects, phases, files, comments, material selections, contract signing, and admin questions about project data.',
    kiromilog:
      'Social app for tracking anime and manga, with personal lists, favorites, title, character and user search, profiles, follows, messages, and avatar uploads.',
    coord:
      'Tool for saving and organizing Minecraft coordinates, with a simple list-based flow for quick lookup.',
    baltre:
      'Company website for Baltimore Re-Construction, focused on services, service areas, and contact paths.',
    isaPsi:
      'Professional website for Isadora Tomazini Psicóloga, presenting in-person and online care, practice areas, professional information, and a contact form.',
    ana:
      'Professional portfolio for an architect, focused on presenting project work clearly and making contact easy.',
    previewTitle: 'portal / overview',
    kiromilogPreviewTitle: 'tracker / social',
    brcBadge: 'Active',
    clients: 'clients',
    projects: 'projects',
    files: 'files',
    realtime: 'real time',
    anime: 'anime',
    manga: 'manga',
    favorites: 'favorites',
    messages: 'messages'
  }
} as const;

const projects = [
  {
    name: 'BRC Client Portal',
    tech: ['React Router 7', 'TypeScript', 'Cloudflare Workers', 'Neon', 'Drizzle', 'Zod', 'Ably', 'Vite', 'SignWell'],
    descKey: 'brcPortal' as const,
    variant: 'featured' as const
  },
  {
    name: 'Kiromilog',
    url: 'https://kiromilog.vercel.app/',
    tech: ['Next.js 16', 'TypeScript', 'Neon Auth', 'Neon Postgres', 'Drizzle', 'UploadThing', 'Pusher', 'Jikan API'],
    descKey: 'kiromilog' as const,
    variant: 'kiromilog' as const
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
              const hasPreview = 'variant' in project && ['featured', 'kiromilog'].includes(project.variant);
              const isFeatured = 'variant' in project && project.variant === 'featured';
              const isKiromilog = 'variant' in project && project.variant === 'kiromilog';
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
                    hasPreview ? 'project-card-featured' : '',
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
                        <div className="project-card-preview project-card-preview-brc" aria-hidden="true">
                          <div className="project-card-preview-head">
                            <div className="flex gap-1.5">
                              <span />
                              <span />
                              <span />
                            </div>
                            <strong>{texts[lang].previewTitle}</strong>
                          </div>
                          <div className="brc-preview-body">
                            <div className="brc-preview-sidebar">
                              {(['bx-layout', 'bx-user', 'bx-folder', 'bx-file-blank'] as const).map((icon, i) => (
                                <div key={icon} className={`brc-preview-nav-item${i === 0 ? ' brc-preview-nav-active' : ''}`}>
                                  <BoxIcon name={icon} size={10} />
                                  <span className="brc-preview-nav-label" />
                                </div>
                              ))}
                            </div>
                            <div className="brc-preview-main">
                              <div className="brc-preview-card">
                                <div className="brc-preview-card-header">
                                  <div className="brc-preview-card-title-row">
                                    <span className="brc-preview-skeleton brc-preview-card-name" />
                                    <span className="brc-preview-badge">{texts[lang].brcBadge}</span>
                                  </div>
                                  <span className="brc-preview-skeleton brc-preview-card-sub" />
                                </div>
                                <div className="brc-preview-progress-track">
                                  <div className="brc-preview-progress-fill" />
                                </div>
                                <div className="brc-preview-stats">
                                  <span>
                                    <BoxIcon name="bx-layer" size={10} className="brc-stat-icon" />
                                    <span className="brc-preview-skeleton brc-preview-stat-label" />
                                  </span>
                                  <span>
                                    <BoxIcon name="bx-folder" size={10} className="brc-stat-icon" />
                                    <span className="brc-preview-skeleton brc-preview-stat-label" />
                                  </span>
                                  <span>
                                    <BoxIcon name="bx-broadcast" size={10} className="brc-stat-icon" />
                                    <span className="brc-preview-skeleton brc-preview-stat-label" />
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {isKiromilog && (
                        <div className="project-card-preview project-card-preview-kiromilog" aria-hidden="true">
                          <div className="project-card-preview-head">
                            <div className="flex gap-1.5">
                              <span />
                              <span />
                              <span />
                            </div>
                            <strong>{texts[lang].kiromilogPreviewTitle}</strong>
                          </div>
                          <div className="kiromilog-preview-body">
                            <div className="kiromilog-preview-main">
                              <img
                                src="/sbqd-cape.webp"
                                alt=""
                                className="kiromilog-preview-cover"
                                loading="lazy"
                              />
                              <div className="kiromilog-preview-copy">
                                <span />
                                <span />
                                <span />
                              </div>
                            </div>
                            <div className="kiromilog-preview-grid">
                              <span>
                                <BoxIcon name="bx-tv" size={13} className="text-[var(--text-muted)]" />
                                {texts[lang].anime}
                              </span>
                              <span>
                                <BoxIcon name="bx-book-open" size={13} className="text-[var(--text-muted)]" />
                                {texts[lang].manga}
                              </span>
                              <span>
                                <BoxIcon name="bx-heart" size={13} className="text-[var(--text-muted)]" />
                                {texts[lang].favorites}
                              </span>
                              <span>
                                <BoxIcon name="bx-message-circle" size={13} className="text-[var(--text-muted)]" />
                                {texts[lang].messages}
                              </span>
                            </div>
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

'use client';

import { useLanguage } from '../hooks/useLanguage';
import BoxIcon from './BoxIcon';

const texts = {
  pt: {
    title: 'Projetos',
    open: 'Abrir projeto',
    active: 'Ativo',
    anime: 'anime',
    manga: 'mangá',
    favorites: 'favoritos',
    messages: 'mensagens',
    brcPortal:
      'Portal interno da Baltimore Re-Construction para organizar clientes, projetos, arquivos, seleções de materiais, contratos e comunicação.',
    kiromilog:
      'Aplicação para acompanhar animes e mangás, com listas, perfis, favoritos, mensagens e atualizações em tempo real.',
    baltre:
      'Site institucional da Baltimore Re-Construction com serviços, regiões atendidas, trabalhos realizados e canais de contato.',
    isaPsi:
      'Site profissional da psicóloga Isadora Tomazini, com apresentação do atendimento e canais de contato.',
    ana:
      'Portfólio de arquitetura com os projetos da Ana Zabala e acesso direto aos canais de contato.',
    coord:
      'Ferramenta para salvar, organizar e reencontrar coordenadas do Minecraft.'
  },
  en: {
    title: 'Projects',
    open: 'Open project',
    active: 'Active',
    anime: 'anime',
    manga: 'manga',
    favorites: 'favorites',
    messages: 'messages',
    brcPortal:
      "Baltimore Re-Construction's internal portal for organizing clients, projects, files, material selections, contracts, and communication.",
    kiromilog:
      'An anime and manga tracker with lists, profiles, favorites, messages, and real-time updates.',
    baltre:
      "Baltimore Re-Construction's company website with services, service areas, completed work, and contact options.",
    isaPsi:
      "A professional website for psychologist Isadora Tomazini, presenting her practice and contact options.",
    ana:
      "An architecture portfolio presenting Ana Zabala's projects and contact information.",
    coord:
      'A tool for saving, organizing, and finding Minecraft coordinates.'
  }
} as const;

const projects = [
  {
    name: 'BRC Client Portal',
    href: '/projects/brc-client-portal/',
    tech: ['React Router 7', 'Node.js', 'PostgreSQL', 'Cloudflare'],
    descKey: 'brcPortal' as const,
    visual: 'brc' as const
  },
  {
    name: 'Kiromilog',
    href: '/projects/kiromilog/',
    tech: ['Next.js 16', 'TypeScript', 'Neon', 'Pusher'],
    descKey: 'kiromilog' as const,
    visual: 'kiromilog' as const
  },
  {
    name: 'Baltimore Re-Construction',
    href: '/projects/baltimore-reconstruction/',
    tech: ['Astro 7', 'TypeScript', 'Tailwind', 'Cloudflare'],
    descKey: 'baltre' as const,
    visual: 'baltimore' as const
  },
  {
    name: 'Ana Zabala Portfolio',
    href: '/projects/ana-zabala/',
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    descKey: 'ana' as const,
    visual: 'ana' as const
  },
  {
    name: 'Isadora Tomazini',
    href: '/projects/isadora-tomazini/',
    tech: ['Astro', 'JavaScript', 'CSS'],
    descKey: 'isaPsi' as const,
    visual: 'isadora' as const
  },
  {
    name: 'Coordinate Saver',
    href: '/projects/coordinate-saver/',
    tech: ['HTML', 'CSS', 'JavaScript'],
    descKey: 'coord' as const,
    visual: 'coordinates' as const
  }
] as const;

function PreviewChrome() {
  return (
    <div className="project-card-preview-head" aria-hidden="true">
      <div className="project-preview-lights"><span /><span /><span /></div>
    </div>
  );
}

function ProjectVisual({
  visual,
  copy
}: {
  visual: (typeof projects)[number]['visual'];
  copy: (typeof texts)[keyof typeof texts];
}) {
  if (visual === 'brc') {
    return (
      <div className="project-list-art project-card-preview project-card-preview-brc" aria-hidden="true">
        <PreviewChrome />
        <div className="brc-preview-body">
          <div className="brc-preview-sidebar">
            {(['bx-layout', 'bx-user', 'bx-folder', 'bx-file'] as const).map((icon, index) => (
              <div key={icon} className={`brc-preview-nav-item${index === 0 ? ' brc-preview-nav-active' : ''}`}>
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
                  <span className="brc-preview-badge">{copy.active}</span>
                </div>
                <span className="brc-preview-skeleton brc-preview-card-sub" />
              </div>
              <div className="brc-preview-progress-track"><div className="brc-preview-progress-fill" /></div>
              <div className="brc-preview-stats">
                {(['bx-layers', 'bx-folder', 'bx-broadcast'] as const).map((icon) => (
                  <span key={icon}>
                    <BoxIcon name={icon} size={10} className="brc-stat-icon" />
                    <span className="brc-preview-skeleton brc-preview-stat-label" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (visual === 'kiromilog') {
    return (
      <div className="project-list-art project-card-preview project-card-preview-kiromilog" aria-hidden="true">
        <PreviewChrome />
        <div className="kiromilog-preview-body">
          <div className="kiromilog-preview-main">
            <img src="/sbqd-cape.webp" alt="" className="kiromilog-preview-cover" draggable={false} />
            <div className="kiromilog-preview-copy"><span /><span /><span /></div>
          </div>
          <div className="kiromilog-preview-grid">
            <span><BoxIcon name="bx-tv" size={13} />{copy.anime}</span>
            <span><BoxIcon name="bx-book-open" size={13} />{copy.manga}</span>
            <span><BoxIcon name="bx-heart" size={13} />{copy.favorites}</span>
            <span><BoxIcon name="bx-message-circle" size={13} />{copy.messages}</span>
          </div>
        </div>
      </div>
    );
  }

  if (visual === 'baltimore') {
    return (
      <div className="project-list-art project-card-preview baltimore-preview" aria-hidden="true">
        <PreviewChrome />
        <div className="baltimore-preview-page">
          <div className="baltimore-preview-nav">
            <span className="baltimore-preview-mark">BRC</span>
            <span>HOME</span>
            <span>SERVICES</span>
            <span>WORK</span>
          </div>
          <div className="baltimore-preview-hero">
            <span>OUR SERVICES</span>
            <strong>Built for<br />Baltimore.</strong>
            <i />
          </div>
        </div>
      </div>
    );
  }

  if (visual === 'ana') {
    return (
      <div className="project-list-art project-card-preview ana-preview" aria-hidden="true">
        <PreviewChrome />
        <div className="ana-preview-page">
          <div className="ana-preview-nav">
            <strong>A/Z</strong>
            <span>PROJECTS</span>
            <span>ABOUT</span>
            <i />
          </div>
          <div className="ana-preview-hero">
            <span>PORTFOLIO</span>
            <strong>Architecture<br /><em>&amp; interiors.</em></strong>
            <i />
            <p><span /><span /></p>
          </div>
        </div>
      </div>
    );
  }

  if (visual === 'isadora') {
    return (
      <div className="project-list-art project-card-preview isadora-preview" aria-hidden="true">
        <PreviewChrome />
        <div className="isadora-preview-page">
          <div className="isadora-preview-nav">
            <strong><i>I</i>T</strong>
            <span>INÍCIO</span>
            <span>SOBRE</span>
            <span>CONTATO</span>
          </div>
          <div className="isadora-preview-hero">
            <div className="isadora-preview-copy">
              <span>PSICÓLOGA</span>
              <strong>Cuidar da mente<br />é um ato de <em>coragem.</em></strong>
              <i />
              <p><span /><span /></p>
            </div>
            <div className="isadora-preview-portrait"><span /><i /></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="project-list-art project-card-preview coordinate-preview" aria-hidden="true">
      <PreviewChrome />
      <div className="coordinate-preview-page">
        <strong className="coordinate-preview-title">COORDINATE SAVER</strong>
        <div className="coordinate-preview-form">
          <div className="coordinate-preview-fields">
            <span>NAME<i /></span>
            <span>X<i /></span>
            <span>Y<i /></span>
            <span>Z<i /></span>
          </div>
          <div className="coordinate-preview-tools">
            <span /><span /><span /><span />
            <b>ADD</b>
          </div>
        </div>
        <div className="coordinate-preview-table">
          <div className="coordinate-preview-table-head"><span>NAME</span><span>X</span><span>Y</span><span>Z</span></div>
          <div className="coordinate-preview-row coordinate-preview-row-blue"><strong>HOME</strong><span>-291</span><span>---</span><span>133</span></div>
          <div className="coordinate-preview-row coordinate-preview-row-purple"><strong>CAVE</strong><span>-45</span><span>64</span><span>-95</span></div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { lang } = useLanguage();
  const copy = texts[lang];

  return (
    <section id="projects" className="project-list-section">
      <h2 className="project-list-heading">{copy.title}</h2>

      <div className="project-list">
        {projects.map((project, index) => (
          <a
            key={project.name}
            href={project.href}
            className="project-list-item"
            aria-label={`${copy.open}: ${project.name}`}
          >
            <span className="project-list-index" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>

            <div className="project-list-preview">
              <ProjectVisual copy={copy} visual={project.visual} />
            </div>

            <div className="project-list-content">
              <h3>{project.name}</h3>
              <p>{copy[project.descKey]}</p>
              <span className="project-list-tech">{project.tech.join(' · ')}</span>
            </div>

            <BoxIcon
              name="bx-arrow-right-stroke"
              size={20}
              className="project-list-arrow"
            />
          </a>
        ))}
      </div>
    </section>
  );
}

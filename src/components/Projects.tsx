'use client';

import { useRef, useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import BoxIcon from './BoxIcon';

const texts = {
  pt: {
    title: 'Projetos',
    open: 'Abrir projeto',
    previous: 'Projeto anterior',
    next: 'Próximo projeto',
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
    previous: 'Previous project',
    next: 'Next project',
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

export type ProjectPreviews = Record<(typeof projects)[number]['visual'], string>;

export default function Projects({ previews }: { previews: ProjectPreviews }) {
  const { lang } = useLanguage();
  const copy = texts[lang];
  const listRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToProject = (index: number) => {
    const list = listRef.current;
    const project = list?.children[index] as HTMLElement | undefined;
    if (!list || !project) return;

    list.scrollTo({
      left: project.offsetLeft,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
    });
  };

  return (
    <section id="projects" className="project-list-section">
      <div className="project-list-toolbar">
        <h2 className="project-list-heading">{copy.title}</h2>
        <div className="project-list-controls">
          <span className="project-list-position" role="status" aria-atomic="true">
            {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
          <button
            type="button"
            aria-label={copy.previous}
            aria-controls="project-list"
            disabled={activeIndex === 0}
            onClick={() => scrollToProject(activeIndex - 1)}
          >
            <BoxIcon name="bx-chevron-left" size={18} />
          </button>
          <button
            type="button"
            aria-label={copy.next}
            aria-controls="project-list"
            disabled={activeIndex === projects.length - 1}
            onClick={() => scrollToProject(activeIndex + 1)}
          >
            <BoxIcon name="bx-chevron-right" size={18} />
          </button>
        </div>
      </div>

      <div
        id="project-list"
        ref={listRef}
        className="project-list"
        onScroll={(event) => {
          const list = event.currentTarget;
          const first = list.children[0] as HTMLElement;
          const second = list.children[1] as HTMLElement;
          const step = second.offsetLeft - first.offsetLeft;
          if (step > 0) {
            setActiveIndex(Math.max(0, Math.min(projects.length - 1, Math.round(list.scrollLeft / step))));
          }
        }}
      >
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
              <img
                src={previews[project.visual]}
                alt=""
                width={640}
                height={400}
                loading="lazy"
                decoding="async"
              />
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

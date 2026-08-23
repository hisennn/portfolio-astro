'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import BoxIcon from './BoxIcon';

const texts = {
  pt: {
    title: 'Projetos',
    hint: 'Navegue pelo leque ou selecione um projeto.',
    previous: 'Projeto anterior',
    next: 'Próximo projeto',
    reset: 'Reiniciar baralho',
    open: 'Abrir projeto',
    portalPreview: 'portal / visão geral',
    trackerPreview: 'tracker / social',
    companyPreview: 'site / institucional',
    portfolioPreview: 'portfólio / arquitetura',
    psychologyPreview: 'site / psicologia',
    coordinatePreview: 'app / minecraft',
    active: 'Ativo',
    anime: 'anime',
    manga: 'mangá',
    favorites: 'favoritos',
    messages: 'mensagens',
    brcPortal:
      'Desenvolvo o portal da Baltimore Re-Construction, usado para organizar clientes, projetos, arquivos, escolhas e comunicação.',
    kiromilog:
      'Criei o Kiromilog para acompanhar animes e mangás, com listas, perfis, favoritos, mensagens e atualizações em tempo real.',
    baltre:
      'Criei o site da Baltimore Re-Construction para apresentar serviços, regiões atendidas, trabalhos realizados e formas de contato.',
    isaPsi:
      'Criei um site para apresentar o atendimento psicológico da Isadora Tomazini e facilitar o primeiro contato.',
    ana:
      'Criei um portfólio de arquitetura para apresentar os projetos da Ana Zabala e facilitar o contato com possíveis clientes.',
    coord:
      'Criei uma ferramenta simples para salvar, organizar e reencontrar coordenadas do Minecraft.'
  },
  en: {
    title: 'Projects',
    hint: 'Browse the fan or select a project.',
    previous: 'Previous project',
    next: 'Next project',
    reset: 'Reset deck',
    open: 'Open project',
    portalPreview: 'portal / overview',
    trackerPreview: 'tracker / social',
    companyPreview: 'website / company',
    portfolioPreview: 'portfolio / architecture',
    psychologyPreview: 'website / psychology',
    coordinatePreview: 'app / minecraft',
    active: 'Active',
    anime: 'anime',
    manga: 'manga',
    favorites: 'favorites',
    messages: 'messages',
    brcPortal:
      "I develop Baltimore Re-Construction's portal for organizing clients, projects, files, selections, and communication.",
    kiromilog:
      'I built Kiromilog to track anime and manga, with lists, profiles, favorites, messages, and real-time updates.',
    baltre:
      "I built Baltimore Re-Construction's website to present its services, service areas, completed work, and contact options.",
    isaPsi:
      "I built a website to present Isadora Tomazini's psychology practice and make it easier to get in touch.",
    ana:
      "I built an architecture portfolio to present Ana Zabala's projects and make it easy for potential clients to get in touch.",
    coord:
      'I built a simple tool for saving, organizing, and finding Minecraft coordinates.'
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
    name: 'Baltimore Re-Construction',
    href: '/projects/baltimore-reconstruction/',
    tech: ['Astro 7', 'TypeScript', 'Tailwind', 'Cloudflare'],
    descKey: 'baltre' as const,
    visual: 'baltimore' as const
  },
  {
    name: 'Isadora Tomazini',
    href: '/projects/isadora-tomazini/',
    tech: ['Astro', 'JavaScript', 'CSS'],
    descKey: 'isaPsi' as const,
    visual: 'isadora' as const
  },
  {
    name: 'Ana Zabala Portfolio',
    href: '/projects/ana-zabala/',
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    descKey: 'ana' as const,
    visual: 'ana' as const
  },
  {
    name: 'Coordinate Saver',
    href: '/projects/coordinate-saver/',
    tech: ['HTML', 'CSS', 'JavaScript'],
    descKey: 'coord' as const,
    visual: 'coordinates' as const
  },
  {
    name: 'Kiromilog',
    href: '/projects/kiromilog/',
    tech: ['Next.js 16', 'TypeScript', 'Neon', 'Pusher'],
    descKey: 'kiromilog' as const,
    visual: 'kiromilog' as const
  }
] as const;

function getCircularOffset(index: number, activeIndex: number) {
  const total = projects.length;
  let offset = (index - activeIndex + total) % total;

  if (offset > total / 2) {
    offset -= total;
  }

  return offset;
}

function getCardPose(offset: number) {
  const distance = Math.abs(offset);

  if (distance === 3) {
    return {
      x: '0px',
      y: 'calc(var(--fan-step-y) * -0.45)',
      rotate: 0,
      scale: 0.72,
      opacity: 0.86,
      zIndex: 10
    };
  }

  return {
    x: `calc(var(--fan-step-x) * ${offset})`,
    y: `calc(var(--fan-step-y) * ${distance})`,
    rotate: offset * 6,
    scale: distance === 0 ? 1 : distance === 1 ? 0.91 : 0.8,
    opacity: distance === 0 ? 1 : distance === 1 ? 0.995 : 0.92,
    zIndex: 60 - distance * 14
  };
}

function ProjectVisual({
  visual,
  name,
  copy
}: {
  visual: (typeof projects)[number]['visual'];
  name: string;
  copy: (typeof texts)[keyof typeof texts];
}) {
  if (visual === 'brc') {
    return (
      <div className="project-fan-handmade project-card-preview project-card-preview-brc" aria-hidden="true">
        <div className="project-card-preview-head">
          <div className="flex gap-1.5"><span /><span /><span /></div>
          <strong>{copy.portalPreview}</strong>
        </div>
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
      <div className="project-fan-handmade project-card-preview project-card-preview-kiromilog" aria-hidden="true">
        <div className="project-card-preview-head">
          <div className="flex gap-1.5"><span /><span /><span /></div>
          <strong>{copy.trackerPreview}</strong>
        </div>
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
      <div className="project-fan-handmade project-card-preview baltimore-preview" aria-hidden="true">
        <div className="project-card-preview-head">
          <div className="flex gap-1.5"><span /><span /><span /></div>
          <strong>{copy.companyPreview}</strong>
        </div>
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
      <div className="project-fan-handmade project-card-preview ana-preview" aria-hidden="true">
        <div className="project-card-preview-head">
          <div className="flex gap-1.5"><span /><span /><span /></div>
          <strong>{copy.portfolioPreview}</strong>
        </div>
        <div className="ana-preview-page">
          <div className="ana-preview-nav">
            <strong>ANA ZABALA</strong>
            <span>PROJECTS</span>
            <span>ABOUT</span>
            <i />
          </div>
          <div className="ana-preview-hero">
            <span>PORTFOLIO</span>
            <strong>Ana<br /><em>Zabala</em></strong>
            <i />
            <p><span /><span /></p>
          </div>
        </div>
      </div>
    );
  }

  if (visual === 'isadora') {
    return (
      <div className="project-fan-handmade project-card-preview isadora-preview" aria-hidden="true">
        <div className="project-card-preview-head">
          <div className="flex gap-1.5"><span /><span /><span /></div>
          <strong>{copy.psychologyPreview}</strong>
        </div>
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

  if (visual === 'coordinates') {
    return (
      <div className="project-fan-handmade project-card-preview coordinate-preview" aria-hidden="true">
        <div className="project-card-preview-head">
          <div className="flex gap-1.5"><span /><span /><span /></div>
          <strong>{copy.coordinatePreview}</strong>
        </div>
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

  return (
    <div aria-hidden="true" className={`project-fan-graphic project-fan-graphic-${visual}`}>
      <span className="project-fan-monogram">{name.slice(0, 2).toUpperCase()}</span>
      <span className="project-fan-graphic-line" />
      <span className="project-fan-graphic-line" />
      <span className="project-fan-graphic-line" />
    </div>
  );
}

export default function Projects() {
  const { lang } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const draggedRef = useRef(false);
  const pointerIdRef = useRef<number | null>(null);
  const lastPointerXRef = useRef(0);
  const dragRemainderRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const dragThresholdRef = useRef(90);
  const copy = texts[lang];

  const move = (direction: -1 | 1) => {
    setActiveIndex((current) => (current + direction + projects.length) % projects.length);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      move(-1);
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      move(1);
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || (event.target as Element).closest('.project-fan-control, .project-fan-reset')) {
      return;
    }

    pointerIdRef.current = event.pointerId;
    lastPointerXRef.current = event.clientX;
    dragRemainderRef.current = 0;
    dragDistanceRef.current = 0;
    dragThresholdRef.current = Math.max(72, Math.min(130, event.currentTarget.clientWidth * 0.1));
    draggedRef.current = false;
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== event.pointerId) {
      return;
    }

    const delta = event.clientX - lastPointerXRef.current;
    lastPointerXRef.current = event.clientX;
    dragDistanceRef.current += Math.abs(delta);
    dragRemainderRef.current += delta;

    if (dragDistanceRef.current > 5) {
      if (!draggedRef.current) {
        draggedRef.current = true;
        event.currentTarget.setPointerCapture(event.pointerId);
      }

      event.preventDefault();
    }

    const threshold = dragThresholdRef.current;

    while (dragRemainderRef.current <= -threshold) {
      move(1);
      dragRemainderRef.current += threshold;
    }

    while (dragRemainderRef.current >= threshold) {
      move(-1);
      dragRemainderRef.current -= threshold;
    }
  };

  const finishPointerDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== event.pointerId) {
      return;
    }

    pointerIdRef.current = null;
    dragRemainderRef.current = 0;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    window.setTimeout(() => {
      draggedRef.current = false;
    }, 0);
  };

  return (
    <section id="projects" className="project-fan-section" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="project-fan-heading">
        <h2>{copy.title}</h2>
        <p>{copy.hint}</p>
      </div>

      <div
        className="project-fan-stage"
        aria-roledescription="carousel"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishPointerDrag}
        onPointerCancel={finishPointerDrag}
        onPointerLeave={(event) => {
          if (pointerIdRef.current === event.pointerId && !event.currentTarget.hasPointerCapture(event.pointerId)) {
            pointerIdRef.current = null;
          }
        }}
      >
        <button className="project-fan-control project-fan-control-previous" type="button" onClick={() => move(-1)} aria-label={copy.previous}>
          <BoxIcon name="bx-chevron-left" size={40} />
        </button>

        <div className="project-fan-deck">
          {projects.map((project, index) => {
            const offset = getCircularOffset(index, activeIndex);
            const distance = Math.abs(offset);
            const isActive = distance === 0;
            const isPrimaryPosition = distance <= 1;
            const isFrontPosition = distance <= 2;
            const isRedSuit = index % 2 === 1;
            const isExternal = 'external' in project && project.external;

            return (
              <motion.a
                key={project.name}
                href={project.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className={`project-fan-card project-fan-card-${offset < 0 ? 'left' : offset > 0 ? 'right' : 'center'} project-fan-card-distance-${distance}${isFrontPosition ? ' project-fan-card-front' : ''}${isPrimaryPosition ? ' project-fan-card-primary' : ''}${isActive ? ' project-fan-card-active' : ''}`}
                animate={getCardPose(offset)}
                initial={false}
                transition={reduceMotion ? { duration: 0 } : {
                  x: { type: 'spring', stiffness: 235, damping: 28, mass: 0.78 },
                  y: { type: 'spring', stiffness: 235, damping: 28, mass: 0.78 },
                  rotate: { type: 'spring', stiffness: 235, damping: 28, mass: 0.78 },
                  scale: { type: 'spring', stiffness: 235, damping: 28, mass: 0.78 },
                  opacity: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
                  zIndex: { duration: 0, delay: 0.12 }
                }}
                whileHover={!reduceMotion && isFrontPosition ? { opacity: 1 } : undefined}
                whileFocus={!reduceMotion && isPrimaryPosition ? { opacity: 1 } : undefined}
                aria-hidden={!isPrimaryPosition}
                aria-label={`${copy.open}: ${project.name}`}
                draggable={false}
                tabIndex={isPrimaryPosition ? 0 : -1}
                onClick={(event) => {
                  if (draggedRef.current) event.preventDefault();
                }}
              >
                <div className="project-fan-card-surface">
                  <span className={`project-fan-card-corner project-fan-card-suit-${isRedSuit ? 'red' : 'black'}`} aria-hidden="true">
                    <span className="project-fan-card-rank">{index + 1}</span>
                    <BoxIcon name={isRedSuit ? 'bxf-diamond' : 'bxf-spade'} size={23} className="project-fan-card-suit-icon" />
                  </span>
                  <div className="project-fan-visual">
                    <ProjectVisual copy={copy} name={project.name} visual={project.visual} />
                  </div>

                  <div className="project-fan-content">
                    <div>
                      <h3>{project.name}</h3>
                      <p>{copy[project.descKey]}</p>
                    </div>

                    <div className="project-fan-footer">
                      <span>{project.tech.join(' · ')}</span>
                      <BoxIcon name={isExternal ? 'bx-arrow-up-right-stroke' : 'bx-arrow-right-stroke'} size={16} />
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        <button className="project-fan-control project-fan-control-next" type="button" onClick={() => move(1)} aria-label={copy.next}>
          <BoxIcon name="bx-chevron-right" size={40} />
        </button>

        <div className="project-fan-reset-slot">
          {activeIndex !== 0 && (
            <motion.button
              className="project-fan-reset"
              type="button"
              onClick={() => setActiveIndex(0)}
              initial={reduceMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <BoxIcon name="bx-reset" size={18} />
              <span>{copy.reset}</span>
            </motion.button>
          )}
        </div>
      </div>

      <div className="project-fan-status" aria-live="polite">
        <span>{String(activeIndex + 1).padStart(2, '0')}</span>
        <span aria-hidden="true" />
        <span>{String(projects.length).padStart(2, '0')}</span>
        <strong>{projects[activeIndex].name}</strong>
      </div>
    </section>
  );
}

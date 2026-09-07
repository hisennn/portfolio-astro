'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import BoxIcon from './BoxIcon';

const texts = {
  pt: {
    title: 'Projetos',
    open: 'Abrir projeto',
    pause: 'Pausar apresentação',
    play: 'Reproduzir apresentação',
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
    pause: 'Pause slideshow',
    play: 'Play slideshow',
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

export type ProjectPreviews = Record<(typeof projects)[number]['visual'], string[]>;

const DURATION = 12_000;

export default function Projects({ previews }: { previews: ProjectPreviews }) {
  const { lang } = useLanguage();
  const copy = texts[lang];
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const elapsedRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);
  const [imageIndexes, setImageIndexes] = useState(() => projects.map(() => 0));
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const imageCount = previews[projects[activeIndex].visual].length;

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => { if (motion.matches) setPaused(true); };
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateMotion();
    updateVisibility();
    motion.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
      motion.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (pendingIndex === null) return;
    const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 280;
    const timeout = window.setTimeout(() => {
      elapsedRef.current = 0;
      setImageIndexes(indexes => indexes.map((frame, index) => index === pendingIndex ? 0 : frame));
      setActiveIndex(pendingIndex);
      setPendingIndex(null);
    }, delay);
    return () => window.clearTimeout(timeout);
  }, [pendingIndex]);

  useEffect(() => {
    if (paused || !visible || !pageVisible || pendingIndex !== null) return;
    let previous = performance.now();
    let frameIndex = Math.floor(elapsedRef.current / DURATION * imageCount);
    let animationFrame: number;
    const tick = (now: number) => {
      elapsedRef.current += now - previous;
      previous = now;
      if (elapsedRef.current >= DURATION) {
        progressRef.current?.style.setProperty('--progress', '1');
        setPendingIndex((activeIndex + 1) % projects.length);
        return;
      }
      const nextFrame = Math.floor(elapsedRef.current / DURATION * imageCount);
      if (nextFrame !== frameIndex) {
        frameIndex = nextFrame;
        setImageIndexes(indexes => indexes.map((frame, index) => index === activeIndex ? nextFrame : frame));
      }
      progressRef.current?.style.setProperty('--progress', String(elapsedRef.current / DURATION));
      animationFrame = window.requestAnimationFrame(tick);
    };
    animationFrame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [activeIndex, imageCount, paused, visible, pageVisible, pendingIndex]);

  const selectProject = (index: number) => {
    setPendingIndex(index === activeIndex ? null : index);
  };

  return (
    <section id="projects" className="project-list-section" ref={sectionRef} aria-labelledby="projects-heading">
      <h2 id="projects-heading" className="project-list-heading">{copy.title}</h2>
      <div className="project-showcase" aria-roledescription={lang === 'pt' ? 'carrossel' : 'carousel'}>
        <div className="project-showcase-slides" data-changing={pendingIndex !== null} id="project-slides" onFocusCapture={() => setPaused(true)}>
          {projects.map((project, index) => (
            <article
              key={project.name}
              className="project-showcase-slide"
              data-active={index === activeIndex}
              inert={index !== activeIndex}
              aria-hidden={index !== activeIndex}
              aria-label={`${index + 1} / ${projects.length}`}
            >
              <div className="project-showcase-copy">
                <h3><a href={project.href}>{project.name}<span aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path className="project-arrow-shaft" d="M4 12h15" /><path d="m13 6 6 6-6 6" /></svg></span></a></h3>
                <p>{copy[project.descKey]}</p>
                <ul className="project-showcase-tech" aria-label={lang === 'pt' ? 'Tecnologias' : 'Technologies'}>
                  {project.tech.map(tech => <li key={tech}>{tech}</li>)}
                </ul>
              </div>
              <a className="project-showcase-image" href={project.href} aria-label={`${copy.open}: ${project.name}`}>
                {previews[project.visual].map((src, frame) => (
                  <img key={src} src={src} alt="" width={1200} height={750} loading="lazy" decoding="async"
                    data-active={frame === imageIndexes[index]} />
                ))}
              </a>
            </article>
          ))}
        </div>
        <div className="project-showcase-controls">
          <div className="project-showcase-pagination" aria-label={copy.title}>
            {projects.map((project, index) => (
              <button key={project.name} type="button" aria-label={project.name} aria-current={index === (pendingIndex ?? activeIndex) ? 'true' : undefined}
                aria-controls="project-slides" onClick={() => selectProject(index)}>
                <span className="project-showcase-dot">
                  {index === activeIndex && <span ref={progressRef} className="project-showcase-progress" />}
                </span>
              </button>
            ))}
          </div>
          <button className="project-showcase-play" type="button" aria-label={paused ? copy.play : copy.pause}
            onClick={() => setPaused(value => !value)}>
            <BoxIcon name={paused ? 'bx-play' : 'bx-pause'} size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

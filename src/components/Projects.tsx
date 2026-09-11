'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import Icon from './Icon';

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
  const draggedRef = useRef(false);
  const fanRef = useRef<HTMLElement>(null);
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
      progressRef.current?.style.setProperty('--progress', '0');
      setImageIndexes(indexes => indexes.map((frame, index) => index === pendingIndex ? 0 : frame));
      setActiveIndex(pendingIndex);
      setPendingIndex(null);
    }, delay);
    return () => window.clearTimeout(timeout);
  }, [pendingIndex]);

  useEffect(() => {
    progressRef.current?.style.setProperty('--progress', String(elapsedRef.current / DURATION));
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

  useEffect(() => {
    const fan = fanRef.current;
    if (!fan) return;
    const mobile = window.matchMedia('(max-width: 719px)');
    let userScrolling = false;
    let pointerDown = false;
    let startX = 0;
    let startScroll = 0;
    let timeout: number | undefined;
    const centerActive = () => {
      if (!mobile.matches || userScrolling) return;
      const option = fan.children[activeIndex] as HTMLElement;
      fan.scrollTo({ left: option.offsetLeft - (fan.clientWidth - option.offsetWidth) / 2,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    };
    const beginScroll = (event: Event) => {
      if (!mobile.matches) return;
      userScrolling = true;
      pointerDown = event.type === 'pointerdown';
      if (event instanceof PointerEvent) {
        draggedRef.current = false;
        startX = event.clientX;
        startScroll = fan.scrollLeft;
      }
      setPaused(true);
    };
    const onScroll = () => {
      if (!mobile.matches || !userScrolling) return;
      window.clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        if (pointerDown) return;
        const center = fan.scrollLeft + fan.clientWidth / 2;
        const options = Array.from(fan.children) as HTMLElement[];
        const closest = options.reduce((best, option, index) =>
          Math.abs(option.offsetLeft + option.offsetWidth / 2 - center) <
          Math.abs(options[best].offsetLeft + options[best].offsetWidth / 2 - center) ? index : best, 0);
        userScrolling = false;
        delete fan.dataset.dragging;
        if (closest !== activeIndex) setPendingIndex(closest);
      }, 150);
    };
    const movePointer = (event: PointerEvent) => {
      if (!pointerDown || event.pointerType !== 'mouse') return;
      const distance = event.clientX - startX;
      if (Math.abs(distance) < 5 && !draggedRef.current) return;
      draggedRef.current = true;
      fan.dataset.dragging = 'true';
      fan.setPointerCapture(event.pointerId);
      event.preventDefault();
      fan.scrollLeft = startScroll - distance;
    };
    const endScroll = () => {
      pointerDown = false;
      if (fan.dataset.dragging) {
        const center = fan.scrollLeft + fan.clientWidth / 2;
        const options = Array.from(fan.children) as HTMLElement[];
        const target = options.reduce((best, option) =>
          Math.abs(option.offsetLeft + option.offsetWidth / 2 - center) <
          Math.abs(best.offsetLeft + best.offsetWidth / 2 - center) ? option : best);
        fan.scrollTo({ left: target.offsetLeft - (fan.clientWidth - target.offsetWidth) / 2,
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      }
      onScroll();
    };
    const observer = new ResizeObserver(centerActive);
    observer.observe(fan);
    fan.addEventListener('pointerdown', beginScroll);
    fan.addEventListener('pointermove', movePointer);
    window.addEventListener('pointerup', endScroll);
    window.addEventListener('pointercancel', endScroll);
    fan.addEventListener('wheel', beginScroll, { passive: true });
    fan.addEventListener('scroll', onScroll, { passive: true });
    centerActive();
    return () => {
      window.clearTimeout(timeout);
      observer.disconnect();
      fan.removeEventListener('pointerdown', beginScroll);
      fan.removeEventListener('pointermove', movePointer);
      delete fan.dataset.dragging;
      window.removeEventListener('pointerup', endScroll);
      window.removeEventListener('pointercancel', endScroll);
      fan.removeEventListener('wheel', beginScroll);
      fan.removeEventListener('scroll', onScroll);
    };
  }, [activeIndex]);

  const selectProject = (index: number) => {
    setPendingIndex(index === activeIndex ? null : index);
  };

  return (
    <section id="projects" className="project-list-section" ref={sectionRef} aria-labelledby="projects-heading">
      <h2 id="projects-heading" className="project-list-heading">{copy.title}</h2>
      <div className="project-showcase" aria-roledescription={lang === 'pt' ? 'carrossel' : 'carousel'}>
        <div className="project-showcase-controls">
          <nav ref={fanRef} className="project-fan" aria-label={copy.title}>
            {projects.map((project, index) => (
              <a key={project.name} href={project.href} className="project-fan-option" draggable={false}
                aria-current={index === (pendingIndex ?? activeIndex) ? 'true' : undefined}
                aria-controls="project-slides"
                onClick={event => {
                  if (!window.matchMedia('(max-width: 719px)').matches) return;
                  event.preventDefault();
                  if (draggedRef.current) return;
                  setPaused(true);
                  selectProject(index);
                }}
                onPointerEnter={event => { if (event.pointerType === 'mouse' && window.matchMedia('(min-width: 720px)').matches) selectProject(index); }}
                onFocus={event => { if (event.currentTarget.matches(':focus-visible')) { setPaused(true); selectProject(index); } }}>
                {index === activeIndex && pendingIndex === null && <span ref={progressRef} className="project-showcase-progress" aria-hidden="true" />}
                <span className="project-fan-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <span className="project-fan-name">{project.name}</span>
                <span className="project-fan-arrow" aria-hidden="true"><Icon name="arrow-up-right" /></span>
              </a>
            ))}
          </nav>
        </div>
        <div className="project-showcase-slides" data-changing={pendingIndex !== null} id="project-slides"
          onFocusCapture={event => { if (event.target.matches('a:focus-visible')) setPaused(true); }}>
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
                <h3><a href={project.href}>{project.name}<span aria-hidden="true"><Icon name="arrow-right" size={16} /></span></a></h3>
                <p>{copy[project.descKey]}</p>
                <ul className="project-showcase-tech" aria-label={lang === 'pt' ? 'Tecnologias' : 'Technologies'}>
                  {project.tech.map(tech => <li key={tech}>{tech}</li>)}
                </ul>
              </div>
            </article>
          ))}
          <div className="project-browser">
            <div className="project-browser-toolbar">
              <div className="project-browser-tools">
                <span className="project-browser-controls" aria-hidden="true"><i /><i /><i /></span>
                <div className="project-browser-navigation">
                  <button type="button" aria-label={lang === 'pt' ? 'Projeto anterior' : 'Previous project'}
                    onClick={() => selectProject(((pendingIndex ?? activeIndex) + projects.length - 1) % projects.length)}>
                    <Icon name="caret-left" size={18} />
                  </button>
                  <button type="button" aria-label={lang === 'pt' ? 'Próximo projeto' : 'Next project'}
                    onClick={() => selectProject(((pendingIndex ?? activeIndex) + 1) % projects.length)}>
                    <Icon name="caret-right" size={18} />
                  </button>
                  <button className="project-showcase-play" type="button" aria-label={paused ? copy.play : copy.pause}
                    title={paused ? copy.play : copy.pause} onClick={() => setPaused(value => !value)}>
                    <Icon name={paused ? 'play' : 'pause'} size={18} />
                  </button>
                </div>
              </div>
              <span className="project-browser-address" aria-hidden="true">{projects[activeIndex].name}</span>

            </div>
            <div className="project-browser-viewport">
              {projects.map((project, index) => (
                <a key={project.name} className="project-showcase-image" href={project.href}
                  aria-label={`${copy.open}: ${project.name}`} data-active={index === activeIndex}
                  inert={index !== activeIndex} aria-hidden={index !== activeIndex}>
                  {previews[project.visual].map((src, frame) => (
                    <img key={src} src={src} alt="" width={1200} height={750} loading="lazy" decoding="async"
                      data-active={frame === imageIndexes[index]} />
                  ))}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

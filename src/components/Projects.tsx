'use client';

import { useLanguage } from '../hooks/useLanguage';
import Icon from './Icon';

const texts = {
  pt: {
    title: 'Projetos',
    open: 'Ver projeto',
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
    open: 'View project',
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

type ProjectTech = (typeof projects)[number]['tech'][number];

const techIcons: Record<Exclude<ProjectTech, 'Neon' | 'Pusher'>, string> = {
  'React Router 7': 'devicon-reactrouter-plain',
  'Node.js': 'devicon-nodejs-plain',
  PostgreSQL: 'devicon-postgresql-plain',
  Cloudflare: 'devicon-cloudflare-plain',
  'Next.js 16': 'devicon-nextjs-plain',
  'Next.js': 'devicon-nextjs-plain',
  TypeScript: 'devicon-typescript-plain',
  'Astro 7': 'devicon-astro-plain',
  Astro: 'devicon-astro-plain',
  Tailwind: 'devicon-tailwindcss-original',
  JavaScript: 'devicon-javascript-plain',
  HTML: 'devicon-html5-plain',
  CSS: 'devicon-css3-plain'
};

export type ProjectPreviews = Record<(typeof projects)[number]['visual'], string>;

export default function Projects({ previews }: { previews: ProjectPreviews }) {
  const { lang } = useLanguage();
  const copy = texts[lang];

  return (
    <section id="projects" className="project-list-section" aria-labelledby="projects-heading">
      <h2 id="projects-heading" className="section-heading">{copy.title}</h2>

      <div className="project-grid">
        {projects.map((item, i) => (
          <article key={item.href} className="project-card">
            <a
              href={item.href}
              className="project-card-media"
              aria-label={`${copy.open}: ${item.name}`}
            >
              <img
                src={previews[item.visual]}
                alt=""
                width={1200}
                height={750}
                loading={i < 3 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </a>
            <div className="project-card-body">
              <h3 className="project-card-title">
                <a href={item.href}>
                  <span>{item.name}</span>
                  <Icon name="arrow-up-right" size={20} className="project-card-arrow" />
                </a>
              </h3>
              <p className="project-card-desc">{copy[item.descKey]}</p>
              <ul className="project-card-tech" aria-label={lang === 'pt' ? 'Tecnologias' : 'Technologies'}>
                {item.tech.map((tech) => (
                  <li key={tech}>
                    {tech === 'Neon' || tech === 'Pusher' ? (
                      <span className="project-tech-icon" aria-hidden="true" style={{
                        mask: `url(/icons/${tech.toLowerCase()}.svg) center / contain no-repeat`,
                        WebkitMask: `url(/icons/${tech.toLowerCase()}.svg) center / contain no-repeat`
                      }} />
                    ) : <i className={techIcons[tech]} aria-hidden="true" />}
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

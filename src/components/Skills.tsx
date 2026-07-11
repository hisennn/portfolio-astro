'use client';

import { useLanguage } from '../hooks/useLanguage';

const texts = {
  pt: {
    title: 'Skills',
    practicesTitle: 'Práticas',
    practices: [
      'Modelagem de dados',
      'APIs e integrações',
      'Autenticação e autorização',
      'Uploads e arquivos',
      'Debugging',
      'Deploy',
      'Desenvolvimento assistido por agentes, com revisão de código e validação'
    ],
    workStyleTitle: 'Forma de trabalho',
    workStyle: [
      'Comunicação com clientes',
      'Definição de escopo',
      'Colaboração remota',
      'Organização de entregas'
    ]
  },
  en: {
    title: 'Skills',
    practicesTitle: 'Practices',
    practices: [
      'Data modeling',
      'APIs and integrations',
      'Authentication and authorization',
      'File handling',
      'Debugging',
      'Deployment',
      'Agent-assisted development with code review and validation'
    ],
    workStyleTitle: 'Working style',
    workStyle: [
      'Client communication',
      'Scope definition',
      'Remote collaboration',
      'Delivery planning'
    ]
  }
} as const;

type Skill = {
  name: string;
  icon?: string;
  iconSrc?: string;
  iconText?: string;
};

const skillGroups: Array<{
  title: { pt: string; en: string };
  items: Skill[];
}> = [
  {
    title: { pt: 'Frontend', en: 'Frontend' },
    items: [
      { name: 'TypeScript', icon: 'devicon-typescript-plain' },
      { name: 'JavaScript', icon: 'devicon-javascript-plain' },
      { name: 'React', icon: 'devicon-react-original' },
      { name: 'React Router', icon: 'devicon-reactrouter-plain' },
      { name: 'Next.js', icon: 'devicon-nextjs-plain' },
      { name: 'Astro', icon: 'devicon-astro-plain' },
      { name: 'Tailwind', icon: 'devicon-tailwindcss-original' }
    ]
  },
  {
    title: { pt: 'Backend e dados', en: 'Backend & data' },
    items: [
      { name: 'Node.js', icon: 'devicon-nodejs-plain' },
      { name: 'PostgreSQL', icon: 'devicon-postgresql-plain' },
      { name: 'Neon', iconSrc: '/icons/neon.svg' },
      { name: 'Supabase', icon: 'devicon-supabase-plain' },
      { name: 'Drizzle', iconSrc: '/icons/drizzle.svg' }
    ]
  },
  {
    title: { pt: 'Plataforma', en: 'Platform' },
    items: [
      { name: 'Cloudflare', icon: 'devicon-cloudflare-plain' },
      { name: 'Vercel', icon: 'devicon-vercel-original' }
    ]
  },
  {
    title: { pt: 'Ferramentas', en: 'Tooling' },
    items: [
      { name: 'Git', icon: 'devicon-git-plain' },
      { name: 'GitHub', icon: 'devicon-github-original' },
      { name: 'npm', icon: 'devicon-npm-original-wordmark' },
      { name: 'Bun', icon: 'devicon-bun-plain' },
      { name: 'Figma', icon: 'devicon-figma-plain' }
    ]
  },
  {
    title: { pt: 'Ferramentas de IA', en: 'AI tooling' },
    items: [
      { name: 'Claude Code', iconSrc: '/icons/claude.svg' },
      { name: 'OpenAI Codex / ChatGPT', iconSrc: '/icons/openai.svg' },
      { name: 'Hermes Agent', iconText: 'H' }
    ]
  }
];

const SkillItem = ({ skill }: { skill: Skill }) => {
  return (
    <li className="skill-group-item">
      {skill.iconSrc ? (
        <span
          aria-hidden="true"
          className="skill-group-icon bg-[var(--text-muted)]"
          style={{
            WebkitMask: `url(${skill.iconSrc}) center / contain no-repeat`,
            mask: `url(${skill.iconSrc}) center / contain no-repeat`
          }}
        />
      ) : skill.icon ? (
        <i
          aria-hidden="true"
          className={`${skill.icon} skill-group-glyph`}
        ></i>
      ) : (
        <span aria-hidden="true" className="skill-group-monogram">
          {skill.iconText}
        </span>
      )}
      <span>{skill.name}</span>
    </li>
  );
};

export default function Skills() {
  const { lang } = useLanguage();

  return (
    <section className="w-full">
      <div className="flex flex-col gap-6">
        <h2 className="text-[15px] font-body font-medium uppercase tracking-[0.1em] text-[var(--text-muted)]">
          {texts[lang].title}
        </h2>

        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4">
            <h3 className="text-[13px] font-body font-medium text-[var(--text-muted)]">Tech Stack</h3>
            <div className="skill-groups">
              {skillGroups.map((group) => (
                <div key={group.title.en} className="skill-group">
                  <h4 className="skill-group-title">{group.title[lang]}</h4>
                  <ul className="skill-group-list">
                    {group.items.map((skill) => (
                      <SkillItem key={skill.name} skill={skill} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4">
            <h3 className="text-[13px] font-body font-medium text-[var(--text-muted)]">{texts[lang].practicesTitle}</h3>
            <p className="text-base font-body font-normal text-[var(--text-secondary)] leading-relaxed">
              {texts[lang].practices.map((item, index) => (
                <span key={item} className="skill-inline-item">
                  {item}
                  {index < texts[lang].practices.length - 1 && (
                    <span className="text-[var(--text-muted)] mx-1.5">·</span>
                  )}
                </span>
              ))}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4">
            <h3 className="text-[13px] font-body font-medium text-[var(--text-muted)]">{texts[lang].workStyleTitle}</h3>
            <p className="text-base font-body font-normal text-[var(--text-secondary)] leading-relaxed">
              {texts[lang].workStyle.map((item, index) => (
                <span key={item} className="skill-inline-item">
                  {item}
                  {index < texts[lang].workStyle.length - 1 && (
                    <span className="text-[var(--text-muted)] mx-1.5">·</span>
                  )}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

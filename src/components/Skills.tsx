'use client';

import { useLanguage } from '../hooks/useLanguage';

const texts = {
  pt: {
    title: 'Habilidades',
    practicesTitle: 'Práticas',
    practices: [
      'Modelagem de dados',
      'APIs e integrações',
      'Autenticação e autorização',
      'Uploads e arquivos',
      'Debugging',
      'Deploy'
    ],
    workStyleTitle: 'Forma de trabalho',
    workStyle: [
      'Atendimento e suporte ao cliente',
      'Definição de escopo',
      'Acompanhamento de ajustes e entregas'
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
      'Deployment'
    ],
    workStyleTitle: 'Working style',
    workStyle: [
      'Customer service and support',
      'Scope definition',
      'Client feedback and delivery'
    ]
  }
} as const;

type Skill =
  | { name: string; icon: string; iconSrc?: never }
  | { name: string; iconSrc: string; icon?: never };

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
    title: { pt: 'Ferramentas', en: 'Tools' },
    items: [
      { name: 'Git', icon: 'devicon-git-plain' },
      { name: 'GitHub', icon: 'devicon-github-original' },
      { name: 'npm', icon: 'devicon-npm-original-wordmark' },
      { name: 'Bun', icon: 'devicon-bun-plain' },
      { name: 'Figma', icon: 'devicon-figma-plain' }
    ]
  },
  {
    title: { pt: 'Ferramentas de IA', en: 'AI tools' },
    items: [
      { name: 'Claude Code', iconSrc: '/icons/claude.svg' },
      { name: 'OpenAI Codex / ChatGPT', iconSrc: '/icons/openai.svg' },
      { name: 'Hermes Agent', iconSrc: '/icons/hermesagent.svg' }
    ]
  }
];

const SkillItem = ({ skill }: { skill: Skill }) => {
  return (
    <li className="skill-card-item">
      {skill.iconSrc ? (
        <span
          aria-hidden="true"
          className="skill-card-icon"
          style={{
            WebkitMask: `url(${skill.iconSrc}) center / contain no-repeat`,
            mask: `url(${skill.iconSrc}) center / contain no-repeat`
          }}
        />
      ) : (
        <i
          aria-hidden="true"
          className={`${skill.icon} skill-card-glyph`}
        ></i>
      )}
      <span>{skill.name}</span>
    </li>
  );
};

export default function Skills() {
  const { lang } = useLanguage();

  return (
    <section className="skills-section" aria-labelledby="skills-heading">
      <h2 id="skills-heading" className="section-heading">{texts[lang].title}</h2>

      <div className="skill-cards">
        {skillGroups.map((group) => (
          <div key={group.title.en} className="skill-card">
            <h3 className="skill-card-title">{group.title[lang]}</h3>
            <ul className="skill-card-list">
              {group.items.map((skill) => (
                <SkillItem key={skill.name} skill={skill} />
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="skills-rows">
        <div className="skills-row">
          <h3>{texts[lang].practicesTitle}</h3>
          <p>
            {texts[lang].practices.map((item, index) => (
              <span key={item} className="skill-inline-item">
                {item}
                {index < texts[lang].practices.length - 1 && (
                  <span className="skills-sep" aria-hidden="true"> · </span>
                )}
              </span>
            ))}
          </p>
        </div>

        <div className="skills-row">
          <h3>{texts[lang].workStyleTitle}</h3>
          <p>
            {texts[lang].workStyle.map((item, index) => (
              <span key={item} className="skill-inline-item">
                {item}
                {index < texts[lang].workStyle.length - 1 && (
                  <span className="skills-sep" aria-hidden="true"> · </span>
                )}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}

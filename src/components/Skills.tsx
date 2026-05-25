'use client';

import { useLanguage } from '../hooks/useLanguage';
import { useRef } from 'react';

const texts = {
  pt: {
    title: 'Skills',
    soft: [
      'Organização',
      'Trabalho em equipe',
      'Proatividade',
      'Resolução de problemas',
      'Aprendizado contínuo',
      'Prompting com IA',
      'Conhecimentos em informática',
      'Office 365',
      'Google Docs'
    ]
  },
  en: {
    title: 'Skills',
    soft: [
      'Organization',
      'Teamwork',
      'Proactivity',
      'Problem solving',
      'Continuous learning',
      'AI prompting',
      'IT knowledge',
      'Office 365',
      'Google Docs'
    ]
  }
} as const;

const skills = [
  { name: 'JavaScript', icon: 'devicon-javascript-plain' },
  { name: 'TypeScript', icon: 'devicon-typescript-plain' },
  { name: 'Node.js', icon: 'devicon-nodejs-plain' },
  { name: 'React', icon: 'devicon-react-original' },
  { name: 'React Router', icon: 'devicon-reactrouter-plain' },
  { name: 'Next.js', icon: 'devicon-nextjs-plain' },
  { name: 'Astro', icon: 'devicon-astro-plain' },
  { name: 'Tailwind', icon: 'devicon-tailwindcss-original' },
  { name: 'npm', icon: 'devicon-npm-original-wordmark' },
  { name: 'Bun', icon: 'devicon-bun-plain' },
  { name: 'PostgreSQL', icon: 'devicon-postgresql-plain' },
  { name: 'Supabase', icon: 'devicon-supabase-plain' },
  { name: 'Vercel', icon: 'devicon-vercel-original' },
  { name: 'Cloudflare', icon: 'devicon-cloudflare-plain' },
  { name: 'Git', icon: 'devicon-git-plain' },
  { name: 'GitHub', icon: 'devicon-github-original' },
  { name: 'Figma', icon: 'devicon-figma-plain' }
];

const SkillItem = ({ skill }: { skill: typeof skills[0] }) => {
  const tooltipRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tooltipRef.current) return;
    tooltipRef.current.style.left = `${e.clientX + 14}px`;
    tooltipRef.current.style.top = `${e.clientY + 12}px`;
  };

  return (
    <div 
      className="group relative flex flex-col items-center justify-center p-1.5"
      onMouseMove={handleMouseMove}
    >
      <i
        className={`${skill.icon} text-[28px] text-[var(--text-muted)] transition-opacity duration-200 group-hover:text-[var(--text-secondary)]`}
      ></i>
      <span 
        ref={tooltipRef}
        className="opacity-0 group-hover:opacity-100 fixed z-50 text-[11px] font-body font-medium text-[var(--text-primary)] bg-[var(--bg-secondary)] px-1.5 py-0.5 border border-[var(--border)] pointer-events-none transition-opacity duration-150 whitespace-nowrap"
        style={{ left: 0, top: 0 }}
      >
        {skill.name}
      </span>
    </div>
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
            <div className="flex flex-wrap gap-x-5 gap-y-3">
              {skills.map((skill) => (
                 <SkillItem key={skill.name} skill={skill} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4">
            <h3 className="text-[13px] font-body font-medium text-[var(--text-muted)]">Soft Skills</h3>
            <p className="text-base font-body font-normal text-[var(--text-secondary)] leading-relaxed">
              {texts[lang].soft.map((item, index) => (
                <span key={index}>
                  {item}
                  {index < texts[lang].soft.length - 1 && (
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

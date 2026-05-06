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
    tooltipRef.current.style.left = `${e.clientX + 18}px`;
    tooltipRef.current.style.top = `${e.clientY + 16}px`;
  };

  return (
    <div 
      className="group relative flex flex-col items-center justify-center p-2"
      onMouseMove={handleMouseMove}
    >
      <i
        className={`${skill.icon} text-4xl text-[var(--text-muted)] transition-all duration-300 group-hover:text-[var(--text-primary)] group-hover:scale-110`}
      ></i>
      <span 
        ref={tooltipRef}
        className="opacity-0 group-hover:opacity-100 fixed z-50 text-[12px] font-medium text-[var(--text-primary)] bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded border border-[var(--border-subtle)] shadow-lg pointer-events-none transition-opacity duration-200 whitespace-nowrap"
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
    <section className="w-full max-w-[1200px] mx-auto">
      <div className="flex flex-col gap-8">
        <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight text-[var(--text-primary)]">
          {texts[lang].title}
        </h2>

        <div className="flex flex-col gap-12 border-t border-[var(--border)] pt-8">
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6">
            <h3 className="text-[13px] font-heading font-bold uppercase tracking-[0.08em] text-[var(--text-muted)] mt-1">Tech Stack</h3>
            <div className="flex flex-wrap gap-x-6 gap-y-4">
              {skills.map((skill) => (
                 <SkillItem key={skill.name} skill={skill} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6">
            <h3 className="text-[13px] font-heading font-bold uppercase tracking-[0.08em] text-[var(--text-muted)] mt-1">Soft Skills</h3>
            <div className="flex max-w-full flex-wrap gap-x-4 gap-y-3 md:gap-x-6">
              {texts[lang].soft.map((item, index) => (
                <span key={index} className="text-base md:text-lg font-body text-[var(--text-secondary)] [overflow-wrap:anywhere]">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

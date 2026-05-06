'use client';

import { useLanguage } from '../hooks/useLanguage';
import BoxIcon from './BoxIcon';

const texts = {
  pt: {
    copyright: '© 2026 Gabriel Lemes'
  },
  en: {
    copyright: '© 2026 Gabriel Lemes'
  }
} as const;

export default function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="relative isolate mt-12 overflow-hidden border-t border-[var(--border)] bg-[var(--bg-primary)] pt-12 pb-24">
      <img
        src="/yukicont.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-30px] right-6 z-[-1] w-[min(36vw,360px)] min-w-[220px] select-none object-contain opacity-[var(--footer-figure-opacity)] mix-blend-luminosity grayscale saturate-0 contrast-[0.68] brightness-[var(--footer-figure-brightness)] transition-[opacity,filter] duration-500 ease-out will-change-[opacity,filter]"
      />
      <div className="absolute bottom-0 right-0 z-[-1] h-32 w-[min(42vw,420px)] bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/85 to-transparent" />

      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          
          <div className="flex flex-col gap-6">
            <span className="text-2xl md:text-3xl font-heading font-bold tracking-tight text-[var(--text-primary)]">
              Gabriel Lemes
            </span>
            <div className="flex flex-col gap-2 font-body text-base text-[var(--text-muted)]">
              <a
                href="mailto:gabrielsilvarz@outlook.com"
                className="hover:text-[var(--accent)] transition-colors flex items-center gap-2"
              >
                <BoxIcon name="bx-envelope" size={18} />
                gabrielsilvarz@outlook.com
              </a>
              <span className="flex items-center gap-2">
                <BoxIcon name="bx-phone" size={18} />
                +55 16 9 9390-9231
              </span>
            </div>
          </div>
          
          <div className="flex gap-6 font-body text-base">
            <a
              href="https://www.linkedin.com/in/gabrieldslemes/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
              aria-label="LinkedIn"
            >
              <BoxIcon name="bxl-linkedin" size={26} />
            </a>
            <a
              href="https://github.com/Hisennn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
              aria-label="GitHub"
            >
              <BoxIcon name="bxl-github" size={26} />
            </a>
          </div>
          
        </div>
        
        <div className="mt-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <span className="text-[12px] font-heading font-bold tracking-[0.08em] uppercase text-[var(--text-muted)] opacity-60">
            {texts[lang].copyright}
          </span>
        </div>
      </div>
    </footer>
  );
}

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
    <footer className="mt-24 pb-16">
      <div className="max-w-[1100px] mx-auto px-5 md:px-6">
        <div className="border-t border-[var(--border)] pt-10 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-base font-body font-medium text-[var(--text-primary)]">
                Gabriel Lemes
              </span>
              <div className="flex flex-col gap-1 font-body text-[14px] text-[var(--text-muted)] font-normal">
                <a
                  href="mailto:gabrielsilvarz@outlook.com"
                  className="hover:opacity-60 transition-opacity duration-200 flex items-center gap-1.5 w-fit"
                >
                  <BoxIcon name="bx-envelope" size={14} />
                  gabrielsilvarz@outlook.com
                </a>
                <span className="flex items-center gap-1.5">
                  <BoxIcon name="bx-phone" size={14} />
                  +55 16 9 9390-9231
                </span>
              </div>
            </div>
            
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/gabrieldslemes/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-muted)] hover:opacity-60 transition-opacity duration-200"
                aria-label="LinkedIn"
              >
                <BoxIcon name="bxl-linkedin" size={20} />
              </a>
              <a
                href="https://github.com/Hisennn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-muted)] hover:opacity-60 transition-opacity duration-200"
                aria-label="GitHub"
              >
                <BoxIcon name="bxl-github" size={20} />
              </a>
            </div>
          </div>
          
          <span className="text-[11px] font-body font-normal text-[var(--text-muted)] opacity-50">
            {texts[lang].copyright}
          </span>
        </div>
      </div>
    </footer>
  );
}

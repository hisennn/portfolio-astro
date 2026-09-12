'use client';

import { useLanguage } from '../hooks/useLanguage';
import Icon from './Icon';

const texts = {
  pt: {
    ctaTitle: 'Vamos construir algo juntos?',
    ctaNote: 'Respondo rápido por e-mail. Me chame para um site, sistema ou ajuste no seu projeto.',
    ctaPrimary: 'Enviar e-mail',
    copyright: `© ${new Date().getFullYear()} Gabriel Lemes`
  },
  en: {
    ctaTitle: "Let's build something together?",
    ctaNote: 'I reply fast by email. Reach out for a website, system or tweaks to your project.',
    ctaPrimary: 'Send email',
    copyright: `© ${new Date().getFullYear()} Gabriel Lemes`
  }
} as const;

export default function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="footer-cta">
        <h2 className="footer-cta-title">{texts[lang].ctaTitle}</h2>
        <p className="footer-cta-note">{texts[lang].ctaNote}</p>
        <div className="footer-cta-actions">
          <a href="mailto:gabrielsilvarz@outlook.com" className="footer-cta-primary">
            <Icon name="envelope" size={16} />
            {texts[lang].ctaPrimary}
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-identity">
          <span className="footer-name">
            Gabriel Lemes
          </span>
          <div className="footer-contact">
            <a
              href="mailto:gabrielsilvarz@outlook.com"
              className="footer-link"
            >
              <Icon name="envelope" size={14} />
              gabrielsilvarz@outlook.com
            </a>
            <span className="footer-link-static">
              <Icon name="phone" size={14} />
              +55 16 9 9390-9231
            </span>
          </div>
        </div>

        <div className="footer-social">
          <a
            href="https://www.linkedin.com/in/gabrieldslemes/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            aria-label="LinkedIn"
          >
            <Icon name="linkedin-logo" size={20} />
          </a>
          <a
            href="https://github.com/Hisennn"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            aria-label="GitHub"
          >
            <Icon name="github-logo" size={20} />
          </a>
        </div>
      </div>

      <p className="footer-copy">
        {texts[lang].copyright}
      </p>
    </footer>
  );
}

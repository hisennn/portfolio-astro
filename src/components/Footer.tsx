'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import Icon from './Icon';

const texts = {
  pt: {
    ctaTitle: 'Vamos conversar?',
    ctaNote: 'Tem um projeto em mente, uma oportunidade ou só quer trocar uma ideia? Fique à vontade para me mandar uma mensagem.',
    ctaPrimary: 'Enviar e-mail',
    copyright: `© ${new Date().getFullYear()} Gabriel Lemes`
  },
  en: {
    ctaTitle: "Let's talk",
    ctaNote: "Have a project in mind or a role to fill? Send me a message.",
    ctaPrimary: 'Send an email',
    copyright: `© ${new Date().getFullYear()} Gabriel Lemes`
  }
} as const;

export default function Footer() {
  const { lang } = useLanguage();
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;
    const root = document.documentElement;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.style.setProperty('--footer-reveal', '1');
      footer.dataset.visible = 'true';
      return;
    }

    let frame = 0;
    const clamp01 = (value: number) => (value < 0 ? 0 : value > 1 ? 1 : value);

    const update = () => {
      frame = 0;
      const lift = document.querySelector('.site-lift') as HTMLElement | null;
      const viewportH = window.innerHeight || 1;
      let progress: number;
      if (lift) {
        const liftBottom = lift.offsetTop + lift.offsetHeight;
        const gap = root.scrollHeight - liftBottom;
        progress = gap > 0 ? (window.scrollY + viewportH - liftBottom) / gap : 1;
      } else {
        const max = root.scrollHeight - viewportH;
        progress = max > 0 ? 1 - (max - window.scrollY) / viewportH : 1;
      }
      progress = clamp01(progress);
      const eased = 1 - Math.pow(1 - progress, 1.6);
      root.style.setProperty('--footer-reveal', eased.toFixed(4));
      footer.dataset.visible = progress > 0.02 ? 'true' : 'false';
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const goToContact = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest?.('a[href="#contact"]');
      if (!anchor) return;
      event.preventDefault();
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
      window.history.replaceState(null, '', '#contact');
    };

    update();
    if (window.location.hash === '#contact') {
      requestAnimationFrame(() => {
        window.scrollTo({ top: document.documentElement.scrollHeight });
      });
    }
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    document.addEventListener('click', goToContact);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      document.removeEventListener('click', goToContact);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <footer id="contact" className="site-footer" ref={footerRef} data-visible="false">
      <img className="footer-floral" src="/images/footer-hanging-flowers.png" alt="" aria-hidden="true" width={1536} height={1024} decoding="async" />
      <div className="footer-inner">
        <div className="footer-content">
          <div className="footer-cta">
            <h2 className="footer-cta-title">{texts[lang].ctaTitle}</h2>
            <p className="footer-cta-note">{texts[lang].ctaNote}</p>
            <div className="footer-cta-actions">
              <a href="mailto:gabrielsilvarz@outlook.com" className="footer-cta-primary">
                <Icon name="envelope" size={14} />
                <span>{texts[lang].ctaPrimary}</span>
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
                  <span>gabrielsilvarz@outlook.com</span>
                </a>
                <a href="tel:+5516993909231" className="footer-link">
                  <Icon name="phone" size={14} />
                  <span>+55 16 9 9390-9231</span>
                </a>
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
                <Icon name="linkedin-logo" size={24} />
              </a>
              <a
                href="https://github.com/Hisennn"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="GitHub"
              >
                <Icon name="github-logo" size={24} />
              </a>
            </div>
          </div>

        </div>

        <p className="footer-copy">
          {texts[lang].copyright}
        </p>
      </div>
    </footer>
  );
}

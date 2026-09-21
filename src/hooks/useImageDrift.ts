import { useEffect } from 'react';

export function useImageDrift() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const SCALE_RANGE = 0.07;
    let imgs: HTMLImageElement[] = [];
    let frame = 0;

    const collect = () => {
      imgs = Array.from(document.querySelectorAll<HTMLImageElement>(
        '.project-card-media img, .project-detail-media-frame img, .hero-floral'
      ));
    };

    const update = () => {
      frame = 0;
      if (!imgs.length || !imgs[0].isConnected) collect();
      const vh = window.innerHeight || 1;
      for (const el of imgs) {
        const r = el.parentElement!.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh || !r.height) continue;
        const p = Math.max(-0.5, Math.min(0.5, (r.top + r.height / 2 - vh / 2) / vh));
        el.style.setProperty('--drift', (p * 2 * el.offsetHeight * SCALE_RANGE).toFixed(1) + 'px');
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onLoad = () => { collect(); schedule(); };

    collect();
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('load', onLoad);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('load', onLoad);
      cancelAnimationFrame(frame);
      for (const el of imgs) el.style.removeProperty('--drift');
    };
  }, []);
}

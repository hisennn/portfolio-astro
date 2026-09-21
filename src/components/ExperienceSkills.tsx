import { useEffect, useRef } from 'react';
import Experience from './Experience';
import Skills from './Skills';

export default function ExperienceSkills() {
  const regionRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const region = regionRef.current;
    const reveal = revealRef.current;
    const image = imageRef.current;
    if (!region || !reveal || !image) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const readProgress = () => {
      const bounds = region.getBoundingClientRect();
      const viewport = window.innerHeight;
      return Math.max(0, Math.min(1, (viewport * 0.75 - bounds.top) / bounds.height));
    };

    let progress = readProgress();
    let previousTime = performance.now();

    const update = (time: number) => {
      frame = 0;
      if (reducedMotion.matches) return;
      const target = readProgress();
      const smoothing = 1 - Math.exp(-(time - previousTime) / 220);
      previousTime = time;
      progress += (target - progress) * smoothing;
      const settled = Math.abs(target - progress) < 0.0001;
      if (settled) progress = target;
      const offset = (progress * 1.55 - 0.775) * region.clientWidth;
      reveal.style.transform = `translate3d(${offset}px, 0, 0)`;
      image.style.transform = `translate3d(${-offset}px, 0, 0)`;
      if (!settled) frame = requestAnimationFrame(update);
    };

    const schedule = () => {
      if (frame || reducedMotion.matches) return;
      previousTime = performance.now();
      frame = requestAnimationFrame(update);
    };

    update(previousTime);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    reducedMotion.addEventListener('change', schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(region);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      reducedMotion.removeEventListener('change', schedule);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="experience-skills" ref={regionRef}>
      <div className="floral-trail" aria-hidden="true">
        <div className="floral-trail-stage">
          <div className="floral-trail-reveal" ref={revealRef}>
            <img ref={imageRef} src="/images/floral-vine.png" alt="" width={1536} height={1024} loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
      <Experience />
      <Skills />
    </div>
  );
}

'use client';

import { useEffect, useRef } from 'react';

type Glyph = {
  cls: string;
  x: number;
  y: number;
  size: number;
  depth: number;
  phase: number;
};

const GLYPHS: Glyph[] = [
  { cls: 'devicon-typescript-plain', x: 0.05, y: 0.12, size: 70, depth: 0.75, phase: 0.4 },
  { cls: 'devicon-react-original', x: 0.22, y: 0.68, size: 98, depth: 1, phase: 1.7 },
  { cls: 'devicon-nextjs-plain', x: 0.88, y: 0.09, size: 74, depth: 0.8, phase: 2.6 },
  { cls: 'devicon-astro-plain', x: 0.72, y: 0.78, size: 92, depth: 1, phase: 0.9 },
  { cls: 'devicon-tailwindcss-original', x: 0.45, y: 0.08, size: 60, depth: 0.6, phase: 3.4 },
  { cls: 'devicon-nodejs-plain', x: 0.92, y: 0.52, size: 84, depth: 0.9, phase: 5.1 },
  { cls: 'devicon-postgresql-plain', x: 0.12, y: 0.84, size: 66, depth: 0.7, phase: 4.2 },
  { cls: 'devicon-docker-plain', x: 0.06, y: 0.46, size: 64, depth: 0.65, phase: 2.9 },
  { cls: 'devicon-supabase-plain', x: 0.3, y: 0.22, size: 58, depth: 0.6, phase: 4.7 },
  { cls: 'devicon-figma-plain', x: 0.78, y: 0.36, size: 56, depth: 0.6, phase: 1.5 },
  { cls: 'devicon-git-plain', x: 0.52, y: 0.88, size: 60, depth: 0.65, phase: 2.2 },
  { cls: 'devicon-bun-plain', x: 0.16, y: 0.34, size: 52, depth: 0.55, phase: 0.7 },
  { cls: 'devicon-github-original', x: 0.94, y: 0.26, size: 62, depth: 0.65, phase: 0.1 },
];

const GRAB_BASE = 20;
const GRAB_FACTOR = 0.4;
const HOLD_EXTRA = 56;
const DWELL_TIME = 400;
const CLOSE_BASE = 16;
const CLOSE_FACTOR = 0.55;
const FOLLOW_RATE = 18;
const MOUSE_RATE = 12;
const MOUSE_IDLE = 0.1;
const MOUSE_DECAY = 8;
const RAW_MOUSE_MAX = 4000;
const FRICTION = 2.6;
const DRIFT_BLEND = 1.6;
const RELEASE_BLEND_TIME = 0.9;
const RELEASE_MAX_TIME = 1.1;
const RELEASE_MIN_SPEED = 25;
const REGRAB_DELAY = 450;
const MAX_GRAB_SPEED = 1400;
const MAX_MOUSE_SPEED = 1400;
const MAX_RELEASE_SPEED = 700;
const MAX_FREE_SPEED = 170;

export default function HeroField() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const stage = root.parentElement;
    const nodes = Array.from(root.children) as HTMLElement[];
    if (!stage || nodes.length === 0) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canGrab = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    let width = root.clientWidth;
    let height = root.clientHeight;

    const radii = GLYPHS.map((g) => Math.max(14, g.size * 0.16));
    const measure = () => {
      for (let i = 0; i < nodes.length; i += 1) {
        const inner = nodes[i].firstElementChild as HTMLElement | null;
        const w = inner ? inner.offsetWidth : 0;
        radii[i] = w > 0 ? Math.max(14, w * 0.55) : Math.max(14, GLYPHS[i].size * 0.16);
      }
    };
    measure();

    const state = GLYPHS.map((g) => {
      const heading = Math.random() * Math.PI * 2;
      const speed = 7 + g.depth * 7;
      return {
        x: g.x * width,
        y: g.y * height,
        vx: Math.cos(heading) * speed,
        vy: Math.sin(heading) * speed,
        heading,
        speed,
        turnAt: performance.now() + 6000 + Math.random() * 10000,
        releasedAt: -Infinity,
        cooldownUntil: 0,
      };
    });

    const mouse = { cx: 0, cy: 0, x: 0, y: 0, px: 0, py: 0, vx: 0, vy: 0, active: false, lastMove: 0, hasPrev: false };

    let grabbed: number | null = null;
    let outsideFrames = 0;
    let hoverCandidate: number | null = null;
    let hoverCandidateSince = 0;
    let running = true;
    let raf = 0;
    let previous = 0;

    const setGrabbedVisual = (index: number) => {
      nodes[index].style.zIndex = '2';
    };

    const clearGrabbedVisual = (index: number) => {
      nodes[index].style.zIndex = '1';
    };

    const release = (index: number, now: number) => {
      const s = state[index];
      let vx = s.vx * 0.65 + mouse.vx * 0.35;
      let vy = s.vy * 0.65 + mouse.vy * 0.35;
      if (!mouse.active) {
        vx *= 0.35;
        vy *= 0.35;
      }
      const sp = Math.hypot(vx, vy);
      if (sp > MAX_RELEASE_SPEED) {
        vx *= MAX_RELEASE_SPEED / sp;
        vy *= MAX_RELEASE_SPEED / sp;
      }
      s.vx = vx;
      s.vy = vy;
      s.releasedAt = now;
      s.cooldownUntil = now + REGRAB_DELAY;
      clearGrabbedVisual(index);
      grabbed = null;
      outsideFrames = 0;
      hoverCandidate = null;
      hoverCandidateSince = 0;
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      mouse.cx = event.clientX;
      mouse.cy = event.clientY;
      mouse.lastMove = performance.now();
      mouse.active = true;
    };

    const onLeave = () => {
      mouse.active = false;
      mouse.hasPrev = false;
      mouse.vx = 0;
      mouse.vy = 0;
      hoverCandidate = null;
      hoverCandidateSince = 0;
    };

    stage.addEventListener('pointermove', onMove);
    stage.addEventListener('pointerleave', onLeave);
    stage.addEventListener('pointercancel', onLeave);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? true;
        if (visible && !running) {
          running = true;
          previous = 0;
          mouse.hasPrev = false;
          raf = requestAnimationFrame(tick);
        } else if (!visible && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    observer.observe(stage);

    const tick = (now: number) => {
      if (!running) return;
      const rawDt = previous > 0 ? (now - previous) / 1000 : 0.016;
      const dt = Math.min(Math.max(rawDt, 0.0001), 0.033);
      previous = now;
      const w = root.clientWidth;
      const h = root.clientHeight;
      if (w !== width || h !== height) {
        if (width > 0 && height > 0) {
          for (let i = 0; i < state.length; i += 1) {
            state[i].x *= w / width;
            state[i].y *= h / height;
          }
        }
        width = w;
        height = h;
        measure();
      }

      if (mouse.active) {
        const rect = root.getBoundingClientRect();
        mouse.x = mouse.cx - rect.left;
        mouse.y = mouse.cy - rect.top;
        if (!mouse.hasPrev) {
          mouse.px = mouse.x;
          mouse.py = mouse.y;
          mouse.hasPrev = true;
        }
        if (now - mouse.lastMove > MOUSE_IDLE * 1000) {
          const decay = Math.exp(-MOUSE_DECAY * dt);
          mouse.vx *= decay;
          mouse.vy *= decay;
        } else {
          let rvx = (mouse.x - mouse.px) / dt;
          let rvy = (mouse.y - mouse.py) / dt;
          const rsp = Math.hypot(rvx, rvy);
          if (rsp > RAW_MOUSE_MAX) {
            rvx *= RAW_MOUSE_MAX / rsp;
            rvy *= RAW_MOUSE_MAX / rsp;
          }
          const k = 1 - Math.exp(-MOUSE_RATE * dt);
          mouse.vx += (rvx - mouse.vx) * k;
          mouse.vy += (rvy - mouse.vy) * k;
          const msp = Math.hypot(mouse.vx, mouse.vy);
          if (msp > MAX_MOUSE_SPEED) {
            mouse.vx *= MAX_MOUSE_SPEED / msp;
            mouse.vy *= MAX_MOUSE_SPEED / msp;
          }
        }
        mouse.px = mouse.x;
        mouse.py = mouse.y;
      }

      if (canGrab && grabbed === null && mouse.active) {
        let candidate: number | null = null;

        if (hoverCandidate !== null) {
          const s = state[hoverCandidate];
          const closeR = CLOSE_BASE + radii[hoverCandidate] * CLOSE_FACTOR;
          const d = Math.hypot(mouse.x - s.x, mouse.y - s.y);
          if (now >= s.cooldownUntil && d <= closeR) {
            candidate = hoverCandidate;
          }
        }

        if (candidate === null) {
          let best = -1;
          let bestDist = Infinity;
          for (let i = 0; i < state.length; i += 1) {
            if (now < state[i].cooldownUntil) continue;
            const closeR = CLOSE_BASE + radii[i] * CLOSE_FACTOR;
            const d = Math.hypot(mouse.x - state[i].x, mouse.y - state[i].y);
            if (d <= closeR && d < bestDist) {
              best = i;
              bestDist = d;
            }
          }
          if (best >= 0) {
            candidate = best;
          }
        }

        if (candidate !== null) {
          if (hoverCandidate === candidate) {
            if (now - hoverCandidateSince >= DWELL_TIME) {
              grabbed = candidate;
              outsideFrames = 0;
              setGrabbedVisual(candidate);
              hoverCandidate = null;
              hoverCandidateSince = 0;
            }
          } else {
            hoverCandidate = candidate;
            hoverCandidateSince = now;
          }
        } else {
          hoverCandidate = null;
          hoverCandidateSince = 0;
        }
      } else {
        hoverCandidate = null;
        hoverCandidateSince = 0;
      }

      for (let i = 0; i < state.length; i += 1) {
        const s = state[i];
        if (now >= s.turnAt) {
          s.heading += (Math.random() - 0.5) * 1.2;
          s.turnAt = now + 6000 + Math.random() * 10000;
        }
        if (grabbed === i) {
          const holdR = GRAB_BASE + radii[i] * GRAB_FACTOR + HOLD_EXTRA;
          const d = Math.hypot(mouse.x - s.x, mouse.y - s.y);
          if (!mouse.active) {
            release(i, now);
          } else if (d > holdR) {
            outsideFrames += 1;
            if (outsideFrames >= 2) release(i, now);
          } else {
            outsideFrames = 0;
          }
        }
        if (grabbed === i) {
          const px = s.x;
          const py = s.y;
          const k = 1 - Math.exp(-FOLLOW_RATE * dt);
          s.x += (mouse.x - s.x) * k;
          s.y += (mouse.y - s.y) * k;
          if (s.x < 0) s.x = 0;
          if (s.x > w) s.x = w;
          if (s.y < 0) s.y = 0;
          if (s.y > h) s.y = h;
          let ivx = (s.x - px) / dt;
          let ivy = (s.y - py) / dt;
          const sp = Math.hypot(ivx, ivy);
          if (sp > MAX_GRAB_SPEED) {
            ivx *= MAX_GRAB_SPEED / sp;
            ivy *= MAX_GRAB_SPEED / sp;
          }
          s.vx = ivx;
          s.vy = ivy;
        } else if (now - s.releasedAt < RELEASE_MAX_TIME * 1000) {
          const t = (now - s.releasedAt) / 1000;
          const driftVx = Math.cos(s.heading) * s.speed;
          const driftVy = Math.sin(s.heading) * s.speed;
          const blend = Math.min(1, t / RELEASE_BLEND_TIME);
          s.x += (s.vx + driftVx * blend) * dt;
          s.y += (s.vy + driftVy * blend) * dt;
          const decay = Math.exp(-FRICTION * dt);
          s.vx *= decay;
          s.vy *= decay;
          const m = radii[i] + 4;
          if (s.x < -m) s.x = w + m;
          else if (s.x > w + m) s.x = -m;
          if (s.y < -m) s.y = h + m;
          else if (s.y > h + m) s.y = -m;
          const sp = Math.hypot(s.vx, s.vy);
          if ((t > RELEASE_BLEND_TIME && sp < RELEASE_MIN_SPEED) || t >= RELEASE_MAX_TIME) {
            s.vx = driftVx;
            s.vy = driftVy;
            s.releasedAt = -Infinity;
          }
        } else {
          const driftVx = Math.cos(s.heading) * s.speed;
          const driftVy = Math.sin(s.heading) * s.speed;
          const k = 1 - Math.exp(-DRIFT_BLEND * dt);
          s.vx += (driftVx - s.vx) * k;
          s.vy += (driftVy - s.vy) * k;
          const sp = Math.hypot(s.vx, s.vy);
          if (sp > MAX_FREE_SPEED) {
            s.vx *= MAX_FREE_SPEED / sp;
            s.vy *= MAX_FREE_SPEED / sp;
          }
          s.x += s.vx * dt;
          s.y += s.vy * dt;
          const m = radii[i] + 4;
          if (s.x < -m) s.x = w + m;
          else if (s.x > w + m) s.x = -m;
          if (s.y < -m) s.y = h + m;
          else if (s.y > h + m) s.y = -m;
        }
      }

      for (let pass = 0; pass < 2; pass += 1) {
        for (let i = 0; i < state.length; i += 1) {
          for (let j = i + 1; j < state.length; j += 1) {
            const a = state[i];
            const b = state[j];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const minD = radii[i] + radii[j];
            const d = Math.hypot(dx, dy);
            if (d >= minD) continue;
            if (d < 0.0001) {
              b.x += 0.5;
              continue;
            }
            const nx = dx / d;
            const ny = dy / d;
            const pen = minD - d;
            const aGrabbed = grabbed === i;
            const bGrabbed = grabbed === j;
            if (aGrabbed && bGrabbed) continue;
            if (aGrabbed) {
              b.x += nx * pen;
              b.y += ny * pen;
            } else if (bGrabbed) {
              a.x -= nx * pen;
              a.y -= ny * pen;
            } else {
              a.x -= nx * pen * 0.5;
              a.y -= ny * pen * 0.5;
              b.x += nx * pen * 0.5;
              b.y += ny * pen * 0.5;
            }
            const rvx = b.vx - a.vx;
            const rvy = b.vy - a.vy;
            const vn = rvx * nx + rvy * ny;
            if (vn < 0) {
              const invA = aGrabbed ? 0 : 1;
              const invB = bGrabbed ? 0 : 1;
              const denom = invA + invB;
              if (denom > 0) {
                const imp = (-(1 + 0.2) * vn) / denom;
                a.vx -= imp * invA * nx;
                a.vy -= imp * invA * ny;
                b.vx += imp * invB * nx;
                b.vy += imp * invB * ny;
                if (!aGrabbed && now - a.releasedAt >= RELEASE_MAX_TIME * 1000) {
                  a.vx *= 0.995;
                  a.vy *= 0.995;
                  const sa = Math.hypot(a.vx, a.vy);
                  if (sa > MAX_FREE_SPEED) {
                    a.vx *= MAX_FREE_SPEED / sa;
                    a.vy *= MAX_FREE_SPEED / sa;
                  }
                }
                if (!bGrabbed && now - b.releasedAt >= RELEASE_MAX_TIME * 1000) {
                  b.vx *= 0.995;
                  b.vy *= 0.995;
                  const sb = Math.hypot(b.vx, b.vy);
                  if (sb > MAX_FREE_SPEED) {
                    b.vx *= MAX_FREE_SPEED / sb;
                    b.vy *= MAX_FREE_SPEED / sb;
                  }
                }
              }
            }
          }
        }
      }

      for (let i = 0; i < nodes.length; i += 1) {
        const g = GLYPHS[i];
        const s = state[i];
        nodes[i].style.transform = `translate3d(${(s.x - g.x * w).toFixed(2)}px, ${(s.y - g.y * h).toFixed(2)}px, 0) rotate(${(g.phase * 4 - 12).toFixed(2)}deg)`;
      }

      raf = requestAnimationFrame(tick);
    };

    for (let i = 0; i < nodes.length; i += 1) {
      nodes[i].style.zIndex = '1';
    }

    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      stage.removeEventListener('pointermove', onMove);
      stage.removeEventListener('pointerleave', onLeave);
      stage.removeEventListener('pointercancel', onLeave);
    };
  }, []);

  return (
    <div ref={rootRef} className="hero-field" aria-hidden="true">
      {GLYPHS.map((g, index) => (
        <span key={`${g.cls}-${index}`} className="hero-field-item" style={{ left: `${g.x * 100}%`, top: `${g.y * 100}%` }}>
          <i className={g.cls} style={{ fontSize: `clamp(20px, ${g.size / 18}vw, ${g.size * 0.65}px)` }} />
        </span>
      ))}
    </div>
  );
}

import { useEffect, useRef } from 'react';

type MotionKind = 'hero' | 'waveform' | 'coffee' | 'trail';

/** Decorative canvas motion stays independent of content and stops when hidden. */
export function PortfolioMotion({ kind }: { kind: MotionKind }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = false;
    let time = 0;
    let previousTime = 0;
    let lastPaint = -Infinity;
    let disposed = false;
    // A fixed seed keeps the composition stable across renders and theme changes.
    let seed = 41;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    const particles = Array.from({ length: kind === 'hero' ? 680 : 16 }, () => ({
      x: random(), y: random(), phase: random() * Math.PI * 2, size: random(),
    }));

    const paint = () => {
      context.clearRect(0, 0, width, height);
      const dark = document.documentElement.classList.contains('dark');
      const ink = dark ? '224,218,204' : '49,47,41';
      if (kind === 'hero') {
        for (const p of particles) {
          const x = (p.x + time * 0.009) % 1;
          const envelope = Math.sin(Math.PI * x);
          const y = .5 + Math.sin(x * 5.5 + time * .15) * .18
            + (p.y - .5) * envelope * .75;
          const alpha = (.12 + p.size * .42) * Math.pow(envelope, .65);
          context.fillStyle = `rgba(${ink},${alpha})`;
          context.beginPath();
          context.arc(x * width, y * height, .45 + p.size * .75, 0, Math.PI * 2);
          context.fill();
        }
      } else if (kind === 'waveform') {
        context.fillStyle = dark ? '#d2c6b4' : '#8c7760';
        for (let i = 0; i < 15; i++) {
          const amplitude = 3 + (Math.sin(i * .7 + time * 1.6) + 1) * 7;
          context.beginPath();
          context.roundRect(7 + i * 5.5, height / 2 - amplitude / 2, 2, amplitude, 1);
          context.fill();
        }
      } else if (kind === 'coffee') {
        for (const p of particles.slice(0, 10)) {
          const x = ((p.x + time * .012) % 1) * width;
          const y = height / 2 + Math.sin(p.phase + time * .3) * 9;
          context.save();
          context.translate(x, y);
          context.rotate(p.phase + time * .07);
          context.fillStyle = dark ? '#c0a68b' : '#97745b';
          context.beginPath();
          context.ellipse(0, 0, 2.5, 1.6, 0, 0, Math.PI * 2);
          context.fill();
          context.restore();
        }
      } else {
        for (let i = 0; i < 12; i++) {
          const x = ((i / 12 + time * .035) % 1) * width;
          context.fillStyle = `rgba(${dark ? '172,192,147' : '93,120,76'},${.15 + .5 * Math.sin(Math.PI * x / width)})`;
          context.beginPath();
          context.ellipse(x, height / 2 + (i % 2 ? 5 : -5), 3, 1.5, -.35, 0, Math.PI * 2);
          context.fill();
        }
      }
    };

    const tick = (now: number) => {
      frame = 0;
      if (disposed || !visible || document.hidden || reducedMotion.matches) return;
      // Limit decorative work to 30 frames per second without changing its speed.
      if (now - lastPaint >= 1000 / 30) {
        if (previousTime) time += Math.min((now - previousTime) / 1000, .1);
        previousTime = now;
        lastPaint = now;
        paint();
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
      paint();
      if (!disposed && visible && !document.hidden && !reducedMotion.matches) {
        frame = requestAnimationFrame(tick);
      }
    };
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      sync();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRect.width > 0;
      sync();
    });
    intersectionObserver.observe(canvas);
    const themeObserver = new MutationObserver(sync);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    reducedMotion.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    resize();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      reducedMotion.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, [kind]);

  return <canvas ref={canvasRef} className={`portfolio-motion motion-${kind}`} aria-hidden="true" />;
}

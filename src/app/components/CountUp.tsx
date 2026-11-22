import { useEffect, useRef, useState } from 'react';

/** Counts up to `to` the first time it scrolls into view (instant with reduced motion). */
export default function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done.current) return;
        done.current = true;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          setN(to);
          return;
        }
        const start = performance.now();
        const dur = 1100;
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / dur);
          setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {n.toLocaleString('en-US')}
      {suffix}
    </span>
  );
}

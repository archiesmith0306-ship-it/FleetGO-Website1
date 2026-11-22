import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import { ArrowUpRight, Check, RotateCcw } from 'lucide-react';
import { HOTSPOTS, MODEL_CREDIT, type Hotspot } from '../data/hotspots';
import { track } from '../lib/analytics';
import SectionLabel from './SectionLabel';

// Three.js is heavy — only pulled in once the section is near the viewport.
const TruckScene = lazy(() => import('./TruckScene'));

export default function TruckInspector() {
  const [visible, setVisible] = useState(false); // load three.js + the model once near the viewport
  const [onScreen, setOnScreen] = useState(false); // only render frames while it can be seen
  const [active, setActive] = useState<Hotspot>(HOTSPOTS[0]);
  const [focusId, setFocusId] = useState('home');
  const [flight, setFlight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const select = (h: Hotspot) => {
    setActive(h);
    setFocusId(h.id);
    setFlight((n) => n + 1);
    track('truck_hotspot_view', { hotspot: h.id });
  };
  const resetView = () => {
    setFocusId('home');
    setFlight((n) => n + 1);
    track('truck_view_reset');
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const near = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), {
      rootMargin: '300px',
    });
    const seen = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting));
    near.observe(el);
    seen.observe(el);
    return () => {
      near.disconnect();
      seen.disconnect();
    };
  }, []);

  return (
    <section id="inspection" className="bg-[#060e1a] text-white border-y border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Heading */}
        <div className="grid lg:grid-cols-[1.35fr_1fr] gap-8 items-end mb-12">
          <div>
            <SectionLabel id="inspection" className="mb-5" />
            <h2 className="font-display font-extrabold tracking-[-0.03em] leading-[1.02] text-[clamp(1.9rem,4.4vw,3.4rem)]">
              Every system we watch,{' '}
              <span className="text-[#c8970d] lg:block">on every truck.</span>
            </h2>
          </div>
          <p className="text-slate-400 text-lg leading-relaxed">
            Drag to walk around a FleetGO-spec sleeper. Tap any marker to fly in and see exactly what
            our team inspects and which platform tracks it.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.35fr_1fr] gap-8">
          {/* 3D viewport */}
          <div
            ref={ref}
            className="relative border border-[#c8970d]/20 overflow-hidden"
            style={{
              minHeight: 'clamp(380px, 52vw, 560px)',
              background: 'radial-gradient(ellipse 80% 70% at 50% 42%, #f5f7fa 0%, #dde3ea 55%, #aeb9c6 100%)',
            }}
          >
            <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#c8970d] z-20 pointer-events-none" />
            <span className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#c8970d] z-20 pointer-events-none" />
            <span className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#c8970d] z-20 pointer-events-none" />
            <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#c8970d] z-20 pointer-events-none" />

            {visible ? (
              <Suspense
                fallback={
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-600">
                      Loading 3D truck…
                    </span>
                  </div>
                }
              >
                <TruckScene
                  activeId={active.id}
                  focusId={focusId}
                  flight={flight}
                  running={onScreen}
                  onSelect={select}
                />
              </Suspense>
            ) : (
              <div className="absolute inset-0 grid place-items-center">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-600">
                  Scroll to load 3D truck
                </span>
              </div>
            )}

            {/* Controls */}
            <div className="absolute bottom-3 left-3 z-20 flex flex-wrap gap-2">
              <button
                onClick={resetView}
                className="font-mono text-[10px] uppercase tracking-[0.14em] px-3 py-2 border bg-[#0b1829]/90 text-slate-200 border-white/20 hover:border-[#c8970d] transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3 h-3" /> Reset view
              </button>
            </div>

          </div>

          {/* Itemised inspection panel */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {HOTSPOTS.map((h) => (
                <button
                  key={h.id}
                  onClick={() => select(h)}
                  className={`font-mono text-[10px] uppercase tracking-[0.12em] px-3 py-2 border transition-colors ${
                    h.id === active.id
                      ? 'bg-[#c8970d] text-[#0b1829] border-[#c8970d] font-bold'
                      : 'border-white/15 text-slate-400 hover:border-[#c8970d]/60 hover:text-white'
                  }`}
                >
                  {h.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="flex-1 flex flex-col border border-white/10 bg-[#0b1829] p-7 lg:p-8"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#c8970d] mb-3">
                  Tracked by {active.platform}
                </div>
                <h3 className="font-display font-extrabold tracking-[-0.02em] text-3xl lg:text-4xl leading-tight mb-3">
                  {active.label}
                </h3>
                <p className="text-slate-300 text-base leading-relaxed mb-6">{active.summary}</p>
                <ul className="border-t border-white/10">
                  {active.checks.map((c) => (
                    <li key={c.title} className="flex items-start gap-4 py-3.5 border-b border-white/10">
                      <span className="w-7 h-7 flex-shrink-0 grid place-items-center bg-[#c8970d]/15 border border-[#c8970d]/40">
                        <Check className="w-4 h-4 text-[#c8970d]" />
                      </span>
                      <span>
                        <span className="block font-semibold text-base text-white">{c.title}</span>
                        <span className="block text-sm text-slate-400 mt-0.5">{c.detail}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/platforms/${active.slug}`}
                  className="mt-auto pt-6 inline-flex items-center gap-2 font-display font-bold uppercase tracking-wide text-sm text-[#c8970d] hover:text-white transition-colors self-start"
                >
                  See {active.platform} <ArrowUpRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <a
          href={MODEL_CREDIT.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 font-mono text-[10px] tracking-[0.06em] text-slate-600 hover:text-slate-400 transition-colors"
        >
          {MODEL_CREDIT.text}
        </a>
      </div>
    </section>
  );
}

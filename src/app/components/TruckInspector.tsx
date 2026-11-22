import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, RotateCcw } from 'lucide-react';
import { HOTSPOTS, type Hotspot } from '../data/hotspots';
import { track } from '../lib/analytics';

// Three.js is heavy — only pulled in once the section is near the viewport.
const TruckScene = lazy(() => import('./TruckScene'));

export default function TruckInspector() {
  const [visible, setVisible] = useState(false);
  const [hoodOpen, setHoodOpen] = useState(false);
  const [active, setActive] = useState<Hotspot>(HOTSPOTS[0]);
  const ref = useRef<HTMLDivElement>(null);

  const select = (h: Hotspot) => {
    setActive(h);
    track('truck_hotspot_view', { hotspot: h.id });
  };
  const toggleHood = () => {
    track('truck_hood_toggle', { open: !hoodOpen });
    setHoodOpen(!hoodOpen);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { rootMargin: '300px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="inspection" className="bg-[#060e1a] text-white border-y border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Heading */}
        <div className="grid lg:grid-cols-2 gap-10 items-end mb-12">
          <div>
            <span className="inline-flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full border-2 border-[#c8970d]" />
              <span className="font-mono uppercase tracking-[0.18em] text-[#c8970d] text-[11px]">
                Inspection coverage
              </span>
            </span>
            <h2 className="font-display font-extrabold tracking-[-0.03em] leading-[1.02] text-[clamp(1.9rem,4.4vw,3.4rem)]">
              Every system we watch,{' '}
              <span className="text-[#c8970d]">on every truck.</span>
            </h2>
          </div>
          <p className="text-slate-400 text-lg leading-relaxed">
            Drag to rotate the tractor. Open the hood, then tap any marker to see exactly what our
            team inspects and which platform tracks it.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.35fr_1fr] gap-8">
          {/* 3D viewport */}
          <div
            ref={ref}
            className="relative border border-[#c8970d]/20 bg-[#060e1a] overflow-hidden"
            style={{ height: 'clamp(380px, 52vw, 560px)' }}
          >
            <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#c8970d] z-20 pointer-events-none" />
            <span className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#c8970d] z-20 pointer-events-none" />
            <span className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#c8970d] z-20 pointer-events-none" />
            <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#c8970d] z-20 pointer-events-none" />

            {visible ? (
              <Suspense
                fallback={
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
                      Loading inspection model…
                    </span>
                  </div>
                }
              >
                <TruckScene
                  hoodOpen={hoodOpen}
                  activeId={active.id}
                  onSelect={select}
                />
              </Suspense>
            ) : (
              <div className="absolute inset-0 grid place-items-center">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-600">
                  Scroll to load 3D model
                </span>
              </div>
            )}

            {/* Controls */}
            <div className="absolute bottom-3 left-3 z-20 flex flex-wrap gap-2">
              <button
                onClick={toggleHood}
                className={`font-mono text-[10px] uppercase tracking-[0.14em] px-3 py-2 border transition-colors ${
                  hoodOpen
                    ? 'bg-[#c8970d] text-[#0b1829] border-[#c8970d] font-bold'
                    : 'bg-[#0b1829]/85 text-slate-200 border-white/20 hover:border-[#c8970d]'
                }`}
              >
                {hoodOpen ? 'Close hood' : 'Open hood'}
              </button>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] px-3 py-2 border border-white/15 bg-[#0b1829]/85 text-slate-400 flex items-center gap-1.5">
                <RotateCcw className="w-3 h-3" /> Drag to rotate
              </span>
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
                className="flex-1 border border-white/10 bg-[#0b1829] p-7"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#c8970d] mb-2">
                  Tracked by {active.platform}
                </div>
                <h3 className="font-display font-extrabold tracking-[-0.02em] text-2xl mb-6">
                  {active.label}
                </h3>
                <ul className="space-y-3">
                  {active.checks.map((c) => (
                    <li key={c} className="flex items-start gap-3 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-[#c8970d] flex-shrink-0 mt-0.5" />
                      {c}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

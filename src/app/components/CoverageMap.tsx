import { memo, useCallback, useEffect, useMemo, useRef, useState, type PointerEvent } from 'react';
import { motion, AnimatePresence, animate } from 'motion/react';
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, MapPin, Wrench } from 'lucide-react';
import CountUp from './CountUp';
import { track } from '../lib/analytics';
import type { UsState, DispatchEvent } from '../data/usMap';
import SectionLabel from './SectionLabel';

type MapData = typeof import('../data/usMap');
type Pin = { x: number; y: number; s: number };

const FULL: [number, number, number, number] = [0, 0, 975, 610];
const ASPECT = 975 / 610;
const EASE = [0.22, 1, 0.36, 1] as const;
const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** viewBox that frames a state's bounds with padding, keeping the map's aspect ratio. */
function frame(box: UsState['box']): [number, number, number, number] {
  const [x0, y0, x1, y1] = box;
  let w = (x1 - x0) * 1.45 + 24;
  let h = (y1 - y0) * 1.45 + 24;
  if (w / h > ASPECT) h = w / ASPECT;
  else w = h * ASPECT;
  w = Math.min(w, 975);
  h = Math.min(h, 610);
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  return [cx - w / 2, cy - h / 2, w, h];
}

/** 1,000+ pins never re-render on hover: only the selected state changes them. */
const PinLayer = memo(function PinLayer({ pins, selected }: { pins: Pin[]; selected: number | null }) {
  return (
    <g>
      {pins.map((p, i) => {
        const dim = selected !== null && p.s !== selected;
        return (
          <circle
            key={i}
            className="cov-pin"
            cx={p.x}
            cy={p.y}
            r={3}
            fill={dim ? '#3a5373' : '#c8970d'}
            fillOpacity={dim ? 0.55 : 0.95}
            stroke="#060e1a"
            strokeWidth={0.6}
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
    </g>
  );
});

function DispatchRoute({ ev }: { ev: DispatchEvent }) {
  const [fx, fy] = ev.from;
  const [tx, ty] = ev.at;
  const mx = (fx + tx) / 2;
  const my = (fy + ty) / 2 - Math.max(18, Math.hypot(tx - fx, ty - fy) * 0.6);
  return (
    <g key={ev.where} pointerEvents="none">
      <motion.path
        d={`M${fx},${fy} Q${mx},${my} ${tx},${ty}`}
        fill="none"
        stroke="#f5d06b"
        strokeWidth={2}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.1, ease: EASE }}
      />
      <g style={{ transform: `translate(${fx}px, ${fy}px) scale(var(--upp, 1))` }}>
        <circle r={5} fill="#f5d06b" stroke="#060e1a" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
      </g>
      <g style={{ transform: `translate(${tx}px, ${ty}px) scale(var(--upp, 1))` }}>
        <circle r={6} fill="#e2483a" stroke="#fff" strokeWidth={1.6} vectorEffect="non-scaling-stroke" />
        <circle r={6} fill="none" stroke="#e2483a" strokeWidth={2} vectorEffect="non-scaling-stroke" className="cov-ping" />
      </g>
    </g>
  );
}

export default function CoverageMap() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const vb = useRef<[number, number, number, number]>([...FULL]);
  const [data, setData] = useState<MapData | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [eventIdx, setEventIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);

  // Fetch the map data once the section is close, and track visibility for the dispatch loop.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const near = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          import('../data/usMap').then(setData);
          near.disconnect();
        }
      },
      { rootMargin: '600px' }
    );
    const seen = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    near.observe(el);
    seen.observe(el);
    return () => {
      near.disconnect();
      seen.disconnect();
    };
  }, []);

  const pins = useMemo<Pin[]>(
    () =>
      data
        ? data.PINS.split('|').map((t) => {
            const [x, y, s] = t.split(',');
            return { x: +x, y: +y, s: +s };
          })
        : [],
    [data]
  );
  const ranked = useMemo(
    () => (data ? data.STATES.map((s, i) => ({ ...s, i })).sort((a, b) => b.count - a.count) : []),
    [data]
  );

  // Animate the SVG viewBox directly (no React re-render per frame) and keep pins a sensible size.
  // Pins and markers are sized in screen pixels: --upp = map units per CSS pixel.
  const applyView = useCallback((v: number[]) => {
    const svg = svgRef.current;
    if (!svg) return;
    vb.current = v as [number, number, number, number];
    svg.setAttribute('viewBox', v.join(' '));
    const upp = v[2] / Math.max(1, svg.clientWidth);
    const px = (svg.clientWidth < 600 ? 2.3 : 3) * (v[2] < 900 ? 1.2 : 1);
    svg.style.setProperty('--upp', String(upp));
    svg.style.setProperty('--pr', String(px * upp));
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    applyView(vb.current);
    const ro = new ResizeObserver(() => applyView(vb.current));
    ro.observe(svg);
    return () => ro.disconnect();
  }, [data, applyView]);

  const zoomTo = useCallback((target: [number, number, number, number]) => {
    const from = [...vb.current];
    const apply = applyView;
    if (reduceMotion()) return apply(target);
    animate(0, 1, {
      duration: 0.85,
      ease: EASE,
      onUpdate: (t) => apply(from.map((f, i) => f + (target[i] - f) * t)),
    });
  }, [applyView]);

  const select = useCallback(
    (i: number | null) => {
      setSelected(i);
      setHovered(null);
      if (tipRef.current) tipRef.current.style.opacity = '0';
      if (!data) return;
      if (i === null) zoomTo([...FULL]);
      else {
        zoomTo(frame(data.STATES[i].box));
        track('coverage_state_view', { state: data.STATES[i].code });
      }
    },
    [data, zoomTo]
  );

  // Cycle the illustrative dispatch examples while the nationwide view is on screen.
  useEffect(() => {
    if (!data || !inView || paused || selected !== null || reduceMotion()) return;
    const t = setInterval(() => setEventIdx((n) => (n + 1) % data.EVENTS.length), 4800);
    return () => clearInterval(t);
  }, [data, inView, paused, selected]);

  const moveTip = (e: PointerEvent) => {
    const tip = tipRef.current;
    const box = svgRef.current?.parentElement?.getBoundingClientRect();
    if (!tip || !box) return;
    tip.style.transform = `translate(${e.clientX - box.left + 14}px, ${e.clientY - box.top + 14}px)`;
  };

  const st = data && selected !== null ? data.STATES[selected] : null;
  const hov = data && hovered !== null ? data.STATES[hovered] : null;
  const ev = data ? data.EVENTS[eventIdx] : null;

  return (
    <section ref={sectionRef} id="coverage" className="bg-[#060e1a] text-white border-y border-white/10 overflow-hidden">
      <style>{`
        .cov-pin { r: calc(var(--pr, 3) * 1px); transition: fill .3s, fill-opacity .3s; }
        @keyframes cov-ping { from { transform: scale(1); opacity: .9 } to { transform: scale(3.2); opacity: 0 } }
        .cov-ping, .cov-hq-ring { transform-box: fill-box; transform-origin: center; animation: cov-ping 1.8s ease-out infinite; }
        .cov-hq-ring { animation-duration: 2.4s; }
        @media (prefers-reduced-motion: reduce) { .cov-ping, .cov-hq-ring { animation: none; } }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Heading */}
        <div className="grid lg:grid-cols-[1.65fr_1fr] gap-6 items-end mb-12">
          <div>
            <SectionLabel id="coverage" className="mb-5" />
            <h2 className="font-display font-extrabold tracking-[-0.03em] leading-[1.02] text-[clamp(1.9rem,4.4vw,3.4rem)]">
              A partner shop near{' '}
              <span className="text-[#c8970d] lg:block">every mile you run.</span>
            </h2>
          </div>
          <p className="text-slate-400 text-lg leading-relaxed">
            1,000+ vetted repair, tire, tow and mobile-service partners along the interstates your trucks
            actually use. Hover or tap a state to zoom in and see what's covered there.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.65fr_1fr] gap-6">
          {/* Map */}
          <div className="relative border border-[#c8970d]/20 bg-[#081426] overflow-hidden">
            <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#c8970d] z-20 pointer-events-none" />
            <span className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#c8970d] z-20 pointer-events-none" />
            <span className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#c8970d] z-20 pointer-events-none" />
            <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#c8970d] z-20 pointer-events-none" />

            {/* Top bar: breadcrumb + state picker */}
            <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 px-4 pt-4">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em]">
                {st ? (
                  <button
                    onClick={() => select(null)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 border border-white/20 bg-[#0b1829] font-mono text-[10px] uppercase tracking-[0.16em] text-slate-200 hover:border-[#c8970d] transition-colors"
                  >
                    <ArrowLeft className="w-3 h-3" /> Nationwide
                  </button>
                ) : (
                  <span className="text-slate-500 px-1">United States · 48 states</span>
                )}
                {st && <span className="text-[#c8970d]">/ {st.name}</span>}
              </div>
              <label className="flex items-center gap-2">
                <span className="sr-only">Jump to a state</span>
                <select
                  value={selected ?? ''}
                  onChange={(e) => select(e.target.value === '' ? null : Number(e.target.value))}
                  disabled={!data}
                  className="font-mono text-[11px] uppercase tracking-[0.1em] bg-[#0b1829] text-slate-200 border border-white/20 hover:border-[#c8970d] focus:border-[#c8970d] focus:outline-none px-2.5 py-1.5"
                >
                  <option value="">Jump to a state…</option>
                  {data?.STATES.map((s, i) => (
                    <option key={s.id} value={i}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="relative" onPointerMove={moveTip}>
              {data ? (
                <svg
                  ref={svgRef}
                  viewBox={FULL.join(' ')}
                  className="w-full h-auto block select-none"
                  role="img"
                  aria-label="Interactive map of FleetGO partner service locations across the 48 contiguous states"
                  onPointerLeave={() => {
                    setHovered(null);
                    if (tipRef.current) tipRef.current.style.opacity = '0';
                  }}
                >
                  <defs>
                    <radialGradient id="cov-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#c8970d" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#c8970d" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* States */}
                  <g>
                    {data.STATES.map((s, i) => {
                      const isSel = i === selected;
                      const isHov = i === hovered;
                      return (
                        <path
                          key={s.id}
                          d={s.d}
                          fill={isSel ? '#173556' : isHov ? '#1a3a5f' : '#10233a'}
                          stroke={isSel || isHov ? '#c8970d' : 'none'}
                          strokeWidth={isSel ? 1.6 : 1.2}
                          vectorEffect="non-scaling-stroke"
                          className="cursor-pointer transition-[fill] duration-200"
                          onPointerEnter={() => {
                            setHovered(i);
                            if (tipRef.current) tipRef.current.style.opacity = '1';
                          }}
                          onClick={() => select(i === selected ? null : i)}
                        />
                      );
                    })}
                  </g>
                  <path
                    d={data.BORDERS}
                    fill="none"
                    stroke="#2a4a70"
                    strokeWidth={0.8}
                    vectorEffect="non-scaling-stroke"
                    pointerEvents="none"
                  />
                  {/* Re-draw the hovered/selected outline above shared borders */}
                  {[selected, hovered].map((i, k) =>
                    i === null ? null : (
                      <path
                        key={k}
                        d={data.STATES[i].d}
                        fill="none"
                        stroke="#c8970d"
                        strokeWidth={k === 0 ? 1.8 : 1.3}
                        vectorEffect="non-scaling-stroke"
                        pointerEvents="none"
                      />
                    )
                  )}

                  <g pointerEvents="none">
                    <PinLayer pins={pins} selected={selected} />
                  </g>

                  {/* HQ */}
                  <g pointerEvents="none" style={{ transform: `translate(${data.HQ[0]}px, ${data.HQ[1]}px) scale(var(--upp, 1))` }}>
                    <circle r={30} fill="url(#cov-glow)" />
                    <circle r={7} fill="none" stroke="#f5d06b" strokeWidth={1.5} vectorEffect="non-scaling-stroke" className="cov-hq-ring" />
                    <rect x={-5} y={-5} width={10} height={10} transform="rotate(45)" fill="#f5d06b" stroke="#060e1a" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
                  </g>

                  {/* Illustrative dispatch route */}
                  {ev && selected === null && <DispatchRoute key={eventIdx} ev={ev} />}
                </svg>
              ) : (
                <div className="w-full aspect-[975/610] grid place-items-center">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-600">
                    Loading coverage map…
                  </span>
                </div>
              )}

              {/* Hover tooltip (positioned without re-rendering) */}
              <div
                ref={tipRef}
                className="pointer-events-none absolute top-0 left-0 z-30 opacity-0 transition-opacity duration-150 hidden md:block"
              >
                {hov && (
                  <div className="bg-[#0b1829]/95 border border-[#c8970d]/50 px-3 py-2 shadow-xl whitespace-nowrap">
                    <div className="font-display font-bold text-sm text-white">{hov.name}</div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#c8970d] mt-0.5">
                      {hov.count} partner locations
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500 mt-1">
                      {hovered === selected ? 'Click to zoom out' : 'Click to zoom in'}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Legend */}
            <div className="relative z-20 flex flex-wrap items-center gap-x-5 gap-y-2 px-4 pb-4 pt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c8970d]" /> Partner location
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rotate-45 bg-[#f5d06b]" /> HQ · Naperville, IL
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#e2483a] ring-2 ring-white/80" /> Road call
              </span>
            </div>
          </div>

          {/* Side panel */}
          <div className="flex flex-col gap-4">
            <AnimatePresence mode="wait">
              {st ? (
                <motion.div
                  key={st.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.3 }}
                  className="border border-white/10 bg-[#0b1829] p-7 flex-1"
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#c8970d] mb-2">
                    State coverage
                  </div>
                  <h3 className="font-display font-extrabold tracking-[-0.02em] text-3xl mb-5">{st.name}</h3>
                  <div className="grid grid-cols-2 gap-3 border-y border-white/10 py-5 mb-6">
                    <div>
                      <div className="font-display font-extrabold text-3xl text-[#c8970d]">{st.count}</div>
                      <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-400 mt-1">Partner locations</div>
                    </div>
                    <div>
                      <div className="font-display font-extrabold text-3xl text-white">24/7</div>
                      <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-400 mt-1">Dispatch desk</div>
                    </div>
                  </div>
                  {st.hubs.length > 0 && (
                    <div className="mb-5">
                      <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 mb-2.5">Cities covered</div>
                      <div className="flex flex-wrap gap-2">
                        {st.hubs.map((c) => (
                          <span key={c} className="flex items-center gap-1.5 text-sm text-slate-200 border border-white/15 px-2.5 py-1">
                            <MapPin className="w-3 h-3 text-[#c8970d]" /> {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {st.corridors.length > 0 && (
                    <div className="mb-6">
                      <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 mb-2.5">Main corridors</div>
                      <div className="flex flex-wrap gap-2">
                        {st.corridors.map((c) => (
                          <span key={c} className="font-display font-bold text-xs bg-[#1d4f8f] text-white border-2 border-white/80 rounded-[6px] px-2 py-0.5">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 font-display font-bold uppercase tracking-wide text-sm bg-[#c8970d] hover:bg-[#a87b0a] text-[#0b1829] px-5 py-3 transition-colors"
                  >
                    Get a quote for {st.code} trucks <ArrowUpRight className="w-4 h-4" />
                  </a>
                </motion.div>
              ) : (
                <motion.div
                  key="national"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-4 flex-1"
                >
                  <div className="grid grid-cols-3 border border-white/10 bg-[#0b1829] divide-x divide-white/10">
                    {[
                      { v: 1000, s: '+', l: 'Partners' },
                      { v: 48, s: '', l: 'States' },
                      { v: 19, s: '', l: 'Interstates' },
                    ].map((k) => (
                      <div key={k.l} className="p-4">
                        <div className="font-display font-extrabold text-2xl text-[#c8970d]">
                          <CountUp to={k.v} suffix={k.s} />
                        </div>
                        <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-400 mt-1">{k.l}</div>
                      </div>
                    ))}
                  </div>

                  {/* Dispatch examples */}
                  <div
                    className="border border-white/10 bg-[#0b1829] p-5"
                    onPointerEnter={() => setPaused(true)}
                    onPointerLeave={() => setPaused(false)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#c8970d]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#e2483a] animate-pulse" /> How a road call flows
                      </span>
                      <span className="flex items-center gap-1">
                        <button
                          aria-label="Previous example"
                          onClick={() => data && setEventIdx((n) => (n - 1 + data.EVENTS.length) % data.EVENTS.length)}
                          className="p-1 text-slate-400 hover:text-white"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          aria-label="Next example"
                          onClick={() => data && setEventIdx((n) => (n + 1) % data.EVENTS.length)}
                          className="p-1 text-slate-400 hover:text-white"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </span>
                    </div>
                    <AnimatePresence mode="wait">
                      {ev && (
                        <motion.div
                          key={eventIdx}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="font-display font-bold text-lg text-white">{ev.issue}</div>
                          <div className="text-sm text-slate-400 mb-3">{ev.where}</div>
                          <div className="flex items-center justify-between gap-3 text-sm border-t border-white/10 pt-3">
                            <span className="flex items-center gap-2 text-slate-200">
                              <Wrench className="w-4 h-4 text-[#c8970d]" /> {ev.unit} dispatched
                            </span>
                            <span className="font-mono text-xs text-[#c8970d] whitespace-nowrap">ETA {ev.eta} min</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="flex gap-1 mt-4">
                      {data?.EVENTS.map((_, i) => (
                        <span key={i} className={`h-0.5 flex-1 transition-colors ${i === eventIdx ? 'bg-[#c8970d]' : 'bg-white/10'}`} />
                      ))}
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-600 mt-3">
                      Illustrative examples of our dispatch process
                    </div>
                  </div>

                  {/* Top states */}
                  <div className="border border-white/10 bg-[#0b1829] p-5 flex-1">
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 mb-3">Deepest coverage</div>
                    <ul className="space-y-2">
                      {ranked.slice(0, 5).map((s) => (
                        <li key={s.id}>
                          <button
                            onClick={() => select(s.i)}
                            onPointerEnter={() => setHovered(s.i)}
                            onPointerLeave={() => setHovered(null)}
                            className="w-full group text-left"
                          >
                            <span className="flex justify-between text-sm mb-1">
                              <span className="text-slate-200 group-hover:text-white">{s.name}</span>
                              <span className="font-mono text-xs text-[#c8970d]">{s.count}</span>
                            </span>
                            <span className="block h-1 bg-white/5">
                              <span
                                className="block h-full bg-[#c8970d]/70 group-hover:bg-[#c8970d] transition-colors"
                                style={{ width: `${(s.count / (ranked[0]?.count || 1)) * 100}%` }}
                              />
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <p className="font-mono text-[10px] tracking-[0.06em] text-slate-600 mt-4">
          Headquartered in Naperville, IL · serving fleets across the 48 contiguous states
        </p>
      </div>
    </section>
  );
}

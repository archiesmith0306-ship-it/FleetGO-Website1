import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, ArrowUpRight, LogIn } from 'lucide-react';
import HeroVideoBackground from './HeroVideoBackground';
import { COMPANY, STATS, CORE_TIERS } from '../data/platforms';

/** Live fleet-operations events surfaced over the yard. Click to inspect. */
const PINS = [
  {
    id: 'pti',
    label: 'PTI PASSED 05:52',
    top: '20%',
    left: '9%',
    platform: 'PTI Monitoring',
    detail: 'Unit 2304 · pre-trip clean · no defects reported',
  },
  {
    id: 'pm',
    label: 'PM DUE IN 400 MI',
    top: '13%',
    left: '55%',
    platform: 'PM Monitoring',
    detail: 'Unit 4258 · service booked ahead of the interval',
  },
  {
    id: 'alert',
    label: 'ALERT · DRIVER CALLED',
    top: '34%',
    left: '26%',
    platform: 'RoadWatch',
    detail: 'Hard brake flagged · monitoring team called in 9 min',
  },
  {
    id: 'fuel',
    label: 'FUEL STOP · SAVED $84',
    top: '25%',
    left: '73%',
    platform: 'Fuel Saving',
    detail: '128 gal routed on-network · $0.66/gal under median',
  },
  {
    id: 'case',
    label: 'CASE CLOSED 14:08',
    top: '43%',
    left: '50%',
    platform: 'Cases & Follow-ups',
    detail: 'Work order issued · added to weekly expense statement',
  },
];

function rateFor(trucks: number) {
  if (trucks <= 10) return { rate: 100, tier: CORE_TIERS[0].range };
  if (trucks <= 20) return { rate: 90, tier: CORE_TIERS[1].range };
  if (trucks <= 30) return { rate: 80, tier: CORE_TIERS[2].range };
  if (trucks <= 50) return { rate: 70, tier: CORE_TIERS[3].range };
  return { rate: 0, tier: CORE_TIERS[4].range };
}

export default function Hero() {
  const [active, setActive] = useState(PINS[3]);
  const [trucks, setTrucks] = useState(20);

  const { rate, tier } = rateFor(trucks);
  const monthly = rate ? rate * trucks : 0;
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="relative min-h-screen flex flex-col pt-16 overflow-hidden text-white">
      <HeroVideoBackground />

      {/* Interactive yard pins */}
      <div className="absolute inset-0 z-10 hidden lg:block pointer-events-none">
        {PINS.map((pin) => {
          const isActive = pin.id === active.id;
          return (
            <button
              key={pin.id}
              onClick={() => setActive(pin)}
              style={{ top: pin.top, left: pin.left }}
              className="absolute pointer-events-auto group flex items-center gap-2 focus:outline-none"
            >
              <span className="relative flex h-3 w-3 flex-shrink-0">
                {isActive && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c8970d] opacity-60" />
                )}
                <span
                  className={`relative inline-flex h-3 w-3 rounded-full border-2 ${
                    isActive ? 'bg-[#c8970d] border-[#c8970d]' : 'bg-white/90 border-white/60'
                  }`}
                />
              </span>
              <span
                className={`font-mono text-[11px] tracking-[0.12em] px-2.5 py-1.5 border transition-colors ${
                  isActive
                    ? 'bg-[#c8970d] text-[#0b1829] border-[#c8970d] font-bold'
                    : 'bg-[#0b1829]/85 text-slate-200 border-white/15 group-hover:border-[#c8970d]/70'
                }`}
              >
                {pin.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main content */}
      <div className="relative z-20 flex-1 flex items-end">
        <div className="w-full max-w-7xl mx-auto px-6 pb-10 pt-28">
          <div className="grid lg:grid-cols-[1.25fr_1fr] gap-10 items-end">
            <div>
              {/* Pill badge */}
              <span className="inline-flex items-center gap-2 border border-[#c8970d]/50 bg-[#0b1829]/70 px-3.5 py-1.5 mb-7">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8970d] animate-pulse" />
                <span className="font-mono uppercase tracking-[0.16em] text-[#c8970d] text-[11px]">
                  {STATS.carriers} carriers · {STATS.trucks} trucks under management
                </span>
              </span>

              {/* Oversized display headline */}
              <h1 className="font-display font-extrabold tracking-[-0.035em] leading-[0.88] text-[clamp(2.75rem,8vw,6.5rem)]">
                <span className="block text-white">Fleet uptime</span>
                <span className="block text-[#c8970d]">that holds.</span>
              </h1>
            </div>

            <div className="lg:pb-4">
              <p className="text-slate-300 text-lg leading-relaxed mb-7 max-w-md">
                Maintenance, inspections, safety and fuel — run by one {STATS.coverage} team on six
                connected platforms. Point at any event in the yard and read what we did about it.
              </p>

              {/* Active pin readout */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                  className="border-l-2 border-[#c8970d] bg-[#0b1829]/80 pl-4 py-3 mb-7"
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#c8970d] mb-1">
                    {active.platform}
                  </div>
                  <div className="text-sm text-slate-200">{active.detail}</div>
                </motion.div>
              </AnimatePresence>

              {/* Mobile: the yard pins become a swipeable chip row */}
              <div className="lg:hidden flex gap-2 overflow-x-auto -mx-6 px-6 pb-1 mb-7 [scrollbar-width:none]">
                {PINS.map((pin) => (
                  <button
                    key={pin.id}
                    onClick={() => setActive(pin)}
                    className={`flex-shrink-0 font-mono text-[10px] tracking-[0.12em] px-3 py-2 border transition-colors ${
                      pin.id === active.id
                        ? 'bg-[#c8970d] text-[#0b1829] border-[#c8970d] font-bold'
                        : 'bg-[#0b1829]/80 text-slate-300 border-white/15'
                    }`}
                  >
                    {pin.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => scrollTo('contact')}
                  className="group font-display font-bold uppercase tracking-wide bg-[#c8970d] hover:bg-[#a87b0a] text-[#0b1829] px-6 py-3.5 text-sm flex items-center gap-2 transition-all"
                >
                  Get a quote
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
                <a
                  href={COMPANY.phoneHref}
                  className="font-display font-semibold uppercase tracking-wide border border-white/25 hover:border-white/60 bg-white/5 text-white px-6 py-3.5 text-sm flex items-center gap-2 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  {COMPANY.phone}
                </a>
                <a
                  href={COMPANY.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display font-semibold uppercase tracking-wide border border-[#c8970d]/60 text-[#c8970d] hover:bg-[#c8970d] hover:text-[#0b1829] px-6 py-3.5 text-sm flex items-center gap-2 transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Docked pricing strip */}
      <div className="relative z-20 border-t border-white/10 bg-[#060e1a]/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-white/10">
            <label className="py-4 pr-5 block">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 block mb-1.5">
                Your fleet size
              </span>
              <input
                type="number"
                min={1}
                max={500}
                value={trucks}
                onChange={(e) => setTrucks(Math.max(1, Math.min(500, Number(e.target.value) || 1)))}
                className="w-full bg-transparent text-white font-display font-bold text-xl focus:outline-none border-b border-white/20 focus:border-[#c8970d] transition-colors"
              />
            </label>
            {[
              { label: 'Plan tier', value: tier },
              { label: 'Rate', value: rate ? `$${rate}/truck/mo` : 'Negotiable' },
              { label: 'Est. monthly', value: monthly ? `$${monthly.toLocaleString('en-US')}` : "Let's talk" },
            ].map((cell) => (
              <div key={cell.label} className="py-4 px-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 block mb-1.5">
                  {cell.label}
                </span>
                <span className="font-display font-bold text-xl text-[#c8970d]">{cell.value}</span>
              </div>
            ))}
            <div className="py-4 pl-5 flex items-end">
              <button
                onClick={() => scrollTo('pricing')}
                className="w-full font-display font-bold uppercase tracking-wide text-sm bg-[#c8970d] hover:bg-[#a87b0a] text-[#0b1829] px-4 py-3 flex items-center justify-center gap-2 transition-all"
              >
                See pricing
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

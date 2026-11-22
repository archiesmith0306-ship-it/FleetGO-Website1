import { useState } from 'react';
import { Phone, ArrowUpRight, LogIn, Minus, Plus } from 'lucide-react';
import HeroVideoBackground from './HeroVideoBackground';
import { COMPANY, STATS, CORE_TIERS } from '../data/platforms';
import { track } from '../lib/analytics';

function rateFor(trucks: number) {
  if (trucks <= 10) return { rate: 100, tier: CORE_TIERS[0].range };
  if (trucks <= 20) return { rate: 90, tier: CORE_TIERS[1].range };
  if (trucks <= 30) return { rate: 80, tier: CORE_TIERS[2].range };
  if (trucks <= 50) return { rate: 70, tier: CORE_TIERS[3].range };
  return { rate: 0, tier: CORE_TIERS[4].range };
}

export default function Hero() {
  // Keep what the visitor types as text so the field can be cleared and retyped freely.
  const [raw, setRaw] = useState('20');
  const trucks = Math.min(500, Math.max(0, parseInt(raw, 10) || 0));
  const setCount = (n: number) => setRaw(String(Math.min(500, Math.max(1, n))));

  const { rate, tier } = trucks ? rateFor(trucks) : { rate: 0, tier: '—' };
  const monthly = rate ? rate * trucks : 0;
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="relative min-h-[92vh] flex flex-col pt-16 overflow-hidden text-white">
      <HeroVideoBackground />

      {/* Main content */}
      <div className="relative z-20 flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 py-16">
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
              <p className="text-slate-200 text-lg leading-relaxed mb-8 max-w-md">
                FleetGO is your outsourced fleet maintenance team. We watch every truck {STATS.coverage}
                {' '}(service intervals, inspections, safety and fuel) and get problems fixed, so your
                trucks stay on the road.
              </p>

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
            <div className="py-4 pr-5">
              <label htmlFor="hero-fleet-size" className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400 block mb-1.5">
                Fleet size · trucks
              </label>
              <div className="flex items-stretch h-11 border border-white/30 bg-white/[0.06] hover:border-white/50 focus-within:border-[#c8970d]! focus-within:bg-white/10 transition-colors">
                <button
                  type="button"
                  aria-label="Fewer trucks"
                  onClick={() => setCount(trucks - 1)}
                  className="w-9 flex-shrink-0 grid place-items-center text-slate-300 hover:text-[#0b1829] hover:bg-[#c8970d] transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  id="hero-fleet-size"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="off"
                  placeholder="0"
                  value={raw}
                  onChange={(e) => setRaw(e.target.value.replace(/\D/g, '').slice(0, 3))}
                  onFocus={(e) => e.target.select()}
                  onBlur={() => {
                    setCount(trucks || 1);
                    track('fleet_size_estimate', { trucks: trucks || 1 });
                  }}
                  className="w-full min-w-0 bg-transparent text-center text-white caret-[#c8970d] font-display font-bold text-xl outline-none focus-visible:outline-none placeholder:text-slate-500"
                />
                <button
                  type="button"
                  aria-label="More trucks"
                  onClick={() => setCount(trucks + 1)}
                  className="w-9 flex-shrink-0 grid place-items-center text-slate-300 hover:text-[#0b1829] hover:bg-[#c8970d] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            {[
              { label: 'Plan tier', value: tier },
              { label: 'Rate', value: !trucks ? '—' : rate ? `$${rate}/truck/mo` : 'Negotiable' },
              { label: 'Est. monthly', value: !trucks ? '—' : monthly ? `$${monthly.toLocaleString('en-US')}` : "Let's talk" },
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

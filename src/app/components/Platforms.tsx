import { useState } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Check } from 'lucide-react';
import { PLATFORMS } from '../data/platforms';

export default function Platforms() {
  const [open, setOpen] = useState(0);
  const active = PLATFORMS[open];

  return (
    <section id="platforms" className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Heading */}
        <div className="grid lg:grid-cols-2 gap-10 items-end mb-14">
          <h2 className="font-display font-extrabold tracking-[-0.03em] leading-[1.02] text-[clamp(1.9rem,4.4vw,3.4rem)] text-[#0b1829]">
            Six platforms,{' '}
            <span className="text-[#c8970d]">one team, one invoice.</span>
          </h2>
          <div>
            <p className="text-slate-600 text-lg leading-relaxed mb-5">
              Four of them come with your per-truck plan. Two are paid add-ons that only make
              sense once they pay for themselves.
            </p>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 font-display font-bold uppercase tracking-wide text-sm bg-[#c8970d] hover:bg-[#a87b0a] text-[#0b1829] px-5 py-3 transition-all"
            >
              All pricing
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-4 mb-7">
          <span className="font-mono text-[11px] tracking-[0.16em] text-slate-500">
            {String(open + 1).padStart(2, '0')} / {String(PLATFORMS.length).padStart(2, '0')}
          </span>
          <div className="flex-1 h-px bg-slate-200 relative">
            <motion.div
              className="absolute inset-y-0 left-0 bg-[#c8970d]"
              animate={{ width: `${((open + 1) / PLATFORMS.length) * 100}%` }}
              transition={{ duration: 0.35 }}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10">
          {/* Accordion list */}
          <div className="border-t border-slate-200">
            {PLATFORMS.map((p, i) => {
              const isOpen = i === open;
              return (
                <div key={p.slug} className="border-b border-slate-200">
                  <button
                    onClick={() => setOpen(i)}
                    className="w-full flex items-start gap-5 py-5 text-left group"
                  >
                    <span
                      className={`font-mono text-xs pt-2 transition-colors ${
                        isOpen ? 'text-[#c8970d]' : 'text-slate-400'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1">
                      <span className="flex items-center gap-3 flex-wrap">
                        <span
                          className={`font-display font-extrabold tracking-[-0.02em] text-2xl md:text-3xl transition-colors ${
                            isOpen ? 'text-[#0b1829]' : 'text-slate-400 group-hover:text-[#0b1829]'
                          }`}
                        >
                          {p.name}
                        </span>
                        <span
                          className={`font-mono text-[10px] uppercase tracking-[0.14em] px-2 py-1 border ${
                            p.billing === 'included'
                              ? 'border-slate-300 text-slate-500'
                              : 'border-[#c8970d]/50 text-[#c8970d] bg-[#c8970d]/5'
                          }`}
                        >
                          {p.billing === 'included' ? 'In core plan' : 'Paid add-on'}
                        </span>
                      </span>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.span
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28 }}
                            className="block overflow-hidden"
                          >
                            <span className="block pt-3 text-slate-600 leading-relaxed">
                              {p.summary}
                            </span>
                            <span className="block mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[#0b1829] border border-slate-300 px-3 py-2 w-fit">
                              {p.priceLabel}
                            </span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.slug}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28 }}
              className="bg-[#0b1829] text-white p-8 lg:sticky lg:top-24 h-fit"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#c8970d] mb-3">
                {active.tagline}
              </div>
              <h3 className="font-display font-extrabold tracking-[-0.02em] text-3xl mb-6">
                {active.name}
              </h3>

              {active.stats && (
                <div className="grid grid-cols-3 gap-3 mb-7 border-y border-white/10 py-5">
                  {active.stats.map((s) => (
                    <div key={s.label}>
                      <div className="font-display font-extrabold text-2xl text-[#c8970d]">
                        {s.value}
                      </div>
                      <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-400 mt-1">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <ul className="space-y-4 mb-8">
                {active.capabilities.map((c) => (
                  <li key={c.title} className="flex gap-3">
                    <Check className="w-4 h-4 text-[#c8970d] flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-sm text-white">{c.title}</div>
                      <div className="text-slate-400 text-sm leading-relaxed mt-0.5">
                        {c.description}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <Link
                to={`/platforms/${active.slug}`}
                className="inline-flex items-center gap-2 font-display font-bold uppercase tracking-wide text-sm bg-[#c8970d] hover:bg-[#a87b0a] text-[#0b1829] px-5 py-3 transition-colors"
              >
                See {active.name}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Fuel } from 'lucide-react';
import { track } from '../lib/analytics';

const fmt = (n: number) =>
  '$' + Math.round(n).toLocaleString('en-US');

export default function SavingsCalculator() {
  const [trucks, setTrucks] = useState(10);
  const [gallons, setGallons] = useState(1700);
  const [cpg, setCpg] = useState(0.12);

  const used = useRef(false);
  const markUsed = () => {
    if (used.current) return;
    used.current = true;
    track('fuel_calculator_used');
  };

  const grossMonthly = trucks * gallons * cpg;
  const fee = grossMonthly * 0.25;
  const netMonthly = grossMonthly - fee;

  const scrollToContact = () =>
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  const controls = [
    {
      label: 'Trucks in fleet',
      value: trucks,
      display: String(trucks),
      min: 1,
      max: 200,
      step: 1,
      set: setTrucks,
    },
    {
      label: 'Gallons / truck / month',
      value: gallons,
      display: gallons.toLocaleString('en-US'),
      min: 200,
      max: 4000,
      step: 50,
      set: setGallons,
    },
    {
      label: 'Saved per gallon',
      value: cpg,
      display: `$${cpg.toFixed(2)}`,
      min: 0.02,
      max: 0.7,
      step: 0.01,
      set: setCpg,
    },
  ];

  return (
    <section id="savings" className="bg-[#060e1a] text-white border-y border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Copy */}
          <div>
            <span className="inline-flex items-center gap-2 mb-6">
              <Fuel className="w-4 h-4 text-[#c8970d]" />
              <span className="font-mono uppercase tracking-[0.18em] text-[#c8970d] text-[11px]">
                Fuel saving platform
              </span>
            </span>
            <h2 className="font-display font-extrabold tracking-[-0.03em] leading-[1.02] text-[clamp(1.9rem,4.2vw,3.25rem)] mb-6">
              What could your fleet{' '}
              <span className="text-[#c8970d]">save on diesel?</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Retail price is not the real price. We route every stop to what you actually pay —
              discounted on-network, net of state tax — and prove the saving against the matched
              fill-up. You pay 25% of what we save you. Nothing else.
            </p>

            <div className="space-y-6">
              {controls.map((c) => (
                <div key={c.label}>
                  <div className="flex items-baseline justify-between mb-2">
                    <label className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-400">
                      {c.label}
                    </label>
                    <span className="font-display font-bold text-xl text-white">{c.display}</span>
                  </div>
                  <input
                    type="range"
                    min={c.min}
                    max={c.max}
                    step={c.step}
                    value={c.value}
                    onChange={(e) => {
                      c.set(Number(e.target.value));
                      markUsed();
                    }}
                    aria-label={c.label}
                    className="w-full accent-[#c8970d] cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Ticket-style readout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border border-[#c8970d]/30 bg-[#0b1829] lg:sticky lg:top-24"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                Estimated savings
              </span>
              <span className="font-mono text-[10px] tracking-[0.14em] text-[#c8970d]">
                NO. FG-FUEL-{trucks}T
              </span>
            </div>

            <div className="px-6 py-8 space-y-6">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 mb-2">
                  Gross savings / month
                </div>
                <div className="font-display font-extrabold tracking-[-0.04em] text-[clamp(2.5rem,6vw,4rem)] leading-none text-[#c8970d]">
                  {fmt(grossMonthly)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-y border-white/10 py-5">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 mb-1.5">
                    FleetGO fee (25%)
                  </div>
                  <div className="font-display font-bold text-xl text-slate-300">
                    −{fmt(fee)}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 mb-1.5">
                    You keep / month
                  </div>
                  <div className="font-display font-bold text-xl text-white">{fmt(netMonthly)}</div>
                </div>
              </div>

              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 mb-2">
                  You keep / year
                </div>
                <div className="font-display font-extrabold tracking-[-0.03em] text-4xl text-white">
                  {fmt(netMonthly * 12)}
                </div>
              </div>

              <button
                onClick={scrollToContact}
                className="w-full font-display font-bold uppercase tracking-wide text-sm bg-[#c8970d] hover:bg-[#a87b0a] text-[#0b1829] px-5 py-4 flex items-center justify-center gap-2 transition-all"
              >
                Start saving
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <p className="text-slate-500 text-xs leading-relaxed">
                Estimate only, based on your inputs. Actual savings are measured per fill-up and
                billed at 25% of the verified amount — no savings, no fee.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

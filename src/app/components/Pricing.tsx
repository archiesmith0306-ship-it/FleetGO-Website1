import { motion } from 'motion/react';
import { Check, ArrowUpRight } from 'lucide-react';
import { CORE_TIERS, CORE_INCLUDES, ADDONS } from '../data/platforms';

export default function Pricing() {
  const scrollToContact = () =>
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="pricing" className="bg-[#f4f5f7] border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Heading */}
        <div className="grid lg:grid-cols-2 gap-10 items-end mb-14">
          <div>
            <span className="inline-flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full border-2 border-[#c8970d]" />
              <span className="font-mono uppercase tracking-[0.18em] text-[#c8970d] text-[11px]">
                Pricing
              </span>
            </span>
            <h2 className="font-display font-extrabold tracking-[-0.03em] leading-[1.02] text-[clamp(1.9rem,4.4vw,3.4rem)] text-[#0b1829]">
              One rate per truck.{' '}
              <span className="text-[#c8970d]">Add only what you need.</span>
            </h2>
          </div>
          <p className="text-slate-600 text-lg leading-relaxed">
            The core plan covers PM, PTI, Cases and Follow-ups for every truck you run. RoadWatch
            and Fuel Saving are priced separately, because not every fleet needs them on day one.
          </p>
        </div>

        {/* Core tiers */}
        <div className="border border-slate-300 bg-white mb-6">
          <div className="bg-[#0b1829] px-6 py-4 flex items-center justify-between flex-wrap gap-2">
            <span className="font-display font-bold uppercase tracking-wide text-white">
              Core plan — Fleet Management
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#c8970d]">
              Per truck · per month
            </span>
          </div>

          <div className="grid grid-cols-1 divide-y divide-slate-200">
            {CORE_TIERS.map((tier, i) => (
              <motion.div
                key={tier.range}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-5 ${
                  tier.popular ? 'bg-[#c8970d]/8 border-l-4 border-[#c8970d]' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-slate-400">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <div className="font-display font-bold text-lg text-[#0b1829] flex items-center gap-3 flex-wrap">
                      {tier.range}
                      {tier.popular && (
                        <span className="font-mono text-[9px] uppercase tracking-[0.14em] bg-[#c8970d] text-[#0b1829] px-2 py-1">
                          Most popular
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-slate-500">All core platforms included</div>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="text-right">
                    <span
                      className={`font-display font-extrabold text-3xl ${
                        tier.popular ? 'text-[#c8970d]' : 'text-[#0b1829]'
                      }`}
                    >
                      {tier.price}
                    </span>
                    {tier.unit && (
                      <span className="font-mono text-[10px] text-slate-500 ml-1">{tier.unit}</span>
                    )}
                  </div>
                  <button
                    onClick={scrollToContact}
                    className={`font-display font-bold uppercase tracking-wide text-xs px-5 py-2.5 transition-all whitespace-nowrap ${
                      tier.popular
                        ? 'bg-[#c8970d] hover:bg-[#a87b0a] text-[#0b1829]'
                        : 'border border-[#0b1829] text-[#0b1829] hover:bg-[#0b1829] hover:text-white'
                    }`}
                  >
                    Get started
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* What's included */}
        <div className="bg-white border border-slate-300 p-8 mb-10">
          <h3 className="font-display font-bold uppercase text-lg text-[#0b1829] mb-6 flex items-center gap-3">
            <span className="w-6 h-1 bg-[#c8970d] block" />
            Every core plan includes
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CORE_INCLUDES.map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm text-slate-700">
                <Check className="w-4 h-4 text-[#c8970d] flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Add-ons */}
        <h3 className="font-display font-extrabold tracking-[-0.02em] text-2xl text-[#0b1829] mb-5">
          Paid add-ons
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {ADDONS.map((a, i) => (
            <motion.div
              key={a.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="bg-[#0b1829] text-white p-6 flex flex-col"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#c8970d] mb-3">
                Add-on {String(i + 1).padStart(2, '0')}
              </div>
              <div className="font-display font-bold text-lg mb-4">{a.name}</div>
              <div className="flex items-baseline gap-1.5 mb-3">
                <span className="font-display font-extrabold text-4xl text-[#c8970d]">
                  {a.price}
                </span>
                <span className="font-mono text-[10px] text-slate-400">{a.unit}</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mt-auto">{a.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border-t-2 border-[#0b1829] pt-7">
          <p className="text-slate-600 text-sm max-w-xl">
            Billed monthly in arrears on active days per truck, capped at the monthly rate. Repair
            and parts costs, towing and third-party fees are not included.
          </p>
          <button
            onClick={scrollToContact}
            className="font-display font-bold uppercase tracking-wide text-sm bg-[#c8970d] hover:bg-[#a87b0a] text-[#0b1829] px-6 py-3.5 flex items-center gap-2 transition-all whitespace-nowrap"
          >
            Request a quote
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

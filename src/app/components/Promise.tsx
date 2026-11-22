import { motion } from 'motion/react';
import CountUp from './CountUp';
import { STATS } from '../data/platforms';

const KPIS = [
  { label: 'Carrier partners', value: 13, suffix: '' },
  { label: 'Trucks managed', value: 400, suffix: '' },
  { label: 'Service locations', value: 1000, suffix: '+' },
  { label: 'In-house specialists', value: 14, suffix: '' },
];

export default function Promise() {
  return (
    <section className="bg-[#f4f5f7] border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <span className="inline-flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full border-2 border-[#c8970d]" />
              <span className="font-mono uppercase tracking-[0.18em] text-[#c8970d] text-[11px]">
                The promise
              </span>
            </span>
            <h2 className="font-display font-extrabold tracking-[-0.03em] leading-[1.02] text-[clamp(1.9rem,4.2vw,3.25rem)] text-[#0b1829]">
              Your truck is back on the road,{' '}
              <span className="text-[#c8970d]">or you hear from us before you have to ask.</span>
            </h2>
          </div>
          <div className="lg:pt-16">
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              We do not wait for a driver to call in a problem. Inspections, service intervals,
              safety alerts and fuel stops are watched {STATS.coverage} by {STATS.specialists}{' '}
              in-house specialists — and every case is closed with a work order and a weekly
              expense statement.
            </p>
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c8970d]" />
              {STATS.coverage} live coverage · {STATS.statesCovered} states
            </div>
          </div>
        </div>

        {/* KPI grid */}
        <div className="border-t-2 border-[#0b1829]">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-300">
            {KPIS.map((kpi, i) => (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="py-8 px-5 first:pl-0"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 bg-[#c8970d]" />
                  {kpi.label}
                </div>
                <div className="font-display font-extrabold tracking-[-0.04em] text-[clamp(2.25rem,5vw,3.75rem)] text-[#0b1829] leading-none">
                  <CountUp to={kpi.value} suffix={kpi.suffix} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

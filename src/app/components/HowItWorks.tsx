import { motion } from 'motion/react';
import { ArrowUpRight, ClipboardList, Radar, Receipt } from 'lucide-react';
import SectionLabel from './SectionLabel';

const STEPS = [
  {
    icon: ClipboardList,
    title: 'Tell us about your fleet',
    text: 'Share your truck count, current vendors and what keeps breaking. We quote one flat per-truck price for your size.',
  },
  {
    icon: Radar,
    title: 'We take over the watching',
    text: 'Your trucks go onto our six platforms and our team starts tracking PM, inspections, safety events and fuel, 24/7.',
  },
  {
    icon: Receipt,
    title: 'You run loads, we handle the rest',
    text: 'Issues get booked, fixed and closed out. You get a weekly expense statement and one invoice.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="bg-[#0b1829] text-white border-y border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 items-end mb-12">
          <div>
            <SectionLabel id="how" />
            <h2 className="font-display font-extrabold tracking-[-0.03em] leading-[1.02] text-[clamp(1.9rem,4.4vw,3.4rem)]">
              Three steps.{' '}
              <span className="text-[#c8970d] lg:block">Then it just runs.</span>
            </h2>
          </div>
          <p className="text-slate-400 text-lg leading-relaxed">
            FleetGO is your outsourced fleet maintenance and safety team. Here is what working with
            us looks like, from the first call to the weekly statement.
          </p>
        </div>

        <ol className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <motion.li
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="bg-[#0b1829] p-8 relative"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="w-12 h-12 grid place-items-center bg-[#c8970d]">
                  <Icon className="w-6 h-6 text-[#0b1829]" />
                </span>
                <span className="font-display font-extrabold text-5xl text-white/10 leading-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="font-display font-bold text-xl mb-2">{title}</h3>
              <p className="text-slate-400 leading-relaxed">{text}</p>
            </motion.li>
          ))}
        </ol>

        <div className="flex flex-wrap gap-3 mt-10">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 font-display font-bold uppercase tracking-wide text-sm bg-[#c8970d] hover:bg-[#a87b0a] text-[#0b1829] px-6 py-3.5 transition-colors"
          >
            Get a quote <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 font-display font-semibold uppercase tracking-wide text-sm border border-white/25 hover:border-white/60 text-white px-6 py-3.5 transition-colors"
          >
            See pricing
          </a>
        </div>
      </div>
    </section>
  );
}

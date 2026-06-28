import { motion } from 'motion/react';
import { MapPin, Truck, Clock } from 'lucide-react';

const stats = [
  { icon: Truck, value: '48', label: 'States Covered' },
  { icon: MapPin, value: '300+', label: 'Service Locations' },
  { icon: Clock, value: '24/7', label: 'Nationwide Support' },
];

// Live Google My Maps with our real, labelled service locations.
const MAP_EMBED_URL =
  'https://www.google.com/maps/d/embed?mid=1JPJasd1u1hHH--ATx5uC7d5oj99Lr7s&ehbc=2E312F';

export default function CoverageMap() {
  return (
    <section id="coverage" className="py-24 px-6 bg-[#060e1a] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c8970d]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#c8970d]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 border border-[#c8970d]/40 px-3 py-1.5 mb-5">
            <span className="w-2 h-2 bg-[#c8970d] rounded-full animate-pulse" />
            <span className="font-oswald uppercase tracking-widest text-[#c8970d] text-xs">Coverage Area</span>
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nationwide Fleet{' '}
            <span className="text-[#c8970d]">Coverage</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            From coast to coast — 300+ labelled partner locations keep your trucks moving with 24/7 support across all 48 contiguous states.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-3 gap-6 mb-10 max-w-2xl mx-auto"
        >
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-[#c8970d]/10 border border-[#c8970d]/30 mb-2">
                <Icon className="w-5 h-5 text-[#c8970d]" />
              </div>
              <div className="text-2xl font-bold text-white">{value}</div>
              <div className="text-slate-500 text-xs uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Live map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative border border-[#c8970d]/20 overflow-hidden bg-[#0a1424]"
          style={{ height: 520 }}
        >
          {/* Corner accents */}
          <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#c8970d] z-10 pointer-events-none" />
          <span className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#c8970d] z-10 pointer-events-none" />
          <span className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#c8970d] z-10 pointer-events-none" />
          <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#c8970d] z-10 pointer-events-none" />

          {/* Real, labelled service locations */}
          <iframe
            title="FleetGO Service Locations"
            src={MAP_EMBED_URL}
            className="absolute inset-0 w-full h-full"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Brand watermark overlay */}
          <div className="absolute bottom-2 right-3 z-20 flex items-center gap-1.5 bg-[#060e1a]/80 px-2 py-1 border border-[#c8970d]/20">
            <MapPin className="w-3 h-3 text-[#c8970d]" />
            <span className="text-[#c8970d] text-[10px] font-oswald uppercase tracking-widest">FleetGO Network</span>
          </div>
        </motion.div>

        <p className="text-center text-slate-600 text-xs mt-4">
          Headquartered in Naperville, IL — serving fleets across the continental United States
        </p>
      </div>
    </section>
  );
}

import { motion } from 'motion/react';
import { MapPin, Truck, Clock } from 'lucide-react';

const stats = [
  { icon: Truck, value: '48', label: 'States Covered' },
  { icon: MapPin, value: '500+', label: 'Service Locations' },
  { icon: Clock, value: '24/7', label: 'Nationwide Support' },
];

// Approximate positions of major service hubs on a 100 x 60 grid (US-shaped layout).
const HQ = { name: 'Chicago HQ', x: 62, y: 22 };
const hubs = [
  { name: 'Seattle', x: 11, y: 9 },
  { name: 'Los Angeles', x: 9, y: 38 },
  { name: 'Denver', x: 37, y: 28 },
  { name: 'Dallas', x: 50, y: 46 },
  { name: 'Minneapolis', x: 52, y: 14 },
  { name: 'Atlanta', x: 73, y: 42 },
  { name: 'Miami', x: 82, y: 56 },
  { name: 'New York', x: 86, y: 19 },
];

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
            From coast to coast — FleetGO keeps your trucks moving with 24/7 support across all 48 contiguous states.
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

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative border border-[#c8970d]/20 overflow-hidden bg-gradient-to-br from-[#0a1424] to-[#060e1a]"
          style={{ height: 480 }}
        >
          {/* Corner accents */}
          <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#c8970d] z-10 pointer-events-none" />
          <span className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#c8970d] z-10 pointer-events-none" />
          <span className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#c8970d] z-10 pointer-events-none" />
          <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#c8970d] z-10 pointer-events-none" />

          {/* Dotted texture */}
          <div
            className="absolute inset-0 opacity-[0.18] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#c8970d 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Service-network graphic — pure SVG, always renders */}
          <svg
            viewBox="0 0 100 60"
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 w-full h-full"
          >
            {/* Connection lines radiating from HQ */}
            {hubs.map((h) => (
              <line
                key={`line-${h.name}`}
                x1={HQ.x}
                y1={HQ.y}
                x2={h.x}
                y2={h.y}
                stroke="#c8970d"
                strokeWidth="0.25"
                strokeOpacity="0.35"
                strokeDasharray="1.4 1.4"
              />
            ))}

            {/* Service hubs */}
            {hubs.map((h) => (
              <g key={h.name}>
                <circle cx={h.x} cy={h.y} r="2.6" fill="#c8970d" opacity="0.25">
                  <animate attributeName="r" values="1;3.4;1" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.35;0;0.35" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx={h.x} cy={h.y} r="0.9" fill="#c8970d" />
                <text
                  x={h.x}
                  y={h.y - 2}
                  fill="#94a3b8"
                  fontSize="1.7"
                  textAnchor="middle"
                  fontFamily="'Oswald', system-ui, sans-serif"
                >
                  {h.name}
                </text>
              </g>
            ))}

            {/* HQ marker */}
            <circle cx={HQ.x} cy={HQ.y} r="4" fill="#c8970d" opacity="0.2">
              <animate attributeName="r" values="1.6;5;1.6" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.45;0;0.45" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <circle cx={HQ.x} cy={HQ.y} r="1.5" fill="#c8970d" stroke="#ffffff" strokeWidth="0.4" />
            <text
              x={HQ.x}
              y={HQ.y + 3.4}
              fill="#c8970d"
              fontSize="2"
              fontWeight="600"
              textAnchor="middle"
              fontFamily="'Oswald', system-ui, sans-serif"
            >
              Chicago HQ
            </text>
          </svg>

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

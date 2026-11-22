const proofPoints = [
  '13 Carrier Partners',
  '400 Trucks Under Management',
  '24/7 Live Coverage',
  '14 In-House Specialists',
  '1,000+ Partner Service Locations',
  '48 States Covered',
];

export default function TrustedPartners() {
  const loop = [...proofPoints, ...proofPoints];

  return (
    <section className="bg-[#f4f5f7] border-y border-slate-200 py-0">
      {/* Label row */}
      <div className="max-w-7xl mx-auto px-6">
        <p className="font-oswald uppercase tracking-[0.25em] text-xs text-slate-500 text-center py-4 border-b border-slate-200">
          Trusted by Trucking Operations Nationwide
        </p>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden py-5">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#f4f5f7] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#f4f5f7] to-transparent z-10" />

        <div className="flex gap-14 animate-marquee whitespace-nowrap">
          {loop.map((label, i) => (
            <span
              key={`${label}-${i}`}
              className="font-oswald uppercase tracking-wider text-xl md:text-2xl text-slate-500 flex-shrink-0"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

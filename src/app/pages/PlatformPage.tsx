import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ArrowLeft, ArrowRight, X, Maximize2 } from 'lucide-react';
import { PLATFORMS, CORE_TIERS, COMPANY } from '../data/platforms';
import { galleryFor } from '../data/gallery';

export default function PlatformPage() {
  const { slug } = useParams();
  const index = PLATFORMS.findIndex((p) => p.slug === slug);
  const platform = PLATFORMS[index];
  const shots = platform ? galleryFor(platform.slug) : [];
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    setActive(0);
    setZoom(false);
    if (platform) document.title = `${platform.name} — FleetGO`;
    return () => {
      document.title = 'FleetGO — Fleet Management & Maintenance Services | Naperville, IL';
    };
  }, [platform]);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setZoom(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoom]);

  if (!platform) return <Navigate to="/" replace />;

  const prev = PLATFORMS[(index - 1 + PLATFORMS.length) % PLATFORMS.length];
  const next = PLATFORMS[(index + 1) % PLATFORMS.length];
  const shot = shots[active];

  return (
    <>
      {/* Hero band */}
      <section className="bg-[#060e1a] text-white pt-28 pb-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500 mb-8 flex items-center gap-2">
            <Link to={{ pathname: '/', hash: '#platforms' }} className="hover:text-white transition-colors">
              Platforms
            </Link>
            <span>/</span>
            <span className="text-[#c8970d]">
              {String(index + 1).padStart(2, '0')} of {String(PLATFORMS.length).padStart(2, '0')}
            </span>
          </div>

          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 items-end">
            <div>
              <span
                className={`inline-block font-mono text-[10px] uppercase tracking-[0.16em] px-2.5 py-1.5 mb-6 border ${
                  platform.billing === 'addon'
                    ? 'border-[#c8970d]/60 text-[#c8970d]'
                    : 'border-white/20 text-slate-300'
                }`}
              >
                {platform.billing === 'addon' ? 'Paid add-on' : 'Included in the core plan'}
              </span>
              <h1 className="font-display font-extrabold tracking-[-0.035em] leading-[0.92] text-[clamp(2.6rem,7vw,5.5rem)] mb-6">
                {platform.name}
              </h1>
              <p className="font-display font-bold text-[#c8970d] text-xl md:text-2xl tracking-[-0.01em]">
                {platform.tagline}
              </p>
            </div>
            <div>
              <p className="text-slate-300 text-lg leading-relaxed mb-7">{platform.summary}</p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to={{ pathname: '/', hash: '#contact' }}
                  className="font-display font-bold uppercase tracking-wide text-sm bg-[#c8970d] hover:bg-[#a87b0a] text-[#0b1829] px-6 py-3.5 flex items-center gap-2 transition-colors"
                >
                  Get a quote
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href={COMPANY.phoneHref}
                  className="font-display font-semibold uppercase tracking-wide text-sm border border-white/25 hover:border-white/60 px-6 py-3.5 transition-colors"
                >
                  {COMPANY.phone}
                </a>
              </div>
            </div>
          </div>

          {platform.stats && (
            <div className="grid grid-cols-3 border-t-2 border-white/80 mt-14">
              {platform.stats.map((s, i) => (
                <div key={s.label} className={`pt-6 ${i ? 'pl-5 border-l border-white/10' : ''}`}>
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#c8970d]" />
                    {s.label}
                  </div>
                  <div className="font-display font-extrabold tracking-[-0.04em] text-[clamp(2rem,5vw,3.5rem)] leading-none">
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Screenshot showcase */}
      {shot && (
        <section className="bg-[#0b1829] text-white border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="flex items-end justify-between gap-6 mb-8 flex-wrap">
              <h2 className="font-display font-extrabold tracking-[-0.03em] text-[clamp(1.7rem,3.6vw,2.75rem)] leading-[1.05]">
                The real product, <span className="text-[#c8970d]">not a mock-up.</span>
              </h2>
              <span className="font-mono text-[11px] tracking-[0.16em] text-slate-500">
                {String(active + 1).padStart(2, '0')} / {String(shots.length).padStart(2, '0')}
              </span>
            </div>

            {/* Browser frame */}
            <div className="border border-white/10 bg-[#060e1a] shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-3 font-mono text-[10px] tracking-[0.12em] text-slate-500 truncate">
                  fleetgo · {platform.name.toLowerCase()}
                </span>
                <button
                  onClick={() => setZoom(true)}
                  aria-label="View full size"
                  className="ml-auto text-slate-500 hover:text-[#c8970d] transition-colors"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
              <AnimatePresence mode="wait">
                <motion.button
                  key={shot.src}
                  onClick={() => setZoom(true)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="block w-full cursor-zoom-in bg-[#060e1a]"
                >
                  <img
                    src={shot.src}
                    alt={shot.caption}
                    loading="lazy"
                    className="w-full max-h-[640px] object-contain object-top"
                  />
                </motion.button>
              </AnimatePresence>
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#c8970d] mt-4">
              {shot.caption}
            </p>

            {shots.length > 1 && (
              <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                {shots.map((s, i) => (
                  <button
                    key={s.src}
                    onClick={() => setActive(i)}
                    aria-label={s.caption}
                    className={`aspect-[4/3] overflow-hidden border-2 transition-all ${
                      i === active ? 'border-[#c8970d]' : 'border-white/10 opacity-55 hover:opacity-100'
                    }`}
                  >
                    <img src={s.src} alt="" loading="lazy" className="w-full h-full object-cover object-top" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Capabilities */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="font-display font-extrabold tracking-[-0.03em] text-[clamp(1.7rem,3.6vw,2.75rem)] text-[#0b1829] mb-12 max-w-2xl leading-[1.05]">
            What {platform.name} <span className="text-[#c8970d]">does for your fleet.</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
            {platform.capabilities.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="bg-white p-8 hover:bg-[#f4f5f7] transition-colors"
              >
                <div className="font-mono text-xs text-[#c8970d] mb-5">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="font-display font-bold text-xl text-[#0b1829] mb-3">{c.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{c.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing callout */}
      <section className="bg-[#f4f5f7] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#c8970d] mb-3">Pricing</div>
            <div className="font-display font-extrabold tracking-[-0.03em] text-[clamp(2rem,5vw,3.5rem)] text-[#0b1829] leading-none mb-4">
              {platform.priceLabel}
            </div>
            {platform.priceDetail && <p className="text-slate-600 text-lg">{platform.priceDetail}</p>}
          </div>
          {platform.billing === 'included' ? (
            <div className="bg-white border border-slate-300">
              {CORE_TIERS.map((t) => (
                <div
                  key={t.range}
                  className="flex items-center justify-between px-5 py-3 border-b border-slate-200 last:border-b-0"
                >
                  <span className="font-display font-semibold text-[#0b1829]">{t.range}</span>
                  <span className="font-display font-bold text-[#0b1829]">
                    {t.price}
                    <span className="font-mono text-[10px] text-slate-500 ml-1">{t.unit}</span>
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                to={{ pathname: '/', hash: '#pricing' }}
                className="font-display font-bold uppercase tracking-wide text-sm border border-[#0b1829] text-[#0b1829] hover:bg-[#0b1829] hover:text-white px-6 py-3.5 transition-colors"
              >
                All pricing
              </Link>
              <Link
                to={{ pathname: '/', hash: '#contact' }}
                className="font-display font-bold uppercase tracking-wide text-sm bg-[#c8970d] hover:bg-[#a87b0a] text-[#0b1829] px-6 py-3.5 flex items-center gap-2 transition-colors"
              >
                Add it to my plan
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Prev / next */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 divide-x divide-slate-200 border-b border-slate-200">
          {[
            { p: prev, dir: 'Previous', icon: <ArrowLeft className="w-4 h-4" />, align: 'text-left' },
            { p: next, dir: 'Next', icon: <ArrowRight className="w-4 h-4" />, align: 'text-right' },
          ].map(({ p, dir, icon, align }) => (
            <Link key={dir} to={`/platforms/${p.slug}`} className={`group py-10 px-4 ${align}`}>
              <div
                className={`font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 mb-2 flex items-center gap-2 ${
                  dir === 'Next' ? 'justify-end' : ''
                }`}
              >
                {dir === 'Previous' && icon}
                {dir}
                {dir === 'Next' && icon}
              </div>
              <div className="font-display font-extrabold tracking-[-0.02em] text-xl md:text-3xl text-[#0b1829] group-hover:text-[#c8970d] transition-colors">
                {p.name}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {zoom && shot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoom(false)}
            className="fixed inset-0 z-[60] bg-[#060e1a]/95 p-4 md:p-10 grid place-items-center cursor-zoom-out"
            role="dialog"
            aria-modal="true"
            aria-label={shot.caption}
          >
            <button
              onClick={() => setZoom(false)}
              aria-label="Close"
              className="absolute top-4 right-4 text-white/70 hover:text-white"
            >
              <X className="w-7 h-7" />
            </button>
            <img src={shot.src} alt={shot.caption} className="max-w-full max-h-full object-contain" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

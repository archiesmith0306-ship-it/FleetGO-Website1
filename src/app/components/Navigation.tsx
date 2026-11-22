import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, ChevronDown, ChevronRight, LogIn } from 'lucide-react';
import Logo from './Logo';
import { COMPANY, PLATFORMS } from '../data/platforms';

import { CHAPTERS, chapterNumber, type ChapterId } from '../data/sections';

// Desktop shows the main stops of the story, in page order (Platforms sits in its place).
const DESKTOP: ChapterId[] = ['how', 'platforms', 'inspection', 'coverage', 'pricing', 'contact'];
const label = (id: ChapterId) => CHAPTERS.find((c) => c.id === id)!.label;

/** Which chapter is on screen, and how far down the page the visitor is (home page only). */
function usePageProgress(enabled: boolean) {
  const [active, setActive] = useState<ChapterId | null>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!enabled) {
      setActive(null);
      setProgress(0);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.35;
      let current: ChapterId | null = null;
      for (const c of CHAPTERS) {
        const el = document.getElementById(c.id);
        if (el && el.getBoundingClientRect().top <= line) current = c.id;
      }
      setActive(current);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled]);
  return { active, progress };
}

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [platformsOpen, setPlatformsOpen] = useState(false);
  const location = useLocation();
  const { active, progress } = usePageProgress(location.pathname === '/');

  // Close menus whenever the route or hash changes.
  useEffect(() => {
    setMobileOpen(false);
    setPlatformsOpen(false);
  }, [location.pathname, location.hash]);

  const linkCls =
    'relative font-display font-semibold uppercase tracking-wide text-[13px] px-3.5 h-16 flex items-center transition-colors';
  const tone = (id: ChapterId) => (active === id ? 'text-white' : 'text-slate-300 hover:text-white');
  const underline = (id: ChapterId) =>
    active === id ? <span className="absolute left-3.5 right-3.5 bottom-0 h-0.5 bg-[#c8970d]" /> : null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0b1829]/95 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" aria-label="FleetGO home" className="flex-shrink-0">
            <Logo className="h-9" />
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center">
            {DESKTOP.map((id) =>
              id === 'platforms' ? (
              <div
                key="platforms"
                className="relative"
                onMouseEnter={() => setPlatformsOpen(true)}
                onMouseLeave={() => setPlatformsOpen(false)}
              >
                <button
                  onClick={() => setPlatformsOpen((v) => !v)}
                  aria-expanded={platformsOpen}
                  className={`${linkCls} gap-1.5 ${tone('platforms')}`}
                >
                  Platforms
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${platformsOpen ? 'rotate-180' : ''}`} />
                  {underline('platforms')}
                </button>
                <AnimatePresence>
                  {platformsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.16 }}
                      className="absolute left-0 top-full w-[440px] bg-[#0b1829] border border-white/10 shadow-2xl p-2 grid grid-cols-2 gap-1"
                    >
                      {PLATFORMS.map((p, i) => (
                        <Link
                          key={p.slug}
                          to={`/platforms/${p.slug}`}
                          className="group p-3 hover:bg-white/5 transition-colors"
                        >
                          <div className="font-mono text-[10px] tracking-[0.14em] text-[#c8970d] mb-1">
                            {String(i + 1).padStart(2, '0')} · {p.billing === 'addon' ? 'ADD-ON' : 'CORE'}
                          </div>
                          <div className="font-display font-bold text-sm text-white group-hover:text-[#c8970d] transition-colors">
                            {p.name}
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              ) : (
                <Link key={id} to={{ pathname: '/', hash: `#${id}` }} className={`${linkCls} ${tone(id)}`}>
                  {label(id)}
                  {underline(id)}
                </Link>
              )
            )}

            <a
              href={COMPANY.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 font-display font-semibold uppercase tracking-wide text-[13px] border border-[#c8970d]/60 text-[#c8970d] hover:bg-[#c8970d] hover:text-[#0b1829] px-4 py-2 flex items-center gap-1.5 transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" />
              Login
            </a>
            <a
              href={COMPANY.phoneHref}
              className="ml-2 font-display font-bold uppercase tracking-wide text-[13px] bg-[#c8970d] hover:bg-[#a87b0a] text-[#0b1829] px-4 py-2 flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              {COMPANY.phone}
            </a>
          </div>

          {/* Mobile toggles */}
          <div className="lg:hidden flex items-center gap-2">
            {active && (
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#c8970d] mr-1">
                {chapterNumber(active)} · {label(active)}
              </span>
            )}
            <a href={COMPANY.phoneHref} aria-label="Call FleetGO" className="bg-[#c8970d] text-[#0b1829] p-2.5">
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className="p-2.5 text-white hover:bg-white/10 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden border-t border-white/10"
            >
              <div className="py-3 max-h-[75vh] overflow-y-auto">
                <div className="font-mono text-[10px] tracking-[0.16em] text-[#c8970d] px-4 pt-2 pb-1">ON THIS PAGE</div>
                {CHAPTERS.map((c) => (
                  <Link
                    key={c.id}
                    to={{ pathname: '/', hash: `#${c.id}` }}
                    className={`flex items-center gap-3 px-4 py-3 font-display font-semibold uppercase tracking-wide text-sm hover:bg-white/5 ${
                      active === c.id ? 'text-white bg-white/5' : 'text-slate-300'
                    }`}
                  >
                    <span className="font-mono text-[11px] text-[#c8970d] w-5">{chapterNumber(c.id)}</span>
                    {c.label}
                    <ChevronRight className="w-4 h-4 text-slate-500 ml-auto" />
                  </Link>
                ))}
                <div className="h-px bg-white/10 my-2" />
                <div className="font-mono text-[10px] tracking-[0.16em] text-[#c8970d] px-4 pt-2 pb-1">PLATFORM PAGES</div>
                {PLATFORMS.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/platforms/${p.slug}`}
                    className="flex items-center justify-between px-4 py-3 text-slate-200 hover:bg-white/5 text-sm"
                  >
                    {p.name}
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </Link>
                ))}
                <a
                  href={COMPANY.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-4 mt-3 font-display font-bold uppercase tracking-wide text-sm border border-[#c8970d] text-[#c8970d] py-3 flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Reading progress through the home page story */}
      {location.pathname === '/' && (
        <div className="absolute left-0 bottom-0 h-0.5 bg-[#c8970d] origin-left" style={{ width: `${progress * 100}%` }} aria-hidden />
      )}
    </nav>
  );
}

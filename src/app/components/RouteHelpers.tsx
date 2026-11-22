import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router';
import { Phone, ArrowUpRight } from 'lucide-react';
import { COMPANY } from '../data/platforms';

/** Fixed call / quote bar on phones — the primary CTAs never scroll out of reach. */
export function MobileCTA() {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 grid grid-cols-2 border-t border-white/10 bg-[#0b1829]/95 backdrop-blur">
      <a
        href={COMPANY.phoneHref}
        className="flex items-center justify-center gap-2 py-3.5 font-display font-bold uppercase tracking-wide text-sm text-white border-r border-white/10"
      >
        <Phone className="w-4 h-4 text-[#c8970d]" />
        Call 24/7
      </a>
      <Link
        to={{ pathname: '/', hash: '#contact' }}
        className="flex items-center justify-center gap-2 py-3.5 font-display font-bold uppercase tracking-wide text-sm bg-[#c8970d] text-[#0b1829]"
      >
        Get a quote
        <ArrowUpRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

/**
 * Scroll behaviour that cooperates with the page curtain:
 * - hash links seek their section once it has mounted (after the curtain exit);
 * - re-clicking the current page (e.g. the logo on Home) glides to the top;
 * - a new page's scroll reset is done by AnimatePresence while the curtain covers the screen.
 */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const prevPath = useRef(pathname);

  useEffect(() => {
    const samePage = prevPath.current === pathname;
    prevPath.current = pathname;

    if (!hash) {
      if (samePage) window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const id = hash.slice(1);
    let tries = 0;
    let raf = 0;
    const seek = () => {
      const el = document.getElementById(id);
      if (el) {
        // Layout offset ignores the page's fade-up transform, so we land exactly under the nav.
        let y = -64;
        for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) y += n.offsetTop;
        window.scrollTo({ top: y, behavior: samePage ? 'smooth' : 'auto' });
      } else if (tries++ < 180) {
        raf = requestAnimationFrame(seek);
      }
    };
    // On a page change, wait for the outgoing page to leave before seeking.
    const t = window.setTimeout(() => (raf = requestAnimationFrame(seek)), samePage ? 0 : 480);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, [pathname, hash, key]);

  return null;
}

import { useEffect } from 'react';
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

/** Scroll to the hash target after navigation, or to the top for a new page. */
export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }
    // Wait a frame so the target section exists after a route change.
    const id = hash.slice(1);
    let tries = 0;
    const seek = () => {
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 64;
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else if (tries++ < 20) {
        requestAnimationFrame(seek);
      }
    };
    requestAnimationFrame(seek);
  }, [pathname, hash]);

  return null;
}

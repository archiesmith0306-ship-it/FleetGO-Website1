import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Phone, Mail, MapPin } from 'lucide-react';
import Logo from './Logo';
import { COMPANY, PLATFORMS, STATS } from '../data/platforms';
import { CHAPTERS, chapterNumber } from '../data/sections';

function useCentralTime() {
  const fmt = () =>
    new Date().toLocaleTimeString('en-US', {
      timeZone: 'America/Chicago',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  const [t, setT] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export default function Footer() {
  const time = useCentralTime();
  const heading = 'font-mono text-[10px] uppercase tracking-[0.18em] text-[#c8970d] mb-5';

  return (
    <footer className="bg-[#060e1a] text-slate-400 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] gap-10 mb-14">
          <div>
            <Logo className="h-10 mb-5" />
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-5">
              Fleet maintenance, inspections, safety and fuel — run {STATS.coverage} by one team on six
              connected platforms. Founded in 2026, built on 4+ years of hands-on industry experience.
            </p>
            <a
              href={COMPANY.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex font-mono text-[10px] uppercase tracking-[0.16em] border border-[#c8970d]/50 text-[#c8970d] hover:bg-[#c8970d] hover:text-[#0b1829] px-3 py-2 transition-colors"
            >
              Customer login ↗
            </a>
          </div>

          <div>
            <h4 className={heading}>Platforms</h4>
            <ul className="space-y-2.5 text-sm">
              {PLATFORMS.map((p) => (
                <li key={p.slug}>
                  <Link to={`/platforms/${p.slug}`} className="hover:text-white transition-colors">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={heading}>On this page</h4>
            <ul className="space-y-2.5 text-sm">
              {CHAPTERS.filter((c) => c.id !== 'platforms' && c.id !== 'contact').map((c) => (
                <li key={c.id}>
                  <Link to={{ pathname: '/', hash: `#${c.id}` }} className="hover:text-white transition-colors">
                    <span className="font-mono text-[11px] text-[#c8970d] mr-2">{chapterNumber(c.id)}</span>
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={heading}>Dispatch desk</h4>
            <div className="space-y-4 text-sm">
              <a href={COMPANY.phoneHref} className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-[#c8970d]" />
                {COMPANY.phone}
              </a>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 hover:text-white transition-colors break-all">
                <Mail className="w-4 h-4 text-[#c8970d] flex-shrink-0" />
                {COMPANY.email}
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#c8970d] flex-shrink-0 mt-0.5" />
                <span>
                  1811 W Diehl Road, Suite 200
                  <br />
                  Naperville, IL 60563
                </span>
              </div>
              <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-green-400">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Open now · 24/7
              </div>
            </div>
          </div>
        </div>

        {/* Live status bar */}
        <div className="border-y border-white/10 py-3 mb-6 overflow-hidden">
          <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-slate-500 flex flex-wrap gap-x-5 gap-y-1">
            <span>Naperville, IL</span>
            <span className="text-[#c8970d] tabular-nums">{time} CT</span>
            <span>{STATS.trucks} trucks under watch</span>
            <span className="hidden sm:inline">One team. {STATS.coverage}.</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-3 text-xs text-slate-600">
          <p>&copy; {new Date().getFullYear()} FleetGO. All rights reserved.</p>
          <p>Fleet management services · Naperville, Illinois</p>
        </div>
      </div>
    </footer>
  );
}

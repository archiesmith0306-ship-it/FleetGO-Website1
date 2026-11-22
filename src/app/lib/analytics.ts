// Google Analytics 4 for www.myfleetgo.com.
//
// - Loads only on the production domain, so Vercel previews and local testing never skew numbers.
// - Add ?ga_debug=1 to any URL to force it on with debug_mode, then watch events live in
//   GA4 → Admin → DebugView.
// - Page views are automatic: GA4 "Enhanced measurement" records every route change.

const GA_ID = 'G-HE2MGKWBS1';
const PRODUCTION_HOSTS = ['myfleetgo.com', 'www.myfleetgo.com'];
const PORTAL_HOST = 'pti-guardian-bot.lovable.app';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let started = false;

export function initAnalytics() {
  if (started || typeof window === 'undefined') return;
  const debug = new URLSearchParams(window.location.search).has('ga_debug');
  if (!PRODUCTION_HOSTS.includes(window.location.hostname) && !debug) return;
  started = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js expects the raw `arguments` object, not an array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, debug ? { debug_mode: true } : {});

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  // One listener covers every phone, email, login and quote button on the site.
  document.addEventListener('click', trackClick, { capture: true });
}

export function track(event: string, params: Record<string, string | number | boolean> = {}) {
  window.gtag?.('event', event, params);
}

const QUOTE_CTA = /get a quote|request a quote|get started|start saving|add it to my plan|see pricing|all pricing/i;

function trackClick(e: MouseEvent) {
  const el = (e.target as Element | null)?.closest('a, button');
  if (!el) return;
  const href = el.getAttribute('href') ?? '';
  const text = (el.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 60);
  const where = window.location.pathname;

  if (href.startsWith('tel:')) track('phone_call_click', { link_text: text, page: where });
  else if (href.startsWith('mailto:')) track('email_click', { link_text: text, page: where });
  else if (href.includes(PORTAL_HOST)) track('portal_login_click', { link_text: text, page: where });
  else if (QUOTE_CTA.test(text)) track('quote_cta_click', { cta_text: text, page: where });
}

import { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router';
import { MotionConfig, motion, useAnimationControls } from 'motion/react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { MobileCTA, ScrollManager } from './components/RouteHelpers';
import Home from './pages/Home';

const loadPlatformPage = () => import('./pages/PlatformPage');
const PlatformPage = lazy(loadPlatformPage);

const EASE = [0.76, 0, 0.24, 1] as const;
const nextPaint = () =>
  new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));

/**
 * One persistent navy curtain (gold edges) runs a strict sequence on every page change:
 * cover the old page -> swap routes underneath -> wait for the new page to paint -> lift off.
 * Because the swap only happens while the screen is fully covered, there is never a blank frame.
 */
function AnimatedRoutes() {
  const location = useLocation();
  const [shown, setShown] = useState(location);
  const curtain = useAnimationControls();
  const page = useAnimationControls();

  useEffect(() => {
    // Same page (only the #hash changed): no curtain, ScrollManager glides to the section.
    if (location.pathname === shown.pathname) {
      setShown(location);
      return;
    }
    let cancelled = false;
    (async () => {
      await Promise.all([
        curtain.start({ y: '0%', transition: { duration: 0.45, ease: EASE } }),
        page.start({ y: -48, opacity: 0.55, transition: { duration: 0.45, ease: EASE } }),
      ]);
      if (cancelled) return;
      if (location.pathname.startsWith('/platforms/')) await loadPlatformPage();
      page.set({ y: 24, opacity: 0 });
      setShown(location);
      if (!location.hash) window.scrollTo({ top: 0, behavior: 'auto' });
      await nextPaint();
      if (cancelled) return;
      page.start({ y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] } });
      await curtain.start({ y: '-100%', transition: { duration: 0.55, ease: EASE } });
      curtain.set({ y: '100%' });
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <>
      <motion.div
        aria-hidden
        initial={{ y: '100%' }}
        animate={curtain}
        className="fixed inset-x-0 top-16 bottom-0 z-[45] bg-[#0b1829] border-y-2 border-[#c8970d] pointer-events-none"
      />
      <motion.div initial={false} animate={page}>
        <Suspense fallback={<div className="min-h-screen bg-[#060e1a]" />}>
          <Routes location={shown}>
            <Route path="/" element={<Home />} />
            <Route path="/platforms/:slug" element={<PlatformPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </motion.div>
    </>
  );
}

export default function App() {
  // Warm the platform-page chunk once the browser is idle, so the first transition is instant.
  useEffect(() => {
    const warm = () => void loadPlatformPage();
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(warm);
    else setTimeout(warm, 2000);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ScrollManager />
        <div className="min-h-screen bg-white text-[#0b1829] pb-14 lg:pb-0">
          <Navigation />
          <main>
            <AnimatedRoutes />
          </main>
          <Footer />
          <MobileCTA />
        </div>
        <Analytics />
        <SpeedInsights />
      </BrowserRouter>
    </MotionConfig>
  );
}

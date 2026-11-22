import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { MobileCTA, ScrollManager } from './components/RouteHelpers';
import Home from './pages/Home';
const PlatformPage = lazy(() => import('./pages/PlatformPage'));

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <div className="min-h-screen bg-white text-[#0b1829] pb-14 lg:pb-0">
        <Navigation />
        <main>
          <Suspense fallback={<div className="min-h-screen bg-[#060e1a]" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/platforms/:slug" element={<PlatformPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </Suspense>
        </main>
        <Footer />
        <MobileCTA />
      </div>
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  );
}

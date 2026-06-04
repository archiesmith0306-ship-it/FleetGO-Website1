import { useState } from 'react';
import { Phone, Mail, CheckCircle2 } from 'lucide-react';
import Hero from './components/Hero';
import Comparison from './components/Comparison';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import TrustedPartners from './components/TrustedPartners';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Navigation from './components/Navigation';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className={`size-full ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-gray-50 text-gray-900'} overflow-y-auto transition-colors duration-300`}>
      <Navigation 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
      <Hero isDarkMode={isDarkMode} />
      <Comparison isDarkMode={isDarkMode} />
      <Services isDarkMode={isDarkMode} />
      <TrustedPartners isDarkMode={isDarkMode} />
      <WhyChooseUs isDarkMode={isDarkMode} />
      <Pricing isDarkMode={isDarkMode} />
      <Contact isDarkMode={isDarkMode} />

      {/* Footer */}
      <footer className={`${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border-t py-16 px-6 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <h3 className="text-2xl font-bold mb-4">FleetGO</h3>
              <p className="text-slate-400 mb-6">
                Your trusted partner in fleet management and logistics solutions.
              </p>
              <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-lg px-3 py-2 w-fit">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400 text-sm font-semibold">4+ Years of Excellence</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-white">Contact</h4>
              <div className="space-y-3 text-slate-400">
                <div>
                  <div className="text-sm text-slate-500 mb-1">Phone</div>
                  <a href="tel:3313138474" className="hover:text-blue-400 transition-colors">(331) 313-8474</a>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Email</div>
                  <a href="mailto:archie.white@myfleetgo.com" className="hover:text-blue-400 transition-colors break-all">archie.white@myfleetgo.com</a>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-white">Office</h4>
              <div className="text-slate-400 space-y-1 text-sm">
                <p>1811 W Diehl Road</p>
                <p>Suite 200</p>
                <p>Naperville, IL 60563</p>
                <p>United States</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-white">Services</h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li className="hover:text-blue-400 transition-colors cursor-pointer">Fleet Management</li>
                <li className="hover:text-blue-400 transition-colors cursor-pointer">Maintenance Services</li>
                <li className="hover:text-blue-400 transition-colors cursor-pointer">24/7 Support</li>
                <li className="hover:text-blue-400 transition-colors cursor-pointer">ELD Compliance</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              &copy; 2026 FleetGO. All rights reserved. Serving the logistics industry since 2022.
            </p>
            <div className="flex gap-6 text-slate-500 text-sm">
              <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
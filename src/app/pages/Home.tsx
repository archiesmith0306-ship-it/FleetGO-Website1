import Hero from '../components/Hero';
import Promise from '../components/Promise';
import HowItWorks from '../components/HowItWorks';
import Platforms from '../components/Platforms';
import TruckInspector from '../components/TruckInspector';
import CoverageMap from '../components/CoverageMap';
import SavingsCalculator from '../components/SavingsCalculator';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';

// One story, top to bottom. Keep this order in sync with CHAPTERS in data/sections.ts.
export default function Home() {
  return (
    <>
      <Hero />
      <Promise /> {/* 01 Why FleetGO */}
      <HowItWorks /> {/* 02 How it works */}
      <Platforms /> {/* 03 Platforms */}
      <TruckInspector /> {/* 04 Inspection */}
      <CoverageMap /> {/* 05 Coverage */}
      <SavingsCalculator /> {/* 06 Fuel savings */}
      <Pricing /> {/* 07 Pricing */}
      <FAQ /> {/* 08 FAQ */}
      <Contact /> {/* 09 Contact */}
    </>
  );
}

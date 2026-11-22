import Hero from '../components/Hero';
import TrustedPartners from '../components/TrustedPartners';
import Promise from '../components/Promise';
import Platforms from '../components/Platforms';
import CoverageMap from '../components/CoverageMap';
import WhyChooseUs from '../components/WhyChooseUs';
import TruckInspector from '../components/TruckInspector';
import SavingsCalculator from '../components/SavingsCalculator';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedPartners />
      <Promise />
      <Platforms />
      <TruckInspector />
      <CoverageMap />
      <SavingsCalculator />
      <WhyChooseUs />
      <Pricing />
      <FAQ />
      <Contact />
    </>
  );
}

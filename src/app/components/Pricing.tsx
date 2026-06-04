import { motion } from 'motion/react';
import { Check, Star, ArrowRight } from 'lucide-react';

const pricingPlans = [
  {
    trucks: '1-9',
    price: '50',
    popular: false
  },
  {
    trucks: '10-19',
    price: '45',
    popular: true
  },
  {
    trucks: '20-29',
    price: '40',
    popular: false
  },
  {
    trucks: '30-50',
    price: '38',
    popular: false
  },
  {
    trucks: '50+',
    price: 'Custom',
    popular: false
  }
];

const features = [
  'Fleet Management & Maintenance',
  '24/7 Dedicated Support',
  'ELD Compliance Monitoring',
  'Preventative Maintenance',
  'Monthly Reporting & Analytics',
  'Work Order Management',
  'Breakdown Cost Analysis',
  'Dedicated Account Manager'
];

export default function Pricing({ isDarkMode }: { isDarkMode: boolean }) {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className={`py-24 px-6 ${isDarkMode ? 'bg-slate-950' : 'bg-white'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Simple, Transparent
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Flexible plans that scale with your fleet. No hidden fees, no surprises.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.trucks}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-6 ${
                plan.popular
                  ? 'bg-gradient-to-br from-blue-600 to-cyan-600 shadow-2xl shadow-blue-600/30 scale-105'
                  : 'bg-slate-900 border border-slate-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-slate-950 px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  POPULAR
                </div>
              )}

              <div className="text-center">
                <div className={`text-lg font-semibold mb-2 ${plan.popular ? 'text-white' : 'text-slate-400'}`}>
                  {plan.trucks} Trucks
                </div>
                <div className={`text-4xl font-bold mb-1 ${plan.popular ? 'text-white' : 'text-white'}`}>
                  {plan.price === 'Custom' ? plan.price : `$${plan.price}`}
                </div>
                {plan.price !== 'Custom' && (
                  <div className={`text-sm ${plan.popular ? 'text-blue-100' : 'text-slate-500'}`}>
                    per truck/month
                  </div>
                )}
              </div>

              <button
                onClick={scrollToContact}
                className={`w-full mt-6 py-3 rounded-xl font-semibold transition-all ${
                  plan.popular
                    ? 'bg-white text-blue-600 hover:bg-slate-100'
                    : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700'
                }`}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>

        {/* Features List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-12"
        >
          <h3 className="text-3xl font-bold mb-8 text-center">All Plans Include</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-start gap-3"
              >
                <div className="bg-blue-500/10 rounded-full p-1 flex-shrink-0">
                  <Check className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-slate-300">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 grid md:grid-cols-2 gap-6"
        >
          <div className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 border border-blue-500/30 rounded-2xl p-8">
            <h4 className="text-2xl font-bold mb-4 text-blue-400">Tender Tracking & Control</h4>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-blue-400" />
                1-25 Truckers: <span className="font-semibold">$30/tender</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-blue-400" />
                26+ Truckers: <span className="font-semibold">$20/tender</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 border border-purple-500/30 rounded-2xl p-8">
            <h4 className="text-2xl font-bold mb-4 text-purple-400">Supply Chain Procurement</h4>
            <p className="text-slate-300 mb-4">
              Finding best serviced Leasing & Renting companies
            </p>
            <p className="text-slate-300">
              Pricing: <span className="font-semibold">50% of first-time supplier fee</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
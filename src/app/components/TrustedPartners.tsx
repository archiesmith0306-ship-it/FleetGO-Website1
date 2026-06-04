import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

const partnerCategories = [
  {
    title: 'Fleet Management & Leasing',
    companies: ['Penske', 'Ryder', 'NationaLease']
  },
  {
    title: 'Technology & Tracking',
    companies: ['Samsara', 'GoMotive', 'TEL360']
  },
  {
    title: 'Equipment & Maintenance',
    companies: ['MHC Kenworth', 'Boss Truck Shops', 'STM Tires']
  },
  {
    title: 'Fuel & Services',
    companies: ['TA-Petro', 'Love\'s Travel Stops', 'Pilot Flying J']
  },
  {
    title: 'Our Valued Clients',
    companies: ['Dadakhon Trans Corp', 'Primeweek']
  }
];

export default function TrustedPartners({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <section className={`py-24 px-6 ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-gray-200'} border-t transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-blue-600/20 border border-blue-500/30 rounded-full px-6 py-2 mb-6">
            <span className="text-blue-400 font-semibold">4+ Years of Excellence</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Trusted by Industry Leaders</h2>
          <p className={`text-xl ${isDarkMode ? 'text-slate-400' : 'text-gray-600'} max-w-3xl mx-auto`}>
            We proudly partner with the most recognized names in fleet management,
            maintenance, and logistics to deliver exceptional service to our clients.
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {partnerCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-gradient-to-br ${
                category.title === 'Our Valued Clients'
                  ? 'from-blue-600/20 to-purple-600/20 border-2 border-blue-500/50'
                  : isDarkMode 
                    ? 'from-slate-800/50 to-slate-900/50 border border-slate-700'
                    : 'from-gray-50 to-gray-100 border border-gray-200'
              } rounded-2xl p-8 hover:border-blue-500/50 transition-all`}
            >
              <h3 className="text-xl font-bold mb-6 text-blue-400">{category.title}</h3>
              <ul className="space-y-3">
                {category.companies.map((company, idx) => (
                  <motion.li
                    key={company}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 + idx * 0.05 }}
                    className={`flex items-center gap-3 ${isDarkMode ? 'text-slate-200' : 'text-gray-700'}`}
                  >
                    <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <span className="text-lg">{company}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Experience Stats */}
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-8 text-center"
          >
            <div className="text-5xl font-bold text-blue-400 mb-2">4+</div>
            <div className={isDarkMode ? 'text-slate-300' : 'text-gray-600'}>Years of Experience</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-8 text-center"
          >
            <div className="text-5xl font-bold text-blue-400 mb-2">24/7</div>
            <div className={isDarkMode ? 'text-slate-300' : 'text-gray-600'}>Support Available</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-8 text-center"
          >
            <div className="text-5xl font-bold text-blue-400 mb-2">100%</div>
            <div className={isDarkMode ? 'text-slate-300' : 'text-gray-600'}>Client Satisfaction</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

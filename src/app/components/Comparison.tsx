import { motion } from 'motion/react';
import { X, Check } from 'lucide-react';

const comparisons = [
  {
    without: 'Manual tracking of maintenance schedules',
    with: 'Automated preventative maintenance alerts'
  },
  {
    without: 'Scattered vendor relationships',
    with: 'Unified network of trusted partners'
  },
  {
    without: 'Limited business hours support',
    with: '24/7 dedicated fleet assistance'
  },
  {
    without: 'Reactive breakdown management',
    with: 'Proactive health monitoring'
  },
  {
    without: 'Complex billing from multiple vendors',
    with: 'Transparent, consolidated pricing'
  },
  {
    without: 'Time-consuming compliance tracking',
    with: 'Automatic ELD and DOT compliance'
  }
];

export default function Comparison({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <section className={`py-24 px-6 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-100'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-6xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Why Choose <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">FleetGO</span>?
          </h2>
          <p className={`text-xl ${isDarkMode ? 'text-slate-400' : 'text-gray-600'} max-w-3xl mx-auto`}>
            See the difference our comprehensive fleet management solution makes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Without FleetGO */}
          <div>
            <div className={`${isDarkMode ? 'bg-red-500/10 border-red-500/30' : 'bg-red-50 border-red-200'} border rounded-2xl p-6 mb-6`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                  <X className="w-6 h-6 text-red-400" />
                </div>
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Without FleetGO</h3>
              </div>
            </div>
            <div className="space-y-4">
              {comparisons.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'} border rounded-xl p-4`}
                >
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span className={isDarkMode ? 'text-slate-300' : 'text-gray-700'}>{item.without}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* With FleetGO */}
          <div>
            <div className={`${isDarkMode ? 'bg-green-500/10 border-green-500/30' : 'bg-green-50 border-green-200'} border rounded-2xl p-6 mb-6`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-green-400" />
                </div>
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>With FleetGO</h3>
              </div>
            </div>
            <div className="space-y-4">
              {comparisons.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`${isDarkMode ? 'bg-slate-800/50 border-blue-500/30' : 'bg-white border-blue-200'} border rounded-xl p-4 hover:border-blue-500/50 transition-all`}
                >
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className={`font-medium ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>{item.with}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

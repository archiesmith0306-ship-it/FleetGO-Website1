import { motion } from 'motion/react';
import { Truck, BarChart3, Users, Shield, Clock, FileText, Wrench, Headphones } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: '24/7 Fleet Assistance',
    description: 'Round-the-clock dedicated support for all your fleet maintenance needs'
  },
  {
    icon: Wrench,
    title: 'Preventative Maintenance',
    description: 'Proactive care to keep your fleet running and minimize costly downtime'
  },
  {
    icon: Shield,
    title: 'ELD Compliance',
    description: 'Stay compliant with all DOT regulations and industry standards'
  },
  {
    icon: BarChart3,
    title: 'Cost Analysis & Reports',
    description: 'Detailed insights on breakdown frequency, costs, and budget planning'
  },
  {
    icon: FileText,
    title: 'Work Order Management',
    description: 'Complete service history tracking and documentation'
  },
  {
    icon: Users,
    title: 'Driver Support Services',
    description: 'Recruitment, training, and safety programs for your team'
  },
  {
    icon: Truck,
    title: 'Fleet Optimization',
    description: 'Maximize efficiency with route planning and load distribution'
  },
  {
    icon: Headphones,
    title: 'Dedicated Account Manager',
    description: 'Personal point of contact committed to your success'
  }
];

export default function Services({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <section id="services" className={`py-24 px-6 ${isDarkMode ? 'bg-slate-950' : 'bg-white'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-6xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Everything You Need to Manage
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Your Fleet
            </span>
          </h2>
          <p className={`text-xl ${isDarkMode ? 'text-slate-400' : 'text-gray-600'} max-w-3xl mx-auto`}>
            Comprehensive solutions designed to streamline operations and reduce costs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`group ${isDarkMode ? 'bg-slate-900 border-slate-800 hover:bg-slate-800/50' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'} border rounded-2xl p-6 hover:border-blue-500/50 transition-all cursor-pointer`}
            >
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:from-blue-500/20 group-hover:to-cyan-500/20 transition-all">
                <feature.icon className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{feature.title}</h3>
              <p className={`${isDarkMode ? 'text-slate-400' : 'text-gray-600'} leading-relaxed`}>{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Additional Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 border border-blue-500/30 rounded-3xl p-12"
        >
          <h3 className={`text-3xl font-bold mb-8 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Plus Much More</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-blue-400 mb-3">Fleet Management</h4>
              <ul className={`space-y-2 ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                <li>• Virtual Audit & Cleaning</li>
                <li>• Inventory Management</li>
                <li>• Breakdown Frequency Analysis</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-blue-400 mb-3">Supply Chain</h4>
              <ul className={`space-y-2 ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                <li>• Tender Tracking & Control</li>
                <li>• Load Distribution</li>
                <li>• Vendor Relationships</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-blue-400 mb-3">Technology</h4>
              <ul className={`space-y-2 ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                <li>• GPS Tracking Integration</li>
                <li>• Digital Reporting Tools</li>
                <li>• Automated Compliance</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
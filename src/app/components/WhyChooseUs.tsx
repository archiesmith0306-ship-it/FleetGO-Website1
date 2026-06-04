import { motion } from 'motion/react';
import { Shield, Clock, Award, TrendingUp, Headphones, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock dedicated fleet assistance and emergency roadside support'
  },
  {
    icon: Award,
    title: '4+ Years Experience',
    description: 'Proven track record with industry-leading partners and satisfied clients'
  },
  {
    icon: Shield,
    title: 'Compliance Guaranteed',
    description: 'ELD compliance, DOT regulations, and industry standards maintained'
  },
  {
    icon: TrendingUp,
    title: 'Cost Optimization',
    description: 'Reduce downtime and maintenance costs with preventative care'
  },
  {
    icon: Headphones,
    title: 'Dedicated Team',
    description: 'Personal account managers committed to your fleet success'
  },
  {
    icon: CheckCircle,
    title: 'Transparent Pricing',
    description: 'No hidden fees, clear pricing structure that scales with your fleet'
  }
];

export default function WhyChooseUs({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <section className={`py-24 px-6 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-100'} relative overflow-hidden transition-colors duration-300`}>
      {/* Background gradient effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose FleetGO?</h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            We combine experience, technology, and dedication to deliver unmatched fleet management services
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-blue-500/50 transition-all group"
            >
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Optimize Your Fleet?</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join the industry leaders who trust FleetGO for their fleet management needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:3313138474"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-slate-100 transition-all transform hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              <Clock className="w-5 h-5" />
              Call Now: (331) 313-8474
            </a>
            <a
              href="mailto:archie.white@myfleetgo.com"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all inline-flex items-center justify-center gap-2"
            >
              Get Free Consultation
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
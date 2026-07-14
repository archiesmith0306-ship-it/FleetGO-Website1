import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Send, Clock } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const emptyForm = {
    name: '',
    email: '',
    phone: '',
    company: '',
    fleetSize: '',
    message: '',
    website: '', // honeypot — must stay empty
  };
  const [formData, setFormData] = useState(emptyForm);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const mailtoFallback = () => {
    const subject = `Fleet inquiry from ${formData.name || 'website visitor'}`;
    const body = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone || '—'}`,
      `Company: ${formData.company || '—'}`,
      `Fleet size: ${formData.fleetSize || '—'}`,
      '',
      'Message:',
      formData.message,
    ].join('\n');
    window.location.href = `mailto:info@myfleetgo.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('request failed');
      setStatus('sent');
      setFormData(emptyForm);
    } catch {
      // If the lead API isn't reachable, fall back to the visitor's email client.
      setStatus('error');
      mailtoFallback();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="bg-white border-t border-slate-200">
      {/* Dark top bar with contact info */}
      <div className="bg-[#0b1829] py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-1 bg-[#c8970d]" />
            <span className="font-oswald uppercase tracking-[0.2em] text-[#c8970d] text-sm">Contact Us</span>
          </div>
          <h2 className="font-oswald uppercase text-4xl md:text-5xl text-white mb-10">
            Let's Talk About<br />
            <span className="text-[#c8970d]">Your Fleet</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <a
              href="tel:+13313365707"
              className="group flex items-start gap-4 border border-white/20 hover:border-[#c8970d] p-5 transition-all"
            >
              <div className="bg-[#c8970d] p-3 flex-shrink-0">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-oswald uppercase tracking-wider text-slate-400 text-xs mb-1">Call Us</div>
                <div className="font-oswald text-white text-xl group-hover:text-[#c8970d] transition-colors">
                  (331) 336-5707
                </div>
                <div className="text-slate-500 text-xs mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Available 24/7
                </div>
              </div>
            </a>

            <a
              href="mailto:info@myfleetgo.com"
              className="group flex items-start gap-4 border border-white/20 hover:border-[#c8970d] p-5 transition-all"
            >
              <div className="bg-[#c8970d] p-3 flex-shrink-0">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-oswald uppercase tracking-wider text-slate-400 text-xs mb-1">Email Us</div>
                <div className="font-oswald text-white text-base group-hover:text-[#c8970d] transition-colors break-all">
                  info@myfleetgo.com
                </div>
              </div>
            </a>

            <div className="flex items-start gap-4 border border-white/20 p-5">
              <div className="bg-[#c8970d] p-3 flex-shrink-0">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-oswald uppercase tracking-wider text-slate-400 text-xs mb-1">Office</div>
                <div className="text-white text-sm leading-relaxed">
                  1811 W Diehl Road, Suite 200<br />
                  Naperville, IL 60563
                </div>
                <div className="text-slate-500 text-xs mt-1">Nationwide Coverage</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="h-[340px] border-b border-slate-200">
        <iframe
          src="https://maps.google.com/maps?q=1811%20W%20Diehl%20Road%2C%20Suite%20200%2C%20Naperville%2C%20IL%2060563&hl=en&z=15&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="FleetGO Office Location"
        />
      </div>

      {/* Form section */}
      <div className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-oswald uppercase text-2xl text-[#0b1829] mb-4">Why Choose FleetGO?</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Whether you manage 5 trucks or 500, we have the expertise and dedication to keep
                your fleet operating at peak efficiency.
              </p>
              <ul className="space-y-4">
                {[
                  '24/7 dedicated support team — never an answering machine',
                  'Proven track record with fleets of all sizes across the US',
                  'Transparent pricing with no hidden fees or surprises',
                  'Cutting-edge technology integration (ELD, GPS, Digital Reporting)',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="text-[#c8970d] text-lg leading-none mt-0.5">›</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-l-4 border-[#c8970d] pl-4 bg-yellow-50 py-4 pr-4">
                <p className="text-sm text-slate-700">
                  <strong className="text-[#0b1829]">Trusted clients include:</strong> Primeweek Inc, Dadakhon Trans, 2M Trucking,
                  Verona Express, and more — real trucking operations that rely on FleetGO every single day.
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="border border-slate-200 bg-[#f4f5f7]">
                <div className="bg-[#0b1829] px-6 py-4">
                  <h3 className="font-oswald uppercase tracking-wider text-white">Request a Free Consultation</h3>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-oswald uppercase tracking-wider mb-1.5 text-[#0b1829]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-slate-300 focus:outline-none focus:border-[#c8970d] focus:ring-1 focus:ring-[#c8970d] transition-all text-slate-900 text-sm"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-xs font-oswald uppercase tracking-wider mb-1.5 text-[#0b1829]">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-slate-300 focus:outline-none focus:border-[#c8970d] focus:ring-1 focus:ring-[#c8970d] transition-all text-slate-900 text-sm"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-xs font-oswald uppercase tracking-wider mb-1.5 text-[#0b1829]">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-slate-300 focus:outline-none focus:border-[#c8970d] focus:ring-1 focus:ring-[#c8970d] transition-all text-slate-900 text-sm"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="company" className="block text-xs font-oswald uppercase tracking-wider mb-1.5 text-[#0b1829]">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-slate-300 focus:outline-none focus:border-[#c8970d] focus:ring-1 focus:ring-[#c8970d] transition-all text-slate-900 text-sm"
                        placeholder="Your Company"
                      />
                    </div>
                    <div>
                      <label htmlFor="fleetSize" className="block text-xs font-oswald uppercase tracking-wider mb-1.5 text-[#0b1829]">
                        Fleet Size
                      </label>
                      <select
                        id="fleetSize"
                        name="fleetSize"
                        value={formData.fleetSize}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-slate-300 focus:outline-none focus:border-[#c8970d] focus:ring-1 focus:ring-[#c8970d] transition-all text-slate-900 text-sm"
                      >
                        <option value="">Select size</option>
                        <option value="1-10">1–10 trucks</option>
                        <option value="11-20">11–20 trucks</option>
                        <option value="21-30">21–30 trucks</option>
                        <option value="31-50">31–50 trucks</option>
                        <option value="51+">51+ trucks</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-oswald uppercase tracking-wider mb-1.5 text-[#0b1829]">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-white border border-slate-300 focus:outline-none focus:border-[#c8970d] focus:ring-1 focus:ring-[#c8970d] transition-all text-slate-900 text-sm resize-none"
                      placeholder="Tell us about your fleet management needs..."
                    />
                  </div>

                  {/* Honeypot — hidden from real users, catches bots */}
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full font-oswald uppercase tracking-wider bg-[#c8970d] hover:bg-[#a87b0a] disabled:opacity-60 text-white py-4 flex items-center justify-center gap-2 transition-all text-sm"
                  >
                    {status === 'sending' ? 'Sending…' : 'Send Message'}
                    <Send className="w-4 h-4" />
                  </button>

                  {status === 'sent' && (
                    <p className="text-sm text-green-700 bg-green-50 border border-green-200 px-4 py-3">
                      Thanks! Your request was sent — our team will be in touch shortly.
                    </p>
                  )}
                  {status === 'error' && (
                    <p className="text-sm text-slate-600">
                      We opened your email app as a backup — just hit send, or reach us at{' '}
                      <a href="mailto:info@myfleetgo.com" className="text-[#c8970d] underline">info@myfleetgo.com</a>.
                    </p>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

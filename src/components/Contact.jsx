import { motion } from 'framer-motion';
import { Phone, MessageCircle, Mail, MapPin, Clock, AlertTriangle, ExternalLink } from 'lucide-react';
import { config } from '../data/config';

export default function Contact() {
  const formattedPhone = config.company.phone.replace(/[^0-9+]/g, '');
  const encodedMessage = encodeURIComponent(config.company.whatsAppMessage);
  const whatsAppUrl = `https://wa.me/${config.company.whatsAppPhone}?text=${encodedMessage}`;

  return (
    <section id="contact" className="relative bg-slate-950 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-slate-900">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-96 h-96 bg-orange-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs sm:text-sm font-bold tracking-widest text-orange-500 uppercase mb-3"
          >
            Contact Us
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          >
            Get In Touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base mt-4 leading-relaxed"
          >
            Need computer, CCTV, electrical repair, installation, or second-hand equipment? Contact us today.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-16 h-1 bg-gradient-to-r from-orange-500 to-amber-600 mx-auto mt-5 rounded-full origin-center"
            aria-hidden="true"
          />
        </div>

        {/* Emergency Service Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-4xl mx-auto rounded-2xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 border border-orange-500/20 p-5 backdrop-blur-sm shadow-lg shadow-orange-500/5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left relative overflow-hidden group"
        >
          {/* Animated side pulse */}
          <div className="absolute top-0 bottom-0 left-0 w-1 bg-orange-500 animate-pulse" aria-hidden="true"></div>
          
          <div className="p-3 rounded-xl bg-orange-500/15 border border-orange-500/25 text-orange-400 animate-pulse" aria-hidden="true">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            {/* H3 heading to preserve structural hierarchy */}
            <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
              Emergency Service
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {config.company.emergencyText}
            </p>
          </div>
          <a
            href={`tel:${formattedPhone}`}
            className="mt-3 sm:mt-0 sm:ml-auto px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-orange-500/25 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Call Dispatch
          </a>
        </motion.div>

        {/* Grid Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Left Column: Info & Action Buttons */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            {/* Contact Information Card */}
            <div className="flex-grow rounded-3xl bg-slate-900/40 border border-slate-900 p-6 sm:p-8 backdrop-blur-sm shadow-xl flex flex-col justify-between">
              <div>
                {/* H3 heading to preserve structural hierarchy */}
                <h3 className="text-lg font-bold text-slate-200 uppercase tracking-wide mb-6 border-b border-slate-850 pb-4">
                  Business Directory
                </h3>

                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-850 text-orange-400 mt-0.5" aria-hidden="true">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone Call</h3>
                      <p className="text-base font-medium text-slate-200 mt-1 hover:text-orange-400 transition-colors duration-250">
                        <a href={`tel:${formattedPhone}`} className="rounded focus:outline-none focus:ring-1 focus:ring-orange-500">{config.company.phone}</a>
                      </p>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-850 text-orange-400 mt-0.5" aria-hidden="true">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">WhatsApp</h3>
                      <p className="text-base font-medium text-slate-200 mt-1 hover:text-orange-400 transition-colors duration-250">
                        <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" className="rounded focus:outline-none focus:ring-1 focus:ring-orange-500">{config.company.phone}</a>
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-850 text-orange-400 mt-0.5" aria-hidden="true">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Address</h3>
                      <p className="text-base font-medium text-slate-200 mt-1 hover:text-orange-400 transition-colors duration-250">
                        <a href={`mailto:${config.company.email}`} className="rounded focus:outline-none focus:ring-1 focus:ring-orange-500">{config.company.email}</a>
                      </p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-850 text-orange-400 mt-0.5" aria-hidden="true">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Service Center</h3>
                      <p className="text-sm text-slate-350 mt-1 leading-relaxed">
                        {config.company.address}
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-850 text-orange-400 mt-0.5" aria-hidden="true">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Operating Hours</h3>
                      <p className="text-sm text-slate-350 mt-1 leading-relaxed">
                        {config.company.hours}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <a
                href={`tel:${formattedPhone}`}
                className="flex flex-col items-center justify-center gap-2 py-4 px-2 rounded-2xl bg-slate-900 border border-slate-900 text-slate-350 hover:text-white hover:border-orange-500/20 hover:bg-slate-850/50 active:scale-95 transition-all duration-300 shadow-md group focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <Phone className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Call Now</span>
              </a>
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-2 py-4 px-2 rounded-2xl bg-slate-900 border border-slate-900 text-slate-350 hover:text-white hover:border-orange-500/20 hover:bg-slate-850/50 active:scale-95 transition-all duration-300 shadow-md group focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <MessageCircle className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">WhatsApp</span>
              </a>
              <a
                href={`mailto:${config.company.email}`}
                className="flex flex-col items-center justify-center gap-2 py-4 px-2 rounded-2xl bg-slate-900 border border-slate-900 text-slate-350 hover:text-white hover:border-orange-500/20 hover:bg-slate-850/50 active:scale-95 transition-all duration-300 shadow-md group focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <Mail className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Email Us</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Google Maps Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6"
          >
            <div className="relative h-full min-h-[350px] lg:min-h-full rounded-3xl bg-slate-900/40 border border-slate-900 overflow-hidden backdrop-blur-sm shadow-xl p-3 flex flex-col">
              {/* Styled Placeholder Container */}
              <div className="relative flex-grow rounded-2xl bg-slate-950 border border-slate-900 flex flex-col justify-center items-center p-8 overflow-hidden">
                {/* Tech background graphic */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" aria-hidden="true"></div>
                <div className="absolute w-80 h-80 bg-orange-600/5 rounded-full blur-[80px] pointer-events-none" aria-hidden="true"></div>

                {/* Animated map pin */}
                <div className="relative mb-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500" aria-hidden="true">
                    <MapPin className="w-6 h-6 animate-bounce" />
                  </span>
                  <span className="absolute top-0 left-0 h-12 w-12 rounded-full border border-orange-500/30 animate-ping pointer-events-none" aria-hidden="true"></span>
                </div>

                <h3 className="text-base font-bold text-slate-200 mb-2">Location Map</h3>
                <p className="text-xs text-slate-500 text-center max-w-xs leading-relaxed mb-6">
                  Placeholder container for business mapping interface. Paste your Google Maps embed code (`&lt;iframe&gt;`) inside `Contact.jsx` when ready.
                </p>

                {/* Open in Map View Action Link */}
                <a
                  href={config.company.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 hover:border-slate-800 text-xs font-semibold text-slate-350 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  Open in Google Maps
                  <ExternalLink className="w-3 h-3 text-slate-500" aria-hidden="true" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

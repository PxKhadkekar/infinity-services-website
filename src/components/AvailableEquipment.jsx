import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { config } from '../data/config';

// Import local assets from src/assets/products/
import p1Image from "../assets/Products/P1.jpeg";
import p2Image from "../assets/Products/P2.jpeg";
import p3Video from "../assets/Products/P3.mp4";

export default function AvailableEquipment() {
  // Prefilled WhatsApp link
  const customMessage = 'Hi, I would like to inquire about the latest offers and available stock listed on your website.';
  const encodedMsg = encodeURIComponent(customMessage);
  const whatsAppUrl = `https://wa.me/${config.company.whatsAppPhone}?text=${encodedMsg}`;

  return (
    <section id="products" className="relative bg-slate-950 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-slate-900">
      {/* Visual background highlight */}
      <div className="absolute top-0 inset-x-0 h-1/2 w-full bg-[radial-gradient(circle_at_top,rgba(30,58,138,0.1)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Latest Offers & Available Stock
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-1 bg-gradient-to-r from-orange-500 to-amber-600 mx-auto mt-6 rounded-full origin-center"
          />
        </div>

        {/* Banners & Video Stack (Stacked Vertically, Full Width, h-auto, object-contain, no cropping) */}
        <div className="flex flex-col gap-8 md:gap-12 mb-16">

          {/* Banner 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full rounded-3xl bg-slate-900/40 border border-slate-900 p-2 md:p-3 backdrop-blur-sm shadow-2xl flex justify-center overflow-hidden"
          >
            <img
              src={p1Image}
              alt="Latest promotional offer banner 1"
              className="w-full h-auto object-contain rounded-2xl"
              loading="lazy"
            />
          </motion.div>

          {/* Banner 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="w-full rounded-3xl bg-slate-900/40 border border-slate-900 p-2 md:p-3 backdrop-blur-sm shadow-2xl flex justify-center overflow-hidden"
          >
            <img
              src={p2Image}
              alt="Latest promotional offer banner 2"
              className="w-full h-auto object-contain rounded-2xl"
              loading="lazy"
            />
          </motion.div>

          {/* Video Promo Loop */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full rounded-3xl bg-slate-900/40 border border-slate-900 p-2 md:p-3 shadow-2xl flex justify-center overflow-hidden"
          >
            <video
              src={p3Video}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              controls
              className="w-full h-auto object-contain rounded-2xl"
            />
          </motion.div>

        </div>

        {/* WhatsApp Availability CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="text-center"
        >
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold shadow-xl shadow-orange-500/10 hover:shadow-orange-500/25 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <MessageCircle className="w-5 h-5 text-white" aria-hidden="true" />
            Ask About Availability
          </a>
        </motion.div>
      </div>
    </section>
  );
}

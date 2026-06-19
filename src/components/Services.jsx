import { motion } from 'framer-motion';
import { config } from '../data/config';
import ServiceCard from './ServiceCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function Services() {
  return (
    <section id="services" className="relative bg-slate-950 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-slate-900">
      {/* Background visual highlight */}
      <div className="absolute bottom-0 inset-x-0 h-1/2 w-full bg-[radial-gradient(circle_at_bottom,rgba(30,58,138,0.1)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs sm:text-sm font-bold tracking-widest text-orange-500 uppercase mb-3"
          >
            Our Services
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            What We Do
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base mt-4 max-w-xl mx-auto leading-relaxed"
          >
            Providing expert hardware repairs, professional electrical setups, and certified pre-owned gadgets for your home and workplace.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-16 h-1 bg-gradient-to-r from-orange-500 to-amber-600 mx-auto mt-6 rounded-full origin-center"
          />
        </div>

        {/* 1, 2, 3 Column Grid with Equal Heights */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
        >
          {config.services.map((service, idx) => (
            <div key={idx} className="h-full">
              <ServiceCard {...service} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

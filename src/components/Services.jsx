import { motion } from 'framer-motion';
import { config } from '../data/config';
import ServiceCard from './ServiceCard';
import { scrollRevealVariants, staggerContainerVariants } from '../data/animations';

export default function Services() {
  return (
    <section id="services" className="relative bg-slate-950 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-slate-900">
      {/* Background visual highlight */}
      <div className="absolute bottom-0 inset-x-0 h-1/2 w-full bg-[radial-gradient(circle_at_bottom,rgba(30,58,138,0.1)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.p
            variants={scrollRevealVariants}
            className="text-xs sm:text-sm font-bold tracking-widest text-orange-500 uppercase mb-3"
          >
            Our Services
          </motion.p>
          <motion.h2
            variants={scrollRevealVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            What We Do
          </motion.h2>
          <motion.p
            variants={scrollRevealVariants}
            className="text-slate-400 text-sm sm:text-base mt-4 max-w-xl mx-auto leading-relaxed"
          >
            Providing expert hardware repairs, professional electrical setups, and certified pre-owned gadgets for your home and workplace.
          </motion.p>
          <motion.div
            variants={scrollRevealVariants}
            className="w-16 h-1 bg-gradient-to-r from-orange-500 to-amber-600 mx-auto mt-6 rounded-full origin-center"
          />
        </motion.div>

        {/* 1, 2, 3 Column Grid with Equal Heights */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
        >
          {config.services.map((service, idx) => (
            <motion.div key={idx} variants={scrollRevealVariants} className="h-full">
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

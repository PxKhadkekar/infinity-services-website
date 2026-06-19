import { motion } from 'framer-motion';
import { config } from '../data/config';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15
    }
  }
};

export default function Stats() {
  return (
    <section className="relative bg-slate-950 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-900">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(30,58,138,0.1)_0%,transparent_60%)] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {config.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="relative overflow-hidden rounded-2xl bg-slate-900/40 hover:bg-slate-900/60 border border-slate-900 hover:border-slate-800/80 p-6 sm:p-8 backdrop-blur-sm text-center shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Decorative side accent */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true"></div>

              {/* Stat Value */}
              <div className="text-4xl sm:text-5xl font-black text-white mb-2 tracking-tight group-hover:scale-105 transition-transform duration-300">
                <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                  {stat.value}
                </span>
              </div>

              {/* Stat Label */}
              <div className="text-sm font-bold text-slate-200 tracking-wide uppercase mb-1">
                {stat.label}
              </div>

              {/* Stat Description */}
              <p className="text-xs text-slate-500">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { config } from '../data/config';
import { scrollRevealVariants, staggerContainerVariants } from '../data/animations';

function AnimatedCounter({ value }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  const numMatch = value.match(/\d+/);
  const target = numMatch ? parseInt(numMatch[0], 10) : 0;
  const suffix = numMatch ? value.replace(numMatch[0], '') : value;

  useEffect(() => {
    if (isInView && target > 0) {
      const controls = animate(0, target, {
        duration: 1.8,
        ease: 'easeOut',
        onUpdate: (latest) => {
          setCount(Math.floor(latest));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {target > 0 ? count : value}
      {target > 0 ? suffix : ''}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative bg-slate-950 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-900">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(30,58,138,0.1)_0%,transparent_60%)] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {config.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={scrollRevealVariants}
              className="relative overflow-hidden rounded-2xl bg-slate-900/40 hover:bg-slate-900/60 border border-slate-900 hover:border-slate-800/80 p-6 sm:p-8 backdrop-blur-sm text-center shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Decorative side accent */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true"></div>

              {/* Stat Value */}
              <div className="text-4xl sm:text-5xl font-black text-white mb-2 tracking-tight group-hover:scale-105 transition-transform duration-300">
                <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                  <AnimatedCounter value={stat.value} />
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

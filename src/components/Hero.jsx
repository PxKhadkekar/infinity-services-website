import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Phone, MessageCircle, Wrench, Shield, Zap } from 'lucide-react';
import { config } from '../data/config';

export default function Hero() {
  const formattedPhone = config.company.phone.replace(/[^0-9+]/g, '');
  const encodedMessage = encodeURIComponent(config.company.whatsAppMessage);
  const whatsAppUrl = `https://wa.me/${config.company.whatsAppPhone}?text=${encodedMessage}`;
  const shouldReduceMotion = useReducedMotion();
  const [particles, setParticles] = useState([]);

  // Responsive check for mobile particle counts and generation (pure render safe)
  useEffect(() => {
    const handleResize = () => {
      const isMob = window.innerWidth < 768;
      
      const count = isMob ? 6 : 14;
      const list = Array.from({ length: count }, (_, idx) => ({
        id: idx,
        size: Math.random() * 3 + 2, // 2px to 5px
        x: Math.random() * 100,      // 0% to 100%
        duration: Math.random() * 8 + 8, // 8s to 16s
        delay: Math.random() * -10,  // start immediately
      }));
      setParticles(list);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-slate-950 pt-24 px-4 sm:px-6 lg:px-8">
      {/* Background Media (Video or Image) */}
      {config.heroMedia && config.heroMedia.src && (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          {config.heroMedia.type === 'video' ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover opacity-50 sm:opacity-60"
            >
              <source src={config.heroMedia.src} type="video/mp4" />
            </video>
          ) : (
            <img
              src={config.heroMedia.src}
              alt="Hero Background Graphic"
              className="w-full h-full object-cover opacity-35 sm:opacity-45 select-none"
              loading="eager"
            />
          )}
          {/* Overlay to ensure readability and dark blend (50% opacity) */}
          <div className="absolute inset-0 bg-slate-950/50" aria-hidden="true"></div>
        </div>
      )}

      {/* Hardware-Accelerated Moving Grid overlay */}
      <div className="absolute -inset-[2rem] w-[calc(100%+4rem)] h-[calc(100%+4rem)] overflow-hidden pointer-events-none z-0">
        <div className="w-full h-full bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] animate-grid-move"></div>
      </div>

      {/* Floating Gradient Blobs (Transforms only for visual performance) */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-orange-600/5 md:bg-orange-600/8 rounded-full blur-[100px] md:blur-[140px] pointer-events-none z-0"
        animate={shouldReduceMotion ? {} : {
          x: [-20, 20, -20],
          y: [-25, 25, -25],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-600/5 md:bg-blue-600/8 rounded-full blur-[110px] md:blur-[150px] pointer-events-none z-0"
        animate={shouldReduceMotion ? {} : {
          x: [25, -25, 25],
          y: [20, -20, 20],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] md:w-[350px] md:h-[350px] bg-amber-500/4 md:bg-amber-500/6 rounded-full blur-[90px] md:blur-[120px] pointer-events-none z-0"
        animate={shouldReduceMotion ? {} : {
          scale: [0.9, 1.1, 0.9],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Dynamic Background Gradients */}
      <div className="absolute top-0 inset-x-0 h-full w-full bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.2)_0%,rgba(15,23,42,0.95)_70%)] pointer-events-none z-0"></div>

      {/* Subtle Hardware-Accelerated Particles */}
      {!shouldReduceMotion && particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-orange-500/20 pointer-events-none z-0"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            bottom: '-20px',
          }}
          animate={{
            y: ['0px', '-105vh'],
            opacity: [0, 0.6, 0.6, 0],
            x: ['0px', `${Math.sin(p.id) * 30}px`],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: p.delay,
          }}
        />
      ))}

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 text-xs sm:text-sm font-semibold text-orange-400 mb-8 backdrop-blur-md shadow-xl shadow-orange-500/5"
        >
          <span className="flex h-2 w-2 relative" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
          {config.company.tagline}
        </motion.div>

        {/* Subheading (H2 for clean outline hierarchy) */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm sm:text-base font-bold tracking-widest text-slate-400 uppercase mb-4"
        >
          Repair • Installation • Maintenance
        </motion.h2>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6"
        >
          Computer, CCTV & <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">Electrical</span> Services
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Fast, Reliable & Affordable Services at Your Doorstep.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          {/* Call Now */}
          <a
            href={`tel:${formattedPhone}`}
            className="flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold shadow-2xl shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <Phone className="w-5 h-5 group-hover:animate-bounce" />
            Call Now
          </a>

          {/* WhatsApp Now */}
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-850 text-slate-200 hover:text-white font-bold border border-slate-800 hover:border-slate-700 shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <MessageCircle className="w-5 h-5 text-emerald-400" />
            WhatsApp Now
          </a>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-20 pt-8 border-t border-slate-900 text-slate-400"
        >
          <div className="flex items-center justify-center gap-2.5">
            <Wrench className="w-4 h-4 text-orange-500" aria-hidden="true" />
            <span className="text-sm font-medium">Expert Technicians</span>
          </div>
          <div className="flex items-center justify-center gap-2.5">
            <Shield className="w-4 h-4 text-orange-500" aria-hidden="true" />
            <span className="text-sm font-medium">Genuine Parts Only</span>
          </div>
          <div className="flex items-center justify-center gap-2.5 col-span-2 md:col-span-1">
            <Zap className="w-4 h-4 text-orange-500" aria-hidden="true" />
            <span className="text-sm font-medium">Same Day Service</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

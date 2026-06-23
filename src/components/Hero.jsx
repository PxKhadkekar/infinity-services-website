import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Phone, MessageCircle, Wrench, Shield, Zap } from 'lucide-react';
import { config } from '../data/config';
import Strands from './Strands';

function MagneticButton({ children, className, href, target, rel, ...props }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e) => {
    if (window.innerWidth < 1024 || shouldReduceMotion) return;

    const bounding = ref.current.getBoundingClientRect();
    const x = e.clientX - (bounding.left + bounding.width / 2);
    const y = e.clientY - (bounding.top + bounding.height / 2);
    const limit = 15;
    const factor = 0.35;
    
    let targetX = x * factor;
    let targetY = y * factor;

    const dist = Math.sqrt(targetX * targetX + targetY * targetY);
    if (dist > limit) {
      targetX = (targetX / dist) * limit;
      targetY = (targetY / dist) * limit;
    }

    setPosition({ x: targetX, y: targetY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 120, damping: 15, mass: 0.1 }}
      {...props}
    >
      {children}
    </motion.a>
  );
}

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
      
      const count = isMob ? 3 : 6;
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
              className="w-full h-full object-cover opacity-15 sm:opacity-20 filter brightness-[0.35] contrast-[0.8] saturate-[0.6]"
            >
              <source src={config.heroMedia.src} type="video/mp4" />
            </video>
          ) : (
            <img
              src={config.heroMedia.src}
              alt="Hero Background Graphic"
              className="w-full h-full object-cover opacity-10 sm:opacity-15 filter brightness-[0.25] contrast-[0.8] saturate-[0.5] select-none"
              loading="eager"
            />
          )}
          {/* Overlay to ensure readability and dark blend (80% opacity) */}
          <div className="absolute inset-0 bg-slate-950/80" aria-hidden="true"></div>
        </div>
      )}

      {/* Hardware-Accelerated Moving Grid overlay */}
      <div className="absolute -inset-[2rem] w-[calc(100%+4rem)] h-[calc(100%+4rem)] overflow-hidden pointer-events-none z-0">
        <div className="w-full h-full bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] animate-grid-move"></div>
      </div>

      {/* Dynamic Background Gradients */}
      <div className="absolute top-0 inset-x-0 h-full w-full bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.08)_0%,rgba(15,23,42,0.95)_70%)] pointer-events-none z-0"></div>

      {/* WebGL Strands visual background theme - Thinner, slower, and highly subtle */}
      {!shouldReduceMotion && (
        <Strands
          className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-15"
          colors={["#F97316", "#EAB308", "#3B82F6"]}
          count={3}
          speed={0.2}
          amplitude={0.35}
          waviness={0.4}
          thickness={0.4}
          glow={1.2}
          taper={3.0}
          spread={1.3}
          intensity={0.4}
          saturation={1.2}
          opacity={0.6}
          scale={1.25}
          glass={false}
        />
      )}

      {/* Premium Spotlight background effect - Elegant, soft ambient glow centered behind content */}
      <motion.div
        className="absolute left-1/2 top-1/2 w-[300px] h-[300px] sm:w-[550px] sm:h-[550px] md:w-[750px] md:h-[750px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, rgba(234,179,8,0.04) 40%, rgba(59,130,246,0.03) 70%, transparent 100%)',
          filter: 'blur(100px)',
          x: '-50%',
          y: '-50%'
        }}
        animate={shouldReduceMotion ? {} : {
          x: ['-50%', '-48%', '-52%', '-50%'],
          y: ['-50%', '-51%', '-49%', '-50%'],
          scale: [0.97, 1.03, 0.99, 0.97],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Subtle Hardware-Accelerated Particles */}
      {!shouldReduceMotion && particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-orange-500/10 pointer-events-none z-0"
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
          <MagneticButton
            href={`tel:${formattedPhone}`}
            className="flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold shadow-2xl shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <Phone className="w-5 h-5 group-hover:animate-bounce" />
            Call Now
          </MagneticButton>

          {/* WhatsApp Now */}
          <MagneticButton
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-850 text-slate-200 hover:text-white font-bold border border-slate-800 hover:border-slate-700 shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <MessageCircle className="w-5 h-5 text-emerald-400" />
            WhatsApp Now
          </MagneticButton>
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

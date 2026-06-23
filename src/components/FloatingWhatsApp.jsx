import { motion, useReducedMotion } from 'framer-motion';
import { config } from '../data/config';

export default function FloatingWhatsApp() {
  const encodedMsg = encodeURIComponent(config.company.whatsAppMessage);
  const whatsAppUrl = `https://wa.me/${config.company.whatsAppPhone}?text=${encodedMsg}`;
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.a
      href={whatsAppUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed right-6 z-50 flex items-center justify-center p-3.5 rounded-full bg-gradient-to-tr from-[#128c7e] to-[#25d366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.3)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.5)] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-950 md:right-8 md:p-4 cursor-pointer floating-whatsapp-btn"
      aria-label="Chat with us on WhatsApp"
      initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={shouldReduceMotion ? { duration: 0.2 } : { type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
      whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -4 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
    >
      {/* Background Ripple Pulse Rings */}
      {!shouldReduceMotion && (
        <>
          <motion.span
            className="absolute inset-0 rounded-full bg-emerald-500/40 -z-10"
            animate={{
              scale: [1, 1.7],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 4.3,
              ease: 'easeOut',
            }}
          />
          <motion.span
            className="absolute inset-0 rounded-full bg-emerald-500/30 -z-10"
            animate={{
              scale: [1, 1.7],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 4.3,
              delay: 0.8,
              ease: 'easeOut',
            }}
          />
        </>
      )}

      {/* Slide-out Text Label (Desktop only, responsive hover) */}
      <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[120px] group-hover:opacity-100 group-hover:mr-2 group-hover:ml-1 transition-all duration-300 ease-out text-sm font-bold tracking-wide hidden md:inline-block select-none">
        Chat with us
      </span>

      {/* Official WhatsApp SVG Icon */}
      <svg
        viewBox="0 0 24 24"
        className="w-6 h-6 fill-current flex-shrink-0 md:w-6.5 md:h-6.5"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.528 2.017 14.077 1 11.52 1 6.082 1 1.657 5.37 1.653 10.803c-.001 1.737.457 3.432 1.328 4.937l-1.018 3.715 3.805-.98c1.472.793 3.125 1.211 4.793 1.212h.001zm10.741-7.07c-.293-.145-1.736-.845-2.005-.941-.268-.097-.464-.145-.66.145-.196.291-.76.942-.931 1.134-.171.194-.343.218-.636.073-.293-.145-1.237-.45-2.355-1.436-.87-.768-1.457-1.718-1.628-2.009-.171-.292-.018-.45.129-.593.132-.129.293-.339.439-.509.146-.17.195-.291.293-.485.097-.194.049-.364-.025-.509-.073-.145-.66-1.567-.903-2.15-.236-.569-.477-.491-.66-.5-.168-.009-.362-.01-.557-.01-.195 0-.512.072-.78.364-.268.291-1.022.986-1.022 2.404 0 1.417 1.045 2.789 1.191 2.984.146.194 2.057 3.11 4.981 4.35 1.164.494 2.03.784 2.721 1.002.732.228 1.4.195 1.93.117.589-.087 1.736-.7 1.98-1.378.244-.679.244-1.262.171-1.378-.073-.117-.268-.194-.56-.34z" />
      </svg>
    </motion.a>
  );
}

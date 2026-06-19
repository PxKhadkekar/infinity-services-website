import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Cpu } from 'lucide-react';
import { config } from '../data/config';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-slate-900/95 border-b border-slate-800 backdrop-blur-md py-3 shadow-lg'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-xl px-1">
              <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300" aria-hidden="true">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-orange-400 transition-colors duration-300">
                {config.company.name}
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-6">
                {config.navigation.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    className="text-sm font-medium text-slate-300 hover:text-orange-400 focus:text-orange-400 focus:outline-none transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-orange-500 hover:after:w-full focus:after:w-full after:transition-all after:duration-300"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Call Now Button */}
              <a
                href={`tel:${config.company.phone.replace(/[^0-9+]/g, '')}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-sm font-semibold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                Call Now
              </a>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-30 bg-slate-950/70 backdrop-blur-sm md:hidden"
            />
            {/* Drawer container */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-0 top-[64px] z-40 md:hidden bg-slate-900 border-b border-slate-850 shadow-2xl"
            >
              <div className="px-4 pt-4 pb-6 space-y-3">
                {config.navigation.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 rounded-xl text-base font-medium text-slate-350 hover:text-white hover:bg-slate-800/40 focus:bg-slate-800/40 focus:text-white focus:outline-none transition-all duration-200"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-4 border-t border-slate-800 px-4">
                  <a
                    href={`tel:${config.company.phone.replace(/[^0-9+]/g, '')}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold shadow-lg shadow-orange-500/25 active:scale-95 transition-all duration-300"
                  >
                    <Phone className="w-4 h-4" aria-hidden="true" />
                    Call Now
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

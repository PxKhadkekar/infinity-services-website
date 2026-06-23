import { useState, useEffect } from 'react';
import { Mail, MapPin, Clock, ArrowUp, Cpu, Phone, MessageCircle } from 'lucide-react';
import { config } from '../data/config';

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const formattedPhone = config.company.phone.replace(/[^0-9+]/g, '');
  const encodedMessage = encodeURIComponent(config.company.whatsAppMessage);
  const whatsAppUrl = `https://wa.me/${config.company.whatsAppPhone}?text=${encodedMessage}`;

  const socials = config.company.socials || {};

  return (
    <footer className="relative bg-slate-950 border-t border-slate-900 pt-20 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Footer grid */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-8 pb-16 border-b border-slate-900">
        
        {/* Column 1: Company Info */}
        <div className="lg:col-span-4 space-y-6">
          <a href="#" className="flex items-center gap-2.5 group w-fit focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-xl px-1">
            <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300" aria-hidden="true">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-orange-400 transition-colors duration-300">
              {config.company.name}
            </span>
          </a>
          <p className="text-sm text-slate-400 leading-relaxed max-w-md">
            {config.company.description}
          </p>
          
          {/* Social Links (Optional Check) */}
          {(Object.keys(socials).length > 0 || config.company.whatsAppPhone) && (
            <div className="flex items-center gap-4 pt-2">
              {socials.facebook && (
                <a
                  href={socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-850 text-slate-400 hover:text-white hover:border-orange-500/20 hover:bg-orange-500/10 active:scale-95 transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-orange-500"
                  aria-label="Facebook Profile"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/>
                  </svg>
                </a>
              )}
              {socials.instagram && (
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-850 text-slate-400 hover:text-white hover:border-orange-500/20 hover:bg-orange-500/10 active:scale-95 transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-orange-500"
                  aria-label="Instagram Profile"
                >
                  <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              )}
              {socials.youtube && (
                <a
                  href={socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-850 text-slate-400 hover:text-white hover:border-orange-500/20 hover:bg-orange-500/10 active:scale-95 transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-orange-500"
                  aria-label="YouTube Channel"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              )}
              {config.company.whatsAppPhone && (
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-850 text-slate-400 hover:text-white hover:border-orange-500/20 hover:bg-orange-500/10 active:scale-95 transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-orange-500"
                  aria-label="WhatsApp Hotline"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Column 2: Quick Links */}
        <div className="lg:col-span-2 space-y-5">
          {/* H3 heading to preserve structural hierarchy */}
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest">
            Quick Links
          </h3>
          <ul className="space-y-3">
            {config.navigation.links.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  className="text-sm text-slate-400 hover:text-orange-400 transition-colors duration-300 relative py-0.5 inline-block group/link focus:text-orange-400 focus:outline-none"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-orange-500 group-hover/link:w-full focus:group-hover/link:w-full transition-all duration-300" aria-hidden="true"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Services Links */}
        <div className="lg:col-span-3 space-y-5">
          {/* H3 heading to preserve structural hierarchy */}
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest">
            Our Services
          </h3>
          <ul className="space-y-3">
            {config.footer.servicesLinks.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  className="text-sm text-slate-400 hover:text-orange-400 transition-colors duration-300 relative py-0.5 inline-block group/link focus:text-orange-400 focus:outline-none"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-orange-500 group-hover/link:w-full focus:group-hover/link:w-full transition-all duration-300" aria-hidden="true"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div className="lg:col-span-3 space-y-5">
          {/* H3 heading to preserve structural hierarchy */}
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest">
            Contact Details
          </h3>
          <ul className="space-y-4 text-sm text-slate-400">
            <li className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
              <a href={`tel:${formattedPhone}`} className="hover:text-white transition-colors focus:text-white focus:outline-none focus:ring-1 focus:ring-orange-500 rounded">
                {config.company.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MessageCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
              <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors focus:text-white focus:outline-none focus:ring-1 focus:ring-orange-500 rounded">
                WhatsApp Chat
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
              <a href={`mailto:${config.company.email}`} className="hover:text-white transition-colors focus:text-white focus:outline-none focus:ring-1 focus:ring-orange-500 rounded">
                {config.company.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
              <span className="leading-relaxed">{config.company.address}</span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
              <span>{config.company.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright footer bar */}
      <div className="relative z-10 max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} {config.company.name}. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 hover:text-orange-400 transition-colors duration-300 focus:text-orange-400 focus:outline-none cursor-pointer focus:ring-1 focus:ring-orange-500 rounded p-1"
          >
            Back to Top
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed right-6 md:right-8 z-50 p-3.5 rounded-full bg-slate-900 border border-slate-850 hover:border-orange-500/40 text-slate-400 hover:text-orange-400 shadow-2xl active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer flex items-center justify-center floating-back-to-top-btn"
          aria-label="Scroll Back to Top"
        >
          <ArrowUp className="w-5 h-5 animate-pulse" aria-hidden="true" />
        </button>
      )}
    </footer>
  );
}

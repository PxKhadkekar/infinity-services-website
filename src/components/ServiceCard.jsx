import { motion } from 'framer-motion';
import { Monitor, Zap, Package, MessageCircle, CheckCircle2 } from 'lucide-react';
import { config } from '../data/config';

const iconMap = {
  Monitor,
  Zap,
  Package,
};

export default function ServiceCard({ category, badge, description, iconName, items, imageUrl }) {
  const IconComponent = iconMap[iconName] || Monitor;

  // Customize WhatsApp prefilled message based on the specific service category
  const customMessage = `Hi, I am interested in inquiring about your ${category}.`;
  const encodedMessage = encodeURIComponent(customMessage);
  const whatsAppUrl = `https://wa.me/${config.company.whatsAppPhone}?text=${encodedMessage}`;

  return (
    <motion.div
      variants={{
        hidden: { y: 50, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: {
            type: 'spring',
            stiffness: 60,
            damping: 15,
          },
        },
      }}
      className="group relative flex flex-col h-full rounded-3xl bg-slate-900/40 hover:bg-slate-900/80 border border-slate-900 hover:border-slate-800/80 p-6 sm:p-8 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-350 overflow-hidden"
    >
      {/* Top Border glow effect */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true"></div>

      {/* Dynamic service category cover image */}
      {imageUrl && (
        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-6 border border-slate-850 bg-slate-950 flex-shrink-0">
          <img
            src={imageUrl}
            alt={category}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {/* Subtle vignette/shadow overlay inside the image container */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" aria-hidden="true"></div>
        </div>
      )}

      {/* Badge & Icon Row */}
      <div className="flex items-center justify-between mb-6">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 border border-orange-500/20 text-orange-400">
          {badge}
        </span>
        <div className="p-3 rounded-2xl bg-slate-950 border border-slate-850 text-orange-500 group-hover:bg-gradient-to-br group-hover:from-orange-500 group-hover:to-amber-600 group-hover:text-white group-hover:border-transparent group-hover:scale-110 transition-all duration-300" aria-hidden="true">
          <IconComponent className="w-5 h-5" />
        </div>
      </div>

      {/* Title & Description */}
      <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-orange-400 transition-colors duration-300">
        {category}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-6">
        {description}
      </p>

      {/* Checklist items */}
      <ul className="space-y-3 mb-8 flex-grow">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3 group/item">
            <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-250" aria-hidden="true" />
            <span className="text-sm text-slate-300 group-hover/item:text-slate-100 transition-colors duration-250">
              {item}
            </span>
          </li>
        ))}
      </ul>

      {/* WhatsApp Inquiry Button */}
      <a
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl bg-slate-950 border border-slate-850 text-slate-200 hover:text-white font-bold shadow-lg group-hover:border-orange-500/20 hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-amber-500/10 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        <MessageCircle className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
        WhatsApp Inquiry
      </a>
    </motion.div>
  );
}

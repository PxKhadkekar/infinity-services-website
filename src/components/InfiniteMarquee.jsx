import { useReducedMotion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { config } from '../data/config';

// Dynamic Icon Component
function LucideIcon({ name, className }) {
  const IconComponent = Icons[name] || Icons.Wrench;
  return <IconComponent className={className} aria-hidden="true" />;
}

export default function InfiniteMarquee() {
  const shouldReduceMotion = useReducedMotion();
  const marqueeItems = config.marqueeItems || [];

  // Double the list to support seamless infinite loops
  const doubledItems = [...marqueeItems, ...marqueeItems];

  const colorClasses = {
    orange: 'text-orange-500/80 group-hover:text-orange-400',
    amber: 'text-amber-500/80 group-hover:text-amber-400',
    blue: 'text-blue-500/80 group-hover:text-blue-400',
    emerald: 'text-emerald-500/80 group-hover:text-emerald-400',
  };

  return (
    <section className="relative py-10 bg-slate-950/60 border-t border-b border-slate-900 overflow-hidden w-full select-none">
      {/* Decorative side fades to cover edge transitions */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

      {/* Scrolling container track */}
      <div className="w-full flex overflow-hidden">
        {shouldReduceMotion ? (
          // Accessibility: static non-animated flex list on prefers-reduced-motion
          <div className="flex flex-wrap justify-center gap-4.5 max-w-7xl mx-auto px-4">
            {marqueeItems.map((item, idx) => (
              <div
                key={`static-${idx}`}
                className="flex items-center gap-3 px-5 py-2 rounded-2xl bg-white/[0.02] border border-white/[0.035] shadow-md text-sm font-semibold text-slate-200"
              >
                <LucideIcon
                  name={item.icon}
                  className={`w-4.5 h-4.5 ${colorClasses[item.color] || 'text-slate-400'}`}
                />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        ) : (
          // Standard: Infinite scrolling hardware-accelerated track
          <div className="flex w-max relative py-2 group/track">
            {/* Direct CSS translation loops */}
            <div className="flex items-center gap-8.5 animate-marquee group-hover/track:[animation-play-state:paused]">
              {doubledItems.map((item, idx) => (
                <div key={`marquee-${idx}`} className="flex items-center gap-8.5">
                  {/* Card item */}
                  <div className="flex items-center gap-3 px-5 py-2 rounded-2xl bg-white/[0.02] backdrop-blur-md border border-white/[0.035] shadow-lg hover:bg-white/[0.04] hover:border-orange-500/20 hover:shadow-[0_0_10px_rgba(249,115,22,0.05)] group transition-all duration-300 transform hover:-translate-y-0.5">
                    <LucideIcon
                      name={item.icon}
                      className={`w-4.5 h-4.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                        colorClasses[item.color] || 'text-slate-400'
                      }`}
                    />
                    <span className="text-sm font-semibold tracking-wide text-slate-200 group-hover:text-white transition-colors whitespace-nowrap">
                      {item.label}
                    </span>
                  </div>

                  {/* Separator dot */}
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-800 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

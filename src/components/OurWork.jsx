import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  Check, 
  Calendar, 
  ShieldCheck, 
  ArrowRightLeft, 
  MapPin, 
  Maximize2 
} from 'lucide-react';
import { config } from '../data/config';
import { scrollRevealVariants, staggerContainerVariants } from '../data/animations';

// Import Before/After Slider Image Assets
import showcaseCctvBefore from '../assets/Images/showcase-cctv-before.png';
import showcaseCctvAfter from '../assets/Images/showcase-cctv-after.png';
import showcasePcBefore from '../assets/Images/showcase-pc-before.png';
import showcasePcAfter from '../assets/Images/showcase-pc-after.png';
import showcaseElecBefore from '../assets/Images/showcase-elec-before.png';
import showcaseElecAfter from '../assets/Images/showcase-elec-after.png';

const featuredProjects = [
  {
    id: 'cctv',
    title: 'Enterprise CCTV System Deployment',
    category: 'CCTV',
    location: 'Ichalkaranji Industrial Area',
    beforeImg: showcaseCctvBefore,
    afterImg: showcaseCctvAfter,
    beforeLabel: 'Tangled Cable Mess',
    afterLabel: 'Conduit-Protected Security Dome',
    description: 'We reorganized a completely chaotic server room and ceiling-mounted CCTV cabling setup for a commercial warehouse, correcting signal degradation and power routing faults.',
    duration: '1.5 Days',
    metrics: '12 cameras cleaned, labeled, and routed through rigid white PVC conduit.',
    checklist: [
      'Cabling trace and diagnostics',
      'Structural wire channeling',
      'Conduit housing layout',
      'IP66 weather-proof camera mount'
    ]
  },
  {
    id: 'pc',
    title: 'High-Performance Workstation Upgrade',
    category: 'Computer Services',
    location: 'Corporate Office',
    beforeImg: showcasePcBefore,
    afterImg: showcasePcAfter,
    beforeLabel: 'Clogged Dust & Thermal throttling',
    afterLabel: 'Pristine Clean & RGB Cooling System',
    description: 'A customer reported thermal throttling and frequent shutdowns under rendering loads. We diagnosed a clogged air system, extracted years of dust, and upgraded to high-flow RGB coolers.',
    duration: '4 Hours',
    metrics: 'CPU temperatures dropped from 92°C to a stable 55°C under maximum rendering load.',
    checklist: [
      'Complete deep-cleaning dust extraction',
      'High-conductivity thermal paste replacement',
      'RGB liquid cooling unit installation',
      'Precision cable rerouting for optimum airflow'
    ]
  },
  {
    id: 'elec',
    title: 'Main Industrial Power Panel Refitting',
    category: 'Electrical Services',
    location: 'Textile Factory Hub',
    beforeImg: showcaseElecBefore,
    afterImg: showcaseElecAfter,
    beforeLabel: 'Tangled switchboard & Hotspots',
    afterLabel: 'Structured Labeled Breaker Board',
    description: 'A local factory switchboard was posing a high risk of short circuits and overloaded phases due to disorganized legacy wiring. We restructured the board to ensure compliance and load balancing.',
    duration: '2 Days',
    metrics: 'Load balance achieved across three phases; zero hotspots detected during thermal check.',
    checklist: [
      'Old wire stripping and categorization',
      'Phase load diagnostic and re-balancing',
      'Circuit breaker switches relabeled and grouped',
      'Surge protection device integration'
    ]
  }
];

export default function OurWork() {
  // Tabs & Sliders State
  const [activeFeatured, setActiveFeatured] = useState('cctv');
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isSliderDragging, setIsSliderDragging] = useState(false);
  const sliderRef = useRef(null);

  // Mixed Media Filters State
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxItemIndex, setLightboxItemIndex] = useState(null); // index in current filtered media array

  // Combine images and videos from config
  const allMedia = [
    ...config.gallery.map((item) => ({ ...item, type: 'image' })),
    ...config.videos.map((item) => ({ ...item, type: 'video' })),
  ];

  // Filtered list
  const filteredMedia = activeFilter === 'All'
    ? allMedia
    : allMedia.filter((item) => item.category === activeFilter);

  // Active Featured Project Object
  const currentFeatured = featuredProjects.find((p) => p.id === activeFeatured) || featuredProjects[0];

  // Reset slider to middle when switching featured projects
  const handleFeaturedChange = (projectId) => {
    setActiveFeatured(projectId);
    setSliderPosition(50);
  };

  // Drag logic for before/after comparison
  const handleSliderMove = (clientX) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!isSliderDragging) return;
      handleSliderMove(e.clientX);
    };

    const onTouchMove = (e) => {
      if (!isSliderDragging || !e.touches[0]) return;
      handleSliderMove(e.touches[0].clientX);
    };

    const onMouseUp = () => setIsSliderDragging(false);

    if (isSliderDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onTouchMove, { passive: true });
      window.addEventListener('touchend', onMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
    };
  }, [isSliderDragging]);

  const startSliderDrag = (e) => {
    if (e.cancelable) {
      e.preventDefault();
    }
    setIsSliderDragging(true);
  };

  const handleSliderClick = (e) => {
    if (isSliderDragging) return;
    handleSliderMove(e.clientX);
  };

  // Lightbox Navigation Functions
  const showPrev = () => {
    if (lightboxItemIndex === null) return;
    setLightboxItemIndex((prev) => (prev === 0 ? filteredMedia.length - 1 : prev - 1));
  };

  const showNext = () => {
    if (lightboxItemIndex === null) return;
    setLightboxItemIndex((prev) => (prev === filteredMedia.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxItemIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightboxItemIndex(null);
      } else if (e.key === 'ArrowLeft') {
        showPrev();
      } else if (e.key === 'ArrowRight') {
        showNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxItemIndex, filteredMedia]);

  // Touch Swipe for Lightbox on mobile devices
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const swipeThreshold = 60;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > swipeThreshold) {
      showNext();
    } else if (diff < -swipeThreshold) {
      showPrev();
    }
  };

  const activeLightboxItem = lightboxItemIndex !== null ? filteredMedia[lightboxItemIndex] : null;

  return (
    <section id="our-work" className="relative bg-slate-950 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-slate-900">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(249,115,22,0.04)_0%,transparent_70%)] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[radial-gradient(circle,rgba(59,130,246,0.04)_0%,transparent_70%)] pointer-events-none"></div>

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
            Portfolio
          </motion.p>
          <motion.h2
            variants={scrollRevealVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4"
          >
            Our Work
          </motion.h2>
          <motion.div
            variants={scrollRevealVariants}
            className="h-1.5 w-20 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto rounded-full mb-6"
          />
          <motion.p
            variants={scrollRevealVariants}
            className="text-base sm:text-lg text-slate-400 leading-relaxed"
          >
            Explore case studies, high-resolution media, and project recordings demonstrating our repair and installation standards.
          </motion.p>
        </motion.div>

        {/* ========================================================================= */}
        {/* PART 1: FEATURED PROJECTS (Sliders) */}
        {/* ========================================================================= */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.03]">
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-orange-500" />
              Featured Case Studies
            </h3>
            <div className="flex gap-2">
              {featuredProjects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleFeaturedChange(p.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-300 cursor-pointer ${
                    activeFeatured === p.id
                      ? 'bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-500/20'
                      : 'bg-white/[0.02] border-white/[0.05] text-slate-450 hover:text-slate-200'
                  }`}
                >
                  {p.category.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeatured}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Slider Box */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div
                  ref={sliderRef}
                  onClick={handleSliderClick}
                  onMouseDown={startSliderDrag}
                  onTouchStart={startSliderDrag}
                  className="relative w-full aspect-video select-none rounded-3xl overflow-hidden border border-white/[0.08] bg-slate-900 shadow-2xl cursor-ew-resize"
                >
                  {/* Before */}
                  <img
                    src={currentFeatured.beforeImg}
                    alt="Before Work"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    loading="lazy"
                  />
                  {/* After (clipped) */}
                  <img
                    src={currentFeatured.afterImg}
                    alt="After Work"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
                    loading="lazy"
                  />

                  {/* Labels */}
                  <div
                    className="absolute top-4 left-4 z-10 px-3 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-red-500/20 text-red-400 text-xxs font-extrabold uppercase tracking-widest shadow"
                    style={{ opacity: sliderPosition < 15 ? 0 : 1 }}
                  >
                    Before
                  </div>
                  <div
                    className="absolute top-4 right-4 z-10 px-3 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-emerald-500/20 text-emerald-400 text-xxs font-extrabold uppercase tracking-widest shadow"
                    style={{ opacity: sliderPosition > 85 ? 0 : 1 }}
                  >
                    After
                  </div>

                  {/* Bar and handle */}
                  <div
                    className="absolute inset-y-0 w-1 bg-gradient-to-b from-orange-500 via-amber-400 to-orange-500 z-20 shadow-[0_0_15px_rgba(249,115,22,0.6)]"
                    style={{ left: `${sliderPosition}%` }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-950 border border-orange-500 text-orange-500 flex items-center justify-center shadow-lg z-20"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <ArrowRightLeft className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Scope Content Details */}
              <div className="lg:col-span-5 flex">
                <div className="w-full bg-white/[0.01] border border-white/[0.05] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

                  <div>
                    <div className="flex flex-wrap gap-2 items-center mb-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] sm:text-xs font-bold tracking-wide">
                        Featured Project
                      </span>
                      {currentFeatured.location && (
                        <span className="inline-flex items-center gap-1 text-slate-500 text-[10px] sm:text-xs">
                          <MapPin className="w-3 h-3" />
                          {currentFeatured.location}
                        </span>
                      )}
                    </div>

                    <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-3">
                      {currentFeatured.title}
                    </h4>

                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-5">
                      {currentFeatured.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-5">
                      <div className="p-3.5 rounded-xl bg-white/[0.01] border border-white/[0.03] flex items-center gap-2.5">
                        <Calendar className="w-4 h-4 text-orange-550 flex-shrink-0" />
                        <div>
                          <div className="text-[9px] text-slate-500 uppercase font-extrabold tracking-wider">Timeframe</div>
                          <div className="text-xs font-bold text-slate-350">{currentFeatured.duration}</div>
                        </div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/[0.01] border border-white/[0.03] flex items-center gap-2.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-450 flex-shrink-0" />
                        <div>
                          <div className="text-[9px] text-slate-500 uppercase font-extrabold tracking-wider">Metrics</div>
                          <div className="text-xs font-bold text-slate-350">100% Balanced</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-orange-500/5 border border-orange-500/10 text-slate-300 text-xs mb-5">
                      <strong className="text-orange-400 font-bold block mb-0.5">Key Performance outcome:</strong>
                      {currentFeatured.metrics}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-450 mb-2.5">
                      Technical Checklist
                    </h5>
                    <ul className="space-y-2">
                      {currentFeatured.checklist.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-355">
                          <span className="p-0.5 rounded-full bg-emerald-500/10 text-emerald-400 mt-0.5 flex-shrink-0">
                            <Check className="w-2.5 h-2.5" strokeWidth={3} />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ========================================================================= */}
        {/* PART 2: MIXED MEDIA GRID (Filterable photos & videos) */}
        {/* ========================================================================= */}
        <div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-white/[0.03] pb-6">
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Maximize2 className="w-5 h-5 text-blue-500" />
              Mixed Media Gallery
            </h3>
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {['All', 'CCTV', 'Computer Services', 'Electrical Services'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 border cursor-pointer ${
                    activeFilter === filter
                      ? 'bg-blue-500 border-blue-500 text-white shadow-md shadow-blue-500/20'
                      : 'bg-white/[0.02] border-white/[0.05] text-slate-400 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry-Style Responsive Layout */}
          <motion.div
            layout
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredMedia.map((item, index) => {
                // Find index of item in global filteredMedia array to pass to lightbox opener
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    key={`${item.type}-${item.id}`}
                    className="break-inside-avoid bg-white/[0.01] backdrop-blur-xl border border-white/[0.04] rounded-3xl p-3.5 shadow-lg hover:shadow-xl hover:border-slate-800 transition-all duration-300 group cursor-pointer overflow-hidden flex flex-col gap-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => setLightboxItemIndex(index)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setLightboxItemIndex(index);
                      }
                    }}
                    role="button"
                    aria-label={`Open ${item.type}: ${item.title}`}
                  >
                    {/* Media Thumbnail Frame */}
                    <div className="relative overflow-hidden rounded-2xl bg-slate-950 aspect-[4/3] sm:aspect-auto border border-white/[0.02] flex items-center justify-center">
                      <img
                        src={item.type === 'video' ? item.poster : item.src}
                        alt={item.title}
                        className="w-full h-auto max-h-[320px] object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* Hover Overlay Icons */}
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        {item.type === 'video' ? (
                          <div className="p-4 rounded-full bg-blue-500 text-white shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
                            <Play className="w-5 h-5 fill-current" />
                          </div>
                        ) : (
                          <div className="p-4 rounded-full bg-orange-500 text-white shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
                            <ZoomIn className="w-5 h-5" />
                          </div>
                        )}
                      </div>

                      {/* Type Indicator Tag */}
                      <span className={`absolute bottom-3 left-3 px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-widest text-white shadow-md ${
                        item.type === 'video' ? 'bg-blue-600' : 'bg-orange-600'
                      }`}>
                        {item.type}
                      </span>
                    </div>

                    {/* Metadata summary */}
                    <div className="px-1 py-0.5">
                      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                        {item.category}
                      </span>
                      <h4 className="text-sm font-bold text-white leading-snug group-hover:text-blue-400 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-slate-450 text-xs mt-1.5 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Empty fallback */}
          {filteredMedia.length === 0 && (
            <div className="text-center py-16 bg-white/[0.01] border border-white/[0.04] rounded-3xl">
              <p className="text-slate-400 text-sm">No items found matching the filter criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PART 3: PREMIUM FULLSCREEN LIGHTBOX EXPERIENCE */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeLightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Toolbar controls */}
            <div className="flex items-center justify-between w-full z-10 max-w-7xl mx-auto">
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-extrabold text-blue-500 uppercase tracking-widest">
                  {activeLightboxItem.category}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white">
                  {activeLightboxItem.title}
                </h4>
              </div>
              <button
                onClick={() => setLightboxItemIndex(null)}
                className="p-2 sm:p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer focus:outline-none"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5 sm:w-6 h-6" />
              </button>
            </div>

            {/* Media Body Showcase Area */}
            <div className="relative flex-grow flex items-center justify-center max-w-5xl mx-auto w-full py-4">
              {/* Previous Slide button */}
              <button
                onClick={showPrev}
                className="absolute left-0 sm:-left-16 p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-white text-slate-400 cursor-pointer hidden md:flex items-center justify-center z-10 focus:outline-none"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Active Media Container */}
              <motion.div
                key={`${activeLightboxItem.type}-${activeLightboxItem.id}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full flex items-center justify-center overflow-hidden"
              >
                {activeLightboxItem.type === 'video' ? (
                  <div className="relative w-full max-h-[80vh] aspect-video rounded-2xl overflow-hidden bg-black border border-white/[0.05]">
                    <video
                      src={activeLightboxItem.src}
                      poster={activeLightboxItem.poster}
                      controls
                      autoPlay
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <img
                    src={activeLightboxItem.src}
                    alt={activeLightboxItem.title}
                    className="max-w-full max-h-[75vh] object-contain rounded-2xl border border-white/[0.05] shadow-2xl"
                  />
                )}
              </motion.div>

              {/* Next Slide button */}
              <button
                onClick={showNext}
                className="absolute right-0 sm:-right-16 p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-white text-slate-400 cursor-pointer hidden md:flex items-center justify-center z-10 focus:outline-none"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Details Caption */}
            <div className="w-full z-10 text-center max-w-3xl mx-auto mb-2">
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                {activeLightboxItem.description}
              </p>
              <div className="mt-3 flex items-center justify-center gap-1.5 text-xxs font-semibold text-slate-500 uppercase tracking-widest">
                <span>Slide {lightboxItemIndex + 1} of {filteredMedia.length}</span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline">Use Arrow keys or Swipe Left/Right</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

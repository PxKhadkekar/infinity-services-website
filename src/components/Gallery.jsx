import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { config } from '../data/config';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeImage, setActiveImage] = useState(null);

  // Extract unique categories dynamically
  const categories = ['All', ...new Set(config.gallery.map(img => img.category))];

  const filteredImages = selectedCategory === 'All'
    ? config.gallery
    : config.gallery.filter(img => img.category === selectedCategory);

  // Handle Escape key to close the lightbox modal
  useEffect(() => {
    if (!activeImage) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImage]);

  return (
    <section id="gallery" className="relative bg-slate-950 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-slate-900">
      {/* Background elements */}
      <div className="absolute top-0 inset-x-0 h-1/2 w-full bg-[radial-gradient(circle_at_top,rgba(30,58,138,0.1)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs sm:text-sm font-bold tracking-widest text-orange-500 uppercase mb-3"
          >
            Visual Portfolio
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Our Work Gallery
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base mt-4 max-w-xl mx-auto leading-relaxed"
          >
            Explore real photos of our CCTV installations, electrical fault diagnostics, and certified refurbishment workmanship.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-16 h-1 bg-gradient-to-r from-orange-500 to-amber-600 mx-auto mt-6 rounded-full origin-center"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/25 border border-transparent'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-850 hover:border-slate-800'
              }`}
              aria-label={`Filter gallery by ${category}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={image.id}
                tabIndex={0}
                className="group relative rounded-3xl overflow-hidden bg-slate-900/40 border border-slate-900 hover:border-slate-800/80 focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/20 p-3 backdrop-blur-sm shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer focus:outline-none"
                onClick={() => setActiveImage(image)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveImage(image);
                  }
                }}
                role="button"
                aria-label={`View larger image: ${image.title}`}
              >
                {/* Image Wrapper */}
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-850 flex-shrink-0">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Glass Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="p-3.5 rounded-full bg-orange-500 text-white shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </div>
                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 border border-slate-800 text-orange-400 backdrop-blur-sm">
                    {image.category}
                  </span>
                </div>

                {/* Content */}
                <div className="pt-4 px-2 flex-grow">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300 line-clamp-1">
                    {image.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                    {image.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal Overlay */}
      <AnimatePresence>
        {activeImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveImage(null)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
            ></motion.div>

            {/* Lightbox Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              role="dialog"
              aria-modal="true"
              aria-label="Image lightbox"
              className="relative z-10 w-full max-w-4xl rounded-3xl bg-slate-900 border border-slate-850 overflow-y-auto max-h-[90vh] shadow-2xl focus:outline-none"
            >
              {/* Close button */}
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950/85 hover:bg-slate-950 text-slate-400 hover:text-white border border-slate-800 transition-all duration-250 focus:outline-none focus:ring-2 focus:ring-orange-500 z-20"
                aria-label="Close lightbox modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Layout Container */}
              <div className="flex flex-col md:flex-row h-full">
                {/* Visual Area */}
                <div className="relative w-full md:w-3/5 aspect-video md:aspect-auto bg-slate-950 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-850">
                  <img
                    src={activeImage.src}
                    alt={activeImage.title}
                    className="w-full h-full object-cover max-h-[50vh] md:max-h-[75vh]"
                  />
                </div>

                {/* Details Area */}
                <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-center bg-slate-900">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-500/10 border border-orange-500/20 text-orange-400 mb-4 self-start">
                    {activeImage.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-3 leading-tight">
                    {activeImage.title}
                  </h3>
                  <p className="text-sm text-slate-350 leading-relaxed">
                    {activeImage.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

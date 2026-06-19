import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Clock } from 'lucide-react';
import { config } from '../data/config';

export default function Videos() {
  const [activeVideo, setActiveVideo] = useState(null);
  const videoRef = useRef(null);

  // Close video modal on Escape key press
  useEffect(() => {
    if (!activeVideo) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveVideo(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeVideo]);

  return (
    <section id="videos" className="relative bg-slate-950 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-slate-900">
      {/* Background gradients */}
      <div className="absolute bottom-0 inset-x-0 h-1/2 w-full bg-[radial-gradient(circle_at_bottom,rgba(30,58,138,0.08)_0%,transparent_70%)] pointer-events-none"></div>

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
            Video Showcase
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Recent Work Videos
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base mt-4 max-w-xl mx-auto leading-relaxed"
          >
            Watch real-time recordings of our technicians mounting security gear and proving refurbishments.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-16 h-1 bg-gradient-to-r from-orange-500 to-amber-600 mx-auto mt-6 rounded-full origin-center"
          />
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {config.videos.map((video, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              key={video.id}
              tabIndex={0}
              className="group relative flex flex-col rounded-3xl bg-slate-900/40 hover:bg-slate-900/80 border border-slate-900 hover:border-slate-800/80 focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/20 p-5 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-350 overflow-hidden cursor-pointer focus:outline-none"
              onClick={() => setActiveVideo(video)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveVideo(video);
                }
              }}
              role="button"
              aria-label={`Play video: ${video.title}`}
            >
              {/* Cover Video Player Frame / Thumbnail */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-850 flex items-center justify-center">
                {/* Static Poster Thumbnail (Optimized lazy-loading image) */}
                {video.poster && (
                  <img
                    src={video.poster}
                    alt={`${video.title} Poster`}
                    className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                    loading="lazy"
                  />
                )}
                
                {/* Play Button Overlay */}
                <div className="relative z-10 p-5 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-xl scale-95 group-hover:scale-110 active:scale-95 transition-all duration-300">
                  <Play className="w-6 h-6 fill-current" />
                </div>

                {/* Duration Badge */}
                <span className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-950/80 border border-slate-800 text-slate-300 backdrop-blur-sm">
                  <Clock className="w-3.5 h-3.5 text-orange-400" />
                  {video.duration}
                </span>
              </div>

              {/* Title & Description */}
              <div className="pt-5 flex-grow">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">
                  {video.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {video.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Lightbox Player Modal */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveVideo(null)}
              className="absolute inset-0 bg-slate-950/85 backdrop-blur-md"
            ></motion.div>

            {/* Video Container Dialog */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-video-title"
              className="relative z-10 w-full max-w-3xl rounded-3xl bg-slate-900 border border-slate-850 overflow-y-auto max-h-[90vh] shadow-2xl p-4 md:p-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950/85 hover:bg-slate-950 text-slate-400 hover:text-white border border-slate-800 transition-all duration-250 focus:outline-none focus:ring-2 focus:ring-orange-500 z-20"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Title */}
              <div className="mb-4 pr-12">
                <h3 id="modal-video-title" className="text-lg md:text-xl font-bold text-white leading-tight">
                  {activeVideo.title}
                </h3>
              </div>

              {/* Video Player */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-850">
                <video
                  ref={videoRef}
                  src={activeVideo.src}
                  controls
                  autoPlay
                  preload="metadata"
                  poster={activeVideo.poster}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Footer description */}
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed mt-4">
                {activeVideo.description}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

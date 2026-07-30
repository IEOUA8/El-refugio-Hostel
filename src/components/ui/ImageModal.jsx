import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const ImageModal = ({ isOpen, onClose, images, currentIndex, onNext, onPrev }) => {
  // Handle keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return;
    
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onPrev();
    if (e.key === 'ArrowRight') onNext();
  }, [isOpen, onClose, onNext, onPrev]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    // Prevent scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-50 bg-black/20 p-2 rounded-full"
          >
            <X size={32} />
          </button>

          <div 
            className="relative w-full h-full max-w-7xl mx-auto flex items-center justify-center px-4 md:px-12 py-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Navigation Buttons */}
            <button
              onClick={onPrev}
              className="absolute left-2 md:left-4 text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all z-50"
            >
              <ChevronLeft size={48} />
            </button>

            <button
              onClick={onNext}
              className="absolute right-2 md:right-4 text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all z-50"
            >
              <ChevronRight size={48} />
            </button>

            {/* Image */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-full max-h-full"
            >
              <img
                src={images[currentIndex]}
                alt={`Gallery image ${currentIndex + 1}`}
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-center text-white/80 bg-gradient-to-t from-black/60 to-transparent rounded-b-lg">
                {currentIndex + 1} / {images.length}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;
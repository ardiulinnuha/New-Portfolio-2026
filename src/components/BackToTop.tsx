import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const checkScrollPosition = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const heroElement = document.getElementById('hero');
          if (heroElement) {
            const heroBottom = heroElement.getBoundingClientRect().bottom;
            // When hero bottom has scrolled past the top navigation threshold
            setIsVisible(heroBottom <= 80);
          } else {
            setIsVisible(window.scrollY > 400);
          }
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', checkScrollPosition, { passive: true });
    checkScrollPosition();
    return () => window.removeEventListener('scroll', checkScrollPosition);
  }, []);

  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          id="back-to-top-fab"
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.7, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 16 }}
          whileHover={{ 
            scale: 1.1, 
            y: -2,
            transition: { duration: 0.2, ease: 'easeOut' } 
          }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          aria-label="Back to top"
          title="Back to top"
          className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] sm:bottom-8 sm:right-8 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-200 group focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-2 bg-[#0f1117]/90 text-cyan-400 border border-cyan-500/30 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-cyan-400/80 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.45)] backdrop-blur-md focus:ring-offset-black"
        >
          <ArrowUp className="w-5 h-5 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          <span className="sr-only">Back to top</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

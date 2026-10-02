import React, { useEffect, useRef } from 'react';

export const ScrollProgress: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0 && barRef.current) {
        const scrolled = Math.min(1, Math.max(0, totalScroll / windowHeight));
        barRef.current.style.transform = `scaleX(${scrolled})`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      id="scroll-progress-bar-container"
      className="fixed top-0 left-0 w-full h-[3px] z-50 pointer-events-none bg-transparent"
    >
      <div
        ref={barRef}
        id="scroll-progress-bar"
        className="h-full w-full origin-left bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.7)] will-change-transform"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer 
      id="main-footer" 
      className="py-6 sm:py-8 relative z-10 overflow-hidden transition-colors duration-300 bg-[#050505]/95 backdrop-blur-md border-t border-white/10 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Unified Footer Container */}
        <div id="footer-container" className="flex flex-col items-start text-left w-full">
          <div className="text-lg sm:text-xl font-mono uppercase tracking-wider sm:tracking-widest font-bold mb-4 text-purple-400 text-left w-full">
            <span>Official Profiles & Showcase</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 w-full">
              {/* 1. LinkedIn - Brand Blue #0A66C2 */}
              <motion.a
                id="footer-social-link-linkedin"
                href={PERSONAL_INFO.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, transition: { duration: 0.25, ease: 'easeOut' } }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center justify-between px-3 py-2.5 rounded-xl border text-[11px] font-mono cursor-pointer shadow-sm bg-white/[0.03] hover:bg-[#0A66C2]/10 border-white/10 hover:border-[#0A66C2]/60 text-gray-300 hover:text-white hover:shadow-[0_0_20px_rgba(10,102,194,0.25)] transition-all duration-300 ease-out"
              >
                <div className="flex flex-col min-w-0 pr-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0A66C2] group-hover:scale-125 group-hover:bg-[#3897f0] group-hover:shadow-[0_0_8px_rgba(10,102,194,0.85)] transition-all duration-300 ease-out shrink-0" />
                    <span className="font-bold truncate text-gray-200 group-hover:text-[#3897f0] transition-colors duration-300 ease-out">LinkedIn</span>
                  </div>
                  <span className="text-[9px] truncate pl-3 mt-0.5 tracking-tight font-sans text-gray-500 group-hover:text-[#93c5fd] transition-colors duration-300 ease-out">
                    Professional Network
                  </span>
                </div>
                <ExternalLink className="w-3 h-3 text-gray-400 opacity-60 group-hover:opacity-100 group-hover:text-[#3897f0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ease-out shrink-0 ml-1" />
              </motion.a>

              {/* 2. Behance - Brand Blue #1769FF */}
              <motion.a
                id="footer-social-link-behance"
                href={PERSONAL_INFO.socialLinks.behance}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, transition: { duration: 0.25, ease: 'easeOut' } }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center justify-between px-3 py-2.5 rounded-xl border text-[11px] font-mono cursor-pointer shadow-sm bg-white/[0.03] hover:bg-[#1769FF]/10 border-white/10 hover:border-[#1769FF]/60 text-gray-300 hover:text-white hover:shadow-[0_0_20px_rgba(23,105,255,0.25)] transition-all duration-300 ease-out"
              >
                <div className="flex flex-col min-w-0 pr-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1769FF] group-hover:scale-125 group-hover:bg-[#4d8eff] group-hover:shadow-[0_0_8px_rgba(23,105,255,0.85)] transition-all duration-300 ease-out shrink-0" />
                    <span className="font-bold truncate text-gray-200 group-hover:text-[#4d8eff] transition-colors duration-300 ease-out">Behance</span>
                  </div>
                  <span className="text-[9px] truncate pl-3 mt-0.5 tracking-tight font-sans text-gray-500 group-hover:text-[#bfdbfe] transition-colors duration-300 ease-out">
                    Visual Portfolios
                  </span>
                </div>
                <ExternalLink className="w-3 h-3 text-gray-400 opacity-60 group-hover:opacity-100 group-hover:text-[#4d8eff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ease-out shrink-0 ml-1" />
              </motion.a>

              {/* 3. YouTube - Brand Red #FF0000 */}
              <motion.a
                id="footer-social-link-youtube"
                href={PERSONAL_INFO.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, transition: { duration: 0.25, ease: 'easeOut' } }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center justify-between px-3 py-2.5 rounded-xl border text-[11px] font-mono cursor-pointer shadow-sm bg-white/[0.03] hover:bg-[#FF0000]/10 border-white/10 hover:border-[#FF0000]/60 text-gray-300 hover:text-white hover:shadow-[0_0_20px_rgba(255,0,0,0.25)] transition-all duration-300 ease-out"
              >
                <div className="flex flex-col min-w-0 pr-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000] group-hover:scale-125 group-hover:bg-[#ff4d4d] group-hover:shadow-[0_0_8px_rgba(255,0,0,0.85)] transition-all duration-300 ease-out shrink-0" />
                    <span className="font-bold truncate text-gray-200 group-hover:text-[#ff4d4d] transition-colors duration-300 ease-out">YouTube</span>
                  </div>
                  <span className="text-[9px] truncate pl-3 mt-0.5 tracking-tight font-sans text-gray-500 group-hover:text-[#fca5a5] transition-colors duration-300 ease-out">
                    Video Reels
                  </span>
                </div>
                <ExternalLink className="w-3 h-3 text-gray-400 opacity-60 group-hover:opacity-100 group-hover:text-[#ff4d4d] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ease-out shrink-0 ml-1" />
              </motion.a>

              {/* 4. Dicoding - Brand Cyan/Sky Blue #3498DB */}
              <motion.a
                id="footer-social-link-dicoding"
                href={PERSONAL_INFO.socialLinks.dicoding}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, transition: { duration: 0.25, ease: 'easeOut' } }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center justify-between px-3 py-2.5 rounded-xl border text-[11px] font-mono cursor-pointer shadow-sm bg-white/[0.03] hover:bg-[#3498DB]/10 border-white/10 hover:border-[#3498DB]/60 text-gray-300 hover:text-white hover:shadow-[0_0_20px_rgba(52,152,219,0.25)] transition-all duration-300 ease-out"
              >
                <div className="flex flex-col min-w-0 pr-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3498DB] group-hover:scale-125 group-hover:bg-[#5dade2] group-hover:shadow-[0_0_8px_rgba(52,152,219,0.85)] transition-all duration-300 ease-out shrink-0" />
                    <span className="font-bold truncate text-gray-200 group-hover:text-[#5dade2] transition-colors duration-300 ease-out">Dicoding</span>
                  </div>
                  <span className="text-[9px] truncate pl-3 mt-0.5 tracking-tight font-sans text-gray-500 group-hover:text-[#bae6fd] transition-colors duration-300 ease-out">
                    Certified Academy
                  </span>
                </div>
                <ExternalLink className="w-3 h-3 text-gray-400 opacity-60 group-hover:opacity-100 group-hover:text-[#5dade2] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ease-out shrink-0 ml-1" />
              </motion.a>

              {/* 5. Google Dev - Brand Google Multi-Color / Blue #4285F4 */}
              <motion.a
                id="footer-social-link-developer"
                href={PERSONAL_INFO.socialLinks.developer}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, transition: { duration: 0.25, ease: 'easeOut' } }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center justify-between px-3 py-2.5 rounded-xl border text-[11px] font-mono cursor-pointer shadow-sm bg-white/[0.03] hover:bg-[#4285F4]/10 border-white/10 hover:border-[#4285F4]/60 text-gray-300 hover:text-white hover:shadow-[0_0_20px_rgba(66,133,244,0.25)] transition-all duration-300 ease-out"
              >
                <div className="flex flex-col min-w-0 pr-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-[#4285F4] via-[#EA4335] to-[#FBBC05] group-hover:scale-125 group-hover:shadow-[0_0_8px_rgba(66,133,244,0.85)] transition-all duration-300 ease-out shrink-0" />
                    <span className="font-bold truncate text-gray-200 group-hover:text-[#4285F4] transition-colors duration-300 ease-out">Google Dev</span>
                  </div>
                  <span className="text-[9px] truncate pl-3 mt-0.5 tracking-tight font-sans text-gray-500 group-hover:text-[#93c5fd] transition-colors duration-300 ease-out">
                    Developer Profile
                  </span>
                </div>
                <ExternalLink className="w-3 h-3 text-gray-400 opacity-60 group-hover:opacity-100 group-hover:text-[#4285F4] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ease-out shrink-0 ml-1" />
              </motion.a>

              {/* 6. Credly - Brand Orange #FF6B00 */}
              <motion.a
                id="footer-social-link-credly"
                href={PERSONAL_INFO.socialLinks.credly}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, transition: { duration: 0.25, ease: 'easeOut' } }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center justify-between px-3 py-2.5 rounded-xl border text-[11px] font-mono cursor-pointer shadow-sm bg-white/[0.03] hover:bg-[#FF6B00]/10 border-white/10 hover:border-[#FF6B00]/60 text-gray-300 hover:text-white hover:shadow-[0_0_20px_rgba(255,107,0,0.25)] transition-all duration-300 ease-out"
              >
                <div className="flex flex-col min-w-0 pr-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] group-hover:scale-125 group-hover:bg-[#ff8533] group-hover:shadow-[0_0_8px_rgba(255,107,0,0.85)] transition-all duration-300 ease-out shrink-0" />
                    <span className="font-bold truncate text-gray-200 group-hover:text-[#ff8533] transition-colors duration-300 ease-out">Credly</span>
                  </div>
                  <span className="text-[9px] truncate pl-3 mt-0.5 tracking-tight font-sans text-gray-500 group-hover:text-[#fed7aa] transition-colors duration-300 ease-out">
                    Verified Badges
                  </span>
                </div>
                <ExternalLink className="w-3 h-3 text-gray-400 opacity-60 group-hover:opacity-100 group-hover:text-[#ff8533] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ease-out shrink-0 ml-1" />
              </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

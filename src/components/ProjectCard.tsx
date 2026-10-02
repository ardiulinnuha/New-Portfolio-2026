import React, { useRef, memo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, type Variants } from 'motion/react';
import { Project } from '../types';
import { YouTubeIcon } from './YouTubeIcon';
import { LazyImage } from './LazyImage';
import { Eye, Image as ImageIcon, Sparkles, Globe } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import { isAiTool, getToolBadgeClass } from '../utils/aiToolHelper';

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
  index?: number;
}

export const cardEntranceVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 36,
    scale: 0.96
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.21, 0.47, 0.32, 0.98]
    }
  }
};

export const ProjectCard: React.FC<ProjectCardProps> = memo(({ project, onOpenModal, index = 0 }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Normalized mouse coordinates from center (-1 to 1)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for smooth magnetic tilt & translation
  const springConfig = { damping: 22, stiffness: 220, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Subtle 3D Tilt angles (in degrees)
  const rotateX = useTransform(smoothY, [-1, 1], [6, -6]);
  const rotateY = useTransform(smoothX, [-1, 1], [-6, 6]);

  // Subtle magnetic translation toward cursor (in pixels)
  const translateX = useTransform(smoothX, [-1, 1], [-5, 5]);
  const translateY = useTransform(smoothY, [-1, 1], [-5, 5]);

  const rectRef = useRef<DOMRect | null>(null);
  const rafIdRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    soundManager.playCardHover();
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current && cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
    const rect = rectRef.current;
    if (!rect) return;

    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }

    rafIdRef.current = requestAnimationFrame(() => {
      const normX = ((clientX / rect.width) - 0.5) * 2;
      const normY = ((clientY / rect.height) - 0.5) * 2;

      mouseX.set(Math.max(-1, Math.min(1, normX)));
      mouseY.set(Math.max(-1, Math.min(1, normY)));
      rafIdRef.current = null;
    });
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleCardClick = () => {
    soundManager.playClick();
    onOpenModal(project);
  };

  const displayedTitle = project.titleEn || project.title;
  const displayedDescription = project.descriptionEn || project.description;

  return (
    <motion.div 
      className="perspective-1000 h-full"
      variants={cardEntranceVariants}
    >
      <motion.div
        ref={cardRef}
        id={`project-card-${project.id}`}
        data-sound-hover="card"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          x: translateX,
          y: translateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{
          scale: 1.03,
          transition: { 
            type: 'spring', 
            stiffness: 280, 
            damping: 18,
            mass: 0.6
          }
        }}
        whileTap={{
          scale: 0.985,
          transition: {
            type: 'spring',
            stiffness: 350,
            damping: 22
          }
        }}
        className="group bg-[#0f0f0f] border border-white/10 rounded-3xl overflow-hidden flex flex-col justify-between transition-colors duration-300 hover:border-white/25 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)] relative will-change-transform h-full"
      >
        {/* Visual Mockup Header with Consistent 16:9 Aspect Ratio */}
        <div 
          className="relative w-full aspect-video min-h-[180px] bg-[#0c0d12] flex flex-col justify-between overflow-hidden cursor-pointer select-none"
          onClick={handleCardClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleCardClick();
            }
          }}
          aria-label={`Open project details for ${displayedTitle}`}
        >
          {/* Main Visual Display: Image Container with Centered Alignment */}
          {project.imageUrl ? (
            <div className="absolute inset-0 overflow-hidden bg-[#0c0d12] flex items-center justify-center aspect-video">
              <LazyImage
                src={project.imageUrl}
                alt={`${displayedTitle} - Proyek ${project.categoryLabelEn || project.categoryLabel} oleh Ardi Ulinnuha`}
                width={800}
                height={450}
                loading="lazy"
                aspectRatio="16/9"
                rootMargin="250px 0px"
                containerClassName="w-full h-full aspect-video flex items-center justify-center"
                className={`w-full h-full aspect-video ${
                  project.imageFit === 'contain'
                    ? 'object-contain object-center p-2 sm:p-2.5 group-hover:scale-[1.02] opacity-100'
                    : 'object-cover object-center opacity-95 group-hover:opacity-100 group-hover:scale-[1.03]'
                } transition-all duration-500`}
              />
            </div>
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradientBg} opacity-90 flex items-center justify-center`}>
              <div className="absolute inset-0 bg-grid-pattern opacity-20" />
            </div>
          )}

          {/* Center Preview Placeholder: Dead center vertically and horizontally for dummy items */}
          {project.isPlaceholder && (
            <div className="absolute inset-0 z-10 flex items-center justify-center p-4 pointer-events-none">
              <div className="flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-[11px] font-mono text-gray-200 group-hover:text-white group-hover:border-cyan-400/50 group-hover:scale-105 transition-all shadow-xl text-center">
                <ImageIcon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="font-semibold tracking-wide">Preview Placeholder</span>
              </div>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
          <div>
            <h3 
              className="font-display font-bold text-lg text-white mb-2.5 group-hover:text-cyan-300 transition-colors cursor-pointer"
              onClick={handleCardClick}
            >
              {displayedTitle}
            </h3>
            
            <p className="text-xs text-gray-300 line-clamp-3 mb-5 leading-relaxed opacity-80">
              {displayedDescription}
            </p>
          </div>

          <div className="mt-auto pt-2">
            {/* Tool Badges */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tools.slice(0, 4).map((tool, i) => {
                const isAi = isAiTool(tool);
                return (
                  <span
                    key={i}
                    className={getToolBadgeClass(tool, true)}
                  >
                    {isAi && <Sparkles className="w-2.5 h-2.5 text-cyan-400 shrink-0" />}
                    <span>{tool}</span>
                  </span>
                );
              })}
              {project.tools.length > 4 && (
                <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-gray-400">
                  +{project.tools.length - 4}
                </span>
              )}
            </div>

            {/* Actions Bar */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <button
                id={`preview-detail-btn-${project.id}`}
                type="button"
                onClick={handleCardClick}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-400 hover:text-white transition-colors min-h-[44px] px-2.5 -ml-2.5 rounded-lg hover:bg-white/5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Details</span>
              </button>

              <div className="flex items-center gap-1.5">
                {project.websiteUrl && (
                  <a
                    href={project.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-11 h-11 md:w-10 md:h-10 min-w-[44px] min-h-[44px] md:min-w-[40px] md:min-h-[40px] rounded-full bg-white/5 hover:bg-cyan-500/20 text-cyan-400 hover:text-white transition-colors flex items-center justify-center cursor-pointer border border-white/5 hover:border-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    title={`Visit Website for ${displayedTitle}`}
                    aria-label={`Visit Website for ${displayedTitle}`}
                  >
                    <Globe className="w-4 h-4 text-cyan-400" />
                  </a>
                )}
                {!project.websiteUrl && !project.youtubeUrl && project.behanceUrl && (
                  <a
                    href={project.behanceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-11 h-11 md:w-10 md:h-10 min-w-[44px] min-h-[44px] md:min-w-[40px] md:min-h-[40px] rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors flex items-center justify-center cursor-pointer border border-white/5 hover:border-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    title={`View ${displayedTitle} on Behance`}
                    aria-label={`View ${displayedTitle} on Behance`}
                  >
                    <span className="font-bold text-xs text-cyan-400">Bē</span>
                  </a>
                )}
                {!project.websiteUrl && project.youtubeUrl && (
                  <a
                    href={project.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-11 h-11 md:w-10 md:h-10 min-w-[44px] min-h-[44px] md:min-w-[40px] md:min-h-[40px] rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors flex items-center justify-center cursor-pointer border border-white/5 hover:border-red-400/30 focus:outline-none focus:ring-2 focus:ring-red-400"
                    title={`Watch ${displayedTitle} on YouTube`}
                    aria-label={`Watch ${displayedTitle} on YouTube`}
                  >
                    <YouTubeIcon className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';


import React, { useEffect, useState, useRef, lazy, Suspense } from 'react';
import { createPortal } from 'react-dom';
import { Project, ProjectGalleryItem } from '../types';
import { YouTubeIcon } from './YouTubeIcon';
import { LazyImage } from './LazyImage';
import { RoadmapVisualizer } from './RoadmapVisualizer';
import { ShareButton } from './ShareButton';
import { PROTECTED_MEDIA_DISCLAIMER } from '../data/translations';

const ImageLightbox = lazy(() => 
  import('./ImageLightbox').then((m) => ({ default: m.ImageLightbox }))
);
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  Image as ImageIcon,
  Briefcase,
  Calendar,
  Tag,
  TrendingUp,
  Maximize2,
  ArrowUp,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Share2,
  Check,
  Globe
} from 'lucide-react';
import { isAiTool, getToolBadgeClass } from '../utils/aiToolHelper';
import { soundManager } from '../utils/soundEffects';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onPreviousProject?: () => void;
  onNextProject?: () => void;
  previousProject?: Project | null;
  nextProject?: Project | null;
  currentIndex?: number;
  totalProjects?: number;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ 
  project, 
  isOpen, 
  onClose,
  onPreviousProject,
  onNextProject,
  previousProject,
  nextProject,
  currentIndex,
  totalProjects
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showFloatingNav, setShowFloatingNav] = useState(false);
  const [swipeTranslateY, setSwipeTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const modalScrollRef = useRef<HTMLDivElement>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartTimeRef = useRef<number>(0);
  const isSwipingEligibleRef = useRef<boolean>(false);
  const swipeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clean up any pending swipe timeouts on unmount
  useEffect(() => {
    return () => {
      if (swipeTimeoutRef.current) {
        clearTimeout(swipeTimeoutRef.current);
      }
    };
  }, []);

  // Reset lightbox, swipe and scroll state when project modal closes or opens or project changes
  useEffect(() => {
    if (swipeTimeoutRef.current) {
      clearTimeout(swipeTimeoutRef.current);
      swipeTimeoutRef.current = null;
    }
    if (!isOpen) {
      setLightboxIndex(null);
      setShowFloatingNav(false);
      setSwipeTranslateY(0);
      setIsDragging(false);
    } else {
      setShowFloatingNav(false);
      setSwipeTranslateY(0);
      setIsDragging(false);
      if (modalScrollRef.current) {
        modalScrollRef.current.scrollTop = 0;
      }
    }
  }, [isOpen, project]);

  // Touch swipe-to-close handlers for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) return;
    const isAtTop = !modalScrollRef.current || modalScrollRef.current.scrollTop <= 2;
    touchStartYRef.current = e.touches[0].clientY;
    touchStartXRef.current = e.touches[0].clientX;
    touchStartTimeRef.current = Date.now();
    isSwipingEligibleRef.current = isAtTop;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isSwipingEligibleRef.current || touchStartYRef.current === null) return;

    const currentY = e.touches[0].clientY;
    const currentX = e.touches[0].clientX;
    const deltaY = currentY - touchStartYRef.current;
    const deltaX = currentX - (touchStartXRef.current || currentX);

    const isAtTop = !modalScrollRef.current || modalScrollRef.current.scrollTop <= 2;

    // Only initiate swipe-down if at top of modal scroll and vertical pull dominates
    if (isAtTop && deltaY > 6 && deltaY > Math.abs(deltaX) * 1.1) {
      // Damped downward displacement
      const dampedOffset = Math.min(deltaY * 0.72, 220);
      setSwipeTranslateY(dampedOffset);
      setIsDragging(true);
    } else if (deltaY < 0 && isDragging) {
      setSwipeTranslateY(0);
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    if (touchStartYRef.current === null) return;

    if (isDragging || swipeTranslateY > 0) {
      const elapsed = Date.now() - touchStartTimeRef.current;
      const isQuickSwipe = swipeTranslateY > 35 && elapsed < 280;
      const isDeepSwipe = swipeTranslateY > 80;

      if (isQuickSwipe || isDeepSwipe) {
        // Animate smooth exit downward then trigger onClose
        setSwipeTranslateY(200);
        swipeTimeoutRef.current = setTimeout(() => {
          onClose();
          setSwipeTranslateY(0);
          setIsDragging(false);
        }, 160);
      } else {
        // Snap back
        setSwipeTranslateY(0);
        setIsDragging(false);
      }
    }

    touchStartYRef.current = null;
    touchStartXRef.current = null;
    isSwipingEligibleRef.current = false;
  };

  // Handle in-modal scroll depth detection
  const handleModalScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    if (scrollTop > 220) {
      if (!showFloatingNav) setShowFloatingNav(true);
    } else {
      if (showFloatingNav) setShowFloatingNav(false);
    }
  };

  const handleScrollToTop = () => {
    modalScrollRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Lock body scroll and listen for Escape and Arrow keys when modal is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      // If lightbox is open, let lightbox handle its own keyboard events
      if (lightboxIndex !== null) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && onPreviousProject) {
        e.preventDefault();
        onPreviousProject();
      } else if (e.key === 'ArrowRight' && onNextProject) {
        e.preventDefault();
        onNextProject();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, lightboxIndex, onPreviousProject, onNextProject]);

  if (!isOpen || !project) return null;

  const displayedTitle = project.titleEn || project.title;
  const displayedMetrics = project.metricsEn || project.metrics;
  const displayedCategoryLabel = project.categoryLabelEn || project.categoryLabel;
  const displayedDescription = project.overviewDescriptionEn || project.overviewDescription || project.descriptionEn || project.description;
  const displayedDeliverables = project.deliverablesEn && project.deliverablesEn.length > 0
    ? project.deliverablesEn
    : project.deliverables;

  const galleryItems = project.gallery && project.gallery.length > 0
    ? project.gallery
    : [
        { id: `${project.id}-preview-1`, isPlaceholder: true, imageUrl: '' },
        { id: `${project.id}-preview-2`, isPlaceholder: true, imageUrl: '' },
        { id: `${project.id}-preview-3`, isPlaceholder: true, imageUrl: '' },
        { id: `${project.id}-preview-4`, isPlaceholder: true, imageUrl: '' }
      ];

  // Aggregate all viewable images (cover + gallery) for full inspection in Lightbox
  const allLightboxImages: Array<{ id?: string; imageUrl: string; title?: string }> = [];

  // Populate lightbox images prioritizing gallery item titles
  galleryItems.forEach((item, idx) => {
    if (item.imageUrl && !allLightboxImages.some(img => img.imageUrl === item.imageUrl)) {
      allLightboxImages.push({
        id: item.id || `${project.id}-gallery-${idx}`,
        imageUrl: item.imageUrl,
        title: item.titleEn || item.title || `Preview ${idx + 1}`
      });
    }
  });

  if (project.imageUrl && !allLightboxImages.some(img => img.imageUrl === project.imageUrl)) {
    allLightboxImages.unshift({
      id: `${project.id}-cover`,
      imageUrl: project.imageUrl,
      title: `${displayedTitle} (Cover & Hero View)`
    });
  }

  const getYouTubeEmbedUrl = (url?: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=[^#&]*v=|(?:watch\?|.*&)?v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
    if (url.includes('youtube.com/embed/')) return url;
    return null;
  };

  const youtubeEmbedUrl = project.youtubeUrl
    ? getYouTubeEmbedUrl(project.youtubeUrl)
    : project.id === 'fasting-motion-video'
    ? 'https://www.youtube.com/embed/N6hkEURMHag'
    : project.id === 'burn-belly-fat-motion-video'
    ? 'https://www.youtube.com/embed/D0qaXne1fKo'
    : project.id === 'nurulummah-graduation-motion'
    ? 'https://www.youtube.com/embed/RTE7AFaD7fE'
    : project.id === 'kalimandau-web-app-promo'
    ? 'https://www.youtube.com/embed/_jW0I10P3ec'
    : (project.id === 'project-grand-pengajian-maulid-nabi-2026' || project.id === 'grand-pengajian-maulid-nabi-2026')
    ? 'https://www.youtube.com/embed/fPfoqvN0Sio'
    : null;

  const renderPreviewCard = (
    item: ProjectGalleryItem,
    i: number,
    aspectRatioClass: string = 'aspect-video',
    imgWidth: number = 1200,
    imgHeight: number = 675
  ) => {
    const hasImage = Boolean(item.imageUrl);
    const itemTitle = item.titleEn || item.title;

    // Normalize ratio string for CSS aspect-ratio property
    const cleanAspectRatio = aspectRatioClass.includes('aspect-video')
      ? '16/9'
      : aspectRatioClass.includes('aspect-square')
      ? '1/1'
      : aspectRatioClass.replace('aspect-[', '').replace(']', '');

    return (
      <div
        key={item.id || i}
        onClick={() => {
          if (hasImage) {
            const targetIdx = allLightboxImages.findIndex(g => g.id === item.id || g.imageUrl === item.imageUrl);
            setLightboxIndex(targetIdx !== -1 ? targetIdx : 0);
          }
        }}
        onKeyDown={(e) => {
          if (hasImage && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            const targetIdx = allLightboxImages.findIndex(g => g.id === item.id || g.imageUrl === item.imageUrl);
            setLightboxIndex(targetIdx !== -1 ? targetIdx : 0);
          }
        }}
        tabIndex={hasImage ? 0 : undefined}
        role={hasImage ? 'button' : undefined}
        aria-label={hasImage ? `Expand image: ${itemTitle || `Preview ${i + 1}`}` : undefined}
        className={`group relative rounded-2xl overflow-hidden dark:border-white/10 border-slate-200 border bg-[#0c0d12] flex flex-col transition-all duration-300 ${aspectRatioClass} ${
          hasImage 
            ? 'cursor-pointer hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] focus:outline-none focus:ring-2 focus:ring-cyan-400' 
            : 'hover:border-slate-300 dark:hover:border-white/20'
        }`}
      >
        <div className={`relative ${aspectRatioClass} w-full overflow-hidden bg-[#0c0d12] flex items-center justify-center`}>
          {item.imageUrl ? (
            <div className={`relative w-full h-full ${aspectRatioClass} overflow-hidden flex items-center justify-center`}>
              <LazyImage
                src={item.imageUrl}
                alt={`${displayedTitle} - ${itemTitle || `Preview ${i + 1}`} - ${project.categoryLabelEn || project.categoryLabel} oleh Ardi Ulinnuha`}
                width={imgWidth}
                height={imgHeight}
                loading="lazy"
                aspectRatio={cleanAspectRatio}
                rootMargin="150px 0px"
                containerClassName={`w-full h-full ${aspectRatioClass} flex items-center justify-center`}
                className={`w-full h-full ${aspectRatioClass} object-cover object-center group-hover:scale-105 transition-transform duration-500`}
              />
              {/* Subtle hover brightness transition without heavy dark gradient */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 pointer-events-none" />
              
              {/* Quick expand button badge */}
              <div className="absolute top-2.5 right-2.5 p-2 rounded-full bg-black/60 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 border border-white/20 shadow-lg pointer-events-none">
                <Maximize2 className="w-3.5 h-3.5 text-cyan-300" />
              </div>
            </div>
          ) : (
            <>
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradientBg} opacity-60 flex items-center justify-center`} />
              <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
              <div className="absolute inset-0 flex items-center justify-center p-4 z-10 pointer-events-none">
                <div className="flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-[11px] font-mono text-gray-200 shadow-xl group-hover:border-cyan-400/50 group-hover:scale-105 transition-all duration-300 text-center">
                  <ImageIcon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="font-semibold tracking-wide">Preview Placeholder</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Caption bar cleanly positioned outside photo area below the image */}
        {itemTitle && (
          <div className="px-3.5 py-2.5 border-t dark:border-white/5 border-slate-100 dark:bg-[#090a0f] bg-slate-900/50 flex items-center justify-between gap-2 shrink-0">
            <p className="text-[11px] sm:text-xs font-mono text-gray-400 group-hover:text-cyan-300 transition-colors line-clamp-1 leading-snug">
              {itemTitle}
            </p>
            <span className="text-[10px] font-mono text-gray-500 uppercase shrink-0 font-medium">
              #{i + 1}
            </span>
          </div>
        )}
      </div>
    );
  };

  const modalContent = (
    <div 
      id="project-detail-modal-backdrop"
      className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-6 md:p-8 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      {/* Modal Container with Persistent Side Navigation for Desktop */}
      <div className="relative max-w-3xl w-full my-auto flex items-center justify-center h-[100dvh] sm:h-auto sm:max-h-[90vh]">
        {/* Left Side Navigation Button (Prev) - Hidden on mobile (<768px), shown on desktop (md:) */}
        {onPreviousProject && (
          <button
            id="modal-side-prev-btn"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPreviousProject();
            }}
            className="hidden md:flex absolute -left-14 lg:-left-16 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/25 hover:border-cyan-400 text-white items-center justify-center shadow-2xl transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer group"
            aria-label="Previous project"
            title={previousProject ? `Previous: ${previousProject.titleEn || previousProject.title} (←)` : 'Previous project (←)'}
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:text-cyan-300 transition-colors" />
          </button>
        )}

        {/* Modal Card - Full-screen on mobile (100dvh, rounded-t-3xl, safe-area aware) */}
        <div 
          ref={modalScrollRef}
          onScroll={handleModalScroll}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          id="project-detail-modal-card"
          style={{
            transform: swipeTranslateY > 0 ? `translate3d(0, ${swipeTranslateY}px, 0)` : undefined,
            opacity: swipeTranslateY > 0 ? Math.max(0.35, 1 - swipeTranslateY / 280) : 1,
            transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease'
          }}
          className="bg-[#0f0f0f] border-0 sm:border sm:border-white/10 rounded-t-3xl rounded-b-none sm:rounded-3xl w-full h-[100dvh] sm:h-auto sm:max-h-[90vh] overflow-y-auto shadow-2xl relative text-gray-200 flex flex-col scroll-smooth will-change-transform touch-pan-y pt-[env(safe-area-inset-top,0px)] pb-0 sm:pt-0 sm:pb-0"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Swipe-to-Close Handle Indicator */}
          <div className="sm:hidden absolute top-2.5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none">
            <div 
              className={`w-10 h-1 rounded-full transition-all duration-200 ${
                isDragging ? 'bg-cyan-400 w-12 shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'bg-white/40'
              }`} 
            />
          </div>

          {/* Modal Header Banner */}
          <div className="relative h-48 sm:h-64 bg-[#0c0d12] p-4 sm:p-6 flex flex-col justify-between overflow-hidden shrink-0">
            {/* Background Image / Placeholder */}
            {project.imageUrl ? (
              <div className="absolute inset-0 overflow-hidden flex items-center justify-center bg-[#0c0d12] aspect-video">
                <LazyImage
                  src={project.imageUrl}
                  alt={`${displayedTitle} - Detail Proyek ${project.categoryLabelEn || project.categoryLabel} oleh Ardi Ulinnuha`}
                  width={960}
                  height={540}
                  loading="lazy"
                  aspectRatio="16/9"
                  containerClassName="w-full h-full aspect-video flex items-center justify-center"
                  className={`w-full h-full aspect-video ${
                    project.imageFit === 'contain'
                      ? 'object-contain object-center p-3 sm:p-5 opacity-100'
                      : 'object-cover object-center opacity-85'
                  } transition-all duration-300`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-black/40 to-black/60 pointer-events-none" />
              </div>
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradientBg} opacity-80 flex items-center justify-center`}>
                <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
              </div>
            )}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Top Row: Left Counter (1 / 17) */}
            {totalProjects && totalProjects > 1 && (
              <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-20 flex items-center bg-black/80 backdrop-blur-md px-3.5 py-2 sm:px-3 sm:py-1.5 rounded-full border border-white/20 text-white shadow-xl pointer-events-none min-h-[44px] sm:min-h-0">
                <span className="text-xs sm:text-[11px] font-mono text-gray-200 select-none font-medium">
                  {currentIndex !== undefined ? currentIndex + 1 : 1}
                  <span className="text-gray-500 mx-1.5">/</span>
                  {totalProjects}
                </span>
              </div>
            )}

            {/* Top Row: Right Action Buttons (Share, Fullscreen, Close - min 44x44px touch targets) */}
            <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20 flex items-center gap-2">
              <ShareButton
                id="share-project-header-btn"
                projectId={project.id}
                projectCode={project.code}
                projectTitle={displayedTitle}
                variant="header"
              />
              {project.imageUrl && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const targetIdx = allLightboxImages.findIndex(img => img.imageUrl === project.imageUrl);
                    setLightboxIndex(targetIdx !== -1 ? targetIdx : 0);
                  }}
                  className="p-2.5 min-h-[44px] min-w-[44px] rounded-full bg-black/80 hover:bg-cyan-500 hover:text-black text-white border border-white/20 transition-all hover:scale-105 active:scale-95 flex items-center justify-center keep-white cursor-pointer"
                  aria-label="Inspect project cover in lightbox"
                  title="Inspect Cover Fullscreen"
                >
                  <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 keep-white" />
                </button>
              )}
              <button
                id="close-project-modal-btn"
                onClick={onClose}
                className="p-2.5 min-h-[44px] min-w-[44px] rounded-full bg-black/80 hover:bg-black text-white border border-white/20 transition-all hover:scale-105 active:scale-95 flex items-center justify-center keep-white cursor-pointer"
                aria-label="Close project modal"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 keep-white" />
              </button>
            </div>

            {/* Desktop-only Category Pill & Metrics (preserved inside banner on md:) */}
            <div className="hidden md:flex relative z-10 items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md border border-white/20 text-white font-mono keep-white">
                {project.tagBadge || displayedCategoryLabel}
              </span>
              {project.badge && (
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 backdrop-blur-md font-mono keep-white">
                  {project.badge}
                </span>
              )}
              {displayedMetrics && !project.badge && (
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 backdrop-blur-md font-mono keep-white">
                  {displayedMetrics}
                </span>
              )}
            </div>

            {/* Title on Banner: Responsive font size, non-truncated wrapped client/year */}
            <div className="relative z-10 mt-auto">
              <h3 id="project-modal-title" className="font-display font-black text-2xl sm:text-2xl md:text-3xl text-white tracking-tight leading-tight uppercase keep-white break-words">
                {displayedTitle}
              </h3>
              <p className="text-xs sm:text-sm text-gray-200 font-mono mt-1 keep-white break-words whitespace-normal leading-relaxed">
                {project.clientOrContext} • {project.year}
              </p>
            </div>
          </div>

          {/* Mobile-only Chips row below banner: Category badge and Key impact badge (flex-wrap gap-2) */}
          <div className="md:hidden px-4 pt-3 pb-1 flex flex-wrap items-center gap-2 bg-[#0f0f0f]">
            <span className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md border border-white/20 text-white font-mono keep-white">
              {project.tagBadge || displayedCategoryLabel}
            </span>
            {project.badge && (
              <span className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 backdrop-blur-md font-mono keep-white">
                {project.badge}
              </span>
            )}
            {displayedMetrics && !project.badge && (
              <span className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 backdrop-blur-md font-mono keep-white">
                {displayedMetrics}
              </span>
            )}
          </div>

          {/* Modal Content Body - pb-24 on mobile and pb-16 on desktop ensures floating pill never occludes bottom content */}
          <div className="p-4 sm:p-8 space-y-6 pb-24 md:pb-16">
            {/* Detailed Project Metadata Grid: 2-column on mobile, 4-column on desktop */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 items-stretch">
              {/* Client / Context */}
              <div className="flex flex-col justify-start p-3 sm:p-4 rounded-xl sm:rounded-2xl dark:bg-white/[0.04] bg-slate-50 dark:border-white/10 border-slate-200 border text-xs font-mono transition-colors dark:hover:bg-white/[0.07] hover:bg-slate-100/80 h-full">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 shrink-0">
                  <div className="p-1 rounded-md dark:bg-white/5 bg-white dark:border-white/10 border-slate-200 border text-slate-700 dark:text-gray-300 shadow-sm shrink-0">
                    <Briefcase className="w-3.5 h-3.5 text-slate-600 dark:text-gray-300 shrink-0" />
                  </div>
                  <span className="text-[11px] sm:text-[10px] text-slate-500 dark:text-gray-400 uppercase tracking-wider font-semibold truncate">Client / Context</span>
                </div>
                <p className="text-slate-900 dark:text-gray-100 font-bold text-[13px] sm:text-xs leading-snug break-words whitespace-normal mt-0.5">
                  {project.clientOrContext}
                </p>
              </div>

              {/* Timeline / Year */}
              <div className="flex flex-col justify-start p-3 sm:p-4 rounded-xl sm:rounded-2xl dark:bg-white/[0.04] bg-slate-50 dark:border-white/10 border-slate-200 border text-xs font-mono transition-colors dark:hover:bg-white/[0.07] hover:bg-slate-100/80 h-full">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 shrink-0">
                  <div className="p-1 rounded-md dark:bg-white/5 bg-white dark:border-white/10 border-slate-200 border text-slate-700 dark:text-gray-300 shadow-sm shrink-0">
                    <Calendar className="w-3.5 h-3.5 text-slate-600 dark:text-gray-300 shrink-0" />
                  </div>
                  <span className="text-[11px] sm:text-[10px] text-slate-500 dark:text-gray-400 uppercase tracking-wider font-semibold truncate">Timeline / Year</span>
                </div>
                <p className="text-slate-900 dark:text-gray-100 font-bold text-[13px] sm:text-xs leading-snug break-words whitespace-normal mt-0.5">
                  {project.year}
                </p>
              </div>

              {/* Category */}
              <div className="flex flex-col justify-start p-3 sm:p-4 rounded-xl sm:rounded-2xl dark:bg-white/[0.04] bg-slate-50 dark:border-white/10 border-slate-200 border text-xs font-mono transition-colors dark:hover:bg-white/[0.07] hover:bg-slate-100/80 h-full">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 shrink-0">
                  <div className="p-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 shadow-sm shrink-0">
                    <Tag className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  </div>
                  <span className="text-[11px] sm:text-[10px] text-slate-500 dark:text-gray-400 uppercase tracking-wider font-semibold truncate">Category</span>
                </div>
                <p className="text-cyan-700 dark:text-cyan-300 font-bold text-[13px] sm:text-xs leading-snug break-words whitespace-normal mt-0.5">
                  {displayedCategoryLabel}
                </p>
              </div>

              {/* Key Impact */}
              <div className="flex flex-col justify-start p-3 sm:p-4 rounded-xl sm:rounded-2xl dark:bg-white/[0.04] bg-slate-50 dark:border-white/10 border-slate-200 border text-xs font-mono transition-colors dark:hover:bg-white/[0.07] hover:bg-slate-100/80 h-full">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 shrink-0">
                  <div className="p-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 shadow-sm shrink-0">
                    <TrendingUp className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
                  </div>
                  <span className="text-[11px] sm:text-[10px] text-slate-500 dark:text-gray-400 uppercase tracking-wider font-semibold truncate">Key Impact</span>
                </div>
                <p className="text-purple-700 dark:text-purple-300 font-bold text-[13px] sm:text-xs leading-snug break-words whitespace-normal mt-0.5">
                  {displayedMetrics || 'Verified Output'}
                </p>
              </div>
            </div>

          {/* Main Description */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400 font-bold mb-2">
              PROJECT OVERVIEW & PROCESS
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-gray-300 leading-relaxed font-normal">
              {displayedDescription}
            </p>
          </div>

          {/* Interactive Project Execution Roadmap Visualizer */}
          <div className="pt-2 border-t dark:border-white/10 border-slate-200">
            <RoadmapVisualizer project={project} />
          </div>

          {/* Deliverables Grid */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400 font-bold mb-3">
              KEY DELIVERABLES & OUTCOMES
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {displayedDeliverables.map((del, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-2xl dark:bg-black/40 bg-slate-50 dark:border-white/5 border-slate-200 border text-xs text-slate-800 dark:text-gray-300 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <span className="font-medium">{del}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Tech Stack */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <h4 className="text-xs uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400 font-bold">
                SOFTWARE & TECHNOLOGIES USED
              </h4>
              <span className="text-[10px] font-mono text-slate-500 dark:text-gray-400 flex items-center gap-1.5 bg-purple-500/5 dark:bg-purple-950/30 px-2.5 py-1 rounded-md border border-purple-500/20">
                <Sparkles className="w-3 h-3 text-purple-500 dark:text-cyan-400" />
                AI-Assisted Workflow Integrated
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool, i) => {
                const isAi = isAiTool(tool);
                return (
                  <span
                    key={i}
                    className={getToolBadgeClass(tool)}
                  >
                    {isAi && <Sparkles className="w-3 h-3 text-purple-600 dark:text-cyan-400 shrink-0" />}
                    <span>{tool}</span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Project Tags */}
          {project.tags && project.tags.length > 0 && (
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 font-bold mb-3 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                PROJECT TAGS
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full dark:bg-emerald-950/40 bg-emerald-50 dark:border-emerald-500/30 border-emerald-200 border text-emerald-700 dark:text-emerald-300 text-xs font-mono font-semibold"
                  >
                    {tag.startsWith('#') ? tag : `#${tag}`}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Project Preview Gallery */}
          {project && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400 font-bold">
                    PROJECT PREVIEWS & SPREADS
                  </h4>
                  {project.previewGridType !== 'portrait-video-showcase' && (
                    <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono dark:bg-white/5 bg-slate-100 text-slate-600 dark:text-gray-400 dark:border-white/10 border-slate-200 border">
                      Click to enlarge
                    </span>
                  )}
                </div>
                {project.previewGridType !== 'portrait-video-showcase' && (
                  <span className="text-[10px] font-mono text-slate-500 dark:text-gray-500 uppercase">
                    {project.previewGridType === 'single' || galleryItems.length === 1
                      ? '1920x1080 Preview'
                      : project.previewGridType === 'single-column-stack' || project.id === 'pt-royal-innovation-interior'
                      ? `${galleryItems.length}-Spread Full-Width Showcase (${galleryItems.length} Rows)`
                      : project.previewGridType === '3-grid'
                      ? '3-Grid Showcase'
                      : project.previewGridType === 'social-grid' || galleryItems.length === 6
                      ? '6-Grid Visual Spread'
                      : project.previewGridType === 'packaging-duo'
                      ? '3-Asset Packaging Spread'
                      : project.previewGridType === 'featured-duo'
                      ? '3-Asset Creative Spread'
                      : project.previewGridType === 'coffee-grid' || galleryItems.length === 8
                      ? '8-Asset Promo Suite (5 Rows)'
                      : galleryItems.length === 2
                      ? '2-Asset Showcase Spread'
                      : '2x2 Grid Showcase'}
                  </span>
                )}
              </div>

              {project.previewGridType === 'portrait-video-showcase' ? (
                <div className="space-y-6 sm:space-y-8">
                  {/* 1. SATU gambar showcase full-width menggunakan file muslimcap-01.webp */}
                  <div className="w-full">
                    {galleryItems[0] && renderPreviewCard(galleryItems[0], 0, 'aspect-video', 1920, 1080)}
                  </div>

                  {/* 2. Di bawah gambar tersebut, embed video YouTube portrait (vertikal) */}
                  <div className="pt-2">
                    <div className="w-full max-w-[380px] mx-auto aspect-[9/16] rounded-xl sm:rounded-2xl overflow-hidden dark:border-white/10 border-slate-200 border bg-black shadow-2xl">
                      <iframe
                        className="w-full h-full border-0"
                        src="https://www.youtube.com/embed/oI-P1kRf9c0"
                        title="Muslim Chaplaincy: Solusi Krisis Kesehatan Mental & Spiritual Indonesia"
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              ) : project.previewGridType === 'single' || galleryItems.length === 1 ? (
                <div className="w-full">
                  {galleryItems[0] && renderPreviewCard(galleryItems[0], 0, 'aspect-video', 1920, 1080)}
                </div>
              ) : project.previewGridType === 'coffee-grid' ? (
                <div className="space-y-3 sm:space-y-4">
                  {/* Baris 1: 1 foto (Coffe-01.webp) */}
                  {galleryItems[0] && (
                    <div className="w-full">
                      {renderPreviewCard(galleryItems[0], 0, 'aspect-video', 1920, 1080)}
                    </div>
                  )}

                  {/* Baris 2: 1 foto (Coffe-02.webp) */}
                  {galleryItems[1] && (
                    <div className="w-full">
                      {renderPreviewCard(galleryItems[1], 1, 'aspect-video', 1920, 1080)}
                    </div>
                  )}

                  {/* Baris 3: 2 foto (Coffe-03.webp, Coffe-04.webp) - 1 col on mobile, 2 col on md */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    {galleryItems[2] && renderPreviewCard(galleryItems[2], 2, 'aspect-square', 1080, 1080)}
                    {galleryItems[3] && renderPreviewCard(galleryItems[3], 3, 'aspect-square', 1080, 1080)}
                  </div>

                  {/* Baris 4: 2 foto (Coffe-05.webp, Coffe-06.webp) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    {galleryItems[4] && renderPreviewCard(galleryItems[4], 4, 'aspect-square', 1080, 1080)}
                    {galleryItems[5] && renderPreviewCard(galleryItems[5], 5, 'aspect-square', 1080, 1080)}
                  </div>

                  {/* Baris 5: 2 foto (Coffe-07.webp, Coffe-08.webp) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    {galleryItems[6] && renderPreviewCard(galleryItems[6], 6, 'aspect-square', 1080, 1080)}
                    {galleryItems[7] && renderPreviewCard(galleryItems[7], 7, 'aspect-square', 1080, 1080)}
                  </div>
                </div>
              ) : project.previewGridType === 'packaging-duo' ? (
                <div className="space-y-3 sm:space-y-4">
                  {/* Row 1: Hero landscape 16:9 presentation spread */}
                  {galleryItems[0] && (
                    <div className="w-full">
                      {renderPreviewCard(galleryItems[0], 0, 'aspect-video', 1920, 1080)}
                    </div>
                  )}

                  {/* Row 2: 2 landscape 16:9 images side-by-side (Dieline and Formula Specs) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    {galleryItems[1] && renderPreviewCard(galleryItems[1], 1, 'aspect-video', 1920, 1080)}
                    {galleryItems[2] && renderPreviewCard(galleryItems[2], 2, 'aspect-video', 1920, 1080)}
                  </div>
                </div>
              ) : project.previewGridType === 'featured-duo' ? (
                <div className="space-y-3 sm:space-y-4">
                  {/* Row 1: 1 gambar besar landscape kolase preview utama (16:9) */}
                  {galleryItems[0] && (
                    <div className="w-full">
                      {renderPreviewCard(galleryItems[0], 0, 'aspect-video', 1920, 1080)}
                    </div>
                  )}

                  {/* Row 2: 2 gambar format square berdampingan (2 kolom) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    {galleryItems[1] && renderPreviewCard(galleryItems[1], 1, 'aspect-square', 1080, 1080)}
                    {galleryItems[2] && renderPreviewCard(galleryItems[2], 2, 'aspect-square', 1080, 1080)}
                  </div>
                </div>
              ) : project.previewGridType === '3-grid' ? (
                <div className="space-y-3 sm:space-y-4">
                  {/* Row atas: 2 gambar berdampingan, masing-masing dengan aspect ratio 16:9 (1920x1080), object-cover */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    {galleryItems[0] && renderPreviewCard(galleryItems[0], 0, 'aspect-video', 1920, 1080)}
                    {galleryItems[1] && renderPreviewCard(galleryItems[1], 1, 'aspect-video', 1920, 1080)}
                  </div>

                  {/* Row bawah: 1 gambar full-width dengan aspect ratio ~4:5 (1920x2408), object-cover */}
                  {galleryItems[2] && (
                    <div className="w-full">
                      {renderPreviewCard(galleryItems[2], 2, 'aspect-[1920/2408]', 1920, 2408)}
                    </div>
                  )}
                </div>
              ) : project.previewGridType === 'social-grid' ? (
                <div className="space-y-3 sm:space-y-4">
                  {/* Preview Utama (paling atas): Master 16:9 Feed Architecture & Campaign Spread (grid-6.webp) */}
                  {galleryItems[0] && (
                    <div className="w-full">
                      {renderPreviewCard(galleryItems[0], 0, 'aspect-video', 1920, 1080)}
                    </div>
                  )}

                  {/* Baris 1: 1 foto besar full-width (grid-3.webp — "Traveling With Us is more easy than ever!") */}
                  {galleryItems[1] && (
                    <div className="w-full">
                      {renderPreviewCard(galleryItems[1], 1, 'aspect-video', 1920, 1080)}
                    </div>
                  )}

                  {/* Baris 2: 2 foto berdampingan (2 kolom) — grid-1.webp dan grid-2.webp */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    {galleryItems[2] && renderPreviewCard(galleryItems[2], 2, 'aspect-square', 1080, 1080)}
                    {galleryItems[3] && renderPreviewCard(galleryItems[3], 3, 'aspect-square', 1080, 1080)}
                  </div>

                  {/* Baris 3: 2 foto berdampingan (2 kolom) — grid-4.webp dan grid-5.webp */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    {galleryItems[4] && renderPreviewCard(galleryItems[4], 4, 'aspect-square', 1080, 1080)}
                    {galleryItems[5] && renderPreviewCard(galleryItems[5], 5, 'aspect-square', 1080, 1080)}
                  </div>
                </div>
              ) : project.previewGridType === 'single-column-stack' || project.id === 'pt-royal-innovation-interior' ? (
                /* Single-column full-width vertical stack layout (1 per row) */
                <div className="space-y-3 sm:space-y-6">
                  {galleryItems.map((item, i) => {
                    const isExtendedRatio = project.id === 'pt-royal-innovation-interior' && i >= 4;
                    const aspectClass = isExtendedRatio ? 'aspect-[1920/1331]' : 'aspect-video';
                    const targetHeight = isExtendedRatio ? 1331 : 1080;
                    return (
                      <div key={item.id || i} className="w-full">
                        {renderPreviewCard(item, i, aspectClass, 1920, targetHeight)}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {galleryItems.map((item, i) => renderPreviewCard(item, i, 'aspect-video', 1200, 675))}
                </div>
              )}
            </div>
          )}

          {/* YouTube Video Player Embed Section */}
          {youtubeEmbedUrl && project.previewGridType !== 'portrait-video-showcase' && (
            <div className="mt-6 mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs uppercase tracking-[0.2em] text-red-600 dark:text-red-400 font-bold flex items-center gap-1.5">
                    <YouTubeIcon className="w-3.5 h-3.5 text-red-500" />
                    <span>Watch Full Video</span>
                  </h4>
                </div>
                <span className="text-[10px] font-mono text-slate-500 dark:text-gray-500 uppercase">
                  YouTube Player
                </span>
              </div>

              {/* Responsive 16:9 Container with 100% width */}
              <div className="w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden dark:border-white/10 border-slate-200 border bg-black shadow-xl">
                <iframe
                  className="w-full h-full border-0"
                  src={youtubeEmbedUrl}
                  title="YouTube video player"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Project Collection Navigation (Previous / Next Project Footer Section) */}
          {(onPreviousProject || onNextProject) && (
            <div className="pt-6 border-t dark:border-white/10 border-slate-200">
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400 font-bold">
                    EXPLORE MORE WORKS
                  </span>
                </div>
                {totalProjects && totalProjects > 1 && (
                  <span className="text-[11px] font-mono text-slate-500 dark:text-gray-400">
                    Project {currentIndex !== undefined ? currentIndex + 1 : 1} of {totalProjects}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Previous Project Card Button */}
                {previousProject && onPreviousProject ? (
                  <button
                    id="modal-footer-prev-btn"
                    type="button"
                    onClick={onPreviousProject}
                    className="group flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-500/40 text-left transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-cyan-500 group-hover:text-black flex items-center justify-center shrink-0 border border-white/10 transition-colors">
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                        Previous Project
                      </span>
                      <h5 className="text-xs sm:text-sm font-semibold text-white group-hover:text-cyan-200 truncate transition-colors">
                        {previousProject.titleEn || previousProject.title}
                      </h5>
                      <span className="text-[10px] text-gray-400 font-mono block truncate">
                        {previousProject.categoryLabelEn || previousProject.categoryLabel}
                      </span>
                    </div>
                  </button>
                ) : (
                  <div className="hidden sm:block" />
                )}

                {/* Next Project Card Button */}
                {nextProject && onNextProject ? (
                  <button
                    id="modal-footer-next-btn"
                    type="button"
                    onClick={onNextProject}
                    className="group flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-500/40 text-right transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                        Next Project
                      </span>
                      <h5 className="text-xs sm:text-sm font-semibold text-white group-hover:text-cyan-200 truncate transition-colors">
                        {nextProject.titleEn || nextProject.title}
                      </h5>
                      <span className="text-[10px] text-gray-400 font-mono block truncate">
                        {nextProject.categoryLabelEn || nextProject.categoryLabel}
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-cyan-500 group-hover:text-black flex items-center justify-center shrink-0 border border-white/10 transition-colors">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                ) : (
                  <div className="hidden sm:block" />
                )}
              </div>
            </div>
          )}

          {/* Action Links */}
          {(project.websiteUrl || project.behanceUrl || project.youtubeUrl) ? (
            <div className="pt-4 border-t dark:border-white/10 border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs text-slate-500 dark:text-gray-400 font-mono">
                Interested in similar creative deliverables?
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                {project.websiteUrl && (
                  <a
                    href={project.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] w-full sm:w-auto rounded-full bg-cyan-500 text-black hover:bg-cyan-400 font-black text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95"
                  >
                    <Globe className="w-3.5 h-3.5 shrink-0" />
                    <span>Visit Website</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                )}

                {!project.websiteUrl && !project.youtubeUrl && project.behanceUrl && (
                  <a
                    href={project.behanceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] w-full sm:w-auto rounded-full bg-slate-900 text-white hover:bg-cyan-500 dark:bg-white dark:text-black dark:hover:bg-cyan-400 font-black text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
                  >
                    <span>Open on Behance</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                )}

                {!project.websiteUrl && project.youtubeUrl && (
                  <a
                    href={project.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] w-full sm:w-auto rounded-full font-black text-xs uppercase tracking-wider shadow-md transition-all bg-[#111111] hover:bg-[#222222] text-white border border-neutral-800 dark:border-white/10 cursor-pointer"
                  >
                    <YouTubeIcon className="w-4 h-4 text-white shrink-0" variant="white" />
                    <span>Watch on YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5 text-white shrink-0" />
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="pt-4 border-t dark:border-white/10 border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs text-slate-500 dark:text-gray-400 font-mono">
                Interested in similar creative deliverables for your brand?
              </div>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  const el = document.getElementById('contact');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] w-full sm:w-auto rounded-full bg-cyan-500 text-black hover:bg-cyan-400 font-black text-xs uppercase tracking-wider shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Discuss Project</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </a>
            </div>
          )}

          {/* Media Protection Disclaimer Notice */}
          <div className="pt-3 pb-1 border-t dark:border-white/5 border-slate-100 flex items-start sm:items-center gap-2 text-[11px] font-mono text-slate-500 dark:text-gray-500 leading-relaxed select-none">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-500/70 shrink-0 mt-0.5 sm:mt-0" />
            <span>
              <strong className="text-slate-600 dark:text-gray-400 font-medium">Protected Media:</strong> {PROTECTED_MEDIA_DISCLAIMER}
            </span>
          </div>

          {/* Floating Navigation Controls inside Modal (Top, Share & Close) - Independent Centered Sticky Pill */}
          <div
            className={`sticky bottom-[max(1rem,env(safe-area-inset-bottom))] md:bottom-4 z-40 flex items-center justify-center pointer-events-none mt-2 transition-all duration-300 ${
              showFloatingNav ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
            }`}
          >
            <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-black/90 backdrop-blur-xl border border-white/20 shadow-[0_10px_35px_rgba(0,0,0,0.85)] pointer-events-auto">
              <button
                type="button"
                onClick={handleScrollToTop}
                className="flex items-center gap-1.5 min-h-[44px] px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-cyan-400 hover:text-black text-white text-xs font-mono font-semibold transition-all group active:scale-95 shadow-sm cursor-pointer"
                aria-label="Scroll to top of project details"
                title="Back to Top"
              >
                <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
                <span>Top</span>
              </button>
              <div className="w-[1px] h-4 bg-white/20" />
              <ShareButton
                id="share-project-floating-btn"
                projectId={project.id}
                projectCode={project.code}
                projectTitle={displayedTitle}
                variant="pill"
                className="min-h-[44px]"
              />
              <div className="w-[1px] h-4 bg-white/20" />
              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-1.5 min-h-[44px] px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-rose-500 hover:text-white text-gray-300 hover:border-rose-400 text-xs font-mono font-semibold transition-all active:scale-95 shadow-sm cursor-pointer"
                aria-label="Close project modal"
                title="Close Modal (Esc)"
              >
                <X className="w-3.5 h-3.5" />
                <span>Close</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Right Side Navigation Button (Next) - Vertically Centered & Fixed to Modal, Hidden on mobile (<768px), shown on desktop (md:) */}
      {onNextProject && (
        <button
          id="modal-side-next-btn"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNextProject();
          }}
          className="hidden md:flex absolute -right-14 lg:-right-16 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/25 hover:border-cyan-400 text-white items-center justify-center shadow-2xl transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer group"
          aria-label="Next project"
          title={nextProject ? `Next: ${nextProject.titleEn || nextProject.title} (→)` : 'Next project (→)'}
        >
          <ChevronRight className="w-6 h-6 text-white group-hover:text-cyan-300 transition-colors" />
        </button>
      )}
    </div>

      {/* Lightbox Modal for Full-Screen Image Inspection - Loaded on-demand */}
      {lightboxIndex !== null && (
        <Suspense fallback={null}>
          <ImageLightbox
            images={allLightboxImages}
            currentIndex={lightboxIndex ?? 0}
            isOpen={lightboxIndex !== null}
            onClose={() => setLightboxIndex(null)}
            onNavigate={(newIdx) => setLightboxIndex(newIdx)}
            projectTitle={displayedTitle}
            projectId={project.id}
          />
        </Suspense>
      )}
    </div>
  );

  return createPortal(modalContent, document.body);
};

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize, 
  Minimize 
} from 'lucide-react';
import { ShareButton } from './ShareButton';

export interface LightboxImageItem {
  id?: string;
  imageUrl: string;
  title?: string;
  isPlaceholder?: boolean;
}

interface ImageLightboxProps {
  images: LightboxImageItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
  projectTitle?: string;
  projectId?: string;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  projectTitle,
  projectId
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panPosition, setPanPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const lastTouchDistanceRef = useRef<number | null>(null);

  const validImages = images.filter((img) => Boolean(img.imageUrl));
  const activeImage = validImages[currentIndex] || validImages[0];
  const total = validImages.length;

  // Reset zoom & pan when image changes or modal closes
  const resetZoom = useCallback(() => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    setIsPanning(false);
  }, []);

  useEffect(() => {
    resetZoom();
    setIsLoaded(false);
  }, [currentIndex, isOpen, resetZoom]);

  const handleZoomIn = useCallback(() => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3.5));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) {
        setPanPosition({ x: 0, y: 0 });
      }
      return next;
    });
  }, []);

  const toggleZoom = useCallback((clientX?: number, clientY?: number) => {
    if (zoomLevel > 1) {
      resetZoom();
    } else {
      setZoomLevel(2);
      if (clientX && clientY && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const offsetX = (rect.width / 2 - (clientX - rect.left)) * 0.8;
        const offsetY = (rect.height / 2 - (clientY - rect.top)) * 0.8;
        setPanPosition({ x: offsetX, y: offsetY });
      }
    }
  }, [zoomLevel, resetZoom]);

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (total <= 1) return;
      const nextIdx = (currentIndex - 1 + total) % total;
      onNavigate(nextIdx);
    },
    [currentIndex, total, onNavigate]
  );

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (total <= 1) return;
      const nextIdx = (currentIndex + 1) % total;
      onNavigate(nextIdx);
    },
    [currentIndex, total, onNavigate]
  );

  // Fullscreen toggle handler
  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await containerRef.current?.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard navigation & zoom shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        if (zoomLevel > 1) {
          resetZoom();
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowLeft') {
        e.stopPropagation();
        if (zoomLevel === 1) handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.stopPropagation();
        if (zoomLevel === 1) handleNext();
      } else if (e.key === '+' || e.key === '=') {
        e.stopPropagation();
        e.preventDefault();
        handleZoomIn();
      } else if (e.key === '-' || e.key === '_') {
        e.stopPropagation();
        e.preventDefault();
        handleZoomOut();
      } else if (e.key === '0') {
        e.stopPropagation();
        resetZoom();
      } else if (e.key === 'f' || e.key === 'F') {
        e.stopPropagation();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [isOpen, onClose, handlePrev, handleNext, handleZoomIn, handleZoomOut, resetZoom, toggleFullscreen, zoomLevel]);

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  // Pan handlers for Mouse
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    e.preventDefault();
    setIsPanning(true);
    panStartRef.current = {
      x: e.clientX - panPosition.x,
      y: e.clientY - panPosition.y
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning || zoomLevel <= 1) return;
    e.preventDefault();
    const maxOffset = (zoomLevel - 1) * 350;
    const newX = e.clientX - panStartRef.current.x;
    const newY = e.clientY - panStartRef.current.y;
    setPanPosition({
      x: Math.max(-maxOffset, Math.min(maxOffset, newX)),
      y: Math.max(-maxOffset, Math.min(maxOffset, newY))
    });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  // Touch gesture handlers for mobile (swipe & pinch)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
      if (zoomLevel > 1) {
        setIsPanning(true);
        panStartRef.current = {
          x: e.touches[0].clientX - panPosition.x,
          y: e.touches[0].clientY - panPosition.y
        };
      }
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      lastTouchDistanceRef.current = dist;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isPanning && zoomLevel > 1) {
      const maxOffset = (zoomLevel - 1) * 350;
      const newX = e.touches[0].clientX - panStartRef.current.x;
      const newY = e.touches[0].clientY - panStartRef.current.y;
      setPanPosition({
        x: Math.max(-maxOffset, Math.min(maxOffset, newX)),
        y: Math.max(-maxOffset, Math.min(maxOffset, newY))
      });
    } else if (e.touches.length === 2 && lastTouchDistanceRef.current !== null) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = dist / lastTouchDistanceRef.current;
      if (factor > 1.05) {
        handleZoomIn();
        lastTouchDistanceRef.current = dist;
      } else if (factor < 0.95) {
        handleZoomOut();
        lastTouchDistanceRef.current = dist;
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPanning(false);
    lastTouchDistanceRef.current = null;

    if (zoomLevel === 1 && touchStartXRef.current !== null && e.changedTouches.length > 0) {
      const diffX = touchStartXRef.current - e.changedTouches[0].clientX;
      const diffY = (touchStartYRef.current || 0) - e.changedTouches[0].clientY;
      touchStartXRef.current = null;
      touchStartYRef.current = null;

      if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY) * 1.2) {
        if (diffX > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    }
  };

  if (!isOpen || !activeImage || total === 0) return null;

  const content = (
    <div
      ref={containerRef}
      id="lightbox-backdrop"
      className="fixed inset-0 z-[150] flex flex-col items-center justify-between bg-black/95 backdrop-blur-2xl p-2 sm:p-5 select-none animate-in fade-in duration-200 overscroll-none h-[100dvh] pt-[env(safe-area-inset-top,8px)] pb-[env(safe-area-inset-bottom,8px)]"
      onClick={onClose}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label="Image Fullscreen Lightbox Preview"
    >
      {/* Top Header Bar with Controls */}
      <div 
        className="w-full max-w-7xl flex items-center justify-between z-30 pt-1 pb-2 px-2 sm:px-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Counter & Title */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white font-mono text-xs font-semibold tracking-wider shrink-0 shadow-sm min-h-[36px] flex items-center">
            {currentIndex + 1} / {total}
          </span>
          {projectTitle && (
            <span className="text-xs sm:text-sm font-semibold text-gray-200 font-display truncate max-w-[140px] sm:max-w-xs md:max-w-md hidden xs:inline-block">
              {projectTitle}
            </span>
          )}
        </div>

        {/* Center/Right Toolbar */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Zoom Level Indicator & Controls */}
          <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md border border-white/15 rounded-full p-1 shadow-md">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 1}
              className="p-1.5 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full hover:bg-white/20 disabled:opacity-35 text-white transition-all active:scale-95 cursor-pointer"
              title="Zoom Out (-)"
              aria-label="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={resetZoom}
              className="px-2 py-0.5 rounded text-[11px] font-mono text-cyan-300 font-bold hover:bg-white/10 transition-colors cursor-pointer"
              title="Reset Zoom (0)"
              aria-label="Reset Zoom Scale"
            >
              {Math.round(zoomLevel * 100)}%
            </button>
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 3.5}
              className="p-1.5 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full hover:bg-white/20 disabled:opacity-35 text-white transition-all active:scale-95 cursor-pointer"
              title="Zoom In (+)"
              aria-label="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            {zoomLevel > 1 && (
              <button
                onClick={resetZoom}
                className="p-1.5 rounded-full hover:bg-white/20 text-cyan-300 transition-all active:scale-95 cursor-pointer hidden sm:inline-flex"
                title="Fit to Screen"
                aria-label="Fit to Screen"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Share Button in Lightbox Header */}
          {projectId && (
            <ShareButton
              id="share-lightbox-btn"
              projectId={projectId}
              projectTitle={projectTitle || 'Project Preview'}
              variant="icon-only"
              className="border-white/15 bg-white/10 hover:bg-cyan-400 hover:text-black"
            />
          )}

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="hidden sm:flex items-center justify-center p-2 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white border border-white/15 transition-all shadow-md active:scale-95 cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen (F)' : 'Fullscreen (F)'}
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          {/* Close Button - min 44x44px touch target on mobile */}
          <button
            onClick={onClose}
            className="flex items-center justify-center gap-1.5 px-3.5 py-2 min-h-[44px] min-w-[44px] rounded-full bg-red-500/20 hover:bg-red-500/30 active:bg-red-500/40 text-red-200 border border-red-500/30 transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer font-mono text-xs font-semibold ml-1"
            aria-label="Close Lightbox (Esc)"
            title="Close Lightbox (Esc)"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">ESC</span>
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div 
        className="relative flex-1 w-full max-w-7xl flex items-center justify-center overflow-hidden my-auto py-1"
        onClick={(e) => {
          if (zoomLevel > 1) {
            e.stopPropagation();
          }
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Navigation Arrow - Prev (min 44x44px touch target on mobile) */}
        {total > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 z-30 p-2.5 sm:p-3.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-black/70 hover:bg-cyan-500 hover:text-black active:scale-90 text-white border border-white/20 backdrop-blur-md transition-all shadow-2xl hover:border-cyan-400 group cursor-pointer"
            aria-label="Previous image (Left Arrow)"
            title="Previous (Left Arrow)"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>
        )}

        {/* The Full Image Display with Zoom & Pan */}
        <div 
          data-protected-media="true"
          onContextMenu={(e) => e.preventDefault()}
          className={`relative max-h-[72vh] sm:max-h-[76vh] max-w-full flex items-center justify-center select-none transition-transform duration-150 ${
            zoomLevel > 1 ? (isPanning ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'
          }`}
          style={{
            transform: `translate3d(${panPosition.x}px, ${panPosition.y}px, 0) scale(${zoomLevel})`,
            transformOrigin: 'center center'
          }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            toggleZoom(e.clientX, e.clientY);
          }}
        >
          <img
            src={activeImage.imageUrl}
            alt={activeImage.title ? `${activeImage.title} - ${projectTitle || 'Portofolio'} oleh Ardi Ulinnuha` : `${projectTitle || 'Karya Portofolio'} - Resolusi Tinggi oleh Ardi Ulinnuha`}
            width={1920}
            height={1080}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            onContextMenu={(e) => e.preventDefault()}
            className={`max-h-[68vh] sm:max-h-[74vh] max-w-[92vw] sm:max-w-[85vw] aspect-video object-contain rounded-xl shadow-2xl border border-white/10 transition-opacity duration-300 pointer-events-auto select-none ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            referrerPolicy="no-referrer"
            decoding="async"
            draggable={false}
          />

          {/* Discreet Transparent Watermark Overlay on Full Preview - Hidden on mobile (<768px) to reduce clutter */}
          {isLoaded && (
            <div 
              className="hidden md:flex absolute bottom-3 right-4 z-20 pointer-events-none select-none items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 opacity-60 hover:opacity-90 transition-opacity"
              aria-hidden="true"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-white/90 uppercase font-semibold drop-shadow-sm">
                Ardi Ulinnuha • Portfolio Preview
              </span>
            </div>
          )}

          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center min-h-[300px]">
              <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Navigation Arrow - Next (min 44x44px touch target on mobile) */}
        {total > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 z-30 p-2.5 sm:p-3.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-black/70 hover:bg-cyan-500 hover:text-black active:scale-90 text-white border border-white/20 backdrop-blur-md transition-all shadow-2xl hover:border-cyan-400 group cursor-pointer"
            aria-label="Next image (Right Arrow)"
            title="Next (Right Arrow)"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>

      {/* Bottom Thumbnail Strip & Caption Bar */}
      <div 
        className="w-full max-w-4xl flex flex-col items-center gap-2 z-30 pb-1.5 px-3"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Active Image Title / Description */}
        {activeImage.title && (
          <div className="px-3.5 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/15 text-center max-w-full shadow-lg">
            <p className="text-xs sm:text-sm font-semibold text-white tracking-wide">
              {activeImage.title}
            </p>
          </div>
        )}

        {/* Visual Thumbnail Strip */}
        {total > 1 && (
          <div className="flex items-center justify-center gap-2 p-1.5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 max-w-full overflow-x-auto scrollbar-none">
            {validImages.map((img, idx) => (
              <button
                key={img.id || idx}
                onClick={() => onNavigate(idx)}
                className={`relative w-12 sm:w-16 h-8 sm:h-10 rounded-lg overflow-hidden border transition-all duration-300 shrink-0 cursor-pointer ${
                  idx === currentIndex
                    ? 'border-cyan-400 ring-2 ring-cyan-400/50 scale-105 shadow-[0_0_12px_rgba(34,211,238,0.5)]'
                    : 'border-white/20 opacity-50 hover:opacity-100 hover:border-white/50'
                }`}
                aria-label={`Jump to image ${idx + 1}`}
              >
                <img
                  src={img.imageUrl}
                  alt={img.title ? `${img.title} - Thumbnail ${projectTitle || 'Portofolio'}` : `Thumbnail ${idx + 1} - ${projectTitle || 'Portofolio'} oleh Ardi Ulinnuha`}
                  width={64}
                  height={40}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  className="w-full h-full aspect-[16/10] object-cover object-center select-none"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>
        )}

        {/* Hint text */}
        <div className="hidden sm:flex items-center gap-3 text-[10px] font-mono text-gray-400 opacity-70">
          <span>Double-click or scroll to zoom</span>
          <span>•</span>
          <span>Arrow keys to navigate</span>
          <span>•</span>
          <span>ESC to exit</span>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
};

import React, { useState, useEffect, memo } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { ImageIcon } from 'lucide-react';

export interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  containerClassName?: string;
  rootMargin?: string;
  threshold?: number;
  priority?: boolean;
  fallbackGradient?: string;
  aspectRatio?: string;
  showPlaceholderIcon?: boolean;
  showWatermark?: boolean;
  watermarkText?: string;
  onLoadedCallback?: () => void;
}

export const LazyImage: React.FC<LazyImageProps> = memo(({
  src,
  alt,
  width,
  height,
  className = '',
  containerClassName = '',
  rootMargin = '200px 0px',
  threshold = 0.05,
  priority = false,
  fallbackGradient = 'from-purple-900/20 to-cyan-900/20',
  aspectRatio,
  showPlaceholderIcon = false,
  showWatermark = true,
  watermarkText = 'Ardi Ulinnuha',
  onLoadedCallback,
  loading,
  ...imgProps
}) => {
  const [containerRef, , hasIntersected] = useIntersectionObserver<HTMLDivElement>({
    rootMargin,
    threshold,
    triggerOnce: true,
    enabled: !priority,
  });

  const shouldLoad = priority || hasIntersected;
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  // If priority is true or image is already cached, check naturalWidth
  useEffect(() => {
    if (!src) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [src]);

  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoadedCallback) {
      onLoadedCallback();
    }
  };

  const handleImageError = () => {
    setHasError(true);
  };

  const normalizedAspectRatio = aspectRatio 
    ? aspectRatio.replace(':', '/')
    : (width && height ? `${width}/${height}` : undefined);

  return (
    <div
      ref={containerRef}
      data-protected-media="true"
      onContextMenu={(e) => e.preventDefault()}
      className={`relative overflow-hidden flex items-center justify-center select-none ${containerClassName}`}
      style={{
        width: width && !containerClassName.includes('w-full') ? `${width}px` : undefined,
        height: height && !containerClassName.includes('h-full') ? `${height}px` : undefined,
        aspectRatio: normalizedAspectRatio,
      }}
    >
      {/* Loading Skeleton / Shimmer Background while waiting for intersection or image decode */}
      {(!isLoaded && !hasError) && (
        <div
          className={`absolute inset-0 z-0 bg-[#0c0d12] flex items-center justify-center transition-opacity duration-500`}
          aria-hidden="true"
        >
          {/* Subtle pulse and gradient shimmer */}
          <div className={`absolute inset-0 bg-gradient-to-br ${fallbackGradient} opacity-30 animate-pulse`} />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          
          {showPlaceholderIcon && (
            <div className="relative z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-gray-400">
              <ImageIcon className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              <span>Loading preview...</span>
            </div>
          )}
        </div>
      )}

      {/* Fallback Display on image error */}
      {hasError && (
        <div className={`absolute inset-0 z-0 bg-gradient-to-br ${fallbackGradient} flex items-center justify-center p-4`}>
          <div className="text-center">
            <ImageIcon className="w-6 h-6 text-gray-500 mx-auto mb-1 opacity-70" />
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">
              Preview Offline
            </span>
          </div>
        </div>
      )}

      {/* Actual Image Rendered conditionally upon Intersection with Anti-Drag & Right-Click protection */}
      {shouldLoad && !hasError && src && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loading || (priority ? 'eager' : 'lazy')}
          decoding="async"
          referrerPolicy="no-referrer"
          draggable={false}
          style={{
            aspectRatio: normalizedAspectRatio,
            ...imgProps.style,
          }}
          onContextMenu={(e) => e.preventDefault()}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`transition-all duration-500 select-none pointer-events-auto ${
            isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-sm'
          } ${className}`}
          {...imgProps}
        />
      )}

      {/* Subtle Visual Watermark Protection Overlay (hidden on mobile to prevent clutter) */}
      {isLoaded && showWatermark && (
        <div 
          className="hidden md:flex absolute bottom-2 right-2.5 z-10 pointer-events-none select-none items-center gap-1 px-2 py-0.5 rounded bg-black/40 backdrop-blur-xs border border-white/10 opacity-40 group-hover:opacity-70 transition-opacity"
          aria-hidden="true"
        >
          <span className="text-[9px] font-mono tracking-wider text-white/90 font-medium uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            © {watermarkText}
          </span>
        </div>
      )}
    </div>
  );
});

LazyImage.displayName = 'LazyImage';

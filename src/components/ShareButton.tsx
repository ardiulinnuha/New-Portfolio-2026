import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Share2, Check } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import { PROJECTS_DATA } from '../data/portfolioData';

export interface ShareButtonProps {
  projectId: string;
  projectCode?: string;
  projectTitle: string;
  variant?: 'pill' | 'header' | 'icon-only';
  className?: string;
  id?: string;
  onCopied?: () => void;
  showToast?: boolean;
}

/**
 * Helper to construct clean deep link URL for the project
 * Format: https://ardiulinnuha-portfolio.ai.studio/{code} (e.g. /434)
 */
export const getCleanProjectShareUrl = (projectCodeOrId: string): string => {
  const match = PROJECTS_DATA.find(p => p.code === projectCodeOrId || p.id === projectCodeOrId);
  const code = match ? match.code : projectCodeOrId;
  try {
    const origin = window.location.origin;
    return `${origin}/${code}`;
  } catch {
    return `https://ardiulinnuha-portfolio.ai.studio/${code}`;
  }
};

/**
 * Robust copy-to-clipboard function supporting modern clipboard API
 * with fallback to document.execCommand('copy') in sandboxed iframes.
 */
export const copyProjectLink = async (text: string): Promise<boolean> => {
  // 1. Try modern clipboard API if available in secure context
  try {
    if (navigator?.clipboard?.writeText && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fallthrough to execCommand fallback
  }

  // 2. Legacy fallback using temporary offscreen textarea
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    textArea.setAttribute('readonly', '');
    document.body.appendChild(textArea);
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch {
    return false;
  }
};

export const ShareButton: React.FC<ShareButtonProps> = ({
  projectId,
  projectCode,
  projectTitle,
  variant = 'pill',
  className = '',
  id,
  onCopied,
  showToast = true,
}) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const triggerCopiedState = useCallback(() => {
    try {
      soundManager.playSuccess();
    } catch {}

    setIsCopied(true);
    onCopied?.();

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }, [onCopied]);

  const handleShare = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    // Prevent re-trigger while copied
    if (isCopied) return;

    try {
      soundManager.playClick();
    } catch {}

    const effectiveCode = projectCode || PROJECTS_DATA.find(p => p.id === projectId)?.code || projectId;
    const shareUrl = getCleanProjectShareUrl(effectiveCode);

    // Update browser URL bar history without reloading
    try {
      window.history.replaceState({ modalOpen: true, code: effectiveCode }, '', `/${effectiveCode}`);
    } catch {}

    // 1. Check if Web Share API is available on mobile/supported browser
    const isMobileDevice = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768;
    if (isMobileDevice && navigator.share) {
      try {
        await navigator.share({
          title: `${projectTitle} - Ardi Ulinnuha Portfolio`,
          text: `Check out ${projectTitle} by Ardi Ulinnuha`,
          url: shareUrl,
        });
        // User successfully shared; do not show "Copied" toast unless needed
        return;
      } catch (err: unknown) {
        // If user cancelled the native share sheet, do NOT trigger copied state
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        // If native share failed for another reason (e.g. permission), fallback to copy below
      }
    }

    // 2. Fallback: Copy direct URL to clipboard
    const success = await copyProjectLink(shareUrl);
    if (success) {
      triggerCopiedState();
    }
  };

  // Base styles depending on variant
  let variantStyles = '';
  if (variant === 'pill') {
    // Used in bottom floating action bar ("Top | Share | Close")
    // min-w-[88px] prevents layout shift of neighboring Top and Close buttons
    variantStyles = isCopied
      ? '!bg-cyan-400 !text-black border-cyan-300 font-bold shadow-sm ring-1 ring-cyan-400'
      : 'bg-white/10 hover:bg-cyan-400 hover:text-black text-white group';
  } else if (variant === 'header') {
    // Used in modal header
    variantStyles = isCopied
      ? '!bg-cyan-400 !text-black border-cyan-300 font-bold shadow-[0_0_15px_rgba(34,211,238,0.4)] ring-1 ring-cyan-400'
      : 'bg-black/80 hover:bg-cyan-500 hover:text-black text-white border-white/20 group';
  } else if (variant === 'icon-only') {
    // Used in toolbars like Lightbox
    variantStyles = isCopied
      ? '!bg-cyan-400 !text-black border-cyan-300 shadow-sm ring-1 ring-cyan-400'
      : 'bg-white/10 hover:bg-cyan-400 hover:text-black text-white border-white/15 group';
  }

  return (
    <>
      <button
        id={id}
        type="button"
        onClick={handleShare}
        aria-label={isCopied ? 'Project link copied to clipboard' : `Share ${projectTitle}`}
        aria-live="polite"
        className={`relative inline-flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 select-none ${
          variant === 'pill'
            ? 'min-w-[88px] sm:min-w-[92px] px-3 py-1.5 rounded-full text-xs font-mono font-semibold'
            : variant === 'header'
            ? 'min-h-[44px] min-w-[44px] sm:w-auto sm:min-w-[96px] px-3.5 py-2 rounded-full text-xs font-mono font-semibold border backdrop-blur-md shadow-lg'
            : 'min-h-[44px] min-w-[44px] p-2 rounded-full border shadow-md'
        } ${variantStyles} ${className}`}
      >
        {/* Animated Icon & Text Container with Smooth Fade/Scale */}
        <span className="flex items-center justify-center gap-1.5 w-full">
          {isCopied ? (
            <>
              <Check
                className="w-4 h-4 shrink-0 !text-black stroke-[2.5] animate-in zoom-in-75 duration-150"
                style={{ color: '#000000', stroke: '#000000' }}
                aria-hidden="true"
              />
              {variant !== 'icon-only' && (
                <span
                  className={`${
                    variant === 'header' ? 'hidden sm:inline' : 'inline'
                  } !text-black font-bold text-xs tracking-tight animate-in fade-in duration-150`}
                  style={{ color: '#000000' }}
                >
                  Copied
                </span>
              )}
            </>
          ) : (
            <>
              <Share2
                className={`w-4 h-4 shrink-0 transition-colors duration-150 ${
                  variant === 'pill'
                    ? 'text-cyan-400 group-hover:!text-black'
                    : variant === 'header'
                    ? 'text-cyan-400 group-hover:!text-black'
                    : 'text-white group-hover:!text-black'
                }`}
                aria-hidden="true"
              />
              {variant !== 'icon-only' && (
                <span
                  className={`${
                    variant === 'header' ? 'hidden sm:inline' : 'inline'
                  } text-xs font-semibold tracking-tight transition-colors duration-150`}
                >
                  Share
                </span>
              )}
            </>
          )}
        </span>
      </button>

      {/* Floating In-Modal Toast Notification ("Link copied!") */}
      {showToast &&
        isCopied &&
        createPortal(
          <div
            role="status"
            aria-live="polite"
            className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom,0px))] sm:bottom-24 left-1/2 -translate-x-1/2 z-[200] pointer-events-none flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400 text-black font-mono text-xs font-bold shadow-[0_10px_35px_rgba(0,0,0,0.85)] border border-cyan-300 animate-in fade-in slide-in-from-bottom-3 duration-200 select-none"
          >
            <Check
              className="w-4 h-4 shrink-0 !text-black stroke-[2.5]"
              style={{ color: '#000000', stroke: '#000000' }}
              aria-hidden="true"
            />
            <span className="!text-black font-bold tracking-wide" style={{ color: '#000000' }}>
              Link copied!
            </span>
          </div>,
          document.body
        )}
    </>
  );
};

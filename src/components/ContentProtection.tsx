import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, X, ShieldCheck } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface ContentProtectionProps {
  /**
   * Title displayed in the notification
   * Default: "Content & Assets Protected"
   */
  title?: string;
  /**
   * Subtitle displayed in the notification
   * Default: "Official Copyright © Ardi Ulinnuha"
   */
  subtitle?: string;
}

export const ContentProtection: React.FC<ContentProtectionProps> = ({
  title = 'Content & Assets Protected',
  subtitle = 'Official Copyright © Ardi Ulinnuha',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerKey, setTriggerKey] = useState(0);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback(() => {
    // Clear any active dismiss timer
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }

    try {
      soundManager.playShield();
    } catch {}

    setIsOpen(true);
    setTriggerKey((prev) => prev + 1);

    // Auto dismiss after 2.7 seconds (2-3s range specified in user request)
    hideTimerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 2700);
  }, []);

  const handleDismiss = useCallback(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }
    setIsOpen(false);
  }, []);

  useEffect(() => {
    // 1. Disable context menu (right click) globally
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      showToast();
    };

    // 2. Disable DevTools / Inspect Element, View Source, and Save Page shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
      const isCtrlOrCmd = isMac ? e.metaKey : e.ctrlKey;
      const key = e.key.toLowerCase();

      // F12: Open DevTools
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        e.stopPropagation();
        showToast();
        return;
      }

      // DevTools Inspect shortcuts:
      // Ctrl+Shift+I / Cmd+Option+I
      // Ctrl+Shift+J / Cmd+Option+J (Console)
      // Ctrl+Shift+C / Cmd+Option+C (Inspect Element)
      const isDevToolsCombo = 
        (e.ctrlKey && e.shiftKey && (key === 'i' || key === 'j' || key === 'c')) ||
        (e.metaKey && (e.altKey || e.shiftKey) && (key === 'i' || key === 'j' || key === 'c'));

      if (isDevToolsCombo) {
        e.preventDefault();
        e.stopPropagation();
        showToast();
        return;
      }

      // View Source shortcut: Ctrl+U / Cmd+Option+U / Cmd+U
      const isViewSource = 
        (e.ctrlKey && key === 'u') || 
        (e.metaKey && e.altKey && key === 'u') ||
        (e.metaKey && key === 'u');

      if (isViewSource) {
        e.preventDefault();
        e.stopPropagation();
        showToast();
        return;
      }

      // Save Page shortcut: Ctrl+S / Cmd+S
      if (isCtrlOrCmd && key === 's') {
        e.preventDefault();
        e.stopPropagation();
        showToast();
        return;
      }
    };

    // 3. Disable image drag-and-drop / dragstart saving
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isImageOrMedia = 
        target.tagName === 'IMG' || 
        target.tagName === 'PICTURE' || 
        target.tagName === 'VIDEO' ||
        Boolean(target.closest('img')) ||
        Boolean(target.closest('[data-protected-media="true"]')) ||
        Boolean(target.closest('.media-protected'));

      if (isImageOrMedia) {
        e.preventDefault();
        showToast();
      }
    };

    // Auto-configure video elements to disable picture-in-picture and downloads
    const enforceVideoAttributes = () => {
      const videos = document.querySelectorAll('video');
      videos.forEach((vid) => {
        if (vid.getAttribute('controlsList') !== 'nodownload') {
          vid.setAttribute('controlsList', 'nodownload');
          vid.setAttribute('disablePictureInPicture', 'true');
          (vid as any).disablePictureInPicture = true;
        }
      });
    };

    window.addEventListener('contextmenu', handleContextMenu, { capture: true });
    window.addEventListener('keydown', handleKeyDown, { capture: true });
    window.addEventListener('dragstart', handleDragStart, { capture: true });
    enforceVideoAttributes();

    const observer = new MutationObserver(enforceVideoAttributes);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu, { capture: true });
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
      window.removeEventListener('dragstart', handleDragStart, { capture: true });
      observer.disconnect();
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, [showToast]);

  return (
    <div 
      id="content-protection-toast-layer"
      className="fixed inset-0 flex items-center justify-center pointer-events-none z-[999999] px-4 sm:px-6"
      aria-live="polite"
      role="status"
    >
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key={triggerKey}
            id="content-protection-toast"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              transition: {
                type: 'spring',
                stiffness: 400,
                damping: 26,
                mass: 0.6
              }
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.92, 
              y: -8,
              transition: { duration: 0.18, ease: 'easeIn' } 
            }}
            className="pointer-events-auto transform-gpu relative overflow-hidden rounded-xl sm:rounded-2xl bg-[#15110c]/96 border border-amber-500/45 shadow-[0_20px_50px_rgba(0,0,0,0.88),0_0_30px_rgba(245,158,11,0.22)] backdrop-blur-2xl w-auto max-w-[calc(100vw-2rem)] sm:max-w-md pl-2.5 sm:pl-4 pr-1.5 sm:pr-2.5 py-2 sm:py-3.5 flex items-center gap-2 sm:gap-3.5"
          >
            {/* Ambient gold/amber sheen glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/15 via-yellow-500/5 to-transparent pointer-events-none" />

            {/* Glowing lock badge icon - scaled down on mobile */}
            <div className="relative flex-shrink-0 w-7 h-7 sm:w-11 sm:h-11 rounded-md sm:rounded-xl bg-gradient-to-br from-amber-500/25 to-yellow-600/15 border border-amber-500/50 flex items-center justify-center text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.28)]">
              <Lock className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-amber-300 stroke-[2.2]" aria-hidden="true" />
              {/* Micro badge indicator - hidden on mobile for maximum cleanliness */}
              <span className="hidden sm:flex absolute -bottom-1 -right-1 h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500 border border-[#15110c] items-center justify-center">
                  <ShieldCheck className="w-2.5 h-2.5 text-black stroke-[3]" />
                </span>
              </span>
            </div>

            {/* Toast text content */}
            <div className="flex-1 min-w-0 pr-1 sm:pr-2">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h4 className="font-display text-[11px] sm:text-[15px] font-bold text-amber-100 tracking-tight sm:tracking-wide leading-tight whitespace-nowrap">
                  {title}
                </h4>
                {/* Badge shown only on desktop screens to give mobile title full space */}
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  Protected
                </span>
              </div>
              <p className="text-[9.5px] sm:text-[13px] text-amber-300/80 font-sans leading-tight mt-0.5 whitespace-nowrap">
                {subtitle}
              </p>
            </div>

            {/* Quick manual dismiss button */}
            <button
              type="button"
              onClick={handleDismiss}
              className="flex-shrink-0 w-7 h-7 sm:w-10 sm:h-10 flex items-center justify-center rounded-md sm:rounded-lg text-amber-400/70 hover:text-amber-200 active:scale-95 hover:bg-amber-500/10 active:bg-amber-500/20 transition-all focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer"
              aria-label="Dismiss notification"
              title="Dismiss"
            >
              <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* Animated auto-dismiss countdown bar at the bottom */}
            <motion.div 
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 2.7, ease: 'linear' }}
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 origin-left"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

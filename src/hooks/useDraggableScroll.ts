import React, { useRef, useState, useEffect, useCallback } from 'react';

interface UseDraggableScrollOptions {
  dragSpeed?: number;
  threshold?: number;
  pauseAnimationOnDrag?: boolean;
}

export function useDraggableScroll<T extends HTMLElement = HTMLDivElement>(
  options: UseDraggableScrollOptions = {}
) {
  const { dragSpeed = 1.2, threshold = 5 } = options;
  const containerRef = useRef<T | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);

  const isMouseDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const isInteractingRef = useRef(false);

  // Check scroll position to display left and right gradient fades
  const updateFadeIndicators = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;

    setShowLeftFade(scrollLeft > 8);
    setShowRightFade(maxScroll > 8 && scrollLeft < maxScroll - 8);
  }, []);

  // Update indicators on mount and window resize
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    updateFadeIndicators();

    const handleScroll = () => {
      updateFadeIndicators();
    };

    el.addEventListener('scroll', handleScroll, { passive: true });

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        updateFadeIndicators();
      });
      resizeObserver.observe(el);
    }

    window.addEventListener('resize', updateFadeIndicators);

    return () => {
      el.removeEventListener('scroll', handleScroll);
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener('resize', updateFadeIndicators);
    };
  }, [updateFadeIndicators]);

  // Mouse drag handlers
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<T>) => {
      // Only drag on primary (left) button click
      if (e.button !== 0) return;
      const el = containerRef.current;
      if (!el) return;

      isMouseDownRef.current = true;
      hasDraggedRef.current = false;
      isInteractingRef.current = true;
      startXRef.current = e.pageX - el.offsetLeft;
      scrollLeftRef.current = el.scrollLeft;
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      if (!isMouseDownRef.current) return;
      const el = containerRef.current;
      if (!el) return;

      const x = e.pageX - el.offsetLeft;
      const walk = (x - startXRef.current) * dragSpeed;

      if (Math.abs(walk) > threshold) {
        if (!hasDraggedRef.current) {
          hasDraggedRef.current = true;
          setIsDragging(true);
        }
        el.scrollLeft = scrollLeftRef.current - walk;
        updateFadeIndicators();
      }
    },
    [dragSpeed, threshold, updateFadeIndicators]
  );

  const handleMouseUp = useCallback(() => {
    isMouseDownRef.current = false;
    isInteractingRef.current = false;
    // Small timeout to allow child onClick handler to check hasDraggedRef
    setTimeout(() => {
      setIsDragging(false);
      hasDraggedRef.current = false;
    }, 50);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (isMouseDownRef.current) {
      isMouseDownRef.current = false;
      isInteractingRef.current = false;
      setTimeout(() => {
        setIsDragging(false);
        hasDraggedRef.current = false;
      }, 50);
    }
  }, []);

  // Safe click wrapper for child items: prevents action if user was dragging
  const handleItemClick = useCallback(
    (action: (e: React.MouseEvent) => void) => {
      return (e: React.MouseEvent) => {
        if (hasDraggedRef.current) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        action(e);
      };
    },
    []
  );

  return {
    containerRef,
    isDragging,
    showLeftFade,
    showRightFade,
    hasDraggedRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleItemClick,
    updateFadeIndicators,
  };
}

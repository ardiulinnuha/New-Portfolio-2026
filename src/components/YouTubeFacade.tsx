/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { YouTubeIcon } from './YouTubeIcon';
import { soundManager } from '../utils/soundEffects';

interface YouTubeFacadeProps {
  videoUrlOrId: string;
  title: string;
  aspectRatioClass?: string;
  customThumbnailUrl?: string;
  className?: string;
}

export const extractYouTubeId = (urlOrId: string): string => {
  if (!urlOrId) return '';
  const clean = urlOrId.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(clean)) {
    return clean;
  }
  const match = clean.match(/(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*)/);
  if (match && match[1]?.length === 11) {
    return match[1];
  }
  return clean;
};

// Global event name to enforce single active iframe at any given time
const PLAY_EVENT_NAME = 'au_single_youtube_active';

export const YouTubeFacade: React.FC<YouTubeFacadeProps> = ({
  videoUrlOrId,
  title,
  aspectRatioClass = 'aspect-video',
  customThumbnailUrl,
  className = '',
}) => {
  const videoId = extractYouTubeId(videoUrlOrId);
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnailSrc, setThumbnailSrc] = useState<string>(() => {
    if (customThumbnailUrl) return customThumbnailUrl;
    if (videoId) return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    return '';
  });

  // Listen to global play events so that starting another video unmounts this one
  useEffect(() => {
    const handleOtherPlay = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string }>;
      if (customEvent.detail?.id !== videoId) {
        setIsPlaying(false);
      }
    };

    window.addEventListener(PLAY_EVENT_NAME, handleOtherPlay);
    return () => {
      window.removeEventListener(PLAY_EVENT_NAME, handleOtherPlay);
    };
  }, [videoId]);

  const handleStartPlay = useCallback(() => {
    try {
      soundManager.playClick();
    } catch {}

    // Notify other YouTube facades to stop
    window.dispatchEvent(
      new CustomEvent(PLAY_EVENT_NAME, { detail: { id: videoId } })
    );

    setIsPlaying(true);
  }, [videoId]);

  if (!videoId) return null;

  if (isPlaying) {
    return (
      <div className={`w-full ${aspectRatioClass} rounded-xl sm:rounded-2xl overflow-hidden bg-black shadow-2xl relative ${className}`}>
        <iframe
          className="w-full h-full border-0"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleStartPlay}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleStartPlay();
        }
      }}
      aria-label={`Play YouTube video: ${title}`}
      className={`group relative w-full ${aspectRatioClass} rounded-xl sm:rounded-2xl overflow-hidden bg-black border border-white/10 hover:border-red-500/50 shadow-xl cursor-pointer select-none transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.25)] focus:outline-none focus:ring-2 focus:ring-red-500 ${className}`}
    >
      {/* Facade Poster Image */}
      {thumbnailSrc ? (
        <img
          src={thumbnailSrc}
          alt={title}
          width={aspectRatioClass.includes('9/16') ? 720 : 1280}
          height={aspectRatioClass.includes('9/16') ? 1280 : 720}
          loading="lazy"
          decoding="async"
          onError={() => {
            if (thumbnailSrc.includes('hqdefault.jpg')) {
              setThumbnailSrc(`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`);
            }
          }}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 opacity-85 group-hover:opacity-100"
        />
      ) : (
        <div className="w-full h-full bg-[#0d0f14]" />
      )}

      {/* Atmospheric Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50 pointer-events-none group-hover:opacity-75 transition-opacity duration-300" />

      {/* Center YouTube Play Button */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative flex items-center justify-center">
          {/* Subtle Red Aura Pulse on Hover */}
          <div className="absolute -inset-4 rounded-full bg-red-600/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Play Badge Icon */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-red-600 group-hover:bg-red-500 text-white flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-active:scale-95 border border-white/20">
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1 text-white drop-shadow"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Title Bar & Badge */}
      <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 flex items-center justify-between text-xs font-mono text-gray-200 pointer-events-none">
        <div className="flex items-center gap-2 truncate pr-2">
          <YouTubeIcon className="w-4 h-4 text-red-500 shrink-0" />
          <span className="truncate text-white font-medium drop-shadow">{title}</span>
        </div>
        <span className="shrink-0 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] text-cyan-300 uppercase tracking-wider font-bold">
          Click to Play
        </span>
      </div>
    </div>
  );
};

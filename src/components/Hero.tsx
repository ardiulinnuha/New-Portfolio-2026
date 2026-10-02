import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { YouTubeIcon } from './YouTubeIcon';
import { soundManager } from '../utils/soundEffects';
import { 
  ArrowRight, 
  Play, 
  ExternalLink,
  Star,
  Sun,
  Sunrise,
  Moon,
  Sparkles
} from 'lucide-react';

const getTimeBasedGreeting = (date: Date = new Date()): { greeting: string; period: 'morning' | 'afternoon' | 'evening'; timeStr: string } => {
  const hours = date.getHours();
  let greeting = 'Good evening';
  let period: 'morning' | 'afternoon' | 'evening' = 'evening';

  if (hours >= 5 && hours < 12) {
    greeting = 'Good morning';
    period = 'morning';
  } else if (hours >= 12 && hours < 17) {
    greeting = 'Good afternoon';
    period = 'afternoon';
  } else {
    greeting = 'Good evening';
    period = 'evening';
  }

  const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return { greeting, period, timeStr };
};

export const Hero: React.FC = () => {
  const [timeInfo, setTimeInfo] = useState(() => getTimeBasedGreeting());

  useEffect(() => {
    const updateTime = () => setTimeInfo(getTimeBasedGreeting());
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const toolsList = [
    { name: 'Adobe Premiere Pro', icon: 'Pr' },
    { name: 'Adobe After Effects', icon: 'Ae' },
    { name: 'Adobe Photoshop', icon: 'Ps' },
    { name: 'Adobe Illustrator', icon: 'Ai' },
    { name: 'Adobe InDesign', icon: 'Id' },
    { name: 'Google AI Studio', icon: 'AI' },
    { name: 'Figma UI/UX', icon: 'Fi' },
    { name: 'Prompt Engineering', icon: 'PE' }
  ];

  return (
    <section 
      id="hero" 
      className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-transparent"
    >
      {/* Immersive UI Atmospheric Glowing Blurs */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-600/15 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-purple-900/10 via-black to-cyan-900/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Main Hero Container Card */}
        <div className="bg-gradient-to-br from-[#111111] via-[#0d0d0d] to-[#080808] border border-white/10 rounded-3xl p-6 sm:p-10 md:p-14 relative overflow-hidden shadow-2xl mb-8">
          
          {/* Subtle in-card atmospheric glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/15 blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 blur-[120px] pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-start max-w-5xl">
            
            {/* Top Badges & Time-Based Greeting */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6">
              <div 
                id="hero-time-greeting-badge"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-xs font-mono tracking-wide text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
              >
                {timeInfo.period === 'morning' ? (
                  <Sunrise className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                ) : timeInfo.period === 'afternoon' ? (
                  <Sun className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
                )}
                <span className="font-bold tracking-wider">{timeInfo.greeting}</span>
                <span className="text-gray-500 text-[10px] hidden sm:inline">•</span>
                <span className="text-gray-400 text-[11px] font-mono hidden sm:inline">{timeInfo.timeStr}</span>
              </div>
              <div className="px-4 py-1.5 bg-white text-black font-black text-xs rounded-full uppercase tracking-widest shadow-md">
                Google AI Certified
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono uppercase tracking-widest text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>Available for Work</span>
              </div>
            </div>

            {/* Salutation Intro */}
            <div 
              id="hero-greeting-intro"
              className="flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-widest text-purple-400 font-bold mb-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>{timeInfo.greeting}, welcome to my portfolio</span>
            </div>

            {/* Massive Immersive Headline */}
            <h1 
              id="hero-name-heading"
              className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-400 uppercase leading-none mb-4"
            >
              Ardi Ulinnuha
            </h1>

            {/* Subtitle & Tagline */}
            <p 
              id="hero-tagline"
              className="text-lg sm:text-xl md:text-2xl font-medium tracking-wide text-cyan-400 mb-5 font-display"
            >
              Creative Technologist <span className="text-purple-400">|</span> Creative Designer <span className="text-purple-400">|</span> Video Editor
            </p>

            <p 
              id="hero-bio-lead"
              className="text-sm sm:text-base md:text-lg text-gray-300 max-w-4xl leading-relaxed mb-8 opacity-90 font-light"
            >
              Turning ideas into visuals that convert. 4+ years crafting motion graphics, branding, and promotional content for brands and organizations — powered by Adobe Creative Cloud and AI-driven creative workflows. Bachelor of Informatics, Amikom Yogyakarta.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8 w-full">
              <a
                id="hero-explore-portfolio-btn"
                href="#portfolio"
                onClick={() => {
                  try {
                    soundManager.playClick();
                  } catch {}
                }}
                className="px-7 py-3.5 min-h-[44px] w-full sm:w-auto justify-center rounded-full bg-white text-black hover:bg-cyan-400 font-black text-xs uppercase tracking-widest transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-black shrink-0" />
                <span>Explore Portfolio</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </a>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  id="hero-behance-btn"
                  href={PERSONAL_INFO.socialLinks.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3.5 min-h-[44px] rounded-full bg-[#0f0f0f] hover:bg-[#1a1a1a] text-gray-200 hover:text-white font-bold text-xs uppercase tracking-wider border border-white/10 transition-colors cursor-pointer"
                >
                  <span className="text-cyan-400">Bē</span>
                  <span>Behance</span>
                  <ExternalLink className="w-3 h-3 text-gray-400 shrink-0" />
                </a>

                <a
                  id="hero-youtube-btn"
                  href={PERSONAL_INFO.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3.5 min-h-[44px] rounded-full bg-[#0f0f0f] hover:bg-[#1a1a1a] text-gray-200 hover:text-white font-bold text-xs uppercase tracking-wider border border-white/10 transition-colors cursor-pointer"
                >
                  <YouTubeIcon className="w-4 h-4 shrink-0" />
                  <span>YouTube</span>
                  <ExternalLink className="w-3 h-3 text-gray-400 shrink-0" />
                </a>
              </div>
            </div>

            {/* Software / Workflow Stack Pill Tags */}
            <div className="w-full pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase tracking-[0.2em] text-purple-400 font-bold mr-2">
                CORE STACK:
              </span>
              {toolsList.map((tool) => (
                <div
                  key={tool.name}
                  className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-300 font-medium hover:border-cyan-400/40 hover:scale-105 hover:bg-white/10 transition-all duration-200 ease-out cursor-default flex items-center gap-1.5 will-change-transform"
                >
                  <span className="text-[10px] font-bold text-cyan-400 font-mono">[{tool.icon}]</span>
                  <span>{tool.name}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-[#0f0f0f] border border-white/10 rounded-3xl p-5 flex flex-col items-center justify-center text-center hover:border-white/25 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-out will-change-transform cursor-default"
            >
              <div className="flex items-center gap-1.5 mb-1">
                {idx === 1 && <Star className="w-4 h-4 text-cyan-400 fill-cyan-400" />}
                <span className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
                  {stat.value}
                </span>
              </div>
              <span className="text-xs text-gray-400 uppercase tracking-wider font-mono">
                {stat.labelEn}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

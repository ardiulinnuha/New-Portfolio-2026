import React, { memo } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { 
  Sparkles, 
  Film, 
  Layout, 
  Palette, 
  ShieldCheck, 
  Server, 
  Code2, 
  Cloud, 
  Award,
  Cpu,
  Flame,
  Globe
} from 'lucide-react';

interface LazyCertIconProps {
  certId: string;
  category: string;
  issuerBadge?: string;
  className?: string;
}

export const LazyCertIcon: React.FC<LazyCertIconProps> = memo(({
  certId,
  category,
  issuerBadge,
  className = ''
}) => {
  const [containerRef, , hasIntersected] = useIntersectionObserver<HTMLDivElement>({
    rootMargin: '100px 0px',
    threshold: 0.1,
    triggerOnce: true
  });

  const getIconConfig = () => {
    switch (certId) {
      case 'google-ai-professional':
        return {
          icon: <Sparkles className="w-5 h-5 text-cyan-300" />,
          bgGradient: 'from-cyan-500/20 to-purple-500/20',
          border: 'border-cyan-500/30',
          glow: 'shadow-[0_0_15px_rgba(6,182,212,0.25)]'
        };
      case 'kominfo-video-creator':
        return {
          icon: <Film className="w-5 h-5 text-indigo-300" />,
          bgGradient: 'from-indigo-500/20 to-cyan-500/20',
          border: 'border-indigo-500/30',
          glow: 'shadow-[0_0_15px_rgba(99,102,241,0.25)]'
        };
      case 'sanbercode-uiux':
        return {
          icon: <Layout className="w-5 h-5 text-pink-300" />,
          bgGradient: 'from-pink-500/20 to-purple-500/20',
          border: 'border-pink-500/30',
          glow: 'shadow-[0_0_15px_rgba(244,114,182,0.25)]'
        };
      case 'sanbercode-graphic-design':
        return {
          icon: <Palette className="w-5 h-5 text-purple-300" />,
          bgGradient: 'from-purple-500/20 to-pink-500/20',
          border: 'border-purple-500/30',
          glow: 'shadow-[0_0_15px_rgba(168,85,247,0.25)]'
        };
      case 'hellomotion-motion-graphic':
        return {
          icon: <Flame className="w-5 h-5 text-amber-300" />,
          bgGradient: 'from-amber-500/20 to-orange-500/20',
          border: 'border-amber-500/30',
          glow: 'shadow-[0_0_15px_rgba(245,158,11,0.25)]'
        };
      case 'cisco-it-essentials':
        return {
          icon: <Server className="w-5 h-5 text-emerald-300" />,
          bgGradient: 'from-emerald-500/20 to-cyan-500/20',
          border: 'border-emerald-500/30',
          glow: 'shadow-[0_0_15px_rgba(16,185,129,0.25)]'
        };
      case 'cisco-ccna-intro':
        return {
          icon: <Globe className="w-5 h-5 text-cyan-300" />,
          bgGradient: 'from-cyan-500/20 to-blue-500/20',
          border: 'border-cyan-500/30',
          glow: 'shadow-[0_0_15px_rgba(6,182,212,0.25)]'
        };
      case 'dicoding-frontend':
        return {
          icon: <Code2 className="w-5 h-5 text-emerald-300" />,
          bgGradient: 'from-emerald-500/20 to-teal-500/20',
          border: 'border-emerald-500/30',
          glow: 'shadow-[0_0_15px_rgba(16,185,129,0.25)]'
        };
      case 'microsoft-elevate':
        return {
          icon: <Cloud className="w-5 h-5 text-blue-300" />,
          bgGradient: 'from-blue-500/20 to-purple-500/20',
          border: 'border-blue-500/30',
          glow: 'shadow-[0_0_15px_rgba(59,130,246,0.25)]'
        };
      default:
        return {
          icon: <Award className="w-5 h-5 text-purple-300" />,
          bgGradient: 'from-purple-500/20 to-cyan-500/20',
          border: 'border-purple-500/30',
          glow: 'shadow-[0_0_15px_rgba(168,85,247,0.25)]'
        };
    }
  };

  const config = getIconConfig();

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      {hasIntersected ? (
        <div 
          className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${config.bgGradient} border ${config.border} ${config.glow} flex items-center justify-center transition-all duration-500 transform scale-100 opacity-100 animate-in fade-in zoom-in-90`}
        >
          {config.icon}
        </div>
      ) : (
        /* Minimal lightweight placeholder skeleton before intersecting */
        <div 
          className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center opacity-40 animate-pulse"
          aria-hidden="true"
        />
      )}
    </div>
  );
});

LazyCertIcon.displayName = 'LazyCertIcon';

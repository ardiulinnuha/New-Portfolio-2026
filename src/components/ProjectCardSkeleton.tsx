import React from 'react';

interface ProjectCardSkeletonProps {
  className?: string;
}

export const ProjectCardSkeleton: React.FC<ProjectCardSkeletonProps> = ({ className = '' }) => {
  return (
    <div
      className={`bg-[#0f0f0f] border border-white/10 rounded-3xl overflow-hidden flex flex-col justify-between h-full relative select-none animate-pulse ${className}`}
      aria-hidden="true"
    >
      {/* Shimmer light sweep overlay */}
      <div className="animate-skeleton-shimmer" />

      {/* Visual Mockup Header (Matches 16:9 Aspect Ratio) */}
      <div className="relative w-full aspect-video min-h-[180px] bg-white/[0.03] border-b border-white/5 flex items-center justify-center overflow-hidden">
        {/* Placeholder center icon silhouette */}
        <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
          <div className="w-5 h-5 rounded-lg bg-white/10" />
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Title Placeholder */}
          <div className="h-5 bg-white/[0.09] rounded-lg w-3/4 mb-3" />
          
          {/* Multi-line Description Placeholders */}
          <div className="space-y-2 mb-5">
            <div className="h-3 bg-white/[0.04] rounded-md w-full" />
            <div className="h-3 bg-white/[0.04] rounded-md w-5/6" />
            <div className="h-3 bg-white/[0.04] rounded-md w-2/3" />
          </div>
        </div>

        <div>
          {/* Tool / Tech Badges Placeholders */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            <div className="h-6 w-16 bg-white/[0.05] rounded-md border border-white/5" />
            <div className="h-6 w-20 bg-white/[0.05] rounded-md border border-white/5" />
            <div className="h-6 w-14 bg-white/[0.05] rounded-md border border-white/5" />
          </div>

          {/* Action Footer Bar */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            {/* View Details Button Placeholder */}
            <div className="h-4 w-24 bg-cyan-500/10 rounded-full" />

            {/* External Links Placeholders */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/[0.05] border border-white/5" />
              <div className="w-7 h-7 rounded-full bg-white/[0.05] border border-white/5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface PortfolioGridSkeletonProps {
  count?: number;
  className?: string;
}

export const PortfolioGridSkeleton: React.FC<PortfolioGridSkeletonProps> = ({ 
  count = 6,
  className = ''
}) => {
  return (
    <div 
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 ${className}`}
      role="status"
      aria-label="Loading portfolio projects..."
    >
      {Array.from({ length: count }).map((_, index) => (
        <ProjectCardSkeleton key={`portfolio-skeleton-${index}`} />
      ))}
      <span className="sr-only">Loading portfolio projects...</span>
    </div>
  );
};

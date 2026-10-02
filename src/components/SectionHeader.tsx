import React from 'react';
import { motion, type Variants } from 'motion/react';

interface SectionHeaderProps {
  number?: string;
  eyebrow: string | React.ReactNode;
  title: React.ReactNode;
  icon?: React.ReactNode;
  description?: string | React.ReactNode;
  subtitle?: React.ReactNode;
  rightAction?: React.ReactNode;
  className?: string;
  id?: string;
  align?: 'left' | 'center';
}

// Container coordinating staggered entrance
const headerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

// Slide-in from left variant for eyebrow badge
const eyebrowVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -24,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  },
};

// Slide-in from left for primary title
const titleVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -32,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 220,
      damping: 22,
      mass: 0.8,
    },
  },
};

// Animated gradient accent underline expand
const lineVariants: Variants = {
  hidden: {
    scaleX: 0,
    opacity: 0,
    originX: 0,
  },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

// Slide-up variant for description and subtitles
const contentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// Slide-in from right for right action elements
const rightActionVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 28,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 240,
      damping: 20,
    },
  },
};

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  eyebrow,
  title,
  icon,
  description,
  subtitle,
  rightAction,
  className = 'mb-12 sm:mb-16',
  id,
  align = 'left',
}) => {
  const isCenter = align === 'center';

  return (
    <motion.div
      id={id}
      className={`relative flex flex-col ${
        rightAction
          ? 'md:flex-row md:items-end justify-between gap-6'
          : isCenter
          ? 'items-center text-center'
          : 'items-start'
      } ${className}`}
      variants={headerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      <div className={`flex flex-col ${isCenter ? 'items-center' : 'items-start'} max-w-3xl`}>
        {/* Eyebrow badge with decorative numbered label & pulse dot */}
        <motion.div
          variants={eyebrowVariants}
          className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 dark:bg-white/[0.03] dark:border-white/10 shadow-sm backdrop-blur-md mb-3.5 will-change-transform group"
        >
          {number && (
            <span className="section-number-pill px-2 py-0.5 rounded-md font-mono text-[11px] font-extrabold tracking-wider bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 dark:text-cyan-300 dark:border-cyan-500/40">
              {number}
            </span>
          )}
          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse shrink-0" />
          <span className="text-xs uppercase tracking-[0.22em] text-purple-400 dark:text-purple-300 font-bold">
            {eyebrow}
          </span>
        </motion.div>

        {/* Primary Title Container: Horizontal Side-by-Side Flex with Vertical Center Alignment */}
        <motion.div
          variants={titleVariants}
          className={`flex items-center gap-2.5 sm:gap-3.5 md:gap-4 will-change-transform w-full ${
            isCenter ? 'justify-center' : 'justify-start'
          }`}
        >
          {icon && (
            <div className="section-title-icon-badge inline-flex items-center justify-center p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/[0.06] border border-white/15 text-cyan-400 dark:text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.15)] shrink-0 transition-transform duration-300 hover:scale-105">
              {icon}
            </div>
          )}
          <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl lg:text-[2.15rem] xl:text-4xl text-white tracking-tight leading-[1.2] section-header-title min-w-0 flex-1">
            {title}
          </h2>
        </motion.div>

        {/* Dynamic Animated Gradient Underline Bar */}
        <motion.div
          variants={lineVariants}
          className="h-1 w-20 sm:w-28 rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 mt-4 mb-1 origin-left shadow-[0_0_12px_rgba(34,211,238,0.4)]"
        />

        {/* Optional Description */}
        {description && (
          <motion.p
            variants={contentVariants}
            className="text-sm sm:text-base text-gray-300 dark:text-gray-300 mt-3.5 leading-relaxed opacity-90 will-change-transform max-w-2xl"
          >
            {description}
          </motion.p>
        )}

        {/* Optional Subtitle / Filter Trigger */}
        {subtitle && (
          <motion.div variants={contentVariants} className="mt-3 will-change-transform">
            {subtitle}
          </motion.div>
        )}
      </div>

      {/* Optional Right Action Container */}
      {rightAction && (
        <motion.div
          variants={rightActionVariants}
          className="shrink-0 will-change-transform self-start md:self-end"
        >
          {rightAction}
        </motion.div>
      )}
    </motion.div>
  );
};


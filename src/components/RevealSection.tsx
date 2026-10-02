import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface RevealSectionProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  id?: string;
  amount?: number | 'some' | 'all';
}

export const RevealSection: React.FC<RevealSectionProps> = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  id,
  amount = 0.01,
  ...props
}) => {
  const getInitialOffsets = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 16 };
      case 'down':
        return { opacity: 0, y: -16 };
      case 'left':
        return { opacity: 0, x: -16 };
      case 'right':
        return { opacity: 0, x: 16 };
      case 'none':
      default:
        return { opacity: 1, scale: 1 };
    }
  };

  const initial = getInitialOffsets();

  return (
    <motion.div
      id={id}
      className={`reveal-section-wrapper transform-gpu will-change-transform ${className}`}
      initial={initial}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
      }}
      viewport={{ once: true, margin: '80px 0px 80px 0px', amount }}
      transition={{
        duration: 0.45,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};


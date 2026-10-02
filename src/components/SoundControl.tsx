import React from 'react';

interface SoundControlProps {
  variant?: 'navbar' | 'floating';
  className?: string;
}

/**
 * Visual sound control buttons are hidden per user request.
 * The audio synthesize engine (SoundManager) remains 100% active in the background.
 */
export const SoundControl: React.FC<SoundControlProps> = () => {
  return null;
};


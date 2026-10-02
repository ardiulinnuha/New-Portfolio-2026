import { useState, useEffect } from 'react';
import { soundManager } from '../utils/soundEffects';

export interface SoundEffectsState {
  isMuted: boolean;
  volume: number;
  toggleMute: () => boolean;
  setVolume: (vol: number) => void;
  setMuted: (muted: boolean) => void;
}

export function useSoundEffects(): SoundEffectsState {
  const [isMuted, setIsMuted] = useState<boolean>(() => soundManager.isSoundMuted());
  const [volume, setVolumeState] = useState<number>(() => soundManager.getVolume());

  useEffect(() => {
    const unsubscribe = soundManager.subscribe((muted, vol) => {
      setIsMuted(muted);
      setVolumeState(vol);
    });

    return unsubscribe;
  }, []);

  const toggleMute = () => {
    return soundManager.toggleMute();
  };

  const setVolume = (vol: number) => {
    soundManager.setVolume(vol);
  };

  const setMuted = (muted: boolean) => {
    soundManager.setMuted(muted);
  };

  return {
    isMuted,
    volume,
    toggleMute,
    setVolume,
    setMuted,
  };
}

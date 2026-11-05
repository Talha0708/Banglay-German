'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { speakGerman } from '../lib/speech';
import { useAppStore } from '../store/useAppStore';

interface SpeakerButtonProps {
  text: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  ariaLabel?: string;
}

export const SpeakerButton: React.FC<SpeakerButtonProps> = ({
  text,
  size = 'md',
  className = '',
  ariaLabel,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const speechSpeed = useAppStore((state) => state.settings.speechSpeed);

  const handleSpeak = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) return;

    setHasError(false);
    setIsPlaying(true);

    const res = await speakGerman(text, {
      rate: speechSpeed,
      onStart: () => setIsPlaying(true),
      onEnd: () => setIsPlaying(false),
      onError: () => {
        setIsPlaying(false);
        setHasError(true);
      },
    });

    if (!res.success) {
      setIsPlaying(false);
      setHasError(true);
    }
  };

  const sizeClasses = {
    sm: 'w-8 h-8 p-1.5',
    md: 'w-10 h-10 p-2',
    lg: 'w-12 h-12 p-3',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <button
      type="button"
      onClick={handleSpeak}
      disabled={isPlaying}
      aria-label={ariaLabel || `উচ্চারণ শুনুন: ${text}`}
      title={hasError ? 'স্পিচ চালু করা যায়নি' : 'জার্মান উচ্চারণ শুনুন'}
      className={`min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-full transition-all duration-150 active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 ${
        isPlaying
          ? 'bg-blue-600 text-white shadow-md animate-pulse'
          : hasError
          ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'
          : 'bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/60'
      } ${sizeClasses[size]} ${className}`}
    >
      {isPlaying ? (
        <Loader2 className={`${iconSizes[size]} animate-spin`} />
      ) : hasError ? (
        <VolumeX className={iconSizes[size]} />
      ) : (
        <Volume2 className={iconSizes[size]} />
      )}
    </button>
  );
};

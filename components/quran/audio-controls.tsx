'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Repeat,
  Download
} from 'lucide-react';

interface AudioControlsProps {
  surahNumber: number;
  totalVerses: number;
}

export function AudioControls({ surahNumber, totalVerses }: AudioControlsProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([70]);
  const [isRepeating, setIsRepeating] = useState(false);
  const [currentVerse, setCurrentVerse] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.addEventListener('ended', handleAudioEnded);
    audioRef.current.addEventListener('loadstart', () => setIsLoading(true));
    audioRef.current.addEventListener('canplay', () => setIsLoading(false));

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleAudioEnded);
        audioRef.current.removeEventListener('loadstart', () => setIsLoading(true));
        audioRef.current.removeEventListener('canplay', () => setIsLoading(false));
        audioRef.current.pause();
      }
    };
  }, []);

  // Update volume when slider changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100;
    }
  }, [volume]);

  const handleAudioEnded = () => {
    if (isRepeating) {
      playCurrentVerse();
    } else if (currentVerse < totalVerses) {
      handleNextVerse();
    } else {
      setIsPlaying(false);
    }
  };

  const getAudioUrl = (surah: number, verse: number) => {
    // Using Abdurrahman As-Sudais recitation from EveryAyah.com
    const surahPadded = surah.toString().padStart(3, '0');
    const versePadded = verse.toString().padStart(3, '0');
    return `https://everyayah.com/data/Abdul_Basit_Murattal_192kbps/${surahPadded}${versePadded}.mp3`;
  };

  const playCurrentVerse = async () => {
    if (!audioRef.current) return;

    try {
      setIsLoading(true);
      const audioUrl = getAudioUrl(surahNumber, currentVerse);
      audioRef.current.src = audioUrl;
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayPause = () => {
    // Audio functionality removed as requested
    toast.info('Audio feature not available');
  };

  const handlePreviousVerse = () => {
    if (currentVerse > 1) {
      setCurrentVerse(currentVerse - 1);
    }
  };

  const handleNextVerse = () => {
    if (currentVerse < totalVerses) {
      setCurrentVerse(currentVerse + 1);
    }
  };

  // Auto-play when verse changes if currently playing
  useEffect(() => {
    if (isPlaying) {
      setTimeout(playCurrentVerse, 100);
    }
  }, [currentVerse]);
  const handleDownloadAudio = () => {
    const audioUrl = getAudioUrl(surahNumber, currentVerse);
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = `Surah_${surahNumber}_Verse_${currentVerse}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePreviousVerse}
          disabled={currentVerse === 1 || isLoading}
          aria-label="Previous verse"
        >
          <SkipBack className="h-4 w-4" />
        </Button>

        <Button
          variant={isPlaying ? "secondary" : "default"}
          size="icon"
          onClick={handlePlayPause}
          disabled={isLoading}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isLoading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
          ) : isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={handleNextVerse}
          disabled={currentVerse === totalVerses || isLoading}
          aria-label="Next verse"
        >
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>

      <Button
        variant={isRepeating ? "secondary" : "outline"}
        size="icon"
        onClick={() => setIsRepeating(!isRepeating)}
        aria-label="Toggle repeat"
      >
        <Repeat className="h-4 w-4" />
      </Button>

      <div className="flex items-center gap-2">
        <Volume2 className="h-4 w-4 text-muted-foreground" />
        <div className="w-20">
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={5}
            aria-label="Volume"
          />
        </div>
      </div>

      <div className="text-xs text-muted-foreground">
        Verse {currentVerse} of {totalVerses}
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleDownloadAudio}
        aria-label="Download audio"
      >
        <Download className="h-4 w-4" />
      </Button>
    </div>
  );
}

import { useState, useRef, useEffect, useCallback } from 'react';

interface MediaPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackRate: number;
  volume: number;
  isLoading: boolean;
}

export const useMediaPlayer = (url: string) => {
  const mediaRef = useRef<HTMLMediaElement | null>(null);
  const [state, setState] = useState<MediaPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    playbackRate: 1,
    volume: 1,
    isLoading: true,
  });

  useEffect(() => {
    if (mediaRef.current) {
      mediaRef.current.load();
    }
  }, [url]);

  const handleTimeUpdate = useCallback(() => {
    if (mediaRef.current) {
      setState(prev => ({
        ...prev,
        currentTime: mediaRef.current?.currentTime || 0,
      }));
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (mediaRef.current) {
      setState(prev => ({
        ...prev,
        duration: mediaRef.current?.duration || 0,
        isLoading: false,
      }));
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (mediaRef.current) {
      if (state.isPlaying) {
        mediaRef.current.pause();
      } else {
        mediaRef.current.play();
      }
      setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
    }
  }, [state.isPlaying]);

  const seek = useCallback((time: number) => {
    if (mediaRef.current) {
      mediaRef.current.currentTime = time;
      setState(prev => ({ ...prev, currentTime: time }));
    }
  }, []);

  const setPlaybackRate = useCallback((rate: number) => {
    if (mediaRef.current) {
      mediaRef.current.playbackRate = rate;
      setState(prev => ({ ...prev, playbackRate: rate }));
    }
  }, []);

  const setVolume = useCallback((volume: number) => {
    if (mediaRef.current) {
      mediaRef.current.volume = volume;
      setState(prev => ({ ...prev, volume }));
    }
  }, []);

  const seekRelative = useCallback((offset: number) => {
    if (mediaRef.current) {
      const newTime = Math.max(0, Math.min(state.currentTime + offset, state.duration));
      seek(newTime);
    }
  }, [state.currentTime, state.duration, seek]);

  const formatTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  return {
    mediaRef,
    ...state,
    togglePlay,
    seek,
    setPlaybackRate,
    setVolume,
    seekRelative,
    formatTime,
    handleTimeUpdate,
    handleLoadedMetadata,
  };
}; 
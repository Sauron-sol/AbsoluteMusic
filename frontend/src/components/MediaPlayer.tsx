import React, { useEffect } from 'react';
import { useMediaPlayer } from '../hooks/useMediaPlayer';

interface MediaPlayerProps {
  url: string;
  type: 'audio' | 'video';
  onTimeUpdate?: (time: number) => void;
  onMediaReady?: (element: HTMLMediaElement) => void;
}

export const MediaPlayer: React.FC<MediaPlayerProps> = ({
  url,
  type,
  onTimeUpdate,
  onMediaReady,
}) => {
  const {
    mediaRef,
    isPlaying,
    currentTime,
    duration,
    playbackRate,
    volume,
    isLoading,
    togglePlay,
    seek,
    setPlaybackRate,
    setVolume,
    seekRelative,
    formatTime,
    handleTimeUpdate,
    handleLoadedMetadata,
  } = useMediaPlayer(url);

  useEffect(() => {
    if (mediaRef.current && onMediaReady) {
      onMediaReady(mediaRef.current);
    }
  }, [mediaRef.current, onMediaReady]);

  useEffect(() => {
    if (onTimeUpdate) {
      onTimeUpdate(currentTime);
    }
  }, [currentTime, onTimeUpdate]);

  const MediaElement = type === 'video' ? 'video' : 'audio';

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {/* Lecteur média */}
      <MediaElement
        ref={mediaRef as any}
        src={url}
        className={`w-full ${type === 'video' ? 'aspect-video bg-black' : 'h-12'}`}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        controls={false}
      />

      {/* Contrôles */}
      <div className="mt-4 space-y-4">
        {/* Barre de progression */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={(e) => seek(parseFloat(e.target.value))}
            className="flex-grow h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
          />
          <span className="text-sm text-gray-500">{formatTime(duration || 0)}</span>
        </div>

        {/* Boutons de contrôle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Bouton lecture/pause */}
            <button
              onClick={togglePlay}
              className="p-2 rounded-full hover:bg-gray-100"
              disabled={isLoading}
            >
              {isPlaying ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </button>

            {/* Contrôle de la vitesse */}
            <select
              value={playbackRate}
              onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
              className="bg-white border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value="0.5">0.5x</option>
              <option value="0.75">0.75x</option>
              <option value="1">1x</option>
              <option value="1.25">1.25x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2x</option>
            </select>

            {/* Boutons de saut */}
            <div className="flex space-x-2">
              <button
                onClick={() => seekRelative(-5)}
                className="p-1 rounded hover:bg-gray-100"
                title="Reculer de 5 secondes"
              >
                -5s
              </button>
              <button
                onClick={() => seekRelative(5)}
                className="p-1 rounded hover:bg-gray-100"
                title="Avancer de 5 secondes"
              >
                +5s
              </button>
            </div>
          </div>

          {/* Contrôle du volume */}
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-24 h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 
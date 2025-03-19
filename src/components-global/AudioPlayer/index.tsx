import React, { useEffect, useRef, useState } from 'react';
import { useAnimation } from '../../context/AnimationContext';

interface AudioPlayerProps {
  audioSrc: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { isAudioPlaying, shouldPlayAudio, setIsAudioPlaying } = useAnimation();
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [hasInteraction, setHasInteraction] = useState(false);
  
  useEffect(() => {
    if (!audioRef.current) return;
    
    const audio = audioRef.current;
    
    const handleCanPlay = () => setAudioLoaded(true);
    const handleError = (e: Event) => {
      console.error("Audio error:", (e.target as HTMLAudioElement).error);
      setIsAudioPlaying(false);
    };
    
    audio.addEventListener('canplaythrough', handleCanPlay);
    audio.addEventListener('error', handleError);
    
    audio.volume = 0.7;
    audio.load();
    
    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlay);
      audio.removeEventListener('error', handleError);
    };
  }, [audioSrc, setIsAudioPlaying]);
  
  useEffect(() => {
    const handleUserInteraction = () => {
      setHasInteraction(true);
      
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
    
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    
    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);
  
  useEffect(() => {
    if (!audioRef.current || !audioLoaded) return;
    
    if (shouldPlayAudio && isAudioPlaying && (hasInteraction || document.documentElement.classList.contains('user-interaction'))) {
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            document.documentElement.classList.add('user-interaction');
          })
          .catch(error => {
            console.error("Audio playback failed:", error);
            setIsAudioPlaying(false);
          });
      }
    } else {
      if (audioRef.current.paused === false) {
        audioRef.current.pause();
      }
    }
  }, [isAudioPlaying, shouldPlayAudio, audioLoaded, hasInteraction, setIsAudioPlaying]);

  const getAudioPath = () => {
    const basePath = audioSrc.startsWith('/') ? audioSrc : `/${audioSrc}`;
    
    if (import.meta.env.DEV) {
      return basePath;
    }
    
    const baseUrl = import.meta.env.BASE_URL;
    if (baseUrl && baseUrl !== '/') {
      return `${baseUrl.replace(/\/$/, '')}${basePath}`;
    }
    
    return basePath;
  };

  return (
    <>
      <audio 
        ref={audioRef}
        src={getAudioPath()}
        loop 
        preload="auto"
        className="hidden"
        crossOrigin="anonymous"
      />
      {!hasInteraction && !audioLoaded && (
        <div className="fixed inset-0 bg-transparent z-50 cursor-pointer" onClick={() => setHasInteraction(true)}></div>
      )}
    </>
  );
};

export default AudioPlayer;

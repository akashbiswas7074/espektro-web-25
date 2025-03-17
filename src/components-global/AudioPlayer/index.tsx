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
  
  // Handle initial audio setup
  useEffect(() => {
    if (!audioRef.current) return;
    
    // Log audio initialization
    console.log("Audio player initialized with source:", audioSrc);

    // Set up event listeners
    const audio = audioRef.current;
    
    const handleCanPlay = () => {
      console.log("Audio can play now");
      setAudioLoaded(true);
    };
    
    const handleError = (e: Event) => {
      console.error("Audio error:", (e.target as HTMLAudioElement).error);
      setIsAudioPlaying(false);
    };
    
    audio.addEventListener('canplaythrough', handleCanPlay);
    audio.addEventListener('error', handleError);
    
    // Setup volume
    audio.volume = 0.7;
    
    // Attempt to preload the audio
    audio.load();
    
    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlay);
      audio.removeEventListener('error', handleError);
    };
  }, [audioSrc, setIsAudioPlaying]);
  
  // Handle user interaction with the page
  useEffect(() => {
    const handleUserInteraction = () => {
      setHasInteraction(true);
      
      // Clean up event listeners after first interaction
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
  
  // Handle play/pause based on state
  useEffect(() => {
    if (!audioRef.current || !audioLoaded) return;
    
    if (shouldPlayAudio && isAudioPlaying && (hasInteraction || document.documentElement.classList.contains('user-interaction'))) {
      console.log("Attempting to play audio");
      
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Audio playback started successfully");
            // Add a class to document to remember user has interacted
            document.documentElement.classList.add('user-interaction');
          })
          .catch(error => {
            console.error("Audio playback failed:", error);
            // If autoplay fails due to policy, we'll need user interaction
            setIsAudioPlaying(false);
          });
      }
    } else {
      if (audioRef.current.paused === false) {
        console.log("Pausing audio");
        audioRef.current.pause();
      }
    }
  }, [isAudioPlaying, shouldPlayAudio, audioLoaded, hasInteraction, setIsAudioPlaying]);

  // Try to get the proper path to audio file
  const getAudioPath = () => {
    // Try multiple path formats to ensure compatibility
    const basePath = audioSrc.startsWith('/') ? audioSrc : `/${audioSrc}`;
    
    // If in development, adjust path if needed
    if (import.meta.env.DEV) {
      return basePath;
    }
    
    // For production, prepend base URL if different from root
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

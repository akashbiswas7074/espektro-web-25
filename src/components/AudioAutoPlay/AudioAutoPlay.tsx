import React, { useEffect, useRef } from 'react';
import audioService from '../../services/AudioService';

interface AudioAutoPlayProps {
  audioSrc: string;
  volume?: number;
}

/**
 * Component dedicated to aggressive audio autoplay attempts
 */
const AudioAutoPlay: React.FC<AudioAutoPlayProps> = ({ audioSrc, volume = 0.3 }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const invisibleButtonRef = useRef<HTMLButtonElement | null>(null);
  const autoPlayAttempted = useRef<boolean>(false);

  // Create and configure audio element
  useEffect(() => {
    // Create a hidden audio element directly in the DOM
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audio.autoplay = true; // Try native autoplay
    audio.muted = false;
    audio.volume = volume;
    audio.id = 'background-audio-autoplay';
    audio.style.display = 'none';
    document.body.appendChild(audio);
    
    audioRef.current = audio;

    // Create an invisible button that we'll auto-click
    const invisibleButton = document.createElement('button');
    invisibleButton.style.position = 'fixed';
    invisibleButton.style.opacity = '0';
    invisibleButton.style.pointerEvents = 'none';
    invisibleButton.style.zIndex = '-9999';
    invisibleButton.textContent = 'Enable Audio';
    invisibleButton.id = 'invisible-audio-button';
    document.body.appendChild(invisibleButton);
    
    invisibleButtonRef.current = invisibleButton;
    
    // Set up click listener on the invisible button
    invisibleButton.addEventListener('click', () => {
      if (audio) {
        // This will be called by our simulated click
        attemptPlay(audio);
      }
    });
    
    return () => {
      // Clean up
      if (audio && audio.parentNode) {
        audio.parentNode.removeChild(audio);
      }
      if (invisibleButton && invisibleButton.parentNode) {
        invisibleButton.parentNode.removeChild(invisibleButton);
      }
    };
  }, [audioSrc, volume]);

  // Simulate user interaction to enable audio
  useEffect(() => {
    if (autoPlayAttempted.current) return;
    
    // Try multiple methods to start audio playback
    const tryAutoplay = async () => {
      autoPlayAttempted.current = true;
      
      // Method 1: Try direct play
      if (audioRef.current) {
        attemptPlay(audioRef.current);
      }
      
      // Method 2: Simulate a click on the invisible button
      if (invisibleButtonRef.current) {
        invisibleButtonRef.current.click();
      }
      
      // Method 3: Use AudioContext API
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContext) {
          const context = new AudioContext();
          const source = context.createMediaElementSource(audioRef.current!);
          source.connect(context.destination);
          
          if (context.state === 'suspended') {
            await context.resume();
          }
        }
      } catch (e) {
        console.error('AudioContext method failed:', e);
      }
      
      // Method 4: Use the audio service
      audioService.initialize(audioSrc, volume);
      audioService.play();
    };
    
    // Execute autoplay attempts
    setTimeout(tryAutoplay, 100); // Small delay to let the component fully mount
    
    // Also try on window load and document ready events
    window.addEventListener('load', tryAutoplay);
    if (document.readyState === 'complete') {
      tryAutoplay();
    } else {
      window.addEventListener('DOMContentLoaded', tryAutoplay);
    }
    
    // Clean up
    return () => {
      window.removeEventListener('load', tryAutoplay);
      window.removeEventListener('DOMContentLoaded', tryAutoplay);
    };
  }, [audioSrc, volume]);

  // Track page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && audioRef.current) {
        attemptPlay(audioRef.current);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Attempt to play with error handling
  const attemptPlay = (audio: HTMLAudioElement) => {
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.error('Autoplay prevented:', error);
        // If browser policy blocks autoplay, we'll rely on user interaction
      });
    }
  };

  // This component doesn't render anything visible
  return null;
};

export default AudioAutoPlay;

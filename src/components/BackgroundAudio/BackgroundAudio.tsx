import React, { useEffect, useRef, useState } from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import './BackgroundAudio.css';

interface BackgroundAudioProps {
  audioSrc: string;
  initialVolume?: number;
}

const BackgroundAudio: React.FC<BackgroundAudioProps> = ({
  audioSrc,
  initialVolume = 0.3,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const attemptIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-click function
  const autoClickButton = () => {
    if (buttonRef.current && !localStorage.getItem('audioInitialized')) {
      buttonRef.current.click();
      localStorage.setItem('audioInitialized', 'true');
    }
  };

  useEffect(() => {
    // Clear the flag when component mounts to ensure click on fresh page load
    localStorage.removeItem('audioInitialized');
    
    // Attempt auto-click after a short delay to ensure component is ready
    const timeoutId = setTimeout(autoClickButton, 500);

    // Also try on window load
    window.addEventListener('load', autoClickButton);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('load', autoClickButton);
    };
  }, []);

  // Initialize audio element properly with guaranteed loop
  useEffect(() => {
    const audio = new Audio(audioSrc);
    
    // Configure audio - always unmuted by default
    audio.loop = true;
    audio.volume = initialVolume;
    audio.preload = 'auto';
    audio.muted = false; // Ensure it's unmuted
    audio.autoplay = true;
    
    // Add ended event listener as a backup looping mechanism
    const handleEnded = () => {
      audio.currentTime = 0;
      playAudio(audio);
    };
    
    // Add error handler
    const handleError = (e: Event) => {
      console.error("Audio error occurred:", e);
      setTimeout(() => playAudio(audio), 1000);
    };
    
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    
    // Save audio reference
    audioRef.current = audio;
    
    // Try to play immediately
    playAudio(audio);
    
    // Create an interval that keeps trying to play audio
    attemptIntervalRef.current = setInterval(() => {
      if (audio.paused && !isMuted) {
        console.log("Audio stopped - attempting to restart");
        playAudio(audio);
      }
    }, 3000);

    // Attempt to play when the window gets focus
    const handleFocus = () => {
      if (audio.paused && !isMuted) {
        playAudio(audio);
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && audio.paused && !isMuted) {
        playAudio(audio);
      }
    });
    
    // Set up user interaction detection for autoplay
    setupUserInteractionHandlers(audio);
    
    // Clean up
    return () => {
      if (audio) {
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError);
        audio.pause();
        audio.src = '';
      }
      
      window.removeEventListener('focus', handleFocus);
      
      if (attemptIntervalRef.current) {
        clearInterval(attemptIntervalRef.current);
      }
    };
  }, [audioSrc, initialVolume, isMuted]);

  // Listen for system volume changes and try to play audio
  useEffect(() => {
    const handleVolumeChange = () => {
      if (audioRef.current && audioRef.current.paused && !isMuted) {
        playAudio(audioRef.current);
      }
    };
    
    // Some browsers fire an event when volume changes
    if (audioRef.current) {
      audioRef.current.addEventListener('volumechange', handleVolumeChange);
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('volumechange', handleVolumeChange);
      }
    };
  }, [isMuted]);

  // Setup handlers for user interaction
  const setupUserInteractionHandlers = (audio: HTMLAudioElement) => {
    const playOnUserInteraction = () => {
      // Ensure unmuted on first interaction
      audio.muted = false;
      setIsMuted(false);
      playAudio(audio);
    };
    
    // Detect interactions to enable autoplay
    document.addEventListener('click', playOnUserInteraction, { once: true });
    document.addEventListener('touchstart', playOnUserInteraction, { once: true });
    document.addEventListener('keydown', playOnUserInteraction, { once: true });
    document.addEventListener('scroll', playOnUserInteraction, { once: true });
  };

  // Helper function to play audio with error handling
  const playAudio = (audio: HTMLAudioElement) => {
    if (!audio) return;

    // Make sure it's never muted when we try to play
    audio.muted = false;
    setIsMuted(false);
    
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log("Audio playing successfully");
        })
        .catch(error => {
          console.error("Autoplay prevented by browser:", error);
          // We'll keep trying via the interval
        });
    }
  };

  // Toggle mute/unmute only (not play/pause)
  const toggleMute = () => {
    if (!audioRef.current) return;

    const newMutedState = !audioRef.current.muted;
    audioRef.current.muted = newMutedState;
    setIsMuted(newMutedState);
    
    // If we're unmuting, ensure audio is playing
    if (!newMutedState && audioRef.current.paused) {
      playAudio(audioRef.current);
    }
  };

  return (
    <div className="background-audio-container">
      <button 
        ref={buttonRef}
        className={`audio-control-button ${isMuted ? '' : 'active'}`}
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute background music" : "Mute background music"}
        title={isMuted ? "Unmute background music" : "Mute background music"}
      >
        {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
      </button>
    </div>
  );
};

export default BackgroundAudio;

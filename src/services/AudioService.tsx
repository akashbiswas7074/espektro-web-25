import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  toggle: () => void;
  setAudioSource: (src: string) => void;
}

const AudioContext = createContext<AudioContextType>({
  isPlaying: false,
  toggle: () => {},
  setAudioSource: () => {},
});

export const useAudio = () => useContext(AudioContext);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioInitialized, setAudioInitialized] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentVolumeRef = useRef<number>(0.5);
  
  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio();
    audioRef.current.loop = true;
    audioRef.current.volume = 0;
    
    const handleEndedEvent = () => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(err => console.log('Error replaying audio:', err));
      }
    };
    
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleEndedEvent);
    }
    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden, pause audio
        if (audioRef.current && !audioRef.current.paused) {
          fadeOutAudio(() => {
            if (audioRef.current) audioRef.current.pause();
          });
        }
      } else {
        // Page is visible again, resume audio if it was playing
        if (audioRef.current && isPlaying) {
          audioRef.current.play().then(() => {
            fadeInAudio();
          }).catch(err => console.log('Error resuming audio:', err));
        }
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Listen for custom events from VideoHero
    const handleVideoHeroEnded = (event: Event) => {
      try {
        const customEvent = event as CustomEvent;
        const bgAudioSrc = customEvent.detail?.backgroundAudioSrc || 
          "https://res.cloudinary.com/dlrlet9fg/video/upload/v1742346713/horror-background-music-302076_hf4pt3.mp3";
        
        if (audioRef.current) {
          audioRef.current.src = bgAudioSrc;
          
          setTimeout(() => {
            if (audioRef.current) {
              audioRef.current.volume = 0;
              audioRef.current.play().then(() => {
                setAudioInitialized(true);
                setIsPlaying(true);
                fadeInAudio();
              }).catch(err => {
                console.log("Could not play background audio:", err);
                
                // Add user interaction listener for autoplay blocked scenario
                const playOnInteraction = () => {
                  if (audioRef.current) {
                    audioRef.current.play()
                      .then(() => {
                        setIsPlaying(true);
                        fadeInAudio();
                      })
                      .catch(e => console.log("Still can't play audio:", e));
                  }
                  document.removeEventListener('click', playOnInteraction);
                };
                
                document.addEventListener('click', playOnInteraction, { once: true });
              });
            }
          }, 500);
        }
      } catch (err) {
        console.error('Error handling videohero:ended event:', err);
      }
    };
    
    document.addEventListener('videohero:ended', handleVideoHeroEnded);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('ended', handleEndedEvent);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('videohero:ended', handleVideoHeroEnded);
    };
  }, [isPlaying]);
  
  const fadeInAudio = () => {
    if (!audioRef.current) return;
    
    let vol = 0;
    const fadeInterval = setInterval(() => {
      if (vol < currentVolumeRef.current) {
        vol += 0.05;
        if (audioRef.current) {
          audioRef.current.volume = vol;
        }
      } else {
        clearInterval(fadeInterval);
      }
    }, 50);
  };
  
  const fadeOutAudio = (callback?: () => void) => {
    if (!audioRef.current) {
      if (callback) callback();
      return;
    }
    
    const startVolume = audioRef.current.volume;
    let vol = startVolume;
    const fadeInterval = setInterval(() => {
      if (vol > 0.05) {
        vol -= 0.05;
        if (audioRef.current) {
          audioRef.current.volume = vol;
        }
      } else {
        clearInterval(fadeInterval);
        if (callback) callback();
      }
    }, 50);
  };
  
  const toggle = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      // Pause with fade out
      fadeOutAudio(() => {
        if (audioRef.current) audioRef.current.pause();
        setIsPlaying(false);
      });
    } else {
      // Resume with fade in
      audioRef.current.play().then(() => {
        setAudioInitialized(true);
        setIsPlaying(true);
        fadeInAudio();
      }).catch(err => {
        console.log("Play prevented:", err);
      });
    }
  };
  
  const setAudioSource = (src: string) => {
    if (!audioRef.current) return;
    
    const wasPlaying = isPlaying;
    
    // Pause current audio with fade out
    fadeOutAudio(() => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = src;
        
        if (wasPlaying) {
          audioRef.current.play().then(() => {
            fadeInAudio();
          }).catch(err => {
            console.log("Could not play new audio source:", err);
            setIsPlaying(false);
          });
        }
      }
    });
  };
  
  return (
    <AudioContext.Provider value={{ isPlaying, toggle, setAudioSource }}>
      {children}
    </AudioContext.Provider>
  );
};

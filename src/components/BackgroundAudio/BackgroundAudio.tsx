import React, { useEffect, useRef, useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './BackgroundAudio.css';

interface BackgroundAudioProps {
  audioSrc?: string;
  defaultVolume?: number;
  autoPlay?: boolean;
}

const BackgroundAudio: React.FC<BackgroundAudioProps> = ({
  audioSrc = "https://res.cloudinary.com/dlrlet9fg/video/upload/v1742346260/background-loop-71744_uvqcky.mp3",
  defaultVolume = 0.5,
  autoPlay = false
}) => {
  const audioPlayerRef = useRef<AudioPlayer>(null);
  const [audioPlaying, setAudioPlaying] = useState(autoPlay);
  const [audioInitialized, setAudioInitialized] = useState(false);
  const [showControls, setShowControls] = useState(true); // Set to true to show immediately
  
  // Listen for the VideoHero ended event
  useEffect(() => {
    const handleVideoHeroEnded = (event: Event) => {
      const customEvent = event as CustomEvent;
      const bgAudioSrc = customEvent.detail?.backgroundAudioSrc || audioSrc;
      
      // Small delay to ensure smooth transition
      setTimeout(() => {
        if (audioPlayerRef.current?.audio.current) {
          // Set the audio source if it's different
          if (audioPlayerRef.current.audio.current.src !== bgAudioSrc) {
            audioPlayerRef.current.audio.current.src = bgAudioSrc;
          }
          
          // Start with volume at 0
          audioPlayerRef.current.audio.current.volume = 0;
          
          audioPlayerRef.current.audio.current.play().then(() => {
            setAudioInitialized(true);
            setAudioPlaying(true);
            setShowControls(true);
            
            // Gradually increase volume
            let vol = 0;
            const fadeIn = setInterval(() => {
              if (vol < defaultVolume) {
                vol += 0.05;
                if (audioPlayerRef.current?.audio.current) {
                  audioPlayerRef.current.audio.current.volume = vol;
                }
              } else {
                clearInterval(fadeIn);
              }
            }, 100);
          }).catch(err => {
            console.log("Could not play background audio:", err);
            // Add user interaction listener for autoplay blocked scenario
            const playOnInteraction = () => {
              if (audioPlayerRef.current?.audio.current) {
                audioPlayerRef.current.audio.current.play()
                  .then(() => {
                    setAudioPlaying(true);
                    setShowControls(true);
                    document.removeEventListener('click', playOnInteraction);
                  })
                  .catch(e => console.log("Still can't play audio:", e));
              }
            };
            
            document.addEventListener('click', playOnInteraction, { once: true });
          });
        }
      }, 500);
    };
    
    document.addEventListener('videohero:ended', handleVideoHeroEnded);
    
    return () => {
      document.removeEventListener('videohero:ended', handleVideoHeroEnded);
    };
  }, [audioSrc, defaultVolume]);
  
  // Ensure audio controls are always visible
  useEffect(() => {
    setShowControls(true);
  }, []);

  const toggleAudio = () => {
    if (audioPlayerRef.current?.audio.current) {
      if (audioPlaying) {
        // Fade out audio
        let vol = audioPlayerRef.current!.audio.current!.volume;
        const fadeOut = setInterval(() => {
          if (vol > 0.05) {
            vol -= 0.05;
            if (audioPlayerRef.current?.audio.current) {
              audioPlayerRef.current.audio.current.volume = vol;
            }
          } else {
            clearInterval(fadeOut);
            if (audioPlayerRef.current?.audio.current) {
              audioPlayerRef.current.audio.current.pause();
            }
            setAudioPlaying(false);
          }
        }, 50);
      } else {
        // Initialize if not already
        if (!audioInitialized) {
          audioPlayerRef.current.audio.current.volume = 0;
        }
        
        audioPlayerRef.current.audio.current.play().then(() => {
          setAudioInitialized(true);
          setAudioPlaying(true);
          
          // Fade in
          let vol = audioPlayerRef.current!.audio.current!.volume;
          const fadeIn = setInterval(() => {
            if (vol < defaultVolume) {
              vol += 0.05;
              if (audioPlayerRef.current?.audio.current) {
                audioPlayerRef.current.audio.current.volume = vol;
              }
            } else {
              clearInterval(fadeIn);
            }
          }, 50);
        }).catch(error => {
          console.log("Play prevented:", error);
        });
      }
    }
  };
  
  return (
    <div className={`background-audio-container ${showControls ? 'visible' : ''}`}>
      <button 
        className={`audio-toggle-btn ${audioPlaying ? 'audio-playing' : ''}`}
        onClick={toggleAudio}
        aria-label={audioPlaying ? 'Mute background audio' : 'Play background audio'}
      >
        {audioPlaying && <div className="audio-active-indicator"></div>}
        {audioPlaying ? (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
        ) : (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          </svg>
        )}
      </button>
      
      <AudioPlayer
        ref={audioPlayerRef}
        autoPlay={false}
        src={audioSrc}
        onPlay={() => setAudioPlaying(true)}
        onPause={() => setAudioPlaying(false)}
        onEnded={() => {
          // Auto-replay the audio when it ends
          if (audioPlayerRef.current?.audio.current && audioPlaying) {
            audioPlayerRef.current.audio.current.currentTime = 0;
            audioPlayerRef.current.audio.current.play()
              .then(() => setAudioPlaying(true))
              .catch(e => console.log("Could not replay audio:", e));
          }
        }}
        loop={true}
        volume={defaultVolume}
        showJumpControls={false}
        showSkipControls={false}
        showFilledVolume={false}
        customControlsSection={[]}
        customProgressBarSection={[]}
        customAdditionalControls={[]}
        customVolumeControls={[]}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default BackgroundAudio;

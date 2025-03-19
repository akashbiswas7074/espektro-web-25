import React, { useEffect, useRef, useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './VideoHero.css';

interface VideoHeroProps {
  onVideoEnd: () => void;
  onFadeStart: () => void;
  playbackRate?: number;
  audioSrc?: string;
  autoPlayAudio?: boolean;
  backgroundAudioSrc?: string; // Keep this for the custom event
}

const VideoHero: React.FC<VideoHeroProps> = ({ 
  onVideoEnd, 
  onFadeStart,
  playbackRate = 2,
  audioSrc = "https://res.cloudinary.com/dlrlet9fg/video/upload/v1742346260/background-loop-71744_uvqcky.mp3",
  autoPlayAudio = true,
  backgroundAudioSrc = "https://res.cloudinary.com/dlrlet9fg/video/upload/v1742343452/background-loop-71744_n2jfzl.mp3"
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioPlayerRef = useRef<AudioPlayer>(null);
  const [isEnding, setIsEnding] = useState(false);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioInitialized, setAudioInitialized] = useState(false);
  const currentRateRef = useRef<number>(playbackRate);
  const targetRateRef = useRef<number>(playbackRate);
  const animationRef = useRef<number | null>(null);

  // Easing function for smooth transitions (ease-in-ease-out)
  const easeInOutQuad = (t: number): number => {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  };

  // Function to smoothly transition between playback rates
  const animatePlaybackRate = (timestamp: number, startTime: number, startRate: number, endRate: number, duration: number) => {
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutQuad(progress);
    
    const newRate = startRate + (endRate - startRate) * easedProgress;
    
    if (videoRef.current) {
      videoRef.current.playbackRate = newRate;
      currentRateRef.current = newRate;
    }
    
    if (progress < 1) {
      animationRef.current = requestAnimationFrame((newTimestamp) => 
        animatePlaybackRate(newTimestamp, startTime, startRate, endRate, duration)
      );
    } else {
      animationRef.current = null;
    }
  };

  // Function to start a new rate transition
  const changePlaybackRate = (newRate: number) => {
    if (currentRateRef.current === newRate) return;
    
    targetRateRef.current = newRate;
    
    // Cancel any ongoing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    const startRate = currentRateRef.current;
    const transitionDuration = 1000; // 1 second transition
    
    animationRef.current = requestAnimationFrame((timestamp) => 
      animatePlaybackRate(timestamp, timestamp, startRate, newRate, transitionDuration)
    );
  };

  // Function to handle skip button click
  const handleSkip = () => {
    setIsEnding(true);
    onFadeStart();
    
    // Fade out audio when skipping
    if (audioPlayerRef.current && audioPlayerRef.current.audio.current && audioPlaying) {
      // Store a reference to the audio element
      const audio = audioPlayerRef.current.audio.current;
      // Fade out audio
      let vol = audio.volume;
      const fadeOut = setInterval(() => {
        if (vol > 0.05) {
          vol -= 0.1;
          audio.volume = vol;
        } else {
          clearInterval(fadeOut);
          audio.pause();
          setAudioPlaying(false);
        }
      }, 50);
    }
    
    setTimeout(() => {
      document.body.classList.remove('no-scroll');
      onVideoEnd();
      
      try {
        // Trigger a custom event to notify that background audio should start
        const event = new CustomEvent('videohero:ended', { 
          detail: { backgroundAudioSrc } 
        });
        document.dispatchEvent(event);
      } catch (err) {
        console.error('Error dispatching event:', err);
      }
    }, 1000);
  };

  // Try to play audio with fade-in effect
  const playAudio = () => {
    if (audioPlayerRef.current && audioPlayerRef.current.audio.current && autoPlayAudio && !audioPlaying) {
      const audio = audioPlayerRef.current.audio.current;
      
      // Start with volume at 0
      audio.volume = 0;
      
      audio.play().then(() => {
        setAudioInitialized(true);
        setAudioPlaying(true);
        
        // Gradually increase volume
        let vol = 0;
        const fadeIn = setInterval(() => {
          if (vol < 0.7) {
            vol += 0.05;
            audio.volume = vol;
          } else {
            clearInterval(fadeIn);
          }
        }, 50);
      }).catch(error => {
        console.log("Auto-play prevented:", error);
        setAudioPlaying(false);
      });
    }
  };

  const toggleAudio = () => {
    if (audioPlayerRef.current && audioPlayerRef.current.audio.current) {
      const audio = audioPlayerRef.current.audio.current;
      
      if (audioPlaying) {
        // Fade out
        let vol = audio.volume;
        const fadeOut = setInterval(() => {
          if (vol > 0.05) {
            vol -= 0.05;
            audio.volume = vol;
          } else {
            clearInterval(fadeOut);
            audio.pause();
            setAudioPlaying(false);
          }
        }, 50);
      } else {
        // Initialize if not already
        if (!audioInitialized) {
          audio.volume = 0;
        }
        
        audio.play().then(() => {
          setAudioInitialized(true);
          setAudioPlaying(true);
          
          // Fade in
          let vol = audio.volume;
          const fadeIn = setInterval(() => {
            if (vol < 0.7) {
              vol += 0.05;
              audio.volume = vol;
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

  // Attempt to play audio on any user interaction
  useEffect(() => {
    const handleInteraction = () => {
      if (autoPlayAudio && !audioPlaying && !audioInitialized) {
        playAudio();
      }
    };
    
    // Listen for various user interaction events
    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('touchstart', handleInteraction, { once: true });
    document.addEventListener('keydown', handleInteraction, { once: true });
    
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, [audioPlaying, autoPlayAudio, audioInitialized]);

  useEffect(() => {
    // Add no-scroll class to body when component mounts
    document.body.classList.add('no-scroll');
    
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  useEffect(() => {
    // Show skip button after 2 seconds
    const skipButtonTimer = setTimeout(() => {
      setShowSkipButton(true);
    }, 2000);

    const videoElement = videoRef.current;
    if (videoElement) {
      // Set initial playback rate when video is loaded
      videoElement.playbackRate = playbackRate;
      currentRateRef.current = playbackRate;
      
      const handleTimeUpdate = () => {
        const currentProgress = videoElement.currentTime / videoElement.duration;
        
        // Dynamic playback rate based on video progress with smooth transitions
        if (currentProgress < 0.08) {
          changePlaybackRate(3);
        } else if (currentProgress < 0.77) {
          changePlaybackRate(4);
        } else {
          changePlaybackRate(2);
        }
        
        // Trigger fade out when video is almost complete (last 2 seconds)
        if (videoElement.duration - videoElement.currentTime < 2 && !isEnding) {
          setIsEnding(true);
          onFadeStart();
          
          // Fade out audio
          if (audioPlayerRef.current && audioPlayerRef.current.audio.current) {
            const audio = audioPlayerRef.current.audio.current;
            const fadeOutInterval = setInterval(() => {
              if (audio.volume > 0.1) {
                audio.volume -= 0.1;
              } else {
                clearInterval(fadeOutInterval);
                audio.pause();
                setAudioPlaying(false);
              }
            }, 200);
          }
        }
      };

      const handleEnded = () => {
        document.body.classList.remove('no-scroll');
        
        // Stop audio when video ends
        if (audioPlayerRef.current && audioPlayerRef.current.audio.current) {
          audioPlayerRef.current.audio.current.pause();
          setAudioPlaying(false);
        }
        
        onVideoEnd();
        
        try {
          // Trigger a custom event to notify that background audio should start
          const event = new CustomEvent('videohero:ended', { 
            detail: { backgroundAudioSrc } 
          });
          document.dispatchEvent(event);
        } catch (err) {
          console.error('Error dispatching event:', err);
        }
      };

      videoElement.addEventListener('timeupdate', handleTimeUpdate);
      videoElement.addEventListener('ended', handleEnded);
      
      // Try to play audio when the video starts playing
      videoElement.addEventListener('playing', playAudio);
      
      videoElement.addEventListener('loadeddata', () => {
        videoElement.playbackRate = playbackRate;
        currentRateRef.current = playbackRate;
        
        // Try to play audio when the video data is loaded
        if (autoPlayAudio) {
          playAudio();
        }
      });

      return () => {
        clearTimeout(skipButtonTimer);
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
        videoElement.removeEventListener('ended', handleEnded);
        videoElement.removeEventListener('playing', playAudio);
        videoElement.removeEventListener('loadeddata', () => {});
        
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }

    return () => {
      clearTimeout(skipButtonTimer);
    };
  }, [onVideoEnd, onFadeStart, isEnding, playbackRate, autoPlayAudio, backgroundAudioSrc]);

  return (
    <div className={`video-hero-container ${isEnding ? 'fade-out' : ''}`}>
      <video 
        ref={videoRef}
        className="video-element"
        autoPlay
        muted
        playsInline
        preload="auto"
      >
        <source 
          src="https://res.cloudinary.com/dlrlet9fg/video/upload/v1742204358/04_Final_Render_1_1_fyrxbv.mp4" 
          type="video/mp4"
        />
      </video>
      
      <div className="hero-controls">
        {showSkipButton && (
          <button 
            className={`skip-button ${showSkipButton ? 'visible' : ''}`}
            onClick={handleSkip}
            aria-label="Skip intro video"
          >
            <svg 
              className="skip-icon" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              width="22" 
              height="22" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polygon points="5 4 15 12 5 20 5 4"></polygon>
              <line x1="19" y1="5" x2="19" y2="19"></line>
            </svg>
          </button>
        )}
        <div className="hidden">
        <button 
          className={`audio-toggle ${showSkipButton ? 'visible' : ''} ${audioPlaying ? 'audio-playing' : ''}`}
          onClick={toggleAudio}
          aria-label={audioPlaying ? 'Mute audio' : 'Unmute audio'}
        >
          {audioPlaying && <div className="audio-active-indicator"></div>}
          {audioPlaying ? (
            <svg 
              className="audio-toggle-icon"
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
              className="audio-toggle-icon"
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
        </button></div>
      </div>
      
      {/* Hidden audio player */}
      <div className="audio-player-container hidden">
        <AudioPlayer
          ref={audioPlayerRef}
          autoPlay={false} // We'll handle this manually for better control
          src={audioSrc}
          onPlay={() => setAudioPlaying(true)}
          onPause={() => setAudioPlaying(false)}
          onEnded={() => {
            // Auto-replay the audio when it ends if it was playing
            if (audioPlayerRef.current?.audio.current && audioPlaying) {
              audioPlayerRef.current.audio.current.play().catch(e => 
                console.log("Could not replay audio:", e)
              );
            }
          }}
          onError={(e) => console.log("Audio error:", e)}
          showJumpControls={false}
          showSkipControls={false}
          showFilledVolume={false}
          customControlsSection={[]}
          customProgressBarSection={[]}
          customAdditionalControls={[]}
          customVolumeControls={[]}
          layout="horizontal-reverse"
          style={{ display: 'none' }}
          volume={0}  // Start with volume at 0, we'll fade it in
        />
      </div>
    </div>
  );
};

export default VideoHero;

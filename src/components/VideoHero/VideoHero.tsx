import React, { useEffect, useRef, useState, useCallback, memo } from 'react';
import './VideoHero.css';

interface VideoHeroProps {
  onVideoEnd: () => void;
  onFadeStart: () => void;
  playbackRate?: number;
  videoSrc?: string;
}

const VideoHero: React.FC<VideoHeroProps> = memo(({ 
  onVideoEnd, 
  onFadeStart,
  playbackRate = 2,
  videoSrc = "https://res.cloudinary.com/dlrlet9fg/video/upload/v1742204358/04_Final_Render_1_1_fyrxbv.mp4"
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isEnding, setIsEnding] = useState(false);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const currentRateRef = useRef<number>(playbackRate);
  const targetRateRef = useRef<number>(playbackRate);
  const animationRef = useRef<number | null>(null);
  const isEndingRef = useRef(false);
  
  // Optimized easing function
  const easeInOutQuad = useCallback((t: number): number => {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }, []);

  // Memoized animation function to prevent recreation on each render
  const animatePlaybackRate = useCallback((timestamp: number, startTime: number, startRate: number, endRate: number, duration: number) => {
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
  }, [easeInOutQuad]);

  // Optimized playback rate change function
  const changePlaybackRate = useCallback((newRate: number) => {
    if (currentRateRef.current === newRate) return;
    
    targetRateRef.current = newRate;
    
    // Cancel any ongoing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    const startRate = currentRateRef.current;
    const transitionDuration = 800; // Slightly faster transition for better performance
    
    animationRef.current = requestAnimationFrame((timestamp) => 
      animatePlaybackRate(timestamp, timestamp, startRate, newRate, transitionDuration)
    );
  }, [animatePlaybackRate]);

  // Optimized skip handler
  const handleSkip = useCallback(() => {
    setIsEnding(true);
    isEndingRef.current = true;
    onFadeStart();
    
    setTimeout(() => {
      document.body.classList.remove('no-scroll');
      onVideoEnd();
    }, 800); // Shorter timeout for better responsiveness
  }, [onFadeStart, onVideoEnd]);

  // Initial setup - add no-scroll class
  useEffect(() => {
    document.body.classList.add('no-scroll');
    
    return () => {
      document.body.classList.remove('no-scroll');
      // Clean up any animations on unmount
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Show skip button after short delay and setup video event handlers
  useEffect(() => {
    // Show skip button after a short delay
    const skipButtonTimer = setTimeout(() => {
      setShowSkipButton(true);
    }, 1500); // Show skip button earlier

    const videoElement = videoRef.current;
    if (videoElement) {
      // Cache DOM element reference for performance
      
      // Set video properties for better performance
      videoElement.playbackRate = playbackRate;
      videoElement.muted = true; // Ensure video is muted
      videoElement.setAttribute('playsinline', ''); // Ensure inline playback
      videoElement.setAttribute('disablePictureInPicture', ''); // Disable PiP
      currentRateRef.current = playbackRate;
      
      // Optimize timeupdate frequency for smoother playback
      let lastProgressCheck = 0;
      const timeUpdateInterval = 80; // ms - balance between smoothness and performance
      
      const handleTimeUpdate = () => {
        const now = performance.now();
        if (now - lastProgressCheck < timeUpdateInterval) return;
        lastProgressCheck = now;
        
        const currentProgress = videoElement.currentTime / videoElement.duration;
        
        // Simplified dynamic playback rate to improve performance
        if (currentProgress < 0.1) {
          changePlaybackRate(2.5);
        } else if (currentProgress < 0.75) {
          changePlaybackRate(3.5);
        } else {
          changePlaybackRate(2);
        }
        
        // Trigger fade out when video is almost complete
        if (videoElement.duration - videoElement.currentTime < 2 && !isEndingRef.current) {
          setIsEnding(true);
          isEndingRef.current = true;
          onFadeStart();
        }
      };

      const handleEnded = () => {
        document.body.classList.remove('no-scroll');
        onVideoEnd();
      };

      videoElement.addEventListener('timeupdate', handleTimeUpdate);
      videoElement.addEventListener('ended', handleEnded);
      
      // Optimize loadeddata handler
      videoElement.addEventListener('loadeddata', () => {
        videoElement.playbackRate = playbackRate;
        currentRateRef.current = playbackRate;
      }, { once: true }); // Only needs to run once

      return () => {
        clearTimeout(skipButtonTimer);
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
        videoElement.removeEventListener('ended', handleEnded);
      };
    }

    return () => {
      clearTimeout(skipButtonTimer);
    };
  }, [onVideoEnd, onFadeStart, playbackRate, changePlaybackRate]);

  return (
    <div className={`video-hero-container ${isEnding ? 'fade-out' : ''}`}>
      <video 
        ref={videoRef}
        className="video-element"
        autoPlay
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        style={{ willChange: 'transform' }} // Performance hint for GPU acceleration
      >
        <source src={videoSrc} type="video/mp4" />
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
      </div>
    </div>
  );
});

export default VideoHero;

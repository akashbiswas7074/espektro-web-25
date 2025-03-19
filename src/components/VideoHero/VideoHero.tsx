import React, { useEffect, useRef, useState, useCallback, memo, Suspense } from 'react';
import './VideoHero.css';

interface VideoHeroProps {
  onVideoEnd: () => void;
  onFadeStart: () => void;
  playbackRate?: number;
  videoSrc?: string;
  posterImage?: string;
}

// Separate the actual video component for better code splitting
const VideoElement = memo(({
  videoRef,
  videoSrc,
  onLoaded,
}: {
  videoRef: React.RefObject<HTMLVideoElement>;
  videoSrc: string;
  onLoaded: () => void;
}) => (
  <video 
    ref={videoRef}
    className="video-element"
    autoPlay
    muted
    playsInline
    preload="metadata" // Changed from auto to metadata for faster initial load
    disablePictureInPicture
    onLoadedMetadata={onLoaded}
    style={{ willChange: 'transform' }}
  >
    <source src={videoSrc} type="video/mp4" />
  </video>
));

const VideoHero: React.FC<VideoHeroProps> = memo(({ 
  onVideoEnd, 
  onFadeStart,
  playbackRate = 2,
  videoSrc = "https://res.cloudinary.com/dlrlet9fg/video/upload/v1742204358/04_Final_Render_1_1_fyrxbv.mp4",

}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isEnding, setIsEnding] = useState(false);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const currentRateRef = useRef<number>(playbackRate);
  const animationRef = useRef<number | null>(null);
  const isEndingRef = useRef(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  // Simplified playback rate change with fewer calculations
  const changePlaybackRate = useCallback((newRate: number) => {
    if (videoRef.current && currentRateRef.current !== newRate) {
      videoRef.current.playbackRate = newRate;
      currentRateRef.current = newRate;
    }
  }, []);

  // Optimized skip handler
  const handleSkip = useCallback(() => {
    if (isEndingRef.current) return; // Prevent multiple calls
    
    setIsEnding(true);
    isEndingRef.current = true;
    onFadeStart();
    
    setTimeout(() => {
      document.body.classList.remove('no-scroll');
      onVideoEnd();
    }, 750); // Even shorter timeout for better responsiveness
  }, [onFadeStart, onVideoEnd]);

  // Handle video loaded event
  const handleVideoLoaded = useCallback(() => {
    setVideoLoaded(true);
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
      currentRateRef.current = playbackRate;
    }
  }, [playbackRate]);

  // Initial setup - add no-scroll class
  useEffect(() => {
    document.body.classList.add('no-scroll');
    
    // Show skip button after a short delay
    const skipButtonTimer = setTimeout(() => {
      setShowSkipButton(true);
    }, 1200);
    
    return () => {
      document.body.classList.remove('no-scroll');
      clearTimeout(skipButtonTimer);
      // Clean up any animations on unmount
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Setup video event handlers
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !videoLoaded) return;
    
    // Throttled timeupdate handling
    let lastUpdateTime = 0;
    const throttleInterval = 100; // ms between updates
    
    const handleTimeUpdate = () => {
      const now = performance.now();
      if (now - lastUpdateTime < throttleInterval) return;
      lastUpdateTime = now;
      
      const progress = videoElement.currentTime / videoElement.duration;
      
      // Very simple playback rate logic - just 2 rates for better performance
      changePlaybackRate(progress < 0.75 ? 3 : 2);
      
      // Check for ending
      if (videoElement.duration - videoElement.currentTime < 1.8 && !isEndingRef.current) {
        isEndingRef.current = true;
        setIsEnding(true);
        onFadeStart();
      }
    };

    const handleEnded = () => {
      document.body.classList.remove('no-scroll');
      onVideoEnd();
    };

    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    videoElement.addEventListener('ended', handleEnded);
    
    return () => {
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      videoElement.removeEventListener('ended', handleEnded);
    };
  }, [onVideoEnd, onFadeStart, changePlaybackRate, videoLoaded]);

  return (
    <div className={`video-hero-container ${isEnding ? 'fade-out' : ''}`}>
      <Suspense fallback={<div className="video-loading-placeholder"></div>}>
        <VideoElement 
          videoRef={videoRef}
          videoSrc={videoSrc}
          onLoaded={handleVideoLoaded}
        />
      </Suspense>
      
      {showSkipButton && (
        <button 
          className="skip-button"
          onClick={handleSkip}
          aria-label="Skip intro video"
        >
          <svg 
            viewBox="0 0 24 24" 
            width="22" 
            height="22" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <polygon points="5 4 15 12 5 20 5 4"></polygon>
            <line x1="19" y1="5" x2="19" y2="19"></line>
          </svg>
        </button>
      )}
    </div>
  );
});

export default VideoHero;

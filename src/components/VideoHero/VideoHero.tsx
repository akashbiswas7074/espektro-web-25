import React, { useEffect, useRef, useState, useCallback, memo } from 'react';
import './VideoHero.css';

interface VideoHeroProps {
  onVideoEnd: () => void;
  onFadeStart: () => void;
  playbackRate?: number;
  videoSrc?: string;
}

// Simplified video element with reduced props
const VideoElement = memo(({
  videoRef,
  videoSrc,
  onLoaded
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
    preload="metadata"
    onLoadedMetadata={onLoaded}
  >
    <source src={videoSrc} type="video/mp4" />
  </video>
));

const VideoHero: React.FC<VideoHeroProps> = memo(({ 
  onVideoEnd, 
  onFadeStart,
  playbackRate = 4, // Changed from 1.8 to 4 for faster playback
  videoSrc = "https://res.cloudinary.com/dlrlet9fg/video/upload/v1742353617/04_Final_Render_1_1_fyrxbv_prpfjo.mp4" // Added quality parameters
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isEnding, setIsEnding] = useState(false);
  const [showSkipButton, setShowSkipButton] = useState(false); // Reactivated skip button state
  const currentRateRef = useRef<number>(playbackRate);
  const isEndingRef = useRef(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  // Simplified playback rate change - no animations
  const changePlaybackRate = useCallback((newRate: number) => {
    if (videoRef.current && currentRateRef.current !== newRate) {
      videoRef.current.playbackRate = newRate;
      currentRateRef.current = newRate;
    }
  }, []);

  // Reactivated skip handler
  const handleSkip = useCallback(() => {
    if (isEndingRef.current) return;
    
    isEndingRef.current = true;
    setIsEnding(true);
    onFadeStart();
    
    setTimeout(() => {
      document.body.classList.remove('no-scroll');
      onVideoEnd();
    }, 500); // Even shorter timeout
  }, [onFadeStart, onVideoEnd]);

  // Video loaded handler
  const handleVideoLoaded = useCallback(() => {
    setVideoLoaded(true);
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
      currentRateRef.current = playbackRate;
    }
  }, [playbackRate]);

  // Initial setup
  useEffect(() => {
    document.body.classList.add('no-scroll');
    
    // Show skip button after delay
    const skipButtonTimer = setTimeout(() => {
      setShowSkipButton(true);
    }, 1000);
    
    return () => {
      document.body.classList.remove('no-scroll');
      clearTimeout(skipButtonTimer);
    };
  }, []);

  // Video event handlers - heavily optimized
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !videoLoaded) return;
    
    // Use fewer updates - higher throttle interval
    let lastUpdateTime = 0;
    const throttleInterval = 250; // Less frequent updates for better performance
    
    const handleTimeUpdate = () => {
      const now = performance.now();
      if (now - lastUpdateTime < throttleInterval) return;
      lastUpdateTime = now;
      
      // Simpler playback rate switching - just once near the end
      if (videoElement.duration - videoElement.currentTime < 2) {
        changePlaybackRate(3);
        
        // Check for ending only once we're close to the end
        if (videoElement.duration - videoElement.currentTime < 2 && !isEndingRef.current) {
          isEndingRef.current = true;
          setIsEnding(true);
          onFadeStart();
        }
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
      <VideoElement 
        videoRef={videoRef}
        videoSrc={videoSrc}
        onLoaded={handleVideoLoaded}
      />
      
      {showSkipButton && (
        <button 
          className="skip-button"
          onClick={handleSkip}
          aria-label="Skip intro video"
        >
          <div className="skip-button-content">
            <span className="skip-text">Skip</span>
            <svg 
              className="skip-icon" 
              viewBox="0 0 24 24" 
              width="20" 
              height="20" 
              fill="none"
              stroke="currentColor" 
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="5 4 15 12 5 20 5 4"></polygon>
              <line x1="19" y1="5" x2="19" y2="19"></line>
            </svg>
          </div>
        </button>
      )}
    </div>
  );
});

export default VideoHero;

import React, { useEffect, useRef, useState } from 'react';
import './VideoHero.css';

interface VideoHeroProps {
  onVideoEnd: () => void;
  onFadeStart: () => void;
  playbackRate?: number; // This will now be the initial playback rate
}

const VideoHero: React.FC<VideoHeroProps> = ({ 
  onVideoEnd, 
  onFadeStart,
  playbackRate = 2 // Default to 2x speed initially
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isEnding, setIsEnding] = useState(false);
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

  useEffect(() => {
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
          onFadeStart(); // Signal that video is starting to fade out
        }
      };

      const handleEnded = () => {
        onVideoEnd();
      };

      videoElement.addEventListener('timeupdate', handleTimeUpdate);
      videoElement.addEventListener('ended', handleEnded);
      
      // Add event listener for when the video loads to ensure initial playback rate is set
      videoElement.addEventListener('loadeddata', () => {
        videoElement.playbackRate = playbackRate;
        currentRateRef.current = playbackRate;
      });

      return () => {
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
        videoElement.removeEventListener('ended', handleEnded);
        videoElement.removeEventListener('loadeddata', () => {});
        
        // Clean up any ongoing animation
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [onVideoEnd, onFadeStart, isEnding, playbackRate]);

  return (
    <div className={`video-hero-container ${isEnding ? 'fade-out' : ''}`}>
      <video 
        ref={videoRef}
        className="video-element"
        autoPlay
        muted
        playsInline
      >
        <source 
          src="https://res.cloudinary.com/dlrlet9fg/video/upload/v1742204358/04_Final_Render_1_1_fyrxbv.mp4" 
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default VideoHero;

import React, { useEffect, useRef, useState } from 'react';
import './VideoHero.css';

interface VideoHeroProps {
  onVideoEnd: () => void;
  onFadeStart: () => void;
}

const VideoHero: React.FC<VideoHeroProps> = ({ onVideoEnd, onFadeStart }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isEnding, setIsEnding] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const handleTimeUpdate = () => {
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

      return () => {
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
        videoElement.removeEventListener('ended', handleEnded);
      };
    }
  }, [onVideoEnd, onFadeStart, isEnding]);

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

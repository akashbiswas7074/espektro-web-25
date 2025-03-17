import React from 'react';
import { useAnimation } from '../../context/AnimationContext';

const AudioControls: React.FC = () => {
  const { isAudioPlaying, setIsAudioPlaying, setShouldPlayAudio } = useAnimation();

  const toggleAudio = () => {
    const newState = !isAudioPlaying;
    setIsAudioPlaying(newState);
    setShouldPlayAudio(newState);
    
    // Add user interaction flag
    document.documentElement.classList.add('user-interaction');
    
    // Log state change
    console.log(`Audio ${newState ? 'enabled' : 'disabled'} by user`);
  };

  return (
    <button 
      onClick={toggleAudio}
      className="fixed bottom-4 right-4 z-50 p-2 rounded-full bg-[#8b4513]/70 text-[#f2e8c9] hover:bg-[#654321]/90 transition-all border-2 border-[#e0d4b4]"
      aria-label={isAudioPlaying ? "Mute sound" : "Unmute sound"}
    >
      {isAudioPlaying ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
      )}
    </button>
  );
};

export default AudioControls;

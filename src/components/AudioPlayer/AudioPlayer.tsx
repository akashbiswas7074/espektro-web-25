import React, { useEffect, useState } from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import './AudioPlayer.css';

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Create an invisible button for the first user interaction
    const invisibleButton = document.createElement('button');
    invisibleButton.style.position = 'fixed';
    invisibleButton.style.top = '0';
    invisibleButton.style.left = '0';
    invisibleButton.style.width = '100%';
    invisibleButton.style.height = '100%';
    invisibleButton.style.opacity = '0';
    invisibleButton.style.cursor = 'pointer';
    invisibleButton.style.zIndex = '9999';
    document.body.appendChild(invisibleButton);
    
    const audioElement = document.getElementById('background-audio') as HTMLAudioElement;
    
    const startAudio = () => {
      if (audioElement) {
        audioElement.play()
          .then(() => {
            setIsPlaying(true);
            // Remove the invisible button once audio starts
            document.body.removeChild(invisibleButton);
          })
          .catch(error => {
            console.error("Failed to play audio:", error);
          });
      }
    };
    
    invisibleButton.addEventListener('click', startAudio);
    
    return () => {
      if (document.body.contains(invisibleButton)) {
        document.body.removeChild(invisibleButton);
      }
    };
  }, []);
  
  const toggleAudio = () => {
    const audioElement = document.getElementById('background-audio') as HTMLAudioElement;
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
        setIsPlaying(false);
      } else {
        audioElement.play()
          .then(() => setIsPlaying(true))
          .catch(err => console.error("Error playing audio:", err));
      }
    }
  };
  
  return (
    <>
      <audio id="background-audio" loop src={src} style={{ display: 'none' }} />
      <button onClick={toggleAudio} className="audio-toggle-btn">
        {isPlaying ? <FaVolumeUp /> : <FaVolumeMute />}
      </button>
    </>
  );
};

export default AudioPlayer;

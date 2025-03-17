import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { AudioProvider } from './context/AudioContext';

// Create a silent audio element to enable audio context
// This helps bypass autoplay restrictions in some browsers
const enableAudioContext = () => {
  // Create a short, silent audio buffer
  const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContext) return;
  
  const audioContext = new AudioContext();
  const gainNode = audioContext.createGain();
  gainNode.gain.value = 0.001; // Very low volume, essentially silent
  gainNode.connect(audioContext.destination);
  
  // Create an oscillator for a brief moment
  const oscillator = audioContext.createOscillator();
  oscillator.connect(gainNode);
  oscillator.start(0);
  oscillator.stop(0.001); // Stop almost immediately
  
  // Resume the audio context if it's suspended
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
};

// Try to enable audio immediately
enableAudioContext();

// Also enable on various user interactions
const userActions = ['click', 'touchstart', 'keydown'];
userActions.forEach(action => {
  document.addEventListener(action, enableAudioContext, { once: true });
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AudioProvider audioSrc="/audio/CLipped.mp3">
        <App />
      </AudioProvider>
    </BrowserRouter>
  </React.StrictMode>
);

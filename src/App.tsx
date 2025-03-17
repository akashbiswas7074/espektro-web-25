import "./App.css";
import "./styles/cloudBackground.css";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/landing/Error404";
import BackgroundAudio from "./components/BackgroundAudio/BackgroundAudio";
import AudioAutoPlay from "./components/AudioAutoPlay/AudioAutoPlay";
import audioService from "./services/AudioService";

// Import the audio file
import audioFile from "./assets/Sequence 01_46 (1).mp3";

// Lazy loaded components
const HomeScreen = lazy(() => import("./pages/landing"));
const EventScreen = lazy(() => import("./pages/eventsV2"));
const AccomodationScreen = lazy(() => import("./pages/accomodation"));
const ArtistSection = lazy(() => import("./pages/landing/components/artist-v5"));
const MerchandiseScreen = lazy(() => import("./pages/merchandise"));

const App: React.FC = () => {
  const [audioEnabled, setAudioEnabled] = useState(false);

  // Initialize the global audio service and enable autoplay
  useEffect(() => {
    // Initialize audio service
    audioService.initialize(audioFile, 0.3);
    
    // Force play audio in all possible scenarios
    const forceAudio = () => {
      audioService.play();
      setAudioEnabled(true);
      document.body.classList.add('audio-enabled');
    };
    
    // Add listeners for various events
    document.addEventListener('click', forceAudio, { once: true });
    document.addEventListener('touchstart', forceAudio, { once: true });
    document.addEventListener('keydown', forceAudio, { once: true });
    window.addEventListener('load', forceAudio, { once: true });
    
    // Create a setTimeout as another attempt
    const timeoutId = setTimeout(forceAudio, 1000);
    
    // Auto-click a hidden button after a brief delay
    const clickId = setTimeout(() => {
      const autoClickButton = document.getElementById('audio-autoplay-button');
      if (autoClickButton) {
        autoClickButton.click();
        console.log('Auto-clicked the audio button');
      }
    }, 500);
    
    // Function to simulate click on the audio button
    const triggerAudioButton = () => {
      const audioButton = document.querySelector('.audio-control-button');
      if (audioButton && !localStorage.getItem('audioButtonClicked')) {
        (audioButton as HTMLButtonElement).click();
        localStorage.setItem('audioButtonClicked', 'true');
      }
    };

    // Try multiple times to ensure the button is clicked
    setTimeout(triggerAudioButton, 1000);
    window.addEventListener('load', triggerAudioButton);

    return () => {
      audioService.dispose();
      document.removeEventListener('click', forceAudio);
      document.removeEventListener('touchstart', forceAudio);
      document.removeEventListener('keydown', forceAudio);
      window.removeEventListener('load', forceAudio);
      window.removeEventListener('load', triggerAudioButton);
      clearTimeout(timeoutId);
      clearTimeout(clickId);
    };
  }, []);

  return (
    <>
      {/* <div className="cloud-background"></div> */}
      
      {/* Aggressive auto-play component */}
      <AudioAutoPlay audioSrc={audioFile} volume={0.3} />
      
      {/* Hidden button for auto-clicking */}
      <button 
        id="audio-autoplay-button" 
        style={{ display: 'none' }}
        onClick={() => {
          audioService.play();
          setAudioEnabled(true);
        }}
      >
        Enable Audio
      </button>
      
      {/* Visible audio controls */}
      <BackgroundAudio 
        audioSrc={audioFile} 
        initialVolume={0.3}
      />
      
      {/* Audio notification if autoplay fails */}
      {!audioEnabled && (
        <div className="audio-notification">
          <p>Click anywhere for the full experience with audio</p>
        </div>
      )}
      
      <Suspense fallback={<div className="loading-screen">Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/events" element={<EventScreen />} />
          <Route path="/accomodation" element={<AccomodationScreen />} />
          <Route path="/artists" element={<ArtistSection />} />
          <Route path="/espektro-merchandise" element={<MerchandiseScreen />} />
          
          {/* 404 Error page */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
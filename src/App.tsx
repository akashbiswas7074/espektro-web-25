import "./App.css";
import "./styles/cloudBackground.css";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components-global/navbar/navbar";
import ErrorPage from "./pages/landing/Error404";
import {EventsV2} from './pages/eventsV2/index';
import HomeScreen from './pages/landing';
import ArtistsPage from './pages/landing/components/artist-v5';
import AccomodationScreen from "./pages/accomodation";
// Import correctly using the named export
// import  AudioProvider from './services/AudioService';
// import AudioControl from './components/AudioControl/AudioControl';

const App: React.FC = () => {
  const [_loading, setLoading] = useState(true);

  useEffect(() => {
    // Apply old paper effect to the document body
    document.body.classList.add('old-paper-theme');
    
    // Simulate loading complete after resources are loaded
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => {
      clearTimeout(timer);
      document.body.classList.remove('old-paper-theme');
    };
  }, []);

  return (
    <><div className="font-medieval">
      <Navbar />
      {/* <AudioControl showDelay={1000} /> */}
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/events" element={<EventsV2 />} />
        <Route path="/artists" element={<ArtistsPage />} />
        <Route path="/accomodation" element={<AccomodationScreen/>} /> 
        {/* <Route path="/espektro-merchandise" element={<MerchandiseScreen />} /> */}
        <Route path="*" element={<ErrorPage />} />
      </Routes></div></>
    
  );
};

export default App;
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MapHero.css';

interface MapHeroProps {
  onNavigate?: () => void;
}

const MapHero: React.FC<MapHeroProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="map-hero-container">
      <div className="map-base">
        <div className={`center-content ${isVisible ? 'visible' : ''}`}>
          <div className="logo-container">
            <h1 className="espektro-title">ESPEKTRO</h1>
            <p className="espektro-tagline">3rd to 6th APRIL</p>
          </div>
          <Link to="/events" className="float-button" onClick={onNavigate}>
            Explore Events
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MapHero;

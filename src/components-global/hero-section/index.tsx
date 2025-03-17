import React, { useEffect, useState } from 'react';
import './styles.css';

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animate hero section on load
    setIsVisible(true);
    
    // Cleanup function
    return () => {
      setIsVisible(false);
    };
  }, []);

  return (
    <div className={`hero-section ${isVisible ? 'visible' : ''}`}>
      <div className="hero-content">
        <h1 className="hero-title">ESPEKTRO 2K25</h1>
        <p className="hero-subtitle">The Annual Techno-Cultural Festival</p>
        <div className="hero-cta">
          <button className="primary-button">Explore Events</button>
          <button className="secondary-button">Register Now</button>
        </div>
      </div>
      <div className="hero-background"></div>
    </div>
  );
};

export default HeroSection;

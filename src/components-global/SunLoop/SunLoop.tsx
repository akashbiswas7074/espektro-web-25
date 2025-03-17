import React, { useEffect, useState } from 'react';
import './SunLoop.css';

interface SunLoopProps {
  isVisible: boolean;
}

const SunLoop: React.FC<SunLoopProps> = ({ isVisible }) => {
  const [stars, setStars] = useState<JSX.Element[]>([]);

  // Generate random stars on component mount
  useEffect(() => {
    if (isVisible) {
      const newStars = [];
      const count = 100; // Number of stars to generate
      
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 4 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 30 + 10;
        const delay = Math.random() * 15;
        
        newStars.push(
          <div
            key={i}
            className="star"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${x}%`,
              top: `${y}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`
            }}
          />
        );
      }
      
      setStars(newStars);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="sun-loop-container">
      <div className="sun-wrapper">
        <div className="sun-element"></div>
        <div className="sun-rays"></div>
      </div>
      {stars}
    </div>
  );
};

export default SunLoop;

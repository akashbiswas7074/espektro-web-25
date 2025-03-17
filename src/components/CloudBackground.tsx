import React from 'react';

interface CloudBackgroundProps {
  opacity?: number;
  speed?: number;
}

const CloudBackground: React.FC<CloudBackgroundProps> = ({ 
  opacity = 0.15, 
  speed = 1 
}) => {
  const backgroundStyle = {
    '--cloud-opacity': opacity,
    '--cloud-speed-1': `${110 / speed}s`,
    '--cloud-speed-2': `${100 / speed}s`,
  } as React.CSSProperties;

  return (
    <div className="cloud-background" style={backgroundStyle}></div>
  );
};

export default CloudBackground;

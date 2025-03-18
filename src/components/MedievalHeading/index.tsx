import React from 'react';

interface MedievalHeadingProps {
  text: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
}

const MedievalHeading: React.FC<MedievalHeadingProps> = ({
  text,
  size = 'lg',
  color = 'text-floral',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-xl md:text-2xl',
    md: 'text-2xl md:text-3xl',
    lg: 'text-3xl md:text-4xl',
    xl: 'text-4xl md:text-5xl'
  };

  return (
    <h2 
      className={`font-medieval ${sizeClasses[size]} ${color} tracking-wider drop-shadow-md ${className}`}
    >
      {text}
    </h2>
  );
};

export default MedievalHeading;

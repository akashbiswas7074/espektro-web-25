import React from 'react';

interface VintageButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const VintageButton: React.FC<VintageButtonProps> = ({
  children,
  onClick,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3 
        font-medieval 
        bg-vintage-brown-medium 
        hover:bg-vintage-brown 
        text-vintage-parchment
        border-2 border-vintage-brown-dark
        rounded-md
        transition-all duration-300
        shadow-md hover:shadow-lg
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default VintageButton;

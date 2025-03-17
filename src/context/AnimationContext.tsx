import React, { createContext, useContext, useState } from 'react';

interface AnimationContextType {
  isAudioPlaying: boolean;
  setIsAudioPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  shouldPlayAudio: boolean;
  setShouldPlayAudio: React.Dispatch<React.SetStateAction<boolean>>;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [shouldPlayAudio, setShouldPlayAudio] = useState(false);

  return (
    <AnimationContext.Provider 
      value={{ 
        isAudioPlaying,
        setIsAudioPlaying,
        shouldPlayAudio,
        setShouldPlayAudio
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};

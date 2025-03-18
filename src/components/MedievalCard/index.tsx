import React from 'react';
import MedievalHeading from '../MedievalHeading';

interface MedievalCardProps {
  title: string;
  content: string;
  imageUrl?: string;
  className?: string;
}

const MedievalCard: React.FC<MedievalCardProps> = ({
  title,
  content,
  imageUrl,
  className = '',
}) => {
  return (
    <div className={`border-2 border-amber-800 bg-amber-950/50 rounded-md p-5 max-w-md ${className}`}>
      <MedievalHeading text={title} size="md" />
      
      {imageUrl && (
        <div className="my-4">
          <img 
            src={imageUrl} 
            alt={title} 
            className="rounded border border-amber-700 w-full" 
          />
        </div>
      )}
      
      <p className="font-medieval text-base leading-relaxed text-amber-100 mt-3">
        {content}
      </p>
    </div>
  );
};

export default MedievalCard;

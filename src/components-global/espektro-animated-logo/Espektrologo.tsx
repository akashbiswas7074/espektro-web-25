import { motion } from 'framer-motion';
import React from 'react';

const Espektrologo: React.FC<{
  repeatDelay?: number;
}> = ({ repeatDelay = 3 }) => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      height="100"
      viewBox="0 0 314 327"
      style={{
        width: '100%',
        height: '100%',
      }}
      stroke="white"
    >
      <style type="text/css"></style>
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'loop',
          repeatDelay: repeatDelay,
        }}
        strokeWidth={4}
        strokeDasharray="0 1"
        fill="none"
        className="st0"
        d="M156.29,180.99c11.61-1.74,21.94-3.92,32.38-4.7c14.21-1.06,28.52-1.66,42.74-1.15
c4.29,0.16,8.43,4.67,12.63,7.19c-0.24,0.85-0.48,1.7-0.73,2.55c-28.73,2.46-57.47,4.91-86.57,7.4c0,25.54,0,50.14,0,75.4
c51.28,4.79,103.73,6.82,142.69,49.41c-6.2,5.18-10.46,4.83-16.18-0.36c-19.73-17.89-43.62-27.31-69.75-30.55
c-18.45-2.29-37.08-3.08-56.19-4.59c-0.68,3.77-1.22,6.74-1.8,9.91c-14.63,0-28.82,0-44.03,0c4.27-18.66-11.76-14.9-20.61-19.02
c-11.1-5.18-22.67-9.34-33.78-14.5c-16.92-7.85-17.99-36.28,3.53-47.81c13.58-7.27,28.29-12.71,42.96-17.54
c6.29-2.07,7.96-4.51,7.91-10.57c-0.23-29.52-0.11-59.04-0.11-90.63c15.16,10.41,29.04,19.65,42.48,29.5
c1.92,1.41,2.27,5.77,2.31,8.78C156.4,146.26,156.29,162.81,156.29,180.99z M111.06,265.79c0-22.38,0-42.71,0-65.36
c-12.73,6.05-24.86,10.63-35.75,17.25c-18.58,11.31-17.57,27.45,2.19,36.62C87.67,259.03,98.81,261.68,111.06,265.79z"
      />
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'loop',
          repeatDelay: repeatDelay,
        }}
        strokeWidth={4}
        strokeDasharray="0 1"
        fill="none"
        className="st0"
        d="M77.6,123.46c-17.09,1.76-33.79-0.06-49.91-6.25c-3.22-1.24-6.39-3.02-9.06-5.19
c-13.79-11.24-14.72-23.4,0.82-36.89C33.42,63,49.64,53.04,65.96,44.13c27.9-15.23,58.69-22.62,89.88-26.99
c23.82-3.33,48.1-4.42,71.87,1.23c13.49,3.21,27.28,6.46,39.8,12.18c26.54,12.13,38.58,39.01,30.67,66.9
c-5.38,18.98-17.57,33.67-32.42,46.14c-0.78-0.42-1.56-0.83-2.35-1.25c1.36-2.53,2.36-5.35,4.13-7.56
c11.72-14.59,22.39-29.28,21.63-49.62c-0.64-16.84-7.97-29.75-21.08-38.97c-18.98-13.35-40.84-18.97-63.85-19.79
c-13.7-0.48-27.49-0.88-41.14,0.05c-49.64,3.37-95.98,17.4-135.53,48.29c-14.77,11.54-17.19,26.13,3.87,35.1
c11.41,4.86,24.57,5.63,36.93,8.24c3.29,0.69,6.58,1.35,9.87,2.03C78.03,121.24,77.82,122.35,77.6,123.46z"
      />
    </svg>
  );
};

export default Espektrologo;

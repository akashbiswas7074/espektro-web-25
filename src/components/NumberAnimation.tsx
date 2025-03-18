import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface NumberAnimationProps {
  endValue: number;
  duration?: number;
  unit?: string;
  className?: string;
}

const NumberAnimation: React.FC<NumberAnimationProps> = ({
  endValue,
  duration = 2000,
  unit = '',
  className = '',
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<number>(0);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      const start = Date.now();
      const end = start + duration;
      
      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - start) / duration, 1);
        const value = Math.floor(progress * endValue);
        
        if (countRef.current !== value) {
          countRef.current = value;
          setCount(value);
        }
        
        if (now < end) {
          requestAnimationFrame(animate);
        } else {
          setCount(endValue);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [inView, endValue, duration]);

  return (
    <span ref={ref} className={`number-animation ${className}`}>
      {count}{unit}
    </span>
  );
};

export default NumberAnimation;

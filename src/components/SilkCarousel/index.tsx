import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './styles.scss';
import './perfectFit.scss'; 
import './desktopLayout.scss'; // Import the desktop enhancements

interface SilkCarouselProps {
  children: ReactNode[];
  autoPlayInterval?: number;
  slidesToShow?: number;
  arrows?: boolean;
  theme?: 'harry-potter' | 'default';
  infinite?: boolean;
}

const SilkCarousel: React.FC<SilkCarouselProps> = ({
  children,
  autoPlayInterval = 3000,
  arrows = true,
  theme = 'default',
  infinite = true
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoScroll, _setAutoScroll] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const totalItems = children.length;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const animationDuration = 400; // Consistent animation duration in ms
  
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  
  const hasSingleItem = totalItems <= 1;
  
  const normalizedIndex = ((currentIndex % totalItems) + totalItems) % totalItems;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getOptimalHeight = () => {
    if (windowWidth >= 1800) return '660px';
    if (windowWidth >= 1400) return '630px';
    if (windowWidth >= 1200) return '600px';
    if (windowWidth >= 992) return '570px';
    if (windowWidth >= 768) return '550px';
    if (windowWidth >= 576) return '580px';
    if (windowWidth >= 360) return '650px';
    return '690px';
  };

  const goToNext = () => {
    if (hasSingleItem || isAnimating) return;
    
    setIsAnimating(true);
    
    setCurrentIndex(prev => {
      if (prev >= totalItems - 1) {
        return infinite ? 0 : prev;
      }
      return prev + 1;
    });
    
    setTimeout(() => setIsAnimating(false), animationDuration);
  };

  const goToPrev = () => {
    if (hasSingleItem || isAnimating) return;
    
    setIsAnimating(true);
    
    setCurrentIndex(prev => {
      if (prev <= 0) {
        return infinite ? totalItems - 1 : 0;
      }
      return prev - 1;
    });
    
    setTimeout(() => setIsAnimating(false), animationDuration);
  };

  useEffect(() => {
    if (hasSingleItem || !autoScroll) return;
    
    const startAutoScroll = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      
      intervalRef.current = setInterval(() => {
        if (!isHovering && !isAnimating) {
          requestAnimationFrame(() => goToNext());
        }
      }, autoPlayInterval);
    };

    startAutoScroll();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentIndex, isHovering, isAnimating, autoScroll, hasSingleItem, autoPlayInterval]);
  
  const handleMouseEnter = () => {
    if (isHovering) return;
    setIsHovering(true);
  };
  
  const handleMouseLeave = () => {
    if (!isHovering) return;
    setIsHovering(false);
  };
  
  const updateCursor = (e: React.MouseEvent) => {
    if (carouselRef.current) {
      document.documentElement.style.setProperty('--x', e.clientX.toString());
      document.documentElement.style.setProperty('--y', e.clientY.toString());
    }
  };
  
  const containerClass = `silk-carousel-container ${theme} ${hasSingleItem ? 'single-item' : ''}`;

  const renderItems = () => {
    return (
      <AnimatePresence mode="wait" initial={false}>
        {React.Children.map(children, (child, index) => {
          const isActive = index === normalizedIndex;
          
          return (
            <motion.div 
              className={`silk-carousel-item ${isActive ? 'active-card' : ''}`}
              key={index}
              initial={{ 
                opacity: 0,
                scale: 0.95,
                zIndex: isActive ? 2 : 1,
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0
              }}
              animate={{ 
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 0.9,
                zIndex: isActive ? 2 : 1,
                display: isActive ? 'block' : 'none',
                position: 'absolute',
                width: '100%',
                height: '100%'
              }}
              exit={{ 
                opacity: 0,
                scale: 0.95,
                zIndex: 1
              }}
              transition={{ 
                opacity: { duration: animationDuration / 1000 * 0.6, ease: 'easeInOut' },
                scale: { duration: animationDuration / 1000 * 0.8, ease: 'easeOut' },
                zIndex: { delay: isActive ? 0 : animationDuration / 1000 * 0.6 },
              }}
              style={{
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div className="silk-carousel-item-content">
                {child}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    );
  };

  return (
    <div 
      className={containerClass}
      ref={carouselRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={updateCursor}
      tabIndex={0}
      role="region"
      aria-label="Image carousel"
    >
      <div className="silk-carousel-track-container">
        <div 
          className="silk-carousel-track"
          style={{ 
            position: 'relative',
            width: '100%',
            maxWidth: '900px',
            margin: '0 auto',
            height: 'auto',
            minHeight: getOptimalHeight(),
            overflow: 'hidden',
            willChange: 'transform',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
        >
          {renderItems()}
        </div>
      </div>
      
      {arrows && !hasSingleItem && (
        <>
          <button 
            className={`silk-arrow prev-arrow ${theme === 'harry-potter' ? 'wizard-arrow' : ''} enhanced-arrow`}
            onClick={() => !isAnimating && goToPrev()}
            aria-label="Previous slide"
            disabled={isAnimating}
          >
            <FaChevronLeft />
          </button>
          <button 
            className={`silk-arrow next-arrow ${theme === 'harry-potter' ? 'wizard-arrow' : ''} enhanced-arrow`}
            onClick={() => !isAnimating && goToNext()}
            aria-label="Next slide"
            disabled={isAnimating}
          >
            <FaChevronRight />
          </button>
        </>
      )}
      
      {!hasSingleItem && (
        <div className="silk-carousel-indicators enhanced">
          {Array.from({ length: totalItems }).map((_, idx) => (
            <button
              key={idx}
              className={`silk-carousel-indicator ${idx === normalizedIndex ? 'active' : ''}`}
              onClick={() => {
                if (isAnimating) return;
                setIsAnimating(true);
                setCurrentIndex(idx);
                setTimeout(() => setIsAnimating(false), animationDuration);
              }}
              aria-label={`Go to slide ${idx + 1}`}
              aria-selected={idx === normalizedIndex}
              disabled={isAnimating}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SilkCarousel;
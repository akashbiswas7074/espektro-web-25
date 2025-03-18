import { useEffect, useRef } from 'react';

/**
 * Hook to optimize animations and prevent scrolling glitches
 * @param autoScrollEnabled Whether auto-scroll is enabled
 * @param isPaused Whether scrolling is paused
 * @returns Reference to the current animation frame
 */
export function useOptimizedAnimation(
  autoScrollEnabled: boolean,
  isPaused: boolean
): { requestScroll: (callback: () => void) => void } {
  const animationFrameRef = useRef<number | null>(null);
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  
  /**
   * Request a scrolling animation frame with optimization
   * @param callback Function to execute on animation frame
   */
  const requestScroll = (callback: () => void) => {
    if (!autoScrollEnabled || isPaused) return;
    
    // Cancel any existing animation frame to prevent queuing
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    // Schedule the callback with requestAnimationFrame for smoother animations
    animationFrameRef.current = requestAnimationFrame(() => {
      callback();
      animationFrameRef.current = null;
    });
  };
  
  return { requestScroll };
}

/**
 * Debounce function to prevent rapid changes that cause flickering
 * @param func Function to debounce
 * @param wait Wait time in ms
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T, 
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

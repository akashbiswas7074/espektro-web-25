/**
 * Helper functions for SilkCarousel positioning and animation
 */

/**
 * Calculates the correct position for an item in the carousel
 * to ensure first and last items always properly position in the middle
 */
export function calculateActivePosition(
  index: number,              // Current item index
  offset: number,             // Offset for clones
  normalizedIndex: number,    // Current carousel position (normalized)
  totalItems: number,         // Total number of real items
  visibleSlides: number       // Number of visible slides
): boolean {
  // For single slide view
  if (visibleSlides === 1) {
    return index === offset + normalizedIndex;
  }
  
  const middlePosition = Math.floor(visibleSlides / 2);
  const evenAdjustment = visibleSlides % 2 === 0 ? 0.5 : 0;
  
  // Special handling for first card
  if (normalizedIndex === 0) {
    return index === offset; // First real item position
  }
  
  // Special handling for last card
  if (normalizedIndex === totalItems - 1) {
    return index === offset + totalItems - 1; // Last real item position
  }
  
  // Normal middle position calculation
  return index === offset + normalizedIndex + middlePosition - evenAdjustment;
}

/**
 * Calculates track position for infinite scrolling
 */
export function calculateTrackPosition(
  currentIndex: number,
  totalItems: number,
  visibleSlides: number,
  numClones: number,
  isLooping: boolean
): string {
  let offset = 0;
  
  // Calculate offset for loop transitions
  if (isLooping) {
    if (currentIndex === 0) {
      offset = -totalItems * (100 / visibleSlides);
    } else if (currentIndex >= totalItems - 1) {
      offset = totalItems * (100 / visibleSlides);
    }
  }
  
  // Base position accounting for clones
  const basePosition = (currentIndex * (100 / visibleSlides)) + numClones * (100 / visibleSlides);
  
  // Return the final X position
  return `-${basePosition + offset}%`;
}

/**
 * Calculates the correct transition properties based on current state
 */
export function getTransitionProps(isLooping: boolean, loopDirection: 'first' | 'last' | null): {
  type: string;
  stiffness: number;
  damping: number;
  duration?: number;
} {
  if (isLooping) {
    return {
      type: "tween",
      stiffness: 0, // Not used in tween
      damping: 0,    // Not used in tween
      duration: loopDirection ? 0.4 : 0.3
    };
  }
  
  return {
    type: "spring",
    stiffness: 300,
    damping: 30
  };
}

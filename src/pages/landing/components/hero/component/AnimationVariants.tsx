
// Add staggering effect to the children of the container
export const letterContainerVariants = {
    before: { transition: { staggerChildren: 0.015 } },
    after: { transition: { staggerChildren: 0.03 } }
  };
  
  // Variants for animating each letter
  export const letterVariants = {
    before: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    },
    after: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      }
    }
  };
  
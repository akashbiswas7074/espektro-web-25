import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { OpenTreeLeft, OpenTreeRight } from "@/data/hero";

// Import your cloud images
interface CloudAnimationProps {
  setCloudAnim: React.Dispatch<React.SetStateAction<boolean>>;
  delay: number;
}

const SideTrees = ({ setCloudAnim, delay }: CloudAnimationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const cloudVariants = {
    openLeft: { x: "-100vw" },
    openRight: { x: "100vw" },
    closedLeft: { x: "0vw" },
    closedRight: { x: "0vw" },
  };

  const handleAnimationComplete = () => {
    setCloudAnim(true);
    setIsHidden(true);
  };

  useEffect(() => {
    setIsOpen(true);
  }, []);

  if (isHidden) return null;

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden z-[40]">
      {/* Left Cloud Image */}
      <motion.img
        className="absolute left-0 h-screen w-auto object-cover lg:w-screen opacity-1"
        src={OpenTreeLeft} // Set to the left cloud image
        initial="closedLeft"
        animate={isOpen ? "openLeft" : "closedLeft"}
        variants={cloudVariants}
        transition={{ duration: 2, ease: "easeOut", delay: delay }}
        onAnimationComplete={handleAnimationComplete}
        style={{ zIndex: 50, willChange: "transform" }}
        alt="Left Cloud"
      />

      {/* Right Cloud Image */}
      <motion.img
        className="absolute right-0 h-screen w-auto object-cover lg:w-screen opacity-1"
        src={OpenTreeRight} // Set to the right cloud image
        initial="closedRight"
        animate={isOpen ? "openRight" : "closedRight"}
        variants={cloudVariants}
        transition={{ duration: 2, ease: "easeOut", delay: delay }}
        onAnimationComplete={handleAnimationComplete}
        style={{ zIndex: 50, willChange: "transform" }}
        alt="Right Cloud"
      />
    </div>
  );
};

export default SideTrees;

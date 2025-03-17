import { motion } from "framer-motion";
import { leftFullTree, rightFullTree } from "@/data/heroForest";

const ForestSideTrees = () => {
  return (
    <div className="hidden sm:block absolute inset-0 w-screen h-screen overflow-hidden z-[30]">
      {/* Left Tree */}
      <motion.img
        className="absolute left-0 h-full w-auto "
        src={leftFullTree}
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 2.5, ease: "easeInOut", delay: 3 }}
        style={{ zIndex: 40 }}
        alt="Left Tree"
      />

      {/* Right Tree */}
      <motion.img
        className="absolute right-0 h-full w-auto "
        src={rightFullTree}
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 2.5, ease: "easeInOut", delay: 3 }}
        style={{ zIndex: 40 }}
        alt="Right Tree"
      />
    </div>
  );
};

export default ForestSideTrees;

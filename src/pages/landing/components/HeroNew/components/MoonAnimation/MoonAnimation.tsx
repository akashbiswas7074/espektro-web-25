import { motion } from "framer-motion";
import { moonImage } from "@/data/heroForest";

const TopTrees = () => {
  return (
    <div className="absolute inset-0 w-screen h-screen overflow-hidden z-[10]">
      {/* Top Tree Canopy */}
      <motion.img
        className="absolute top-0 md:w-full w-auto md:h-auto h-full object-cover"
        src={moonImage}
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{
          duration: 6,
          ease: "easeInOut",
          delay: 7,
        }}
        alt="Top Tree Canopy"
      />
    </div>
  );
};

export default TopTrees;

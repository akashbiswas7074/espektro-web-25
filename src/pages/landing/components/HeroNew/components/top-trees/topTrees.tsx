import { motion } from "framer-motion";
import { topTree } from "@/data/heroForest";

const TopTrees = () => {
  return (
    <div className="absolute inset-0 w-screen h-screen overflow-hidden z-[30]">
      {/* Top Tree Canopy */}
      <motion.img
        className="absolute top-0 md:w-full w-auto md:h-auto h-full object-cover"
        src={topTree}
        initial={{ y: "-100%" }}
        animate={{ y: "0%" }}
        transition={{
          duration: 2.5,
          ease: "easeInOut",
          delay: 5,
        }}
        style={{ zIndex: 30 }}
        alt="Top Tree Canopy"
      />
    </div>
  );
};

export default TopTrees;

import { motion } from "framer-motion";
import { lightRay } from "@/data/heroForest";

const TopTrees = () => {
  return (
    <div className="absolute inset-0 w-screen h-screen overflow-hidden z-[60]">
      {/* Top Tree Canopy */}
      <motion.img
        className="absolute top-0 md:w-full w-auto md:h-auto h-full object-cover opacity-[40%]"
        src={lightRay}
        initial={{ y: "-100%" }}
        animate={{ y: "0%" }}
        transition={{
          duration: 2.5,
          ease: "easeInOut",
          delay: 5,
        }}
        alt="Top Tree Canopy"
      />
    </div>
  );
};

export default TopTrees;

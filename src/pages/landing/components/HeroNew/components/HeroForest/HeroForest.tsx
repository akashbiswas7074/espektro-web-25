import { motion } from "framer-motion";
import { bgArray } from "@/data/heroForest";
import MoonRise from "../MoonAnimation/MoonAnimation";
import LightRay from "../lightRay/lightRay";

const HeroForest = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden z-[20]">
      {bgArray.map((image, index) => (
        <motion.img
          key={index}
          src={image.image}
          alt={`Forest Layer ${index}`}
          className="absolute inset-0 w-full h-screen xl:h-auto object-cover"
          initial={{ scale: 1.2 }} // Start zoomed in
          animate={{ scale: 1 }} // Zoom out to normal
          transition={{ duration: 1.3, ease: "easeInOut", delay: 7.5 }} // Smooth transition
          style={{ zIndex: image.zIndex }}
        />
      ))}
      <MoonRise />
      <LightRay />
    </div>
  );
};

export default HeroForest;

import ForestSideTrees from "./components/ForestSideTrees/ForestSIdeTrees";
import HeroForest from "./components/HeroForest/HeroForest";
import SideTrees from "./components/side-trees/sideTrees";
import TopTrees from "./components/top-trees/topTrees";
import DeerAnimation from "./DeerAnim/DeerAnim";
import FireflyCanvas from "./FIreFlies/FIreFliesNew";

const HeroNew = ({
  setOpeningAnimEnd,
}: {
  setOpeningAnimEnd: (value: boolean) => void;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const setCloudAnim = () => {
    setOpeningAnimEnd(true);
  };

  return (
    <div className="relative bg-gradient-to-t from-[#290a31] to-[#7b0094]">
      <FireflyCanvas />
      <SideTrees setCloudAnim={setCloudAnim} delay={4} />
      <HeroForest />
      <ForestSideTrees />
      <TopTrees />
      <DeerAnimation />
    </div>
  );
};

export default HeroNew;

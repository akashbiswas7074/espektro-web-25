import React, { useState } from "react";
// import BinaryText from "./BinaryText";
// import PageSection from "./PageSection";
import { useScroll, motion, } from "framer-motion";
import { useRef } from "react";
import OutlinedHeading from "@/components-global/outlined-heading";


// import useTextScramble from "./text";
// import { useInView } from 'react-intersection-observer';

interface DataProps {
  sub: string;
  date: string;
  time: string;
  place: string;
  club: string;
}

const Datamob: React.FC<DataProps> = ({ sub, date, time, place, club }: DataProps) => {
    // const ref = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    // const { scrollYProgress } = useScroll({
    //   target: ref,
    //   offset: ["center end", "center center"],
    // });
  
    return (
       <li
        className="my-2 first:mt-0 w-[80%] mx-auto flex flex-col items-start mb-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-fit">
          <div className="transform relative inline-block">
          <div className="w-2 h-2 bg-white rotate-45 absolute -left-[40px] top-2"/>
            <h3
              className="capitalize font-bold text-[15px] text-white hover:text-orange-400"
            >
              {sub}
            </h3>
            {isHovered && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 1.3, ease: "easeInOut" }}
                className="flex flex-col"
              >
                <div className="capitalize font-small text-0.5xl font-pixelate text-green-100 -ml-0">
                  <a className="capitalize font-bold text-[15px] text-orange-400">
                    date: {'  '}
                  </a>
                  {date} {'  '} {time}
                </div>
                <div className="capitalize font-small text-0.5xl font-pixelate text-green-100 -ml-0">
                  <a className="capitalize font-bold text-[15px] text-orange-400">
                    place: {'  '}
                  </a>
                  {place}
                </div>
                <div className="capitalize font-small text-0.5xl font-pixelate text-green-100 -ml-0">
                  <a className="capitalize font-bold text-[15px] text-orange-400">
                    club: {'  '}
                  </a>
                  {club}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </li>
   
    );
  };


const Timelinemob = () => {

    const ref1 = useRef(null);
    const { scrollYProgress } = useScroll({
      target: ref1,
      offset: ["start end", "center start"],
    });
  
    return (
      <section id="timeline">
        <OutlinedHeading label="Timeline"/>
        <div className="mb-10">
          <div
            className="text-white font-pixelate text-[3rem] mx:text-[4rem] font-bold mb-10  mt-20">
          <div className="overflow-x-hidden w-full pt-5 sm:hidden text-xl shad relative">
    <h2 className=" flex flex-row max-w-sm md:max-w-max mx-0  font-pixelate  text-left font-bold mb-10 pt-4 md:pt-0 uppercase md:w-max relative">
   
    
    </h2>
  </div>
  </div>
          < div ref={ref1} className="lg:flex lg:justify-between">
            {/* Mobile view (alternating columns) */}
            <div className="lg:hidden mt-4 ml-4">

            <div ref={ref1} className="w-[75%] mx-auto relative lg:w-[90%] mx:w-full">
  <motion.div style={{scaleY:scrollYProgress}} className="absolute -left-[37px] top-0 w-[2px] h-full bg-white origin-top mx:w-[3px] lg:w-[4px] xs:w-[2px] mx:left-[30px]   lg:left-9 xs:left-[20px]"/>
  {/* day1 */}
  <motion.div >
    <h1 className="capitalize font-bold text-[30px]  text-orange-400 absolute text1 left-0 -mt-4 "> Day 1</h1>
  <div className="w-4 h-4 bg-white rotate-45 absolute -left-[44px]"/>
  <div className="flex flex-col mt-10 ">
  <ul className="w-full flex flex-col items-start justify-between ml-4 mt-11  xs:ml-2" >
  <Datamob
                sub="Freefire,E Football, Clash of Clans"
                date="21th March"
               time="10:00 AM"
                place="ECE/EE CLASSROOM"
               club ="NOSCOPE-KGEC"
              />
               <Datamob
                sub="Freefire,E Football, Clash of Clans"
                date="21th March"
               time="10:00 AM"
                place="ECE/EE CLASSROOM"
               club ="NOSCOPE-KGEC"
              />
              <Datamob
                sub="Freefire,E Football, Clash of Clans"
                date="21th March"
               time="10:00 AM"
                place="ECE/EE CLASSROOM"
               club ="NOSCOPE-KGEC"
              />
              </ul></div></motion.div>
              {/* day3 */}
              <motion.div initial={{y:"100%" ,}} 
  whileInView={{y:"0%"}}
  transition={{duration:0.5, type:"spring"}} >
    <h1 className="capitalize font-bold text-[30px]  text-orange-400 absolute left-0 -mt-4"> Day 1</h1>
  <div className="w-4 h-4 bg-white rotate-45 absolute -left-[44px]"/>
  <div className="flex flex-col mt-10 ">
  <ul className="w-full flex flex-col items-start justify-between ml-4 mt-11  xs:ml-2" >
  <Datamob
                sub="Freefire,E Football, Clash of Clans"
                date="21th March"
               time="10:00 AM"
                place="ECE/EE CLASSROOM"
               club ="NOSCOPE-KGEC"
              />
               <Datamob
                sub="Freefire,E Football, Clash of Clans"
                date="21th March"
               time="10:00 AM"
                place="ECE/EE CLASSROOM"
               club ="NOSCOPE-KGEC"
              />
              <Datamob
                sub="Freefire,E Football, Clash of Clans"
                date="21th March"
               time="10:00 AM"
                place="ECE/EE CLASSROOM"
               club ="NOSCOPE-KGEC"
              />
              </ul></div></motion.div>
              <motion.div initial={{y:"100%" ,}} 
  whileInView={{y:"0%"}}
  transition={{duration:0.5, type:"spring"}} >
    <h1 className="capitalize font-bold text-[30px]  text-orange-400 absolute left-0 -mt-4"> Day 1</h1>
  <div className="w-4 h-4 bg-white rotate-45 absolute -left-[44px]"/>
  <div className="flex flex-col mt-10 ">
  <ul className="w-full flex flex-col items-start justify-between ml-4 mt-11  xs:ml-2" >
  <Datamob
                sub="Freefire,E Football, Clash of Clans"
                date="21th March"
               time="10:00 AM"
                place="ECE/EE CLASSROOM"
               club ="NOSCOPE-KGEC"
              />
               <Datamob
                sub="Freefire,E Football, Clash of Clans"
                date="21th March"
               time="10:00 AM"
                place="ECE/EE CLASSROOM"
               club ="NOSCOPE-KGEC"
              />
              <Datamob
                sub="Freefire,E Football, Clash of Clans"
                date="21th March"
               time="10:00 AM"
                place="ECE/EE CLASSROOM"
               club ="NOSCOPE-KGEC"
              />
              </ul></div></motion.div>
              {/* end */}
        </div></div>
            </div>
          </div>
        
      </section>
    );
  };
  
  export default Timelinemob;
  
  
  
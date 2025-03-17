import React from "react";
// import BinaryText from "./BinaryText";
// import PageSection from "./PageSection";
import { useScroll, motion } from "framer-motion";
import { useRef } from "react";
// import useTextScramble from "./text";
// import { useInView } from 'react-intersection-observer';

interface DataProps {
  days: string;
  date: string;
  des: string;
  links: string;
  add: string;
}

const Data2: React.FC<DataProps> = ({ days, date, des, links, add }: DataProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["center end", "center center"],
  });

  return (
    <li
      ref={ref}
      className=" first:mt-0 lg:w-full w-[60%] mx-auto flex flex-col items-center justify-between mx:w-[80%]  "
    >
     <figure className="absolute -left-[37px] stroke-green-600 ">
        <svg
          className="-rotate-90 mx:w-[60px] mx:h-[60px] xs:w-[60px] xs:h-[60px]"
          width="75"
          height="75"
          viewBox="0 0 100 100"
        >
          <circle cx="75" cy="50" r="23" className="stroke-none  stroke-3 fill-black" />
          <motion.circle
            style={{ pathLength: scrollYProgress }}
            cx="75"
            cy="50"
            r="23"
            className="stroke-[5px] fill-none"
          />
        </svg>
        <svg className="absolute left-7 top-2 " height="19" viewBox="0 0 20 20">
          <path
            className="animate-pulse stroke-1 fill-green-100"
            viewBox="0 0 20 20"
            d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
          />
        </svg>
      </figure>
      <motion.div  initial={{ opacity: 0, y: "36%" ,x:"36%"}}
      viewport={{ once: true, amount: 0.8 }}
              whileInView={{ opacity: 1, y: 0 ,x:0}}
              
              transition={{ duration: 0.3,delay:0.3 }} className="transform -top-[1px] -left-[190px] relative  inline-block w-[40px] h-[40px] bg-green-100 bg-opacity-60 bg z-10   "  />
      <motion.div  initial={{ opacity: 0, y: "36%" ,x:"36%"}}
      viewport={{ once: true, amount: 0.8 }}
              whileInView={{ opacity: 1, y: 0 ,x:0}}
              transition={{ duration: 0.3, }} className="transform   py-2 px-4 relative inline-block w-[350px]  bg-green-700 z-10  "  style={{ pathLength: scrollYProgress }}>
      
       <motion.div  initial={{ opacity: 0, y: "36%" ,x:"36%"}}
       viewport={{ once: true, amount: 0.8 }}
              whileInView={{ opacity: 1, y: 0 ,x:0}}
              transition={{ duration: 0.3, }} className="transform  -mt-8 -ml-8 relative inline-block w-[350px]    bg-black   border-[3px] border-solid border-green-700 "  >
        <h3 className="capitalize font-bold text-1.5xl font-pixelate text-green-600 sm:text-xl xs:text-lg mx-4 my-4 ">
          {days}{" "}
        </h3>{" "}
        <a
          className="capitalize font-small text-0.5xl font-pixelate text-green-100  "
          href={links}
        ></a>
        <span className="capitalize font-thin text-1.1xl  sm:text-xl xs:text-lg font-pixelate text-white xs:text-sm mx-4 my-4  opacity-60">
          {date}  {add}
        </span>
        <p className="font-thin text-lg  text-white sm:text-xl font-pixelate xs:text-lg w-full mx:text-sm mx-4 my-4 ">
          {des}
        </p></motion.div>
      </motion.div>
    </li>
  );
};


const Data: React.FC<DataProps> = ({ days, date, des, links, add }: DataProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["center end", "center center"],
  });

  return (
    <li
      ref={ref}
      className=" first:mt-0 lg:w-full w-[60%] mx-auto flex flex-col items-center justify-between mx:w-[80%]  "
    >
     <figure className="absolute -right-[37px] stroke-green-600 ">
        <svg
          className="-rotate-90 mx:w-[60px] mx:h-[60px] xs:w-[60px] xs:h-[60px]"
          width="75"
          height="75"
          viewBox="0 0 100 100"
        >
          <circle cx="75" cy="50" r="23" className="stroke-none  stroke-3 fill-black" />
          <motion.circle
            style={{ pathLength: scrollYProgress }}
            cx="75"
            cy="50"
            r="23"
            className="stroke-[5px] fill-none"
          />
        </svg>
        <svg className="absolute left-7 top-2 " height="19" viewBox="0 0 20 20">
          <path
            className="animate-pulse stroke-1 fill-green-100"
            viewBox="0 0 20 20"
            d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
          />
        </svg>
      </figure>
      <motion.div  initial={{ opacity: 0, y: "-36%" ,x:"-36%"}}
      viewport={{ once: true, amount: 0.8 }}
              whileInView={{ opacity: 1, y: 0 ,x:0}}
              transition={{ duration: 0.3,delay:0.3 }}className="transform -top-[1px] -right-[190px] relative  inline-block w-[40px] h-[40px] bg-green-100 bg-opacity-60 bg z-10   "  />
      <motion.div  initial={{ opacity: 0, y: "-36%" ,x:"-36%"}}
      viewport={{ once: true, amount: 0.8 }}
              whileInView={{ opacity: 1, y: 0 ,x:0}}
              transition={{ duration: 0.3, }}className="transform   py-2 px-4 relative inline-block w-[350px]    bg-green-700 z-10  "  style={{ pathLength: scrollYProgress }}>
      
       <motion.div  initial={{ opacity: 0, y: "-36%" ,x:"-36%"}}
       viewport={{ once: true, amount: 0.8 }}
              whileInView={{ opacity: 1, y: 0 ,x:0}}
              transition={{ duration: 0.3, }}className="transform  -mt-8 -mr-8 relative inline-block w-[350px]    bg-black  border-[3px] border-solid border-green-700 "  >
        <h3 className="capitalize font-bold text-1.5xl font-pixelate text-green-600 sm:text-xl xs:text-lg mx-4 my-4 ">
          {days}{" "}
        </h3>{" "}
        <a
          className="capitalize font-small text-0.5xl font-pixelate text-green-100  "
          href={links}
        ></a>
        <span className="capitalize font-thin text-1.1xl  sm:text-xl xs:text-lg font-pixelate text-white xs:text-sm mx-4 my-4  opacity-60">
          {date}  {add}
        </span>
        <p className="font-thin text-lg  text-white sm:text-xl font-pixelate xs:text-lg w-full mx:text-sm mx-4 my-4 ">
          {des}
        </p>
      </motion.div></motion.div>
    </li>
  );
};

const Datamob: React.FC<DataProps> = ({ days, date, des, links, add }: DataProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["center end", "center center"],
  });

  return (
    <li ref={ref} className="my-2 first:mt-0 w-[80%] mx-auto flex flex-col items-start  md:w-[70%] mb-8 ">
   <motion.div className="w-4 h-4 bg-white rotate-45 absolute -left-[44px]"   style={{ pathLength: scrollYProgress }}/>
    <motion.div  
              className="w-fit"> 
              
   <motion.div className="">
   
    <motion.div className="transform  -mt-4  relative inline-block  "  >
    <h3 className="capitalize font-bold text-[30px]  text-orange-400 absolute left-0 ">
          {days}{" "}
        </h3>{" "}
        <a
          className="capitalize font-small text-0.5xl font-pixelate text-green-100 absolute "
          href={links}
        ></a>
        <span className="capitalize font-thin text-1.1xl  sm:text-xl xs:text-lg font-pixelate text-white xs:text-sm mx-4 my-4  opacity-60">
          {date}  {add}
        </span>
        <p className="font-thin text-lg  text-white sm:text-xl font-pixelate xs:text-lg w-full mx:text-sm mx-4 my-4  mr-4">
          {des}
        </p>
     </motion.div></motion.div></motion.div>
   </li>
 
  );
};

const Timeline2 = () => {

  const ref1 = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref1,
    offset: ["start end", "center start"],
  });

  return (
    <section id="timeline">
      <div className="mb-10">
        <div
          className="text-white font-pixelate text-[3rem] mx:text-[4rem] font-bold mb-10  mt-20"
          
        >
        
        <div className="overflow-x-hidden w-full pt-5 sm:hidden text-xl shad relative">
  <h2 className=" flex flex-row max-w-sm md:max-w-max mx-0  font-pixelate  text-left font-bold mb-10 pt-4 md:pt-0 uppercase md:w-max relative">
 
  
  </h2>
</div>
</div>
        < div ref={ref1} className="lg:flex lg:justify-between">
        <div className="hidden lg:block w-full lg:w-[4px] relative left-[50%]">
            <motion.div
              style={{ scaleY: scrollYProgress }}
              className="absolute top-0 w-[4px] h-full bg-white origin-top mx:w-[3px] lg:w-[4px] xs:w-[2px] mx:left-[30px] lg:left-0 xs:left-[20px] "
            /></div>
          {/* Left side (Desktop) */}
          <div className=" w-full lg:w-1/2 relative  lg:mb-0  ">
         
            <div className="hidden lg:block left-0">
            <ul className="w-full flex flex-col items-center justify-center   ">
              {/* Left side timeline items */}
              <div className="mt-[35%]">
              <Data
                days="Registration Close"
                date="March 1"
                des="Registration close "
                links="https://binary.com"
                add=""
              /></div>
               <div className="mt-[47%]">
               <Data
                days="Hackathon Start"
                date="March 2"
                des="Hackathon Start "
                links="https://binary.com"
                add=""
              /></div>
              <div className="mt-[46%]">
               <Data
                days="Results"
                date="March 2"
                des="Results will be declared "
                links="https://binary.com"
                add=""
              /></div>
              {/* Add more Data components as needed */}
            </ul></div>
            
          </div>
         
          {/* Right side (Desktop) */}
          <div className="hidden lg:block w-full lg:w-1/2 relative ">
          
            <ul className="w-full flex flex-col items-center justify-center ">
              {/* Right side timeline items */}
              <div className="mb-[47%]">
              <Data2
                days="Registration Start"
                date="January 16"
                des="Registration start "
                links=""
                add=""
              /></div>
              <div className="mb-[47%]">
               <Data2
                days="Online Quiz"
                date="March 1"
                des="Online quiz round "
                links=""
                add=""
              /></div>
              <div className="mb-[47%]">
               <Data2
                days="Submission"
                date="March 2"
                des="Last date of submission"
                links=""
                add=""
              /></div>
              {/* Add more Data components as needed */}
            </ul>
          </div>
          {/* Mobile view (alternating columns) */}
          <div className="lg:hidden mt-4 ml-4">
         
          <div ref={ref1} className="w-[75%] mx-auto relative lg:w-[90%] mx:w-full">
<motion.div style={{scaleY:scrollYProgress}} className="absolute -left-[37px] top-0 w-[2px] h-full bg-white origin-top mx:w-[3px] lg:w-[4px] xs:w-[2px] mx:left-[30px]   lg:left-9 xs:left-[20px]"/>
<ul className="w-full flex flex-col items-start justify-between ml-4  xs:ml-2">
<Datamob
              days="Day 1"
              date="21th March"
             des="Registration start "
              links="https://binary.com"
              add=""
            />
            <Datamob
              days="Day 2"
              date="21th March"
             des="Registration close "
              links="https://binary.com"
              add=""
            />
            <Datamob
              days="Day 3"
              date="21th March"
              des="Quiz round start"
              links="https://binary.com"
              add=""
            />
            <Datamob
              days="Day 4"
              date="21th March"
              des="Hackathon Start"
              links="https://Akash.com"
              add=""
            />
            <Datamob
              days="Day 5"
              date="21th March"
              des="Last date of "
              links="https://binary.com"
              add=""
            />
            <Datamob
              days="Day 6"
              date="21th March"
              des="Results "
              links="https://binary.com"
              add=""
            />
</ul>
      </div></div>
            {/* Repeat this pattern for additional items */}
          </div>
        </div>
      
    </section>
  );
};

export default Timeline2;



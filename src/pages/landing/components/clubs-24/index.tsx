import OutlinedHeading from '@/components-global/outlined-heading';
import { CLUBS } from './clubsData';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ElementRef, useRef } from 'react';
import styles from './style.module.scss';
const ClubsSection = () => {
  const clubsContainerRef = useRef<ElementRef<'div'>>(null);
  useGSAP(() => {
    if (!clubsContainerRef.current) return;
    const containerHeight = clubsContainerRef.current.clientHeight;
    gsap.from('#espektro-club-tile', {
      scrollTrigger: {
        trigger: clubsContainerRef.current,
        start: 'top 90%',
        end: () => '+=' + containerHeight,
        scrub: 1,
      },
      stagger: 0.5,
      scale: 0,
      duration: 1,
      ease: 'ease-in-out',
    });
  });

  return (
    <div id="espektro-clubs" className={styles.clubs__main__container}>
      <div>
        <OutlinedHeading label="Clubs" />
      </div>

      <div className={styles.clubs__grid__container}>
        <div ref={clubsContainerRef} className={styles.clubs__grid__inner}>
          {CLUBS.map((club, key) => (
            <div id="espektro-club-tile" key={key}>
              <img
                src={club.image}
                alt="partners"
                className="object-cover hover:grayscale cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>

    // <div className='flex justify-center items-center'>
    //   <div className='relative w-[80%] py-10 px-2 [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)] overflow-hidden bg-inherit whitespace-nowrap flex'>

    //     <div className="py-12 whitespace-nowrap min-w-max animate-infinite-scroll">
    //             {
    //               CLUBS.map((club, key) => (
    //                 <span key={key} className="inline-block mx-12 w-[10rem] overflow-hidden border-2p-5 rounded-md bg-primary border-gray-800 cursor-pointer">
    //                   <img src={club.image} alt='partners' className='object-cover filter grayscale'/>
    //                 </span>
    //               ))
    //             }

    //     </div>

    //     <div className="absolute bittom-0 py-12 animate-marquee2 whitespace-nowrap min-w-max">

    //       {
    //         CLUBS.map((club, key) => (
    //           <span key={key} className="inline-block mx-12 w-[10rem] overflow-hidden cursor-pointer">
    //             <img src={club.image} alt='partners' className='object-cover filter grayscale'/>
    //           </span>
    //         ))
    //       }
    //     </div>
    //   </div>
    // </div>
  );
};

export default ClubsSection;

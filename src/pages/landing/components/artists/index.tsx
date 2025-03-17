// import AnimatedHeading from '@/components-global/animated-heading';
// import React from 'react';
// import styles from './style.module.scss';

// const ArtistSection: React.FC = () => {
//   return (
//     <section id="espektro-past-artists" className={styles.artist__section}>
//       <AnimatedHeading heading="Artists" variant="light" />
//       <div className={styles.artist_maincontianer} id="artists">
//         <div className={styles.artist_gridcontainer}>
//           <div className={styles.imgone}>
//             <div></div>
//             <img src={`${url}001.jpg`}alt="" />
//           </div>
//           <div className={styles.imgtwo}>
//             <img src={`${url}002.jpg`} alt="" />
//           </div>
//           <div className={styles.imgthree}>
//             <img src={`${url}004.jpg`} alt="" />
//           </div>
//           <div className={styles.imgfour}>
//             <img src={`${url}007.jpg`} alt="" />
//           </div>
//           <div className={styles.imgfive}>
//             <img src={`${url}0012.jpg`} alt="" />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ArtistSection;

// import AnimatedHeading from '@/components-global/animated-heading';
import React, { useRef } from 'react';
import styles from './style.module.scss';

import AnimatedHeadingV2 from '@/components-global/animated-headingV2';
import gsap from 'gsap';

const url = '';

const ArtistSection: React.FC = () => {
  return (
    <section id="espektro-past-artists" className={styles.artist__section}>
      {/* <AnimatedHeading heading="Artists" variant="light" /> */}
      <AnimatedHeadingV2 heading="Artists" variant="light" />
      <div className={styles.artist_maincontianer} id="artists">
        <div className={styles.artist_gridcontainer}>
          <div className={styles.imgone}>
            <ArtistInfo artistName="Some Name" artistYear="2018-19" />
            <img src={`${url}001.jpg`} alt="" />
          </div>
          <div className={styles.imgtwo}>
            <ArtistInfo artistName="Some Name" artistYear="2018-19" />
            <img src={`${url}002.jpg`} alt="" />
          </div>
          <div className={styles.imgthree}>
            <ArtistInfo artistName="Some Name" artistYear="2018-19" />
            <img src={`${url}004.jpg`} alt="" />
          </div>
          <div className={styles.imgfour}>
            <ArtistInfo artistName="Some Name" artistYear="2018-19" />
            <img src={`${url}007.jpg`} alt="" />
          </div>
          <div className={styles.imgfive}>
            <ArtistInfo artistName="Some Name" artistYear="2018-19" />
            <img src={`${url}0012.jpg`} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtistSection;

interface ArtistProps {
  artistName: string;
  artistYear: string;
}

const ArtistInfo = (props: ArtistProps) => {
  const artistRef = useRef<HTMLDivElement>(null);

  artistRef.current?.addEventListener('mouseenter', () => {
    gsap.to(artistRef.current?.children || [], {
      duration: 1,
      y: -100,
      opacity: 0,
      ease: 'power4.out',
    });
    //image to scale a bit on mouse enter
    gsap.to(artistRef.current?.nextElementSibling || [], {
      duration: 1,
      scale: 1.1,
      ease: 'power4.out',
    });
  });

  artistRef.current?.addEventListener('mouseleave', () => {
    gsap.to(artistRef.current?.children || [], {
      duration: 1,
      y: 0,
      opacity: 1,
      ease: 'power4.out',
    });

    gsap.to(artistRef.current?.nextElementSibling || [], {
      duration: 1,
      scale: 1,
      ease: 'power4.out',
    });
  });

  return (
    <div className={styles.artist_info_container} ref={artistRef}>
      <p>{props.artistName}</p>
      <p>{props.artistYear}</p>
    </div>
  );
};

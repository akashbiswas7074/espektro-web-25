import styles from './style.module.scss';

import OutlinedHeading from '@/components-global/outlined-heading';
// import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const ArtistSectionTemp = () => {
  const mainContentRef = useRef<HTMLDivElement>(null);
  const galleryContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      id="espektro-past-artists"
      className={styles.main_container}
      ref={mainContentRef}
    >
      <OutlinedHeading label="Artists" />
      {/* <div
          className={styles.artist_section_text_overlay}
          ref={textOverlayRef}
        >
          <div>
            <p>Renouned</p>
          </div>
          <div>
            <p>Artists</p>
          </div>
        </div> */}
      {/* <div className={styles.top_gallery}>
            <img src={`${url}001.jpg`} alt="" />
            <img src={`${url}001.jpg`} alt="" />

        </div> */}
      <div className={styles.main_gallery} ref={galleryContainerRef}>
        <div className={styles.wide}>
          <img
            src={
              'https://res.cloudinary.com/drwrctrgz/image/upload/v1704967358/Espetro/image7_jng9ld.jpg'
            }
            alt=""
          />
        </div>
        <div className={styles.tall}>
          <img
            src={
              'https://res.cloudinary.com/drwrctrgz/image/upload/v1704967359/Espetro/image8_slwhke.jpg'
            }
            alt=""
          />
        </div>
        <div className={styles.big}>
          <img
            src={
              'https://res.cloudinary.com/drwrctrgz/image/upload/v1704967362/Espetro/image9_fpsmkt.jpg'
            }
            alt=""
          />
        </div>
        <div className={styles.tall}>
          <img
            src={
              'https://res.cloudinary.com/drwrctrgz/image/upload/v1704967363/Espetro/image10_y6wmmn.jpg'
            }
            alt=""
          />
        </div>
        <div className="">
          <img
            src={
              'https://res.cloudinary.com/drwrctrgz/image/upload/v1704968351/Espetro/image17_ecygre.jpg'
            }
            alt=""
          />
        </div>
        <div className={styles.wide}>
          <img
            src={
              'https://res.cloudinary.com/drwrctrgz/image/upload/v1704967371/Espetro/image14_dtx3xh.jpg'
            }
            alt=""
          />
        </div>
        <div className={styles.tall}>
          <img
            src={
              'https://res.cloudinary.com/drwrctrgz/image/upload/v1704968961/Espetro/impimage_re6wlz.jpg'
            }
            alt=""
          />
        </div>
        <div className={styles.big}>
          <img
            src={
              'https://res.cloudinary.com/drwrctrgz/image/upload/v1704967367/Espetro/image12_mqrroi.jpg'
            }
            alt=""
          />
        </div>
        <div className={styles.wide}>
          <img
            src={
              'https://res.cloudinary.com/drwrctrgz/image/upload/v1704968351/Espetro/image19_zblvml.jpg'
            }
            alt=""
          />
        </div>
        <div className={styles.wide}>
          <img
            src={
              'https://res.cloudinary.com/drwrctrgz/image/upload/v1704968351/Espetro/image18_xtzgmg.jpg'
            }
            alt=""
          />
        </div>
        <div className="">
          <img
            src={
              'https://res.cloudinary.com/drwrctrgz/image/upload/v1704967351/Espetro/image2_o7wden.jpg'
            }
            alt=""
          />
        </div>
        <div className={styles.wide}>
          <img
            src={
              'https://res.cloudinary.com/drwrctrgz/image/upload/v1704967350/Espetro/image1_y20rbn.jpg'
            }
            alt=""
          />
        </div>
        <div className="">
          <img
            src={
              'https://res.cloudinary.com/drwrctrgz/image/upload/v1704967349/Espetro/iamge6_mevsj3.jpg'
            }
            alt=""
          />
        </div>
        <div className={styles.wide}>
          <img
            src={
              'https://res.cloudinary.com/drwrctrgz/image/upload/v1704967354/Espetro/image4_wqvp6h.jpg'
            }
            alt=""
          />
        </div>
        <div className="">
          <img
            src={
              'https://res.cloudinary.com/drwrctrgz/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1704967356/Espetro/image5_eagfgb.jpg?_s=public-apps'
            }
            alt=""
          />
        </div>
        <div className="">
          <img
            src={
              'https://res.cloudinary.com/drwrctrgz/image/upload/v1704967352/Espetro/image3_lzksiv.jpg'
            }
            alt=""
          />
        </div>
      </div>

      <div className={styles.bottom_button_container}>
        <button className={styles.artist_button}>Explore</button>
      </div>
    </div>
  );
};

export default ArtistSectionTemp;

import styles from './style.module.scss';

import useMediaQuery from '@/hooks/mediaQuery';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);
const ArtistSection = () => {
  const url = '';

  const mainContainerWrapperRef = useRef<HTMLDivElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const imageContentRef = useRef<HTMLUListElement>(null);

  const xs = useMediaQuery('(max-width: 375px)');
  const sm = useMediaQuery('(max-width: 480px)');
  const mobile = useMediaQuery('(max-width: 768px)');
  const tablet = useMediaQuery('(max-width: 1024px)');
  const desktop = useMediaQuery('(max-width: 1440px)');

  console.log(imageContentRef.current?.offsetHeight);
  console.log(mainContainerRef.current?.offsetHeight);
  console.log(
    `-${
      mainContainerRef.current?.offsetHeight ??
      0 - (imageContentRef.current?.offsetHeight ?? 0)
    }px`
  );

  useGSAP(() => {
    const tl = gsap.timeline();

    // const images = gsap.utils.rtoArray(imageContentRef.current?.children)

    // const anim = images.map((image,index) => {
    //   tl.to(image.children,{
    //   y : '10%',
    //   duration : 1,
    //   ease : 'power2.out',
    //   })
    // })

    tl.to(mainContainerRef.current, {
      // height: `${window.innerHeight < 768 ? '10rem' : '40rem'}`,
      height: `${
        xs
          ? '15rem'
          : sm
          ? '20rem'
          : mobile
          ? '25rem'
          : tablet
          ? '30rem'
          : desktop
          ? '40rem'
          : '40rem'
      }`,
      // scrub : 1,
      // delay : 1,
      duration: 3,
      ease: 'power2.out',
    })
      .to(imageContentRef.current, {
        y: `-82%`,
        // scrub : 1.5,
        duration: 5,
        ease: 'power2.out',
      })
      .to(mainContainerRef.current, {
        height: 0,
        // scrub : 1,
        duration: 2,
        ease: 'power2.out',
      });

    ScrollTrigger.create({
      trigger: mainContainerWrapperRef.current,
      start: 'top top',
      end: '+=400',
      animation: tl,
      // scrub : 1.5,
      pin: true,
      //   markers : true,
      anticipatePin: 1,
      toggleActions: 'play none none reverse',
    });
  });

  return (
    <div
      className={styles.main_wrapper_container}
      ref={mainContainerWrapperRef}
    >
      <div className={styles.main_container} ref={mainContainerRef}>
        <div className={styles.top_heading_container}>
          <h1>
            Renouned <span>Artists!</span>
          </h1>
        </div>
        <div className={styles.image_content_container}>
          <ul ref={imageContentRef}>
            <li>
              <img src={`${url}001.jpg`} alt="" />
            </li>

            <li>
              <img src={`${url}001.jpg`} alt="" />
            </li>

            <li>
              <img src={`${url}001.jpg`} alt="" />
            </li>

            <li>
              <img src={`${url}001.jpg`} alt="" />
            </li>

            <li>
              <img src={`${url}001.jpg`} alt="" />
            </li>

            <li>
              <img src={`${url}001.jpg`} alt="" />
            </li>
          </ul>
        </div>
        <div className={styles.bottom_heading_container}>
          <h1>
            <span>Renouned </span>Artists!
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ArtistSection;

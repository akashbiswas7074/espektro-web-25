import { useRef } from 'react';
import styles from './style.module.scss';

import AnimatedHeadingV2 from '@/components-global/animated-headingV2';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// import verticalImg from '@/assets/images/vertical2.jpeg';
// import {about} from '@/data/aboutData';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const url = '';

  const wrapperRef = useRef<HTMLDivElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const espektroRef = useRef<HTMLDivElement>(null);
  const techtixRef = useRef<HTMLDivElement>(null);
  const exoticaRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const contentImageRef = useRef<HTMLDivElement>(null);

  console.log(espektroRef.current?.children[1].children[1].children);

  useGSAP(() => {
    const tl = gsap.timeline();

    gsap.set(techtixRef.current, {
      y: `${espektroRef.current && espektroRef.current?.offsetHeight}`,
    });
    gsap.set(exoticaRef.current, {
      y: `${espektroRef.current && espektroRef.current?.offsetHeight * 2}`,
    });

    const espektroTl = gsap.timeline({
      scrollTrigger: {
        trigger: espektroRef.current,
        start: 'top 60%',
        end: `+=${
          espektroRef.current && espektroRef.current?.offsetHeight + 1000
        }`,
        toggleActions: 'play none none reset',
        // markers: true,
      },
    });

    const techtixTl = gsap.timeline({
      scrollTrigger: {
        trigger: techtixRef.current,
        start: 'top 60%',
        end: `+=${techtixRef.current && techtixRef.current?.offsetHeight}`,
        toggleActions: 'play none none reset',
        // markers: true,
      },
    });

    const exoticaTl = gsap.timeline({
      scrollTrigger: {
        trigger: exoticaRef.current,
        start: 'top 60%',
        end: `+=${exoticaRef.current && exoticaRef.current?.offsetHeight}`,
        toggleActions: 'play none none reset',
        // markers: true,
      },
    });

    gsap.utils
      .toArray(espektroRef.current?.children[1].children[0].children || [])
      .forEach((el, index) => {
        gsap.set(el as HTMLElement, { y: `${index * 50}px` });

        espektroTl.fromTo(
          (el as HTMLElement).children,
          {
            x: '-120%',
            scale: 1.2,
          },
          {
            x: '0%',
            scale: 1,
          },
          0
        );
      });

    espektroTl.fromTo(
      espektroRef.current?.children[1].children[1].children || [],
      {
        opacity: 0,
        y: '100%',
      },
      {
        opacity: 1,
        y: '0%',
      }
    );

    techtixTl.fromTo(
      techtixRef.current?.children[1].children[1].children || [],
      {
        opacity: 0,
        y: '100%',
      },
      {
        opacity: 1,
        y: '0%',
      }
    );

    exoticaTl.fromTo(
      exoticaRef.current?.children[1].children[1].children || [],
      {
        opacity: 0,
        y: '100%',
      },
      {
        opacity: 1,
        y: '0%',
      }
    );

    gsap.utils
      .toArray(techtixRef.current?.children[1].children[0].children || [])
      .forEach((el, index) => {
        gsap.set(el as HTMLElement, { y: `${index * 50}px` });

        techtixTl.fromTo(
          (el as HTMLElement).children,
          {
            x: '-100%',
            scale: 1.2,
          },
          {
            x: '0%',
            scale: 1,
          },
          0
        );
      });

    gsap.utils
      .toArray(exoticaRef.current?.children[1].children[0].children || [])
      .forEach((el, index) => {
        gsap.set(el as HTMLElement, { y: `${index * 50}px` });

        exoticaTl.fromTo(
          (el as HTMLElement).children,
          {
            x: '-100%',
            scale: 1.2,
          },
          {
            x: '0%',
            scale: 1,
          },
          0
        );
      });

    tl.to(techtixRef.current, {
      y: 0,
      duration: 0.5,
    });
    tl.to(exoticaRef.current, {
      y: 0,
      duration: 2 * 0.5,
    });

    ScrollTrigger.create({
      animation: tl,
      trigger: wrapperRef.current,
      start: 'top top',
      end: `+=${
        espektroRef.current && 3 * espektroRef.current?.offsetHeight + 1000
      }`,
      scrub: true,
      pin: true,
      anticipatePin: 1,
      // snap: 0.5,
      //   markers: true,
    });
  });

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      {/* <AnimatedHeadingV2 heading='About' variant='dark' /> */}

      <div className={styles.main_container} ref={mainContainerRef}>
        <div className={styles.content_espektro} ref={espektroRef}>
          <AnimatedHeadingV2 heading="Espektro" variant="light" />

          <div className={styles.main_content_container}>
            <div className={styles.content_espektro_image_wrapper}>
              <div className={styles.content_espektro_image_container}>
                <img src={`${url}002.jpg`} alt="" />
              </div>

              <div className={styles.content_espektro_image_container}>
                <img src={`${url}008.jpg`} alt="" />
              </div>

              <div className={styles.content_espektro_image_container}>
                <img src={`${url}008.jpg`} alt="" />
              </div>

              <div className={styles.content_espektro_image_container}>
                <img src={`${url}008.jpg`} alt="" />
              </div>
            </div>

            <div className={styles.content_container}>
              {/* <p>{about[0].espektro}</p> */}
              {/* <div ref={textContentRef}><p>Espektro</p></div> */}
              <div>
                <p>KGEC's annual extravaganza</p>
              </div>
              <div>
                <p>seamlessly merges technology and creativity</p>
              </div>
              <div>
                <span>Days brim with technical competitions</span>
                <span>
                  {' '}
                  while evenings dazzle with performances by renowned artists
                </span>
              </div>
              <div>
                <p>
                  potlighting cultural richness within KGEC's student community
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.content_techtix} ref={techtixRef}>
          <AnimatedHeadingV2 heading="Techtix" variant="light" />

          <div className={styles.main_content_container}>
            <div className={styles.content_espektro_image_wrapper}>
              <div
                className={styles.content_espektro_image_container}
                ref={contentImageRef}
              >
                <img src={`${url}002.jpg`} alt="" />
              </div>

              <div className={styles.content_espektro_image_container}>
                <img src={`${url}008.jpg`} alt="" />
              </div>

              <div className={styles.content_espektro_image_container}>
                <img src={`${url}008.jpg`} alt="" />
              </div>

              <div className={styles.content_espektro_image_container}>
                <img src={`${url}008.jpg`} alt="" />
              </div>
            </div>

            <div className={styles.content_container}>
              {/* <p>{about[0].espektro}</p> */}
              {/* <div ref={textContentRef}><p>Espektro</p></div> */}
              <div>
                <p>KGEC's annual extravaganza</p>
              </div>
              <div>
                <p>seamlessly merges technology and creativity</p>
              </div>
              <div>
                <span>Days brim with technical competitions</span>
                <span>
                  {' '}
                  while evenings dazzle with performances by renowned artists
                </span>
              </div>
              <div>
                <p>
                  potlighting cultural richness within KGEC's student community
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.content_exotica} ref={exoticaRef}>
          <AnimatedHeadingV2 heading="Exotica" variant="light" />

          <div className={styles.main_content_container}>
            <div className={styles.content_espektro_image_wrapper}>
              <div
                className={styles.content_espektro_image_container}
                ref={contentImageRef}
              >
                <img src={`${url}002.jpg`} alt="" />
              </div>

              <div className={styles.content_espektro_image_container}>
                <img src={`${url}008.jpg`} alt="" />
              </div>

              <div className={styles.content_espektro_image_container}>
                <img src={`${url}008.jpg`} alt="" />
              </div>

              <div className={styles.content_espektro_image_container}>
                <img src={`${url}008.jpg`} alt="" />
              </div>
            </div>

            <div className={styles.content_container}>
              <div ref={textContentRef}>
                <p>Espektro</p>
              </div>
              <div>
                <p>KGEC's annual extravaganza</p>
              </div>
              <div>
                <p>seamlessly merges technology and creativity</p>
              </div>
              <div>
                <span>Days brim with technical competitions</span>
                <span>
                  {' '}
                  while evenings dazzle with performances by renowned artists
                </span>
              </div>
              <div>
                <p>
                  potlighting cultural richness within KGEC's student community
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;

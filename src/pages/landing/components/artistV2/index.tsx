import styles from './style.module.scss';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
// import AnimatedHeadingV2 from '@/components-global/animated-headingV2';

gsap.registerPlugin(ScrollTrigger);

const ArtistSection = () => {
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const gridSectionOneRef = useRef<HTMLDivElement>(null);
  const gridSectionTwoRef = useRef<HTMLDivElement>(null);
  // const gridSectionThreeRef = useRef<HTMLDivElement>(null);
  const gridOverlayRef = useRef<HTMLDivElement>(null);
  const textOverlayRef = useRef<HTMLDivElement>(null);

  const url = '';

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: gridOverlayRef.current || undefined,
        start: 'top 60%',
        end: 'bottom bottom',
        toggleActions: 'play none none reset',
        // markers: true,
      },
    });

    const imgfirstgrid = Array.from(
      gridSectionOneRef.current?.children || []
    ).flatMap((item) => Array.from(item.querySelectorAll('img')));

    const imgelsecondgrid = Array.from(
      gridSectionTwoRef.current?.children || []
    ).flatMap((item) => Array.from(item.querySelectorAll('img')));

    const textel = Array.from(textOverlayRef.current?.children || []).flatMap(
      (item) => Array.from(item.querySelectorAll('p'))
    );

    //overlay drape animation over grid container
    tl.addLabel('overlay-visible')
      .fromTo(
        gridOverlayRef.current?.children || [],
        {
          y: '-150%',
          duration: 1,
        },
        {
          y: '0%',
          stagger: 0.1,
          duration: 1,
          ease: 'power4.out',
        }
      )
      .to(
        textel,
        {
          y: '0%',
          stagger: 0.1,
          duration: 1,
          ease: 'power4.out',
        },
        '>-0.5'
      )
      .to(
        textel,
        {
          y: '-100%',
          stagger: 0.1,
          duration: 1,
          ease: 'power4.out',
        },
        '>'
      )
      .addLabel('overlay-notvisible')
      .to(gridOverlayRef.current?.children || [], {
        y: '120%',
        stagger: 0.1,
        duration: 0.5,
        ease: 'power4.out',
        // repeat: -1,
      })
      .to(
        imgfirstgrid,
        {
          opacity: 1,
          x: '0%',
          stagger: 0.1,
        },
        '<'
      )
      .to(gridOverlayRef.current?.children || [], {
        y: '120%',
        stagger: 0.1,
        duration: 0.5,
        ease: 'power4.out',
        // repeat: -1,
      })
      .to(
        imgelsecondgrid,
        {
          opacity: 1,
          x: '0%',
          stagger: 0.1,
        },
        '<-1'
      );
  });

  return (
    <div className={styles.artist_wrapper}>
      {/* <AnimatedHeadingV2 heading="Artists" variant='light'/> */}

      <div className={styles.artist_grid_container} ref={gridContainerRef}>
        <div
          className={styles.artist_section_text_overlay}
          ref={textOverlayRef}
        >
          <div>
            <p>Renouned</p>
          </div>
          <div>
            <p>Artists</p>
          </div>
        </div>

        <div className={styles.grid_section_overlay} ref={gridOverlayRef}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div className={styles.grid_section_one} ref={gridSectionOneRef}>
          {Array.from({ length: 5 }).map((_, index) => {
            // const clsnm = `grid_item_${index+1}`

            return (
              <div key={index} className={styles.grid_item}>
                <img src={`${url}004.jpg`} alt="" />
              </div>
            );
          })}
        </div>

        {/* <div className={styles.grid_section_two}>
                {
                    Array.from({ length: 7 }).map((_, index) => {
                        // const clsnm = `grid_item_${index+1}`

                        return(
                        <div key={index} className={styles.grid_item}>
                            <img src={`${url}006.jpg`} alt="" />
                        </div>
                    )}
                    )
                }
            </div> */}

        <div className={styles.grid_section_three} ref={gridSectionTwoRef}>
          {Array.from({ length: 5 }).map((_, index) => {
            // const clsnm = `grid_item_${index+1}`

            return (
              <div key={index} className={styles.grid_item}>
                <img src={`${url}001.jpg`} alt="" />
              </div>
            );
          })}
        </div>

        {/* {
        Array.from({ length: 17 }).map((_, index) => {
            // const clsnm = `grid_item_${index+1}`

            return(
            <div key={index} className={styles.grid_item}>
            <img src={`${url}001.jpg`} alt="" />
            </div>
        )}
        )
        } */}
      </div>
    </div>
  );
};

export default ArtistSection;

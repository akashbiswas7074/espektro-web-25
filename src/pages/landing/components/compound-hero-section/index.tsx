import Youtube from '@/assets/images/youtube-logo.png';
// import Video from '@/assets/videos/test-video.mp4';
import useMediaQuery from '@/hooks/mediaQuery';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import styles from './styles.module.scss';
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Observer);
const BaseUrl = `https://res.cloudinary.com/dgc9mpvvw/image/upload/v1704223887/espektro/2023/techtix-exotica/`;
//! if you ever encounter a pixel line( between a section and scorlltrigger section) follow this GSAP forum
//! https://gsap.com/community/forums/topic/28540-oddbugglitch-pixel-line-when-using-loco-scroll-and-scroll-trigger/
function CompoundHeroSection() {
  const ImageGalleryRef = useRef<HTMLDivElement>(null);
  const VideoClipRef = useRef<HTMLVideoElement>(null);
  const VideoTitleRef = useRef<HTMLHeadingElement>(null);
  const RightBlockChildRef = useRef<HTMLDivElement>(null);
  const LeftBlockChildRef = useRef<HTMLDivElement>(null);
  const HeadingContainerRef = useRef<HTMLElement>(null);
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from('.hero-section-heading-content', {
      yPercent: 100,
      opacity: 0,
      stagger: 0.3,
      duration: 0.5,
      ease: 'power1.inOut',
    });
  });
  useGSAP(() => {
    if (!ImageGalleryRef.current) return;
    if (!LeftBlockChildRef.current) return;
    if (!RightBlockChildRef.current) return;
    const tl = gsap.timeline({});
    {
      /*
    1. direct clip path : inset(0 0 0 0) is having some issue currently that's why i have to animate using custom variables
    2. '<'  means these all animation will start at the same time
    3. instead of '<' we can give the label value inside add() to start at same time but '<' gives flexibility
*/
    }
    tl.add('video-animation')
      .to(
        '#third',
        {
          css: {
            '--vertical-clip': '0%',
            '--horizontal-clip': '0%',
            // '--image-border-radius': '0px',
          },
          duration: 1,
        },
        '<'
      )
      .to(
        '.left-block',
        {
          // taking any of the right most image block and taking its right value + (gap between the image blocks : 20px)
          // the result will the the total translation to be done before the animation end or through out the whole animation
          x: () => {
            if (!LeftBlockChildRef.current) return 0;
            return (
              -LeftBlockChildRef.current.getBoundingClientRect().right - 20
            );
          },
          duration: 1,
        },
        '<'
      )
      .to(
        '.right-block',
        {
          // for the right block taking any leftmost image block and taking its left
          // substract from window.innerWidth + gap : 20px
          // the resultant will be the translation to be donw before animation ends
          x: () => {
            if (!RightBlockChildRef.current) return 0;
            return (
              window.innerWidth -
              RightBlockChildRef.current.getBoundingClientRect().left +
              20
            );
          },
          duration: 1,
        },
        '<'
      )
      .to('#third', {
        css: {
          '--image-border-radius': '0px',
        },
        duration: 1,
      })
      .from(VideoTitleRef.current, {
        y: '50vh',
        opacity: 0,
        ease: 'back.out',
        duration: 0.5,
      })
      .from('.youtube-container', {
        y: 100,
      });
    const dis = ImageGalleryRef.current.getBoundingClientRect().width;
    ScrollTrigger.create({
      animation: tl,
      trigger: ImageGalleryRef.current,
      start: 'top top',
      end: () => `+=${dis + 100}`,
      scrub: 1,
      pin: true,
      //   markers: true,
      anticipatePin: 1,
      onEnter: () => {
        if (!VideoClipRef.current) return;
        VideoClipRef.current.play();
      },
    });
  });
  return (
    <section
      id="home"
      data-id="espektro-hero-section"
      className={styles.hero__section}
    >
      {/* Heading container */}
      <article
        ref={HeadingContainerRef}
        className={styles.hero__section__heading__wrapper}
      >
        <p
          className={`${styles.hero__section__heading} hero-section-heading-content`}
        >
          Espektro
        </p>
        <p
          className={`${styles.hero__section__subheading} hero-section-heading-content`}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil omnis
          minima aliquam odit, quo harum?
        </p>
        <CurrentYearLink label="Coming Soon" reference="#" />
      </article>
      {/* Image and video container */}
      <article
        ref={ImageGalleryRef}
        className={styles.hero__section__image__wrapper}
      >
        <div className={styles.hero__section__video__wrapper}>
          <div id="third" className={styles.hero__section__video__container}>
            <video
              ref={VideoClipRef}
              src={
                'https://res.cloudinary.com/dgc9mpvvw/video/upload/v1704267992/espektro/2023/after-movie/bfn5wc3mdykefxxp2egx.mp4'
              }
              muted
              loop
              disablePictureInPicture
            ></video>
            <div className={styles.hero__section__video__container__title}>
              <h1 ref={VideoTitleRef}>Glimpse of espektro</h1>
              <a
                href="https://www.youtube.com/watch?v=EgEked-j6uY&t=1s"
                target="__blank"
                rel="noopner noreferer"
                className="youtube-container"
              >
                Watch on
                <img src={Youtube} alt="yt-logo" />
              </a>
            </div>
          </div>
        </div>
        <div className={styles.hero__section__image__container}>
          <div
            aria-label="block-1"
            aria-description="exotica-1"
            className="left-block"
          >
            <img src={`${BaseUrl}wxctytmkpqt2vbwi6fpi.webp`} alt="exotica" />
          </div>
          <div
            aria-label="block-2"
            aria-description="exotica-2"
            ref={LeftBlockChildRef}
            className="left-block"
          >
            <img src={`${BaseUrl}lj73wiosdg6fzsgkyplr.webp`} alt="exotica" />
          </div>
          <div></div>
          <div
            aria-label="block-3"
            aria-description="exotica-3"
            ref={RightBlockChildRef}
            className="right-block"
          >
            <img src={`${BaseUrl}riba0sz1i8kwkggo8rlt.webp`} alt="exotica" />
          </div>
          <div
            aria-label="block-4"
            aria-description="exotica-4"
            className="right-block"
          >
            <img src={`${BaseUrl}xlfprkypff2gkq3nuzon.webp`} alt="exotica" />
          </div>
          <div
            aria-label="block-5"
            aria-description="exotica-5"
            className="left-block"
          >
            <img src={`${BaseUrl}zgkd7ezlzaxvnzbjtsxw.webp`} alt="exotica" />
          </div>
          <div
            aria-label="block-6"
            aria-description="exotica-6"
            className="right-block"
          >
            <img src={`${BaseUrl}ckdreln5mog3rwhzxgim.webp`} alt="exotica" />
          </div>
        </div>
      </article>
    </section>
  );
}

interface CurrentYearLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  label: string;
  reference: string;
  animationClassname?: string;
}
function CurrentYearLink({
  label,
  reference,
  animationClassname,
  style,
}: CurrentYearLinkProps) {
  const isExtraLargeMobile = useMediaQuery('(max-width: 475px)');
  const isSmallMobile = useMediaQuery('(max-width: 320px)');
  useGSAP(
    () => {
      const duration = 0.7;
      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.3,
      });
      tl.to('#right-segment', {
        x: 30,
        duration: duration,
        ease: 'power1.inOut',
      })
        .to('#right-segment', {
          // tan 35 = 0.7
          y: 30,
          opacity: 0,
          duration: duration,
        })
        .to('#link-background', {
          // * this is the actual width of the segments 3rem
          // * if having not so sooomth animation then check this value
          x: () =>
            isSmallMobile ? '1.25rem' : isExtraLargeMobile ? '1.5rem' : '2rem',
          duration: duration,
          delay: -0.4,
          ease: 'power1.inOut',
        })
        .from('#left-variable-segment', {
          y: -30,
          opacity: 0,
          duration: duration,
          delay: -0.4,
          ease: 'power1.inOut',
        })
        .from('#left-variable-segment', {
          x: -30,
          duration: duration,
          ease: 'power1.inOut',
        });
      // tl.pause();
    },
    {
      dependencies: [isExtraLargeMobile, isSmallMobile],
    }
  );
  return (
    <a
      id="current-year-link"
      style={{ ...style }}
      className={`${animationClassname ? `hero-section-heading-content` : ''} ${
        styles.currentYear__Link
      }`}
      href={reference}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        id="link-background"
        className={styles.currentYear__Link__background}
      >
        <div>
          <div id="right-segment"></div>
          <div id="left-variable-segment"></div>
          <div id="left-segment"></div>
        </div>
      </div>
      <p id="link-label">{label}</p>
    </a>
  );
}

export default CompoundHeroSection;

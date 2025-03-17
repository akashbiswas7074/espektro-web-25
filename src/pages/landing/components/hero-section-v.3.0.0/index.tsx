import Espektrologo from '@/components-global/espektro-animated-logo/Espektrologo';
import { motion } from 'framer-motion';
import React from 'react';
import CurrentYearLink from './components';
import './style.scss';
import styles from './styles.module.scss';
const baseUrl = `https://res.cloudinary.com/dgc9mpvvw/image/upload/v1705024591/espektro/2023/hero`;
function HeroSection(): React.JSX.Element {
  const renderShoots = (n: number) => {
    const shoots = [];
    for (let i = 0; i < n; i++) {
      shoots.push(<div key={`shoot-${i}`} className="shoot"></div>);
    }
    return shoots;
  };

  const renderStars = (n: number) => {
    const stars = [];
    for (let i = 0; i < n; i++) {
      stars.push(<div key={`star-${i}`} className="star"></div>);
    }
    return stars;
  };

  return (
    <section
      id="home"
      data-id="espektro-hero-section"
      className={styles.hero__section}
    >
      <article className={styles.hero__section__background__container}>
        <div className="con overflow-hidden"></div>
        <div className="">
          <picture className="absotute bottom-0">
            <source
              className="object-cover"
              srcSet={`${baseUrl}/desktop.webp`}
              type="image/webp"
              media="(min-width: 768px)"
            />
            <source
              className="object-cover"
              srcSet={`${baseUrl}/tablet.webp`}
              type="image/webp"
              media="(min-width: 440px)"
            />
            <img
              className={styles.hero__background__vector}
              src={`${baseUrl}/mobile.webp`}
              alt="espektro hero vector"
            />
          </picture>
          <div
            className="stars h-screen absolute top-0 overflow-hidden"
            style={{ zIndex: 1 }}
          >
            {renderStars(200)}
          </div>
          <div
            className="shoots absolute top-0 overflow-hidden"
            style={{ zIndex: 2 }}
          >
            {renderShoots(4)}
          </div>

          {/*desktop */}
          <motion.img
            className=" absolute md:top-[40%] hidden lg:block  md:left-[80px] object-cover w-1/2 float-left scale-[0.3]"
            src={`${baseUrl}/cloud-1.webp`}
            alt="espektro hero vector"
            initial={{
              x: '-100%',
              opacity: 0,
            }}
            animate={{
              x: '70%',
              opacity: 1,
            }}
            transition={{
              duration: 1.2,
              delay: 0.6,
            }}
            style={{
              width: '15%',
              objectFit: 'cover',
            }}
          />
          <motion.img
            className=" absolute md:top-[40%] hidden md:block  md:left-[80px] lg:hidden object-cover w-1/2 float-left scale-[0.3]"
            src={`${baseUrl}/cloud-1.webp`}
            alt="espektro hero vector"
            initial={{
              x: '-100%',
              opacity: 0,
            }}
            animate={{
              x: '30%',
              opacity: 1,
            }}
            transition={{
              duration: 1.2,
              delay: 0.6,
            }}
            style={{
              width: '15%',
              objectFit: 'cover',
            }}
          />
          <motion.img
            className=" absolute md:top-[30%] md:-right-4 hidden md:block  object-cover w-1/2 float-left scale-75"
            src={`${baseUrl}/cloud-2.webp`}
            alt="espektro hero vector"
            initial={{
              x: '100%',
              opacity: 0,
            }}
            animate={{
              x: '-20%',
              opacity: 1,
            }}
            transition={{
              duration: 1.2,
              delay: 0.3,
            }}
            style={{
              width: '25%',
              objectFit: 'cover',
            }}
          />
          <motion.img
            className=" absolute md:top-[15%] md:-left-4 hidden md:block object-cover w-1/2 float-left scale-75"
            src={`${baseUrl}/cloud-3.webp`}
            alt="espektro hero vector"
            initial={{
              x: '-100%',
              opacity: 0,
            }}
            animate={{
              x: '0%',
              opacity: 1,
            }}
            transition={{
              duration: 1.2,
            }}
            style={{
              width: '35%',
              objectFit: 'cover',
            }}
          />
          {/*mobile*/}
          <motion.img
            className=" absolute md:top-[15%] md:-left-4 hidden md:block object-cover w-1/2 float-left scale-75"
            src={`${baseUrl}/cloud-3.webp`}
            alt="espektro hero vector"
            initial={{
              x: '-100%',
              opacity: 0,
            }}
            animate={{
              x: '0%',
              opacity: 1,
            }}
            transition={{
              duration: 1.2,
            }}
            style={{
              width: '35%',
              objectFit: 'cover',
            }}
          />
          {/*mobile*/}

          <motion.img
            className=" absolute top-[35%] -right-4 md:hidden   object-cover w-1/2 float-left scale-75"
            src={`${baseUrl}/cloud-2.webp`}
            alt="espektro hero vector"
            initial={{
              x: '100%',
              opacity: 0,
            }}
            animate={{
              x: '30%',
              opacity: 1,
            }}
            transition={{
              duration: 1.2,
              delay: 0.3,
            }}
            style={{
              width: '45%',
              objectFit: 'cover',
            }}
          />
          <motion.img
            className=" absolute top-[15%] -left-4 md:hidden  object-cover w-1/2 float-left scale-75"
            src={`${baseUrl}/cloud-3.webp`}
            alt="espektro hero vector"
            initial={{
              x: '-100%',
              opacity: 0,
            }}
            animate={{
              x: '-30%',
              opacity: 1,
            }}
            transition={{
              duration: 1.2,
            }}
            style={{
              width: '60%',
              objectFit: 'cover',
            }}
          />
          <div className="hidden md:block">
            <div className="night  top-20">
              <div className="shooting-star"></div>
              <div className="shooting-star"></div>
              <div className="shooting-star"></div>
            </div>
          </div>
          <div className="sm:hidden">
            <div className="night2  top-20">
              <div className="shooting-star2"></div>
              <div className="shooting-star2"></div>
              <div className="shooting-star2"></div>
            </div>
          </div>
        </div>
      </article>

      <article className={styles.hero__section__content__container}>
        <div className={styles.hero__section__logo__container}>
          <Espektrologo />
        </div>
        <div className={styles.hero__section__heading__container}>
          <Heading label="espektro" />
        </div>
        <p className={styles.hero__section__tag__container}>
          Unleashing Innovation, Igniting Passion, and Elevating Experiences
        </p>
        <CurrentYearLink label="Coming soon" reference="#" />
      </article>
    </section>
  );
}

function Heading({ label }: { label: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg">
      <text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle">
        {label}
      </text>
      <text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle">
        {label}
      </text>
    </svg>
  );
}

export default HeroSection;

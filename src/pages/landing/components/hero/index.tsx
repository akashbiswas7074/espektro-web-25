import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

// import HERO_IMAGE from '@/assets/images/hero_image.webp';
// import HERO_IMAGE from '@/assets/images/hero-image/espektro-image-2.jpg';
import EspektroCountdown from '@/components-global/countdown';

import Espektrologo from '../footer/components/Espektrologo';
import { AnimatedTitle } from './component/AnimateText';
import styles from './style.module.scss';

const HeroSection: React.FC = () => {
  // You can toggle this with intersection observer.
  const [inView, updateInView] = useState(false);

  // Don't do this in production :)
  useEffect(() => {
    const timeout = setTimeout(() => {
      updateInView(!inView);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [updateInView]);

  const wordVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <section
      id="home"
      data-id="espektro-hero-section"
      className={styles.main_hero_section}
    >
      <div className={styles.main_hero_section__background__image}>
        <img src={''} alt="espektro image" />
      </div>
      <div className={styles.main_hero_section__content__container}>
        <div className={styles.hero__section__logo__container}>
          <Espektrologo />
        </div>
        <div className={styles.hero__section__heading__container}>
          <div>
            <AnimatedTitle currentInView={inView}>ESPEKTRO</AnimatedTitle>
          </div>
          <div>
            <h1 className={styles.main_hero_section__outlined__text}>
              <motion.text
                x="10"
                y="80"
                initial="hidden"
                animate="visible"
                variants={wordVariants}
                transition={{ duration: 1.5, delay: 1.7 }}
              >
                ESPEKTRO
              </motion.text>
            </h1>
          </div>
        </div>
        <div className={styles.espektro__countdown}>
          <EspektroCountdown />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

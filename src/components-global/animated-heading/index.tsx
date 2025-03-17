import useMediaQuery from '@/hooks/mediaQuery';
import { motion } from 'framer-motion';
import React from 'react';
import styles from './style.module.scss';
interface AnimatedHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  variant: 'light' | 'dark';
}
const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  heading,
  variant,
}) => {
  const isSmallMobile = useMediaQuery('(max-width: 320px)');
  const isLargeMobile = useMediaQuery('(max-width: 425px)');
  const isTablet = useMediaQuery('(max-width: 768px)');
  // const isDesktop = useMediaQuery('(max-width: 1024px)');

  return (
    <div className={styles.animated__heading__container}>
      <div>
        <h1
          style={
            {
              '--primary-font-color': variant === 'dark' && '#201d38',
              '--primary-font-size-solid': isSmallMobile
                ? '2rem'
                : isLargeMobile
                ? '2.5rem'
                : isTablet
                ? '2.75rem'
                : '3.5rem',
            } as React.CSSProperties
          }
          className={styles.animated__heading__container__filled__text}
        >
          {heading}
        </h1>
      </div>
      <motion.div
        initial={{
          transform: 'translate(-25px, 0px)',
        }}
        whileInView={{
          transform: isLargeMobile
            ? 'translate(0, 35%)'
            : isTablet
            ? 'translate(0, 30%)'
            : 'translate(0, 25%)',
        }}
        transition={{
          duration: 0.5,
          ease: 'easeIn',
        }}
        viewport={{
          once: true,
        }}
      >
        <motion.h1
          className={styles.animated__heading__container__outlined__text}
          initial={
            {
              '--secondary-font-size-outlined': isSmallMobile
                ? '2rem'
                : isLargeMobile
                ? '2.5rem'
                : isTablet
                ? '2.75rem'
                : '3.5rem',
              transform: 'translate(-30px, 0px)',
            } as any
          }
          whileInView={
            {
              '--secondary-font-size-outlined': isSmallMobile
                ? '2.5rem'
                : isLargeMobile
                ? '3rem'
                : isTablet
                ? '3.5rem'
                : '4.5rem',
              transform: 'translate(30%, 0%)',
            } as any
          }
          transition={{
            duration: 0.5,
            ease: 'easeIn',
          }}
          viewport={{
            once: true,
          }}
        >
          {heading}
        </motion.h1>
      </motion.div>
    </div>
  );
};

export default AnimatedHeading;

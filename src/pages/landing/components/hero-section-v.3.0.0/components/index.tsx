import useMediaQuery from '@/hooks/mediaQuery';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React from 'react';
import styles from './styles.module.scss';
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
}: CurrentYearLinkProps): React.JSX.Element {
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

export default CurrentYearLink;

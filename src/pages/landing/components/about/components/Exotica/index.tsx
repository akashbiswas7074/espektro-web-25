import HorizontalImg from '@/assets/images/horizontalimg.jpg';
import VerticalImg from '@/assets/images/verticalimg.jpeg';
import React from 'react';

import { motion } from 'framer-motion';

import AnimatedHeading from '@/components-global/animated-heading';
import styles from './style.module.scss';

const Exotica: React.FC = () => {
  return (
    <section className={styles.about_section}>
      <AnimatedHeading heading="Exotica" variant="light" />
      <div className={styles.about_main_section}>
        <div className={styles.about_img_grid_container}>
          <motion.div
            className={styles.imgtwo}
            initial={{
              opacity: 0,
              transform: 'scale(0.5)',
            }}
            whileInView={{
              opacity: 1,
              transform: 'scale(1)',
            }}
            viewport={{
              once: true,
            }}
          >
            <img
              src={VerticalImg}
              alt="vertical"
              className={styles.about_img}
            />
          </motion.div>
          <motion.div
            className={styles.imgone}
            initial={{
              opacity: 0,
              transform: 'scale(0.5) translateX(-50%)',
            }}
            whileInView={{
              opacity: 1,
              transform: 'scale(1) translateX(0px)',
            }}
            viewport={{
              once: true,
            }}
          >
            <img
              src={HorizontalImg}
              alt="horizontal"
              className={styles.about_img}
            />
          </motion.div>
          <motion.div
            className={styles.imgthree}
            initial={{
              opacity: 0,
              transform: 'scale(0.5) translateX(50%)',
            }}
            whileInView={{
              opacity: 1,
              transform: 'scale(1) translateX(0px) translateY(10%)',
            }}
            viewport={{
              once: true,
            }}
          >
            {/* shkfb */}
            <img
              src={HorizontalImg}
              alt="horizontal"
              className={styles.about_img}
            />
          </motion.div>
        </div>
        <motion.div
          className={styles.about_content_section}
          initial={{
            opacity: 0,
            transform: 'translateX(50%)',
          }}
          transition={{
            delay: 0.5,
            duration: 1,
          }}
          whileInView={{
            opacity: 1,
            transform: 'translateX(0px)',
          }}
          viewport={{
            once: true,
          }}
        >
          Alfresco, the Annual Hall Day cum Alumni Reunion of Rishi Bankim
          Chandra Hall, brings all the present residents to work co-operatively
          and make this event a great success. The hostellers of Rishi Bankim
          Chandra Hall has reached the peak of their success and accomplished
          every dream of their life. They have created an unforgettable image
          which will be remembered forever and thus, feels proud to be an alumni
          of Rishi Bankim Chandra Hall.
        </motion.div>
      </div>
    </section>
  );
};

export default Exotica;

import React from 'react';
import { motion } from 'framer-motion';
import OutlinedHeading from '@/components-global/outlined-heading';
import styles from './style.module.scss';

const EspektroAbout: React.FC = () => {
  return (
    <section className={styles.about_section}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <OutlinedHeading label="Espektro" theme="vintage" />
      </motion.div>
      
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
            transition={{ duration: 0.7 }}
            viewport={{
              once: true,
              margin: "-100px",
            }}
          >
            <img
              src="https://res.cloudinary.com/dgc9mpvvw/image/upload/v1704223885/espektro/2023/techtix-exotica/qj9b9gbg08n2wbbr1nb4.webp"
              alt="Main Espektro event"
              className={styles.about_img}
              loading="lazy"
            />
          </motion.div>
          <motion.div
            className={styles.imgone}
            initial={{
              opacity: 0,
              transform: 'scale(0.5) translateX(-30%)',
            }}
            whileInView={{
              opacity: 1,
              transform: 'scale(1) translateX(0px)',
            }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{
              once: true,
              margin: "-50px",
            }}
          >
            <div>
              <img
                src="https://res.cloudinary.com/dlrlet9fg/image/upload/v1742233724/Layer_0_dhjh2p.png"
                alt="Espektro visual element"
                className={styles.about_img}
                loading="lazy"
              />
            </div>
          </motion.div>
          <motion.div
            className={styles.imgthree}
            initial={{
              opacity: 0,
              transform: 'scale(0.5) translateX(30%)',
            }}
            whileInView={{
              opacity: 1,
              transform: 'scale(1) translateX(0px)',
            }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{
              once: true,
              margin: "-50px",
            }}
          >
            <div className=''>
              <img
                src="https://res.cloudinary.com/dlrlet9fg/image/upload/v1742233724/download_16_fvtzyw.png"
                alt="Espektro decoration"
                className={styles.about_img}
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{
            opacity: 0,
            transform: 'translateY(30px)',
          }}
          transition={{
            delay: 0.2,
            duration: 0.8,
          }}
          whileInView={{
            opacity: 1,
            transform: 'translateY(0px)',
          }}
          viewport={{
            once: true,
            margin: "-50px",
          }}
          className={styles.about_content_section}
        >
          <p>
            Alfresco, the Annual Hall Day cum Alumni Reunion of Rishi Bankim
            Chandra Hall, brings all the present residents to work co-operatively
            and make this event a great success. The hostellers of Rishi Bankim
            Chandra Hall has reached the peak of their success and accomplished
            every dream of their life. They have created an unforgettable image
            which will be remembered forever and thus, feels proud to be an alumni
            of Rishi Bankim Chandra Hall.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default EspektroAbout;

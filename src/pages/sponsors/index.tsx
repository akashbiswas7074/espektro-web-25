import React from 'react';

import styles from './style.module.scss';
import OutlinedHeading from '@/components-global/outlined-heading';
import { sponsorData } from './sponsorData';

const Sponsors: React.FC = () => {
  return(
    <div className={styles.sponsors__main__container}>
      <div>
        <OutlinedHeading label="Sponsors" />
      </div>

      <div className={styles.sponsors__inner__container}>
        <div className={styles.sponsors__grid__container}>
          {
            sponsorData.map((sponsor, index) => (
              <div className={styles.sponsors__grid__item__contianer} key={index}>
                <div className={styles.sponsors__grid__item}>
                  <img src={sponsor.link} alt="" />
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Sponsors;

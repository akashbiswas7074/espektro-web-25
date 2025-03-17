import React from 'react';
import EspektroAbout from './components/Espektro';
import Exotica from './components/Exotica';
import Techtix from './components/Techtix';
import styles from './style.module.scss';
// import About24 from '../about-24-page/About24';
const AboutSection: React.FC = () => {
  return (
    <article id="espektro-about" className={styles.about__article}>
      <EspektroAbout />
      <Techtix />
      <Exotica />
   {/* <About24 /> */}
    </article>
  );
};

export default AboutSection;

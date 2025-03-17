// import Espektrologo from '@/components-global/espektro-animated-logo/Espektrologo';
import OutlinedHeading from '@/components-global/outlined-heading';
import styles from './style.module.scss';
import Accordion from './components/Accordion/Accordion';
import Info from './components/Info/Info';
import Button from './components/Button/Button';
import { Instruction } from './components/Instruction/Instruction';
import { useState } from "react";

function AccomodationScreen() {
  const [searchData] = useState([]);

  return (
    <section className={styles.accomodation__page}>
      {/* <div className={styles.logo__wrapper}>
          <Espektrologo />
        </div> */}
      <OutlinedHeading label="Accomodation" />
      <Instruction />
      <Button/>
      <Info />
      <Accordion filterBySearch={searchData} />
    </section>
  );
}

export default AccomodationScreen;
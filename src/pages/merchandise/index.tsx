import Espektrologo from '@/components-global/espektro-animated-logo/Espektrologo';
import OutlinedHeading from '@/components-global/outlined-heading';
import MerchadiseSection from '../landing/components/merchandise';
import styles from './style.module.scss';
function MerchandiseScreen() {
  return (
    <section className={styles.merchandise__page}>
      <div className={styles.logo__wrapper}>
        <Espektrologo />
      </div>
      <OutlinedHeading label="Merchandise" />
      <MerchadiseSection variant="tshrit" />
      <MerchadiseSection variant="hoodie" />
    </section>
  );
}

export default MerchandiseScreen;

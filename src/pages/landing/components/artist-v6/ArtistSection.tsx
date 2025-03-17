import OutlinedHeading from '@/components-global/outlined-heading'
import styles from './style.module.scss'

const ArtistSectionv6 = () => {

  const papon= 'https://res.cloudinary.com/drwrctrgz/image/upload/v1710211952/Espektro24sponsors/bcg26na1h3eb3gtdqpcc.jpg'
  const highway = 'https://res.cloudinary.com/drwrctrgz/image/upload/v1710211953/Espektro24sponsors/vajsu82euxrqnbnxbdog.jpg'
  
  return (
    <div className={styles.artist__main__container}>
        <div className={styles.artist__text__container}>
            <OutlinedHeading label="Artists" />
        </div>

        <div className={styles.artist__inner__container}>
          <div className={styles.artist__section__one}>
            <div>
              <img src={papon} alt="papon" />
            </div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus recusandae quam harum amet architecto placeat maiores fugiat esse dolores voluptate.
            </div>
          </div>

          <div className={styles.artist__section__two}>
            <div>
              <img src={highway} alt="highway" />
            </div>

            <div>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis, maxime similique quibusdam dolores exercitationem a officia? Officia vitae aperiam deleniti.
            </div>

          </div>
          
          <div className={styles.artist__section__three}></div>

          <div className={styles.artist__grid__outer__container}>
            <div className={styles.artist__grid__container}>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ArtistSectionv6
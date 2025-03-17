// //@ts-expected-error
// import OutlinedHeading from '@/components-global/outlined-heading';
// import { useGSAP } from '@gsap/react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import React from 'react';
// import styles from './style.module.scss';
// gsap.registerPlugin(ScrollTrigger);
// function MerchadiseSection() {
//   useGSAP(() => {
//     //* animating tshirts
//     const aboutCards: gsap.TweenTarget[] =
//       gsap.utils.toArray('.tshirt-article');
//     aboutCards.forEach((tshirt) => {
//       gsap.from(tshirt, {
//         y: 50,
//         opacity: 0.4,
//         duration: 3,
//         ease: 'power2.out',
//         scrollTrigger: {
//           trigger: tshirt as gsap.DOMTarget,
//           start: 'top bottom-=100',
//           end: () => '+=400',
//           scrub: true,
//         },
//       });
//     });
//   });
//   return (
//     <section id="espektro-merchandise" className={styles.merchandise__section}>
//       {/* heading */}
//       <OutlinedHeading label="Merchandise" />
//       <p className={`${styles.merchandise__section__caption}`}>
//         Elevate Every Moment,
//         <br /> enter{' '}
//         <span
//           data-staggered="false"
//           className={`${styles.highlighted__heading} staggered-heading`}
//         >
//           the Realm of Espektro's Hoodie
//         </span>
//       </p>
//       <div className={styles.merchandise__section__content__wrapper}>
//         <article className={styles.merchandise__hashtag__article}>
//           {/* <blockquote>
//             Your time is limited, so don’t waste it living someone else’s life.
//             Don’t be trapped by dogma
//           </blockquote> */}
//           <p className={styles.hashtag}>
//             <span>#</span>
//             <span>Espektro'24</span>
//           </p>
//           <p className={styles.hashtag}>
//             <span>#</span>
//             <span>MachanaHaiMachayenge</span>
//           </p>
//         </article>
//         <article
//           className={`${styles.merchandise__front__image__article} tshirt-article`}
//         >
//           <img
//             src={
//               'https://res.cloudinary.com/dgc9mpvvw/image/upload/v1705040896/espektro/2023/merchandise/front.webp'
//             }
//             alt=""
//           />
//         </article>
//         <article
//           className={`${styles.merchandise__back__image__article} tshirt-article`}
//         >
//           <img
//             src={
//               'https://res.cloudinary.com/dgc9mpvvw/image/upload/v1705040896/espektro/2023/merchandise/rear.webp'
//             }
//             alt=""
//           />
//         </article>
//         <article className={styles.merchandise__button__wrapper}>
//           {/* <p>Rs 650</p> */}
//           {/* <a href="#merchandise" className={styles.parallelogram}>
//             Get Now!
//           </a> */}
//           <ParallelogramButton
//             label="Get Now"
//             reference="https://forms.gle/s7e29uaRABZdbEKV6
// "
//           />
//         </article>
//       </div>
//     </section>
//   );
// }

// interface ParallelogramButtonProps
//   extends React.HTMLAttributes<HTMLDivElement> {
//   label: string;
//   reference: string;
// }
// function ParallelogramButton({ label, reference }: ParallelogramButtonProps) {
//   return (
//     <div className={styles.parallelogram__button__wrapper}>
//       <a
//         href={reference}
//         target="_blank"
//         rel="noopener norefer"
//         className={`${styles.button} ${styles.white}`}
//       >
//         <span className={styles.label}>{label}</span>
//         <span className={styles.icon}>
//           <span></span>
//         </span>
//         <span className={styles.icon2}></span>
//       </a>
//     </div>
//   );
// }

// export default MerchadiseSection;


import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React from 'react';
import styles from './style.module.scss';
gsap.registerPlugin(ScrollTrigger);
function MerchadiseSection({ variant }: { variant: 'tshrit' | 'hoodie' }) {
  useGSAP(() => {
    //* animating tshirts
    const aboutCards: gsap.TweenTarget[] =
      gsap.utils.toArray('.tshirt-article');
    aboutCards.forEach((tshirt) => {
      gsap.from(tshirt, {
        y: 50,
        opacity: 0.4,
        duration: 3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: tshirt as gsap.DOMTarget,
          start: 'top bottom-=100',
          end: () => '+=400',
          scrub: true,
        },
      });
    });
  });
  return (
    <section className={styles.merchandise__section}>
      {/* heading */}
      {variant === 'hoodie' ? (
        <p className={`${styles.merchandise__section__caption}`}>
          Elevate Every Moment,
          <br /> enter{' '}
          <span
            data-staggered="false"
            className={`${styles.highlighted__heading} staggered-heading`}
          >
            the Realm of Espektro's hoodie
          </span>
        </p>
      ) : (
        <p className={`${styles.merchandise__section__caption}`}>
          Strike early with our exclusive tshirt with
          <br />
          <span
            data-staggered="false"
            className={`${styles.highlighted__heading} staggered-heading`}
          >
            Pioneer Perks Offer at 40% off
          </span>
        </p>
      )}
      {variant !== 'hoodie' && (
        <p className='text-text-light text-poppins text-2xl font-semibold'>
          Book within 20th February and get the offer, so hurry up!
        </p>
      )}
      <div className={styles.merchandise__section__content__wrapper}>
        <article className={styles.merchandise__hashtag__article}>
          {/* <blockquote>
            Your time is limited, so don’t waste it living someone else’s life.
            Don’t be trapped by dogma
          </blockquote> */}
          {variant === 'hoodie' ? (
            <>
              <p className={styles.hashtag}>
                <span>#</span>
                <span>Espektro'24</span>
              </p>
              <p className={styles.hashtag}>
                <span>#</span>
                <span>MachanaHaiMachayenge</span>
              </p>
            </>
          ) : (
            <>
              <p className={styles.hashtag}>
                <span>Regular at </span>
                <span>
                  Rs <s>450</s>{' '}
                  <span className={styles.hashtag__special_price}>300</span>
                </span>
              </p>
              <p className={styles.hashtag}>
                <span>Oversized at </span>
                <span>
                  Rs <s>500</s>{' '}
                  <span className={styles.hashtag__special_price}>350</span>
                </span>
              </p>
            </>
          )}
        </article>
        <article className={`${styles.merchandise__front__image__article}`}>
          <img
            src={
              variant === 'hoodie'
                ? 'https://res.cloudinary.com/dgc9mpvvw/image/upload/v1705040896/espektro/2023/merchandise/front.webp'
                : 'https://res.cloudinary.com/dgc9mpvvw/image/upload/v1705040896/espektro/2023/merchandise/tshirt-front.png'
            }
            alt=""
          />
        </article>
        <article className={`${styles.merchandise__back__image__article}`}>
          <img
            src={
              variant === 'hoodie'
                ? `https://res.cloudinary.com/dgc9mpvvw/image/upload/v1705040896/espektro/2023/merchandise/rear.webp`
                : `https://res.cloudinary.com/dgc9mpvvw/image/upload/v1707506093/espektro/2023/merchandise/tshirt-rear.png`
            }
            alt=""
          />
        </article>
        <article className={styles.merchandise__button__wrapper}>
          {/* <p>Rs 650</p> */}
          {/* <a href="#merchandise" className={styles.parallelogram}>
            Get Now!
          </a> */}
          <ParallelogramButton
            label="Get Now"
            reference={
              variant === 'hoodie'
                ? 'https://forms.gle/s7e29uaRABZdbEKV6'
                : 'https://forms.gle/eBkJzdetn4SPmZTy5'
            }
          />
        </article>
      </div>
    </section>
  );
}

interface ParallelogramButtonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  reference: string;
}
function ParallelogramButton({ label, reference }: ParallelogramButtonProps) {
  return (
    <div className={styles.parallelogram__button__wrapper}>
      <a
        href={reference}
        target="_blank"
        rel="noopener norefer"
        className={`${styles.button} ${styles.white}`}
      >
        <span className={styles.label}>{label}</span>
        <span className={styles.icon}>
          <span></span>
        </span>
        <span className={styles.icon2}></span>
      </a>
    </div>
  );
}

export default MerchadiseSection;

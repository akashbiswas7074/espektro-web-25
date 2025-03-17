import React, { useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import OutlinedHeading from "@/components-global/outlined-heading";
import { useGSAP } from "@gsap/react";

import AfterMovieSection from "../after-movie";
import styles from "./styles.module.scss";

gsap.registerPlugin(ScrollTrigger);
function AboutSection(): React.JSX.Element {
  const Espektroabout = useRef<HTMLParagraphElement>(null);

  // useEffect(() => {
  //   console.log(Espektroabout.current?.clientHeight/2)
  // },[Espektroabout.current?.clientHeight])

  useGSAP(() => {
    const aboutCards: gsap.TweenTarget[] = gsap.utils.toArray("#about-card");
    const cardInnerHeight = document.querySelector("#about-card")?.clientHeight;
    aboutCards.forEach((card) => {
      gsap.from(card, {
        yPercent: 50,
        opacity: 0,
        duration: 1,
        // delay: -1, //* play with these values to get the desired effect
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: card as gsap.DOMTarget,
          //! don't scare first one is for the trigger and second one is for the scroller
          //! as i have given yPercent: 100, so it will start from 100% below the viewport
          //! so i have to give start as top-=100% center
          //! top-=100% means move the top -100%
          start: "top-=100% bottom",
          end: () => "+=" + cardInnerHeight,
          scrub: true,
        },
      });
    });

    gsap.from(Espektroabout.current, {
      yPercent: 50,
      opacity: 0,
      duration: 1,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: Espektroabout.current as gsap.DOMTarget,
        start: "top-=100% center",
        end: () => "+=" + cardInnerHeight,
        scrub: true,
      },
    });
  });
  return (
    <>
      <section id="espektro-about" className={styles.about__section__v3}>
        <OutlinedHeading label="Aftermovie" />
        <div className={styles.aftermovie__about__wrapper}>
          <AfterMovieSection />
          <div className={styles.about__content__wrapper}>
            <OutlinedHeading label="About" />
            <p className={styles.about__section__paragraph} ref={Espektroabout}>
              <span className={styles.text_span}>
                Espektro is the annual cultural and technical spectacle hosted
                by {' '}
              </span>
              <span className={styles.text_span}>
                Kalyani Government Engineering College. As West Bengal's
                second-largest{" "}
              </span>
              <span className={styles.text_span}>
                fest, Espektro masterfully intertwines the realms of technology
                and
              </span>
              creativity, setting the stage for a multifaceted celebration. Over
              the course of several days, attendees are treated to a dynamic
              experience.
            </p>
            <div className={styles.about__section__v3__cards__container}>
              {/* <article
          id="about-card"
          className={styles.about__section__v3__card__container}
        >
          <div className={styles.about__section__v3__card__image}>
            <img
              src={`https://res.cloudinary.com/dgc9mpvvw/image/upload/v1705035698/espektro/2023/about/espektro.webp`}
              alt="espektro"
              loading="lazy"
            />
          </div>
          <div className={styles.about__section__v3__card__description}>
            <p>
              <span className={styles.enlarged__heading}>Espektro</span> is the
              annual cultural and technical spectacle hosted by Kalyani
              Government Engineering College. As{" "}
              <span className={styles.highlight}>
                West Bengal's second-largest fest, Espektro masterfully
                intertwines the realms of technology and creativity
              </span>
              , setting the stage for a multifaceted celebration. Daytime
              activities buzz with the excitement of{" "}
              <span className={styles.highlight}>
                technical competitions and innovative games, drawing in budding
              </span>{" "}
              engineers and tech enthusiasts alike. As dusk approaches, the
              ambiance shifts to a more artistic tone. Evenings come alive with
              mesmerizing performances from some of{" "}
              <span className={styles.highlight}>
                India's most distinguished artists,
              </span>{" "}
              showcasing a blend of traditional and contemporary talents.
            </p>
          </div>
        </article> */}
              <article
                id="about-card"
                className={styles.about__section__v3__card__container}
              >
                <div className={styles.about__section__v3__card__image}>
                  <img
                    src={`https://res.cloudinary.com/dgc9mpvvw/image/upload/v1705035889/espektro/2023/about/techtix.webp`}
                    alt="techtix"
                    loading="lazy"
                  />
                </div>
                <div className={styles.about__section__v3__card__description}>
                  <p>
                    <span className={styles.enlarged__heading}>Techtix</span>{" "}
                    serves as the technical cornerstone of Espektro, immersing
                    participants in a diverse variety of activities throughout
                    the day. Organized by the college's technical clubs, this
                    segment showcases a spectrum of{" "}
                    <span className={styles.highlight}>
                      compelling games and interactive challenges.
                    </span>{" "}
                    Participants are afforded the opportunity to demonstrate
                    their skills, engage in friendly competition, and immerse
                    themselves in hands-on experiences. From{" "}
                    <span className={styles.highlight}>
                      innovative workshops to competitive events,
                    </span>{" "}
                    Techtix is designed to captivate and challenge attendees,
                    fostering a spirit of ingenuity and collaboration. Blending
                    education with entertainment, Techtix elevates the Espektro
                    festival experience.
                  </p>
                </div>
              </article>
              <article
                id="about-card"
                className={styles.about__section__v3__card__container}
              >
                <div className={styles.about__section__v3__card__image}>
                  <img
                    src={`https://res.cloudinary.com/dgc9mpvvw/image/upload/v1705036869/espektro/2023/about/exotica.webp`}
                    alt="exotica"
                    loading="lazy"
                  />
                </div>
                <div className={styles.about__section__v3__card__description}>
                  <p>
                    <span className={styles.enlarged__heading}>Exotica</span>{" "}
                    stands as the cultural heartbeat of Espektro, showcasing a
                    rich tapestry of talents from KGEC's student body. This
                    segment immerses attendees in a{" "}
                    <span className={styles.highlight}>
                      captivating ambiance of music and dance, deeply
                    </span>{" "}
                    rooted in the college's cultural essence. Following the
                    student performances, Exotica ascends to new heights with
                    the renowned artists from across India gracing the stage.
                    Their emotive and masterful performances resonate deeply,
                    leaving an indelible impact on every listener. Through
                    Exotica, Espektro not only celebrates KGEC's cultural
                    heritage but also becomes a platform where local talent
                    harmoniously blends with national luminaries.
                  </p>
                </div>
              </article>
              <article
                id="about-card"
                className={styles.about__section__v3__card__container}
              >
                <div className={styles.about__section__v3__card__image}>
                  <img
                    src={`https://res.cloudinary.com/dgc9mpvvw/image/upload/v1705035698/espektro/2023/about/espektro.webp`}
                    alt="espektro"
                    loading="lazy"
                  />
                </div>
                <div className={styles.about__section__v3__card__description}>
                  <p>
                    <span className={styles.enlarged__heading}>Quixine</span>{" "}
                    awaits, promising a{" "}
                    <span className={styles.highlight}>gastronomic haven</span>{" "}
                    that will ignite your senses and elevate your culinary
                    experience. Prepare to embark on a journey through a myriad
                    of flavors and culinary marvels,{" "}
                    <span className={styles.highlight}>
                      where every bite tells a story and every dish is a
                      masterpiece
                    </span>{" "}
                    in its own right. Immerse yourself in a world of excitement
                    as Quixine hosts exhilarating culinary contests, inviting
                    you to showcase your skills and creativity in the kitchen.
                    Whether you're a seasoned chef or an aspiring{" "}
                    <span className={styles.highlight}>home cook</span>, there's
                    something for everyone to savor and enjoy.
                    <br />
                    Join us at Quixine and discover the true essence of culinary
                    artistry. Your taste buds will thank you for this
                    unforgettable experience!
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// interface AboutCardProps extends React.HTMLAttributes<HTMLDivElement> {
//   title: string;
//   description: string;
//   img: string;
// }
// //@ts-ignore
// function AboutCard({ description, img, title, ...props }: AboutCardProps) {
//   return (
//     <article {...props} className={styles.about__section__v3__card__container}>
//       <div className={styles.about__section__v3__heading__container}>
//         <h1>{title}</h1>
//       </div>
//       <div className={styles.about__section__v3__card__image}>
//         <img src={img} alt="" />
//       </div>
//       <div className={styles.about__section__v3__card__description}>
//         <p>{description}</p>
//       </div>
//     </article>
//   );
// }

export default AboutSection;

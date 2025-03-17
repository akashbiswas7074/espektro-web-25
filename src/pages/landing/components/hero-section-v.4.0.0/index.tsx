import { ElementRef, useEffect, useRef, useState } from "react";

import gsap from "gsap";
import Parallax from "parallax-js";

import Circuit from "@/assets/images/hero/circuit.png";
import Crushed from "@/assets/images/hero/crushed.png";
import Robot from "@/assets/images/hero/robot.png";
import Rocket from "@/assets/images/hero/rocket.png";
import Saturn from "@/assets/images/hero/saturn.png";
import Ufo from "@/assets/images/hero/ufo.png";
import Vr from "@/assets/images/hero/vr.png";
import { useGSAP } from "@gsap/react";

import HeroParticle from "./components/particles";
import styles from "./styles.module.scss";

function HeroSection(): React.JSX.Element {
  const parallaxContainer = useRef<ElementRef<"div">>(null);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  useEffect(() => {
    if (!parallaxContainer.current || !animationCompleted) return;
    new Parallax(parallaxContainer.current);
  }, [parallaxContainer.current, animationCompleted]);

  useGSAP(() => {
    const tl = gsap.timeline({
      ease: "power3.out",
      duration: 1,
      onComplete: () => {
        setAnimationCompleted(true);
      },
    });
    tl.from(
      "#background-text",
      {
        xPercent: -100,
      },
      "<"
    )
      .from(
        "#foreground-text",
        {
          xPercent: -100,
        },
        "<"
      )
      .from("#crushed", {
        scale: 0,
        yPercent: 100,
      })
      .from("#vr", {
        opacity: 0,
        yPercent: 20,
        scale: 0.8,
      })
      .from("#robot", {
        opacity: 0,
        xPercent: 10,
        yPercent: 8,
        scale: 0.8,
      })
      .from("#rocket", {
        opacity: 0,
        xPercent: -80,
        yPercent: 80,
        scale: 0.8,
      })
      .from(
        "#saturn",
        {
          opacity: 0,
          xPercent: 40,
          yPercent: -40,
          scale: 0.8,
        },
        "<"
      )
      .from(
        "#ufo",
        {
          opacity: 0,
          xPercent: 40,
          yPercent: 30,
          scale: 0.8,
        },
        "<"
      )
      .from("#circuit", {
        opacity: 0,
        xPercent: 10,
        yPercent: 8,
        scale: 0.8,
      });
    // .fromTo(
    //   '#rocket',
    //   {
    //     duration: 10,
    //     xPercent: -20,
    //     yPercent: -20,
    //     ease: 'linear',
    //   },
    //   {
    //     xPercent: 30,
    //     yPercent: 30,
    //     repeat: -1,
    //     yoyo: true,
    //   }
    // );
    // .from('#rocket', {
    //   xPercent: -20,
    //   yPercent: -20,
    //   ease: 'back',
    //   motionPath: {
    //     path: [
    //       { x: 100, y: 50 },
    //       { x: 200, y: 0 },
    //       { x: 300, y: 100 },
    //     ],
    //     align: '#rocket',
    //     autoRotate: true,
    //     curviness: 1,
    //     type: 'thru',
    //     end: 1,
    //   },
    //   repeat: -1,
    // });
  });

  return (
    <section className={styles.hero}>
      <HeroParticle />
      <h1 id="background-text" className={styles.background__heading}>
        ESPEKTRO
      </h1>

      <div
        className={styles.imagesWrapper}
        id="hero_scene"
        ref={parallaxContainer}
        data-relative-input="true"
      >
        <div
          id="crushed"
          // data-parallax
          className={styles.crushed}
          // data-speed-x="20"
          // data-speed-y="20"
          data-depth="0.3"
        >
          <img src={Crushed} alt={"layer-1"} />
        </div>
        <div
          id="robot"
          // data-parallax
          className={styles.robot}
          // data-speed-x="20"
          // data-speed-y="30"
          data-depth="0.4"
        >
          <img src={Robot} alt={"layer-2"} />
        </div>
        <div
          id="saturn"
          // data-parallax
          className={styles.saturn}
          // data-speed-x="10"
          // data-speed-y="10"
          data-depth="0.5"
        >
          <img src={Saturn} alt={"layer-3"} />
        </div>
        <div
          id="rocket"
          // data-parallax
          className={styles.rocket}
          // data-speed-x="5"
          // data-speed-y="5"
          data-depth="0.5"
        >
          <img src={Rocket} alt={"layer-4"} />
        </div>
        <div
          id="ufo"
          // data-parallax
          className={styles.ufo}
          // data-speed-x="20"
          // data-speed-y="20"
          data-depth="0.5"
        >
          <img src={Ufo} alt={"layer-5"} />
        </div>
        <div
          id="vr"
          // data-parallax
          className={styles.vr}
          // data-speed-x="20"
          // data-speed-y="20"
          data-depth="0.6"
        >
          <img src={Vr} alt={"layer-6"} />
        </div>
        <div
          id="circuit"
          // data-parallax
          className={styles.circuit}
          // data-speed-x="30"
          // data-speed-y="30"
          data-depth="0.6"
        >
          <img src={Circuit} alt={"layer-7"} />
        </div>
      </div>
      <h1 id="foreground-text" className={styles.foreground__heading}>
        ESPEKTRO
      </h1>
      <div className={styles.scroll__arrow__container}>
        <h5 className={styles.background__date_text}>
          24
          <span>TH</span> - 26<span>TH</span> MARCH
        </h5>
        <img
          className={styles.scroll__arrow}
          src="https://artorias.qodeinteractive.com/wp-content/uploads/2022/11/nft-home-rev-scrol.png"
        />
      </div>
    </section>
  );
}

export default HeroSection;

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { SPONSORS } from './sponsor-data';
import styles from './styles.module.scss';
function SponsorSection() {
  const SponsorSectionRef = useRef<HTMLDivElement>(null);
  const ListContainerRef = useRef<HTMLDivElement>(null);
  const ForwardListRef = useRef<HTMLUListElement>(null);
  const BackwardListRef = useRef<HTMLUListElement>(null);
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (
      !SponsorSectionRef.current ||
      !ForwardListRef.current ||
      !BackwardListRef.current ||
      !ListContainerRef.current
    )
      return;
    const forward_distance = () => {
      if (!ForwardListRef.current) return 0;

      const ForwardListRight =
        ForwardListRef.current.getBoundingClientRect().right;

      if (!ForwardListRef.current.lastElementChild) return 0;
      const LastChildRight =
        ForwardListRef.current.lastElementChild?.getBoundingClientRect().right;

      return Math.max(0, LastChildRight - ForwardListRight);
    };
    const backward_distance = () => {
      if (!BackwardListRef.current || !ListContainerRef.current) return 0;
      return (
        BackwardListRef.current.scrollWidth -
        ListContainerRef.current.getBoundingClientRect().width
      );
    };

    // concurrenty running both animation at the same time
    // by adding level
    // then applying to both animations
    const tl = gsap
      .timeline()
      .add('scroll')
      .to(
        ForwardListRef.current,
        {
          x: () => -forward_distance(),
        },
        'scroll'
      )
      .to(
        BackwardListRef.current,
        {
          x: () => backward_distance(),
        },
        'scroll'
      );
    ScrollTrigger.create({
      animation: tl,
      trigger: SponsorSectionRef.current,
      start: 'top top',
      end: () => `+=${Math.max(forward_distance(), backward_distance())}`,
      scrub: true,
      pin: '#espektro-past-sponsors',
      invalidateOnRefresh: true,
      anticipatePin: 1,
    });
  });
  return (
    <section id="espektro-past-sponsors" className={styles.sponsors__section}>
      <div ref={SponsorSectionRef} className={styles.wrapper}>
        <div className={styles.sponsor__header}>
          <h1>Our Past Sponsors</h1>
          <p>
            We appreciate your efforts and generosity in supporting our events
          </p>
        </div>
        <div ref={ListContainerRef} className={styles.sponsers__wrapper}>
          <ul ref={ForwardListRef} className={styles.sponsers__list}>
            {SPONSORS.slice(0, Math.round(SPONSORS.length / 2) - 1).map(
              (sponsor) => (
                <SponsorCard key={sponsor.id} sponsor={sponsor} />
              )
            )}
          </ul>
          <ul ref={BackwardListRef} className={styles.sponsers__list__backward}>
            {SPONSORS.slice(
              Math.round(SPONSORS.length / 2),
              SPONSORS.length - 1
            ).map((sponsor) => (
              <SponsorCard key={sponsor.id} sponsor={sponsor} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function SponsorCard({
  sponsor,
}: {
  sponsor: {
    id: number;
    sponsor: string;
    url: string;
  };
}) {
  return (
    <li className={styles.sponsers__item} key={sponsor.id}>
      <div className={styles.sponsor__image__container}>
        <img src={sponsor.url} alt={sponsor.sponsor} />
      </div>
      <div className={styles.sponsor__title__container}>{sponsor.sponsor}</div>
    </li>
  );
}
export default SponsorSection;

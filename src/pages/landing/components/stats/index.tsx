import { useRef, useEffect } from "react";
import OutlinedHeading from "@/components-global/outlined-heading";
import NumberAnimation from "../NumberAnimation";
import styles from "./style.module.scss";

const Stats = () => {
  const yearsData = [
    {
      year: "Pre",
      title: "The Beginning",
      description:
        "The initial years set the tone with local talents, establishing Espektro as a cultural cornerstone. And also bringing international brands on the scene.",
    },
    {
      year: 2016,
      title: "Arabian Nights",
      description: `A rising star graced the stage, leaving an indelible mark on the fest's history`,
    },
    {
      year: 2017,
      title: "A World Of Novels",
      description:
        "The fest expanded its horizons, featuring renowned artists and attracting attention beyond the college boundaries",
    },
    {
      year: 2018,
      title: "Ethos of Bengal",
      description:
        "Espektro reached new heights with an unforgettable performance by a nationally acclaimed artist",
    },
    {
      year: 2019,
      title: "A Blast From The Past",
      description:
        "International participation elevated the fest's global appeal, making it a must-attend event",
    },
    {
      year: 2020,
      title: "Rajatam Vardhanam",
      description:
        "Despite challenges, Espektro adapted to virtual platforms, maintaining its spirit and engaging a wider audience.and also completing 25 years of kgec",
    },
    {
      year: 2023,
      title: "The Khronic Odyssey",
      description:
        "A grand comeback marked the year, with the fest returning to its physical glory, featuring a blockbuster lineup that left the audience in awe",
    },
    {
      year: 2024,
      title: "Taksha-tatva Sanghra",
      description:
        "A Technological Symphony at Espektro ’24 is the theme for this year’s event, celebrating the transformative power of technology and its beautiful synergy with various aspects of our lives",
    },
    {
      year: 2025,
      title: "The Wonders Weave",
      description:
        "The Wonder Weave emphasizes the creation of a magical and wondrous experience through the intertwining of diverse talents, ideas, and disciplines. It's about showcasing the amazing things that happen when creativity and collaboration come together.",
    },
  ];
  const statistics = [
    {
      id: 1,
      title: "Footfall",
      count: 25,
      unit: "k+",
    },
    {
      id: 2,
      title: "Artists",
      count: 250,
      unit: "+",
    },
    {
      id: 3,
      title: "Events",
      count: 100,
      unit: "+",
    },
  ];

  // Using IntersectionObserver instead of GSAP
  const timelineRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Create an intersection observer to handle animations
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1 // Trigger when 10% of element is visible
    };
    
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        // Add animation class when element enters viewport
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.animate);
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Observe all year list items
    document.querySelectorAll(`.${styles.year__list}`).forEach(item => {
      observer.observe(item);
    });
    
    // Observe the timeline container for line animation
    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }
    
    // Observe statistics items
    document.querySelectorAll(`.${styles.statistics__container}`).forEach(item => {
      observer.observe(item);
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <div id="espektro-past-stats" className={styles.stats_main_container}>
      <article className={styles.statistics__article}>
        <OutlinedHeading label="Statistics" theme="vintage" />
        <div className={styles.statistics__wrapper}>
          {statistics.map((stats) => (
            <div
              key={stats.id}
              className={styles.statistics__container}
            >
              <h2>
                <NumberAnimation endValue={stats.count} unit={stats.unit} />
              </h2>
              <p>{stats.title}</p>
            </div>
          ))}
        </div>
      </article>
      <div className={styles.content_list_container}>
        <OutlinedHeading label="Over Years" theme="vintage" />
        <div ref={timelineRef} className={styles.year__list__wrapper}>
          {/* Add a direct DOM element for the timeline line */}
          <div className={styles.timeline_line}></div>
          <ul className={styles.year__list__container}>
            {yearsData.map((details, idx) => (
              <YearStats
                key={idx}
                year={details.year as any}
                description={details.description}
                title={details.title}
                style={{ animationDelay: `${idx * 0.2}s` }}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

interface YearStatsProps extends React.HTMLAttributes<HTMLLIElement> {
  year: number;
  title: string;
  description: string;
}

function YearStats({ year, title, description, ...props }: YearStatsProps) {
  return (
    <li {...props} className={styles.year__list}>
      <div className={styles.year__list__year__label}>
        <p>{year}</p>
      </div>
      <div className={styles.year__list__title}>
        <p>{title}</p>
      </div>
      <div className={styles.year__list__description}>
        <p>{description}</p>
      </div>
    </li>
  );
}

export default Stats;

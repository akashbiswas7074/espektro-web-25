import AnimatedHeading from '@/components-global/animated-heading';
import ComingSoonComponent from '@/components-global/coming-soon';
import { useState, useEffect, useRef } from 'react';
import styles from './style.module.scss';

const Event_list = [
  {
    id: 1,
    event_name: 'event name',
    event_data_time: '2023 13March 8:30pm',
    event_description:
      'Event description and stuff etc  stuff stuff stuff sutf ',
  },
  {
    id: 2,
    event_name: 'event name',
    event_data_time: '2023 13March 8:30pm',
    event_description:
      'Event description and stuff etc  stuff stuff stuff sutf ',
  },
  {
    id: 3,
    event_name: 'event name',
    event_data_time: '2023 13March 8:30pm',
    event_description:
      'Event description and stuff etc  stuff stuff stuff sutf ',
  },
  {
    id: 4,
    event_name: 'event name',
    event_data_time: '2023 13March 8:30pm',
    event_description:
      'Event description and stuff etc  stuff stuff stuff sutf ',
  },
  {
    id: 5,
    event_name: 'event name',
    event_data_time: '2023 13March 8:30pm',
    event_description:
      'Event description and stuff etc  stuff stuff stuff sutf ',
  },
  {
    id: 6,
    event_name: 'event_name',
    event_data_time: '2023 13March 8:30pm',
    event_description:
      'Event description and stuff etc  stuff stuff stuff sutf ',
  },
  {
    id: 7,
    event_name: 'event_name',
    event_data_time: '2023 13March 8:30pm',
    event_description:
      'Event description and stuff etc  stuff stuff stuff sutf ',
  },
  {
    id: 8,
    event_name: 'event_name',
    event_data_time: '2023 13March 8:30pm',
    event_description:
      'Event description and stuff etc  stuff stuff stuff sutf ',
  },
];

const TimelineSection = () => {
  const timelineSectionRef = useRef<HTMLDivElement>(null);
  const eventRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === timelineSectionRef.current) {
            entry.target.classList.add(styles.animate_timeline);
          } else {
            entry.target.classList.add(styles.animate_event);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe the timeline section
    if (timelineSectionRef.current) {
      observer.observe(timelineSectionRef.current);
    }

    // Observe each event container
    eventRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={styles.timeline_main_section}>
      <div className={styles.timeline_text_container}>
        <p>Timeline</p>
      </div>

      <div className={styles.timeline_section} ref={timelineSectionRef}>
        {Event_list.map((event, index) => {
          return (
            <div 
              key={event.id} 
              className={styles.event_container}
              ref={(el) => (eventRefs.current[index] = el)}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={styles.main_event}>
                <p className={styles.event_timing_con}>
                  {event.event_data_time}
                </p>
                <p className={styles.event_name_con}>{event.event_name}</p>
                <p className={styles.event_desc_con}>
                  {event.event_description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function TimelineWrapper() {
  const [isOnHold, _] = useState(false);
  return (
    <section
      id="espektro-timeline"
      className={styles.timeline__section__wrapper}
    >
      <AnimatedHeading heading="Timeline" variant="light" />
      {isOnHold ? <ComingSoonComponent variant="dark" /> : <TimelineSection />}
    </section>
  );
}

export default TimelineWrapper;

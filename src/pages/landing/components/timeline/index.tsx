import AnimatedHeading from '@/components-global/animated-heading';
import ComingSoonComponent from '@/components-global/coming-soon';
import { useState } from 'react';
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
  return (
    <div className={styles.timeline_main_section}>
      <div className={styles.timeline_text_container}>
        <p>Timeline</p>
      </div>

      <div className={styles.timeline_section}>
        {/* <div className={styles.circletop}></div> */}
        {Event_list.map((event) => {
          return (
            <div className={styles.event_container}>
              <div className={styles.main_event}>
                {/* <div className={styles.pointdiv}></div> */}
                {/* <div className={styles.pointdiv}> */}
                <p className={styles.event_timing_con}>
                  {event.event_data_time}
                </p>
                <p className={styles.event_name_con}>{event.event_name}</p>
                <p className={styles.event_desc_con}>
                  {event.event_description}
                </p>
                {/* </div> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function TimelineWrapper() {
  const [isOnHold, _] = useState(true);
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

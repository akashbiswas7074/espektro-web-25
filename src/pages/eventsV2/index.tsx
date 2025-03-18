import { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { GiWizardStaff } from 'react-icons/gi';

import OutlinedHeading from '@/components-global/outlined-heading';

import EventCard from './component/EventCard/EventCard';
import styles from './styles.module.scss';
import type { EventData } from './types';

import { demoEventData } from './data';
import './harryPotter.scss';
import SilkCarousel from '@/components/SilkCarousel';

const eventLinks = [
  {
    id: 1,
    label: 'Techtix',
    href: '/events/techtix',
  },
  {
    id: 2,
    label: 'Exotica',
    href: '/events/exotica',
  },
  {
    id: 3,
    label: 'Exotica',
    href: '/events/exotica',
  },
];

function EventsNav({
  active,
  setActive,
}: {
  active: number;
  setActive: (tab: number) => void;
}) {
  return (
    <ul className={styles.events_nav}>
      {eventLinks.map((link) => (
        <li
          data-active={link.id === active}
          key={link.id}
          onClick={() => setActive(link.id)}
        >
          <a>{link.label}</a>
        </li>
      ))}
    </ul>
  );
}

function EventsV2() {
  // const [activeTab, setActiveTab] = useState(1);

  // const [_, setDay0Event] = useState<EventData[]>([]);
  // const [__, setDay1Event] = useState<EventData[]>([]);
  // const [___, setDay2Event] = useState<EventData[]>([]);
  // const [____, setDay3Event] = useState<EventData[]>([]);
  // const [dataarray, setDataArray] = useState<
  //   { day: number; event: EventData[] }[]>([]);

  const [events, setEvents] = useState<EventData[]>([]);

  useEffect(() => {
    // Replace the axios call with the demo data
    setEvents(demoEventData);
    
    // The commented code below is kept as is
    // const getData = async () => {
    //   const data = await axios.get(
    //     'https://tessarus-pwa.vercel.app/dashboard/events'
    //   );

    //   const eventData = data.data.events.documents;

    //   setEvents(eventData);

    //   // const day0 = eventData.filter(
    //   //   (event: EventData) =>
    //   //     event.startTime.split('-')[2].split('T')[0] === '19'
    //   // );
    //   // setDay0Event(day0);

    //   // const day1 = eventData.filter(
    //   //   (event: EventData) =>
    //   //     event.startTime.split('-')[2].split('T')[0] === '20'
    //   // );
    //   // setDay1Event(day1);

    //   // const day2 = eventData.filter(
    //   //   (event: EventData) =>
    //   //     event.startTime.split('-')[2].split('T')[0] === '21'
    //   // );
    //   // setDay2Event(day2);

    //   // const day3 = eventData.filter(
    //   //   (event: EventData) =>
    //   //     event.startTime.split('-')[2].split('T')[0] === '22'
    //   // );
    //   // setDay3Event(day3);

    //   // setDataArray([
    //   //   {
    //   //     day: 0,
    //   //     event: day0,
    //   //   },
    //   //   {
    //   //     day: 1,
    //   //     event: day1,
    //   //   },
    //   //   {
    //   //     day: 2,
    //   //     event: day2,
    //   //   },
    //   //   {
    //   //     day: 3,
    //   //     event: day3,
    //   //   },
    //   // ]);
    // };
    // getData();
  }, []);

  const eventsMap = useMemo(() => {
    // group events by day
    const eventsMap = new Map<string, EventData[]>();
    events.forEach((event) => {
      const day = moment(event.startTime)
        .subtract('330', 'minutes')
        .format('DD-MM-YYYY');
      if (eventsMap.has(day)) {
        eventsMap.get(day)?.push(event);
      } else {
        eventsMap.set(day, [event]);
      }
    });
    return Array.from(eventsMap.entries()).map(([day, event]) => ({
      day,
      event,
    }));
  }, [events]);

  return (
    <div className={styles.event__main__container}>
      {/* <EventsNav active={activeTab} setActive={(tab) => setActiveTab(tab)} /> */}
      <div className={styles.section__container}>
        <OutlinedHeading label="Our Events" />
        <EventsSection days={eventsMap} />
        {/* <h1 className="text-4xl text-center font-bold text-text-light py-24">
          Coming Soon
          <div className={styles.coming__soon}>
            <ComingSoonDotsComponent/>
        </div>
        </h1> */}
      </div>
    </div>
  );
}

function EventsSection({
  days,
}: {
  days: { day: string; event: EventData[] }[];
}) {
  console.log(days);
  return (
    <section className={styles.event__section}>
      <div className="cloud-background"></div>
      <article>
        {days.map((day, idx: number) => {
          return (
            <EventDayContainer key={idx} day={day.day} events={day.event} />
          );
        })}
      </article>
    </section>
  );
}

export default EventsV2;

function EventDayContainer({
  day,
  events,
}: {
  day: string;
  events: EventData[];
}) {
  return (
    <div className={`${styles.event_day_container} magic-parchment`}>
      <h3 className="day-header">
        <GiWizardStaff className="staff-icon" /> 
        {moment(day, 'DD-MM-YYYY').format('Do MMMM')} 
        <GiWizardStaff className="staff-icon" />
      </h3>
      
      <div className="carousel-container-wrapper">
        <SilkCarousel 
          autoPlayInterval={5000}
          slidesToShow={1} // Always 1 to focus on single card
          theme="harry-potter"
          arrows={events.length > 1}
          infinite={true}
        >
          {events.map((event, idx) => (
            <div key={idx} className="event-card-wrapper">
              <EventCard {...event} />
            </div>
          ))}
        </SilkCarousel>
      </div>
    </div>
  );
}

export {
  EventCard,
  EventData,
  EventDayContainer,
  EventsNav,
  EventsSection,
  EventsV2,
};
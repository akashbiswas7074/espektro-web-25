import React, { useCallback, useEffect, useState } from 'react';
import styles from './styles.module.scss';
function Countdown() {
  const targetDate = new Date('2024-03-26T12:39:00');
  const [timeStamp, settimeStamp] = useState(targetDate.getTime() - Date.now());
  useEffect(() => {
    const interval = setInterval(() => {
      if (timeStamp - 1000 < 0) return;
      settimeStamp(timeStamp - 1000);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeStamp]);
  const convertTimestamp = useCallback(
    (timestamp: number, variant: 'days' | 'hours' | 'minutes' | 'seconds') => {
      const totalSeconds = Math.floor(timestamp / 1000);

      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      //   console.log(days, hours, minutes, seconds);
      switch (variant) {
        case 'days':
          return days;
        case 'hours':
          return hours;
        case 'minutes':
          return minutes;
        case 'seconds':
          return seconds;
      }
    },
    [timeStamp]
  );
  return (
    <article className={styles.countdown__article}>
      <TimeSegment label="Days" value={convertTimestamp(timeStamp, 'days')} />
      <span className={styles.seperator}>:</span>
      <TimeSegment label="Hours" value={convertTimestamp(timeStamp, 'hours')} />
      <span className={styles.seperator}>:</span>
      <TimeSegment
        label="Minutes"
        value={convertTimestamp(timeStamp, 'minutes')}
      />
      <span className={styles.seperator}>:</span>
      <TimeSegment
        label="Seconds"
        value={convertTimestamp(timeStamp, 'seconds')}
      />
    </article>
  );
}
interface TimeSegmentProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: number;
}
function TimeSegment({ label, value }: TimeSegmentProps) {
  const [paddedValue, setPaddedValue] = useState(
    value.toString().padStart(2, '0')
  );
  useEffect(() => {
    setPaddedValue(value.toString().padStart(2, '0'));
  }, [value]);
  return (
    <div className={styles.timesegment__container}>
      <div className={styles.time__wrapper}>
        <div className={styles.time}>
          {paddedValue.split('').map((digit, idx) => (
            <span key={idx}>{digit}</span>
          ))}
        </div>
      </div>
      <div className={styles.label__wrapper}>
        <div className={styles.label__container}>
          <p>{label}</p>
        </div>
      </div>
    </div>
  );
}

export default Countdown;

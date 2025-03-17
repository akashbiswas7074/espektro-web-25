import React from 'react';
import styles from './style.module.scss';
function ComingSoonComponent({
  variant = 'light',
}: {
  variant?: 'dark' | 'light';
}) {
  return (
    <article
      style={
        {
          '--section-background-color':
            variant === 'light' ? '#f5f5f5' : '#120d31',
          '--acent-color': variant === 'light' ? '#4d4c7d' : '#4d4c7d',
          '--text-color': variant === 'light' ? '#120d31' : '#f5f5f5',
        } as React.CSSProperties
      }
      className={styles.comingsoon__article}
    >
      <div className={styles.loading__wrapper}>
        <div className={styles.atom}></div>
        {/* this is dot wrapper */}
        <div className={styles.dot}>
          {/* this is the dot */}
          <div></div>
        </div>
        <div className={styles.text}>
          <h1>Coming soon...</h1>
        </div>
      </div>
    </article>
  );
}

export default ComingSoonComponent;

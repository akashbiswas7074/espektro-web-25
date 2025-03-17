import React, { useEffect, useRef } from "react";

import styles from "./styles.module.scss";

function AfterMovieSection(): React.JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = 3;
  }, []);
  return (
    <section className={styles.after__movie__section__container}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        src="https://res.cloudinary.com/dezguraul/video/upload/v1741707323/espektro24_upload_txqj02.mp4"
      />
    </section>
  );
}

export default AfterMovieSection;

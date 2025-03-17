import { useEffect, useRef, useState } from "react";

import { easeInOut } from "framer-motion";

import { animated, useTransition } from "@react-spring/web";

import { events_data } from "./events_data";
import styles from "./style.module.scss";

export function EventSection({
  direction,
}: {
  direction: string;
}): JSX.Element {
  const [, setgalleryPreviewImage] = useState(1);
  const galleryWrapperRef = useRef<HTMLDivElement | null>(null);
  const galleryContainerRef = useRef<HTMLUListElement | null>(null);
  useEffect(() => {
    //! stopping double appending of clone gallery container
    if (!galleryContainerRef.current || !galleryWrapperRef.current) return;
    const galleryContainerCopy = galleryContainerRef.current.cloneNode(
      true
    ) as Element;
    galleryContainerCopy.setAttribute("aria-label", "gallery");
    galleryContainerCopy.setAttribute("data-clone", "true");
    galleryContainerCopy.childNodes.forEach((child) => {
      const imageId = +(child as Element).id;
      child.addEventListener("click", () => {
        setgalleryPreviewImage(imageId);
      });
    });
    galleryWrapperRef.current.appendChild(galleryContainerCopy);
  }, []);
  useEffect(() => {
    if (!galleryWrapperRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const imageId = +entry.target.id;
            setgalleryPreviewImage(imageId);
          }
        });
      },
      {
        root: galleryWrapperRef.current,
        threshold: 0.5,
        rootMargin: "0px -50% 0px 0px",
      }
    );
    const galleryItems = galleryWrapperRef.current.querySelectorAll("li");
    galleryItems.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
    };
  }, []);
  function handleOnClickThumbnail(image: number) {
    setgalleryPreviewImage(image);
  }
  return (
    <article id="espektro-artists-new" className={styles.event__article}>
      <section className={styles.event__section}>
        <div
          ref={galleryWrapperRef}
          aria-label="gallery-wrapper"
          className={`${styles.gallery__wrapper}`}
        >
          <ul
            className={`${styles.gallery} ${
              direction === "left" ? styles.scrollLeft : styles.scrollRight
            }`}
            aria-label="gallery"
            ref={galleryContainerRef}
          >
            {events_data.map(({ id, image, event_name }) => {
              return (
                <li
                  id={id.toString()}
                  aria-label="gallery-img"
                  onClick={() => handleOnClickThumbnail(id)}
                >
                  <figure>
                    <img src={image} alt={event_name} />
                  </figure>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </article>
  );
}

export function ImageViewer({
  imageUrl,
  eventTitle,
  eventDescription,
  organizingClubs,
}: {
  imageUrl: string;
  eventTitle: string;
  eventDescription: string;
  organizingClubs: Array<string>;
}) {
  const imageTransition = useTransition(imageUrl, {
    from: {
      opacity: 0.5,
      transform: "translate(15%,100%) scale(0.1)",
    },
    enter: {
      opacity: 1,
      transform: "translate(0%,0%) scale(1)",
    },
    config: {
      tension: 110,
      friction: 25,
      easing: easeInOut,
    },
  });
  const contentTransition = useTransition(imageUrl, {
    from: {
      opacity: 0,
      transform: "translateX(100%)",
    },
    enter: {
      opacity: 1,
      transform: "translateX(0%)",
    },
  });
  return (
    <div className={styles.gallery__preview}>
      {imageTransition((style) => (
        <animated.figure style={style}>
          <img src={imageUrl} alt={eventTitle} />
        </animated.figure>
      ))}
      {contentTransition((style) => (
        <animated.div style={style} id={styles.content__wrapper}>
          <h3>{eventTitle}</h3>
          <p>{eventDescription}</p>
          <div>
            <p>Organised by</p>
            <div>
              {organizingClubs.map((name, id) => (
                <span key={id}>{name}</span>
              ))}
            </div>
          </div>
        </animated.div>
      ))}
    </div>
  );
}

export default EventSection;

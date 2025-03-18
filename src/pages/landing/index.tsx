import "./Hero.css";
import React, { useEffect, useState, useCallback } from "react";

import SectionWrapper from "@/components-global/section-divider";

import ClubsSection from "./components/clubs";
import EventSection from "./components/events";
import FooterSection from "./components/footer";
import SponsorSection from "./components/sponsorship-v.2.0.0";
import Stats from "./components/stats";
import styles from "./style.module.scss";
// import Navigation from "@/components-global/navbar/navbar";
import MainTextAnimation from "./components/HeroNew/components/MainTextAnim/MainTextAnim";
import VideoHero from '../../components/VideoHero/VideoHero';
import AboutSection from "./components/about";

const HomeScreen: React.FC = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [videoActive, setVideoActive] = useState(true);
  const [_isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [_imageError, setImageError] = useState(false);

  const handleNavigateToEvents = () => {
    window.location.href = '/events';
  };

  const handleVideoFadeStart = () => {
    setShowNavbar(true);
  };

  const handleVideoEnd = () => {
    setVideoActive(false);
  };

  const LANDING_PAGE_SECTIONS: Array<{
    id: string;
    position?: "center" | "top" | "bottom";
    variant?: "light" | "dark";
    component: React.JSX.Element;
  }> = [
    {
      id: "about",
      component: <AboutSection/>,
    },
    {
      id: "stats",
      component: <Stats />,
    },
    {
      id: "sponsors",
      component: <SponsorSection />,
    },
    {
      id: "clubs",
      component: <ClubsSection />,
    },
  ];

  const handleScroll = useCallback(() => {
    const hero = document.getElementById("hero");
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 50 && videoActive) {
      setShowNavbar(true);
    }
    
    if (hero) {
      const heroHeight = hero.clientHeight;
      const blur = Math.min((scrollPosition / heroHeight) * 5, 5);
      hero.style.filter = `blur(${blur}px)`;
    }
  }, [videoActive]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, videoActive]);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="home-screen">
      {/* <div className="video-overlay">
        <VideoHero 
          onVideoEnd={handleVideoEnd} 
          onFadeStart={handleVideoFadeStart}
        /> 
      </div> */}
      <div className={`navbar-container ${showNavbar ? 'navbar-visible' : 'navbar-hidden'}`}>
        {/* <Navigation /> */}
      </div>
      <div className="landing">
        <div className="hero-section" id="hero">
          <video 
            className="hero-background-video" 
            autoPlay 
            loop 
            muted 
            playsInline
            preload="metadata"
            onLoadedData={handleVideoLoad}
            poster="https://res.cloudinary.com/dlrlet9fg/image/upload/v1742230891/video-poster.jpg"
          >
            <source 
              src="https://res.cloudinary.com/dlrlet9fg/video/upload/q_auto:low,f_auto/v1742230891/Nested_Sequence_11_1_1_1_q0o0b6.mp4" 
              type="video/mp4" 
            />
            Your browser does not support the video tag.
          </video>
          <div className="hero-overlay"></div>
          <div className="hero-content container mx-auto px-4 shadow-enhanced">
            <div className="flex flex-col items-center justify-center min-h-screen">
              <div className="text-center z-10 space-y-6 absolute-center shadow-text">
                <div className="hero-logo-container w-full max-w-3xl mx-auto flex justify-center">
                  <img 
                    src="https://res.cloudinary.com/dlrlet9fg/image/upload/v1742209222/especktro_25_sz9geh.png" 
                    alt="ESPEKTRO"
                    className="hero-logo animate-fade-in enhanced-logo"
                    loading="eager"
                    onError={handleImageError}
                  />
                </div>
                <div className="tagline-container">
                  <MainTextAnimation
                    text="THE WONDERS WEAVE"
                    className="tagline text-[1rem] md:text-[1.4rem] lg:text-[1.8rem] font-light tracking-wider text-gray-200"
                  />
                </div>
                <div className="w-full flex justify-center mt-2">
                  <MainTextAnimation
                    text="3rd to 6th APRIL"
                    className="hero-dates text-[1.2rem] md:text-[1.8rem] lg:text-[2.2rem] font-light tracking-widest"
                  />
                </div>
                <div className="button-group flex justify-center mt-12">
                  <button 
                    className="floating-button"
                    onClick={handleNavigateToEvents}
                  >
                    <img 
                      src="https://res.cloudinary.com/dlrlet9fg/image/upload/v1742209982/ESPEKTRO_cloth_e9tg6q" 
                      alt="Events" 
                      className="event-button-img"
                      loading="lazy"
                      onError={() => console.log("Event button image failed to load")}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="trigger" className="landing-page">
          <div className={styles.banner}>
            <EventSection direction="left" />
            <div className={styles.banner__text__container}>
              <span className={styles.banner__text}>#ESPEKTRO'25</span>
              <span className={styles.banner__text}>#ESPEKTRO'25</span>
              <span className={styles.banner__text}>#ESPEKTRO'25</span>
              <span className={styles.banner__text}>#ESPEKTRO'25</span>
              <span className={styles.banner__text}>#ESPEKTRO'25</span>
              <span className={styles.banner__text}>#ESPEKTRO'25</span>
              <span className={styles.banner__text}>#ESPEKTRO'25</span>
            </div>
            <EventSection direction="right" />
          </div>
          {LANDING_PAGE_SECTIONS.map((section) => (
            <SectionWrapper
              key={section.id}
              id={section.id}
              elementPosition={section.position}
              variant={section.variant}
            >
              {section.component}
            </SectionWrapper>
          ))}
          <FooterSection />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;

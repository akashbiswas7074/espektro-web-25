import "./Hero.css";
import React, { useEffect, useState } from "react";
// Remove useNavigate import since we'll use window.location directly
// import { useNavigate } from "react-router-dom";

import SectionWrapper from "@/components-global/section-divider";

import NewspaperAbout from "./components/NewspaperAbout";
import ClubsSection from "./components/clubs-24";
import EventSection from "./components/events";
import FooterSection from "./components/footer";
import SponsorSection from "./components/sponsorship-v.2.0.0";
import Stats from "./components/stats";
import styles from "./style.module.scss";
import Navigation from "@/components-global/navbar/navbar";
import MainTextAnimation from "./components/HeroNew/components/MainTextAnim/MainTextAnim";
import VideoHero from '../../components/VideoHero/VideoHero';
import AboutSection from "./components/about";

const HomeScreen: React.FC = () => {
  // Remove navigate const since we're not using it
  // const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(false);
  const [videoActive, setVideoActive] = useState(true);

  const handleNavigateToEvents = () => {
    // Replace navigate with direct window.location to force a refresh
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

  const handleScroll = () => {
    const hero = document.getElementById("hero");
    const scrollPosition = window.scrollY;
    
    // Show navbar when scrolling begins
    if (scrollPosition > 50 && videoActive) {
      setShowNavbar(true);
    }
    
    if (hero) {
      const heroHeight = hero.clientHeight;
      const blur = (scrollPosition / heroHeight) * 10;
      hero.style.filter = `blur(${blur}px)`;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [videoActive]);

  return (
    <div className="home-screen">
      <div className="video-overlay">
        <VideoHero 
          onVideoEnd={handleVideoEnd} 
          onFadeStart={handleVideoFadeStart}
        />
      </div>
      <div className={`navbar-container ${showNavbar ? 'navbar-visible' : 'navbar-hidden'}`}>
        <Navigation />
      </div>
      <div className="landing">
        <div className="hero-section" id="hero">
          <video 
            className="hero-background-video" 
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source 
              src="https://res.cloudinary.com/dlrlet9fg/video/upload/v1742216971/Nested_Sequence_11_1_1_gw71zc.mp4" 
              type="video/mp4" 
            />
          </video>
          <div className="hero-overlay"></div>
          <div className="hero-content container mx-auto px-4">
            <div className="flex flex-col items-center justify-center min-h-screen">
              <div className="text-center z-10 space-y-10 absolute-center">
                <div className="hero-logo-container w-full max-w-3xl mx-auto flex justify-center">
                  <img 
                    src="https://res-console.cloudinary.com/dlrlet9fg/thumbnails/v1/image/upload/v1742209222/ZXNwZWNrdHJvXzI1X3N6OWdlaA==/drilldown"
                    alt="ESPEKTRO"
                    className="hero-logo animate-fade-in"
                  />
                </div>
                <div className="w-full flex justify-center">
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
                      src="https://res-console.cloudinary.com/dlrlet9fg/thumbnails/v1/image/upload/v1742209982/RVNQRUtUUk9fY2xvdGhfZTl0ZzZx/drilldown" 
                      alt="Events" 
                      className="event-button-img"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Remove any extra containers that might cause spacing */}
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

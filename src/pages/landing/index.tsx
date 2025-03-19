import "./Hero.css";
import "./AudioControls.css";
import React, { useEffect, useState, useCallback, lazy, Suspense } from "react";
import SectionWrapper from "@/components-global/section-divider";

// Lazy load components that aren't needed immediately
const VideoHero = lazy(() => import('../../components/VideoHero/VideoHero'));
const ClubsSection = lazy(() => import("./components/clubs"));
const EventSection = lazy(() => import("./components/events"));
const FooterSection = lazy(() => import("./components/footer"));
const SponsorSection = lazy(() => import("./components/sponsorship-v.2.0.0"));
const Stats = lazy(() => import("./components/stats"));
const AboutSection = lazy(() => import("./components/about"));

// Import only what's needed immediately
import styles from "./style.module.scss";
import MainTextAnimation from "./components/HeroNew/components/MainTextAnim/MainTextAnim";

const HomeScreen: React.FC = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [videoActive, setVideoActive] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Define constants outside of render function
  const videoPoster = "https://res.cloudinary.com/dlrlet9fg/image/upload/v1742230891/video-poster.jpg";
  const logoSrc = "https://res.cloudinary.com/dlrlet9fg/image/upload/v1742209222/especktro_25_sz9geh.png";
  const eventBtnSrc = "https://res.cloudinary.com/dlrlet9fg/image/upload/v1742209982/ESPEKTRO_cloth_e9tg6q";
  
  // Memoize handlers
  const handleNavigateToEvents = useCallback(() => {
    window.location.href = '/events';
  }, []);

  const handleVideoFadeStart = useCallback(() => {
    setShowNavbar(true);
  }, []);

  const handleVideoEnd = useCallback(() => {
    setVideoActive(false);
  }, []);

  const handleVideoLoad = useCallback(() => {
    setIsVideoLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  // Define landing page sections once
  const LANDING_PAGE_SECTIONS = React.useMemo(() => [
    { id: "about", component: <AboutSection /> },
    { id: "stats", component: <Stats /> },
    { id: "sponsors", component: <SponsorSection /> },
    { id: "clubs", component: <ClubsSection /> },
  ], []);

  // Optimize scroll handler with throttling
  const handleScroll = useCallback(() => {
    // Use requestAnimationFrame for smoother scrolling
    requestAnimationFrame(() => {
      const hero = document.getElementById("hero");
      const scrollPosition = window.scrollY;
      
      if (scrollPosition > 50 && videoActive) {
        setShowNavbar(true);
      }
      
      if (hero) {
        const heroHeight = hero.clientHeight;
        const blur = Math.min((scrollPosition / heroHeight) * 3, 3); // Reduced blur intensity
        hero.style.filter = `blur(${blur}px)`;
      }
    });
  }, [videoActive]);

  // Setup scroll listener with passive flag for better performance
  useEffect(() => {
    // Create a throttled scroll handler
    let ticking = false;
    const throttledScrollHandler = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
      }
    };
    
    window.addEventListener("scroll", throttledScrollHandler, { passive: true });
    return () => {
      window.removeEventListener("scroll", throttledScrollHandler);
    };
  }, [handleScroll]);

  return (
    <div className="home-screen">
      <div className="video-overlay">
        {videoActive && (
          <Suspense fallback={<div className="video-loading-fallback"></div>}>
            <VideoHero 
              onVideoEnd={handleVideoEnd} 
              onFadeStart={handleVideoFadeStart}
              // Lower playback rate to reduce CPU usage
              playbackRate={1.8}
            />
          </Suspense>
        )}
      </div>
      
      <div className={`navbar-container ${showNavbar ? 'navbar-visible' : 'navbar-hidden'}`}>
      </div>
      
      <div className="landing">
        <div className="hero-section" id="hero">
          <video 
            className="hero-background-video" 
            autoPlay
            muted
            playsInline
            preload="none" // Changed from metadata to reduce initial load
            onLoadedData={handleVideoLoad}
            poster={videoPoster}
            loading="lazy"
          >
            <source 
              src="https://res.cloudinary.com/dlrlet9fg/video/upload/q_auto:low,f_auto/v1742230891/Nested_Sequence_11_1_1_1_q0o0b6.mp4" 
              type="video/mp4" 
            />
          </video>
          
          <div className="hero-overlay"></div>
          
          <div className="hero-content container mx-auto px-4">
            <div className="flex flex-col items-center justify-center min-h-screen">
              <div className="text-center z-10 space-y-6 absolute-center">
                <div className="hero-logo-container w-full max-w-3xl mx-auto flex justify-center">
                  <img 
                    src={logoSrc}
                    alt="ESPEKTRO"
                    className="hero-logo animate-fade-in"
                    loading="eager"
                    width="600"
                    height="200"
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
                      src={eventBtnSrc} 
                      alt="Events" 
                      className="event-button-img"
                      loading="lazy"
                      width="120"
                      height="120"
                      onError={() => console.error("Event button image failed to load")}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div id="trigger" className="landing-page">
          <div className={styles.banner}>
            <Suspense fallback={<div className="section-loading"></div>}>
              <EventSection direction="left" />
            </Suspense>
            <div className={styles.banner__text__container}>
              {/* Reduced repetitive elements */}
              {Array(5).fill(0).map((_, i) => (
                <span key={i} className={styles.banner__text}>#ESPEKTRO'25</span>
              ))}
            </div>
            <Suspense fallback={<div className="section-loading"></div>}>
              <EventSection direction="right" />
            </Suspense>
          </div>
          
          {LANDING_PAGE_SECTIONS.map((section) => (
            <Suspense key={section.id} fallback={<div className="section-loading"></div>}>
              <SectionWrapper
                id={section.id}
                elementPosition={section.position}
                variant={section.variant}
              >
                {section.component}
              </SectionWrapper>
            </Suspense>
          ))}
          
          <Suspense fallback={<div className="section-loading"></div>}>
            <FooterSection />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default React.memo(HomeScreen);

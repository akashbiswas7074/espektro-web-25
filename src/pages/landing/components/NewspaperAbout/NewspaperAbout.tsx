import React from 'react';
import './NewspaperAbout.css';

const NewspaperAbout: React.FC = () => {
  return (
    <div className="main__wrapper">
      <main className="newspaper-main">
        <h1>The Espektro Herald</h1>
        <aside>
          <div>
            <div className="issue1">Issue #2025</div>
            <div className="date">April 3-6, 2025</div>
            <div className="cost">Free Entry</div>
          </div>
        </aside>
        <h2 className="title--large main-title">NITK's Premier Tech-Cultural Festival Returns</h2>
        <div className="main-text multi-column">
          <p>Welcome to Espektro 2025, NITK's flagship annual tech-cultural festival that promises an electrifying blend of innovation, creativity, and entertainment. For over two decades, Espektro has been the heartbeat of NITK's vibrant campus life, drawing thousands of participants from across India for four days of non-stop action and excitement.</p>
          <p>This year's edition brings together cutting-edge technical competitions, mesmerizing cultural performances, thought-provoking workshops, and star-studded pronites. From coding challenges to robotic competitions, from dance performances to music concerts, Espektro offers something for everyone.</p>
        </div>

        <a href="#" className="terrarium">
          <figure>
            <img src="https://res.cloudinary.com/dlrlet9fg/image/upload/v1742212075/espektro_crowd_mcz4gi.jpg" alt="Espektro Crowd" />
            <figcaption>Thousands gather at NITK during last year's Espektro</figcaption>
          </figure>
        </a>

        <a href="/events" className="item-with-image plan span--2 long--2">
          <img src="https://res.cloudinary.com/dlrlet9fg/image/upload/v1742212075/espektro_event_h7wdrq.jpg" alt="Tech Events" />
          <h4>TECHNICAL EVENTS FEATURE LATEST INNOVATIONS</h4>
          <div className="multi-column">
            <p>This year's technical events showcase the cutting-edge innovations in robotics, AI, and sustainable technology.</p>
            <p>From hackathons to ideathons, from circuit design to drone racing, Espektro 2025 brings together the best minds from across the country to compete and collaborate...</p>
          </div>
        </a>
        
        <a href="/events" className="hogwarts">
          <div className="hogwarts__title">30+ Events Over Four Days</div>
          <div className="hogwarts__image">
            <span>Register Now!</span>
            <img src="https://res.cloudinary.com/dlrlet9fg/image/upload/v1742212075/espektro_calendar_kb0gny.jpg" alt="Event Calendar" />
          </div>
        </a>
        
        <a href="/artists" className="item-with-image pasta with-border">
          <h4>Celebrity Performances to Light Up Pronites</h4>
          <p>Get ready for electrifying performances by top artists and bands during the four-night extravaganza that caps each day of Espektro 2025!</p>
        </a>
        
        <a href="#" className="item-with-image magazine with-border">
          <h4>Workshops & Guest Lectures</h4>
          <p>Industry experts and academic luminaries will conduct workshops and deliver lectures on emerging technologies and career opportunities.</p>
        </a>
        
        <a href="#" className="item-with-image style">
          <h4>Cultural Events Showcase Diverse Talents</h4>
          <p>From classical dance to contemporary music, from fashion shows to theatrical performances, Espektro 2025 celebrates the rich cultural diversity of India.</p>
          <p>Participants from colleges across the country will showcase their talents and compete for exciting prizes and recognition.</p>
        </a>
        
        <a href="/accomodation" className="item-with-image toggles">
          <img src="https://res.cloudinary.com/dlrlet9fg/image/upload/v1742212075/espektro_accommodation_invigr.jpg" alt="Accommodation" />
          <h4>Accommodation Facilities for Outstation Participants</h4>
          <p>Comfortable and affordable accommodation options are available for participants coming from other cities and colleges.</p>
        </a>
        
        <a href="/espektro-merchandise" className="menu">
          <figure>
            <img src="https://res.cloudinary.com/dlrlet9fg/image/upload/v1742212075/espektro_merch_lgahk2.jpg" alt="Espektro Merchandise" />
            <figcaption>Official Espektro 2025 merchandise now available for pre-order!</figcaption>
          </figure>
        </a>
        
        <a href="#" className="social">
          <img className="social__image" src="https://res.cloudinary.com/dlrlet9fg/image/upload/v1742212075/espektro_social_qsvmmg.jpg" alt="Social Media" />
          <div className="social__subtitle">Connect With Us</div>
          <div className="social__content">Follow Espektro on Instagram, Facebook, and Twitter for real-time updates, behind-the-scenes content, and exclusive announcements. Join the conversation using #Espektro2025.</div>
        </a>
        
        <div className="item-with-image cssgrid-collection">
          <a href="#" className="cssgrid-collection__image">
            <img src="https://res.cloudinary.com/dlrlet9fg/image/upload/v1742212075/espektro_sponsors_qolnrh.jpg" alt="Sponsors" />
          </a>
          <div className="cssgrid-collection__content">
            <h4><a href="#">Leading Companies Partner with Espektro 2025</a></h4>
            <div className="multi-column-3">
              <p>Espektro 2025 is proudly supported by leading tech companies, startups, and educational institutions who share our vision for innovation and excellence.</p>
              <p>Our sponsors not only provide financial support but also offer internships, job opportunities, and mentorship to participants.</p>
              <p>This year's platinum sponsors include major tech giants who will also conduct exclusive recruitment drives during the festival, making Espektro not just a celebration of talent but also a gateway to promising careers.</p>
            </div>
          </div>
        </div>
        
        <div className="sidebar">
          <h3 className="title--big">Quick Facts</h3>
          
          <a href="#" className="codepen-item pie">
            <img className="pie__image" src="https://res.cloudinary.com/dlrlet9fg/image/upload/v1742212075/espektro_stats_r8w86i.jpg" alt="Statistics" />
            <div className="pie__subtitle">Festival Highlights:</div>
            <div className="pie__content">
              <h4>10,000+ Attendees</h4>
              <p>Espektro has grown to become one of the largest tech-cultural festivals in South India, attracting participants from over 200 colleges.</p>
            </div>
          </a>
          
          <a href="#" className="sidebar-item captcha">
            <h5>24 Years of Excellence</h5>
            <p>Since its inception, Espektro has been the flagship event of NITK, evolving with each edition while maintaining its core focus on innovation and creativity.</p>
          </a>

          <a href="#" className="sidebar-item slack-ui with-border">
            <h5>₹10 Lakhs in Prizes</h5>
            <p>Participants compete for cash prizes, internships, certificates, and recognition in various technical and cultural competitions.</p>
          </a>
          
          <a href="#" className="workout">
            <div className="workout__image">
              <img src="https://res.cloudinary.com/dlrlet9fg/image/upload/v1742212075/espektro_venue_nocfhw.jpg" alt="NITK Campus" />
            </div>
            <div className="workout__blurb">NITK Surathkal</div>
            <div className="workout__title">Scenic Beachside Campus</div>
          </a>
        </div>
      </main>
    </div>
  );
};

export default NewspaperAbout;

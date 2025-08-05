import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import './App.css';

// Custom hook for hero split animation only
function useHeroSplitAnimation(direction = 'left') {
  const ref = useRef();
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      controls.set({ opacity: 1, x: 0 });
      return;
    }
    controls.set({ opacity: 0, x: direction === 'left' ? -80 : 80 });
    setTimeout(() => {
      controls.start({
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: 'easeInOut' },
      });
      setHasAnimated(true);
    }, 200);
  }, [controls]);

  const initialX = direction === 'left' ? -80 : 80;
  return [ref, controls, { opacity: 0, x: initialX }];
}

function App() {
  // Hero split animation only
  const [heroImgRef, heroImgControls, heroImgInitial] = useHeroSplitAnimation('left');
  const [heroTextRef, heroTextControls, heroTextInitial] = useHeroSplitAnimation('right');

  return (
    <div className="App">
      {/* Hero / Introduction Section */}
      <section id="hero" className="hero-section">
        <div className="hero-content">
          <motion.img
            src={process.env.PUBLIC_URL + "/pratik-portrait.jpg"}
            alt="Pratik Abhang"
            className="hero-photo"
            ref={heroImgRef}
            initial={heroImgInitial}
            animate={heroImgControls}
            whileHover={{ scale: 1.08, zIndex: 2, boxShadow: '0 12px 36px rgba(59,130,246,0.18)' }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
          />
          <motion.div
            className="hero-text"
            ref={heroTextRef}
            initial={heroTextInitial}
            animate={heroTextControls}
          >
            <h1>Pratik Abhang</h1>
            <div className="hero-subheadline" style={{ fontFamily: 'Dancing Script, cursive', fontSize: '1.25rem', fontWeight: 500, color: '#222', marginBottom: '1.1em', lineHeight: 1.3 }}>
              <span>I build agents that watch, act, and learn - </span><br />
              <span>so you don’t have to.</span>
            </div>
            <div className="hero-cta">
              <a href="#portfolio" className="btn btn-primary">View Portfolio</a>
              <a href="#contact" className="btn btn-secondary">Contact Me</a>
              <a href="https://drive.google.com/drive/folders/1NkF8LQaz0GDqvFvXEZI1ggw1heCYbzck?usp=drive_link" className="btn btn-tertiary" target="_blank" rel="noopener noreferrer">Resume</a>
            </div>
          </motion.div>
        </div>
      </section>
      {/* About / Bio Section */}
      <section id="about" className="about-section">
        <div className="about-content">
          <h2>About Me</h2>
          <p>
            With a strong background in AI automation, generative AI, and data science, I specialize in building end-to-end solutions that transform raw data into actionable intelligence. My expertise spans workflow automation (n8n), machine learning, data analysis, and visualization, using Python and modern AI tools to deliver impactful results. I am passionate about leveraging technology to solve real-world problems and drive innovation for businesses of all sizes.
          </p>
          <p>
            During my masters in data science, I founded a Data Science Club to help others. With a strong commitment to learning, I'm excited to use data science to innovate in every possible way.
          </p>
          <p style={{ marginTop: '1rem', fontSize: '1rem' }}>
            <a href="https://www.linkedin.com/company/data-science-club-fc/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BbUl%2FWMxKRAiaOTihVVKW0g%3D%3D" target="_blank" rel="noopener noreferrer" style={{ color: '#111', textDecoration: 'underline' }}>
              🔗Data Science Club
            </a>
          </p>
        </div>
      </section>
      {/* Skills Section */}
      <section id="skills" className="skills-section">
        <div className="skills-content">
          <h2>Skills</h2>
          <div className="skills-grid">
            <div className="skill-badge">AI Automation (n8n)</div>
            <div className="skill-badge">Generative AI</div>
            <div className="skill-badge">Machine Learning</div>
            <div className="skill-badge">Data Science</div>
            <div className="skill-badge">Python</div>
            <div className="skill-badge">Data Analysis</div>
            <div className="skill-badge">API Integration</div>
          </div>
        </div>
      </section>
      {/* Portfolio Section */}
      <section id="portfolio" className="portfolio-section">
        <div className="portfolio-content">
          <h2>Portfolio</h2>
          <div className="portfolio-grid">
            <div className="portfolio-card">
            <div className="portfolio-img-placeholder">
                <img src={process.env.PUBLIC_URL + "/aicalling.png"} alt="Personal Calling Assistant" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
              </div>
              <h3>Personal Calling Assistant</h3>
              <p>Built calling agent to handle query, Provide required information and schedule mettings.</p>
              <div className="portfolio-tags">
                <span>n8n Automation</span><span>Appointment Booking</span><span>Query Handling</span><span>etc</span>
              </div>
            </div>
            <div className="portfolio-card">
            <div className="portfolio-img-placeholder">
                <img src={process.env.PUBLIC_URL + "/n8n.png"} alt="Auto Response System" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
              </div>
              <h3>Auto Response System</h3>
              <p>When a visitor submits the contact form, it triggers an n8n workflow.The workflow automatically sends a personalized acknowledgment email to the sender using configured email credentials.</p>
              <div className="portfolio-tags">
                <span>Webhook</span><span>n8n</span><span>Mail Automation</span>
              </div>
            </div>
            <div className="portfolio-card">
            <div className="portfolio-img-placeholder">
                <img src={process.env.PUBLIC_URL + "/tiger_leopard.png"} alt="Automated Wildlife Watch" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
              </div>
              <h3>Automated Wildlife Watch</h3>
              <p>Efficiently detected animal with YOLOv12 and GenAI (Gemini) model to identify threat animal with mAP of 82.2% ,Used Twillio API to sent an alert message on registered number</p>
              <div className="portfolio-tags">
                <span>Generative AI (Gemini)</span><span>Computer Vision (YOLO)</span><span>Twillio API</span>
              </div>
            </div>
            <div className="portfolio-card" onClick={() => window.open('https://huggingface.co/spaces/Pratik3003/Book_Recommendation_Model', '_blank')} style={{ cursor: 'pointer' }}>
              <div className="portfolio-img-placeholder">
                <img src={process.env.PUBLIC_URL + "/OpenBooks.jpg"} alt="Book Recommendation System" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
              </div>
              <h3>Book Recommendation System</h3>
              <p>Develope content based recommendation system, Scrap more than 2 Lakhs of records, Implemented NLP and KNN to recommend 10 similar books.</p>
              <div className="portfolio-tags">
                <span>Python</span><span>Web Scraping</span><span>Machine Learning</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="testimonials-content">
          <h2>Testimonials</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-quote"></p>
              <div className="testimonial-author"><br /><span></span></div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-quote">“It was an absolute pleasure working with Pratik. He showed excellent attention to detail, followed instructions meticulously, and delivered consistently high-quality results. His responsiveness and reliability made collaboration seamless. Truly a dependable freelancer with a great work ethic, would gladly work together again on future tasks. Highly recommended!”</p>
              <div className="testimonial-author">Odedara Daksha<br /><span>SMARTI DATA, Japan Fukuoka</span></div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-quote"></p>
              <div className="testimonial-author"><br /><span></span></div>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="contact-content">
          <h2>Contact</h2>
          <form
    className="contact-form"
    onSubmit={async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("https://n8n.srv941220.hstgr.cloud/webhook-test/portfolio-website", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("Message sent successfully!");
        e.target.reset(); // optional
      } else {
        alert("Failed to send message.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("❌ Error sending message.");
    }
  }}
>
  <input type="text" name="name" placeholder="Your Name" required />
  <input type="email" name="email" placeholder="Your Email" required />
  <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
  <button type="submit" className="btn btn-primary">Send Message</button>
</form>

          <div className="contact-info">
            <p>Email: <a href="mailto:pratikdata30@gmail.com">pratikdata30@gmail.com</a></p>
            <div className="contact-socials">
              <a href="https://www.linkedin.com/in/pratik-abhang30" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
              </a>
              <a href="https://github.com/Pratik-Abhang" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576 4.765-1.588 8.199-6.084 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="tel:+917588217950" aria-label="Phone">
                <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              </a>
            </div>
            <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#666' }}>Click phone icon to call</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;

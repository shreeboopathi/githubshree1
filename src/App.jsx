import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './App.css';

const Sparkle = ({ delay }) => {
  const randomX = Math.random() * 100 - 50; // -50 to 50vw
  const randomY = Math.random() * 100 - 50; // -50 to 50vh

  return (
    <motion.div
      className="sparkle"
      initial={{
        x: randomX + 'vw',
        y: randomY + 'vh',
        opacity: 0,
        scale: 0
      }}
      animate={{
        x: [randomX + 'vw', '0vw', randomX * 0.5 + 'vw'], // Move to center then disperse slightly
        y: [randomY + 'vh', '0vh', randomY * 0.5 + 'vh'],
        opacity: [0, 1, 0],
        scale: [0, 1.5, 0]
      }}
      transition={{
        duration: 2, // Faster animation
        delay: delay,
        ease: "easeInOut",
        times: [0, 0.5, 1],
        repeat: Infinity,
        repeatDelay: Math.random() * 1
      }}
    />
  );
};

const FireworkSparkle = () => {
  // Random color for diversity
  const colors = ['#FFD700', '#FF4500', '#00FF00', '#00FFFF', '#FF00FF'];
  const color = colors[Math.floor(Math.random() * colors.length)];

  const randomX = Math.random() * 100; // 0-100%
  const randomY = Math.random() * 100; // 0-100%

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: randomY + '%',
        left: randomX + '%',
        width: '4px',
        height: '4px',
        borderRadius: '50%',
        backgroundColor: color,
        boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
        zIndex: 20,
        pointerEvents: 'none',
      }}
      initial={{ scale: 0, opacity: 1 }}
      animate={{
        scale: [0, 2, 0],
        opacity: [1, 1, 0],
        x: [0, (Math.random() - 0.5) * 50],
        y: [0, (Math.random() - 0.5) * 50],
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
        repeat: Infinity,
        repeatDelay: Math.random() * 2,
      }}
    />
  );
};

const GhostlyMist = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', zIndex: 5 }}>
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '300%', // Very wide to cover diagonal
          height: '400px', // Thicker mist
          background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.6), rgba(255,255,255,0))', // Higher opacity
          filter: 'blur(60px)',
          transform: 'translate(-50%, -50%) rotate(-45deg)', // Center and rotate
        }}
        initial={{
          x: '-100%',
          y: '100%'
        }}
        animate={{
          x: '100%',
          y: '-100%'
        }}
        transition={{
          duration: 8,
          ease: "linear",
          repeat: Infinity,
          repeatDelay: 0
        }}
      />
    </div>
  );
};

const TypewriterText = ({ text, onComplete }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30); // Speed of typing
      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      if (onComplete) {
        onComplete();
      }
    }
  }, [currentIndex, text, onComplete, isComplete]);

  return (
    <p className={isComplete ? "floating-text" : ""}>
      {displayText}
      <span className="blinking-cursor">|</span>
    </p>
  );
};

const ThunderEffect = () => {
  const [flash, setFlash] = useState(false);
  const thunderAudioRef = useRef(null);

  useEffect(() => {
    const triggerThunder = () => {
      setFlash(true);

      // Play thunder sound
      if (thunderAudioRef.current) {
        thunderAudioRef.current.currentTime = 0;
        thunderAudioRef.current.volume = 1.0;
        thunderAudioRef.current.play().catch(e => console.error("Thunder play failed:", e));
      }

      setTimeout(() => setFlash(false), 200); // Quick flash

      // Schedule next thunder
      const nextThunder = Math.random() * 5000 + 3000; // 3-8 seconds
      setTimeout(triggerThunder, nextThunder);
    };

    const timer = setTimeout(triggerThunder, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <audio ref={thunderAudioRef} src="/thunder_sound.mp3" />
      <motion.div
        className="thunder-flash"
        animate={{ opacity: flash ? 0.6 : 0 }}
        transition={{ duration: 0.1 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          pointerEvents: 'none',
          zIndex: 50
        }}
      />
      {flash && (
        <motion.svg
          viewBox="0 0 100 100"
          className="lightning-bolt"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 1, pathLength: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'absolute',
            top: 0,
            left: Math.random() * 80 + '%', // Random horizontal position
            width: '200px',
            height: '400px',
            zIndex: 40,
            filter: 'drop-shadow(0 0 10px #fff)'
          }}
        >
          <motion.path
            d="M50,0 L30,40 L60,40 L20,100"
            fill="none"
            stroke="white"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.1 }}
          />
        </motion.svg>
      )}
    </>
  );
};

function App() {
  const [showText, setShowText] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [page, setPage] = useState('home'); // 'home' or 'about'
  const [formData, setFormData] = useState({ from: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const audioRef = useRef(null);
  const transitionAudioRef = useRef(null);
  const forestAudioRef = useRef(null);
  const projectsAudioRef = useRef(null);

  useEffect(() => {
    // Stop all audio first
    if (audioRef.current) audioRef.current.pause();
    if (forestAudioRef.current) forestAudioRef.current.pause();
    if (projectsAudioRef.current) projectsAudioRef.current.pause();

    if (page === 'home') {
      // Show text after sparkles gather
      const timer = setTimeout(() => {
        setShowText(true);
      }, 1500);

      // Try to autoplay music
      if (audioRef.current) {
        audioRef.current.volume = 0.5;
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => console.log("Autoplay blocked:", err));
      }
      return () => clearTimeout(timer);
    } else if (page === 'about' || page === 'skills') {
      // Play forest ambience or horror hit
      if (forestAudioRef.current) {
        forestAudioRef.current.volume = 0.5;
        forestAudioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => console.log("Autoplay blocked:", err));
      }
    } else if (page === 'projects') {
      // Play projects page music
      if (projectsAudioRef.current) {
        projectsAudioRef.current.volume = 0.5;
        projectsAudioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => console.log("Autoplay blocked:", err));
      }
    }
  }, [page]);

  const toggleMusic = () => {
    let currentAudio;
    if (page === 'home') {
      currentAudio = audioRef.current;
    } else if (page === 'projects') {
      currentAudio = projectsAudioRef.current;
    } else {
      currentAudio = forestAudioRef.current;
    }

    if (currentAudio) {
      if (isPlaying) {
        currentAudio.pause();
      } else {
        currentAudio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNextClick = () => {
    if (transitionAudioRef.current) {
      transitionAudioRef.current.play().catch(e => console.error(e));
    }

    // Fade out main music
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Wait for sound to play a bit before switching
    setTimeout(() => {
      setPage('about');
      setIsPlaying(true); // Assume autoplay works for next page or user already interacted
    }, 1000);
  };

  // Generate a lot of sparkles
  const sparkles = Array.from({ length: 50 }).map((_, i) => (
    <Sparkle key={i} delay={Math.random() * 1.5} />
  ));

  if (page === 'about') {
    return (
      <div className="app-container">
        <div className="background-image forest-bg"></div>
        <ThunderEffect />
        <audio ref={forestAudioRef} src="/custom_audio.mp4" loop />

        <button className="music-toggle" onClick={toggleMusic}>
          {isPlaying ? '🔊' : '🔇'}
        </button>

        <motion.div
          className="about-content"
          initial={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)'
          }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          whileHover={{
            opacity: [1, 0.5, 1],
            transition: { duration: 0.2, repeat: Infinity }
          }}
        >
          <TypewriterText
            text="Hi, I'm Shree a passionate and driven individual who loves turning ideas into meaningful work. I focus on learning, creating, and improving every day. Whether I'm working on a project or exploring something new, I enjoy solving problems and building things that make an impact."
            onComplete={() => setShowButtons(true)}
          />
        </motion.div>

        {showButtons && (
          <div className="nav-buttons-container">
            {['Skills', 'Projects', 'Meet Me'].map((item, index) => (
              <motion.button
                key={item}
                className="nav-button"
                onClick={() => {
                  console.log('Button clicked:', item);
                  if (item === 'Skills') setPage('skills');
                  else if (item === 'Projects') setPage('projects');
                  else if (item === 'Meet Me') {
                    console.log('Setting page to meet_me');
                    setPage('meet_me');
                  }
                }}
                initial={{ x: '-100vw', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 2,
                  delay: index * 0.5, // Stagger effect
                  ease: "easeOut"
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {item}
                {/* Trail Sparkles for Nav Buttons */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    style={{
                      position: 'absolute',
                      width: '3px',
                      height: '3px',
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      top: '50%',
                      left: '10%',
                      pointerEvents: 'none',
                      boxShadow: '0 0 5px white'
                    }}
                    animate={{
                      x: [-10, -80], // Move left behind the button
                      y: [0, (Math.random() - 0.5) * 40], // Spread vertically
                      opacity: [1, 0],
                      scale: [1, 0]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: Math.random(),
                      ease: "easeOut"
                    }}
                  />
                ))}
              </motion.button>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (page === 'projects') {
    const projects = [
      {
        title: "UNESCO (2023). Digital Learning for All",
        subtitle: "Challenges and Solutions for Rural Education",
        link: "https://unesdoc.unesco.org/ark:/48223/pf0000252324",
        image: "/project1.png" // You'll need to add this image
      },
      // Add more projects here
    ];

    return (
      <div className="app-container">
        <div className="background-image projects-bg"></div>

        {/* Audio element for projects page */}
        <audio ref={projectsAudioRef} src="/queen-of-the-ghosts-269433.mp3" loop />

        <button className="music-toggle" onClick={toggleMusic}>
          {isPlaying ? '🔊' : '🔇'}
        </button>

        <button className="back-button" onClick={() => setPage('skills')}>
          ⬅ Back to Skills
        </button>

        <div className="skill-nav-buttons">
          <button className="skill-nav-btn" onClick={() => setPage('meet_me')}>Meet Me</button>
        </div>

        <motion.div
          className="projects-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="projects-main-title"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            My Projects
          </motion.h1>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="project-card"
                initial={{
                  x: index % 2 === 0 ? -100 : 100,
                  opacity: 0,
                  rotateY: 45
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                  rotateY: 0
                }}
                transition={{
                  duration: 1.5,
                  delay: 0.5 + index * 0.3,
                  ease: "easeOut"
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 40px rgba(255, 215, 0, 0.8)",
                  transition: { duration: 0.3 }
                }}
              >
                <div className="project-image-container">
                  <img src={project.image} alt={project.title} className="project-image" />
                </div>

                <div className="project-info">
                  <h2 className="project-title">{project.title}</h2>
                  <p className="project-subtitle">{project.subtitle}</p>
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    whileHover={{ scale: 1.1, textShadow: "0 0 10px #FFD700" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {project.link}
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  if (page === 'skills') {
    return (
      <div className="app-container">
        {/* Firework/Cracker Sparkles Layer */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', zIndex: 15 }}>
          {Array.from({ length: 30 }).map((_, i) => (
            <FireworkSparkle key={i} />
          ))}
        </div>
        <GhostlyMist />
        <motion.div
          className="background-image skills-bg"
          initial={{ scale: 1 }}
          animate={{ scale: 1.2 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        ></motion.div>

        <audio ref={forestAudioRef} src="/horror_hit.mp3" loop />



        <button className="back-button" onClick={() => setPage('about')}>
          ⬅ Back
        </button>

        <div className="skill-nav-buttons">
          {['Projects', 'Meet Me'].map((item, index) => (
            <motion.button
              key={item}
              className="skill-nav-btn"
              onClick={() => setPage(item === 'Meet Me' ? 'meet_me' : 'projects')}
              initial={{ x: '-90vw', opacity: 0, rotate: -10 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              transition={{
                duration: 3,
                delay: 1 + index * 0.5,
                ease: "easeOut"
              }}
              whileHover={{ scale: 1.1, textShadow: "0 0 8px rgb(255, 255, 255)" }}
              whileTap={{ scale: 0.9 }}
              style={{ position: 'relative', overflow: 'visible' }}
            >
              {item}
              {/* Glitter Sparkling Tail */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '10%',
                    width: Math.random() * 4 + 2 + 'px',
                    height: Math.random() * 4 + 2 + 'px',
                    backgroundColor: ['#FFD700', '#FFFFFF', '#00FFFF'][Math.floor(Math.random() * 3)],
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    filter: 'blur(0.5px)',
                    zIndex: -1
                  }}
                  animate={{
                    x: [-10, -100 - Math.random() * 100], // Trail far behind
                    y: [0, (Math.random() - 0.5) * 50],
                    opacity: [1, 0],
                    scale: [1, 0],
                    rotate: [0, 180]
                  }}
                  transition={{
                    duration: Math.random() * 1 + 0.5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              ))}
            </motion.button>
          ))}
        </div>

        <div className="skills-content">
          {[
            { icon: '5', title: 'HTML, CSS', width: '90%', color: '#e34c26' },
            { icon: 'JS', title: 'JavaScript, React', width: '85%', color: '#f7df1e' },
            { icon: 'UI', title: 'UI/UX Design', width: '80%', color: '#00d8ff' }
          ].map((skill, index) => (
            <div
              key={index}
              className="skill-card"
            >
              <motion.div
                className="skill-icon"
                style={{ color: skill.color }}
                initial={{
                  x: (Math.random() > 0.5 ? 100 : -100) + 'vw',
                  y: (Math.random() > 0.5 ? 100 : -100) + 'vh',
                  opacity: 0
                }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 4, ease: "easeOut" }} // Slow motion
              >
                {skill.icon}
              </motion.div>

              <motion.div
                initial={{
                  x: (Math.random() > 0.5 ? 100 : -100) + 'vw',
                  y: (Math.random() > 0.5 ? 100 : -100) + 'vh',
                  opacity: 0
                }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 4, ease: "easeOut", delay: 0.5 }}
              >
                <motion.h3
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 5, ease: "easeInOut" }}
                  className="blinking-skill-text"
                >
                  {skill.title}
                </motion.h3>
              </motion.div>

              <div className="magical-progress-bar">
                <motion.div
                  className="progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: skill.width }}
                  transition={{
                    duration: 5, // Very slow filling
                    delay: 4, // Wait for text to arrive
                    ease: "easeOut"
                  }}
                />
              </div>
            </div>
          ))}

          <div className="soft-skills">
            {['Problem Solving', 'Communication', 'Group Leading'].map((skill, i) => (
              <motion.div
                key={i}
                initial={{
                  x: (Math.random() > 0.5 ? 100 : -100) + 'vw',
                  y: (Math.random() > 0.5 ? 100 : -100) + 'vh',
                  opacity: 0
                }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 4, ease: "easeOut", delay: 1 + i * 0.5 }}
              >
                <motion.h3
                  className="blinking-skill-text"
                  initial={{ rotate: -5 }}
                  animate={{ y: [0, -10, 0], rotate: -5 }}
                  transition={{ duration: 3, repeat: Infinity, delay: 5.5 + i * 0.5, ease: "easeInOut" }}
                >
                  {skill}
                </motion.h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (page === 'meet_me') {
    const handleSubmit = (e) => {
      e.preventDefault();
      // Create mailto link
      const mailtoLink = `mailto:nilashree018@gmail.com?subject=Message from ${formData.from}&body=${encodeURIComponent(formData.message)}`;
      window.location.href = mailtoLink;
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    };

    return (
      <div className="app-container">
        {/* Space Background with Stars */}
        <div className="contact-bg">
          {/* Animated Stars */}
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={i}
              className="star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}

          {/* Animated Planet/Moon (Orange) */}
          <motion.div
            className="celestial-object planet-orange"
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Small White Dot */}
          <motion.div
            className="celestial-object dot-white"
            animate={{
              y: [0, 40, 0],
              x: [0, -15, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Contact Form Container */}
        <motion.div
          className="contact-form-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="contact-title"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            MEET ME
          </motion.h1>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <label className="form-label">From</label>
              <input
                type="email"
                className="form-input"
                placeholder="Enter your email"
                value={formData.from}
                onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                required
              />
            </div>

            <div className="form-row">
              <label className="form-label">To</label>
              <input
                type="email"
                className="form-input"
                value="nilashree018@gmail.com"
                readOnly
              />
            </div>

            <div className="form-row-full">
              <textarea
                className="form-textarea"
                placeholder="Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>

            <motion.button
              type="submit"
              className="done-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {submitted ? 'SENT!' : 'DONE'}
            </motion.button>
          </form>

          <motion.a
            href="https://github.com/nilashree018"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
            whileHover={{ scale: 1.1 }}
          >
            <svg className="github-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </motion.a>
        </motion.div>

        {/* Previous Button */}
        <motion.button
          className="previous-button"
          onClick={() => setPage('projects')}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Previous
        </motion.button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="background-image"></div>

      <audio ref={audioRef} src="/harry_potter_theme.mp3" loop />
      <audio ref={transitionAudioRef} src="/transition.mp3" />

      <button className="music-toggle" onClick={toggleMusic}>
        {isPlaying ? '🔊' : '🔇'}
      </button>

      {/* Magic Dust/Sparkles Container */}
      <div className="sparkle-container">
        {sparkles}
      </div>

      {/* Welcome Text */}
      <motion.div
        className="welcome-text"
        initial={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
        animate={{
          opacity: showText ? 1 : 0,
          scale: showText ? 1 : 0.5,
          filter: showText ? 'blur(0px)' : 'blur(10px)',
          x: showText ? [0, -5, 5, -5, 5, 0] : 0
        }}
        transition={{
          duration: 1,
          ease: "easeOut",
          x: {
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 3,
            ease: "easeInOut"
          }
        }}
        whileHover={{
          opacity: [1, 0.5, 1],
          transition: { duration: 0.2, repeat: Infinity }
        }}
      >
        <h1>" WELCOME<br />YOUUU ALL "</h1>
      </motion.div>

      <motion.button
        className="next-button"
        onClick={handleNextClick}
        initial={{ x: '-90vw', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 4, delay: 2, ease: "easeInOut" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Next ➔
        {/* Trail Sparkles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              backgroundColor: 'white',
              borderRadius: '50%',
              top: '50%',
              left: '10%',
              pointerEvents: 'none',
              boxShadow: '0 0 5px white'
            }}
            animate={{
              x: [-10, -150], // Move left behind the button
              y: [0, (Math.random() - 0.5) * 60], // Spread vertically
              opacity: [1, 0],
              scale: [1, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: Math.random(),
              ease: "easeOut"
            }}
          />
        ))}
      </motion.button>
    </div>
  );
}

export default App;

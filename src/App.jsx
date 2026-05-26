import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import InteractiveBackground from './components/InteractiveBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [systemStatus, setSystemStatus] = useState('BOOTING SYSTEM CORE...');
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  // Track scroll, update BackToTop visibility, and detect active section in real-time
  useEffect(() => {
    const onScroll = () => {
      // 1. Update scrollY for BackToTop visibility
      setScrollY(window.scrollY);

      if (loading) return;

      // 2. Detect active section by checking viewport coverage
      const sectionIds = ['hero', 'about', 'portfolio', 'contact'];
      const viewportHeight = window.innerHeight;
      
      let currentSection = 'hero';
      let maxVisibleHeight = 0;

      sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Calculate the height of the section visible in the viewport
          const visibleTop = Math.max(0, rect.top);
          const visibleBottom = Math.min(viewportHeight, rect.bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);

          if (visibleHeight > maxVisibleHeight) {
            maxVisibleHeight = visibleHeight;
            currentSection = id;
          }
        }
      });

      setActiveSection(currentSection);
    };

    // Run immediately on scroll, plus a delayed check to wait for DOM rendering
    onScroll();
    const timer = setTimeout(onScroll, 100);
    const timer2 = setTimeout(onScroll, 800);

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      window.removeEventListener('scroll', onScroll);
    };
  }, [loading]);

  const navSections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'portfolio', label: 'Showcase' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const fullName = "MIFTACHUL UMAM";
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*_?";

  // 1. Smooth, precise 4-second mathematical progress ticks (60fps updates)
  useEffect(() => {
    const duration = 4000; // Exact 4 seconds
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const computedProgress = Math.min((elapsed / duration) * 100, 100);

      setProgress(Math.floor(computedProgress));

      if (computedProgress >= 100) {
        clearInterval(interval);
        
        // Dismount loader after a small pause to enjoy fully swept state
        const dismountTimer = setTimeout(() => {
          setLoading(false);
        }, 800);
        return () => clearTimeout(dismountTimer);
      }
    }, 16); // ~60fps high-fidelity ticks

    return () => clearInterval(interval);
  }, []);

  // 2. Real-time Status updates based on loading progress
  useEffect(() => {
    if (progress < 25) {
      setSystemStatus('SYSTEM: SYNCHRONIZING CORE PIPELINES...');
    } else if (progress >= 25 && progress < 50) {
      setSystemStatus('SCANNING: EXTRACTING CV RECORDS...');
    } else if (progress >= 50 && progress < 75) {
      setSystemStatus('MOUNTING: SIMRS & BPJS VCLAIM CHANNELS...');
    } else if (progress >= 75 && progress < 100) {
      setSystemStatus('OPTIMIZING: STABILIZING WEBGL PARTICLE SHADERS...');
    } else {
      setSystemStatus('ACCESS GRANTED: PIPELINES SECURED.');
    }
  }, [progress]);

  // Helper function to resolve character style and content based on laser sweep progress
  const getCharValue = (char, charIndex) => {
    if (char === " ") return " ";
    
    const charPosRatio = charIndex / fullName.length;
    const progressRatio = progress / 100;
    
    // 1. Behind the laser scan (fully solved)
    if (charPosRatio < progressRatio - 0.05) {
      return char;
    }
    
    // 2. Exactly on the scanning edge (scrambled & glitched)
    if (charPosRatio >= progressRatio - 0.05 && charPosRatio <= progressRatio + 0.05) {
      return charset[Math.floor(Math.random() * charset.length)];
    }
    
    // 3. Ahead of the laser scan (completely invisible for minimal write effect)
    return "";
  };

  const getCharStyle = (charIndex) => {
    const charPosRatio = charIndex / fullName.length;
    const progressRatio = progress / 100;

    if (fullName[charIndex] === " ") {
      return { width: 'clamp(8px, 1.8vw, 20px)' };
    }

    // Solved styling (behind scan)
    if (charPosRatio < progressRatio - 0.05) {
      return {
        color: '#00f2fe',
        textShadow: '0 0 15px rgba(0, 242, 254, 0.7), 0 0 30px rgba(139, 92, 246, 0.4)',
        opacity: 1,
        transition: 'color 0.3s ease, text-shadow 0.3s ease',
      };
    }

    // Scanning edge styling (glitched active)
    if (charPosRatio >= progressRatio - 0.05 && charPosRatio <= progressRatio + 0.05) {
      return {
        color: '#8b5cf6',
        textShadow: '0 0 20px #8b5cf6, 0 0 40px #8b5cf6',
        opacity: 1,
        transform: 'scale(1.2) translateY(-2px)',
        fontWeight: 900,
      };
    }

    // Ahead of scan (completely invisible)
    return {
      opacity: 0,
      width: '0px',
    };
  };

  return (
    <>
      {/* 1. Global Custom Interactive Double-Ring Cursor */}
      <CustomCursor />

      {/* 2. WebGL 3D Particle Constellation Background (Stays fixed underneath) */}
      <InteractiveBackground />

      <AnimatePresence mode="wait">
        {loading ? (
          /* Cinematic Floating Laser Sweep Name Loader */
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 1.05,
              filter: 'blur(12px)',
              transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: '#040407',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'var(--text-primary)',
              overflow: 'hidden',
            }}
          >
            {/* Visual Grid Backdrop Overlay */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'linear-gradient(rgba(0, 242, 254, 0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 242, 254, 0.012) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                backgroundPosition: 'center',
                pointerEvents: 'none',
                opacity: 0.6,
              }}
            />

            {/* Glowing Backdrop highlights */}
            <div
              className="animate-pulse-glow"
              style={{
                position: 'absolute',
                width: '350px',
                height: '350px',
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.03) 0%, transparent 70%)',
                filter: 'blur(50px)',
                top: '20%',
                left: '20%',
                pointerEvents: 'none',
              }}
            />

            {/* Core Box containing all loader modules */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 10, width: '100%' }}>
              
              {/* 1. Wide Responsive Welcome Banner */}
              <div 
                style={{ 
                  textAlign: 'center', 
                  marginBottom: '50px', 
                  width: '100%', 
                  padding: '0 24px',
                  boxSizing: 'border-box'
                }}
              >
                <motion.h2
                  initial={{ opacity: 0, letterSpacing: '2px', y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, letterSpacing: 'clamp(2px, 1.2vw, 10px)', y: 0, scale: 1 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontSize: 'clamp(1.1rem, 3.5vw, 2.3rem)',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: 'var(--text-primary)',
                    background: 'linear-gradient(90deg, #00f2fe 10%, #8b5cf6 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 35px rgba(0, 242, 254, 0.15)',
                    textAlign: 'center',
                    lineHeight: '1.3',
                  }}
                >
                  Welcome to My Portfolio Website
                </motion.h2>

                {/* Animated visual separator line */}
                <motion.div 
                  initial={{ width: '0px', opacity: 0 }}
                  animate={{ width: '160px', opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
                  style={{ 
                    height: '2px', 
                    background: 'linear-gradient(90deg, transparent, #00f2fe, #8b5cf6, transparent)', 
                    margin: '16px auto 0 auto',
                    boxShadow: '0 0 8px rgba(0, 242, 254, 0.5)',
                  }} 
                />
              </div>

              {/* 2. Floating Cyber Laser Sweep Name Container (NO COLUMN BORDERS, NO BACKGROUND PANELS) */}
              <div
                style={{
                  position: 'relative',
                  padding: '20px 10px',
                  marginBottom: '50px',
                  width: '90%',
                  maxWidth: '700px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {/* Floating Vertical Laser Beam sweeping freely over the letters */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-5px',
                    bottom: '-5px',
                    left: `${progress}%`,
                    width: '2px',
                    background: 'linear-gradient(180deg, transparent, #00f2fe 30%, #8b5cf6 70%, transparent)',
                    boxShadow: '0 0 10px #00f2fe, 0 0 20px #00f2fe',
                    transition: 'left 0.1s ease-out',
                    pointerEvents: 'none',
                    zIndex: 20,
                  }}
                />

                {/* Letters Flex Row */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(1.1rem, 2.8vw, 2.2rem)',
                    fontWeight: 700,
                    letterSpacing: 'clamp(2px, 0.6vw, 8px)',
                    width: '100%',
                  }}
                >
                  {fullName.split("").map((char, index) => (
                    <span
                      key={index}
                      style={{
                        display: 'inline-block',
                        ...getCharStyle(index),
                        transition: 'all 0.1s ease-out',
                      }}
                    >
                      {getCharValue(char, index)}
                    </span>
                  ))}
                </div>
              </div>

              {/* 3. Cyber Dashboard Loader Status */}
              <div 
                style={{ 
                  width: '90%', 
                  maxWidth: '480px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '12px',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                {/* Loader status labels */}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent-cyan)' }}>{systemStatus}</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>{progress}%</span>
                </div>

                {/* Progress bar container */}
                <div style={{ width: '100%', height: '2px', background: 'rgba(255, 255, 255, 0.03)', overflow: 'hidden', position: 'relative' }}>
                  
                  {/* Glowing progress line */}
                  <div
                    style={{
                      height: '100%',
                      width: `${progress}%`,
                      background: 'linear-gradient(90deg, #00f2fe, #8b5cf6)',
                      boxShadow: '0 0 8px #00f2fe',
                      transition: 'width 0.1s ease-out',
                    }}
                  />
                </div>
              </div>

            </div>
          </motion.div>
        ) : (
          /* Main Interactive Core App layout */
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ position: 'relative', zIndex: 1 }}
          >
            {/* Header Global Navigation bar */}
            <Navbar activeSection={activeSection} />

            {/* Dynamic Pages Sequential Grid */}
            <main>
              {/* Section 0: Landing Area */}
              <Hero />

              {/* Section 1: Detailed Biographic Timeline */}
              <About />

              {/* Section 2: Interactive Portfolio Showcase */}
              <Portfolio />

              {/* Section 3: Input Field Contacts & Map Globe */}
              <Contact />
            </main>

            {/* Global Footer */}
            <Footer />

            {/* ── Back To Top Button ── */}
            <AnimatePresence>
              {scrollY > 400 && (
                <motion.button
                  key="back-to-top"
                  initial={{ opacity: 0, scale: 0.7, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.7, y: 20 }}
                  transition={{ type: 'spring', damping: 18, stiffness: 250 }}
                  onClick={scrollToTop}
                  className="clickable"
                  title="Back to top"
                  style={{
                    position: 'fixed', bottom: '32px', right: '80px', zIndex: 500,
                    width: '46px', height: '46px', borderRadius: '50%',
                    background: 'rgba(5,5,15,0.85)',
                    border: '1px solid rgba(0,242,254,0.3)',
                    color: '#00f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(14px)',
                    boxShadow: '0 4px 20px rgba(0,242,254,0.15)',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(0,242,254,0.7)';
                    e.currentTarget.style.boxShadow = '0 4px 30px rgba(0,242,254,0.35)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(0,242,254,0.3)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,242,254,0.15)';
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>

            {/* ── Section Progress Dots — right-side navigator ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8, duration: 0.5 }}
              style={{
                position: 'fixed', right: '22px', top: '50%',
                transform: 'translateY(-50%)', zIndex: 500,
                display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center',
              }}
            >
              {navSections.map(sec => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className="clickable"
                  title={sec.label}
                  style={{
                    width: activeSection === sec.id ? '10px' : '6px',
                    height: activeSection === sec.id ? '10px' : '6px',
                    borderRadius: '50%',
                    border: 'none',
                    background: activeSection === sec.id
                      ? 'linear-gradient(135deg, #00f2fe, #8b5cf6)'
                      : 'rgba(255,255,255,0.18)',
                    boxShadow: activeSection === sec.id ? '0 0 10px rgba(0,242,254,0.8)' : 'none',
                    transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                    padding: 0,
                  }}
                />
              ))}
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

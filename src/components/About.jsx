import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FileText, ArrowRight, Star, Award, Calendar, GraduationCap, Users, X, Download } from 'lucide-react';

// Animated number counter hook
function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView) return;
    let startTime = null;
    const numericTarget = parseFloat(target);
    const isDecimal = target.includes('.');

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * numericTarget;
      setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(numericTarget);
    };
    requestAnimationFrame(animate);
  }, [inView, target, duration]);

  return { count, ref };
}

// Animated Stat Card sub-component using the counter hook
function StatCard({ stat, idx }) {
  const { count, ref } = useCountUp(stat.numeric, 2000);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.12 }}
      className="glass-card"
      style={{
        padding: '30px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '2.5rem', fontWeight: 800 }} className="text-gradient-cyan-purple">
          {count}{stat.suffix}
        </span>
        <div style={{ padding: '8px', background: 'rgba(255,255,255,0.02)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {stat.icon}
        </div>
      </div>
      <div>
        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
          {stat.label}
        </h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.4' }}>
          {stat.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function About() {
  const [showTimeline, setShowTimeline] = useState(false);
  const [showCVPreview, setShowCVPreview] = useState(false);

  const stats = [
    { value: '15+', numeric: '15', label: 'Total Projects', desc: 'Innovative web applications & systems', icon: <Star style={{ color: '#00f2fe' }} size={20} />, suffix: '+' },
    { value: '10+', numeric: '10', label: 'SIMRS Modules Built', desc: 'Bridging BPJS & Kemenkes SatuSehat', icon: <Award style={{ color: '#8b5cf6' }} size={20} />, suffix: '+' },
    { value: '1.5+', numeric: '1.5', label: 'Years Experience', desc: 'SIMRS site developer & Diskominfo intern', icon: <GraduationCap style={{ color: '#ec4899' }} size={20} />, suffix: '+' },
  ];

  const timeline = [
    {
      year: 'Sept 2020 - February 2024',
      title: 'Bachelor of Informatics Engineering',
      institution: 'Universitas Semarang',
      description: 'Thesis: "Application of Augmented Reality Technology for MA Darul Falah School Introduction on the PPDB Website". Recipient of the 2022 Academic Achievement Scholarship and Runner-Up for Faculty Ambassador 2022.',
      icon: <GraduationCap size={16} />,
    },
    {
      year: '2022 - 2024',
      title: 'Vice Chairman of Flower Community',
      institution: 'Universitas Semarang',
      description: 'Coordinated administrative support for Data Science, Web, and Android workshops. Delegated team tasks for collaborative projects with Poltekkes Semarang, DISHUB (Department of Transportation), and IoT projects for agriculture.',
      icon: <Users size={16} />,
    },
    {
      year: '2023',
      title: 'Laravel Developer Intern',
      institution: 'Diskominfo Semarang City',
      description: 'Built a web application for monitoring the online status of government department websites across Semarang City, designed UI/UX, and created flowcharts for the integrated public complaint system.',
      icon: <FileText size={16} />,
    },
  ];

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const target = document.getElementById('portfolio');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* Decorative calm background glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          right: '5%',
          width: '300px',
          height: '300px',
          background: 'rgba(139, 92, 246, 0.02)',
          borderRadius: '50%',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container">
        
        {/* 1. Centered Title & Subtitle */}
        <div style={{ marginBottom: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', fontWeight: 800, color: 'var(--text-primary)' }}
          >
            About Me
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--accent-cyan)',
              fontSize: '0.85rem',
              fontWeight: 500,
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginTop: '10px'
            }}
          >
            <span className="glow-dot" style={{ width: '5px', height: '5px' }} />
            <span>Transforming ideas into digital experiences</span>
            <span className="glow-dot" style={{ width: '5px', height: '5px' }} />
          </motion.div>
        </div>

        {/* 2. Main Two-Column Content Grid */}
        <div className="about-main-grid" style={{ marginBottom: '80px' }}>
          
          {/* Left Column: Bio & Action elements */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            <h3 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 700, marginBottom: '20px', lineHeight: '1.2' }}>
              Hello, I'm <span className="text-gradient-cyan-purple">Miftachul Umam</span>
            </h3>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '20px' }}>
              I am an **Informatics Engineering graduate (B.S.) from Universitas Semarang** with hands-on experience as a Web Developer. My core expertise lies in building robust and scalable web architectures utilizing **Laravel** and **Angular** frameworks.
            </p>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '24px' }}>
              Beyond frontend and backend systems engineering, I possess a unique portfolio of integrating **Augmented Reality (AR)** technologies directly into web ecosystems to multiply user engagement. I am always ready to tackle complex API integrations and bleeding-edge technologies.
            </p>

            {/* Glassmorphic Blockquote */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                borderLeft: '3px solid #8b5cf6',
                borderTop: '1px solid rgba(255,255,255,0.03)',
                borderRight: '1px solid rgba(255,255,255,0.03)',
                borderBottom: '1px solid rgba(255,255,255,0.03)',
                padding: '16px 20px',
                borderRadius: '0 12px 12px 0',
                marginBottom: '32px',
                fontStyle: 'italic',
                color: 'var(--text-primary)',
                fontSize: '0.95rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              }}
            >
              "Integrating advanced systems and creative technology to build the future."
            </div>

            {/* Action Buttons Row */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setShowCVPreview(true)}
                className="neon-button neon-button-glow clickable"
              >
                <span>Download CV</span>
                <FileText size={16} />
              </button>
              <button
                onClick={handleScrollToProjects}
                className="neon-button clickable"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                <span>View Projects</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>

          {/* Right Column: Glowing Circular Profile Headshot */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Circular Profile Aura Box */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '350px',
                aspectRatio: '1',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Pulsing Backlit Aura Ring */}
              <div
                className="animate-pulse-glow"
                style={{
                  position: 'absolute',
                  top: '-4px',
                  left: '-4px',
                  right: '-4px',
                  bottom: '-4px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #00f2fe, #8b5cf6, #ec4899)',
                  filter: 'blur(15px)',
                  opacity: 0.75,
                  zIndex: 0,
                }}
              />

              {/* Central Headshot Image Wrapper */}
              <div
                style={{
                  position: 'relative',
                  width: '98%',
                  height: '98%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '3px solid rgba(255,255,255,0.08)',
                  zIndex: 1,
                  background: '#0a0a0f',
                }}
              >
                <img
                  src="/profile_avatar.png"
                  alt="Miftachul Umam Portrait"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>

            </div>
          </motion.div>

        </div>

        {/* 3. Three Metrics Cards Grid (Aligned below the main columns) */}
        <div className="about-stats-grid" style={{ marginBottom: '50px' }}>
          {stats.map((stat, idx) => (
            <StatCard key={idx} stat={stat} idx={idx} />
          ))}
        </div>

        {/* 4. Interactive Expandable Education & Leadership Detail Panel */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={() => setShowTimeline(!showTimeline)}
            className="neon-button clickable"
            style={{
              padding: '10px 24px',
              fontSize: '0.85rem',
              borderColor: showTimeline ? '#00f2fe' : 'var(--border-color)',
            }}
          >
            <span>{showTimeline ? 'Hide Academic & Org Details' : 'View Academic & Org Details'}</span>
            <ArrowRight size={14} style={{ transform: showTimeline ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }} />
          </button>
        </div>

        {/* Expandable Timeline section */}
        <AnimatePresence>
          {showTimeline && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              style={{ overflow: 'hidden', marginTop: '40px' }}
            >
              <div className="glass-card" style={{ padding: '40px', border: '1px solid rgba(0, 242, 254, 0.15)' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '30px', textAlign: 'center' }}>
                  Education, Organizational & Professional Timeline
                </h3>
                
                {/* Horizontal/Vertical Timeline connectors */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', position: 'relative', paddingLeft: '24px', borderLeft: '1.5px solid rgba(255,255,255,0.06)', maxWidth: '800px', margin: '0 auto' }}>
                  {timeline.map((item, idx) => (
                    <div key={idx} style={{ position: 'relative' }}>
                      {/* Pulsing Connector Node */}
                      <div
                        style={{
                          position: 'absolute',
                          left: '-34px',
                          top: '2px',
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          background: '#050508',
                          border: '2px solid #00f2fe',
                          boxShadow: '0 0 8px #00f2fe',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--accent-cyan)',
                        }}
                      />

                      {/* Content */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                          <Calendar size={12} />
                          <span>{item.year}</span>
                        </div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{item.title}</h4>
                        <span style={{ fontSize: '0.9rem', color: 'var(--accent-purple)', fontWeight: 500 }}>{item.institution}</span>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '6px', lineHeight: '1.6' }}>{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <style>{`
        .about-main-grid {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 60px;
          align-items: center;
        }

        .about-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        @media (max-width: 991px) {
          .about-main-grid {
            grid-template-columns: 1fr;
            gap: 48px;
            text-align: center;
          }
          .about-main-grid > div:first-child {
            align-items: center;
          }
          .about-main-grid .neon-button {
            justify-content: center;
          }
        }
      `}</style>
      {/* CV Preview Modal */}
      <AnimatePresence>
        {showCVPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
              background: 'rgba(2, 2, 8, 0.96)', backdropFilter: 'blur(20px)',
              zIndex: 3000, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', padding: '20px',
            }}
            onClick={() => setShowCVPreview(false)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 30 }}
              style={{
                width: '100%', maxWidth: '800px', background: 'rgba(10,10,20,0.98)',
                border: '1px solid rgba(0,242,254,0.2)', borderRadius: '20px',
                boxShadow: '0 0 60px rgba(0,242,254,0.1)', overflow: 'hidden',
                display: 'flex', flexDirection: 'column', maxHeight: '92vh',
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '18px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)',
                flexShrink: 0,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', background: 'rgba(0,242,254,0.08)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00f2fe' }}>
                    <FileText size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>CV Miftachul Umam</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>PDF Document · 2 Pages</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <a
                    href="/CV Miftachul Umam.pdf"
                    download="CV Miftachul Umam.pdf"
                    className="neon-button neon-button-glow clickable"
                    style={{ padding: '8px 18px', fontSize: '0.85rem', borderRadius: '9999px' }}
                  >
                    <Download size={14} />
                    <span>Download</span>
                  </a>
                  <button
                    onClick={() => setShowCVPreview(false)}
                    className="clickable"
                    style={{
                      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                      color: 'var(--text-secondary)', borderRadius: '10px', padding: '8px',
                      display: 'flex', alignItems: 'center', transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* PDF Viewer */}
              <div style={{ flex: 1, overflow: 'hidden', background: '#111118' }}>
                <iframe
                  src="/CV Miftachul Umam.pdf#toolbar=0&navpanes=0&scrollbar=0"
                  title="CV Miftachul Umam"
                  style={{ width: '100%', height: '100%', minHeight: '65vh', border: 'none' }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

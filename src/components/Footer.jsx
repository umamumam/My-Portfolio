import { Mail, Heart } from 'lucide-react';

// Custom Self-Contained SVG Brand Components to avoid dependency export breakages
const GithubIcon = ({ size = 16, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 16, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" rx="1" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// High-end glowing geometric logo icon
const LogoIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 6px rgba(0, 242, 254, 0.6))' }}>
    <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="url(#footer-logo-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 6L7 8.5V14.5L12 17L17 14.5V8.5L12 6Z" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="11.5" r="2.5" fill="#00f2fe"/>
    <defs>
      <linearGradient id="footer-logo-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00f2fe"/>
        <stop offset="1" stopColor="#8b5cf6"/>
      </linearGradient>
    </defs>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      style={{
        background: 'rgba(5, 5, 8, 0.95)',
        backdropFilter: 'blur(20px)',
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden',
        padding: '50px 0 30px 0',
      }}
    >
      
      {/* Cyber glowing top laser-gradient border line */}
      <div
        style={{
          width: '100%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, #00f2fe 30%, #8b5cf6 70%, transparent 100%)',
          opacity: 0.6,
          boxShadow: '0 1px 15px rgba(0, 242, 254, 0.3)',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />

      {/* Decorative calm background glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '-30px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(0, 242, 254, 0.05) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '30px' }}>
        
        {/* Brand Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <a
            href="#hero"
            onClick={(e) => handleScrollTo(e, 'hero')}
            style={{
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <LogoIcon />
            <span className="text-gradient-cyan-purple" style={{ fontFamily: 'var(--font-sans)', fontWeight: 900, fontSize: '1.3rem', letterSpacing: '0.8px' }}>
              M. UMAM
            </span>
          </a>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', margin: '4px 0 0 0', maxWidth: '400px', lineHeight: '1.6' }}>
            Dedicated Junior Full Stack Developer passionate about building robust web applications, integrated API bridgings, and modern interactive user interfaces.
          </p>
        </div>

        {/* Centered Sitemap Navigation */}
        <ul style={{ display: 'flex', justifyContent: 'center', gap: '24px', listStyle: 'none', padding: 0, margin: 0, flexWrap: 'wrap' }}>
          {[
            { id: 'hero', label: 'Home' },
            { id: 'about', label: 'About Me' },
            { id: 'portfolio', label: 'Showcase Portfolio' },
            { id: 'contact', label: 'Contact Us' }
          ].map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={(e) => handleScrollTo(e, link.id)}
                className="footer-nav-link-centered clickable"
                style={{
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'all 0.3s ease',
                }}
              >
                <span>{link.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Social connections bubble row */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px' }}>
          
          {/* GitHub */}
          <a
            href="https://github.com/umamumam"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-bubble clickable"
            style={{
              width: '38px',
              height: '38px',
              background: 'rgba(255,255,255,0.01)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              transition: 'all 0.3s ease',
            }}
          >
            <GithubIcon size={16} />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/miftachul-umam-b555672b6/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-bubble clickable"
            style={{
              width: '38px',
              height: '38px',
              background: 'rgba(255,255,255,0.01)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              transition: 'all 0.3s ease',
            }}
          >
            <LinkedinIcon size={16} />
          </a>

          {/* Mail */}
          <a
            href="mailto:miftahulumam862@gmail.com"
            className="footer-social-bubble clickable"
            style={{
              width: '38px',
              height: '38px',
              background: 'rgba(255,255,255,0.01)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              transition: 'all 0.3s ease',
            }}
          >
            <Mail size={16} />
          </a>

        </div>

        {/* Bottom Metadata copyright panel */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.04)',
            paddingTop: '20px',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.82rem',
            color: 'var(--text-secondary)',
          }}
        >
          <div>
            &copy; {currentYear} Miftachul Umam. All Rights Reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Crafted with</span>
            <Heart size={12} className="heart-pulsate" style={{ color: '#ec4899', fill: '#ec4899' }} />
            <span>in Pati, Indonesia.</span>
          </div>
        </div>

      </div>

      <style>{`
        .footer-social-bubble:hover {
          color: #00f2fe !important;
          border-color: rgba(0, 242, 254, 0.25) !important;
          background: rgba(0, 242, 254, 0.03) !important;
          transform: translateY(-3px);
          box-shadow: 0 4px 15px rgba(0, 242, 254, 0.1);
        }

        .footer-social-bubble:hover svg {
          stroke: #00f2fe !important;
        }

        .footer-nav-link-centered:hover {
          color: #00f2fe !important;
          transform: translateY(-2px);
        }

        .heart-pulsate {
          animation: pulsate 1.2s ease-in-out infinite;
        }

        @keyframes pulsate {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
      `}</style>
    </footer>
  );
}

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

// Custom Self-Contained SVG Brand Components to avoid dependency export breakages
const GithubIcon = ({ size = 18, ...props }) => (
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

const LinkedinIcon = ({ size = 18, ...props }) => (
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
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ filter: "drop-shadow(0 0 6px rgba(0, 242, 254, 0.6))" }}
  >
    <path
      d="M12 2L2 7V17L12 22L22 17V7L12 2Z"
      stroke="url(#logo-grad)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 6L7 8.5V14.5L12 17L17 14.5V8.5L12 6Z"
      stroke="#8b5cf6"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="11.5" r="2" fill="#00f2fe" />
    <defs>
      <linearGradient
        id="logo-grad"
        x1="2"
        y1="2"
        x2="22"
        y2="22"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#00f2fe" />
        <stop offset="1" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
  </svg>
);

export default function Navbar({ activeSection = "hero" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navLinks = [
    { id: "hero", name: "Home" },
    { id: "about", name: "About" },
    { id: "portfolio", name: "Showcase" },
    { id: "contact", name: "Contact" },
  ];

  useEffect(() => {
    // Scroll tracking for header style & progress bar
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        padding: scrolled ? "12px 0" : "24px 0",
        background: scrolled ? "rgba(5, 5, 8, 0.75)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255, 255, 255, 0.05)"
          : "1px solid transparent",
      }}
    >
      {/* Dynamic Top Scroll Progress Line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "2px",
          width: `${scrollProgress}%`,
          background: "linear-gradient(90deg, #00f2fe, #8b5cf6)",
          boxShadow: "0 0 8px #00f2fe",
          transition: "width 0.1s ease-out",
        }}
      />

      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Brand / Logo */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, "hero")}
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <LogoIcon />
          <span
            className="text-gradient-cyan-purple"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 800,
              fontSize: "1.25rem",
              letterSpacing: "0.5px",
            }}
          >
            Portfolio
          </span>
        </a>

        {/* Desktop Links */}
        <nav
          style={{ display: "flex", alignItems: "center", gap: "32px" }}
          className="desktop-only"
        >
          <ul
            style={{
              display: "flex",
              listStyle: "none",
              gap: "24px",
              alignItems: "center",
            }}
          >
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  style={{
                    color:
                      activeSection === link.id
                        ? "var(--accent-cyan)"
                        : "var(--text-secondary)",
                    textDecoration: "none",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    letterSpacing: "0.5px",
                    transition: "color 0.3s ease",
                    position: "relative",
                    padding: "6px 0",
                  }}
                >
                  {navLinks.find((l) => l.id === link.id)?.name}
                  {/* Glowing underline for active tab */}
                  <span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      height: "1.5px",
                      background: "linear-gradient(90deg, #00f2fe, #8b5cf6)",
                      transform:
                        activeSection === link.id ? "scaleX(1)" : "scaleX(0)",
                      transformOrigin: "left",
                      transition:
                        "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                      boxShadow: "0 0 5px #00f2fe",
                    }}
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* Social icons */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
              paddingLeft: "20px",
            }}
          >
            <a
              href="https://github.com/umamumam"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--text-secondary)",
                transition: "color 0.3s ease",
                display: "flex",
                alignItems: "center",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#00f2fe")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-secondary)")
              }
            >
              <GithubIcon size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/miftachul-umam-b555672b6/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--text-secondary)",
                transition: "color 0.3s ease",
                display: "flex",
                alignItems: "center",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#8b5cf6")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-secondary)")
              }
            >
              <LinkedinIcon size={18} />
            </a>
          </div>
        </nav>

        {/* Mobile Hamburger Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--text-primary)",
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            padding: "4px",
          }}
          className="mobile-toggle"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(5, 5, 8, 0.96)",
            backdropFilter: "blur(20px)",
            zIndex: 999,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "32px",
          }}
        >
          {/* Close button inside panel */}
          <button
            onClick={() => setIsOpen(false)}
            style={{
              position: "absolute",
              top: "24px",
              right: "24px",
              background: "transparent",
              border: "none",
              color: "var(--text-primary)",
            }}
          >
            <X size={30} />
          </button>

          <ul
            style={{
              listStyle: "none",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  style={{
                    color:
                      activeSection === link.id
                        ? "var(--accent-cyan)"
                        : "var(--text-primary)",
                    textDecoration: "none",
                    fontSize: "1.8rem",
                    fontWeight: 600,
                    letterSpacing: "1px",
                    transition: "all 0.3s ease",
                  }}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div
            style={{
              display: "flex",
              gap: "24px",
              marginTop: "24px",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              paddingTop: "24px",
            }}
          >
            <a
              href="https://github.com/umamumam"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--text-secondary)" }}
            >
              <GithubIcon size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/miftachul-umam-b555672b6/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--text-secondary)" }}
            >
              <LinkedinIcon size={24} />
            </a>
          </div>
        </div>
      )}

      {/* Navbar Responsive Styles injected via style tag */}
      <style>{`
        @media (min-width: 769px) {
          .mobile-toggle { display: none !important; }
        }
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

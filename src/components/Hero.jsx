import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal, ArrowDown } from "lucide-react";

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Spring physics variables for Anime.js-style elastic parallax
  const [springPos, setSpringPos] = useState({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  const roles = [
    "Junior Full Stack Developer",
    "Laravel Developer",
    "Augmented Reality Innovator",
    "Problem Solver & Engineer",
  ];

  // Slowed-down Typing effect loop for professional readability
  useEffect(() => {
    const activeRole = roles[roleIndex];
    let typingSpeed = isDeleting ? 50 : 130;

    if (!isDeleting && charIndex === activeRole.length) {
      typingSpeed = 3500;
      setIsDeleting(true);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    const timer = setTimeout(() => {
      setTypedText(
        isDeleting
          ? activeRole.substring(0, charIndex - 1)
          : activeRole.substring(0, charIndex + 1),
      );
      setCharIndex((prev) => (isDeleting ? prev - 1 : prev + 1));
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex]);

  // Track mouse coordinates inside section and run Spring Harmonic Oscillator physics loop
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      // Calculate normalized positions (-0.5 to 0.5)
      targetPos.current = {
        x: clientX / window.innerWidth - 0.5,
        y: clientY / window.innerHeight - 0.5,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Spring Harmonic Physics constants (replicating Anime.js spring physics)
    const stiffness = 0.08; // Elasticity strength
    const damping = 0.76; // Friction / decay to avoid perpetual oscillation

    let animId;
    const updateSpringPhysics = () => {
      // 1. Calculate spring acceleration (Hooke's Law: F = -kx)
      const ax = (targetPos.current.x - currentPos.current.x) * stiffness;
      const ay = (targetPos.current.y - currentPos.current.y) * stiffness;

      // 2. Update velocity with dampening
      velocity.current.x = (velocity.current.x + ax) * damping;
      velocity.current.y = (velocity.current.y + ay) * damping;

      // 3. Update current positions
      currentPos.current.x += velocity.current.x;
      currentPos.current.y += velocity.current.y;

      // 4. Update React state to trigger render
      setSpringPos({
        x: currentPos.current.x,
        y: currentPos.current.y,
      });

      animId = requestAnimationFrame(updateSpringPhysics);
    };
    animId = requestAnimationFrame(updateSpringPhysics);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  const scrollToAbout = () => {
    const target = document.getElementById("about");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Magnetic button effect
  const cvBtnRef = useRef(null);
  const handleMagneticMove = (e) => {
    const btn = cvBtnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.35;
    const dy = (e.clientY - cy) * 0.35;
    btn.style.transform = `translate(${dx}px, ${dy}px) scale(1.06)`;
  };
  const handleMagneticLeave = () => {
    const btn = cvBtnRef.current;
    if (!btn) return;
    btn.style.transform = "translate(0px, 0px) scale(1)";
  };

  // Ripple effect on click
  const handleRipple = (e) => {
    const btn = cvBtnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position:absolute;
      border-radius:50%;
      width:${size}px;
      height:${size}px;
      left:${e.clientX - rect.left - size / 2}px;
      top:${e.clientY - rect.top - size / 2}px;
      background:rgba(255,255,255,0.25);
      transform:scale(0);
      animation:rippleEffect 0.6s ease-out forwards;
      pointer-events:none;
    `;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  };

  // Simulated code text streams for holographic screens overlay
  const codeSnippetLeft = `function SIMRS() {\n  return Laravel::bridge(\n    'vclaim-bpjs',\n    'satusethat'\n  );\n}`;
  const codeSnippetRight = `class AngularCore {\n  constructor() {\n    this.ar = new Unity();\n  }\n}`;

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: "80px",
      }}
    >
      <div
        className="container"
        style={{ position: "relative", zIndex: 10, width: "100%" }}
      >
        <div className="hero-grid">
          {/* Left Column: Heading and Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {/* Tagline showing his Role & Tech domains */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                padding: "6px 16px",
                borderRadius: "9999px",
                width: "fit-content",
                marginBottom: "20px",
              }}
            >
              <Terminal size={14} style={{ color: "var(--accent-cyan)" }} />
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                Creative Web Developer & Engineer
              </span>
            </div>

            {/* Main Elegant Title using user's name: MIFTACHUL UMAM */}
            <h1
              style={{
                fontSize: "clamp(2.4rem, 5.5vw, 4.6rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: "20px",
                letterSpacing: "clamp(2px, 0.6vw, 8px)",
                textTransform: "uppercase",
                fontFamily: "var(--font-sans)",
              }}
            >
              Miftachul <span className="text-gradient-cyan-purple">Umam</span>
            </h1>

            {/* Dynamic Typing Title */}
            <div
              style={{
                height: "40px",
                marginBottom: "24px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <h2
                style={{
                  fontSize: "clamp(1.2rem, 2vw, 1.8rem)",
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                I am a{" "}
                <span
                  style={{
                    color: "var(--text-primary)",
                    borderRight: "2px solid #00f2fe",
                    paddingRight: "4px",
                    animation: "blink 0.8s step-end infinite",
                  }}
                >
                  {typedText}
                </span>
              </h2>
            </div>

            {/* Short Introduction */}
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "1.1rem",
                maxWidth: "540px",
                marginBottom: "36px",
              }}
            >
              A Web Developer who crafts premium, high-interaction web solutions
              using frameworks like
              <span style={{ color: "#ff2d20", fontWeight: 600 }}>
                {" "}
                Laravel
              </span>{" "}
              and{" "}
              <span style={{ color: "#dd0031", fontWeight: 600 }}>
                {" "}
                Angular
              </span>
              , blended with innovative integrations like{" "}
              <span style={{ color: "#00f2fe", fontWeight: 600 }}>
                Augmented Reality (AR)
              </span>{" "}
              to design immersive future-proof systems.
            </p>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <button
                onClick={scrollToAbout}
                className="neon-button neon-button-glow"
              >
                <span>Get Started</span>
                <ArrowDown size={16} />
              </button>
              <a
                href="https://github.com/umamumam"
                target="_blank"
                rel="noopener noreferrer"
                className="neon-button"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <span>GitHub Profile</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Layered 3D Mouse Parallax Graphic + Anime.js style spring movements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              perspective: "1200px",
            }}
          >
            {/* Interactive container that tilts on mouse movement using physics-based spring variables */}
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "550px",
                aspectRatio: "1",
                transform: `rotateX(${springPos.y * -28}deg) rotateY(${springPos.x * 28}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Layer 1: Background Neon Glow Ring (Moves in reverse depth direction for parallax displacement) */}
              <div
                className="animate-pulse-glow"
                style={{
                  position: "absolute",
                  top: "10%",
                  left: "10%",
                  right: "10%",
                  bottom: "10%",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(0, 242, 254, 0.16) 0%, rgba(139, 92, 246, 0.12) 50%, transparent 100%)",
                  filter: "blur(35px)",
                  transform: `translateZ(-60px) translate3d(${springPos.x * -35}px, ${springPos.y * -35}px, 0)`,
                  pointerEvents: "none",
                  transition: "transform 0.05s ease-out",
                }}
              />

              {/* Layer 2: Main 3D Developer Graphic Card (Animated with camera-breathing zoom & custom scrolling code) */}
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  borderRadius: "24px",
                  overflow: "hidden",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  boxShadow:
                    "0 20px 50px rgba(0, 0, 0, 0.65), 0 0 35px rgba(0, 242, 254, 0.15)",
                  transform: "translateZ(0px)",
                  background: "#0a0a0f",
                }}
              >
                {/* Slow breathing camera lens zoom */}
                <img
                  src="/coder_hero.png"
                  alt="Miftachul Umam Station"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    animation: "cameraBreathing 12s ease-in-out infinite",
                  }}
                />

                {/* CRT Scanline horizontal monitor texture */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundImage:
                      "linear-gradient(rgba(0, 242, 254, 0.02) 1px, transparent 1px)",
                    backgroundSize: "100% 4px",
                    pointerEvents: "none",
                  }}
                />

                {/* Holographic Scrolling Code overlay 1 (Over left screen in image) */}
                <div
                  style={{
                    position: "absolute",
                    top: "28%",
                    left: "12%",
                    width: "20%",
                    height: "18%",
                    overflow: "hidden",
                    fontFamily: "var(--font-mono)",
                    fontSize: "clamp(5px, 0.5vw, 8px)",
                    color: "#00f2fe",
                    lineHeight: "1.2",
                    opacity: 0.75,
                    transform: "skewY(-6deg) rotate(-4deg)",
                    pointerEvents: "none",
                    zIndex: 10,
                  }}
                >
                  <div style={{ animation: "scrollUpCode 6s linear infinite" }}>
                    <pre style={{ margin: 0 }}>{codeSnippetLeft}</pre>
                    <pre style={{ margin: 0 }}>{codeSnippetLeft}</pre>
                  </div>
                </div>

                {/* Holographic Scrolling Code overlay 2 (Over right screen in image) */}
                <div
                  style={{
                    position: "absolute",
                    top: "15%",
                    right: "16%",
                    width: "18%",
                    height: "16%",
                    overflow: "hidden",
                    fontFamily: "var(--font-mono)",
                    fontSize: "clamp(5px, 0.5vw, 8px)",
                    color: "#8b5cf6",
                    lineHeight: "1.2",
                    opacity: 0.75,
                    transform: "skewY(4deg) rotate(4deg)",
                    pointerEvents: "none",
                    zIndex: 10,
                  }}
                >
                  <div style={{ animation: "scrollUpCode 5s linear infinite" }}>
                    <pre style={{ margin: 0 }}>{codeSnippetRight}</pre>
                    <pre style={{ margin: 0 }}>{codeSnippetRight}</pre>
                  </div>
                </div>

                {/* Holographic Scrolling Code overlay 3 (Over central screen in image) */}
                <div
                  style={{
                    position: "absolute",
                    top: "38%",
                    left: "26%",
                    width: "20%",
                    height: "16%",
                    overflow: "hidden",
                    fontFamily: "var(--font-mono)",
                    fontSize: "clamp(5px, 0.5vw, 8px)",
                    color: "#00f2fe",
                    lineHeight: "1.2",
                    opacity: 0.7,
                    transform: "skewY(-2deg) rotate(-1deg)",
                    pointerEvents: "none",
                    zIndex: 10,
                  }}
                >
                  <div style={{ animation: "scrollUpCode 7s linear infinite" }}>
                    <pre style={{ margin: 0 }}>{codeSnippetLeft}</pre>
                    <pre style={{ margin: 0 }}>{codeSnippetLeft}</pre>
                  </div>
                </div>
              </div>

              {/* Layer 3: Ultra-subtle Front Holographic Floating Vector Framing Box */}
              {/* This is positioned in FRONT of the card (Z-index translation) to create absolute 3D depth separation */}
              <div
                style={{
                  position: "absolute",
                  top: "-15px",
                  left: "-15px",
                  right: "-15px",
                  bottom: "-15px",
                  border: "1.5px solid rgba(0, 242, 254, 0.15)",
                  borderRadius: "28px",
                  pointerEvents: "none",
                  transform: `translateZ(45px) translate3d(${springPos.x * 25}px, ${springPos.y * 25}px, 0)`,
                  boxShadow: "0 0 20px rgba(0, 242, 254, 0.05)",
                  transition: "transform 0.05s ease-out",
                }}
              >
                {/* Visual tech corner ticks inside floating vector box */}
                <span
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    width: "8px",
                    height: "8px",
                    borderTop: "2px solid #00f2fe",
                    borderLeft: "2px solid #00f2fe",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    width: "8px",
                    height: "8px",
                    borderTop: "2px solid #00f2fe",
                    borderRight: "2px solid #00f2fe",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "10px",
                    width: "8px",
                    height: "8px",
                    borderBottom: "2px solid #8b5cf6",
                    borderLeft: "2px solid #8b5cf6",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    width: "8px",
                    height: "8px",
                    borderBottom: "2px solid #8b5cf6",
                    borderRight: "2px solid #8b5cf6",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Styled Blinking cursor for typing effect & Grid layouts */}
      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 60px;
          align-items: center;
          min-height: calc(100vh - 120px);
        }

        @keyframes blink {
          from, to { border-color: transparent }
          50% { border-color: #00f2fe; }
        }

        @keyframes cameraBreathing {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05) translate(1px, 2px); }
        }

        @keyframes scrollUpCode {
          0% { transform: translateY(0%); }
          100% { transform: translateY(-50%); }
        }

        @keyframes rippleEffect {
          to { transform: scale(2.5); opacity: 0; }
        }

        @media (max-width: 991px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 60px;
            text-align: center;
            padding: 40px 0;
          }
          .hero-grid > div:first-child {
            align-items: center;
          }
          .hero-grid p {
            margin: 0 auto 36px auto;
          }
        }
      `}</style>
    </section>
  );
}

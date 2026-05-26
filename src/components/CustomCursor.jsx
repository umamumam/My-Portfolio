import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setIsHidden(true);
      return;
    }

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);
      
      // Pass coordinates to CSS custom properties for index.css effects
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const handleMouseEnter = () => {
      setIsHidden(false);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Dynamic Trail physics interpolation
    let animationFrameId;
    const updateTrail = () => {
      setTrail((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        // Adjust the multiplier for cursor inertia lag (0.15 is smooth and responsive)
        return {
          x: prev.x + dx * 0.16,
          y: prev.y + dy * 0.16,
        };
      });
      animationFrameId = requestAnimationFrame(updateTrail);
    };
    animationFrameId = requestAnimationFrame(updateTrail);

    // Event Delegation for hover states
    const addHoverListeners = () => {
      const interactives = document.querySelectorAll(
        'a, button, input, textarea, select, [role="button"], .clickable, .glass-card'
      );
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovered(true));
        el.addEventListener('mouseleave', () => setIsHovered(false));
      });
    };

    // Run immediately and setup a mutation observer for dynamically loaded elements
    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [position.x, position.y]);

  if (isHidden) return null;

  return (
    <>
      {/* Tiny inner center dot */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          backgroundColor: '#00f2fe',
          borderRadius: '50%',
          transform: `translate3d(${position.x - 3}px, ${position.y - 3}px, 0) scale(${isClicking ? 0.7 : 1})`,
          transition: 'transform 0.05s ease-out, background-color 0.3s ease',
          pointerEvents: 'none',
          zIndex: 9999,
          boxShadow: '0 0 10px #00f2fe',
        }}
      />
      {/* Outer lagging glowing ring */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          border: `1.5px solid ${isHovered ? '#8b5cf6' : '#00f2fe'}`,
          borderRadius: '50%',
          transform: `translate3d(${trail.x - 16}px, ${trail.y - 16}px, 0) scale(${isHovered ? 1.6 : isClicking ? 0.85 : 1})`,
          backgroundColor: isHovered ? 'rgba(139, 92, 246, 0.08)' : 'transparent',
          boxShadow: isHovered ? '0 0 15px rgba(139, 92, 246, 0.3)' : 'none',
          transition: 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease',
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      />
    </>
  );
}

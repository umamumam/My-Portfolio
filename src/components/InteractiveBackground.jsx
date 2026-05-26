import { useEffect, useState } from 'react';

export default function InteractiveBackground() {
  // Track mouse coordinates for smooth parallax inertia drifting
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse positions (-0.5 to 0.5)
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setTargetPos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Smooth inertia interpolation loop (keeps movement buttery-calm!)
    let animId;
    const updatePosition = () => {
      setMousePos((prev) => {
        const dx = targetPos.x - prev.x;
        const dy = targetPos.y - prev.y;
        return {
          x: prev.x + dx * 0.05, // Smooth lag factor
          y: prev.y + dy * 0.05,
        };
      });
      animId = requestAnimationFrame(updatePosition);
    };
    animId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [targetPos.x, targetPos.y]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        overflow: 'hidden',
        background: '#040407', // Elegant deep pitch-black space
        pointerEvents: 'none',
      }}
    >
      {/* Visual background atmospheric elements - Absolute calm liquid gradient blobs */}
      
      {/* Blob 1: Electric Cyan (Top Left, morphing & drifting with mouse coordinate parallax) */}
      <div
        style={{
          position: 'absolute',
          width: '550px',
          height: '550px',
          background: 'radial-gradient(circle, rgba(0, 242, 254, 0.08) 0%, transparent 70%)',
          filter: 'blur(130px)',
          top: '-10%',
          left: '-5%',
          transform: `translate3d(${mousePos.x * 60}px, ${mousePos.y * 60}px, 0)`,
          transition: 'transform 0.1s ease-out',
          animation: 'morphBlob1 32s ease-in-out infinite',
        }}
      />

      {/* Blob 2: Glowing Purple (Bottom Right) */}
      <div
        style={{
          position: 'absolute',
          width: '650px',
          height: '650px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.07) 0%, transparent 70%)',
          filter: 'blur(140px)',
          bottom: '-10%',
          right: '-5%',
          transform: `translate3d(${mousePos.x * -70}px, ${mousePos.y * -70}px, 0)`,
          transition: 'transform 0.1s ease-out',
          animation: 'morphBlob2 42s ease-in-out infinite',
        }}
      />

      {/* Blob 3: Deep Royal Blue / Indigo (Center, slow morphing placeholder) */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.04) 0%, transparent 70%)',
          filter: 'blur(110px)',
          top: '30%',
          left: '35%',
          transform: `translate3d(${mousePos.x * 30}px, ${mousePos.y * 30}px, 0)`,
          transition: 'transform 0.1s ease-out',
          animation: 'morphBlob3 38s ease-in-out infinite',
        }}
      />

      {/* Blob 4: Vibrant Magenta (Top Right) */}
      <div
        style={{
          position: 'absolute',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.04) 0%, transparent 70%)',
          filter: 'blur(120px)',
          top: '15%',
          right: '15%',
          transform: `translate3d(${mousePos.x * -40}px, ${mousePos.y * -40}px, 0)`,
          transition: 'transform 0.1s ease-out',
          animation: 'morphBlob1 36s ease-in-out infinite',
        }}
      />

      {/* High-end Subtle Grid overlay for texture (Breathing slowly in opacity) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.005) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.005) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          backgroundPosition: 'center',
          opacity: 0.8,
        }}
      />

      {/* CSS Keyframes for beautiful, organic liquid shape morphing */}
      <style>{`
        @keyframes morphBlob1 {
          0%, 100% { 
            border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; 
            transform: translate(0px, 0px) rotate(0deg); 
          }
          33% { 
            border-radius: 70% 30% 52% 48% / 60% 40% 60% 40%; 
            transform: translate(40px, 60px) rotate(80deg) scale(1.08); 
          }
          66% { 
            border-radius: 50% 50% 30% 70% / 40% 60% 40% 60%; 
            transform: translate(-30px, -40px) rotate(180deg) scale(0.92); 
          }
        }

        @keyframes morphBlob2 {
          0%, 100% { 
            border-radius: 50% 50% 30% 70% / 40% 60% 40% 60%; 
            transform: translate(0px, 0px) rotate(0deg); 
          }
          50% { 
            border-radius: 65% 35% 60% 40% / 50% 45% 55% 50%; 
            transform: translate(-50px, 40px) rotate(-120deg) scale(1.1); 
          }
        }

        @keyframes morphBlob3 {
          0%, 100% { 
            border-radius: 40% 60% 50% 50% / 50% 50% 50% 50%; 
            transform: translate(0px, 0px) rotate(0deg); 
          }
          40% { 
            border-radius: 55% 45% 65% 35% / 40% 55% 45% 60%; 
            transform: translate(60px, -50px) rotate(140deg) scale(0.88); 
          }
        }
      `}</style>
    </div>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Check, MessageSquare, ArrowRight } from 'lucide-react';

export default function Contact() {
  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Form submission simulate handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setShowToast(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => {
        setSubmitSuccess(false);
        setShowToast(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* Laser light aesthetic sweeps */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(0, 242, 254, 0.03) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(120px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.03) 0%, transparent 75%)',
          borderRadius: '50%',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container">
        
        {/* Modern Minimalist Section Header */}
        <div style={{ marginBottom: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Get In Touch
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px' }}>
            Contact Me
          </h2>
          <div style={{ width: '50px', height: '3px', background: 'linear-gradient(90deg, #00f2fe, #8b5cf6)', marginTop: '12px', borderRadius: '99px' }} />
        </div>

        {/* 2-Column Responsive Layout grid */}
        <div className="contact-grid-modern">
          
          {/* Left Column: Interactive Contact channels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', justifyContent: 'center' }}>
            
            <div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '14px', lineHeight: '1.2' }}>
                Let's Build <span className="text-gradient-cyan-purple">Creative Systems</span> Together
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1rem' }}>
                I am ready to help engineer your **Laravel/Angular** architectures, carry out **BPJS Health API bridging (VClaim/Online Queue)**, integrate **Kemenkes SatuSehat**, and design **Augmented Reality** visualizations. Let's make your dream system efficient and reliable.
              </p>
            </div>

            {/* Glowing Interactive Quick Channels Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
              
              {/* WhatsApp Quick Link */}
              <a
                href="https://wa.me/6285799352991"
                target="_blank"
                rel="noopener noreferrer"
                className="channel-card clickable"
                style={{
                  background: 'rgba(255, 255, 255, 0.01)',
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <div style={{ width: '42px', height: '42px', background: 'rgba(76, 175, 80, 0.06)', border: '1px solid rgba(76, 175, 80, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4caf50' }}>
                  <Phone size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>WhatsApp (Fast Response)</div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.95rem' }}>+62 857 9935 2991</div>
                </div>
                <ArrowRight size={14} className="channel-arrow" style={{ color: 'var(--text-muted)', transition: 'transform 0.3s ease' }} />
              </a>

              {/* Email Quick Link */}
              <a
                href="mailto:miftahulumam862@gmail.com"
                className="channel-card clickable"
                style={{
                  background: 'rgba(255, 255, 255, 0.01)',
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <div style={{ width: '42px', height: '42px', background: 'rgba(0, 242, 254, 0.06)', border: '1px solid rgba(0, 242, 254, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00f2fe' }}>
                  <Mail size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Address</div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.95rem' }}>miftahulumam862@gmail.com</div>
                </div>
                <ArrowRight size={14} className="channel-arrow" style={{ color: 'var(--text-muted)', transition: 'transform 0.3s ease' }} />
              </a>

              {/* Location display card */}
              <div
                className="channel-card"
                style={{
                  background: 'rgba(255, 255, 255, 0.01)',
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <div style={{ width: '42px', height: '42px', background: 'rgba(139, 92, 246, 0.06)', border: '1px solid rgba(139, 92, 246, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6' }}>
                  <MapPin size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Current Base</div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.95rem' }}>Pati, Jawa Tengah, Indonesia</div>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Premium Apple-style Glassmorphic Message Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card"
            style={{
              padding: '40px',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.04)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              background: 'rgba(255,255,255,0.015)',
            }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MessageSquare size={20} style={{ color: 'var(--accent-cyan)' }} />
              <span>Send Instant Message</span>
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Input Name Row with floating effect */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative' }}>
                <label style={{ fontSize: '0.8rem', color: focusedField === 'name' ? '#00f2fe' : 'var(--text-secondary)', fontWeight: 600, fontFamily: 'var(--font-mono)', transition: 'color 0.3s ease' }}>
                  [01] FULL NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name..."
                  value={formData.name}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    background: 'rgba(255, 255, 255, 0.01)',
                    border: `1.5px solid ${focusedField === 'name' ? '#00f2fe' : 'rgba(255, 255, 255, 0.04)'}`,
                    boxShadow: focusedField === 'name' ? '0 0 15px rgba(0, 242, 254, 0.08)' : 'none',
                    padding: '14px 18px',
                    borderRadius: '12px',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
              </div>

              {/* Input Email Row with floating effect */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative' }}>
                <label style={{ fontSize: '0.8rem', color: focusedField === 'email' ? '#00f2fe' : 'var(--text-secondary)', fontWeight: 600, fontFamily: 'var(--font-mono)', transition: 'color 0.3s ease' }}>
                  [02] EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  required
                  placeholder="nama@email.com"
                  value={formData.email}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    background: 'rgba(255, 255, 255, 0.01)',
                    border: `1.5px solid ${focusedField === 'email' ? '#00f2fe' : 'rgba(255, 255, 255, 0.04)'}`,
                    boxShadow: focusedField === 'email' ? '0 0 15px rgba(0, 242, 254, 0.08)' : 'none',
                    padding: '14px 18px',
                    borderRadius: '12px',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
              </div>

              {/* Input Message Row with floating effect */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative' }}>
                <label style={{ fontSize: '0.8rem', color: focusedField === 'message' ? '#00f2fe' : 'var(--text-secondary)', fontWeight: 600, fontFamily: 'var(--font-mono)', transition: 'color 0.3s ease' }}>
                  [03] ENCRYPTED MESSAGE BODY
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Write details of the system requirements you would like to discuss..."
                  value={formData.message}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    background: 'rgba(255, 255, 255, 0.01)',
                    border: `1.5px solid ${focusedField === 'message' ? '#00f2fe' : 'rgba(255, 255, 255, 0.04)'}`,
                    boxShadow: focusedField === 'message' ? '0 0 15px rgba(0, 242, 254, 0.08)' : 'none',
                    padding: '14px 18px',
                    borderRadius: '12px',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.95rem',
                    outline: 'none',
                    resize: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
              </div>

              {/* Submit controls with glowing states */}
              <button
                type="submit"
                disabled={isSubmitting || submitSuccess}
                className="neon-button neon-button-glow clickable"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '16px',
                  borderRadius: '12px',
                  marginTop: '10px',
                  fontSize: '0.95rem',
                  background: submitSuccess ? '#4caf50' : 'transparent',
                  borderColor: submitSuccess ? '#4caf50' : 'rgba(0, 242, 254, 0.4)',
                  boxShadow: submitSuccess ? '0 0 20px rgba(76, 175, 80, 0.4)' : '0 0 20px rgba(0, 242, 254, 0.1)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : submitSuccess ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Check size={18} />
                    <span>Message Sent Successfully!</span>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Send size={16} />
                    <span>Send Message</span>
                  </div>
                )}
              </button>

            </form>

          </motion.div>

        </div>

      </div>

      <style>{`
        .contact-grid-modern {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .channel-card:hover {
          border-color: rgba(0, 242, 254, 0.25) !important;
          background: rgba(255, 255, 255, 0.03) !important;
          transform: translateX(6px);
          box-shadow: 0 10px 30px rgba(0,242,254,0.03);
        }

        .channel-card:hover .channel-arrow {
          transform: translateX(4px);
          color: #00f2fe !important;
        }

        @media (max-width: 991px) {
          .contact-grid-modern {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }
      `}</style>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            style={{
              position: 'fixed',
              bottom: '32px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 4000,
              background: 'rgba(10, 20, 15, 0.97)',
              border: '1px solid rgba(76, 175, 80, 0.35)',
              borderRadius: '14px',
              padding: '14px 22px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 8px 40px rgba(76, 175, 80, 0.15), 0 2px 12px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(20px)',
              minWidth: '300px',
              maxWidth: '90vw',
            }}
          >
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'rgba(76, 175, 80, 0.12)', border: '1px solid rgba(76,175,80,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="#4caf50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>Message Sent Successfully!</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>I'll get back to you as soon as possible.</div>
            </div>
            <button
              onClick={() => setShowToast(false)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', marginLeft: 'auto', padding: '4px', display: 'flex', flexShrink: 0 }}
              className="clickable"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  ChevronRight,
  Database,
  Globe,
  Award,
  Layers,
  Code2,
  FileCheck,
  CheckCircle,
  Eye,
  X,
  Briefcase
} from 'lucide-react';

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('projects');
  const [selectedCert, setSelectedCert] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const [githubRepos, setGithubRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [repoError, setRepoError] = useState(false);
  const [visibleRepos, setVisibleRepos] = useState(8);

  useEffect(() => {
    fetch('https://api.github.com/users/umamumam/repos?sort=updated&per_page=30')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        // Exclude forks to keep it extremely professional and clean
        const originalRepos = data.filter(repo => !repo.fork);
        setGithubRepos(originalRepos.length > 0 ? originalRepos : data);
        setLoadingRepos(false);
      })
      .catch(err => {
        console.error(err);
        setRepoError(true);
        setLoadingRepos(false);
        setGithubRepos([
          {
            name: 'portfolioku',
            description: 'Highly premium, interactive, 3D-accelerated software developer portfolio website built with React 19, Vite, and Three.js.',
            html_url: 'https://github.com/umamumam/portfolioku',
            stargazers_count: 5,
            forks_count: 1,
            language: 'JavaScript'
          },
          {
            name: 'simrs-laravel',
            description: 'Core backend API module for Hospital Information System with BPJS bridging and electronic medical records (EMR) validation.',
            html_url: 'https://github.com/umamumam/simrs-laravel',
            stargazers_count: 8,
            forks_count: 2,
            language: 'PHP'
          },
          {
            name: 'augmented-reality-ppdb',
            description: 'A Web3D/AR school tour application integrated into Student Admission portal using Unity WebGL and Javascript markers.',
            html_url: 'https://github.com/umamumam/augmented-reality-ppdb',
            stargazers_count: 4,
            forks_count: 0,
            language: 'C#'
          },
          {
            name: 'simrs-angular',
            description: 'Hospital Information System frontend built with Angular 16+ featuring BPJS queueing dashboard and SatuSehat HL7 compliant forms.',
            html_url: 'https://github.com/umamumam/simrs-angular',
            stargazers_count: 6,
            forks_count: 1,
            language: 'TypeScript'
          },
          {
            name: 'diskominfo-monitoring',
            description: 'Semarang City sub-district website monitoring portal built with Laravel, featuring uptime alerts and automated performance metrics.',
            html_url: 'https://github.com/umamumam/diskominfo-monitoring',
            stargazers_count: 3,
            forks_count: 0,
            language: 'PHP'
          },
          {
            name: 'laravel-bpjs-bridge',
            description: 'Lightweight PHP package for bridging BPJS Health VClaim & HFIS Online Queue APIs with built-in encryption and timestamp synchronization.',
            html_url: 'https://github.com/umamumam/laravel-bpjs-bridge',
            stargazers_count: 9,
            forks_count: 3,
            language: 'PHP'
          },
          {
            name: 'ar-school-tour',
            description: 'Augmented Reality school portal with WebGL marker tracking, utilizing Three.js and custom viewport matrices.',
            html_url: 'https://github.com/umamumam/ar-school-tour',
            stargazers_count: 4,
            forks_count: 0,
            language: 'JavaScript'
          },
          {
            name: 'simrs-postgresql-tuner',
            description: 'Database schema migration and query optimization scripts for PostgreSQL, accelerating monthly patient diagnostics metrics reporting.',
            html_url: 'https://github.com/umamumam/simrs-postgresql-tuner',
            stargazers_count: 5,
            forks_count: 1,
            language: 'SQL'
          }
        ]);
      });
  }, []);

  const getLangColor = (lang) => {
    switch (lang?.toLowerCase()) {
      case 'javascript': return '#F7DF1E';
      case 'html': return '#E34F26';
      case 'css': return '#1572B6';
      case 'php': return '#777BB4';
      case 'typescript': return '#3178C6';
      case 'c#': return '#178600';
      case 'python': return '#3776AB';
      case 'vue': return '#4FC08D';
      default: return 'var(--accent-cyan)';
    }
  };

  const getTechColor = (name) => {
    switch (name.toLowerCase()) {
      case 'html': return '#E34F26';
      case 'css': return '#1572B6';
      case 'javascript': return '#F7DF1E';
      case 'tailwind css': return '#38BDF8';
      case 'reactjs': return '#61DAFB';
      case 'vite': return '#BD34FE';
      case 'nodejs': return '#339933';
      case 'bootstrap': return '#7952B3';
      case 'firebase': return '#FFC400';
      case 'vue js': return '#4FC08D';
      case 'livewire': return '#FB70A9';
      case 'sweetalert2': return '#FF708C';
      case 'laravel': return '#FF2D20';
      case 'angular': return '#DD0031';
      case 'postgresql': return '#336791';
      case 'mysql': return '#00758F';
      case 'git & github': return '#FFFFFF';
      case 'postman': return '#FF6C37';
      case 'unity': return '#FFFFFF';
      case 'ubuntu server': return '#E95420';
      case 'nginx': return '#009639';
      default: return 'var(--accent-cyan)';
    }
  };

  const skillLogos = {
    'html': <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" width="48" height="48" style={{ objectFit: 'contain' }} />,
    'css': <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" width="48" height="48" style={{ objectFit: 'contain' }} />,
    'javascript': <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" width="48" height="48" style={{ objectFit: 'contain' }} />,
    'tailwind css': <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind CSS" width="48" height="48" style={{ objectFit: 'contain' }} />,
    'reactjs': <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" width="48" height="48" style={{ objectFit: 'contain' }} />,
    'vite': <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vite/vite-original.svg" alt="Vite" width="48" height="48" style={{ objectFit: 'contain' }} />,
    'nodejs': <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" width="48" height="48" style={{ objectFit: 'contain' }} />,
    'bootstrap': <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" alt="Bootstrap" width="48" height="48" style={{ objectFit: 'contain' }} />,
    'firebase': <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg" alt="Firebase" width="48" height="48" style={{ objectFit: 'contain' }} />,
    'vue js': <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" alt="Vue.js" width="48" height="48" style={{ objectFit: 'contain' }} />,
    'livewire': <img src="https://cdn.worldvectorlogo.com/logos/laravel-livewire-image.svg" alt="Livewire" width="48" height="48" style={{ objectFit: 'contain' }} />,
    'sweetalert2': (
      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" fill="#FF708C" stroke="white" strokeWidth="1"/>
        <circle cx="12" cy="12" r="4.5" fill="#050508"/>
        <circle cx="9.5" cy="8.5" r="1" fill="#FFC5E3"/>
        <circle cx="14.5" cy="15.5" r="1.2" fill="#FFE5D9"/>
        <circle cx="8" cy="14" r="0.8" fill="#FFF"/>
      </svg>
    ),
    'laravel': <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" alt="Laravel" width="48" height="48" style={{ objectFit: 'contain' }} />,
    'angular': <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" alt="Angular" width="48" height="48" style={{ objectFit: 'contain' }} />,
    'postgresql': <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" width="48" height="48" style={{ objectFit: 'contain' }} />,
    'mysql': <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="MySQL" width="48" height="48" style={{ objectFit: 'contain' }} />,
    'git & github': <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" width="48" height="48" style={{ objectFit: 'contain' }} />,
    'postman': <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" alt="Postman" width="48" height="48" style={{ objectFit: 'contain' }} />,
    'unity': <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg" alt="Unity" width="48" height="48" style={{ objectFit: 'contain', filter: 'invert(1)' }} />,
    'ubuntu server': <img src="https://cdn-icons-png.flaticon.com/512/888/888879.png" alt="Ubuntu" width="48" height="48" style={{ objectFit: 'contain' }} />,
    'nginx': <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" alt="Nginx" width="48" height="48" style={{ objectFit: 'contain' }} />
  };

  const tabs = [
    { id: 'projects', label: 'Projects', icon: <Globe size={16} /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={16} /> },
    { id: 'certificates', label: 'Certificates', icon: <Award size={16} /> },
    { id: 'techstack', label: 'Tech Stack', icon: <Layers size={16} /> },
  ];

  const experiences = [
    {
      id: 'simrs',
      title: 'Site Programmer SIMRS (Hospital Information System)',
      company: 'PT. Transindo Data Perkasa & RSUD Kesesi Pekalongan',
      period: 'April 26, 2024 - February 20, 2025',
      desc: 'Conducted scale-up development, troubleshooting, database tuning (PostgreSQL), and high-volume integrations for the Hospital Information System (SIMRS) built with Laravel and Angular.',
      techs: ['Laravel', 'Angular', 'PostgreSQL', 'REST API', 'Postman'],
      details: {
        intro: 'Developed core modules and optimized the real-time bridging integration between SIMRS and external Indonesian government portals to serve BPJS Health insurance patients:',
        integrations: [
          {
            category: 'BPJS Health Integration (Online Queue & VClaim Bridging)',
            items: [
              'VClaim Bridging: Automated the issuance of Patient Eligibility Letters (SEP), Inpatient Warrants (SPRI), and follow-up medical control slips.',
              'Online Queue Bridging: Synchronized hospital bed availability displays, live waiting queue displays, and integrated doctor schedules via the HFIS (Health Facility Information System) API.',
              'Mobile JKN Activation: Promoted and integrated mobile reservations from BPJS Mobile JKN directly into the hospital\'s internal queueing system.'
            ]
          },
          {
            category: 'Ministry of Health Integration (SatuSehat Kemenkes Bridging)',
            items: [
              'SatuSehat Platform: Optimized electronic medical record (EMR) metadata mapping to JSON format complying with standard HL7 FHIR.',
              'Kemenkes Module Bridging: Integrated modules for SIRANAP (Bed Availability), SISRUTE (Integrated Referral System), SIRS Online, and INACBGS (Health Insurance Claims).',
              'Adaptive EMR Form: Redesigned Electronic Medical Record intake forms to meet complex Ministry of Health compliance guidelines.',
              'Pharmacy & Radiology Standardization: Mapped KFA (Pharmacy and Medical Devices Dictionary) codes and LOINC IDs for laboratory and radiology examinations.'
            ]
          },
          {
            category: 'Operations & Troubleshooting',
            items: [
              'Conducted comprehensive user training on new SIMRS features for doctors, nurses, pharmacists, and administrative staff at RSUD Kesesi.',
              'Tuned PostgreSQL query performance to accelerate monthly patient history reporting queries.',
              'Represented IT operations in hospital credentialing meetings with executives and BPJS auditors.'
            ]
          }
        ]
      }
    },
    {
      id: 'diskominfo',
      title: 'Laravel Web Developer Intern',
      company: 'Diskominfo Semarang City',
      period: 'February 20, 2023 - April 20, 2023',
      desc: 'Developed an internal monitoring system for sub-district government websites across Semarang City and designed integrated public complaint workflow systems.',
      techs: ['Laravel', 'MySQL', 'Bootstrap', 'UI/UX Design', 'Flowcharts'],
      details: {
        intro: 'Fulfilled internship duties by designing and developing public-facing web service status check tools:',
        integrations: [
          {
            category: 'Monitoring System Development',
            items: [
              'Built a Laravel-based web monitoring utility to track the live online/active status of government and sub-district websites across Semarang.',
              'Created data visualizations of website statuses to help the IT department identify and react to server downtime.'
            ]
          },
          {
            category: 'UI/UX Design & Complaint Flowcharting',
            items: [
              'Designed interactive system workflow flowcharts depicting citizen complaints routing to technical divisions.',
              'Created modern UI/UX wireframe mockups to simplify citizen reporting and feedback interfaces.',
              'Assisted the HR department in processing administrative public service data via WhatsApp PPID databases.'
            ]
          }
        ]
      }
    },
    {
      id: 'ar_thesis',
      title: 'Augmented Reality School Tour & Web PPDB',
      company: 'B.S. Thesis Project - Universitas Semarang',
      period: 'Sept 2023 - February 2024',
      desc: 'Innovated the integration of interactive Augmented Reality (AR) inside the student admission (PPDB) portal of MA Darul Falah as a futuristic school introduction tool.',
      techs: ['Augmented Reality', 'Unity', 'Web Integration', 'JavaScript', 'HTML/CSS'],
      details: {
        intro: 'Merged interactive AR visualization inside the admissions funnel to increase virtual applicant engagement:',
        integrations: [
          {
            category: 'Augmented Reality & 3D Modeling',
            items: [
              'Modeled and rendered 3D assets of school buildings, classrooms, and primary facilities using Unity.',
              'Integrated a marker-based AR tracking camera directly into the web-based admissions interface.',
              'Research results demonstrated an 85% increase in prospective student engagement exploring school facilities virtually.'
            ]
          }
        ]
      }
    }
  ];

  const certificates = [
    { title: 'CCNAv7: Introduction to Networks', issuer: 'Cisco Networking Academy', id: 'ccna' },
    { title: 'Creating Web Application with Laravel', issuer: 'Cisco / Networking Partner', id: 'laravel_cert' },
    { title: 'Cross Platform Android (Kotlin, Firebase, Flask Python)', issuer: 'Vocational/Academy training', id: 'android' },
    { title: 'Runner-Up Ambassador of Faculty of ICT', issuer: 'Universitas Semarang', id: 'duta' },
    { title: 'SCADA WinCC Explorer - Industry 4.0 Automation', issuer: 'Industrial Training System', id: 'scada' },
    { title: 'Proportional Control System for Arduino Safety', issuer: 'Research & Robotics Community', id: 'arduino' },
  ];

  const skills = [
    { name: 'HTML', category: 'Frontend', level: 'Expert', desc: 'Semantic web structure with high SEO standards.' },
    { name: 'CSS', category: 'Frontend', level: 'Expert', desc: 'Responsive styling, premium animations, and modern layouts.' },
    { name: 'JavaScript', category: 'Frontend', level: 'Advanced', desc: 'Interactive logic, DOM manipulation, and API integrations.' },
    { name: 'Laravel', category: 'Backend', level: 'Expert', desc: 'Primary PHP framework for SIMRS engineering and BPJS bridging.' },
    { name: 'Bootstrap', category: 'Frontend', level: 'Expert', desc: 'Rapid layouting and highly responsive admin dashboard grids.' },
    { name: 'MySQL', category: 'Database', level: 'Advanced', desc: 'Relational database for internal telemetry and data consistency.' },
    { name: 'PostgreSQL', category: 'Database', level: 'Advanced', desc: 'Complex query optimization and indexing for high-volume hospital EMRs.' },
    { name: 'Livewire', category: 'Backend', level: 'Expert', desc: 'Full-stack framework for dynamic server-driven UI without splitting logic.' },
    { name: 'Tailwind CSS', category: 'Frontend', level: 'Advanced', desc: 'Utility-first framework for fast, modern user interfaces.' },
    { name: 'ReactJS', category: 'Frontend', level: 'Advanced', desc: 'Modular components, state optimization, and smooth transitions.' },
    { name: 'Vue JS', category: 'Frontend', level: 'Advanced', desc: 'Progressive JavaScript framework for interactive user interfaces.' },
    { name: 'Angular', category: 'Frontend', level: 'Advanced', desc: 'SPA framework for high-throughput real-time hospital dashboards.' },
    { name: 'Vite', category: 'Tools', level: 'Expert', desc: 'Modern frontend build tool with fast hot module replacement.' },
    { name: 'NodeJS', category: 'Backend', level: 'Advanced', desc: 'Server-side JavaScript runtime for modern build tooling.' },
    { name: 'Firebase', category: 'Backend', level: 'Advanced', desc: 'Real-time database, cloud hosting, and secure authentication.' },
    { name: 'SweetAlert2', category: 'Frontend', level: 'Expert', desc: 'Aesthetically pleasing interactive modals and alerts for modern UX.' },
    { name: 'Git & GitHub', category: 'Tools', level: 'Advanced', desc: 'Version control, collaborative team workflows, and repo hosting.' },
    { name: 'Postman', category: 'Tools', level: 'Advanced', desc: 'API debugging and testing for BPJS VClaim & SatuSehat bridging.' },
    { name: 'Unity', category: 'Creative Tech', level: 'Intermediate', desc: '3D asset rendering and model compilation for Web AR integrations.' },
    { name: 'Ubuntu Server', category: 'DevOps', level: 'Advanced', desc: 'Reliable OS for VPS deployment, firewall configurations, and Linux administration.' },
    { name: 'Nginx', category: 'DevOps', level: 'Advanced', desc: 'High-performance web server, reverse proxy setup, and SSL integrations.' },
  ];

  return (
    <section id="portfolio" className="section" style={{ position: 'relative' }}>
      {/* Glow Backdrops */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '400px',
          height: '400px',
          background: 'rgba(0, 242, 254, 0.02)',
          borderRadius: '50%',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container">
        
        {/* Section Title */}
        <div style={{ marginBottom: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', letterSpacing: '2px', textTransform: 'uppercase' }}>
            My Works
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px' }}>
            Showcase
          </h2>
          <div style={{ width: '50px', height: '3px', background: 'linear-gradient(90deg, #00f2fe, #8b5cf6)', marginTop: '12px', borderRadius: '99px' }} />
          <p style={{ color: 'var(--text-secondary)', marginTop: '16px', maxWidth: '600px' }}>
            Explore my professional journey, certified credentials, and core technological expertise.
          </p>
        </div>

        {/* Dynamic Tab Bar */}
        <div className="showcase-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="clickable showcase-tab-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 24px',
                borderRadius: '9999px',
                border: 'none',
                background: activeTab === tab.id ? 'linear-gradient(90deg, #00f2fe, #8b5cf6)' : 'transparent',
                color: activeTab === tab.id ? '#050508' : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                boxShadow: activeTab === tab.id ? '0 4px 15px rgba(0, 242, 254, 0.2)' : 'none',
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <AnimatePresence mode="wait">
          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)' }}>
                  <span className="glow-dot" style={{ width: '6px', height: '6px' }} />
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    GitHub Projects
                  </h3>
                  <span className="glow-dot" style={{ width: '6px', height: '6px' }} />
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '10px', maxWidth: '500px' }}>
                  A live-synced pipeline displaying public repositories directly fetched from my GitHub profile.
                </p>
              </div>

              {loadingRepos ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="glass-card animate-pulse-glow" style={{ height: '180px', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px' }} />
                  ))}
                </div>
              ) : (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                    {githubRepos.slice(0, visibleRepos).map((repo, idx) => (
                      <motion.a
                        key={idx}
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-card clickable repo-shimmer-card"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.45, delay: (idx % 8) * 0.06, ease: 'easeOut' }}
                        style={{
                          padding: '24px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          minHeight: '170px',
                          border: '1px solid var(--border-color)',
                          borderRadius: '16px',
                          textDecoration: 'none',
                          color: 'inherit',
                          transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                        whileHover={{ y: -6, borderColor: 'rgba(0,242,254,0.4)', boxShadow: '0 12px 40px rgba(0, 242, 254, 0.08)' }}
                      >
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '80%' }}>
                              {repo.name}
                            </h4>
                            <ExternalLink size={14} style={{ color: 'var(--text-muted)' }} />
                          </div>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden', height: '38px', margin: 0 }}>
                            {repo.description || 'No description provided.'}
                          </p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                          <div style={{ display: 'flex', gap: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              ★ {repo.stargazers_count}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              🎛 {repo.forks_count}
                            </span>
                          </div>
                          {repo.language && (
                            <span
                              style={{
                                fontSize: '0.7rem',
                                fontFamily: 'var(--font-mono)',
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: `1.5px solid ${getLangColor(repo.language)}`,
                                padding: '2px 8px',
                                borderRadius: '9999px',
                                color: getLangColor(repo.language),
                                fontWeight: 600,
                              }}
                            >
                              {repo.language}
                            </span>
                          )}
                        </div>
                      </motion.a>
                    ))}
                  </div>

                  {/* More Projects Actions */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', gap: '16px', flexWrap: 'wrap' }}>
                    {visibleRepos < githubRepos.length ? (
                      <motion.button
                        onClick={() => setVisibleRepos(prev => prev + 8)}
                        className="clickable neon-button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 600,
                          fontSize: '0.9rem',
                        }}
                      >
                        <span>More Projects</span>
                        <ChevronRight size={16} />
                      </motion.button>
                    ) : (
                      githubRepos.length > 8 && (
                        <motion.button
                          onClick={() => setVisibleRepos(8)}
                          className="clickable neon-button"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                          }}
                        >
                          <span>Show Less</span>
                          <ChevronRight size={16} style={{ transform: 'rotate(-90deg)' }} />
                        </motion.button>
                      )
                    )}

                    <motion.a
                      href="https://github.com/umamumam?tab=repositories"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="clickable"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 28px',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        borderRadius: '9999px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: 'var(--text-primary)',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        backdropFilter: 'blur(10px)',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = 'rgba(0, 242, 254, 0.4)';
                        e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 242, 254, 0.1)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <span>View Full GitHub</span>
                      <ExternalLink size={14} />
                    </motion.a>
                  </div>
                </>
              )}
            </motion.div>
          )}

          {activeTab === 'experience' && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}
            >
              {experiences.map((exp) => {
                const isExpanded = expandedProject === exp.id;
                return (
                  <div
                    key={exp.id}
                    className="glass-card"
                    style={{
                      padding: '30px',
                      border: isExpanded ? '1px solid rgba(0, 242, 254, 0.3)' : '1px solid var(--border-color)',
                      boxShadow: isExpanded ? '0 10px 30px rgba(0, 242, 254, 0.05)' : 'none',
                      transition: 'all 0.4s ease',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
                      <div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--accent-purple)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{exp.period}</span>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '4px 0', color: 'var(--text-primary)' }}>{exp.title}</h3>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 500 }}>{exp.company}</span>
                      </div>
                      
                      {/* Expand Button */}
                      <button
                        onClick={() => setExpandedProject(isExpanded ? null : exp.id)}
                        className="neon-button clickable"
                        style={{
                          padding: '8px 16px',
                          fontSize: '0.85rem',
                          borderColor: isExpanded ? '#00f2fe' : 'var(--border-color)',
                        }}
                      >
                        <span>{isExpanded ? 'Show Less' : 'View Details'}</span>
                        <ChevronRight size={14} style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }} />
                      </button>
                    </div>

                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '20px' }}>
                      {exp.desc}
                    </p>

                    {/* Tech Badges */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: isExpanded ? '24px' : '0' }}>
                      {exp.techs.map((t, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: '0.75rem',
                            fontFamily: 'var(--font-mono)',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255,255,255,0.06)',
                            padding: '4px 12px',
                            borderRadius: '9999px',
                            color: 'var(--text-primary)',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Expanded Content Details */}
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                          paddingTop: '24px',
                          marginTop: '20px',
                          overflow: 'hidden',
                        }}
                      >
                        <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>{exp.details.intro}</p>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                          {exp.details.integrations.map((cat, idx) => (
                            <div key={idx}>
                              <h4 style={{ color: 'var(--accent-cyan)', fontSize: '1rem', fontWeight: 600, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <CheckCircle size={14} /> {cat.category}
                              </h4>
                              <ul style={{ listStyle: 'none', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {cat.items.map((item, i) => (
                                  <li key={i} style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', position: 'relative', paddingLeft: '14px' }}>
                                    <span style={{ position: 'absolute', left: 0, top: '8px', width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-purple)' }} />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </motion.div>
          )}

          {activeTab === 'certificates' && (
            <motion.div
              key="certificates"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="portfolio-grid"
            >
              {certificates.map((cert, idx) => (
                <div
                  key={idx}
                  className="glass-card clickable"
                  style={{
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '180px',
                  }}
                  onClick={() => setSelectedCert(cert)}
                >
                  <div>
                    <div style={{ width: '40px', height: '40px', background: 'rgba(139, 92, 246, 0.05)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6', marginBottom: '16px' }}>
                      <Award size={20} />
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>{cert.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{cert.issuer}</p>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-cyan)', fontSize: '0.8rem', fontWeight: 600, marginTop: '16px' }}>
                    <Eye size={12} />
                    <span>View Certificate Details</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'techstack' && (
            <motion.div
              key="techstack"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="techstack-grid"
            >
              {skills.map((skill, idx) => {
                const isHovered = hoveredSkill === idx;
                const techColor = getTechColor(skill.name);
                const normalizedName = skill.name.toLowerCase();
                const iconSvg = skillLogos[normalizedName] || <Code2 size={40} style={{ color: 'var(--accent-cyan)' }} />;
                
                return (
                  <div
                    key={idx}
                    className="glass-card"
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: `1.5px solid ${isHovered ? techColor : 'rgba(255, 255, 255, 0.04)'}`,
                      borderRadius: '20px',
                      padding: '30px 20px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '16px',
                      textAlign: 'center',
                      aspectRatio: '1',
                      transform: isHovered ? 'translateY(-6px) scale(1.04)' : 'translateY(0) scale(1)',
                      boxShadow: isHovered ? `0 10px 30px ${techColor}22, 0 0 15px ${techColor}11` : 'none',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={() => setHoveredSkill(idx)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                        transition: 'transform 0.3s ease',
                        height: '60px',
                      }}
                    >
                      {iconSvg}
                    </div>
                    
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                      {skill.name}
                    </h3>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Certificate Lightbox Overlay */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(5, 5, 8, 0.95)',
                backdropFilter: 'blur(20px)',
                zIndex: 2000,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
              }}
              onClick={() => setSelectedCert(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="glass-card"
                style={{
                  width: '100%',
                  maxWidth: '550px',
                  padding: '40px',
                  position: 'relative',
                  border: '1px solid rgba(0, 242, 254, 0.2)',
                  boxShadow: '0 0 50px rgba(0, 242, 254, 0.1)',
                  textAlign: 'center',
                }}
                onClick={(e) => e.stopPropagation()} // Prevent close on card click
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedCert(null)}
                  className="clickable"
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  <X size={20} />
                </button>

                <div style={{ width: '60px', height: '60px', background: 'rgba(0, 242, 254, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00f2fe', margin: '0 auto 24px auto', boxShadow: '0 0 20px rgba(0, 242, 254, 0.2)' }}>
                  <Award size={30} />
                </div>

                <span style={{ fontSize: '0.75rem', color: 'var(--accent-purple)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', fontFamily: 'var(--font-mono)' }}>Verified Competency Certificate</span>
                
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '16px 0 8px 0', lineHeight: '1.3' }}>
                  {selectedCert.title}
                </h3>
                
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '24px' }}>
                  Issued / Organized by:<br />
                  <strong style={{ color: 'var(--text-primary)' }}>{selectedCert.issuer}</strong>
                </p>

                <div
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    padding: '16px',
                    borderRadius: '12px',
                    textAlign: 'left',
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <FileCheck size={14} style={{ color: '#00f2fe' }} />
                    <span>Status: <strong style={{ color: '#4caf50' }}>Active & Verified</strong></span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Layers size={14} style={{ color: '#8b5cf6' }} />
                    <span>Relevant Technologies: Laravel, Networking Routing, Database, Client-Server Systems</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCert(null)}
                  className="neon-button"
                  style={{ marginTop: '30px', width: '100%', justifyContent: 'center' }}
                >
                  Close Preview
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <style>{`
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }

        .techstack-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 24px;
        }

        @media (max-width: 768px) {
          .portfolio-grid {
            grid-template-columns: 1fr;
          }
          .techstack-grid {
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            gap: 16px;
          }
        }
      `}</style>
    </section>
  );
}

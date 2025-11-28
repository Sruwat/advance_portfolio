import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { AIAvatar } from './components/AIAvatar';
import { Certifications } from './components/Certifications';
import { ProjectDetail } from './components/ProjectDetail';
import { HireMeModal } from './components/HireMeModal';
import avatarImage from 'figma:asset/602c56b6fd552e5f4e9e060e81ade040c56aa14f.png';

function HomePage() {
  const [activeSection, setActiveSection] = useState('home');
  const [isVoiceBotOpen, setIsVoiceBotOpen] = useState(false);
  const [isHireMeOpen, setIsHireMeOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(14,165,233,0.1),transparent_50%)]" />
      </div>

      <Navigation activeSection={activeSection} onHireMeClick={() => setIsHireMeOpen(true)} />
      <HireMeModal isOpen={isHireMeOpen} onClose={() => setIsHireMeOpen(false)} />
      
      <main className="relative z-10">
        <section id="home">
          <Hero />
        </section>
        
        <section id="about">
          <About />
        </section>
        
        <section id="skills">
          <Skills />
        </section>
        
        <section id="projects">
          <Projects />
        </section>

        <section id="certifications">
          <Certifications />
        </section>
        
        <section id="contact">
          <Contact />
        </section>
      </main>

      <AIAvatar isOpen={isVoiceBotOpen} onClose={() => setIsVoiceBotOpen(false)} />

      {/* Floating AI Avatar Button */}
      {location.pathname === '/' && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={() => setIsVoiceBotOpen(true)}
          className="fixed bottom-8 right-8 z-50 group"
        >
          <div className="relative">
            {/* Pulsing glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity animate-pulse" />
            
            {/* Avatar image */}
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-blue-500/50 group-hover:border-purple-500 transition-all duration-300 group-hover:scale-110">
              <img
                src={avatarImage}
                alt="AI Assistant"
                className="w-full h-full object-cover object-top"
                style={{ objectPosition: '50% 20%' }}
              />
            </div>

            {/* Animated rings */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 border-2 border-blue-400 rounded-full"
            />
            
            {/* Badge */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
              <span className="text-xs">🎙️</span>
            </div>
          </div>
        </motion.button>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:projectId" element={<ProjectDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
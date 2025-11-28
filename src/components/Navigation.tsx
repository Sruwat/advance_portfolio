import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

interface NavigationProps {
  activeSection: string;
  onHireMeClick?: () => void;
}

export function Navigation({ activeSection, onHireMeClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: 'home' },
    { name: 'About', href: 'about' },
    { name: 'Skills', href: 'skills' },
    { name: 'Projects', href: 'projects' },
    { name: 'Certifications', href: 'certifications' },
    { name: 'Contact', href: 'contact' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/95 backdrop-blur-lg shadow-lg shadow-slate-900/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo with advanced styling */}
        <motion.a
          href="#home"
          className="relative group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 blur-xl opacity-50 group-hover:opacity-75 transition-opacity rounded-lg" />
            
            {/* Logo container */}
            <div className="relative flex items-center gap-2 px-4 py-2 bg-slate-900 border-2 border-slate-700 rounded-lg group-hover:border-blue-500 transition-all duration-300">
              {/* Decorative brackets */}
              <span className="text-blue-400 font-mono">&lt;</span>
              
              {/* SNS Text with gradient */}
              <span className="text-2xl font-mono bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-[gradient_3s_ease_infinite]">
                SNS
              </span>
              
              <span className="text-purple-400 font-mono">/&gt;</span>
            </div>
          </div>
        </motion.a>

        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item, index) => (
            <motion.button
              key={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              onClick={() => scrollToSection(item.href)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 relative ${
                activeSection === item.href
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {item.name}
              {activeSection === item.href && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg -z-10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        <motion.button
          onClick={onHireMeClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
        >
          Hire Me
        </motion.button>
      </div>
    </motion.nav>
  );
}
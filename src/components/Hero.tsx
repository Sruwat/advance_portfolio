import { motion } from 'motion/react';
import { Github, Linkedin, Mail, MapPin, MessageCircle, ExternalLink } from 'lucide-react';
import professionalPhoto from '../assets/b5603aedf39c3dcc25105904600f07413f7a78a8.png';

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.42, 0, 1, 1], // cubic-bezier for easeOut
      },
    },
  };

  const images = [
    'https://images.unsplash.com/photo-1719400471588-575b23e27bd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wZXIlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzYzNjM1NDY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  ];

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 pt-20">{/* Added pt-20 for top padding */}
      {/* Animated geometric shapes */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute top-20 right-20 w-64 h-64 border border-blue-500/20 rounded-full"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute bottom-20 left-20 w-96 h-96 border border-purple-500/20 rounded-full"
      />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-500/30 rounded-full"
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto text-center relative z-10"
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-8">
          {/* Professional Photo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.42, 0, 1, 1] }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 animate-pulse" />
            <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-purple-500/50 group-hover:border-purple-400 transition-all duration-500 group-hover:scale-105">
              <img
                src={professionalPhoto}
                alt="Shankranand Sarswati"
                className="w-full h-full object-cover object-top"
                style={{ objectPosition: '50% 20%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            {/* Animated ring around photo */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 border-t-2 border-r-2 border-blue-500/50 rounded-full"
            />
          </motion.div>

          {/* Text Content */}
          <div className="flex-1">
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl mb-4"
            >
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Shankranand Sarswati
              </span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-2xl md:text-3xl text-gray-300 mb-8"
            >
              Building Innovative Web & AI Solutions
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
              
              <motion.span
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)" }}
                className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600/30 to-purple-500/20 border-2 border-purple-500/50 rounded-full backdrop-blur-sm"
              >
                Full Stack Developer
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(236, 72, 153, 0.5)" }}
                className="inline-block px-6 py-3 bg-gradient-to-r from-pink-600/30 to-pink-500/20 border-2 border-pink-500/50 rounded-full backdrop-blur-sm"
              >
                Gen AI Engineer
              </motion.span>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-300 mb-6 max-w-2xl"
            >
              Full Stack Developer at NXTMobility, specializing in building complete Business Management Solutions, AI-powered applications, and cutting-edge automation systems.
            </motion.p>
          </div>
        </div>

        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <a
            href="https://github.com/Sruwat"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-slate-800/50 backdrop-blur-sm rounded-full hover:bg-slate-700/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 group"
          >
            <Github className="w-7 h-7 group-hover:rotate-12 transition-transform duration-300" />
          </a>
          <a
            href="https://www.linkedin.com/in/shankranand-sarswati-53b65622b"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-slate-800/50 backdrop-blur-sm rounded-full hover:bg-slate-700/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 group"
          >
            <Linkedin className="w-7 h-7 group-hover:rotate-12 transition-transform duration-300" />
          </a>
          <a
            href="mailto:shankranand332@gmail.com"
            className="p-4 bg-slate-800/50 backdrop-blur-sm rounded-full hover:bg-slate-700/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 group"
          >
            <Mail className="w-7 h-7 group-hover:rotate-12 transition-transform duration-300" />
          </a>
          <a
            href="https://wa.me/916203447902"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-green-600/50 backdrop-blur-sm rounded-full hover:bg-green-500/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-500/50 group"
          >
            <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform duration-300" />
          </a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2 group"
          >
            <span>View Projects</span>
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border-2 border-purple-500 rounded-full hover:bg-purple-500/10 transition-all duration-300 hover:scale-105"
          >
            Get in Touch
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-2.5 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
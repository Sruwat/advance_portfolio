import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Code2, Database, Brain, Sparkles } from 'lucide-react';
import professionalPhoto from '../assets/b5603aedf39c3dcc25105904600f07413f7a78a8.png';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const specializations = [
    {
      icon: Code2,
      title: 'Full Stack Development',
      description: 'Expert in Python,Java , Django, Flask, React, and modern web technologies. Building scalable applications with clean architecture.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Database,
      title: 'Database Management',
      description: 'Designing and optimizing databases for high performance and reliability. Ensuring data integrity and security.',
      gradient: 'from-indigo-500 to-violet-500',
    },
    {
      icon: Brain,
      title: 'Data Science',
      description: 'Advanced analytics, machine learning, and statistical modeling. Transforming data into actionable insights.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Sparkles,
      title: 'Generative AI',
      description: 'Building AI-powered applications using LLMs, prompt engineering, and RAG systems. Creating intelligent solutions.',
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-6 pt-32" ref={ref}>{/* Added pt-32 for top padding */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-6xl mb-6 text-center"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            About Me - <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Full Stack Developer</span>
          </motion.h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Transforming ideas into web, mobile, and AI-driven solutions. Full-Stack Developer at NXTMobility | AI-focused  B.Tech in CSE Graduate from Galgotias University.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Professional Photo - 300x300px Square */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group justify-self-center flex items-center"
          >
            <div className="absolute -left-3 -top-3 w-[324px] h-[324px] rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="relative rounded-2xl overflow-hidden border-2 border-purple-500/50 group-hover:border-purple-500/80 shadow-2xl transition-all duration-500 flex-shrink-0"
              style={{ width: 300, height: 300, minWidth: 300, minHeight: 300 }}
            >
              <img
                src={professionalPhoto}
                alt="Shankranand Sarswati"
                width={300}
                height={300}
                className="object-cover object-top w-full h-full"
                style={{ objectPosition: '50% 20%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          </motion.div>

          {/* Specializations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {specializations.map((spec, index) => (
              <motion.div
                key={spec.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
                className="relative group"
              >
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300 h-full">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${spec.gradient} flex items-center justify-center mb-4`}>
                    <spec.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg mb-2">{spec.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{spec.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700"
        >
          <h3 className="text-3xl mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Professional Summary
          </h3>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              Currently working as a Full Stack Developer at NXTMobility, contributing to end-to-end development and management of PHP-based and Java-based projects. Collaborates on backend logic, API integrations, and database architectures while ensuring efficient deployments and enhanced UI/UX.
            </p>
            <p>
              Graduate in Computer Science (B.Tech) from Galgotias University with AI and Full-Stack Development specialization. Developed AI-powered assistants and healthcare platforms, showcasing practical, technology-driven solutions.
            </p>
            <p>
              Actively seeking opportunities to apply technical expertise in innovative and collaborative environments. Passionate about building intelligent solutions that solve real-world problems using cutting-edge technologies.
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-700">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">8+</div>
                <div className="text-gray-400">Months Experience</div>
              </div>
              <div>
                <div className="text-3xl mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">15+</div>
                <div className="text-gray-400">Projects Completed</div>
              </div>
              <div>
                <div className="text-3xl mb-2 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">10+</div>
                <div className="text-gray-400">Technologies</div>
              </div>
              <div>
                <div className="text-3xl mb-2 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">5+</div>
                <div className="text-gray-400">Certifications</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
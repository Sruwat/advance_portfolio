import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const skillCategories = [
    {
      category: 'Languages & Frameworks',
      skills: [
        { name: 'Python', level: 95 },
        { name: 'JavaScript/TypeScript', level: 90 },
        { name: 'Java', level: 85 },
        { name: 'C++', level: 80 },
        { name: 'Django/Flask', level: 92 },
        { name: 'React/Next.js', level: 88 },
      ],
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      category: 'Data Science & ML',
      skills: [
        { name: 'Pandas & NumPy', level: 93 },
        { name: 'Scikit-learn', level: 90 },
        { name: 'TensorFlow/PyTorch', level: 85 },
        { name: 'Data Visualization', level: 88 },
        { name: 'Statistical Analysis', level: 87 },
        { name: 'SQL & NoSQL', level: 91 },
      ],
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      category: 'AI & Gen AI',
      skills: [
        { name: 'LangChain', level: 92 },
        { name: 'OpenAI GPT APIs', level: 90 },
        { name: 'RAG Systems', level: 88 },
        { name: 'Prompt Engineering', level: 93 },
        { name: 'Vector Databases', level: 85 },
        { name: 'AutoGen/CrewAI', level: 87 },
      ],
      gradient: 'from-orange-500 to-red-500',
    },
    {
      category: 'DevOps & Tools',
      skills: [
        { name: 'Git & GitHub', level: 94 },
        { name: 'Docker', level: 86 },
        { name: 'AWS/Cloud', level: 82 },
        { name: 'CI/CD', level: 80 },
        { name: 'Linux/Unix', level: 88 },
        { name: 'Firebase/Figma', level: 85 },
      ],
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  const certifications = [
    'Web Development Internship',
    'Digital Skills Readiness Program - Java Full Stack',
    'Data Analytics Virtual Internship - AWS & CTC',
    'Career Catalyst Bootcamp - Data Structures & Algorithms (Galgotias University)',
    'Full-Stack Development Internship - READYCODERS',
    'HackerRank - Problem Solving & Python',
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8" ref={ref} id="skills">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A comprehensive skill set spanning full-stack development, data science, and cutting-edge AI technologies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.1 * catIndex }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-slate-600 transition-all duration-300"
            >
              <h3 className={`text-2xl mb-6 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                {category.category}
              </h3>
              <div className="space-y-5">
                {category.skills.map((skill, index) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.1 * catIndex + 0.05 * index }}
                        className={`h-full bg-gradient-to-r ${category.gradient} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700"
        >
          <h3 className="text-3xl mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Certifications & Training
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.4, delay: 0.7 + 0.05 * index }}
                className="flex items-start gap-3 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-300">{cert}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
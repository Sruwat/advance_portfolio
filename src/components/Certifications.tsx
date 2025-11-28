import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Award, ExternalLink, Calendar, CheckCircle, X, Download } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  image: string;
  skills: string[];
  description: string;
  certificateFile?: string;
}

export function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  const certifications: Certification[] = [
    {
      id: 'web-dev-internship',
      title: 'Web Development Internship',
      issuer: 'Internship Program',
      date: 'Completed 2024',
      image: 'https://images.unsplash.com/photo-1715173679369-18006e84d6a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNlcnRpZmljYXRlfGVufDF8fHx8MTc2MzcxMzY1MXww&ixlib=rb-4.1.0&q=80&w=1080',
      skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
      description: 'Completed comprehensive web development internship covering frontend and backend technologies, including real-world project implementation.',
      certificateFile: '/upload/web dev .pdf',
    },
    {
      id: 'java-fullstack',
      title: 'Java Full Stack Development',
      issuer: 'Technical Training Program',
      date: 'Completed 2023',
      credentialId: 'JFS-2023-XXX',
      image: 'https://images.unsplash.com/photo-1568716353609-12ddc5c67f04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXZhJTIwcHJvZ3JhbW1pbmclMjBjZXJ0aWZpY2F0ZXxlbnwxfHx8fDE3NjM3MTM2NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      skills: ['Java', 'Spring Boot', 'Hibernate', 'MySQL', 'REST API'],
      description: 'Completed intensive Java Full Stack program covering Spring framework, Hibernate ORM, database management, and enterprise application development.',
      certificateFile: '/upload/java full stack.pdf',
    },
    {
      id: 'data-analytics-aws',
      title: 'Data Analytics with AWS',
      issuer: 'AWS Training & Certification',
      date: 'Completed 2024',
      credentialId: 'AWS-DA-2024-XXX',
      image: 'https://images.unsplash.com/photo-1608657803991-b62ca5de7a12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhd3MlMjBjbG91ZCUyMGNlcnRpZmljYXRpb258ZW58MXx8fHwxNzYzNjI1Njk2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      skills: ['AWS', 'Data Analytics', 'S3', 'Lambda', 'Redshift'],
      description: 'Gained expertise in AWS data analytics services including data lakes, big data processing, and cloud-based analytics solutions.',
      certificateFile: '/upload/data analytics .pdf',
    },
    {
      id: 'python-advanced',
      title: 'Python (Advanced)',
      issuer: 'Bootcamp Program',
      date: 'Earned 2024',
      credentialId: 'PY-ADV-2024-XXX',
      image: 'https://images.unsplash.com/photo-1598784159259-bf869aae0d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxweXRob24lMjBwcm9ncmFtbWluZyUyMGJhZGdlfGVufDF8fHx8MTc2MzcxMzY1NHww&ixlib=rb-4.1.0&q=80&w=1080',
      skills: ['Python', 'Advanced Python', 'Object-Oriented Programming', 'Functional Programming'],
      description: 'Achieved advanced Python certification demonstrating proficiency in Python programming, OOP concepts, and advanced language features.',
      certificateFile: '/upload/bootcamp data structure .jpg',
    },
    {
      id: 'ai-ml-foundations',
      title: 'AI & Machine Learning Foundations',
      issuer: 'Online Learning Platform',
      date: 'Completed 2024',
      credentialId: 'AI-ML-2024-XXX',
      image: 'https://images.unsplash.com/photo-1646583288948-24548aedffd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwY2VydGlmaWNhdGV8ZW58MXx8fHwxNzYzNzEzNjU0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      skills: ['Machine Learning', 'Deep Learning', 'Neural Networks', 'TensorFlow', 'Keras'],
      description: 'Completed comprehensive AI and ML course covering supervised/unsupervised learning, neural networks, and practical ML model development.',
      certificateFile: '/upload/ArtificialIntelligenceFundamentals.pdf',
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8" ref={ref} id="certifications">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Certifications & Achievements
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
            Professional certifications and achievements demonstrating expertise across various technologies
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 50, rotateX: -20 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -20 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700 group-hover:border-yellow-500/50 transition-all duration-300 h-full flex flex-col">
                {/* Certificate Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <motion.div
                    animate={{ rotate: [0, 10, 0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <CheckCircle className="w-7 h-7 text-white" />
                  </motion.div>
                </div>

                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                    {cert.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-gray-400 mb-3">
                    <Award className="w-4 h-4" />
                    <span className="text-sm">{cert.issuer}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-400 mb-4">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{cert.date}</span>
                  </div>

                  <p className="text-gray-400 text-sm mb-4 flex-1">
                    {cert.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-slate-700/50 rounded-full text-xs text-gray-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Credential ID & View Certificate Link */}
                  <div className="pt-4 border-t border-slate-700 space-y-2">
                    {cert.credentialId && (
                      <div className="text-xs text-gray-500">
                        ID: {cert.credentialId}
                      </div>
                    )}
                    {cert.certificateFile && (
                      <button
                        onClick={() => setSelectedCert(cert.id)}
                        className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors text-sm group/link"
                      >
                        <span>View Certificate</span>
                        <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievement Summary */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                {certifications.length}+
              </div>
              <div className="text-gray-400">Certifications</div>
            </div>
            <div>
              <div className="text-3xl mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                5+
              </div>
              <div className="text-gray-400">Platforms</div>
            </div>
            <div>
              <div className="text-3xl mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                20+
              </div>
              <div className="text-gray-400">Skills Validated</div>
            </div>
            <div>
              <div className="text-3xl mb-2 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                100%
              </div>
              <div className="text-gray-400">Completion Rate</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Certificate Modal */}
      {selectedCert && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-slate-900 rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto border border-slate-700"
          >
            <div className="sticky top-0 flex justify-between items-center p-6 border-b border-slate-700 bg-slate-900">
              <h3 className="text-2xl">Certificate</h3>
              <button
                onClick={() => setSelectedCert(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              {(() => {
                const cert = certifications.find(c => c.id === selectedCert);
                const fileUrl = cert?.certificateFile;
                const isPdf = fileUrl?.endsWith('.pdf');

                return (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xl mb-2">{cert?.title}</h4>
                      <p className="text-gray-400">{cert?.issuer} • {cert?.date}</p>
                    </div>
                    
                    {isPdf ? (
                      <iframe
                        src={`${fileUrl}#toolbar=1`}
                        className="w-full h-[60vh] border border-slate-700 rounded-lg"
                        title="Certificate PDF"
                      />
                    ) : (
                      <div className="bg-slate-800/50 rounded-lg overflow-hidden max-h-[60vh] flex items-center justify-center">
                        <img
                          src={fileUrl}
                          alt={cert?.title}
                          className="max-w-[900px] max-h-[60vh] object-contain"
                        />
                      </div>
                    )}

                    {fileUrl && (
                      <div className="flex gap-3 pt-4">
                        <a
                          href={fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/40 rounded-lg py-3 px-4 flex items-center justify-center gap-2 transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Open in New Tab
                        </a>
                        <a
                          href={fileUrl}
                          download
                          className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/40 rounded-lg py-3 px-4 flex items-center justify-center gap-2 transition-all"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </a>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
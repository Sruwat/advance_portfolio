import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Github, ExternalLink, Play, MessageSquare, Calendar, Users, Code } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { allProjects } from './projectsData';
import { useState } from 'react';

export function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const project = allProjects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        <div className="text-center">
          <h1 className="text-4xl mb-4">Project Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:shadow-lg transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const text = project.voiceDescription || `${project.title}. ${project.detailedDescription}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const projectImages: Record<string, string> = {
    'hrm software dashboard': 'https://images.unsplash.com/photo-1669023414162-5bb06bbff0ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxocm0lMjBzb2Z0d2FyZSUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NjM3MTE2NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'crm business software': 'https://images.unsplash.com/photo-1762939079730-23708c0dd337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm0lMjBidXNpbmVzcyUyMHNvZnR3YXJlfGVufDF8fHx8MTc2MzcxMTY0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    'erp enterprise system': 'https://images.unsplash.com/photo-1591833255191-c42cf1b749f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlcnAlMjBlbnRlcnByaXNlJTIwc3lzdGVtfGVufDF8fHx8MTc2MzcxMTY0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    'learning management platform': 'https://images.unsplash.com/photo-1762330916242-08b27b39e265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFybmluZyUyMG1hbmFnZW1lbnQlMjBwbGF0Zm9ybXxlbnwxfHx8fDE3NjM3MTE2NDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'face recognition technology': 'https://images.unsplash.com/photo-1639478411016-726027171e28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNlJTIwcmVjb2duaXRpb24lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2MzYxMjg3NXww&ixlib=rb-4.1.0&q=80&w=1080',
    'ecommerce online store': 'https://images.unsplash.com/photo-1688561808434-886a6dd97b8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBvbmxpbmUlMjBzdG9yZXxlbnwxfHx8fDE3NjM3MTE2NDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'clothing fashion store': 'https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG90aGluZyUyMGZhc2hpb24lMjBzdG9yZXxlbnwxfHx8fDE3NjM2NDM0NDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'electric vehicle rental': 'https://images.unsplash.com/photo-1663575438786-98c9ac96640e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMHZlaGljbGUlMjByZW50YWx8ZW58MXx8fHwxNzYzNzExNjQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'automation workflow system': 'https://images.unsplash.com/photo-1760952851538-17a59f691efe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbWF0aW9uJTIwd29ya2Zsb3clMjBzeXN0ZW18ZW58MXx8fHwxNzYzNzExNjQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'stock market trading': 'https://images.unsplash.com/photo-1666467831470-8f26f983391f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9jayUyMG1hcmtldCUyMHRyYWRpbmd8ZW58MXx8fHwxNzYzNjIxMjAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    'medical scan ai': 'https://images.unsplash.com/photo-1632587457041-820c163b5a4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc2NhbiUyMGFpfGVufDF8fHx8MTc2MzcxMjkwOHww&ixlib=rb-4.1.0&q=80&w=1080',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.15),transparent_50%)]" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 z-50"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Portfolio</span>
            </button>
            
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {project.deployedUrl && (
                <a
                  href={project.deployedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 py-12 pt-24">{/* Added pt-24 for top padding */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Category Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/50 rounded-full mb-6"
            >
              {project.category}
            </motion.div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {project.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-300 mb-8 max-w-4xl">
              {project.description}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-6 mb-8 text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                <span>{project.technologies.length} Technologies</span>
              </div>
              {project.category === 'Professional Work' && (
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>Team Project</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <button
                onClick={handleSpeak}
                className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 ${
                  isSpeaking
                    ? 'bg-gradient-to-r from-red-600 to-orange-600 hover:shadow-lg hover:shadow-red-500/50'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg hover:shadow-purple-500/50'
                }`}
              >
                <MessageSquare className={`w-5 h-5 ${isSpeaking ? 'animate-pulse' : ''}`} />
                <span>{isSpeaking ? 'Stop Voice' : 'Hear About Project'}</span>
              </button>
              
              {project.videoUrl && (
                <a
                  href={project.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-slate-800 rounded-full hover:bg-slate-700 transition-all flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </a>
              )}
            </div>

            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative rounded-2xl overflow-hidden mb-12 group"
            >
              <ImageWithFallback
                src={projectImages[project.image] || project.image}
                alt={project.title}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            </motion.div>
          </motion.div>

          {/* Detailed Description */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
          >
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
                <h2 className="text-3xl mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                  Project Overview
                </h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {project.detailedDescription}
                </p>
              </div>

              {/* Highlights */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
                <h2 className="text-3xl mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                  Key Highlights
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.highlights.map((highlight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-start gap-3 p-4 bg-slate-700/30 rounded-xl"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-300">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Technologies */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 sticky top-24">
                <h3 className="text-xl mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <motion.span
                      key={tech}
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full text-sm"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Links */}
                <div className="mt-8 space-y-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <Github className="w-5 h-5" />
                        <span>View Code</span>
                      </div>
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  )}
                  
                  {project.deployedUrl && (
                    <a
                      href={project.deployedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-blue-600/20 border border-blue-500/30 rounded-lg hover:bg-blue-600/30 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <ExternalLink className="w-5 h-5" />
                        <span>Live Demo</span>
                      </div>
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
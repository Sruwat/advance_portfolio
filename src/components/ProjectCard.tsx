import { motion } from 'motion/react';
import { useState } from 'react';
import { Github, ExternalLink, Video, Volume2, X, ChevronRight } from 'lucide-react';
import { Project } from './projectsData';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProjectCardProps {
  project: Project;
  index: number;
  isInView: boolean;
  onClick?: () => void;
}

export function ProjectCard({ project, index, isInView, onClick }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const projectImages: Record<string, string> = {
    'ai assistant voice': 'https://images.unsplash.com/photo-1761311984112-ce2c5db45984?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaSUyMGFzc2lzdGFudCUyMHZvaWNlfGVufDF8fHx8MTc2MzcwODM3OXww&ixlib=rb-4.1.0&q=80&w=1080',
    'healthcare medical app': 'https://images.unsplash.com/photo-1747224317356-6dd1a4a078fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwbWVkaWNhbCUyMGFwcHxlbnwxfHx8fDE3NjM2MTM1NTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'ayurveda spa wellness': 'https://images.unsplash.com/photo-1694442888225-1f573441501c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxheXVydmVkYSUyMHNwYSUyMHdlbGxuZXNzfGVufDF8fHx8MTc2MzcwODM4MHww&ixlib=rb-4.1.0&q=80&w=1080',
    'data analytics sentiment': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwc2VudGltZW50fGVufDF8fHx8MTc2MzcwODM4MHww&ixlib=rb-4.1.0&q=80&w=1080',
    'chatbot ai assistant': 'https://images.unsplash.com/photo-1757310998437-b2e8a7bd2e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0Ym90JTIwYWklMjBhc3Npc3RhbnR8ZW58MXx8fHwxNjM3MDgzODF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'artificial intelligence network': 'https://images.unsplash.com/photo-1674027444485-cec3da58eef4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwbmV0d29ya3xlbnwxfHx8fDE3NjM2NTUxNjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
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

  const handleSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Use the custom voice description with proper pauses
    const text = project.voiceDescription || `${project.title}. ${project.detailedDescription}. Key highlights: ${project.highlights.join('. ')}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85; // Slower for more natural speech
    utterance.pitch = 1;
    utterance.volume = 1;
    
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, delay: 0.1 * index }}
        className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700 hover:border-slate-600 transition-all duration-300"
      >
        {/* Project Image */}
        <div className="relative h-64 overflow-hidden">
          <ImageWithFallback
            src={projectImages[project.image]}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-4 right-4 px-3 py-1 bg-purple-600/90 backdrop-blur-sm rounded-full text-sm">
            {project.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-2xl mb-3 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            {project.title}
          </h3>
          <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-gray-300"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-gray-300">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-all duration-300 text-sm"
            >
              <Github className="w-4 h-4" />
              Code
            </a>
            <a
              href={project.deployedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-all duration-300 text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              Live
            </a>
            <button
              onClick={handleSpeak}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 text-sm ${
                isSpeaking
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-700/50 hover:bg-slate-700'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              {isSpeaking ? 'Stop' : 'Listen'}
            </button>
            <button
              onClick={() => setIsExpanded(true)}
              className="ml-auto flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 text-sm"
            >
              Details
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Expanded Modal */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsExpanded(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700"
          >
            {/* Header */}
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 p-6 flex items-start justify-between z-10">
              <div>
                <h2 className="text-3xl mb-2 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                  {project.title}
                </h2>
                <span className="px-3 py-1 bg-purple-600/20 border border-purple-600/50 rounded-full text-sm">
                  {project.category}
                </span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-all duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Image */}
              <div className="relative h-80 rounded-xl overflow-hidden mb-6">
                <ImageWithFallback
                  src={projectImages[project.image]}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl mb-3 text-purple-400">Project Overview</h3>
                <p className="text-gray-300 leading-relaxed">{project.detailedDescription}</p>
              </div>

              {/* Highlights */}
              <div className="mb-6">
                <h3 className="text-xl mb-3 text-purple-400">Key Highlights</h3>
                <div className="space-y-2">
                  {project.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-300">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <h3 className="text-xl mb-3 text-purple-400">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Video */}
              {project.videoUrl && (
                <div className="mb-6">
                  <h3 className="text-xl mb-3 text-purple-400">Project Demo</h3>
                  <div className="aspect-video bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700">
                    <a
                      href={project.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                    >
                      <Video className="w-5 h-5" />
                      Watch Demo Video
                    </a>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-slate-800">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                  View on GitHub
                </a>
                <a
                  href={project.deployedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-all duration-300"
                >
                  <ExternalLink className="w-5 h-5" />
                  View Live Project
                </a>
                <button
                  onClick={handleSpeak}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                    isSpeaking
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-800 hover:bg-slate-700'
                  }`}
                >
                  <Volume2 className="w-5 h-5" />
                  {isSpeaking ? 'Stop Voice Explanation' : 'Voice Explanation'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
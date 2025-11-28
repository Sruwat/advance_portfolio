import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { allProjects, categories, personalSubcategories } from './projectsData';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All Projects');
  const [selectedPersonalSubcategory, setSelectedPersonalSubcategory] = useState('All Personal');

  const getFilteredProjects = () => {
    let filtered = allProjects;

    // First filter by main category
    if (selectedCategory !== 'All Projects') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Then filter by subcategory if Personal Projects is selected
    if (selectedCategory === 'Personal Projects' && selectedPersonalSubcategory !== 'All Personal') {
      filtered = filtered.filter(p => p.subcategory === selectedPersonalSubcategory);
    }

    return filtered;
  };

  const filteredProjects = getFilteredProjects();

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
    'travel planning app': 'https://images.unsplash.com/photo-1761292636032-eaf5a7d930bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBwbGFubmluZyUyMGFwcHxlbnwxfHx8fDE3NjM3OTU2MjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'voice assistant ai': 'https://images.unsplash.com/photo-1761311984112-ce2c5db45984?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2ljZSUyMGFzc2lzdGFudCUyMGFpfGVufDF8fHx8MTc2Mzc5NTYyMHww&ixlib=rb-4.1.0&q=80&w=1080',
    'online bookstore': 'https://images.unsplash.com/photo-1729011039713-411f04ae520b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBib29rc3RvcmV8ZW58MXx8fHwxNzYzNzk1NjIwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    'marketplace vendor platform': 'https://images.unsplash.com/photo-1579442787120-cd468e412eaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRwbGFjZSUyMHZlbmRvciUyMHBsYXRmb3JtfGVufDF8fHx8MTc2Mzc5NTYyMXww&ixlib=rb-4.1.0&q=80&w=1080',
    'ayurvedic medicine store': 'https://images.unsplash.com/photo-1652295372392-3171ab2c0e01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxheXVydmVkaWMlMjBtZWRpY2luZSUyMHN0b3JlfGVufDF8fHx8MTc2Mzc5NTYyMXww&ixlib=rb-4.1.0&q=80&w=1080',
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8" ref={ref} id="projects">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Explore my portfolio of business solutions, professional work, and innovative AI projects
          </p>
          <p className="text-sm text-purple-400 mt-2">
            Total Projects: {allProjects.length} | Showing: {filteredProjects.length}
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  if (category !== 'Personal Projects') {
                    setSelectedPersonalSubcategory('All Personal');
                  }
                }}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300 text-sm sm:text-base ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-purple-500/50'
                    : 'bg-slate-800 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Personal Projects Subcategory Filters */}
          {selectedCategory === 'Personal Projects' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex flex-wrap justify-center gap-2 sm:gap-3"
            >
              {personalSubcategories.map((subcategory) => (
                <button
                  key={subcategory}
                  onClick={() => setSelectedPersonalSubcategory(subcategory)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 text-xs sm:text-sm ${
                    selectedPersonalSubcategory === subcategory
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-pink-500/50'
                      : 'bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50'
                  }`}
                >
                  {subcategory}
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer"
              onClick={() => navigate(`/project/${project.id}`)}
            >
              {/* Project Image */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <ImageWithFallback
                  src={projectImages[project.image] || project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                
                {/* View Project Badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-slate-900/80 backdrop-blur-sm rounded-full flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">View Details</span>
                </div>

                {/* Category Badge */}
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-gradient-to-r from-blue-600/80 to-purple-600/80 backdrop-blur-sm rounded-full text-xs sm:text-sm">
                  {project.subcategory || project.category}
                </div>
              </div>

              {/* Project Info */}
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl mb-2 sm:mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-400 mb-4 line-clamp-3">{project.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 sm:px-3 py-1 bg-slate-700/50 rounded-full text-xs text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 sm:px-3 py-1 bg-slate-700/50 rounded-full text-xs text-gray-300">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 bg-slate-700/50 rounded-lg hover:bg-slate-600/50 transition-colors"
                    >
                      <Github className="w-4 sm:w-5 h-4 sm:h-5" />
                    </a>
                  )}
                  {project.deployedUrl && (
                    <a
                      href={project.deployedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 bg-blue-600/50 rounded-lg hover:bg-blue-500/50 transition-colors"
                    >
                      <ExternalLink className="w-4 sm:w-5 h-4 sm:h-5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Projects Message */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl text-gray-400">No projects found in this category.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
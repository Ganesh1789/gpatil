import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code } from 'lucide-react';

export const Projects = ({ projects }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  // Extract unique categories dynamically
  const categories = ['All', ...new Set(projects?.map(proj => proj.category) || [])];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects?.filter(proj => proj.category === activeCategory) || [];

  return (
    <section id="projects" className="py-24 px-4 md:px-8 max-w-6xl mx-auto relative">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4"
        >
          My Projects
        </motion.h2>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: '80px' }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-1 bg-gradient-to-r from-brand-indigo to-brand-violet mx-auto rounded-full mb-10"
        ></motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-brand-indigo to-brand-violet text-white shadow-md shadow-brand-indigo/15'
                  : 'bg-white/5 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid with layout animation */}
      <motion.div 
        layout 
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects && filteredProjects.map((proj) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={proj._id || proj.title}
              whileHover={{ y: -6 }}
              className="glass-panel p-6 md:p-8 rounded-3xl flex flex-col justify-between h-full hover:shadow-lg transition-all duration-300 relative group overflow-hidden"
            >
              <div>
                {/* Top: Category and Links */}
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3.5 py-1.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-brand-indigo/10 text-brand-indigo dark:bg-brand-violet/10 dark:text-brand-violet">
                    {proj.category}
                  </span>
                  
                  <div className="flex items-center space-x-3 text-slate-500 dark:text-slate-400">
                    {proj.githubUrl && (
                      <a 
                        href={proj.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-slate-800 dark:hover:text-white transition-colors flex items-center justify-center"
                        title="View GitHub Repository"
                      >
                        <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                        </svg>
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a 
                        href={proj.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-slate-800 dark:hover:text-white transition-colors"
                        title="View Live Site"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Title and Description */}
                <h3 className="text-xl md:text-2xl font-bold mb-3 dark:text-white text-slate-800 flex items-center gap-2">
                  <Code size={20} className="text-brand-indigo dark:text-brand-violet" />
                  {proj.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed mb-6">
                  {proj.description}
                </p>

                {/* Project details points */}
                <ul className="list-disc pl-5 mb-6 text-xs text-slate-500 dark:text-slate-400 space-y-1.5 leading-relaxed">
                  {proj.points && proj.points.slice(0, 3).map((pt, idx) => (
                    <li key={idx}>{pt}</li>
                  ))}
                </ul>
              </div>

              {/* Technologies Pills */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200 dark:border-slate-800 mt-auto">
                {proj.technologies && proj.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-slate-100 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
export default Projects;


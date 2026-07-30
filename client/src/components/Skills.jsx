import React from 'react';
import { motion } from 'framer-motion';
import { Laptop, Layers, Database } from 'lucide-react';

// ── Per-skill color & proficiency map ──────────────────────
const skillMeta = {
  // Programming
  'Java':         { color: 'text-orange-500 border-orange-200 dark:border-orange-900/50 bg-orange-50 dark:bg-orange-500/5',  level: 'advanced' },
  'C':            { color: 'text-slate-500  border-slate-200  dark:border-slate-700     bg-slate-50  dark:bg-slate-500/5',   level: 'intermediate' },
  'SQL':          { color: 'text-blue-500   border-blue-200   dark:border-blue-900/50   bg-blue-50   dark:bg-blue-500/5',    level: 'advanced' },
  'JavaScript':   { color: 'text-yellow-600 border-yellow-200 dark:border-yellow-900/50 bg-yellow-50 dark:bg-yellow-500/5',  level: 'advanced' },
  'DSA':          { color: 'text-rose-500   border-rose-200   dark:border-rose-900/50   bg-rose-50   dark:bg-rose-500/5',    level: 'advanced' },
  // Web & App
  'React.js':     { color: 'text-sky-500    border-sky-200    dark:border-sky-900/50    bg-sky-50    dark:bg-sky-500/5',     level: 'advanced' },
  'Node.js':      { color: 'text-emerald-600 border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-500/5', level: 'advanced' },
  'Express.js':   { color: 'text-slate-600  border-slate-200  dark:border-slate-700     bg-slate-50  dark:bg-slate-500/5',  level: 'advanced' },
  'Spring Boot':  { color: 'text-lime-600   border-lime-200   dark:border-lime-900/50   bg-lime-50   dark:bg-lime-500/5',   level: 'advanced' },
  'REST API':     { color: 'text-violet-500 border-violet-200 dark:border-violet-900/50 bg-violet-50 dark:bg-violet-500/5', level: 'intermediate' },
  'Tailwind CSS': { color: 'text-cyan-500   border-cyan-200   dark:border-cyan-900/50   bg-cyan-50   dark:bg-cyan-500/5',   level: 'intermediate' },
  'GSAP':         { color: 'text-green-600  border-green-200  dark:border-green-900/50  bg-green-50  dark:bg-green-500/5',  level: 'learning' },
  // Databases
  'MySQL':        { color: 'text-blue-600   border-blue-200   dark:border-blue-900/50   bg-blue-50   dark:bg-blue-500/5',   level: 'advanced' },
  'MongoDB':      { color: 'text-green-500  border-green-200  dark:border-green-900/50  bg-green-50  dark:bg-green-500/5',  level: 'advanced' },
  'JDBC':         { color: 'text-slate-500  border-slate-200  dark:border-slate-700     bg-slate-50  dark:bg-slate-500/5',  level: 'intermediate' },
  'OOP':          { color: 'text-indigo-500 border-indigo-200 dark:border-indigo-900/50 bg-indigo-50 dark:bg-indigo-500/5', level: 'advanced' },
  'Git':          { color: 'text-amber-600  border-amber-200  dark:border-amber-900/50  bg-amber-50  dark:bg-amber-500/5',  level: 'advanced' },
  'Agile/Scrum':  { color: 'text-purple-500 border-purple-200 dark:border-purple-900/50 bg-purple-50 dark:bg-purple-500/5', level: 'intermediate' },
};

const levelDot = {
  advanced:     'bg-brand-indigo',
  intermediate: 'bg-brand-violet',
  learning:     'bg-slate-400',
};
const levelLabel = {
  advanced:     'Expert',
  intermediate: 'Proficient',
  learning:     'Learning',
};

const categoryConfig = {
  'Programming & Querying': {
    icon: Laptop,
    gradient: 'from-indigo-500 to-violet-500',
    glow:     'shadow-indigo-500/15',
  },
  'Web & App Technologies': {
    icon: Layers,
    gradient: 'from-violet-500 to-pink-500',
    glow:     'shadow-violet-500/15',
  },
  'Databases & Core Concepts': {
    icon: Database,
    gradient: 'from-sky-500 to-indigo-500',
    glow:     'shadow-sky-500/15',
  },
};

const defaultMeta = { color: 'text-slate-500 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-500/5', level: 'intermediate' };

const containerVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 12 } },
};

export const Skills = ({ skills }) => {
  return (
    <section id="skills" className="py-24 px-4 md:px-8 max-w-6xl mx-auto relative">
      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-tag text-brand-indigo dark:text-brand-violet mb-3"
        >
          02 — Technical Arsenal
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4"
        >
          My Skills
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '80px' }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-1 bg-gradient-to-r from-brand-indigo to-brand-violet mx-auto rounded-full"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {skills && skills.map((cat) => {
          const cfg = categoryConfig[cat.category] || { icon: Laptop, gradient: 'from-indigo-500 to-violet-500', glow: '' };
          const Icon = cfg.icon;
          return (
            <motion.div
              key={cat._id || cat.category}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className={`glass-panel p-8 rounded-3xl flex flex-col hover:shadow-xl ${cfg.glow} transition-all duration-300 relative overflow-hidden`}
            >
              {/* Decorative top gradient line */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cfg.gradient} rounded-t-3xl`} />

              {/* Category Header */}
              <div className="flex items-center justify-between gap-3 mb-6 mt-1">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${cfg.gradient} shadow-md`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <h3 className="text-base font-bold dark:text-white text-slate-800 leading-tight">
                    {cat.category}
                  </h3>
                </div>
                {/* Skill count badge */}
                <span className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br ${cfg.gradient} text-white text-xs font-bold flex items-center justify-center shadow`}>
                  {cat.items.length}
                </span>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 mb-4 flex-wrap">
                {['advanced', 'intermediate', 'learning'].map(lv => (
                  <span key={lv} className="flex items-center gap-1 text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                    <span className={`w-1.5 h-1.5 rounded-full ${levelDot[lv]}`} />
                    {levelLabel[lv]}
                  </span>
                ))}
              </div>

              {/* Skills Pills */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {cat.items.map((skill, idx) => {
                  const meta = skillMeta[skill] || defaultMeta;
                  return (
                    <motion.span
                      key={idx}
                      whileHover={{ scale: 1.06 }}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full border ${meta.color} cursor-default transition-all`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${levelDot[meta.level]}`} />
                      {skill}
                    </motion.span>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};
export default Skills;

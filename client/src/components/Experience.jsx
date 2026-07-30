import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

const typeConfig = {
  'Internship': { label: 'Internship', color: 'text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-500/10 border-violet-200 dark:border-violet-500/20' },
  'Full-time':  { label: 'Full-Time',  color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20' },
  'Contract':   { label: 'Contract',   color: 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20' },
};

export const Experience = ({ experiences }) => {
  return (
    <section id="experience" className="py-24 px-4 md:px-8 max-w-4xl mx-auto relative">
      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-tag text-brand-indigo dark:text-brand-violet mb-3"
        >
          04 — Career Journey
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4"
        >
          Work Experience
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '80px' }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-1 bg-gradient-to-r from-brand-indigo to-brand-violet mx-auto rounded-full"
        />
      </div>

      <div className="relative ml-4 md:ml-8 pl-6 md:pl-10 space-y-12">
        {/* Animated vertical timeline line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          style={{ originY: 0 }}
          className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-indigo via-brand-violet to-transparent"
        />

        {experiences && experiences.map((exp, idx) => {
          const typeCfg = typeConfig[exp.type] || typeConfig['Internship'];
          return (
            <motion.div
              key={exp._id || idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="relative"
            >
              {/* Glowing timeline dot */}
              <span className="absolute -left-[35px] md:-left-[51px] top-5 flex h-7 w-7 items-center justify-center rounded-full bg-white dark:bg-slate-950 border-2 border-brand-indigo shadow-[0_0_12px_rgba(99,102,241,0.5)]">
                <Briefcase size={12} className="text-brand-indigo" />
              </span>

              {/* Card */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="glass-panel p-6 md:p-8 rounded-3xl hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                {/* Subtle left accent bar */}
                <div className="absolute left-0 top-6 bottom-6 w-1 bg-gradient-to-b from-brand-indigo to-brand-violet rounded-full" />

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-5">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <h3 className="text-xl font-bold dark:text-white text-slate-800">
                        {exp.role}
                      </h3>
                      {/* Employment type badge */}
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${typeCfg.color}`}>
                        {typeCfg.label}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-brand-indigo dark:text-brand-violet">
                      {exp.company}
                    </p>
                  </div>

                  {/* Meta: date & location */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs font-semibold text-slate-400 dark:text-slate-500 flex-shrink-0">
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/60">
                      <Calendar size={12} className="text-brand-indigo" />
                      {exp.duration}
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/60">
                      <MapPin size={12} className="text-brand-violet" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Accomplishment points with checkmark icons */}
                <ul className="space-y-2.5">
                  {exp.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      <CheckCircle2 size={16} className="text-brand-indigo dark:text-brand-violet mt-0.5 flex-shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
export default Experience;

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';

// Map institution shortnames to abbreviation + gradient
const institutionMeta = {
  'Sardar Patel Institute of Technology': { abbr: 'SPIT', gradient: 'from-indigo-500 to-violet-500' },
  'D.G. Ruparel College':                 { abbr: 'DGR',  gradient: 'from-violet-500 to-pink-500'   },
  'University of Mumbai':                 { abbr: 'MU',   gradient: 'from-sky-500 to-indigo-500'    },
};

function getInstMeta(institution) {
  for (const key of Object.keys(institutionMeta)) {
    if (institution && institution.includes(key.split(' ')[0])) {
      return institutionMeta[key];
    }
  }
  // Fallback: first letters of each word
  const abbr = institution
    ? institution.split(' ').map(w => w[0]).join('').slice(0, 4).toUpperCase()
    : 'UNI';
  return { abbr, gradient: 'from-indigo-500 to-violet-500' };
}

export const Education = ({ education }) => {
  return (
    <section id="education" className="py-24 px-4 md:px-8 max-w-4xl mx-auto relative">
      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-tag text-brand-indigo dark:text-brand-violet mb-3"
        >
          05 — Academic Background
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4"
        >
          Education Path
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
          className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-violet via-brand-indigo to-transparent"
        />

        {education && education.map((edu, idx) => {
          const meta = getInstMeta(edu.institution);
          return (
            <motion.div
              key={edu._id || idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="relative"
            >
              {/* Glowing timeline dot */}
              <span className="absolute -left-[35px] md:-left-[51px] top-5 flex h-7 w-7 items-center justify-center rounded-full bg-white dark:bg-slate-950 border-2 border-brand-violet shadow-[0_0_12px_rgba(139,92,246,0.5)]">
                <GraduationCap size={12} className="text-brand-violet" />
              </span>

              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="glass-panel p-6 md:p-8 rounded-3xl hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                {/* Left accent bar */}
                <div className="absolute left-0 top-6 bottom-6 w-1 bg-gradient-to-b from-brand-violet to-brand-indigo rounded-full" />

                <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                  {/* University abbreviation badge */}
                  <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${meta.gradient} flex items-center justify-center shadow-lg`}>
                    <span className="text-sm font-extrabold text-white tracking-wide">{meta.abbr}</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-4">
                      <div>
                        <h3 className="text-xl font-bold dark:text-white text-slate-800 mb-1">
                          {edu.degree}
                        </h3>
                        <p className="text-sm font-bold text-brand-violet dark:text-brand-violet/90">
                          {edu.institution}
                        </p>
                      </div>

                      {/* Meta pills */}
                      <div className="flex flex-col gap-2 text-xs font-semibold text-slate-400 dark:text-slate-500">
                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/60">
                          <Calendar size={12} className="text-brand-violet" />
                          {edu.duration}
                        </span>
                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/60">
                          <MapPin size={12} className="text-brand-indigo" />
                          {edu.location}
                        </span>
                      </div>
                    </div>

                    {/* CGPA / Percentage if available */}
                    {edu.cgpa && (
                      <div className="flex items-center gap-2 mt-3">
                        <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-brand-indigo/10 to-brand-violet/10 border border-brand-indigo/20 dark:border-brand-violet/20">
                          <Award size={14} className="text-brand-indigo dark:text-brand-violet" />
                          <span className="text-xs font-bold text-brand-indigo dark:text-brand-violet">
                            CGPA: {edu.cgpa}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Description / coursework if available */}
                    {edu.description && (
                      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        {edu.description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
export default Education;

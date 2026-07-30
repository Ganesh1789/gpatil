import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, BookOpen, Code2, Cpu, Layers, TrendingUp } from 'lucide-react';

const infoItems = [
  { icon: MapPin,     color: 'text-rose-400',    label: 'Location',   value: 'Mumbai, India'               },
  { icon: Mail,       color: 'text-brand-indigo', label: 'Email',      value: 'patilganesh1406@gmail.com'   },
  { icon: Phone,      color: 'text-emerald-400', label: 'Phone',      value: '+91-9326180781'               },
  { icon: BookOpen,   color: 'text-amber-400',   label: 'Education',  value: 'MCA Candidate — SPIT'         },
];

const stats = [
  { number: '1.5+', label: 'Years Experience', icon: TrendingUp, color: 'from-indigo-500 to-violet-500' },
  { number: '10+',  label: 'Projects Built',   icon: Code2,      color: 'from-violet-500 to-pink-500'   },
  { number: '300+', label: 'DSA Solutions',    icon: Cpu,        color: 'from-sky-500 to-indigo-500'    },
  { number: '2',    label: 'Tech Stacks',      icon: Layers,     color: 'from-emerald-500 to-cyan-500'  },
];

export const About = () => {
  return (
    <section id="about" className="py-24 px-4 md:px-8 max-w-6xl mx-auto relative overflow-hidden">
      {/* Section heading */}
      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-tag text-brand-indigo dark:text-brand-violet mb-3"
        >
          01 — Who I Am
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4"
        >
          About Me
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '80px' }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-1 bg-gradient-to-r from-brand-indigo to-brand-violet mx-auto rounded-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        {/* ── Left: Bio + Contact Info ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-7 flex flex-col gap-6"
        >
          {/* Avatar + bio card */}
          <div className="glass-panel p-8 rounded-3xl gradient-border flex-1">
            <div className="flex items-start gap-5 mb-6">
              {/* Styled initials avatar */}
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-indigo to-brand-violet flex items-center justify-center shadow-lg shadow-brand-indigo/25">
                <span className="text-2xl font-extrabold text-white select-none">GP</span>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-0.5 flex items-center gap-2">
                  Ganesh Sudhir Patil
                </h3>
                <p className="text-sm font-semibold text-brand-indigo dark:text-brand-violet">
                  Full-Stack Developer · MERN & Spring Boot
                </p>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              I'm a motivated software developer with hands-on experience in full-stack web development,
              enterprise applications, and production map data systems. I enjoy building robust applications
              that solve real-world problems with scalable architecture.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              My technical expertise spans <strong className="text-slate-800 dark:text-slate-200 font-semibold">React.js, Node.js, Spring Boot, REST APIs</strong>,
              and databases (<strong className="text-slate-800 dark:text-slate-200 font-semibold">MySQL & MongoDB</strong>).
              I believe in clean code, strict modularity, and agile methodologies.
            </p>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
              {infoItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-center gap-3 group">
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 group-hover:bg-brand-indigo/10 dark:group-hover:bg-brand-violet/10 transition-colors">
                      <Icon size={18} className={item.color} />
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">
                        {item.label}
                      </span>
                      <span className="text-sm font-semibold dark:text-slate-200 text-slate-700 break-all">
                        {item.value}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* GitHub quick link */}
          <div className="glass-panel p-5 rounded-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="p-3 bg-slate-100 dark:bg-slate-800/60 rounded-xl">
                <svg className="w-6 h-6 fill-current text-slate-700 dark:text-slate-300" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-sm dark:text-white text-slate-800">Ganesh1789</h4>
                <p className="text-xs text-slate-400 dark:text-slate-500">Active open source contributor</p>
              </div>
            </div>
            <a
              href="https://github.com/Ganesh1789"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 px-5 py-2.5 text-xs font-bold rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-80 transition-opacity"
            >
              View Profile →
            </a>
          </div>
        </motion.div>

        {/* ── Right: Stats Grid ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="md:col-span-5 grid grid-cols-2 gap-4 content-start"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="glass-panel p-6 rounded-3xl flex flex-col items-center text-center cursor-default relative overflow-hidden"
              >
                {/* Subtle gradient blob */}
                <div className={`absolute -top-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br ${stat.color} opacity-10 blur-xl`} />
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color} mb-4 shadow-md`}>
                  <Icon size={20} className="text-white" />
                </div>
                <span className={`text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br ${stat.color} mb-1.5`}>
                  {stat.number}
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 leading-tight">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
export default About;

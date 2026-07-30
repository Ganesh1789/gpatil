import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, Mail } from 'lucide-react';

// ── Rotating role titles ─────────────────────────────────
const roles = [
  'Full-Stack Developer',
  'MERN Stack Engineer',
  'Spring Boot Expert',
  'Problem Solver',
  'DSA Enthusiast',
];

// ── Tech badge ticker data ───────────────────────────────
const techBadges = [
  { label: 'React.js',   color: 'text-sky-400',     bg: 'bg-sky-400/10'     },
  { label: 'Node.js',    color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  { label: 'MongoDB',    color: 'text-green-400',   bg: 'bg-green-400/10'   },
  { label: 'Spring Boot',color: 'text-lime-400',    bg: 'bg-lime-400/10'    },
  { label: 'Express.js', color: 'text-slate-400',   bg: 'bg-slate-400/10'   },
  { label: 'Java',       color: 'text-orange-400',  bg: 'bg-orange-400/10'  },
  { label: 'MySQL',      color: 'text-blue-400',    bg: 'bg-blue-400/10'    },
  { label: 'REST APIs',  color: 'text-violet-400',  bg: 'bg-violet-400/10'  },
  { label: 'DSA',        color: 'text-rose-400',    bg: 'bg-rose-400/10'    },
  { label: 'Git',        color: 'text-amber-400',   bg: 'bg-amber-400/10'   },
];

const TickerBadge = ({ label, color, bg }) => (
  <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold ${bg} ${color} border border-current/20 whitespace-nowrap mx-2`}>
    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70 inline-block"></span>
    {label}
  </span>
);

const containerVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.13 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 16 } },
};

export const Hero = () => {
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIdx(i => (i + 1) % roles.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
    }
  };

  const allBadges = [...techBadges, ...techBadges];

  return (
    <section
      id="home"
      className="relative min-h-[96vh] flex flex-col items-center justify-center overflow-hidden pt-20 pb-10 px-4 md:px-8"
    >
      {/* Background glow blobs */}
      <div className="radial-mesh radial-mesh-primary -top-32 -left-32 animate-pulse-slow" />
      <div className="radial-mesh radial-mesh-secondary -bottom-32 -right-32 animate-pulse-slow" />

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* ── Available badge with pulsing green dot ── */}
          <motion.div
            variants={itemVariants}
            className="mb-8 flex items-center gap-2.5 px-5 py-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/5 backdrop-blur-md"
          >
            <span className="pulse-dot" />
            <span className="text-xs font-semibold tracking-widest text-slate-500 dark:text-slate-400 uppercase">
              Available for Opportunities
            </span>
          </motion.div>

          {/* ── Main name heading ── */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight mb-5 leading-none"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            Hi, I'm{' '}
            <span className="animated-gradient-text">Ganesh</span>
            <br />
            <span className="dark:text-white text-slate-900">Patil</span>
          </motion.h1>

          {/* ── Animated rotating role ── */}
          <motion.div
            variants={itemVariants}
            className="h-10 flex items-center justify-center mb-6 overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="text-xl sm:text-2xl font-semibold text-brand-indigo dark:text-brand-violet"
              >
                {roles[roleIdx]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* ── Short bio ── */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg font-medium text-slate-500 dark:text-slate-400 max-w-xl mb-10 leading-relaxed"
          >
            Building robust, scalable web apps with clean modular architecture.
            Passionate about elegant code and real-world impact.
          </motion.p>

          {/* ── Social quick links ── */}
          <motion.div
            variants={itemVariants}
            className="flex items-center space-x-3 mb-10"
          >
            <a
              href="https://github.com/Ganesh1789"
              target="_blank" rel="noopener noreferrer"
              className="p-3 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:border-brand-indigo/40 transition-all text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center hover:scale-105"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank" rel="noopener noreferrer"
              className="p-3 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:border-brand-violet/40 transition-all text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center hover:scale-105"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </a>
            <a
              href="mailto:patilganesh1406@gmail.com"
              className="p-3 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:border-brand-indigo/40 transition-all text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center hover:scale-105"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </motion.div>

          {/* ── CTA Buttons ── */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={() => handleScrollTo('projects')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-indigo to-brand-violet text-white rounded-full font-bold shadow-lg shadow-brand-indigo/30 hover:shadow-brand-indigo/50 hover:-translate-y-1 hover:opacity-95 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
            >
              View My Work
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Ganesh_Patil_Resume.pdf"
              className="w-full sm:w-auto px-8 py-4 border border-slate-200 dark:border-slate-700 hover:border-brand-indigo/50 dark:hover:border-brand-violet/50 hover:bg-slate-50 dark:hover:bg-slate-800/60 dark:text-white text-slate-800 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-1"
            >
              Download CV
              <Download size={18} />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scrolling Tech Badge Ticker ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="relative z-10 w-full max-w-5xl mx-auto mt-16"
      >
        <div className="ticker-wrap py-3">
          <div className="ticker-track">
            {allBadges.map((b, i) => (
              <TickerBadge key={i} {...b} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Scroll guide ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block z-10">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-slate-300 dark:border-slate-700 flex justify-center pt-2 cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
          onClick={() => handleScrollTo('about')}
        >
          <div className="w-1.5 h-3 rounded-full bg-slate-400 dark:bg-slate-500" />
        </motion.div>
      </div>
    </section>
  );
};
export default Hero;

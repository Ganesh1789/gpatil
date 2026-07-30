import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { Menu, X, Sun, Moon, Lock } from 'lucide-react';

const navLinks = [
  { id: 'home',       label: 'Home'       },
  { id: 'about',      label: 'About'      },
  { id: 'skills',     label: 'Skills'     },
  { id: 'projects',   label: 'Projects'   },
  { id: 'experience', label: 'Experience' },
  { id: 'education',  label: 'Education'  },
  { id: 'contact',    label: 'Contact'    },
];

export const Navbar = ({ onAdminClick, isAdminView }) => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useScrollSpy(navLinks.map(l => l.id), 120);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleScroll = (id) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 pt-4">
      <div className={`max-w-6xl mx-auto glass-panel px-5 py-2.5 rounded-2xl flex items-center justify-between transition-all duration-500 ${scrolled ? 'shadow-xl shadow-black/10' : ''}`}>
        {/* Brand */}
        <motion.div
          onClick={() => handleScroll('home')}
          whileHover={{ scale: 1.04 }}
          className="text-lg font-extrabold tracking-tight cursor-pointer select-none flex items-center gap-0.5"
          style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
        >
          <span className="animated-gradient-text">GP</span>
          <span className="mx-1.5 w-px h-4 bg-slate-300 dark:bg-slate-700 inline-block" />
          <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Portfolio</span>
        </motion.div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id && !isAdminView;
            return (
              <button
                key={link.id}
                onClick={() => handleScroll(link.id)}
                className="relative px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors duration-200 group"
              >
                <span className={isActive
                  ? 'text-brand-indigo dark:text-brand-violet'
                  : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'
                }>
                  {link.label}
                </span>
                {/* Active underline dot */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-dot"
                    className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-indigo dark:bg-brand-violet"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-all hover:scale-105"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
              </motion.div>
            </AnimatePresence>
          </button>

          <button
            onClick={onAdminClick}
            className={`p-2.5 rounded-xl border transition-all hover:scale-105 ${
              isAdminView
                ? 'bg-brand-indigo text-white border-brand-indigo shadow-md shadow-brand-indigo/25'
                : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400'
            }`}
            title="Admin Console"
          >
            <Lock size={17} />
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 md:hidden rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {isOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 p-4 rounded-2xl glass-panel max-w-6xl mx-auto flex flex-col space-y-1"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id && !isAdminView;
              return (
                <button
                  key={link.id}
                  onClick={() => handleScroll(link.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-3 ${
                    isActive
                      ? 'bg-brand-indigo/10 text-brand-indigo dark:bg-brand-violet/10 dark:text-brand-violet'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-brand-indigo dark:bg-brand-violet flex-shrink-0" />}
                  {link.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
export default Navbar;

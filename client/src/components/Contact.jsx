import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, User, MapPin, Phone, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitContactForm } from '../services/api';

const quickLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: 'patilganesh1406@gmail.com',
    href: 'mailto:patilganesh1406@gmail.com',
    color: 'text-brand-indigo',
    bg: 'bg-brand-indigo/10',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91-9326180781',
    href: 'tel:+919326180781',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Mumbai, Maharashtra',
    href: null,
    color: 'text-rose-500',
    bg: 'bg-rose-500/10',
  },
];

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ text: '', type: '' });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatusMsg({ text: 'All fields are required.', type: 'error' });
      return;
    }
    setIsSubmitting(true);
    setStatusMsg({ text: '', type: '' });
    try {
      const result = await submitContactForm(formData);
      setStatusMsg({ text: result.message || 'Message sent! I will get back to you soon 🎉', type: 'success' });
      setFormData({ name: '', email: '', message: '' });
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.75 }, colors: ['#6366f1', '#8b5cf6', '#ec4899', '#a78bfa'] });
    } catch (error) {
      setStatusMsg({ text: error.message || 'Something went wrong. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 md:px-8 max-w-6xl mx-auto relative">
      {/* Section heading */}
      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-tag text-brand-indigo dark:text-brand-violet mb-3"
        >
          06 — Get In Touch
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4"
        >
          Let's Connect
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '80px' }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-1 bg-gradient-to-r from-brand-indigo to-brand-violet mx-auto rounded-full"
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-slate-500 dark:text-slate-400 max-w-lg mx-auto text-sm"
        >
          Have a project in mind, want to collaborate, or just want to say hi? I'm open to opportunities and always happy to chat.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* ── Left: Quick-connect info ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="md:col-span-4 flex flex-col gap-4"
        >
          <div className="glass-panel p-8 rounded-3xl">
            <h3 className="text-lg font-bold dark:text-white text-slate-800 mb-2">
              Contact Details
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              Reach out through any channel below or fill out the form and I'll respond within 24 hours.
            </p>

            <div className="space-y-4">
              {quickLinks.map((link, idx) => {
                const Icon = link.icon;
                const content = (
                  <div className="flex items-center gap-4 group">
                    <div className={`p-3 rounded-xl ${link.bg} transition-all group-hover:scale-110`}>
                      <Icon size={18} className={link.color} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">{link.label}</p>
                      <p className={`text-sm font-semibold dark:text-slate-200 text-slate-700 break-all ${link.href ? 'hover:text-brand-indigo dark:hover:text-brand-violet transition-colors' : ''}`}>
                        {link.value}
                      </p>
                    </div>
                  </div>
                );
                return link.href ? (
                  <a key={idx} href={link.href}>{content}</a>
                ) : (
                  <div key={idx}>{content}</div>
                );
              })}
            </div>
          </div>

          {/* Social links */}
          <div className="glass-panel p-6 rounded-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">Find me online</p>
            <div className="flex gap-3">
              <a href="https://github.com/Ganesh1789" target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-indigo/40 hover:bg-brand-indigo/5 transition-all text-slate-500 dark:text-slate-400 hover:text-brand-indigo font-semibold text-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>
                GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-violet/40 hover:bg-brand-violet/5 transition-all text-slate-500 dark:text-slate-400 hover:text-brand-violet font-semibold text-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                LinkedIn
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── Right: Contact Form ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-8"
        >
          <div className="glass-panel p-8 md:p-10 rounded-3xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="text" name="name" value={formData.name}
                      onChange={handleChange} placeholder="Enter your name"
                      className="input-glow w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm transition-all"
                      required
                    />
                  </div>
                </div>
                {/* Email */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                    Your Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="email" name="email" value={formData.email}
                      onChange={handleChange} placeholder="Enter your email_id"
                      className="input-glow w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                  Your Message
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 text-slate-400" size={16} />
                  <textarea
                    name="message" value={formData.message}
                    onChange={handleChange}
                    placeholder="Hey Ganesh, let's build something amazing together!"
                    rows="6"
                    className="input-glow w-full pl-11 pr-4 py-4 rounded-xl border border-slate-200 dark:border-slate-800 text-sm transition-all resize-none"
                    required
                  />
                </div>
              </div>

              {/* Status message */}
              {statusMsg.text && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl text-sm font-semibold ${statusMsg.type === 'success'
                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                    }`}
                >
                  {statusMsg.text}
                </motion.div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-brand-indigo to-brand-violet hover:opacity-95 disabled:opacity-60 text-white rounded-xl font-bold shadow-lg shadow-brand-indigo/25 hover:shadow-brand-indigo/40 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default Contact;

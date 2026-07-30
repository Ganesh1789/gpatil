import React, { useState, useEffect } from 'react';
import {
  loginAdmin, createItem, updateItem, deleteItem,
  fetchSkills, fetchExperiences, fetchProjects, fetchEducations,
  fetchContacts, deleteContactMsg
} from '../services/api';
import {
  Plus, Edit2, Trash2, LogOut, MessageCircle,
  Briefcase, GraduationCap, Code, ShieldCheck, Mail, ArrowLeft
} from 'lucide-react';

export const AdminDashboard = ({ onBack, refreshMainData }) => {
  const [token, setToken] = useState(() => localStorage.getItem('adminToken') || '');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Dashboard states
  const [activeTab, setActiveTab] = useState('projects');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Data lists
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [education, setEducation] = useState([]);
  const [contacts, setContacts] = useState([]);

  // Form states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formFields, setFormFields] = useState({});

  useEffect(() => {
    if (token) {
      loadData();
    }
  }, [token, activeTab]);

  const loadData = async () => {
    setIsLoading(true);
    setError('');
    try {
      if (activeTab === 'projects') {
        const data = await fetchProjects();
        setProjects(data);
      } else if (activeTab === 'experiences') {
        const data = await fetchExperiences();
        setExperiences(data);
      } else if (activeTab === 'skills') {
        const data = await fetchSkills();
        setSkills(data);
      } else if (activeTab === 'education') {
        const data = await fetchEducations();
        setEducation(data);
      } else if (activeTab === 'contacts') {
        const data = await fetchContacts(token);
        setContacts(data);
      }
    } catch (err) {
      setError('Failed to fetch data.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const data = await loginAdmin(username, password);
      localStorage.setItem('adminToken', data.token);
      setToken(data.token);
    } catch (err) {
      setLoginError(err.message || 'Login failed.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken('');
    if (refreshMainData) refreshMainData();
  };

  // --- CRUD ACTIONS ---

  const handleOpenCreateForm = () => {
    setEditingId(null);
    if (activeTab === 'projects') {
      setFormFields({ title: '', description: '', category: '', technologies: '', points: '', githubUrl: '', liveUrl: '' });
    } else if (activeTab === 'experiences') {
      setFormFields({ role: '', company: '', location: '', duration: '', points: '' });
    } else if (activeTab === 'skills') {
      setFormFields({ category: '', items: '' });
    } else if (activeTab === 'education') {
      setFormFields({ degree: '', institution: '', location: '', duration: '' });
    }
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (item) => {
    setEditingId(item._id);
    if (activeTab === 'projects') {
      setFormFields({
        title: item.title,
        description: item.description,
        category: item.category,
        technologies: item.technologies.join(', '),
        points: item.points.join('\n'),
        githubUrl: item.githubUrl || '',
        liveUrl: item.liveUrl || ''
      });
    } else if (activeTab === 'experiences') {
      setFormFields({
        role: item.role,
        company: item.company,
        location: item.location,
        duration: item.duration,
        points: item.points.join('\n')
      });
    } else if (activeTab === 'skills') {
      setFormFields({
        category: item.category,
        items: item.items.join(', ')
      });
    } else if (activeTab === 'education') {
      setFormFields({
        degree: item.degree,
        institution: item.institution,
        location: item.location,
        duration: item.duration
      });
    }
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    // Process input data
    let payload = { ...formFields };
    if (activeTab === 'projects') {
      payload.technologies = formFields.technologies.split(',').map(s => s.trim()).filter(Boolean);
      payload.points = formFields.points.split('\n').map(s => s.trim()).filter(Boolean);
    } else if (activeTab === 'experiences') {
      payload.points = formFields.points.split('\n').map(s => s.trim()).filter(Boolean);
    } else if (activeTab === 'skills') {
      payload.items = formFields.items.split(',').map(s => s.trim()).filter(Boolean);
    }

    try {
      if (editingId) {
        await updateItem(activeTab, editingId, payload, token);
        setSuccess('Item updated successfully!');
      } else {
        await createItem(activeTab, payload, token);
        setSuccess('Item created successfully!');
      }
      setIsFormOpen(false);
      loadData();
      if (refreshMainData) refreshMainData();
    } catch (err) {
      setError(err.message || 'Operation failed.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    setSuccess('');
    setError('');
    try {
      if (activeTab === 'contacts') {
        await deleteContactMsg(id, token);
      } else {
        await deleteItem(activeTab, id, token);
      }
      setSuccess('Item deleted successfully!');
      loadData();
      if (refreshMainData) refreshMainData();
    } catch (err) {
      setError(err.message || 'Delete failed.');
    }
  };

  if (!token) {
    // LOGIN FORM
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 px-4 bg-slate-950 text-white">
        <div className="radial-mesh radial-mesh-primary -top-10 -left-10 animate-pulse-slow"></div>

        <div className="glass-panel w-full max-w-md p-8 rounded-3xl relative z-10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Portfolio
          </button>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">Admin Login</h2>
            <p className="text-xs text-slate-400 mt-2">Manage your resume dashboard details</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-4 py-3 bg-white/5 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-violet text-sm transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-white/5 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-violet text-sm transition-all"
                required
              />
            </div>

            {loginError && (
              <div className="p-3 bg-rose-500/10 text-rose-500 rounded-xl border border-rose-500/20 text-xs font-semibold text-center">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-brand-indigo to-brand-violet text-white font-bold rounded-xl shadow-lg hover:opacity-95 transition-opacity cursor-pointer text-sm"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  // DASHBOARD VIEW
  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 px-4 md:px-8 max-w-6xl mx-auto pb-16">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold flex items-center gap-2">
            Admin Console
          </h2>
          <p className="text-xs text-slate-400 mt-1">Hello, Administrator</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="px-4 py-2 border border-slate-800 text-slate-400 hover:text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft size={14} /> Back to Site
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-rose-600/10 border border-rose-600/20 text-rose-500 hover:bg-rose-600 hover:text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            Logout <LogOut size={14} />
          </button>
        </div>
      </div>

      {/* Tabs list */}
      <div className="flex flex-wrap gap-2 mb-8 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800">
        {[
          { id: 'projects', label: 'Projects', icon: <Code size={14} /> },
          { id: 'experiences', label: 'Experiences', icon: <Briefcase size={14} /> },
          { id: 'skills', label: 'Skills', icon: <ShieldCheck size={14} /> },
          { id: 'education', label: 'Education', icon: <GraduationCap size={14} /> },
          { id: 'contacts', label: 'Messages Inbox', icon: <MessageCircle size={14} /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setIsFormOpen(false); }}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${activeTab === tab.id
              ? 'bg-gradient-to-r from-brand-indigo to-brand-violet text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Alerts */}
      {success && (
        <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-2xl text-sm font-semibold text-center">
          {success}
        </div>
      )}
      {error && (
        <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-2xl text-sm font-semibold text-center">
          {error}
        </div>
      )}

      {/* Content wrapper */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl">
        {/* Tab Subheader action */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold capitalize flex items-center gap-2">
            {activeTab} Management
          </h3>
          {activeTab !== 'contacts' && (
            <button
              onClick={handleOpenCreateForm}
              className="px-4 py-2 bg-brand-indigo hover:opacity-90 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-opacity cursor-pointer"
            >
              Add New <Plus size={14} />
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="py-12 text-center text-slate-400 text-sm">Loading records...</div>
        ) : (
          <div>
            {/* Form Drawer / Panel */}
            {isFormOpen && (
              <form onSubmit={handleFormSubmit} className="mb-8 p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-4">
                <h4 className="font-bold text-sm text-brand-violet uppercase tracking-wider pb-2 border-b border-slate-850">
                  {editingId ? 'Edit Item' : 'Create New Item'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Dynamic Fields rendering based on active tab */}
                  {activeTab === 'projects' && (
                    <>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-400 mb-1">Project Title</label>
                        <input
                          type="text"
                          required
                          value={formFields.title || ''}
                          onChange={(e) => setFormFields({ ...formFields, title: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-400 mb-1">Description</label>
                        <textarea
                          required
                          rows="3"
                          value={formFields.description || ''}
                          onChange={(e) => setFormFields({ ...formFields, description: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Category</label>
                        <input
                          type="text"
                          required
                          placeholder="MERN Stack"
                          value={formFields.category || ''}
                          onChange={(e) => setFormFields({ ...formFields, category: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Technologies (comma-separated)</label>
                        <input
                          type="text"
                          placeholder="React.js, Node.js, Express.js"
                          value={formFields.technologies || ''}
                          onChange={(e) => setFormFields({ ...formFields, technologies: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-400 mb-1">Detailed Points (one per line)</label>
                        <textarea
                          rows="4"
                          value={formFields.points || ''}
                          onChange={(e) => setFormFields({ ...formFields, points: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">GitHub Repo URL</label>
                        <input
                          type="url"
                          value={formFields.githubUrl || ''}
                          onChange={(e) => setFormFields({ ...formFields, githubUrl: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Live Site URL</label>
                        <input
                          type="url"
                          value={formFields.liveUrl || ''}
                          onChange={(e) => setFormFields({ ...formFields, liveUrl: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none"
                        />
                      </div>
                    </>
                  )}

                  {activeTab === 'experiences' && (
                    <>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Role Title</label>
                        <input
                          type="text"
                          required
                          value={formFields.role || ''}
                          onChange={(e) => setFormFields({ ...formFields, role: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Company</label>
                        <input
                          type="text"
                          required
                          value={formFields.company || ''}
                          onChange={(e) => setFormFields({ ...formFields, company: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Location</label>
                        <input
                          type="text"
                          required
                          value={formFields.location || ''}
                          onChange={(e) => setFormFields({ ...formFields, location: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Duration</label>
                        <input
                          type="text"
                          required
                          value={formFields.duration || ''}
                          onChange={(e) => setFormFields({ ...formFields, duration: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-400 mb-1">Accomplishments (one per line)</label>
                        <textarea
                          rows="4"
                          required
                          value={formFields.points || ''}
                          onChange={(e) => setFormFields({ ...formFields, points: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none"
                        />
                      </div>
                    </>
                  )}

                  {activeTab === 'skills' && (
                    <>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Category Title</label>
                        <input
                          type="text"
                          required
                          value={formFields.category || ''}
                          onChange={(e) => setFormFields({ ...formFields, category: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Skills Items (comma-separated)</label>
                        <input
                          type="text"
                          required
                          value={formFields.items || ''}
                          onChange={(e) => setFormFields({ ...formFields, items: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none"
                        />
                      </div>
                    </>
                  )}

                  {activeTab === 'education' && (
                    <>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Degree Title</label>
                        <input
                          type="text"
                          required
                          value={formFields.degree || ''}
                          onChange={(e) => setFormFields({ ...formFields, degree: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Institution</label>
                        <input
                          type="text"
                          required
                          value={formFields.institution || ''}
                          onChange={(e) => setFormFields({ ...formFields, institution: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Location</label>
                        <input
                          type="text"
                          required
                          value={formFields.location || ''}
                          onChange={(e) => setFormFields({ ...formFields, location: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Duration</label>
                        <input
                          type="text"
                          required
                          value={formFields.duration || ''}
                          onChange={(e) => setFormFields({ ...formFields, duration: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none"
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="flex items-center justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2 border border-slate-800 text-slate-400 rounded-xl text-xs font-bold uppercase tracking-wider"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-brand-indigo to-brand-violet text-white rounded-xl text-xs font-bold uppercase tracking-wider"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}

            {/* List Panels rendering */}
            <div className="space-y-4">
              {activeTab === 'projects' && projects.map(item => (
                <div key={item._id} className="p-4 rounded-xl border border-slate-800 bg-white/5 flex items-center justify-between gap-4 hover:border-slate-700 transition-colors">
                  <div>
                    <h4 className="font-bold text-sm">{item.title}</h4>
                    <span className="text-xs text-slate-500 font-semibold uppercase">{item.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleOpenEditForm(item)} className="p-2 text-slate-400 hover:text-white"><Edit2 size={14} /></button>
                    <button onClick={() => handleDelete(item._id)} className="p-2 text-rose-500 hover:text-rose-400"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}

              {activeTab === 'experiences' && experiences.map(item => (
                <div key={item._id} className="p-4 rounded-xl border border-slate-800 bg-white/5 flex items-center justify-between gap-4 hover:border-slate-700 transition-colors">
                  <div>
                    <h4 className="font-bold text-sm">{item.role}</h4>
                    <span className="text-xs text-slate-500 font-semibold">{item.company} &bull; {item.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleOpenEditForm(item)} className="p-2 text-slate-400 hover:text-white"><Edit2 size={14} /></button>
                    <button onClick={() => handleDelete(item._id)} className="p-2 text-rose-500 hover:text-rose-400"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}

              {activeTab === 'skills' && skills.map(item => (
                <div key={item._id} className="p-4 rounded-xl border border-slate-800 bg-white/5 flex items-center justify-between gap-4 hover:border-slate-700 transition-colors">
                  <div>
                    <h4 className="font-bold text-sm">{item.category}</h4>
                    <span className="text-xs text-slate-500 font-semibold">{item.items.join(', ')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleOpenEditForm(item)} className="p-2 text-slate-400 hover:text-white"><Edit2 size={14} /></button>
                    <button onClick={() => handleDelete(item._id)} className="p-2 text-rose-500 hover:text-rose-400"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}

              {activeTab === 'education' && education.map(item => (
                <div key={item._id} className="p-4 rounded-xl border border-slate-800 bg-white/5 flex items-center justify-between gap-4 hover:border-slate-700 transition-colors">
                  <div>
                    <h4 className="font-bold text-sm">{item.degree}</h4>
                    <span className="text-xs text-slate-500 font-semibold">{item.institution} &bull; {item.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleOpenEditForm(item)} className="p-2 text-slate-400 hover:text-white"><Edit2 size={14} /></button>
                    <button onClick={() => handleDelete(item._id)} className="p-2 text-rose-500 hover:text-rose-400"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}

              {activeTab === 'contacts' && (
                contacts.length === 0 ? (
                  <div className="text-center py-6 text-slate-500 text-xs font-semibold">No messages received yet.</div>
                ) : (
                  contacts.map(item => (
                    <div key={item._id} className="p-5 rounded-2xl border border-slate-800 bg-white/5 space-y-3 relative hover:border-slate-700 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2 border-b border-slate-850">
                        <div>
                          <h4 className="font-bold text-sm flex items-center gap-2 text-brand-violet">
                            <Mail size={14} /> {item.name}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-semibold">{item.email}</span>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-500">
                          {new Date(item.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-slate-350 leading-relaxed bg-black/20 p-3 rounded-lg border border-slate-900/30">
                        {item.message}
                      </p>

                      <div className="absolute right-4 bottom-4">
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-2 text-slate-500 hover:text-rose-500 transition-colors cursor-pointer"
                          title="Delete Message"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default AdminDashboard;

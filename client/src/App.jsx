import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import { fetchSkills, fetchExperiences, fetchProjects, fetchEducations } from './services/api';

// ── Shimmer Skeleton ──────────────────────────────────────
const SkeletonCard = ({ h = 'h-32', className = '' }) => (
  <div className={`shimmer rounded-3xl ${h} ${className}`} />
);

const SectionSkeleton = () => (
  <div className="py-24 px-4 md:px-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
    {/* Section heading skeleton */}
    <div className="flex flex-col items-center gap-3 mb-12">
      <SkeletonCard h="h-4" className="w-24" />
      <SkeletonCard h="h-10" className="w-64" />
      <SkeletonCard h="h-1"  className="w-20" />
    </div>
    {/* Cards row */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SkeletonCard h="h-52" />
      <SkeletonCard h="h-52" />
      <SkeletonCard h="h-52" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SkeletonCard h="h-64" />
      <SkeletonCard h="h-64" />
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────
function App() {
  const [isAdminView, setIsAdminView] = useState(false);
  const { theme } = useTheme();

  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [education, setEducation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [skillsData, expData, projData, eduData] = await Promise.all([
        fetchSkills(),
        fetchExperiences(),
        fetchProjects(),
        fetchEducations(),
      ]);
      setSkills(skillsData);
      setExperiences(expData);
      setProjects(projData);
      setEducation(eduData);
    } catch (err) {
      console.error('Error loading portfolio data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1.1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    document.body.className = theme;

    return () => lenis.destroy();
  }, [theme]);

  if (isAdminView) {
    return (
      <AdminDashboard
        onBack={() => setIsAdminView(false)}
        refreshMainData={loadAllData}
      />
    );
  }

  return (
    <div className="relative min-h-screen transition-colors duration-300">
      <Navbar onAdminClick={() => setIsAdminView(true)} isAdminView={isAdminView} />

      <main className="w-full">
        <Hero />
        <About />

        {isLoading ? (
          <SectionSkeleton />
        ) : (
          <>
            <Skills    skills={skills}         />
            <Projects  projects={projects}     />
            <Experience experiences={experiences} />
            <Education education={education}  />
          </>
        )}

        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;

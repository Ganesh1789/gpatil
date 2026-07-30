import { useState, useEffect } from 'react';

export const useScrollSpy = (sectionIds, offset = 100) => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      // Check if we are at the bottom of the page
      if (window.innerHeight + window.scrollY >= window.document.documentElement.scrollHeight - 10) {
        setActiveId(sectionIds[sectionIds.length - 1]);
        return;
      }

      for (let i = 0; i < sectionIds.length; i++) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveId(id);
            return;
          }
        }
      }
      
      // Default to first section if scroll is above offset
      if (scrollPosition < (document.getElementById(sectionIds[0])?.offsetTop || 0)) {
        setActiveId(sectionIds[0]);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeId;
};
export default useScrollSpy;

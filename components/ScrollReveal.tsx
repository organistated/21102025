import React, { useEffect, useRef, ReactNode, useState } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, className = "", delay = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const section = containerRef.current?.closest('.snap-section');
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('is-active');
          setIsActive(true);
        } else {
          section.classList.remove('is-active');
          setIsActive(false);
        }
      },
      { 
        threshold: 0.5, // Aktywuj gdy sekcja jest w połowie widoczna
        rootMargin: "-10% 0px -10% 0px"
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`reveal ${isActive ? 'active' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
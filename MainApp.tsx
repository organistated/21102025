import React, { useState, useEffect, useRef } from 'react';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import Gallery from './components/Gallery';
import Journey3D from './components/Journey3D';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const TARGET_DATE = '2025-10-21T00:00:00';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const indexStr = entry.target.getAttribute('data-index');
            if (indexStr !== null) {
              const index = parseInt(indexStr, 10);
              if (!isNaN(index)) {
                setActiveSection(index);
              }
            }
            entry.target.classList.add('is-active');
          } else {
            entry.target.classList.remove('is-active');
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll('.snap-section');
    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-black relative">
      {/* GLOBAL 3D SCENE */}
      <div className="fixed inset-0 z-[5] pointer-events-none">
        <Journey3D activeSection={activeSection} />
      </div>

      {/* GLOBAL FIXED BACKGROUNDS */}
      <div className="fixed-backgrounds">
        {/* Layer 0: Hero Blobs */}
        <div className={`bg-layer ${activeSection === 0 ? 'active' : ''}`}>
          <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-purple-600 rounded-full mix-blend-screen filter blur-[150px] opacity-10 animate-float"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-pink-600 rounded-full mix-blend-screen filter blur-[150px] opacity-10 animate-float" style={{ animationDelay: '3s' }}></div>
        </div>

        {/* Layer 1: Countdown Gradient */}
        <div className={`bg-layer bg-zinc-950 ${activeSection === 1 ? 'active' : ''}`}>
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_#3b0764_0%,_transparent_70%)]"></div>
        </div>

        {/* Layers 2-5: Gallery Images */}
        {[
          'https://raw.githubusercontent.com/organistated/21102025/refs/heads/main/image_001.jpg',
          'https://raw.githubusercontent.com/organistated/21102025/refs/heads/main/image_002.jpg',
          'https://raw.githubusercontent.com/organistated/21102025/refs/heads/main/image_003.jpg',
          'https://raw.githubusercontent.com/organistated/21102025/refs/heads/main/image_004.png'
        ].map((url, i) => (
          <div key={i} className={`bg-layer ${activeSection === i + 2 ? 'active' : ''}`}>
             <img src={`${url}?auto=format&fit=crop&q=80&w=1920`} className="w-full h-full object-cover opacity-30" alt="" />
             <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black"></div>
          </div>
        ))}

        {/* Layer 6: Footer */}
        <div className={`bg-layer bg-black ${activeSection === 6 ? 'active' : ''}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_#ff2d5522_0%,_transparent_50%)]"></div>
        </div>
      </div>

      {/* SCROLLABLE CONTENT */}
      <div className="snap-container" ref={containerRef}>
        <div className="snap-section" data-index="0">
          <Hero />
        </div>
        
        <div className="snap-section" data-index="1">
          <Countdown targetDate={TARGET_DATE} />
        </div>
        <div className="snap-section" data-index="2">
          <Gallery step={0} />
        </div>
        <div className="snap-section" data-index="3">
          <Gallery step={1} />
        </div>
        <div className="snap-section" data-index="4">
          <Gallery step={2} />
        </div>
        <div className="snap-section" data-index="5">
          <Gallery step={3} />
        </div>

        <footer className="snap-section" data-index="6">
          <div className="content-fade text-center px-6">
            <h5 className="text-4xl md:text-8xl font-black text-white mb-8 tracking-tighter">NA ZAWSZE.</h5>
            <div className="flex items-center justify-center gap-4 text-apple-subtext text-xs tracking-[0.5em] font-bold uppercase">
              <span>Karina</span>
              <div className="w-2 h-2 rounded-full bg-apple-pink"></div>
              <span>Kuba</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Navigation Indicators */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3 z-50">
        {[...Array(7)].map((_, i) => (
          <div 
            key={i} 
            className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${activeSection === i ? 'bg-apple-pink scale-150' : 'bg-white/20'}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default App;
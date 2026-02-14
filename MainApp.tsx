import React, { useState, useEffect, useRef } from "react";
import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import Gallery from "./components/Gallery";
import Journey3D from "./components/Journey3D";

const MainApp: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const TARGET_DATE = "2025-10-21T00:00:00";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const indexStr = entry.target.getAttribute("data-index");
            if (indexStr !== null) {
              const index = parseInt(indexStr, 10);
              if (!isNaN(index)) {
                setActiveSection(index);
              }
            }
            entry.target.classList.add("is-active");
          } else {
            entry.target.classList.remove("is-active");
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll(".snap-section");
    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-black relative">
      {/* GLOBAL 3D SCENE */}
      <div className="fixed inset-0 z-[5] pointer-events-none">
        <Journey3D activeSection={activeSection} />
      </div>

      {/* BACKGROUNDS */}
      <div className="fixed-backgrounds">
        <div className={`bg-layer ${activeSection === 0 ? "active" : ""}`} />
      </div>

      {/* SCROLL CONTENT */}
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
          <div className="text-center px-6">
            <h5 className="text-4xl md:text-8xl font-black text-white mb-8 tracking-tighter">
              NA ZAWSZE.
            </h5>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MainApp;

import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="content-fade z-10 text-center px-4 relative">
      <h2 className="text-sm md:text-base font-medium tracking-[0.2em] text-apple-pink uppercase mb-6 animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
        Nasza Historia
      </h2>
      
      {/* Glowing Gradient Text */}
      <h1 className="text-6xl md:text-9xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-6 animate-fade-in-up opacity-0 drop-shadow-2xl" style={{ animationDelay: '0.5s' }}>
        Karina & Kuba
      </h1>
      
      <p className="text-2xl md:text-3xl font-light text-gray-300 animate-fade-in-up opacity-0" style={{ animationDelay: '0.8s' }}>
        21.10.2025
      </p>
      
      <div className="mt-16 animate-fade-in opacity-0" style={{ animationDelay: '1.2s' }}>
         <svg className="w-8 h-8 text-white/50 animate-bounce mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
         </svg>
      </div>
    </div>
  );
};

export default Hero;
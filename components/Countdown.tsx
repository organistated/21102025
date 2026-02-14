import React, { useState, useEffect } from 'react';
import { CountdownTime } from '../types';

interface CountdownProps {
  targetDate: string;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0, isFuture: true });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      let diff = target - now;
      let isFuture = true;

      if (diff < 0) {
        diff = now - target;
        isFuture = false;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isFuture });
    };

    const timer = setInterval(calculateTime, 1000);
    calculateTime();
    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center justify-center px-4 md:px-10">
      <span className="text-7xl md:text-[10rem] font-black text-white tabular-nums tracking-tighter leading-none">
        {value < 10 ? `0${value}` : value}
      </span>
      <span className="text-[10px] md:text-xs font-bold text-apple-pink uppercase tracking-[0.5em] mt-6 opacity-70">{label}</span>
    </div>
  );

  return (
    <div className="content-fade max-w-7xl mx-auto text-center px-4">
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.6em] mb-16">
        {timeLeft.isFuture ? "OCZEKIWANIE NA MAGIĘ" : "KAŻDA SEKUNDA Z TOBĄ"}
      </h3>

      <div className="flex flex-wrap justify-center items-baseline">
        <TimeUnit value={timeLeft.days} label="Dni" />
        <TimeUnit value={timeLeft.hours} label="Godz" />
        <TimeUnit value={timeLeft.minutes} label="Min" />
        <TimeUnit value={timeLeft.seconds} label="Sek" />
      </div>

      <div className="mt-20 inline-block px-8 py-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
        <p className="text-[10px] text-gray-400 font-bold tracking-[0.3em] uppercase">
          NASZA WIECZNOŚĆ ZACZĘŁA SIĘ W 2025
        </p>
      </div>
    </div>
  );
};

export default Countdown;
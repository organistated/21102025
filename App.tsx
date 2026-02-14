import React, { useState, useRef } from "react";
import MainApp from "./MainApp";

const App: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleStart = () => {
    audioRef.current?.play();

    // zaczynamy fade-out po 7.5 sekundy
    setTimeout(() => {
      setFadeOut(true);
    }, 7500);

    // po czasie animacji usuwamy intro i pokazujemy stronę
    setTimeout(() => {
      setStarted(true);
    }, 8500); // 1 sekunda na animację
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="https://raw.githubusercontent.com/organistated/21102025/refs/heads/main/music.mp3"
        loop
      />

      {!started && (
        <div
          onClick={handleStart}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "24px",
            cursor: "pointer",
            zIndex: 9999,
            opacity: fadeOut ? 0 : 1,
            transition: "opacity 1s ease"
          }}
        >
          ❤️‍🔥❤️‍🔥❤️‍🔥
        </div>
      )}

      {started && <MainApp />}
    </>
  );
};

export default App;

import React, { useState, useRef } from "react";
import MainApp from "./MainApp";

const App: React.FC = () => {
  const [started, setStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleStart = () => {
    audioRef.current?.play();

    setTimeout(() => {
      setStarted(true);
    }, 7500); // czas trwania intro
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

"use client";

import React, { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const AudioToggle: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);

  const toggleAudio = () => {
    const newMutedState = !isMuted;

    setIsMuted(newMutedState);

    window.dispatchEvent(
      new CustomEvent("haruto-audio-toggle", {
        detail: {
          muted: newMutedState,
        },
      })
    );
  };

  return (
    <button
      type="button"
      onClick={toggleAudio}
      aria-label={isMuted ? "Enable audio" : "Mute audio"}
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/50 backdrop-blur-md transition hover:scale-105"
    >
      {isMuted ? (
        <VolumeX size={20} />
      ) : (
        <Volume2 size={20} />
      )}
    </button>
  );
};

export default AudioToggle;
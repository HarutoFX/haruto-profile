"use client";

import { useEffect, useState } from "react";
import {
  Volume2,
  VolumeX,
} from "lucide-react";

import type { VideoBackgroundHandle } from "./VideoBackground";

interface VolumeControlProps {
  videoRef: React.RefObject<VideoBackgroundHandle | null>;
}

export default function VolumeControl({
  videoRef,
}: VolumeControlProps) {
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const syncVolume = () => {
      const video = videoRef.current;

      if (!video) {
        return;
      }

      setVolume(video.getVolume());
      setMuted(video.isMuted());
    };

    syncVolume();

    const interval = window.setInterval(
      syncVolume,
      250
    );

    return () => {
      window.clearInterval(interval);
    };
  }, [videoRef]);

  const toggleMute = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.toggleMute();

    setMuted(video.isMuted());
  };

  const changeVolume = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const nextVolume = Number(event.target.value);

    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.setVolume(nextVolume);

    setVolume(nextVolume);
    setMuted(nextVolume === 0);
  };

  return (
    <div
      className="fixed bottom-5 right-5 z-[9000]"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex items-center gap-2 rounded-2xl border border-white/[0.12] bg-black/55 p-1.5 shadow-[0_15px_50px_rgba(0,0,0,0.4)] backdrop-blur-2xl">

        {open && (
          <div className="flex items-center px-2">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={muted ? 0 : volume}
              onChange={changeVolume}
              aria-label="Video volume"
              className="h-1 w-20 cursor-pointer accent-white sm:w-24"
            />
          </div>
        )}

        <button
          type="button"
          onClick={toggleMute}
          aria-label={
            muted
              ? "Unmute background video"
              : "Mute background video"
          }
          className="flex h-9 w-9 items-center justify-center rounded-xl text-white/45 transition-all duration-300 hover:bg-white/[0.08] hover:text-white"
        >
          {muted || volume === 0 ? (
            <VolumeX size={16} />
          ) : (
            <Volume2 size={16} />
          )}
        </button>
      </div>
    </div>
  );
}
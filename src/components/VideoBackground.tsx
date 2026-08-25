"use client";

import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

interface VideoBackgroundProps {
  videoName: string;
}

export interface VideoBackgroundHandle {
  playWithAudio: () => Promise<void>;
  getVolume: () => number;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  isMuted: () => boolean;
}

const dragonBallVideos = [
  "Dragon Ball Edit 1.mp4",
];

const VideoBackground = forwardRef<
  VideoBackgroundHandle,
  VideoBackgroundProps
>(function VideoBackground({ videoName }, ref) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [selectedVideo] = useState<string>(() => {
    if (videoName === "dragonball") {
      const randomIndex = Math.floor(
        Math.random() * dragonBallVideos.length
      );

      return dragonBallVideos[randomIndex];
    }

    return `${videoName}.mp4`;
  });

  useImperativeHandle(ref, () => ({
    playWithAudio: async () => {
      const video = videoRef.current;

      if (!video) {
        console.warn("Video element is not ready.");
        return;
      }

      try {
        if (video.readyState < 3) {
          await new Promise<void>((resolve) => {
            const handleCanPlay = () => {
              video.removeEventListener(
                "canplay",
                handleCanPlay
              );

              resolve();
            };

            video.addEventListener(
              "canplay",
              handleCanPlay
            );
          });
        }

        video.muted = false;

        if (video.volume === 0) {
          video.volume = 1;
        }

        await video.play();

        console.log(
          "Dragon Ball video started with audio."
        );
      } catch (error) {
        console.error(
          "Could not start video with audio:",
          error
        );
      }
    },

    getVolume: () => {
      const video = videoRef.current;

      if (!video) {
        return 1;
      }

      return video.volume;
    },

    setVolume: (volume: number) => {
      const video = videoRef.current;

      if (!video) {
        return;
      }

      const safeVolume = Math.min(
        1,
        Math.max(0, volume)
      );

      video.volume = safeVolume;

      if (safeVolume > 0) {
        video.muted = false;
      } else {
        video.muted = true;
      }
    },

    toggleMute: () => {
      const video = videoRef.current;

      if (!video) {
        return;
      }

      video.muted = !video.muted;
    },

    isMuted: () => {
      const video = videoRef.current;

      if (!video) {
        return true;
      }

      return video.muted;
    },
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="auto"
        className="h-full w-full object-cover"
        src={`/videos/${encodeURIComponent(selectedVideo)}`}
      />

      <div className="absolute inset-0 bg-black/35" />
    </div>
  );
});

VideoBackground.displayName = "VideoBackground";

export default VideoBackground;
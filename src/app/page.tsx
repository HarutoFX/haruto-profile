"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Background from "@/components/Background";
import EnterScreen from "@/components/EnterScreen";
import ProfileScreen from "@/components/ProfileScreen";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import CustomCursor from "@/components/CustomCursor";
import VolumeControl from "@/components/VolumeControl";

import type { VideoBackgroundHandle } from "@/components/VideoBackground";

export default function Home() {
  const [entered, setEntered] = useState(false);

  const videoRef =
    useRef<VideoBackgroundHandle>(null);

  const handleEnter = async () => {
    await videoRef.current?.playWithAudio();

    setEntered(true);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white">

      {/* ================================================= */}
      {/* BACKGROUND */}
      {/* ================================================= */}

      <Background
        entered={entered}
        videoRef={videoRef}
      />

      {/* ================================================= */}
      {/* CUSTOM CURSOR */}
      {/* ================================================= */}

      <CustomCursor />

      {/* ================================================= */}
      {/* VOLUME CONTROL */}
      {/* ================================================= */}

      {entered && (
        <VolumeControl
          videoRef={videoRef}
        />
      )}

      {/* ================================================= */}
      {/* MAIN CONTENT */}
      {/* ================================================= */}

      <AnimatePresence mode="wait">

        {!entered ? (
          <motion.div
            key="enter"
            initial={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
              scale: 1.04,
              filter: "blur(12px)",
            }}
            transition={{
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10"
          >
            <EnterScreen
              onEnter={handleEnter}
            />
          </motion.div>
        ) : (
          <motion.div
            key="profile"
            initial={{
              opacity: 0,
              scale: 1.04,
              filter: "blur(12px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10"
          >

            {/* Profile */}
            <ProfileScreen />

            {/* Skills */}
            <SkillsSection />

            {/* Projects */}
            <ProjectsSection />

            {/* Contact */}
            <ContactSection />

          </motion.div>
        )}

      </AnimatePresence>

      {/* ================================================= */}
      {/* THEME SWITCHER */}
      {/* ================================================= */}

      <ThemeSwitcher />

    </main>
  );
}
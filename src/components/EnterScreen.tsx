"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface EnterScreenProps {
  onEnter: () => void;
}

export default function EnterScreen({ onEnter }: EnterScreenProps) {
  const handleEnter = () => {
    // Enable background audio directly from the user's click gesture.
    window.dispatchEvent(new Event("haruto:enable-audio"));

    onEnter();
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      {/* ========================================================= */}
      {/* AMBER ATMOSPHERE                                          */}
      {/* ========================================================= */}

      <div className="pointer-events-none absolute inset-0">
        {/* Central energy glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.2 }}
          className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/[0.035] blur-[120px]"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/[0.045] blur-[80px]"
        />

        {/* Top warm light */}
        <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-orange-400/20 to-transparent" />

        {/* Bottom warm light */}
        <div className="absolute bottom-0 left-1/2 h-px w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-400/15 to-transparent" />
      </div>

      {/* ========================================================= */}
      {/* ENTER CONTROL                                              */}
      {/* ========================================================= */}

      <div className="relative flex flex-col items-center text-center">
        <motion.button
          type="button"
          onClick={handleEnter}
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.25,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover="hover"
          whileTap={{
            scale: 0.94,
          }}
          className="group relative flex flex-col items-center outline-none"
          aria-label="Enter Haruto's profile"
        >
          {/* ===================================================== */}
          {/* ENERGY RINGS                                            */}
          {/* ===================================================== */}

          <motion.div
            variants={{
              hover: {
                scale: 1.08,
              },
            }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative flex h-24 w-24 items-center justify-center rounded-full border border-orange-400/20 bg-black/30 shadow-[0_0_40px_rgba(249,115,22,0.08)] backdrop-blur-md"
          >
            {/* Outer energy ring */}
            <motion.span
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "linear",
              }}
              className="pointer-events-none absolute -inset-2 rounded-full border border-orange-400/10"
            />

            {/* Broken energy ring */}
            <motion.span
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
              className="pointer-events-none absolute -inset-4 rounded-full border border-dashed border-amber-400/10"
            />

            {/* Hover ring */}
            <span className="absolute inset-[-1px] rounded-full border border-orange-400/0 transition-all duration-500 group-hover:border-orange-400/45 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.16)]" />

            {/* Inner ring */}
            <span className="absolute inset-2 rounded-full border border-amber-300/[0.10] transition-colors duration-500 group-hover:border-orange-300/25" />

            {/* Energy core */}
            <motion.span
              animate={{
                scale: [1, 1.06, 1],
                opacity: [0.45, 0.75, 0.45],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute h-9 w-9 rounded-full bg-orange-500/[0.06] blur-xl"
            />

            {/* Arrow */}
            <motion.span
              variants={{
                hover: {
                  rotate: 45,
                  scale: 1.08,
                },
              }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative z-10 text-amber-100/65 transition-colors duration-300 group-hover:text-orange-100"
            >
              <ArrowUpRight
                size={22}
                strokeWidth={1.4}
              />
            </motion.span>

            {/* Small energy particles */}
            <motion.span
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              className="pointer-events-none absolute inset-[-14px]"
            >
              <span className="absolute left-1/2 top-0 h-1 w-1 -translate-x-1/2 rounded-full bg-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
            </motion.span>

            <motion.span
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 11,
                repeat: Infinity,
                ease: "linear",
              }}
              className="pointer-events-none absolute inset-[-18px]"
            >
              <span className="absolute bottom-2 right-1 h-1 w-1 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(249,115,22,0.9)]" />
            </motion.span>
          </motion.div>

          {/* ===================================================== */}
          {/* TAP TO ENTER                                            */}
          {/* ===================================================== */}

          <motion.span
            variants={{
              hover: {
                letterSpacing: "0.38em",
              },
            }}
            transition={{
              duration: 0.4,
            }}
            className="mt-7 ml-[0.28em] text-[11px] font-medium uppercase tracking-[0.28em] text-amber-100/55 transition-colors duration-300 group-hover:text-orange-100/90"
          >
            Tap to enter
          </motion.span>
        </motion.button>

        {/* ========================================================= */}
        {/* NAME                                                       */}
        {/* ========================================================= */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 1,
            delay: 1,
          }}
          className="mt-10 text-[9px] uppercase tracking-[0.35em] text-amber-100/20"
        >
          Haruto
        </motion.div>
      </div>

      {/* ========================================================= */}
      {/* CORNER ACCENTS                                            */}
      {/* ========================================================= */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 1.5,
          delay: 1.2,
        }}
        className="pointer-events-none absolute bottom-8 left-8 h-1 w-1 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.8)]"
      />

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 1.5,
          delay: 1.4,
        }}
        className="pointer-events-none absolute right-10 top-10 h-1 w-1 rounded-full bg-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.8)]"
      />
    </section>
  );
}
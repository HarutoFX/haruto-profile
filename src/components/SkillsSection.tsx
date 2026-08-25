"use client";

import { motion } from "framer-motion";
import {
  Box,
  Clapperboard,
  Code2,
  Gamepad2,
  Sparkles,
} from "lucide-react";

interface Skill {
  name: string;
  description: string;
  icon: React.ElementType;
}

const skills: Skill[] = [
  {
    name: "3D Art",
    description: "Creating detailed 3D assets, environments, and worlds.",
    icon: Box,
  },
  {
    name: "3D Animation",
    description: "Bringing characters, scenes, and ideas to life through animation.",
    icon: Clapperboard,
  },
  {
    name: "Programming",
    description: "Building applications, systems, tools, and interactive experiences.",
    icon: Code2,
  },
  {
    name: "Game Development",
    description: "Designing and developing interactive game experiences.",
    icon: Gamepad2,
  },
];

export default function SkillsSection() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 pb-20 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative overflow-hidden rounded-[30px] border border-white/[0.12] bg-black/60 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-8"
      >
        {/* Glass highlights */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_35%,transparent_70%,rgba(99,102,241,0.05))]" />

        <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent" />

        {/* Ambient glow */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-64 w-64 rounded-full bg-indigo-500/10 blur-[100px]" />

        <div className="pointer-events-none absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-cyan-400/10 blur-[100px]" />

        <div className="relative">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-400/15 bg-indigo-500/10 text-indigo-300">
              <Sparkles size={18} />
            </div>

            <p className="mt-4 text-[9px] uppercase tracking-[0.3em] text-indigo-300/50">
              What I do
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Skills
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/35">
              A mix of art, animation, programming, and interactive
              development.
            </p>
          </div>

          {/* Skills */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {skills.map((skill, index) => {
              const Icon = skill.icon;

              return (
                <motion.div
                  key={skill.name}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    y: -4,
                    scale: 1.015,
                  }}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5 transition-colors duration-300 hover:border-indigo-400/20 hover:bg-white/[0.06]"
                >
                  {/* Hover glow */}
                  <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-indigo-500/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-400/10 bg-indigo-500/10 text-indigo-300 transition-transform duration-300 group-hover:scale-105">
                      <Icon size={19} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-sm font-medium text-white/85">
                        {skill.name}
                      </h3>

                      <p className="mt-1.5 text-xs leading-5 text-white/35">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
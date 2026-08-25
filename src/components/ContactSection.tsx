"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import {
  FaDiscord,
  FaGithub,
  FaYoutube,
} from "react-icons/fa";

const CONTACT_EMAIL = "haruto@voryn.com";

const contacts = [
  {
    name: "Discord",
    handle: "@haruto107_",
    href: "https://discord.com/users/875383052174524476",
    icon: FaDiscord,
  },
  {
    name: "GitHub",
    handle: "@HarutoFX",
    href: "https://github.com/HarutoFX",
    icon: FaGithub,
  },
  {
    name: "YouTube",
    handle: "@HarutoPlays73",
    href: "https://www.youtube.com/@HarutoPlays73",
    icon: FaYoutube,
  },
];

export default function ContactSection() {
  return (
    <section className="relative px-4 py-24 sm:px-6">
      <div className="mx-auto w-full max-w-5xl">

        {/* ================================================= */}
        {/* CONTACT CARD */}
        {/* ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
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
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative overflow-hidden rounded-[30px] border border-white/[0.12] bg-black/55 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-10"
        >

          {/* ================================================= */}
          {/* BACKGROUND GLOW */}
          {/* ================================================= */}

          <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-indigo-500/10 blur-[110px]" />

          <div className="pointer-events-none absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-cyan-400/10 blur-[110px]" />

          {/* Top highlight */}

          <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <div className="relative">

            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <div className="text-center">

              <p className="text-[9px] uppercase tracking-[0.3em] text-indigo-300/50">
                Get in touch
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
                Let&apos;s build something.
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/40 sm:text-base">
                Have an idea, project, or just want to talk
                about technology? Feel free to reach out.
              </p>

            </div>

            {/* ================================================= */}
            {/* SOCIAL LINKS */}
            {/* ================================================= */}

            <div className="mt-10 grid gap-3 sm:grid-cols-3">

              {contacts.map((contact) => {
                const Icon = contact.icon;

                return (
                  <motion.a
                    key={contact.name}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{
                      y: -4,
                      scale: 1.015,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    className="group flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-4 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]"
                  >

                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.06] bg-black/20">
                        <Icon
                          size={20}
                          className="text-white/60 transition-all duration-300 group-hover:scale-110 group-hover:text-white"
                        />
                      </div>

                      <div>

                        <p className="text-left text-sm font-medium text-white/80">
                          {contact.name}
                        </p>

                        <p className="mt-0.5 text-left text-[10px] text-white/30">
                          {contact.handle}
                        </p>

                      </div>

                    </div>

                    <ArrowUpRight
                      size={15}
                      className="text-white/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/70"
                    />

                  </motion.a>
                );
              })}

            </div>

            {/* ================================================= */}
            {/* EMAIL */}
            {/* ================================================= */}

            <motion.a
              href={`mailto:${CONTACT_EMAIL}`}
              whileHover={{
                scale: 1.01,
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="group mt-4 flex items-center justify-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.035] px-5 py-4 text-sm text-white/50 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
            >

              <Mail size={16} />

              <span>
                Get in touch
              </span>

              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />

            </motion.a>

            {/* ================================================= */}
            {/* DIVIDER */}
            {/* ================================================= */}

            <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* ================================================= */}
            {/* FOOTER */}
            {/* ================================================= */}

            <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">

              <div>

                <p className="text-sm font-medium text-white/60">
                  HARUTO
                </p>

                <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/20">
                  3D • Code • Creativity
                </p>

              </div>

              <p className="text-[10px] text-white/20">
                © 2026 Haruto. Built from scratch.
              </p>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
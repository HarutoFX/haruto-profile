"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  UserRound,
  Sparkles,
  FolderKanban,
  Mail,
} from "lucide-react";

const navItems = [
  {
    label: "Profile",
    target: "profile",
    icon: UserRound,
  },
  {
    label: "Skills",
    target: "skills",
    icon: Sparkles,
  },
  {
    label: "Projects",
    target: "projects",
    icon: FolderKanban,
  },
  {
    label: "Contact",
    target: "contact",
    icon: Mail,
  },
];

export default function FloatingNav() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show at the very top
      if (currentScrollY <= 20) {
        setVisible(true);
        lastScrollY = currentScrollY;
        return;
      }

      // Scrolling down → hide
      if (currentScrollY > lastScrollY) {
        setVisible(false);
      }

      // Scrolling up → show
      if (currentScrollY < lastScrollY) {
        setVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  const scrollToSection = (
    target: string
  ) => {
    const element =
      document.getElementById(target);

    if (!element) {
      return;
    }

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <motion.nav
      initial={{ opacity: 1, y: 0 }}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : -25,
        pointerEvents: visible
          ? "auto"
          : "none",
      }}
      transition={{
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="fixed left-1/2 top-5 z-[100] -translate-x-1/2"
    >
      <div className="flex items-center gap-1 rounded-2xl border border-white/[0.12] bg-black/55 p-1.5 shadow-[0_15px_50px_rgba(0,0,0,0.4)] backdrop-blur-2xl">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.target}
              type="button"
              onClick={() =>
                scrollToSection(item.target)
              }
              className="group flex items-center gap-2 rounded-xl px-3 py-2 text-[10px] uppercase tracking-[0.14em] text-white/40 transition-all duration-300 hover:bg-white/[0.08] hover:text-white/80 sm:px-4"
            >
              <Icon
                size={14}
                strokeWidth={1.7}
                className="transition-transform duration-300 group-hover:scale-110"
              />

              <span className="hidden sm:inline">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}
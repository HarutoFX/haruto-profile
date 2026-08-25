"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CursorPosition {
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  const [position, setPosition] =
    useState<CursorPosition>({
      x: 0,
      y: 0,
    });

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(pointer: fine)"
    );

    const update = () => {
      setEnabled(mediaQuery.matches);
    };

    update();

    mediaQuery.addEventListener("change", update);

    return () => {
      mediaQuery.removeEventListener(
        "change",
        update
      );
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    /*
     * Hide the browser cursor.
     */
    const style = document.createElement("style");

    style.id = "haruto-cursor-style";

    style.textContent = `
      html,
      body,
      *,
      *::before,
      *::after {
        cursor: none !important;
      }
    `;

    document.head.appendChild(style);

    const mouseMove = (event: MouseEvent) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });

      setVisible(true);
    };

    const mouseLeave = () => {
      setVisible(false);
    };

    const mouseEnter = () => {
      setVisible(true);
    };

    const mouseOver = (event: MouseEvent) => {
      const target =
        event.target as HTMLElement | null;

      if (!target) {
        return;
      }

      setHovering(
        Boolean(
          target.closest(
            "a, button, input, textarea, select, [role='button']"
          )
        )
      );
    };

    const mouseDown = () => {
      setClicking(true);
    };

    const mouseUp = () => {
      setClicking(false);
    };

    window.addEventListener(
      "mousemove",
      mouseMove
    );

    window.addEventListener(
      "mouseenter",
      mouseEnter
    );

    window.addEventListener(
      "mouseleave",
      mouseLeave
    );

    window.addEventListener(
      "mouseover",
      mouseOver
    );

    window.addEventListener(
      "mousedown",
      mouseDown
    );

    window.addEventListener(
      "mouseup",
      mouseUp
    );

    return () => {
      style.remove();

      window.removeEventListener(
        "mousemove",
        mouseMove
      );

      window.removeEventListener(
        "mouseenter",
        mouseEnter
      );

      window.removeEventListener(
        "mouseleave",
        mouseLeave
      );

      window.removeEventListener(
        "mouseover",
        mouseOver
      );

      window.removeEventListener(
        "mousedown",
        mouseDown
      );

      window.removeEventListener(
        "mouseup",
        mouseUp
      );
    };
  }, [enabled]);

  if (!enabled || !visible) {
    return null;
  }

  /*
   * Cursor size.
   */
  const size = hovering ? 58 : 46;
  const half = size / 2;

  return (
    <>
      {/* ================================================= */}
      {/* SOFT ENERGY AURA */}
      {/* ================================================= */}

      <motion.div
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[99990]
          rounded-full
          bg-orange-500/20
          blur-2xl
        "
        animate={{
          x: position.x - 38,
          y: position.y - 38,
          width: hovering ? 76 : 64,
          height: hovering ? 76 : 64,
          opacity: clicking
            ? 0.9
            : hovering
              ? 0.65
              : 0.4,
        }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 22,
        }}
      />

      {/* ================================================= */}
      {/* OUTER ROTATING SEAL */}
      {/* ================================================= */}

      <motion.div
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[99991]
          rounded-full
          border
          border-orange-300/60
        "
        animate={{
          x: position.x - half - 4,
          y: position.y - half - 4,
          width: size + 8,
          height: size + 8,
          rotate: 360,
          scale: clicking ? 0.82 : 1,
          opacity: hovering ? 1 : 0.7,
        }}
        transition={{
          x: {
            type: "spring",
            stiffness: 400,
            damping: 28,
          },
          y: {
            type: "spring",
            stiffness: 400,
            damping: 28,
          },
          width: {
            type: "spring",
            stiffness: 350,
            damping: 25,
          },
          height: {
            type: "spring",
            stiffness: 350,
            damping: 25,
          },
          rotate: {
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          },
          scale: {
            duration: 0.15,
          },
        }}
      >
        {/* Top spark */}
        <span
          className="
            absolute
            left-1/2
            top-[-4px]
            h-2
            w-[3px]
            -translate-x-1/2
            rounded-full
            bg-orange-200
            shadow-[0_0_8px_rgba(253,186,116,1)]
          "
        />

        {/* Bottom spark */}
        <span
          className="
            absolute
            bottom-[-4px]
            left-1/2
            h-2
            w-[3px]
            -translate-x-1/2
            rounded-full
            bg-orange-300
            shadow-[0_0_8px_rgba(253,186,116,1)]
          "
        />

        {/* Left spark */}
        <span
          className="
            absolute
            left-[-4px]
            top-1/2
            h-[3px]
            w-2
            -translate-y-1/2
            rounded-full
            bg-orange-200
            shadow-[0_0_8px_rgba(253,186,116,1)]
          "
        />

        {/* Right spark */}
        <span
          className="
            absolute
            right-[-4px]
            top-1/2
            h-[3px]
            w-2
            -translate-y-1/2
            rounded-full
            bg-orange-300
            shadow-[0_0_8px_rgba(253,186,116,1)]
          "
        />
      </motion.div>

      {/* ================================================= */}
      {/* INNER ROTATING RING */}
      {/* ================================================= */}

      <motion.div
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[99992]
          rounded-full
          border
          border-dashed
          border-yellow-200/50
        "
        animate={{
          x: position.x - half + 3,
          y: position.y - half + 3,
          width: size - 6,
          height: size - 6,
          rotate: -360,
          opacity: hovering ? 0.95 : 0.55,
        }}
        transition={{
          x: {
            type: "spring",
            stiffness: 420,
            damping: 30,
          },
          y: {
            type: "spring",
            stiffness: 420,
            damping: 30,
          },
          width: {
            type: "spring",
            stiffness: 350,
            damping: 25,
          },
          height: {
            type: "spring",
            stiffness: 350,
            damping: 25,
          },
          rotate: {
            duration: 3.2,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      />

      {/* ================================================= */}
      {/* MAIN EMBLEM */}
      {/* ================================================= */}

      <motion.div
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[99994]
          flex
          items-center
          justify-center
          rounded-full
          border
          border-orange-200/80
          bg-[radial-gradient(circle_at_35%_30%,rgba(255,247,237,0.95),rgba(253,186,116,0.95)_18%,rgba(234,88,12,0.95)_55%,rgba(124,45,18,0.95)_100%)]
          shadow-[0_0_8px_rgba(251,146,60,0.9),0_0_18px_rgba(249,115,22,0.7),0_0_35px_rgba(234,88,12,0.4)]
        "
        animate={{
          x: position.x - (hovering ? 25 : 20),
          y: position.y - (hovering ? 25 : 20),
          width: hovering ? 50 : 40,
          height: hovering ? 50 : 40,
          scale: clicking ? 0.82 : 1,
          rotate: clicking ? -8 : 0,
        }}
        transition={{
          x: {
            type: "spring",
            stiffness: 500,
            damping: 32,
            mass: 0.18,
          },
          y: {
            type: "spring",
            stiffness: 500,
            damping: 32,
            mass: 0.18,
          },
          width: {
            type: "spring",
            stiffness: 320,
            damping: 24,
          },
          height: {
            type: "spring",
            stiffness: 320,
            damping: 24,
          },
          scale: {
            duration: 0.12,
          },
          rotate: {
            duration: 0.2,
          },
        }}
      >
        {/* ================================================= */}
        {/* CENTER SIGN */}
        {/* ================================================= */}

        <span
          className="
            select-none
            font-serif
            text-[22px]
            font-bold
            leading-none
            text-orange-950
            drop-shadow-[0_0_2px_rgba(255,237,213,0.8)]
          "
        >
          亀
        </span>
      </motion.div>

      {/* ================================================= */}
      {/* SMALL ORBITING PARTICLES */}
      {/* ================================================= */}

      <motion.div
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[99993]
          h-[70px]
          w-[70px]
        "
        animate={{
          x: position.x - 35,
          y: position.y - 35,
          rotate: 360,
        }}
        transition={{
          x: {
            type: "spring",
            stiffness: 350,
            damping: 28,
          },
          y: {
            type: "spring",
            stiffness: 350,
            damping: 28,
          },
          rotate: {
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        <span
          className="
            absolute
            left-1/2
            top-0
            h-1
            w-1
            -translate-x-1/2
            rounded-full
            bg-yellow-200
            shadow-[0_0_7px_rgba(254,240,138,1)]
          "
        />

        <span
          className="
            absolute
            right-1
            top-1/2
            h-1.5
            w-1.5
            -translate-y-1/2
            rounded-full
            bg-orange-300
            shadow-[0_0_7px_rgba(253,186,116,1)]
          "
        />

        <span
          className="
            absolute
            bottom-1
            left-1/2
            h-1
            w-1
            -translate-x-1/2
            rounded-full
            bg-orange-200
            shadow-[0_0_7px_rgba(254,215,170,1)]
          "
        />

        <span
          className="
            absolute
            left-1
            top-1/2
            h-1
            w-1
            -translate-y-1/2
            rounded-full
            bg-yellow-300
            shadow-[0_0_7px_rgba(253,224,71,1)]
          "
        />
      </motion.div>

      {/* ================================================= */}
      {/* CLICK BURST */}
      {/* ================================================= */}

      {clicking && (
        <>
          <motion.div
            className="
              pointer-events-none
              fixed
              left-0
              top-0
              z-[99989]
              rounded-full
              border-2
              border-orange-300/70
            "
            initial={{
              x: position.x - 18,
              y: position.y - 18,
              width: 36,
              height: 36,
              opacity: 0.9,
              scale: 0.4,
            }}
            animate={{
              x: position.x - 55,
              y: position.y - 55,
              width: 110,
              height: 110,
              opacity: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.55,
              ease: "easeOut",
            }}
          />

          <motion.div
            className="
              pointer-events-none
              fixed
              left-0
              top-0
              z-[99988]
              rounded-full
              border
              border-yellow-200/60
            "
            initial={{
              x: position.x - 10,
              y: position.y - 10,
              width: 20,
              height: 20,
              opacity: 1,
            }}
            animate={{
              x: position.x - 65,
              y: position.y - 65,
              width: 130,
              height: 130,
              opacity: 0,
              rotate: 180,
            }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
          />
        </>
      )}
    </>
  );
}
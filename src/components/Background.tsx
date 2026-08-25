"use client";

import React, { useEffect } from "react";

import VideoBackground, {
  VideoBackgroundHandle,
} from "./VideoBackground";

interface BackgroundProps {
  entered: boolean;
  videoRef: React.RefObject<VideoBackgroundHandle | null>;
}

const Background: React.FC<BackgroundProps> = ({
  entered,
  videoRef,
}) => {
  useEffect(() => {
    if (entered) {
      return;
    }

    const canvas = document.getElementById(
      "constellation"
    ) as HTMLCanvasElement | null;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );
    };

    resize();

    /*
     * ============================================================
     * STARS
     * ============================================================
     */

    const stars = Array.from(
      { length: 170 },
      () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.25,
        alpha: Math.random() * 0.55 + 0.15,
        speed: Math.random() * 0.2 + 0.04,
        phase: Math.random() * Math.PI * 2,
      })
    );

    /*
     * ============================================================
     * FLOATING KI PARTICLES
     * ============================================================
     */

    const particles = Array.from(
      { length: 55 },
      () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 2 + 0.4,
        alpha: Math.random() * 0.5 + 0.1,
        phase: Math.random() * Math.PI * 2,
        gold: Math.random() > 0.72,
      })
    );

    /*
     * ============================================================
     * ENERGY MOTES
     * ============================================================
     */

    const energyMotes = Array.from(
      { length: 24 },
      () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: Math.random() * 0.55 + 0.15,
        size: Math.random() * 2.2 + 0.6,
        phase: Math.random() * Math.PI * 2,
      })
    );

    let animationFrame = 0;
    let time = 0;

    /*
     * ============================================================
     * DRAW
     * ============================================================
     */

    const draw = () => {
      time += 0.008;

      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      /*
       * ==========================================================
       * DARK SPACE BACKGROUND
       * ==========================================================
       */

      const background =
        ctx.createRadialGradient(
          width * 0.5,
          height * 0.48,
          0,
          width * 0.5,
          height * 0.48,
          Math.max(width, height) * 0.8
        );

      background.addColorStop(
        0,
        "#10142c"
      );

      background.addColorStop(
        0.35,
        "#080b20"
      );

      background.addColorStop(
        0.7,
        "#030616"
      );

      background.addColorStop(
        1,
        "#01030b"
      );

      ctx.fillStyle = background;

      ctx.fillRect(
        0,
        0,
        width,
        height
      );

      /*
       * ==========================================================
       * MOVING BLUE KI AURA
       * ==========================================================
       */

      const auraX =
        width * 0.5 +
        Math.sin(time * 0.35) *
          width *
          0.22;

      const auraY =
        height * 0.48 +
        Math.cos(time * 0.25) *
          height *
          0.16;

      const aura =
        ctx.createRadialGradient(
          auraX,
          auraY,
          0,
          auraX,
          auraY,
          Math.max(width, height) *
            0.52
        );

      aura.addColorStop(
        0,
        "rgba(59,130,246,0.15)"
      );

      aura.addColorStop(
        0.3,
        "rgba(37,99,235,0.08)"
      );

      aura.addColorStop(
        0.65,
        "rgba(29,78,216,0.025)"
      );

      aura.addColorStop(
        1,
        "rgba(0,0,0,0)"
      );

      ctx.fillStyle = aura;

      ctx.fillRect(
        0,
        0,
        width,
        height
      );

      /*
       * ==========================================================
       * SECONDARY PURPLE AURA
       * ==========================================================
       */

      const purpleX =
        width * 0.5 +
        Math.cos(time * 0.28) *
          width *
          0.25;

      const purpleY =
        height * 0.52 +
        Math.sin(time * 0.2) *
          height *
          0.18;

      const purpleAura =
        ctx.createRadialGradient(
          purpleX,
          purpleY,
          0,
          purpleX,
          purpleY,
          Math.max(width, height) *
            0.45
        );

      purpleAura.addColorStop(
        0,
        "rgba(99,102,241,0.08)"
      );

      purpleAura.addColorStop(
        0.5,
        "rgba(79,70,229,0.035)"
      );

      purpleAura.addColorStop(
        1,
        "rgba(0,0,0,0)"
      );

      ctx.fillStyle = purpleAura;

      ctx.fillRect(
        0,
        0,
        width,
        height
      );

      /*
       * ==========================================================
       * GOLD KI AURA
       * ==========================================================
       */

      const goldX =
        width * 0.5 +
        Math.sin(time * 0.2) *
          width *
          0.28;

      const goldY =
        height * 0.55 +
        Math.cos(time * 0.32) *
          height *
          0.2;

      const goldAura =
        ctx.createRadialGradient(
          goldX,
          goldY,
          0,
          goldX,
          goldY,
          Math.max(width, height) *
            0.32
        );

      goldAura.addColorStop(
        0,
        "rgba(250,204,21,0.055)"
      );

      goldAura.addColorStop(
        0.5,
        "rgba(245,158,11,0.018)"
      );

      goldAura.addColorStop(
        1,
        "rgba(0,0,0,0)"
      );

      ctx.fillStyle = goldAura;

      ctx.fillRect(
        0,
        0,
        width,
        height
      );

      /*
       * ==========================================================
       * ENERGY WAVES
       * ==========================================================
       */

      ctx.save();

      ctx.globalAlpha = 0.18;

      for (let wave = 0; wave < 4; wave++) {
        const centerY =
          height * 0.5 +
          Math.sin(
            time * 0.45 +
              wave * 1.4
          ) *
            height *
            0.08;

        ctx.beginPath();

        for (
          let x = -40;
          x <= width + 40;
          x += 12
        ) {
          const normalized =
            x / width;

          const y =
            centerY +
            Math.sin(
              normalized * Math.PI * 3 +
                time * 1.2 +
                wave
            ) *
              (18 + wave * 5) +
            Math.sin(
              normalized * Math.PI * 7 -
                time * 0.7
            ) *
              8;

          if (x === -40) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle =
          wave % 2 === 0
            ? "rgba(96,165,250,0.8)"
            : "rgba(129,140,248,0.55)";

        ctx.lineWidth =
          wave === 0 ? 1.4 : 0.7;

        ctx.stroke();
      }

      ctx.restore();

      /*
       * ==========================================================
       * OUTER ENERGY RINGS
       * ==========================================================
       */

      ctx.save();

      const ringX =
        width * 0.5 +
        Math.sin(time * 0.3) *
          width *
          0.12;

      const ringY =
        height * 0.5 +
        Math.cos(time * 0.25) *
          height *
          0.08;

      for (let ring = 0; ring < 3; ring++) {
        const radius =
          Math.min(width, height) *
            (0.18 + ring * 0.07) +
          Math.sin(
            time * 0.6 + ring
          ) *
            8;

        ctx.globalAlpha =
          0.08 - ring * 0.015;

        ctx.beginPath();

        ctx.ellipse(
          ringX,
          ringY,
          radius * 1.6,
          radius * 0.42,
          Math.sin(time * 0.15) *
            0.15,
          0,
          Math.PI * 2
        );

        ctx.strokeStyle =
          ring === 1
            ? "rgba(96,165,250,0.7)"
            : "rgba(129,140,248,0.5)";

        ctx.lineWidth = 0.7;

        ctx.stroke();
      }

      ctx.restore();

      /*
       * ==========================================================
       * STARS
       * ==========================================================
       */

      for (const star of stars) {
        const twinkle =
          star.alpha +
          Math.sin(
            time * star.speed * 10 +
              star.phase
          ) *
            0.15;

        ctx.globalAlpha = Math.max(
          0.04,
          twinkle
        );

        ctx.fillStyle = "#dbeafe";

        ctx.beginPath();

        ctx.arc(
          star.x,
          star.y,
          star.size,
          0,
          Math.PI * 2
        );

        ctx.fill();

        star.y +=
          star.speed * 0.06;

        if (star.y > height) {
          star.y = 0;
          star.x =
            Math.random() * width;
        }
      }

      /*
       * ==========================================================
       * FLOATING KI PARTICLES
       * ==========================================================
       */

      ctx.globalAlpha = 1;

      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (
          particle.x < -10 ||
          particle.x > width + 10
        ) {
          particle.vx *= -1;
        }

        if (
          particle.y < -10 ||
          particle.y > height + 10
        ) {
          particle.vy *= -1;
        }

        const pulse =
          particle.alpha +
          Math.sin(
            time * 2 +
              particle.phase
          ) *
            0.15;

        ctx.globalAlpha = Math.max(
          0.04,
          pulse
        );

        ctx.fillStyle = particle.gold
          ? "#facc15"
          : "#60a5fa";

        ctx.beginPath();

        ctx.arc(
          particle.x,
          particle.y,
          particle.size,
          0,
          Math.PI * 2
        );

        ctx.fill();
      }

      /*
       * ==========================================================
       * RISING ENERGY MOTES
       * ==========================================================
       */

      for (const mote of energyMotes) {
        mote.y -= mote.speed;

        mote.x +=
          Math.sin(
            time * 1.4 +
              mote.phase
          ) *
          0.18;

        if (mote.y < -20) {
          mote.y = height + 20;
          mote.x =
            Math.random() * width;
        }

        const pulse =
          0.2 +
          Math.sin(
            time * 2 +
              mote.phase
          ) *
            0.15;

        ctx.globalAlpha = Math.max(
          0.04,
          pulse
        );

        ctx.fillStyle = "#fbbf24";

        ctx.beginPath();

        ctx.arc(
          mote.x,
          mote.y,
          mote.size,
          0,
          Math.PI * 2
        );

        ctx.fill();
      }

      /*
       * ==========================================================
       * VIGNETTE
       * ==========================================================
       */

      ctx.globalAlpha = 1;

      const vignette =
        ctx.createRadialGradient(
          width * 0.5,
          height * 0.5,
          Math.min(width, height) *
            0.15,
          width * 0.5,
          height * 0.5,
          Math.max(width, height) *
            0.78
        );

      vignette.addColorStop(
        0,
        "rgba(0,0,0,0)"
      );

      vignette.addColorStop(
        0.55,
        "rgba(0,0,0,0.08)"
      );

      vignette.addColorStop(
        1,
        "rgba(0,0,0,0.7)"
      );

      ctx.fillStyle = vignette;

      ctx.fillRect(
        0,
        0,
        width,
        height
      );

      ctx.globalAlpha = 1;

      animationFrame =
        requestAnimationFrame(draw);
    };

    draw();

    window.addEventListener(
      "resize",
      resize
    );

    return () => {
      window.removeEventListener(
        "resize",
        resize
      );

      cancelAnimationFrame(
        animationFrame
      );
    };
  }, [entered]);

  return (
    <>
      {/* ========================================================= */}
      {/* DRAGON BALL VIDEO                                         */}
      {/* ========================================================= */}

      <VideoBackground
        ref={videoRef}
        videoName="dragonball"
      />

      {/* ========================================================= */}
      {/* PRE-ENTER ENERGY FIELD                                    */}
      {/* ========================================================= */}

      {!entered && (
        <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
          {/* Dark cinematic tint */}
          <div className="absolute inset-0 bg-[#01030a]/35" />

          {/* Blue Ki */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(59,130,246,0.07),transparent_50%)]" />

          {/* Purple depth */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(99,102,241,0.045),transparent_55%)]" />

          {/* Gold energy */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(250,204,21,0.025),transparent_45%)]" />

          {/* Animated canvas */}
          <canvas
            id="constellation"
            className="absolute inset-0"
          />

          {/* Cinematic vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.12)_55%,rgba(0,0,0,0.65)_100%)]" />

          {/* Top darkness */}
          <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black/50 to-transparent" />

          {/* Bottom darkness */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/65 to-transparent" />
        </div>
      )}
    </>
  );
};

export default Background;
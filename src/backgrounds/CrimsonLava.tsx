"use client";

import { useEffect, useRef } from "react";

type Ember = {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  life: number;
};

type Crack = {
  points: { x: number; y: number }[];
  width: number;
  phase: number;
};

export default function CrimsonLava() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let animationFrame = 0;
    let embers: Ember[] = [];
    let cracks: Crack[] = [];

    const resize = () => {
      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2,
      );

      canvas.width =
        window.innerWidth * dpr;

      canvas.height =
        window.innerHeight * dpr;

      canvas.style.width =
        `${window.innerWidth}px`;

      canvas.style.height =
        `${window.innerHeight}px`;

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0,
      );

      createEmbers();
      createCracks();
    };

    const createEmbers = () => {
      const count = Math.min(
        150,
        Math.max(
          70,
          Math.floor(window.innerWidth / 12),
        ),
      );

      embers = Array.from(
        { length: count },
        () => ({
          x:
            Math.random() *
            window.innerWidth,

          y:
            Math.random() *
            window.innerHeight,

          size:
            Math.random() * 2 +
            0.4,

          speed:
            Math.random() * 0.7 +
            0.2,

          drift:
            (Math.random() - 0.5) *
            0.35,

          life:
            Math.random(),
        }),
      );
    };

    const createCracks = () => {
      cracks = [];

      const count = 18;

      for (let i = 0; i < count; i++) {
        const points: {
          x: number;
          y: number;
        }[] = [];

        let x =
          Math.random() *
          window.innerWidth;

        let y =
          window.innerHeight *
            0.65 +
          Math.random() *
            window.innerHeight *
            0.35;

        const segments =
          Math.floor(
            Math.random() * 5,
          ) + 4;

        for (
          let j = 0;
          j < segments;
          j++
        ) {
          points.push({
            x,
            y,
          });

          x +=
            (Math.random() - 0.5) *
            130;

          y -=
            Math.random() * 45 +
            20;
        }

        cracks.push({
          points,
          width:
            Math.random() * 1.5 +
            0.5,
          phase:
            Math.random() *
            Math.PI *
            2,
        });
      }
    };

    const drawBackground = (
      width: number,
      height: number,
      time: number,
    ) => {
      /*
       * Deep volcanic base
       */

      const base =
        ctx.createLinearGradient(
          0,
          0,
          0,
          height,
        );

      base.addColorStop(
        0,
        "#020000",
      );

      base.addColorStop(
        0.45,
        "#0d0102",
      );

      base.addColorStop(
        0.72,
        "#170202",
      );

      base.addColorStop(
        1,
        "#030000",
      );

      ctx.fillStyle = base;

      ctx.fillRect(
        0,
        0,
        width,
        height,
      );

      /*
       * Massive volcanic glow
       */

      const glow =
        ctx.createRadialGradient(
          width * 0.5,
          height * 0.82,
          0,
          width * 0.5,
          height * 0.82,
          Math.max(
            width,
            height,
          ) * 0.75,
        );

      glow.addColorStop(
        0,
        "rgba(255, 45, 10, 0.28)",
      );

      glow.addColorStop(
        0.2,
        "rgba(190, 20, 5, 0.16)",
      );

      glow.addColorStop(
        0.5,
        "rgba(80, 5, 2, 0.08)",
      );

      glow.addColorStop(
        1,
        "rgba(0, 0, 0, 0)",
      );

      ctx.fillStyle = glow;

      ctx.fillRect(
        0,
        0,
        width,
        height,
      );

      /*
       * Moving lava clouds
       */

      const cloudPositions = [
        {
          x: width * 0.18,
          y: height * 0.75,
          radius: 300,
        },
        {
          x: width * 0.82,
          y: height * 0.8,
          radius: 350,
        },
        {
          x: width * 0.5,
          y: height * 0.95,
          radius: 450,
        },
      ];

      cloudPositions.forEach(
        (cloud, index) => {
          const movement =
            Math.sin(
              time * 0.00015 +
                index,
            ) * 50;

          const gradient =
            ctx.createRadialGradient(
              cloud.x + movement,
              cloud.y,
              0,
              cloud.x + movement,
              cloud.y,
              cloud.radius,
            );

          gradient.addColorStop(
            0,
            "rgba(255, 65, 10, 0.14)",
          );

          gradient.addColorStop(
            0.35,
            "rgba(170, 15, 3, 0.07)",
          );

          gradient.addColorStop(
            1,
            "rgba(0, 0, 0, 0)",
          );

          ctx.fillStyle =
            gradient;

          ctx.fillRect(
            0,
            0,
            width,
            height,
          );
        },
      );
    };

    const drawSmoke = (
      width: number,
      height: number,
      time: number,
    ) => {
      /*
       * Large soft smoke masses.
       */

      for (let i = 0; i < 7; i++) {
        const x =
          width *
          (0.08 + i * 0.14);

        const y =
          height *
          (0.2 + (i % 3) * 0.15);

        const radius =
          180 +
          Math.sin(
            time * 0.00025 + i,
          ) *
            45;

        const gradient =
          ctx.createRadialGradient(
            x,
            y,
            0,
            x,
            y,
            radius,
          );

        gradient.addColorStop(
          0,
          "rgba(70, 25, 20, 0.055)",
        );

        gradient.addColorStop(
          0.6,
          "rgba(30, 8, 8, 0.035)",
        );

        gradient.addColorStop(
          1,
          "rgba(0, 0, 0, 0)",
        );

        ctx.fillStyle =
          gradient;

        ctx.fillRect(
          0,
          0,
          width,
          height,
        );
      }
    };

    const drawCracks = (
      time: number,
    ) => {
      cracks.forEach(
        (crack) => {
          const pulse =
            0.55 +
            Math.sin(
              time * 0.001 +
                crack.phase,
            ) *
              0.3;

          /*
           * Outer glow
           */

          ctx.beginPath();

          crack.points.forEach(
            (point, index) => {
              if (index === 0) {
                ctx.moveTo(
                  point.x,
                  point.y,
                );
              } else {
                ctx.lineTo(
                  point.x,
                  point.y,
                );
              }
            },
          );

          ctx.strokeStyle = `rgba(255, 40, 5, ${
            pulse * 0.18
          })`;

          ctx.lineWidth =
            crack.width * 8;

          ctx.shadowBlur = 25;

          ctx.shadowColor =
            "rgba(255, 45, 5, 0.6)";

          ctx.stroke();

          /*
           * Hot core
           */

          ctx.beginPath();

          crack.points.forEach(
            (point, index) => {
              if (index === 0) {
                ctx.moveTo(
                  point.x,
                  point.y,
                );
              } else {
                ctx.lineTo(
                  point.x,
                  point.y,
                );
              }
            },
          );

          ctx.strokeStyle = `rgba(255, 105, 30, ${
            pulse * 0.85
          })`;

          ctx.lineWidth =
            crack.width;

          ctx.shadowBlur = 8;

          ctx.shadowColor =
            "rgba(255, 55, 5, 0.9)";

          ctx.stroke();

          ctx.shadowBlur = 0;
        },
      );
    };

    const drawEmbers = (
      time: number,
    ) => {
      embers.forEach(
        (ember) => {
          ember.y -=
            ember.speed;

          ember.x +=
            ember.drift +
            Math.sin(
              time * 0.001 +
                ember.y * 0.01,
            ) *
              0.15;

          ember.life +=
            0.004;

          if (
            ember.y < -20
          ) {
            ember.y =
              window.innerHeight +
              20;

            ember.x =
              Math.random() *
              window.innerWidth;
          }

          const pulse =
            0.55 +
            Math.sin(
              ember.life * 8,
            ) *
              0.4;

          ctx.beginPath();

          ctx.arc(
            ember.x,
            ember.y,
            ember.size,
            0,
            Math.PI * 2,
          );

          ctx.fillStyle = `rgba(255, ${
            Math.floor(
              70 +
                ember.size *
                  50,
            )
          }, 25, ${
            pulse * 0.75
          })`;

          ctx.shadowBlur =
            ember.size * 8;

          ctx.shadowColor =
            "rgba(255, 50, 5, 0.8)";

          ctx.fill();

          ctx.shadowBlur = 0;
        },
      );
    };

    const drawVignette = (
      width: number,
      height: number,
    ) => {
      const vignette =
        ctx.createRadialGradient(
          width * 0.5,
          height * 0.55,
          Math.min(
            width,
            height,
          ) * 0.12,
          width * 0.5,
          height * 0.5,
          Math.max(
            width,
            height,
          ) * 0.75,
        );

      vignette.addColorStop(
        0,
        "rgba(0,0,0,0)",
      );

      vignette.addColorStop(
        0.55,
        "rgba(0,0,0,0.12)",
      );

      vignette.addColorStop(
        0.8,
        "rgba(0,0,0,0.45)",
      );

      vignette.addColorStop(
        1,
        "rgba(0,0,0,0.94)",
      );

      ctx.fillStyle =
        vignette;

      ctx.fillRect(
        0,
        0,
        width,
        height,
      );
    };

    const draw = (
      time: number,
    ) => {
      const width =
        window.innerWidth;

      const height =
        window.innerHeight;

      ctx.clearRect(
        0,
        0,
        width,
        height,
      );

      drawBackground(
        width,
        height,
        time,
      );

      drawSmoke(
        width,
        height,
        time,
      );

      drawCracks(
        time,
      );

      drawEmbers(
        time,
      );

      drawVignette(
        width,
        height,
      );

      animationFrame =
        requestAnimationFrame(
          draw,
        );
    };

    resize();

    animationFrame =
      requestAnimationFrame(
        draw,
      );

    window.addEventListener(
      "resize",
      resize,
    );

    return () => {
      window.removeEventListener(
        "resize",
        resize,
      );

      cancelAnimationFrame(
        animationFrame,
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 h-full w-full"
    />
  );
}
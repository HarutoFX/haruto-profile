export type Theme = {
  name: string;
  backgroundType: string; // Added backgroundType

  background: {
    base: string;
    secondary: string;
    glow1: string;
    glow2: string;
    glow3: string;
  };

  accent: string;
  accentRgb: string;
  stars: string;
  starsRgb: string;
  grid: string;
  atmosphere: {
    intensity: number;
    speed: number;
  };
  particles: {
    density: number;
    connectionDistance: number;
    connectionOpacity: number;
    glow: number;
  };
};

export const themes: Theme[] = [
  {
  name: "Crimson",
  backgroundType: "dragonball",
  background: {
    base: "#020000",
    secondary: "#100205",
    glow1: "#5f0710",
    glow2: "#2b0208",
    glow3: "#8f1020",
  },
    accent: "#ef3340",
    accentRgb: "239, 51, 64",
    stars: "#ffd7da",
    starsRgb: "255, 215, 218",
    grid: "rgba(239, 51, 64, 0.035)",
    atmosphere: {
      intensity: 0.18,
      speed: 0.00025,
    },
    particles: {
      density: 1,
      connectionDistance: 145,
      connectionOpacity: 0.13,
      glow: 10,
    },
  },
  {
    name: "Blue",
    backgroundType: "blue-abyss", // Added backgroundType

    background: {
      base: "#010308",
      secondary: "#020a18",
      glow1: "#073b78",
      glow2: "#061a3d",
      glow3: "#0b5ed7",
    },
    accent: "#3b82f6",
    accentRgb: "59, 130, 246",
    stars: "#dbeafe",
    starsRgb: "219, 234, 254",
    grid: "rgba(59, 130, 246, 0.035)",
    atmosphere: {
      intensity: 0.2,
      speed: 0.0002,
    },
    particles: {
      density: 1.05,
      connectionDistance: 155,
      connectionOpacity: 0.14,
      glow: 11,
    },
  },
  {
    name: "Violet",
    backgroundType: "violet-nebula", // Added backgroundType

    background: {
      base: "#030107",
      secondary: "#0b0315",
      glow1: "#4c1d75",
      glow2: "#260b45",
      glow3: "#7e22ce",
    },
    accent: "#8b5cf6",
    accentRgb: "139, 92, 246",
    stars: "#ede9fe",
    starsRgb: "237, 233, 254",
    grid: "rgba(139, 92, 246, 0.035)",
    atmosphere: {
      intensity: 0.19,
      speed: 0.0003,
    },
    particles: {
      density: 1.08,
      connectionDistance: 150,
      connectionOpacity: 0.14,
      glow: 12,
    },
  },
  {
    name: "Cyan",
    backgroundType: "cyan-future", // Added backgroundType

    background: {
      base: "#000405",
      secondary: "#021014",
      glow1: "#075985",
      glow2: "#053b48",
      glow3: "#0891b2",
    },
    accent: "#22d3ee",
    accentRgb: "34, 211, 238",
    stars: "#cffafe",
    starsRgb: "207, 250, 254",
    grid: "rgba(34, 211, 238, 0.04)",
    atmosphere: {
      intensity: 0.2,
      speed: 0.00022,
    },
    particles: {
      density: 1.1,
      connectionDistance: 160,
      connectionOpacity: 0.15,
      glow: 12,
    },
  },
  {
    name: "Emerald",
    backgroundType: "emerald-hacker", // Added backgroundType

    background: {
      base: "#000402",
      secondary: "#021009",
      glow1: "#065f46",
      glow2: "#022c20",
      glow3: "#059669",
    },
    accent: "#10b981",
    accentRgb: "16, 185, 129",
    stars: "#d1fae5",
    starsRgb: "209, 250, 229",
    grid: "rgba(16, 185, 129, 0.035)",
    atmosphere: {
      intensity: 0.19,
      speed: 0.00028,
    },
    particles: {
      density: 1.12,
      connectionDistance: 150,
      connectionOpacity: 0.14,
      glow: 11,
    },
  },
  {
    name: "Amber",
    backgroundType: "amber-desert", // Added backgroundType

    background: {
      base: "#050300",
      secondary: "#140a01",
      glow1: "#78350f",
      glow2: "#451a03",
      glow3: "#d97706",
    },
    accent: "#f59e0b",
    accentRgb: "245, 158, 11",
    stars: "#fef3c7",
    starsRgb: "254, 243, 199",
    grid: "rgba(245, 158, 11, 0.035)",
    atmosphere: {
      intensity: 0.18,
      speed: 0.00024,
    },
    particles: {
      density: 0.95,
      connectionDistance: 140,
      connectionOpacity: 0.12,
      glow: 10,
    },
  },
  {
    name: "Magenta",
    backgroundType: "magenta-cyberpunk", // Added backgroundType

    background: {
      base: "#050004",
      secondary: "#13020f",
      glow1: "#831843",
      glow2: "#4a044e",
      glow3: "#db2777",
    },
    accent: "#ec4899",
    accentRgb: "236, 72, 153",
    stars: "#fce7f3",
    starsRgb: "252, 231, 243",
    grid: "rgba(236, 72, 153, 0.035)",
    atmosphere: {
      intensity: 0.21,
      speed: 0.0003,
    },
    particles: {
      density: 1.08,
      connectionDistance: 150,
      connectionOpacity: 0.14,
      glow: 12,
    },
  },
  {
    name: "Ice",
    backgroundType: "ice-world", // Added backgroundType

    background: {
      base: "#030405",
      secondary: "#0a0d10",
      glow1: "#334155",
      glow2: "#1e293b",
      glow3: "#94a3b8",
    },
    accent: "#e5e7eb",
    accentRgb: "229, 231, 235",
    stars: "#ffffff",
    starsRgb: "255, 255, 255",
    grid: "rgba(229, 231, 235, 0.035)",
    atmosphere: {
      intensity: 0.14,
      speed: 0.00018,
    },
    particles: {
      density: 0.9,
      connectionDistance: 135,
      connectionOpacity: 0.09,
      glow: 8,
    },
  },
  {
    name: "Cosmic",
    backgroundType: "cosmic-black-hole", // Added backgroundType

    background: {
      base: "#01020a",
      secondary: "#05051a",
      glow1: "#312e81",
      glow2: "#1e1b4b",
      glow3: "#6366f1",
    },
    accent: "#818cf8",
    accentRgb: "129, 140, 248",
    stars: "#e0e7ff",
    starsRgb: "224, 231, 255",
    grid: "rgba(129, 140, 248, 0.03)",
    atmosphere: {
      intensity: 0.23,
      speed: 0.00016,
    },
    particles: {
      density: 1.2,
      connectionDistance: 165,
      connectionOpacity: 0.16,
      glow: 13,
    },
  },
];

export const defaultTheme = themes[0];


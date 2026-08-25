"use client";

import React, { useEffect, useState } from "react";
import { themes } from "@/config/themes";

const ThemeSwitcher: React.FC = () => {
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

  const applyTheme = (index: number) => {
    const theme = themes[index];

    document.documentElement.style.setProperty(
      "--background-color",
      theme.background.base
    );

    document.documentElement.style.setProperty(
      "--accent-color",
      theme.accent
    );

    document.documentElement.style.setProperty(
      "--stars-color",
      theme.stars
    );

    document.documentElement.style.setProperty(
      "--grid-color",
      theme.grid
    );

    document.documentElement.style.setProperty(
      "--glow1-color",
      theme.background.glow1
    );

    document.documentElement.style.setProperty(
      "--glow2-color",
      theme.background.glow2
    );

    document.documentElement.style.setProperty(
      "--glow3-color",
      theme.background.glow3
    );

    document.documentElement.style.setProperty(
      "--background-type",
      theme.backgroundType
    );

    setCurrentThemeIndex(index);
  };

  useEffect(() => {
    applyTheme(0);
  }, []);

  const changeTheme = (index: number) => {
    applyTheme(index);
  };

  return (
    <div>
      {themes.map((theme, index) => (
        <button
          key={theme.name}
          onClick={() => changeTheme(index)}
          aria-pressed={currentThemeIndex === index}
        >
          {theme.name}
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/theme-provider";
import { FiSun, FiMoon, FiCpu, FiWind } from "react-icons/fi";
import styles from "./theme-selector.module.css";

const themes = [
  { id: "light" as const, name: "Light", color: "#ffffff", border: "#e5e7eb", icon: <FiSun />, iconColor: "#f59e0b" }, // Amber/Sun color
  { id: "dark" as const, name: "Dark", color: "#0f172a", border: "#1e293b", icon: <FiMoon />, iconColor: "#94a3b8" },
  { id: "cyberpunk" as const, name: "Cyberpunk", color: "#0a0014", border: "#ff00ff", icon: <FiCpu />, iconColor: "#ff00ff" },
  { id: "ocean" as const, name: "Ocean", color: "#000a14", border: "#00708c", icon: <FiWind />, iconColor: "#00d1ff" },
];

export default function ThemeSelector({ onSelect }: { onSelect?: () => void }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setMounted(true);
    });
  }, []);

  const handleSelect = (id: typeof themes[number]["id"]) => {
    setTheme(id);
    if (onSelect) {
      setTimeout(() => onSelect(), 150); // Small delay for visual feedback
    }
  };

  return (
    <div className={styles.selector}>
      <h4 className={styles.title}>Select Theme</h4>
      <div className={styles.grid}>
        {themes.map((t) => {
          const isActive = mounted && theme === t.id;

          return (
            <button
              key={t.id}
              className={`${styles.themeBtn} ${isActive ? styles.active : ""}`}
              onClick={() => handleSelect(t.id)}
              aria-label={`Switch to ${t.name} theme`}
            >
              <div
                className={styles.preview}
                style={{ backgroundColor: t.color, borderColor: t.border }}
              >
                <div className={styles.iconOverlay} style={{ color: t.iconColor }}>{t.icon}</div>
              </div>
              <span className={styles.name}>{t.name}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTheme"
                  className={styles.activeRing}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

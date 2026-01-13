"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/theme-provider";
import styles from "./theme-selector.module.css";

const themes = [
  { id: "light" as const, name: "Light", color: "#ffffff", border: "#e5e7eb" },
  { id: "dark" as const, name: "Dark", color: "#1f2937", border: "#374151" },
  { id: "cyberpunk" as const, name: "Cyberpunk", color: "#0a0014", border: "#ff00ff" },
  { id: "ocean" as const, name: "Ocean", color: "#000a14", border: "#00708c" },
];

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setMounted(true);
    });
  }, []);

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
              onClick={() => setTheme(t.id)}
              aria-label={`Switch to ${t.name} theme`}
            >
              <div 
                className={styles.preview} 
                style={{ backgroundColor: t.color, borderColor: t.border }}
              />
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

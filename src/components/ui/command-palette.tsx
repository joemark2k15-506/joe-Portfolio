"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command } from "cmdk";
import { FiHome, FiBriefcase, FiUser, FiCode, FiMail, FiSun, FiMoon, FiDownload } from "react-icons/fi";
import { useTheme } from "@/components/theme-provider";
import styles from "./command-palette.module.css";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const navigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
  };

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume.txt";
    link.download = "Joe_Mark_Resume.txt";
    link.click();
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <div className={styles.container}>
            <motion.div
              className={styles.palette}
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <Command className={styles.command}>
                <div className={styles.inputWrapper}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                  <Command.Input
                    placeholder="Type a command or search..."
                    className={styles.input}
                  />
                </div>
                <Command.List className={styles.list}>
                  <Command.Empty className={styles.empty}>No results found.</Command.Empty>

                  <Command.Group heading="Navigation" className={styles.group}>
                    <Command.Item onSelect={() => navigate("home")} className={styles.item}>
                      <FiHome />
                      <span>Home</span>
                    </Command.Item>
                    <Command.Item onSelect={() => navigate("work")} className={styles.item}>
                      <FiBriefcase />
                      <span>Projects</span>
                    </Command.Item>
                    <Command.Item onSelect={() => navigate("about")} className={styles.item}>
                      <FiUser />
                      <span>About</span>
                    </Command.Item>
                    <Command.Item onSelect={() => navigate("skills")} className={styles.item}>
                      <FiCode />
                      <span>Skills</span>
                    </Command.Item>
                    <Command.Item onSelect={() => navigate("contact")} className={styles.item}>
                      <FiMail />
                      <span>Contact</span>
                    </Command.Item>
                  </Command.Group>

                  <Command.Separator className={styles.separator} />

                  <Command.Group heading="Actions" className={styles.group}>
                    <Command.Item
                      onSelect={() => {
                        toggleTheme();
                        setOpen(false);
                      }}
                      className={styles.item}
                    >
                      {theme === "dark" ? <FiSun /> : <FiMoon />}
                      <span>Toggle Theme</span>
                      <kbd className={styles.kbd}>T</kbd>
                    </Command.Item>
                    <Command.Item onSelect={downloadResume} className={styles.item}>
                      <FiDownload />
                      <span>Download Resume</span>
                      <kbd className={styles.kbd}>D</kbd>
                    </Command.Item>
                  </Command.Group>
                </Command.List>

                <div className={styles.footer}>
                  <kbd className={styles.kbd}>ESC</kbd> to close
                  <span className={styles.divider}>•</span>
                  <kbd className={styles.kbd}>↑</kbd>
                  <kbd className={styles.kbd}>↓</kbd> to navigate
                </div>
              </Command>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

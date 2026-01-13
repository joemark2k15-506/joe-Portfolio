"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useTheme } from "@/components/theme-provider";
import ThemeSelector from "@/components/ui/theme-selector";
import { FiDownload } from "react-icons/fi";
import styles from "./navbar.module.css";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#career-journey", label: "Journey" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    requestAnimationFrame(() => {
      setMounted(true);
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map((link) => link.href.substring(1));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleResumeDownload = () => {
    const link = document.createElement("a");
    link.href = "/Joe-Resume.pdf?v=20260113";
    link.download = "Joe-Mark-M-Resume.pdf";
    link.click();
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <motion.div 
        className={styles.progressBar} 
        style={{ scaleX }}
      />
      
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <motion.span 
            className="gradient-text"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Portfolio
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <ul className={`${styles.navLinks} ${styles.desktop}`}>
          {navLinks.map((link) => (
            <li key={link.href} className={styles.navItem}>
              <button
                onClick={() => handleNavClick(link.href)}
                className={`${styles.navLink} ${
                  activeSection === link.href.substring(1) ? styles.active : ""
                }`}
              >
                {link.label}
                {activeSection === link.href.substring(1) && (
                  <motion.div
                    layoutId="activeSection"
                    className={styles.activeIndicator}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Theme & Resume */}
        <div className={styles.rightActions}>
          <motion.button
            className={styles.resumeButton}
            onClick={handleResumeDownload}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiDownload className={styles.resumeIcon} />
            <span>Resume</span>
          </motion.button>

          <div className={styles.themeSelectorWrapper}>
            <motion.button
              onClick={toggleTheme}
              className={styles.themeToggle}
              aria-label="Toggle theme"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              {!mounted ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                </svg>
              ) : theme === "light" ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : theme === "dark" ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : theme === "cyberpunk" ? (
                <span style={{ fontSize: '18px' }}>🤖</span>
              ) : (
                <span style={{ fontSize: '18px' }}>🌊</span>
              )}
            </motion.button>
            
            <div className={styles.themeSelectorPopover}>
              <ThemeSelector />
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`${styles.hamburger} ${styles.mobile}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={mobileMenuOpen ? styles.open : ""}></span>
          <span className={mobileMenuOpen ? styles.open : ""}></span>
          <span className={mobileMenuOpen ? styles.open : ""}></span>
        </button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className={`${styles.mobileMenu} ${styles.open}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ul className={styles.mobileNavLinks}>
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className={`${styles.mobileNavLink} ${
                        activeSection === link.href.substring(1) ? styles.active : ""
                      }`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
              <div className={styles.mobileResumeWrapper}>
                <button 
                  className={styles.mobileResumeBtn}
                  onClick={handleResumeDownload}
                >
                  <FiDownload />
                  Download Resume
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

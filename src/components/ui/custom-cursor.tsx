"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import styles from "./custom-cursor.module.css";
import { usePathname } from "next/navigation";

export default function CustomCursor() {
  const [cursorVariant, setCursorVariant] = useState("default");
  const pathname = usePathname();

  // Use MotionValues for high-performance updates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Snappy spring for Pop-Art feel
  const springConfig = { damping: 20, stiffness: 300, mass: 0.2 };
  const followerX = useSpring(mouseX, springConfig);
  const followerY = useSpring(mouseY, springConfig);

  // Center the cursor and follower
  const cursorX = useTransform(mouseX, (x) => x - 6); // 12px / 2 = 6
  const cursorY = useTransform(mouseY, (y) => y - 6);

  const followerXCentered = useTransform(followerX, (x) => x - 22); // 44px / 2 = 22
  const followerYCentered = useTransform(followerY, (y) => y - 22);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", mouseMove);

    // Initial positioning
    const handleInitialMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      followerX.set(e.clientX);
      followerY.set(e.clientY);
      window.removeEventListener("mousemove", handleInitialMove);
    };
    window.addEventListener("mousemove", handleInitialMove, { once: true });

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, [mouseX, mouseY, followerX, followerY]);

  // Handle route changes
  useEffect(() => {
    setCursorVariant("default");
  }, [pathname]);

  // Handle hover states
  useEffect(() => {
    const handleMouseEnter = () => setCursorVariant("hover");
    const handleMouseLeave = () => setCursorVariant("default");

    const selectors = "a, button, .hoverable, [role='button'], input, textarea, select";
    const links = document.querySelectorAll(selectors);

    links.forEach((link) => {
      link.addEventListener("mouseenter", handleMouseEnter);
      link.addEventListener("mouseleave", handleMouseLeave);
    });

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const newLinks = (mutation.target as Element).querySelectorAll(selectors);
          newLinks.forEach((link) => {
            link.removeEventListener("mouseenter", handleMouseEnter);
            link.removeEventListener("mouseleave", handleMouseLeave);
            link.addEventListener("mouseenter", handleMouseEnter);
            link.addEventListener("mouseleave", handleMouseLeave);
          });
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleMouseEnter);
        link.removeEventListener("mouseleave", handleMouseLeave);
      });
      observer.disconnect();
    };
  }, [pathname]);

  const variants = {
    default: {
      scale: 1,
      rotate: 0,
      backgroundColor: "white",
    },
    hover: {
      scale: 1.3,
      rotate: 0,
      backgroundColor: "white",
    },
  };

  const followerVariants = {
    default: {
      scale: 1,
      opacity: 1,
      backgroundColor: "transparent",
      borderWidth: "1px",
      borderColor: "rgba(255, 255, 255, 0.6)",
    },
    hover: {
      scale: 1.5,
      opacity: 1,
      backgroundColor: "transparent",
      borderColor: "var(--accent)",
    },
  };

  return (
    <>
      <motion.div
        className={styles.cursorFollower}
        style={{
          x: followerXCentered,
          y: followerYCentered,
        }}
        variants={followerVariants}
        animate={cursorVariant}
      />

      <motion.div
        className={styles.cursor}
        style={{
          x: cursorX,
          y: cursorY,
        }}
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
    </>
  );
}

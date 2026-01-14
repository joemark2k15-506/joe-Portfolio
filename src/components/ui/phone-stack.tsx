"use client";

import { motion, Easing } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./phone-stack.module.css";

interface PhoneStackProps {
  screenshots: string[];
  alt: string;
}

export default function PhoneStack({ screenshots, alt }: PhoneStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (screenshots.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % screenshots.length);
      }, 3000); // 3 seconds per slide
      return () => clearInterval(interval);
    }
  }, [screenshots.length]);

  const getVariant = (screenIndex: number) => {
    const total = screenshots.length;
    const relativeIndex = (screenIndex - currentIndex + total) % total;

    // Smooth transition config
    const transition = {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
      mass: 1,
    };

    // 0 = Center
    // 1 = Left
    // 2 = Right
    // 3 = Far Left
    // Others = Hidden

    if (relativeIndex === 0) {
      // CENTER
      return {
        animate: { y: 0, x: 0, scale: 1, opacity: 1, zIndex: 30, rotateZ: 0 },
        transition
      };
    } else if (relativeIndex === 1) {
      // LEFT
      return {
        animate: { x: -80, y: 15, rotateZ: -12, scale: 0.9, opacity: 0.8, zIndex: 20 },
        transition
      };
    } else if (relativeIndex === 2) {
      // RIGHT
      return {
        animate: { x: 80, y: 15, rotateZ: 12, scale: 0.9, opacity: 0.8, zIndex: 20 },
        transition
      };
    } else if (relativeIndex === 3) {
      // FAR LEFT / BOTTOM
      return {
        animate: { x: -160, y: 30, rotateZ: -18, scale: 0.8, opacity: 0.6, zIndex: 10 },
        transition
      };
    } else {
      // HIDDEN
      return {
        animate: { x: 0, y: -50, scale: 0, opacity: 0, zIndex: 0 },
        transition
      };
    }
  };

  return (
    <div className={styles.stackContainer}>
      {screenshots.map((src, index) => (
        <motion.div
          key={src} // Key is src, allowing smooth movement
          className={styles.phoneFrame}
          {...getVariant(index)}
          style={{ position: 'absolute' }}
        >
          <div className={styles.notch} />
          <div className={styles.screen}>
            <Image
              src={src}
              alt={`${alt} screen ${index + 1}`}
              fill
              className={styles.image}
              unoptimized
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

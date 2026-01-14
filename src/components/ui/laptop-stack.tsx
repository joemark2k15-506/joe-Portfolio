"use client";

import { motion, Easing } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./laptop-stack.module.css";

interface LaptopStackProps {
  screenshots: string[];
  alt: string;
}

export default function LaptopStack({ screenshots, alt }: LaptopStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (screenshots.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % screenshots.length);
      }, 3000); // 3 seconds per slide for smoother feel
      return () => clearInterval(interval);
    }
  }, [screenshots.length]);

  const getVariant = (screenIndex: number) => {
    // Calculate relative position in the cycle
    // We want 3 actives: Center (0), Left (1), Right (2)
    // The previous implementation logic was static slots, now we want rotating slots.
    
    const total = screenshots.length;
    // relative index: how far this screen is from current index
    const relativeIndex = (screenIndex - currentIndex + total) % total;

    // We define 3 visible slots.
    // 0 = Center
    // 1 = Right (Next)
    // total - 1 = Left (Previous)
    
    // Smooth transition config
    const transition = {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
      mass: 1,
    };

    if (relativeIndex === 0) {
      // CENTER
      return {
        animate: { 
          x: 0, 
          y: 0, 
          z: 100, 
          scale: 1, 
          opacity: 1, 
          zIndex: 30 
        },
        transition
      };
    } else if (relativeIndex === 1) {
      // RIGHT (Next in line)
      return {
        animate: { 
          x: 140, 
          y: -20, 
          z: 0, 
          scale: 0.85, 
          opacity: 0.7, 
          zIndex: 20 
        },
        transition
      };
    } else if (relativeIndex === total - 1) {
      // LEFT (Previous)
      return {
        animate: { 
          x: -140, 
          y: -20, 
          z: 0, 
          scale: 0.85, 
          opacity: 0.7, 
          zIndex: 20 
        },
        transition
      };
    } else {
      // HIDDEN / BACK
      return {
        animate: { 
          x: 0, 
          y: -40, 
          z: -100, 
          scale: 0.7, 
          opacity: 0, 
          zIndex: 10 
        },
        transition
      };
    }
  };

  return (
    <div className={styles.stackContainer}>
      {screenshots.map((src, index) => (
        <motion.div
          key={src} // Key is src, so the laptop moves with the image
          className={styles.laptopFrame}
          {...getVariant(index)}
          style={{ position: 'absolute' }} // Ensure absolute positioning
        >
          <div className={styles.laptopBody}>
            <div className={styles.screen}>
              <Image
                src={src}
                alt={`${alt} screen ${index + 1}`}
                fill
                className={styles.image}
                unoptimized
              />
            </div>
            <div className={styles.notch} />
          </div>
          <div className={styles.base} />
        </motion.div>
      ))}
    </div>
  );
}

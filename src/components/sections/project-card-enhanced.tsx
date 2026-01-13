"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import DeviceMockup from "@/components/ui/device-mockup";
import styles from "./projects.module.css";

interface ProjectCardEnhancedProps {
  project: {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    technologies: string[];
    link: string;
  };
}

export default function ProjectCardEnhanced({ project }: ProjectCardEnhancedProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isFlipped) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const angleX = (y - centerY) / 10;
    const angleY = (centerX - x) / 10;
    setRotateX(angleX);
    setRotateY(angleY);
  };

  const handleMouseLeave = () => {
    setIsFlipped(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div 
      className={styles.cardWrapper}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className={styles.cardInner}
        initial={false}
        animate={{ 
          rotateY: isFlipped ? 180 : rotateY,
          rotateX: isFlipped ? 0 : rotateX,
          z: isFlipped ? 50 : 0
        }}
        transition={{ 
          rotateY: { type: "spring", stiffness: isFlipped ? 100 : 300, damping: 20 },
          rotateX: { type: "spring", stiffness: 300, damping: 20 },
          z: { duration: 0.3 }
        }}
        style={{ transformStyle: "preserve-3d", position: "relative" }}
      >
        {/* Front Face */}
        <div className={styles.cardFront}>
          <div className={styles.mockupContainer}>
            <DeviceMockup 
              type={project.tags.includes("Mobile") ? "phone" : "laptop"}
              screenshot={project.image}
              alt={project.title}
            />
          </div>
          <div className={styles.frontContent}>
            <h3>{project.title}</h3>
            <div className={styles.tags}>
              {project.tags.map(tag => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
            <div className={styles.flipHint}>
              <span>Hover to flip for details</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 11a8.1 8.1 0 0 0-15.5-2m-.5-4v4h4" />
                <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Back Face */}
        <div className={styles.cardBack}>
          <div className={styles.backContent}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            
            <div className={styles.techStack}>
              <h4>Technologies</h4>
              <div className={styles.techGrid}>
                {project.technologies.map(tech => (
                  <span key={tech} className={styles.techItem}>{tech}</span>
                ))}
              </div>
            </div>

            <motion.a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.viewProjectBtn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View on GitHub
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

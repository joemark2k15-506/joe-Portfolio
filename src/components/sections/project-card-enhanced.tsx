"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import DeviceMockup from "@/components/ui/device-mockup";
import PhoneStack from "@/components/ui/phone-stack";
import LaptopStack from "@/components/ui/laptop-stack";
import { Project } from "@/lib/data";
import styles from "./projects.module.css";

interface ProjectCardEnhancedProps {
  project: Project;
}

export default function ProjectCardEnhanced({ project }: ProjectCardEnhancedProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // Slideshow removed in favor of LaptopStack
  
  const displayedScreenshot = project.image;

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
            {project.screenshots && project.screenshots.length > 1 ? (
              project.tags.includes("Mobile") ? (
                <PhoneStack 
                  screenshots={project.screenshots} 
                  alt={project.title} 
                />
              ) : (
                <LaptopStack 
                  screenshots={project.screenshots} 
                  alt={project.title} 
                />
              )
            ) : (
              <DeviceMockup 
                type={project.tags.includes("Mobile") ? "phone" : "laptop"}
                screenshot={displayedScreenshot}
                alt={project.title}
              />
            )}
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
                {project.technologies.slice(0, 6).map(tech => (
                  <span key={tech} className={styles.techItem}>{tech}</span>
                ))}
              </div>
            </div>

            <div className={styles.actions}>
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href={`/work/${project.slug}`}
                  className={styles.viewProjectBtn}
                >
                  View Case Study
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

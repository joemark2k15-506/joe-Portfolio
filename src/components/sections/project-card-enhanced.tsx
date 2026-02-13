"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { Project } from "@/lib/data";
import styles from "./projects.module.css";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export default function ProjectCardEnhanced({ project, onClick }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mouse Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth Springs for Tilt (Damped for premium feel)
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  // 1. Card Rotation (Tilt)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

  // 2. Parallax Layers (Z-Axis movement)
  // Image pops out
  const imgZ = useTransform(isHovered ? mouseX : x, [-0.5, 0.5], ["30px", "30px"]);
  // Content pops out even more
  const contentZ = useTransform(isHovered ? mouseX : x, [-0.5, 0.5], ["60px", "60px"]);

  // Slideshow Logic
  const allImages = [project.image, ...(project.screenshots || [])];
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered && allImages.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
      }, 1500);
    } else {
      setCurrentImageIndex(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, allImages.length]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const xPct = (e.clientX - rect.left) / width - 0.5;
    const yPct = (e.clientY - rect.top) / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`${styles.card3DContainer} cursor-pointer`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1200,
      }}
    >
      <motion.div
        className={styles.cardBody}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Layer 0: Background Plane */}
        <div className={styles.cardBg} />

        {/* Layer 1: Image Mockup (Floating) */}
        <motion.div
          className={styles.imageContainer3D}
          style={{
            transform: "translateZ(30px)",
            transformStyle: "preserve-3d",
            z: imgZ // Parallax lift
          }}
        >
          <div className={styles.imagePerspective}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{ width: "100%", height: "100%", position: "absolute" }}
                layoutId={`project-image-${project.id}`}
              >
                <Image
                  src={allImages[currentImageIndex]}
                  alt={project.title}
                  fill
                  className={styles.projectImage}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            </AnimatePresence>

            {/* Progress Dots */}
            <div className={styles.slideshowProgress} style={{ opacity: isHovered ? 1 : 0 }}>
              {allImages.map((_, i) => (
                <div key={i} className={`${styles.progressDot} ${i === currentImageIndex ? styles.activeDot : ""}`} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Layer 2: Content (Separated & Floating High) */}
        <motion.div
          className={styles.cardContent}
          style={{
            transform: "translateZ(60px)",
            transformStyle: "preserve-3d",
            z: contentZ // Parallax lift
          }}
        >
          <div className={styles.tags}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>

          <h3 className={styles.title}>{project.title}</h3>
          <p className={styles.subtitle}>{project.subtitle}</p>

          <div className={styles.footer}>
            <Link
              href={`/work/${project.slug}`}
              className={styles.viewLink}
              onClick={(e) => e.stopPropagation()}
            >
              Case Study
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.githubLink}
              onClick={(e) => e.stopPropagation()}
            >
              <FaGithub />
            </a>
          </div>
        </motion.div>

      </motion.div>
    </motion.div>
  );
}

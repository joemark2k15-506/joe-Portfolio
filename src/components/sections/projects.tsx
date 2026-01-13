"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ProjectCardEnhanced from "./project-card-enhanced";
import styles from "./projects.module.css";

type ProjectTag = "All" | "Web" | "Mobile" | "Design";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: ProjectTag[];
  technologies: string[];
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Consumer Goods Seller",
    description: "User-friendly e-commerce interface with modular React components for smooth navigation, dynamic product catalog with real-time content rendering, and mobile-first responsive design approach.",
    image: "/projects/project1.svg",
    tags: ["Web"],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB"],
    link: "https://github.com/joemark2k15-506/electric-shop",
  },
  {
    id: 2,
    title: "Vibe Player",
    description: "Ultra-performance audio player optimized for local high-fidelity audio playback with real-time FFmpeg transcoding for M4A/ALAC/FLAC formats and smooth 60fps UI animations on Android 12+.",
    image: "/projects/project2.svg",
    tags: ["Mobile"],
    technologies: ["React Native", "Expo", "TypeScript", "FFmpeg"],
    link: "https://github.com/joemark2k15-506/vibe-Player",
  },
  {
    id: 3,
    title: "Smart Inventory ERP",
    description: "Enterprise-grade inventory management system with automated stock tracking, real-time analytics dashboard, and secure multi-role authentication. Optimized for high-concurrency database operations.",
    image: "/projects/project3.svg",
    tags: ["Web"],
    technologies: ["Java", "Spring Boot", "Hibernate", "PostgreSQL"],
    link: "https://github.com/joemark2k15-506",
  },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectTag>("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.tags.includes(activeFilter));

  return (
    <section id="work" className={`${styles.projects} section`}>
      <div className="container">
        <div className={styles.header}>
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            A showcase of my recent work and creative explorations
          </motion.p>
        </div>

        <motion.div 
          className={styles.filters}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {(["All", "Web", "Mobile", "Design"] as ProjectTag[]).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`${styles.filterBtn} ${
                activeFilter === filter ? styles.active : ""
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        <div className={styles.grid}>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCardEnhanced project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

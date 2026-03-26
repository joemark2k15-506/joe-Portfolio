"use client";

import { motion } from "framer-motion";
import { useState, useMemo, useCallback } from "react";
import ProjectCardEnhanced from "./project-card-enhanced";
import ProjectModal from "@/components/ui/project-modal";
import styles from "./projects.module.css";
import { Project, ProjectTag, projects as featuredProjects } from "@/lib/data";
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectTag>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const allProjects = featuredProjects;

  const handleProjectClick = useCallback((project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300); // Wait for exit animation
  }, []);

  const filteredProjects = useMemo(() => {
    return activeFilter === "All"
      ? allProjects
      : allProjects.filter((project) => project.tags.includes(activeFilter));
  }, [activeFilter, allProjects]);

  return (
    <section id="work" className={`${styles.projects} section w-full overflow-hidden`}>
      <div className="w-full max-w-6xl mx-auto px-6">
        <div className={styles.header}>
          <motion.h2
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            My <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            A showcase of my recent work and technical experiments
          </motion.p>
        </div>

        <motion.div
          className={styles.filters}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {(["All", "Web", "Mobile", "Design"] as ProjectTag[]).map(
            (filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`${styles.filterBtn} ${activeFilter === filter ? styles.active : ""
                  }`}
              >
                {filter}
              </button>
            )
          )}
        </motion.div>

        <div className={styles.grid}>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <ProjectCardEnhanced
                project={project}
                onClick={() => handleProjectClick(project)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal
        selectedProject={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useState, useMemo, useCallback, useEffect } from "react";
import ProjectCardEnhanced from "./project-card-enhanced";
import ProjectModal from "@/components/ui/project-modal";
import styles from "./projects.module.css";
import { Project, ProjectTag, projects as featuredProjects } from "@/lib/data";
import { getGitHubRepos, GitHubRepo } from "@/lib/github-api";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectTag>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allProjects, setAllProjects] = useState<Project[]>(featuredProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const githubRepos = await getGitHubRepos();
        
        // Map GitHub repos to Project interface
        const dynamicProjects: Project[] = githubRepos.map((repo: GitHubRepo) => {
          // Check if this repo is already in featuredProjects (by githubUrl)
          const existing = featuredProjects.find(fp => 
            fp.githubUrl.toLowerCase().includes(repo.name.toLowerCase())
          );
          
          if (existing) {
            // Update featured project with real stats if needed
            return {
              ...existing,
              title: repo.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
              description: repo.description || existing.description,
            };
          }

          // Create new project object for other repos
          return {
            id: repo.id,
            slug: repo.name,
            title: repo.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            subtitle: repo.language || "Project",
            description: repo.description || "A project exploring modern web technologies and software engineering principles.",
            image: "/project-placeholder.png", // Default placeholder
            screenshots: [],
            tags: [(repo.language === "TypeScript" || repo.language === "JavaScript" ? "Web" : "All") as ProjectTag],
            technologies: repo.language ? [repo.language] : [],
            link: repo.html_url,
            githubUrl: repo.html_url,
            type: "web",
            challenge: "Developing a robust solution while following industry best practices.",
            solution: "Implemented efficient logic and clean code architecture.",
            features: ["Open Source", "Clean Code"],
          };
        });

        // Merge and remove duplicates (preferring mapping result)
        setAllProjects(dynamicProjects);
      } catch (error) {
        console.error("Failed to fetch GitHub projects:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

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
    <section id="work" className={`${styles.projects} section`}>
      <div className="container">
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
            Real-time showcase of my actual GitHub repositories
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

        {loading ? (
          <div className="flex justify-center p-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : (
          <>
            <motion.div
              className={styles.counterBadge}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              style={{ justifyContent: "center" }}
            >
              <strong>{filteredProjects.length}</strong> Repositories Found
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
          </>
        )}
      </div>

      <ProjectModal
        selectedProject={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
}

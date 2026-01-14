"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaGithub, FaArrowLeft, FaTools, FaLightbulb, FaCheckCircle } from "react-icons/fa";
import { projects } from "@/lib/data";
import styles from "./page.module.css";

export default function CaseStudy({ slug }: { slug: string }) {
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.5]);

  return (
    <main className={styles.main}>
      {/* Navigation Back */}
      <nav className={styles.nav}>
        <Link href="/#work" className={styles.backLink}>
          <FaArrowLeft /> Back to Projects
        </Link>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.div 
            className={styles.heroText}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className={styles.category}>{project.tags.join(" • ")}</span>
            <h1 className={styles.title}>{project.title}</h1>
            <p className={styles.subtitle}>{project.subtitle}</p>
            
            <div className={styles.actions}>
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.primaryBtn}
              >
                <FaGithub /> View Source
              </a>
              {/* Optional: Add Live Demo button if link is different */}
            </div>
          </motion.div>

          <motion.div 
            className={styles.heroImageWrapper}
            style={{ y: heroY, opacity: heroOpacity }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className={styles.heroImageContainer}>
               {/* Use the first screenshot or main image as hero */}
              <Image
                src={project.image}
                alt={project.title}
                fill
                className={styles.heroImage}
                priority
              />
              <div className={styles.overlay} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case Study Content */}
      <div className={styles.contentContainer}>
        
        {/* Challenge & Solution Grid */}
        <div className={styles.grid}>
          <motion.section 
            className={styles.section}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className={styles.iconWrapper}>
              <FaLightbulb />
            </div>
            <h2>The Challenge</h2>
            <p>{project.challenge}</p>
          </motion.section>

          <motion.section 
            className={styles.section}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className={styles.iconWrapper}>
              <FaTools />
            </div>
            <h2>The Solution</h2>
            <p>{project.solution}</p>
          </motion.section>
        </div>

        {/* Tech Stack */}
        <motion.section 
          className={styles.techSection}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3>Technologies Used</h3>
          <div className={styles.techTags}>
            {project.technologies.map((tech) => (
              <span key={tech} className={styles.techTag}>
                {tech}
              </span>
            ))}
          </div>
        </motion.section>

        {/* Key Features */}
        <motion.section 
          className={styles.featuresSection}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3>Key Features</h3>
          <div className={styles.featuresGrid}>
            {project.features.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <FaCheckCircle className={styles.checkIcon} />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Gallery / Screenshots */}
        <section className={styles.gallery}>
          <h3>Project Gallery</h3>
          <div className={styles.galleryGrid}>
            {project.screenshots.map((shot, index) => (
              <motion.div 
                key={index} 
                className={styles.galleryItem}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Image
                  src={shot}
                  alt={`${project.title} screenshot ${index + 1}`}
                  width={600}
                  height={400}
                  className={styles.screenshot}
                />
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}

"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  FaGraduationCap,
  FaBriefcase,
  FaCode
} from "react-icons/fa";
import styles from "./career-journey.module.css";

interface Milestone {
  id: string;
  year: string;
  title: string;
  role: string;
  description: string;
  technologies: string[];
  type: "education" | "work" | "project";
}

const milestones: Milestone[] = [
  {
    id: "current",
    year: "2026 → Present",
    title: "Building Modern Web Apps",
    role: "Full Stack Engineer",
    description: "Architecting scalable production-ready applications with Next.js 15, React 19, and Server Actions. Focusing on performance, accessibility, and premium UI/UX.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind", "Node.js"],
    type: "work",
  },
  {
    id: "training",
    year: "Jun - Nov 2025",
    title: "Apollo Computer Education",
    role: "Advanced Full Stack Trainee",
    description: "Intensive training in Enterprise Java Development and MERN Stack architecture. Built complex e-commerce and management systems.",
    technologies: ["Java", "Spring Boot", "Hibernate", "Microservices"],
    type: "education",
  },
  {
    id: "mca",
    year: "2023 - 2025",
    title: "Arul Anandar College",
    role: "Master of Computer Applications",
    description: "Specialized in Software Engineering and Advanced Database Management. Achieved 75.9% academic excellence.",
    technologies: ["Data Structures", "Algorithms", "System Design"],
    type: "education",
  },
  {
    id: "internship",
    year: "Sep - Oct 2024",
    title: "XYLOINC Technologies",
    role: "Full Stack Intern",
    description: "Developed and deployed key modules for client applications. Collaborated with senior developers to implement real-time features.",
    technologies: ["MERN Stack", "Socket.io", "Redux", "REST APIs"],
    type: "work",
  },
  {
    id: "bcom",
    year: "2019 - 2022",
    title: "NMS SVN College",
    role: "B.Com (Computer Applications)",
    description: "Bridged the gap between business logic and technical implementation. Foundation in commerce and application development.",
    technologies: ["Business Logic", "Accounting", "SQL"],
    type: "education",
  },
];

const MilestoneCard = ({ milestone, index }: { milestone: Milestone; index: number }) => {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      className={styles.milestone}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Date Label (Opposite Side) */}
      <div className={styles.dateLabel}>{milestone.year}</div>

      {/* Center Node */}
      <div className={styles.timelineNode} />

      {/* Content Card */}
      <div className={styles.contentWrapper}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.iconBox}>
              {milestone.type === "work" && <FaBriefcase />}
              {milestone.type === "education" && <FaGraduationCap />}
              {milestone.type === "project" && <FaCode />}
            </div>
            <div>
              <h3 className={styles.roleTitle}>{milestone.role}</h3>
              <div className={styles.orgName}>{milestone.title}</div>
            </div>
          </div>

          <p className={styles.description}>{milestone.description}</p>

          <div className={styles.techStack}>
            {milestone.technologies.slice(0, 4).map(tech => (
              <span key={tech} className={styles.techPill}>{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function CareerJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="career-journey" className={styles.careerJourney} ref={containerRef}>
      <div className="container">
        <div className={styles.header}>
          <motion.h2
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            My <span className="gradient-text">Journey</span>
          </motion.h2>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            A timeline of my professional growth and technical milestones
          </motion.p>
        </div>

        <div className={styles.timelineWrapper}>
          {/* Central Beam Line */}
          <div className={styles.beamLine}>
            <motion.div
              className={styles.beamProgress}
              style={{ scaleY, height: "100%" }}
            />
          </div>

          <div className={styles.startMarker} />

          {/* Milestones */}
          {milestones.map((milestone, index) => (
            <MilestoneCard
              key={milestone.id}
              milestone={milestone}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

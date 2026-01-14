"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  FaGraduationCap, 
  FaBriefcase, 
  FaCode, 
  FaRocket,
  FaReact,
  FaNode,
  FaJava,
  FaDatabase,
  FaGitAlt
} from "react-icons/fa";
import { 
  SiMongodb, 
  SiExpress, 
  SiSpringboot, 
  SiHibernate,
  SiTypescript,
  SiTailwindcss
} from "react-icons/si";
import styles from "./career-journey.module.css";

interface Milestone {
  id: string;
  period: string;
  phase: string;
  title: string;
  organization: string;
  description: string;
  technologies: string[];
  type: "education" | "work" | "project" | "skill";
  link?: string;
  ctaText?: string;
}

// Reversed order: oldest to newest (bottom to top journey)
const milestones: Milestone[] = [
  {
    id: "destination",
    period: "2026 →",
    phase: "🎯 Current Focus",
    title: "Building Production-Ready Applications",
    organization: "Modern Full Stack Development",
    description: "Crafting scalable, performant web applications with modern tech stacks and best practices.",
    technologies: ["React", "TypeScript", "Node", "MongoDB", "Tailwind"],
    type: "project",
  },
  {
    id: "highway-2",
    period: "Jun - Nov 2025",
    phase: "⚡ Advanced Training",
    title: "Advanced Full Stack Training",
    organization: "Apollo Computer Education, Madurai",
    description: "Deep-dive into enterprise Java (Spring Boot, Hibernate) and modern MERN architectures.",
    technologies: ["Spring Boot", "Hibernate", "React", "Node", "Tailwind"],
    type: "work",
  },
  {
    id: "acceleration",
    period: "2023 - 2025",
    phase: "🎓 Academic Excellence",
    title: "Master of Computer Applications",
    organization: "Arul Anandar College, Madurai",
    description: "Specializing in advanced software engineering and architectural patterns. 75.9% academic performance.",
    technologies: ["Java", "React", "Node", "Database", "Git"],
    type: "education",
  },
  {
    id: "highway-1",
    period: "Sep - Oct 2024",
    phase: "🛣️ Industry Experience",
    title: "Full Stack Engineer Intern",
    organization: "XYLOINC Technologies, Coimbatore",
    description: "Internship during MCA. Architected scalable MERN modules with real-time data synchronization.",
    technologies: ["MongoDB", "Express", "React", "Node", "TypeScript"],
    type: "work",
  },
  {
    id: "learning-1",
    period: "2019 - 2022",
    phase: "📚 Foundation",
    title: "B.Com (Computer Applications)",
    organization: "NMS SVN College, Madurai",
    description: "Bridging commerce and technology with database management and commercial systems.",
    technologies: ["Database", "SQL"],
    type: "education",
  },
  {
    id: "start",
    period: "2017 - 2018",
    phase: "🚦 Beginning",
    title: "Higher Secondary Education",
    organization: "St. Britto Hr. Sec. School, Madurai",
    description: "Foundation in computer science and mathematics. The beginning of the tech journey.",
    technologies: [],
    type: "education",
  },
];

const techIcons: Record<string, React.ReactElement> = {
  React: <FaReact />,
  Node: <FaNode />,
  Java: <FaJava />,
  Database: <FaDatabase />,
  Git: <FaGitAlt />,
  MongoDB: <SiMongodb />,
  Express: <SiExpress />,
  "Spring Boot": <SiSpringboot />,
  Hibernate: <SiHibernate />,
  TypeScript: <SiTypescript />,
  Tailwind: <SiTailwindcss />,
  SQL: <FaDatabase />,
};

const MilestoneCard = ({ 
  milestone, 
  index 
}: { 
  milestone: Milestone; 
  index: number 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Ultra-smooth spring animations for 60-90fps
  const rawOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const rawScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.85, 1, 1, 0.85]);
  const rawY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);

  // Use spring for buttery smooth motion
  const opacity = useSpring(rawOpacity, { stiffness: 200, damping: 30, mass: 0.5 });
  const scale = useSpring(rawScale, { stiffness: 200, damping: 30, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 200, damping: 30, mass: 0.5 });

  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      className={`${styles.milestoneCard} ${isLeft ? styles.left : styles.right}`}
      style={{ opacity, scale, y }}
    >
      <div className={styles.cardContent}>
        <div className={styles.contentBody}>
          <span className={styles.phase}>{milestone.phase}</span>
          <span className={styles.period}>{milestone.period}</span>
          <h3 className={styles.title}>{milestone.title}</h3>
          <h4 className={styles.organization}>{milestone.organization}</h4>
          <p className={styles.description}>{milestone.description}</p>
          
          {milestone.technologies.length > 0 && (
            <div className={styles.techStack}>
              {milestone.technologies.map((tech) => (
                <div key={tech} className={styles.techIcon} title={tech}>
                  {techIcons[tech] || <FaCode />}
                </div>
              ))}
            </div>
          )}

          {milestone.link && (
            <a href={milestone.link} className={styles.cta} target="_blank" rel="noopener noreferrer">
              {milestone.ctaText || "View Details"} →
            </a>
          )}
        </div>
      </div>

      <div className={styles.markerWrapper}>
        <div className={styles.marker}>
          {milestone.type === "education" && <FaGraduationCap />}
          {milestone.type === "work" && <FaBriefcase />}
          {milestone.type === "project" && <FaRocket />}
          {milestone.type === "skill" && <FaCode />}
        </div>
      </div>
    </motion.div>
  );
};

export default function CareerJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);
  
  // Initialize reduced motion from system preference
  const [isReducedMotion, setIsReducedMotion] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  // Listen for changes to reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Road animation (subtle parallax)
  const roadY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  if (isReducedMotion) {
    // Fallback to static timeline for reduced motion
    return (
      <section id="career-journey" className={styles.careerJourney}>
        <div className="container">
          <div className={styles.header}>
            <h2 className={styles.sectionTitle}>
              Career <span className="gradient-text">Journey</span>
            </h2>
            <p className={styles.subtitle}>
              A roadmap of my technical evolution and professional milestones
            </p>
          </div>

          <div className={styles.staticTimeline}>
            {milestones.map((milestone) => (
              <div key={milestone.id} className={styles.staticMilestone}>
                <div className={styles.staticMarker}>
                  {milestone.type === "education" && <FaGraduationCap />}
                  {milestone.type === "work" && <FaBriefcase />}
                  {milestone.type === "project" && <FaRocket />}
                </div>
                <div className={styles.staticContent}>
                  <span className={styles.phase}>{milestone.phase}</span>
                  <span className={styles.period}>{milestone.period}</span>
                  <h3 className={styles.title}>{milestone.title}</h3>
                  <h4 className={styles.organization}>{milestone.organization}</h4>
                  <p className={styles.description}>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="career-journey" className={styles.careerJourney} ref={containerRef}>
      <div className="container">
        <div className={styles.header}>
          <motion.h2 
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Career <span className="gradient-text">Journey</span>
          </motion.h2>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            A roadmap of my technical evolution and professional milestones
          </motion.p>
        </div>

        <div className={styles.journeyWrapper}>
          {/* Road */}
          <motion.div 
            className={styles.road} 
            ref={roadRef}
            style={{ y: roadY }}
          >
            <div className={styles.roadTexture} />
            <div className={styles.laneMarkers} />
          </motion.div>

          {/* Milestones */}
          <div className={styles.milestonesContainer}>
            {milestones.map((milestone, index) => (
              <MilestoneCard 
                key={milestone.id} 
                milestone={milestone} 
                index={index} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

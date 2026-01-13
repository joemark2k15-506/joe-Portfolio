"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { FaGraduationCap, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import styles from "./timeline.module.css";

interface TimelineItem {
  id: number;
  year: string;
  title: string;
  organization: string;
  description: string;
  type: "education" | "work";
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    year: "2023 - 2025",
    title: "Master of Computer Applications",
    organization: "Arul Anandar College, Madurai",
    description: "Specializing in advanced software engineering and architectural patterns. Maintaining a high academic standard of 75.9% while exploring cutting-edge technologies.",
    type: "education",
  },
  {
    id: 2,
    year: "Sep - Oct 2024",
    title: "Full Stack Engineer Intern",
    organization: "XYLOINC Technologies, Coimbatore",
    description: "Architected and implemented scalable modules using the MERN stack. Focused on real-time data synchronization and high-performance React architectures.",
    type: "work",
  },
  {
    id: 3,
    year: "6 Month Intensive",
    title: "Advanced Full Stack Training",
    organization: "Apollo Computer Education, Madurai",
    description: "Deep-dive into enterprise Java (Spring Boot, Hibernate) and modern MERN architectures. Crafted production-ready applications with component-driven UI.",
    type: "work",
  },
  {
    id: 4,
    year: "2019 - 2022",
    title: "B.Com (Computer Applications)",
    organization: "NMS SVN College, Madurai",
    description: "Bridging commerce and technology. Graduated with 68.5% with a focus on database management and commercial software systems.",
    type: "education",
  },
  {
    id: 5,
    year: "2017 - 2018",
    title: "Higher Secondary Education",
    organization: "St. Britto Hr. Sec. School, Madurai",
    description: "Completed secondary education with focused studies in computer science and mathematics.",
    type: "education",
  },
  {
    id: 6,
    year: "2015 - 2016",
    title: "Secondary Education",
    organization: "St. Britto Hr. Sec. School, Madurai",
    description: "Foundational academic training with a strong emphasis on logical reasoning and basic computing.",
    type: "education",
  },
];

const TimelineCard = ({ item, index }: { item: TimelineItem; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const rawRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const rotateX = useSpring(rawRotateX, { stiffness: 100, damping: 30 });
  const opacity = useSpring(rawOpacity, { stiffness: 100, damping: 30 });
  const scale = useSpring(rawScale, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={cardRef}
      className={`${styles.item} ${index % 2 === 0 ? styles.left : styles.right}`}
      style={{
        rotateX,
        opacity,
        scale,
      }}
    >
      <div className={styles.marker}>
        <div className={styles.markerIcon}>
          {item.type === "education" ? <FaGraduationCap /> : <FaBriefcase />}
        </div>
      </div>
      <div className={styles.content}>
        <span className={styles.year}>
          <FaCalendarAlt size={12} />
          {item.year}
        </span>
        <h3 className={styles.itemTitle}>{item.title}</h3>
        <h4 className={styles.org}>{item.organization}</h4>
        <p className={styles.description}>{item.description}</p>
      </div>
    </motion.div>
  );
};

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const beamScaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="timeline" className={styles.timeline}>
      <div className="container" ref={containerRef}>
        <div className={styles.header}>
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            Temporal <span className="gradient-text">Voyage</span>
          </motion.h2>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            A high-fidelity chronicle of professional evolution and academic excellence.
          </motion.p>
        </div>

        <div className={styles.container}>
          <div className={styles.beamGlow}></div>
          <motion.div 
            className={styles.beam}
            style={{ scaleY: beamScaleY, originY: 0 }}
          />
          {timelineData.map((item, index) => (
            <TimelineCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useRef, useCallback } from "react";
import {
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiMongodb,
  SiSpringboot,
  SiExpo,
  SiExpress,
  SiMysql,
  SiNetlify,
  SiTailwindcss,
  SiFirebase,
  SiPostman
} from "react-icons/si";
import { FaJava, FaGithub, FaDocker } from "react-icons/fa6";
import styles from "./skills.module.css";

interface Skill {
  name: string;
  category: string;
  level: number;
  icon: React.ReactNode;
  color: string;
}

const skills: Skill[] = [
  { name: "MERN Stack", category: "Full Stack", level: 90, icon: <div className={styles.mernIcons}><SiMongodb /><SiExpress /><SiReact /><SiNodedotjs /></div>, color: "#61DAFB" },
  { name: "Java Full Stack", category: "Full Stack", level: 85, icon: <FaJava />, color: "#ED8B00" },

  { name: "React.js", category: "Frontend", level: 88, icon: <SiReact />, color: "#61DAFB" },
  { name: "TypeScript", category: "Frontend", level: 82, icon: <SiTypescript />, color: "#3178C6" },
  { name: "Tailwind CSS", category: "Frontend", level: 90, icon: <SiTailwindcss />, color: "#38B2AC" },

  { name: "Node.js", category: "Backend", level: 85, icon: <SiNodedotjs />, color: "#339933" },
  { name: "Express.js", category: "Backend", level: 85, icon: <SiExpress />, color: "var(--text-primary)" },
  { name: "MongoDB", category: "Backend", level: 82, icon: <SiMongodb />, color: "#47A248" },
  { name: "MySQL", category: "Backend", level: 80, icon: <SiMysql />, color: "#4479A1" },

  { name: "React Native", category: "Mobile", level: 80, icon: <SiReact />, color: "#61DAFB" },
  { name: "Expo", category: "Mobile", level: 85, icon: <SiExpo />, color: "var(--text-primary)" },

  { name: "Git & GitHub", category: "Tools", level: 90, icon: <FaGithub />, color: "#F05032" },
  { name: "Docker", category: "Tools", level: 75, icon: <FaDocker />, color: "#2496ED" },
  { name: "Postman", category: "Tools", level: 85, icon: <SiPostman />, color: "#FF6C37" },
  { name: "Netlify", category: "Tools", level: 85, icon: <SiNetlify />, color: "#00C7B7" },
];

function HoloCard({ skill, index }: { skill: Skill; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (max ±15 degrees)
    const rotateY = ((x - centerX) / centerX) * 15;
    const rotateX = ((centerY - y) / centerY) * 15;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={styles.cardWrapper}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: 0.08 + index * 0.06,
        type: "spring",
        stiffness: 180,
        damping: 16,
      }}
      style={{ "--brand-color": skill.color } as React.CSSProperties}
    >
      <div className={styles.card}>
        {/* Scan-line overlay */}
        <div className={styles.scanLines} />

        {/* Orbital glow ring */}
        <div className={styles.orbitalRing} />

        {/* Particle dots */}
        <div className={styles.particles} />

        {/* Floating icon */}
        <div className={styles.iconZone}>
          <div className={styles.icon}>{skill.icon}</div>
        </div>

        {/* Skill name */}
        <div className={styles.skillName}>{skill.name}</div>

        {/* Proficiency bar */}
        <div className={styles.proficiencyBar}>
          <motion.div
            className={styles.proficiencyFill}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: skill.level / 100 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 + index * 0.05, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Neon floor glow */}
      <div className={styles.floorGlow} />
    </motion.div>
  );
}

export default function Skills() {
  const categories = ["Full Stack", "Frontend", "Backend", "Mobile", "Tools"];

  return (
    <section id="skills" className={`${styles.skills} section`}>
      <div className="container">
        <div className={styles.header}>
          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Technical <span className="gradient-text">Arsenal</span>
          </motion.h2>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            A comprehensive overview of my technical skills and proficiency levels
          </motion.p>
        </div>

        {categories.map((category) => (
          <div key={category} className={styles.category}>
            <motion.h3
              className={styles.categoryTitle}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {category}
            </motion.h3>

            <div className={styles.grid}>
              {skills
                .filter((skill) => skill.category === category)
                .map((skill, index) => (
                  <HoloCard key={skill.name} skill={skill} index={index} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

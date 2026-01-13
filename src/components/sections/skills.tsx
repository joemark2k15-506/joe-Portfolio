"use client";

import { motion } from "framer-motion";
import { 
  SiReact, 
  SiTypescript, 
  SiNodedotjs, 
  SiMongodb, 
  SiSpringboot, 
  SiExpo, 
  SiExpress,
  SiMysql,
  SiNetlify
} from "react-icons/si";
import { FaJava, FaGithub } from "react-icons/fa6";
import styles from "./skills.module.css";

interface Skill {
  name: string;
  category: string;
  level: number;
  icon: React.ReactNode;
  color: string;
}

const skills: Skill[] = [
  {
    name: "MERN Stack",
    category: "Full Stack",
    level: 90,
    icon: <div className={styles.mernIcons}>
      <SiMongodb title="MongoDB" />
      <SiExpress title="Express" />
      <SiReact title="React" />
      <SiNodedotjs title="Node.js" />
    </div>,
    color: "#61DAFB",
  },
  {
    name: "Java Full Stack",
    category: "Full Stack",
    level: 85,
    icon: <FaJava />,
    color: "#ED8B00",
  },
  {
    name: "Spring Boot",
    category: "Full Stack",
    level: 80,
    icon: <SiSpringboot />,
    color: "#6DB33F",
  },
  {
    name: "React.js",
    category: "Frontend",
    level: 88,
    icon: <SiReact />,
    color: "#61DAFB",
  },
  {
    name: "TypeScript",
    category: "Frontend",
    level: 82,
    icon: <SiTypescript />,
    color: "#3178C6",
  },
  {
    name: "Node.js",
    category: "Backend",
    level: 85,
    icon: <SiNodedotjs />,
    color: "#339933",
  },
  {
    name: "MongoDB",
    category: "Backend",
    level: 82,
    icon: <SiMongodb />,
    color: "#47A248",
  },
  {
    name: "React Native",
    category: "Mobile",
    level: 80,
    icon: <SiReact />,
    color: "#61DAFB",
  },
  {
    name: "Expo",
    category: "Mobile",
    level: 85,
    icon: <SiExpo />,
    color: "#0081ff",
  },
  {
    name: "Git & GitHub",
    category: "Tools",
    level: 90,
    icon: <FaGithub />,
    color: "#F05032",
  },

  {
    name: "Netlify",
    category: "Tools",
    level: 85,
    icon: <SiNetlify />,
    color: "#00C7B7",
  },
  {
    name: "MySQL",
    category: "Backend",
    level: 80,
    icon: <SiMysql />,
    color: "#4479A1",
  },
];

export default function Skills() {
  const categories = [...new Set(skills.map((skill) => skill.category))];

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
            Skills & <span className="gradient-text">Expertise</span>
          </motion.h2>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Technologies and tools verified from my professional background
          </motion.p>
        </div>

        {categories.map((category, catIndex) => (
          <div key={category} className={styles.category}>
            <motion.h3 
              className={styles.categoryTitle}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + catIndex * 0.1 }}
            >
              {category}
            </motion.h3>
            <div className={styles.grid}>
              {skills
                .filter((skill) => skill.category === category)
                .map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className={`${styles.card} glass`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    style={{ "--brand-color": skill.color } as React.CSSProperties}
                  >
                    <div className={styles.iconWrapper}>{skill.icon}</div>
                    <div className={styles.skillName}>{skill.name}</div>
                  </motion.div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

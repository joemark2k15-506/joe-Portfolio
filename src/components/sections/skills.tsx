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
  { name: "Spring Boot", category: "Full Stack", level: 80, icon: <SiSpringboot />, color: "#6DB33F" },

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

        {categories.map((category, catIndex) => (
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
                  <motion.div
                    key={skill.name}
                    className={styles.hexagonWrapper}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: 0.1 + index * 0.05,
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                    style={{ "--brand-color": skill.color } as React.CSSProperties}
                  >
                    <div className={styles.proficiencyRing} />
                    <div className={styles.hexagon}>
                      <div className={styles.icon}>{skill.icon}</div>
                    </div>
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

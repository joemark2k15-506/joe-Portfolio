"use client";

import { motion } from "framer-motion";
import styles from "./skill-bar.module.css";

interface SkillBarProps {
  name: string;
  level: number;
  index: number;
}

export default function SkillBar({ name, level, index }: SkillBarProps) {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <span className={styles.name}>{name}</span>
      </div>
      <div className={styles.track}>
        <motion.div
          className={styles.bar}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 + index * 0.1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

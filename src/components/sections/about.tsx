"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./about.module.css";

interface Stat {
  label: string;
  value: number;
  suffix: string;
}

const stats: Stat[] = [
  { label: "Months Internship", value: 1, suffix: "" },
  { label: "Projects Completed", value: 2, suffix: "" },
  { label: "Technologies", value: 10, suffix: "+" },
];

export default function About() {
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="about" ref={sectionRef} className={`${styles.about} section`}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.imageSection}>
            <motion.div
              className={styles.imageWrapper}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/myimg1.png?v=20260113"
                alt="Joe Mark M"
                width={800}
                height={800}
                className={styles.profileImage}
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  height: "auto",
                  objectFit: "contain",
                  border: "5px solid rgba(139, 92, 246, 0.4)",
                  borderRadius: "20px",
                  padding: "1px",
                  background: "rgba(255, 255, 255, 0.08)",
                  boxShadow:
                    "0 20px 50px rgba(139, 92, 246, 0.3), 0 0 30px rgba(139, 92, 246, 0.1)",
                }}
                priority
              />
              <div className={styles.floatingOrb1}></div>
              <div className={styles.floatingOrb2}></div>
            </motion.div>
          </div>

          <div className={styles.content}>
            <motion.h2
              className={styles.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              About <span className="gradient-text">Me</span>
            </motion.h2>

            <motion.div
              className={styles.text}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p>
                I&apos;m currently pursuing my{" "}
                <strong className="gradient-text-accent">
                  Master of Computer Applications (MCA)
                </strong>{" "}
                at Arul Anandar College, Madurai (2023-2025), maintaining an
                impressive academic record of{" "}
                <strong className="gradient-text-accent">75.9%</strong>. I hold
                a{" "}
                <strong className="gradient-text-accent">
                  Bachelor of Commerce (Computer Applications)
                </strong>{" "}
                from Nadar Mahajan Sangam S. Vellaichamy Nadar College with{" "}
                <strong className="gradient-text-accent">68.5%</strong>.
              </p>

              <p>
                I completed a professional{" "}
                <strong className="gradient-text-accent">
                  MERN Stack internship
                </strong>{" "}
                at XYLOINC Technologies Pvt. Ltd., Coimbatore, where I focused
                on building functional application modules and gaining hands-on
                experience in developing scalable, real-time web applications.
              </p>

              <p>
                My expertise spans both the <strong className="gradient-text-accent">MERN Stack</strong> and <strong className="gradient-text-accent">Java Full Stack</strong> development. I completed an intensive training at <strong className="gradient-text-accent">Apollo Computer Education</strong> (Jun - Nov 2025), mastering Java, Spring Boot, and building scalable full-stack applications.
              </p>

              <p>
                I am passionate about creating technical solutions that are
                architecturally sound and deliver exceptional user experiences,
                with a recent focus on high-performance mobile applications like{" "}
                <strong className="gradient-text-accent">Vibe Player</strong>.
              </p>
            </motion.div>

            <div className={styles.stats}>
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className={styles.stat}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  onViewportEnter={() => {
                    // Start counter animation when stat comes into view
                    let current = 0;
                    const increment = stat.value / 50;
                    const timer = setInterval(() => {
                      current += increment;
                      if (current >= stat.value) {
                        current = stat.value;
                        clearInterval(timer);
                      }
                      setCounts((prev) => {
                        const newCounts = [...prev];
                        newCounts[index] = Math.floor(current);
                        return newCounts;
                      });
                    }, 30);
                  }}
                >
                  <div className={styles.statValue}>
                    {counts[index]}
                    {stat.suffix}
                  </div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="/Joe-Resume.pdf?v=20260113"
              download="Joe-Mark-M-Resume.pdf"
              className={styles.resumeBtn}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              Download Resume
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </motion.a>

            {/* GitHub Stats planned for future development */}
          </div>
        </div>
      </div>
    </section>
  );
}

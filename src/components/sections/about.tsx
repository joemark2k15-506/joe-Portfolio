"use client";

import { useRef, useEffect } from "react";
import { motion, useSpring, useInView, useTransform, useMotionValue } from "framer-motion";
import Image from "next/image";
import GitHubStats from "./github-stats";
import { FaCode, FaServer, FaMobileAlt, FaBriefcase, FaLaptopCode, FaCubes } from "react-icons/fa";
import styles from "./about.module.css";

interface Stat {
  label: string;
  value: number;
  suffix: string;
  icon: React.ReactNode;
}

const stats: Stat[] = [
  { label: "Months Internship", value: 1, suffix: "", icon: <FaBriefcase /> },
  { label: "Projects Built", value: 2, suffix: "", icon: <FaLaptopCode /> },
  { label: "Technologies", value: 10, suffix: "+", icon: <FaCubes /> },
];

function Counter({ value, suffix, delay }: { value: number; suffix: string; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const springValue = useSpring(0, {
    mass: 1,
    stiffness: 50,
    damping: 20,
    duration: 2
  });

  const displayValue = useTransform(springValue, (current) => Math.floor(current));

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        springValue.set(value);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, value, delay, springValue]);

  return (
    <motion.div
      ref={ref}
      className={styles.statValue}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className={`${styles.about} section`}>
      <div className="container">
        <div className={styles.grid}>
          {/* Left — Profile Image + Specialty Cards */}
          <div className={styles.imageSection}>
            <motion.div
              className={styles.imageWrapper}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            >
              <div className={styles.imageGlow} />
              <div className={styles.blobFrame}>
                <Image
                  src="/pro-2.jpg"
                  alt="Joe Mark M"
                  width={400}
                  height={400}
                  className={styles.profileImage}
                  priority
                />
              </div>
            </motion.div>

            {/* Specialty Cards */}
            <motion.div
              className={styles.specialtyCards}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {[
                { icon: <FaCode />, label: "Frontend" },
                { icon: <FaServer />, label: "Backend" },
                { icon: <FaMobileAlt />, label: "Mobile" },
              ].map((spec) => (
                <div key={spec.label} className={styles.specialtyCard}>
                  <div className={styles.specialtyIcon}>{spec.icon}</div>
                  <div className={styles.specialtyLabel}>{spec.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Content */}
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

            {/* Stats Row */}
            <div className={styles.stats}>
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className={styles.stat}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <div className={styles.statIcon}>{stat.icon}</div>
                  <Counter value={stat.value} suffix={stat.suffix} delay={0.4 + index * 0.1} />
                  <div className={styles.statLabel}>{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="/Joe-Resume.pdf?v=20260114-force-v2"
              download="Joe-Mark-M-Resume.pdf"
              className={styles.resumeBtn}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              Download Resume
              <svg
                width="18"
                height="18"
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

            <GitHubStats />
          </div>
        </div>
      </div>
    </section>
  );
}

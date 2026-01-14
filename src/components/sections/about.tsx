"use client";

import { useRef, useEffect } from "react";
import { motion, useSpring, useInView, useTransform, useMotionValue } from "framer-motion";
import Image from "next/image";
import GitHubStats from "./github-stats";
import { FaCode, FaLayerGroup } from "react-icons/fa";
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

function Counter({ value, suffix, delay }: { value: number; suffix: string; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const springValue = useSpring(0, {
    mass: 1,
    stiffness: 50,
    damping: 20,
    duration: 2
  });
  
  // Create a display value that rounds the spring value
  const displayValue = useTransform(springValue, (current) => Math.floor(current));

  useEffect(() => {
    if (isInView) {
      // Add a small delay matching the entrance animation
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
  const sectionRef = useRef<HTMLElement>(null);
  
  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [5, -5]); // Reduced rotation for elegance
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);
  
  // Shine effect - Linear sweep
  const shineX = useTransform(x, [-100, 100], [-100, 200]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section id="about" ref={sectionRef} className={`${styles.about} section`}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.imageSection}>
            <motion.div
              className={styles.imageWrapper}
              style={{ 
                rotateX, 
                rotateY,
                perspective: 1000
              }}
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className={styles.imageContainer}>
                {/* Layer 1: Deep Grid Background */}
                <motion.div 
                  className={styles.parallaxBack}
                  style={{
                    x: useTransform(x, [-100, 100], [-40, 40]),
                    y: useTransform(y, [-100, 100], [-40, 40]),
                  }}
                />

                {/* Layer 2: Main Image */}
                <div style={{ position: "relative", zIndex: 5, width: "100%", height: "100%", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                  <Image
                    src="/profile.png"
                    alt="Joe Mark M"
                    width={800}
                    height={800}
                    unoptimized
                    className={styles.profileImage}
                    priority
                  />
                </div>

                {/* Layer 3: Glass Foreground Frame */}
                <motion.div 
                  className={styles.glassFrame}
                  style={{
                    x: useTransform(x, [-100, 100], [20, -20]),
                    y: useTransform(y, [-100, 100], [20, -20]),
                  }}
                >
                  <motion.div 
                    className={styles.shine}
                    style={{
                      background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 45%, rgba(255,255,255,0.0) 50%)`,
                      x: shineX,
                      opacity: 0.8
                    }}
                  />
                </motion.div>

                {/* Layer 4: Floating Badges (Float above everything) */}
                <motion.div 
                  className={styles.floatingBadge}
                  style={{ 
                    top: "15%", 
                    left: "-15%", 
                    rotate: -5,
                    z: 60,
                    x: useTransform(x, [-100, 100], [40, -40]),
                    y: useTransform(y, [-100, 100], [20, -20])
                  }}
                >
                  <FaCode />
                  <span>Full Stack</span>
                </motion.div>

                <motion.div 
                  className={styles.floatingBadge}
                  style={{ 
                    bottom: "20%", 
                    right: "-15%", 
                    rotate: 5,
                    z: 50,
                    x: useTransform(x, [-100, 100], [30, -30]),
                    y: useTransform(y, [-100, 100], [-20, 20])
                  }}
                >
                  <FaLayerGroup />
                  <span>Architect</span>
                </motion.div>
              </div>
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
                <div key={stat.label} className={styles.stat}>
                  <Counter value={stat.value} suffix={stat.suffix} delay={0.4 + index * 0.1} />
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
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

            <GitHubStats />
          </div>
        </div>
      </div>
    </section>
  );
}

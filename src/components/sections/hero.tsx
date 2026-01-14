"use client";

import { motion } from "framer-motion";
import styles from "./hero.module.css";
import ParticleBackground from "@/components/effects/particle-background";
import AnimatedText from "@/components/ui/animated-text";
import MagneticButton from "@/components/ui/magnetic-button";

export default function Hero() {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToWork = () => {
    const workSection = document.getElementById("work");
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className={styles.hero}>
      <ParticleBackground />
      
      <div className={styles.content}>
        <motion.div 
          className={styles.textContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className={styles.title}>
            <motion.span 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Hi, I&apos;m
            </motion.span>
            <br />
            <span className={`gradient-text ${styles.name}`}>Joe Mark M</span>
          </h1>
          
          <div className={styles.subtitleWrapper}>
            <AnimatedText 
              sequences={[
                "Aspiring Software Engineer",
                2000,
                "MERN Stack Developer",
                2000,
                "Full-Stack Engineer",
                2000,
                "React Specialist",
                2000,
              ]}
              className={styles.subtitle}
            />
          </div>
          
          <motion.p 
            className={styles.description}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Recent MCA Graduate (2025) and passionate developer building scalable
            web applications with MongoDB, Express.js, React.js, and Node.js.
            Ready to deliver high-performance solutions.
          </motion.p>
          
          <motion.div 
            className={styles.buttons}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <MagneticButton onClick={scrollToContact} className={styles.primaryBtn}>
              Get In Touch
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </MagneticButton>
            
            <MagneticButton onClick={scrollToWork} className={styles.secondaryBtn}>
              View My Work
            </MagneticButton>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className={styles.scrollIndicator}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <div className={styles.mouse}>
            <div className={styles.wheel}></div>
          </div>
          <p>Scroll to explore</p>
        </motion.div>
      </div>
    </section>
  );
}

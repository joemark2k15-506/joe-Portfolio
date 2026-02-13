"use client";

import { motion } from "framer-motion";
import { useLenis } from "@studio-freight/react-lenis";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiTypescript,
  SiExpress,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";

import styles from "./hero.module.css";
import AnimatedText from "@/components/ui/animated-text";
import MagneticButton from "@/components/ui/magnetic-button";

export default function Hero() {
  const lenis = useLenis();

  const scrollToContact = () => {
    lenis?.scrollTo("#contact");
  };

  const scrollToWork = () => {
    lenis?.scrollTo("#work");
  };

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.content}>
        {/* Left — Text Content */}
        <motion.div
          className={styles.textContainer}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className={styles.greeting}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className={styles.dot} />
            Available for opportunities
          </motion.div>

          <h1 className={styles.title}>
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Hi, I&apos;m
            </motion.span>
            <br />
            <span className={`gradient-text ${styles.name}`}>Joe Mark M</span>
          </h1>

          <div className={styles.subtitleWrapper}>
            <AnimatedText
              sequences={[
                "Full-Stack Engineer",
                2000,
                "MERN Stack Developer",
                2000,
                "React Specialist",
                2000,
                "Java Full Stack Developer",
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
            Recent MCA Graduate (2025) building high-performance web & mobile
            applications with modern tech stacks. Passionate about clean
            architecture and exceptional user experiences.
          </motion.p>

          <motion.div
            className={styles.buttons}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <MagneticButton onClick={scrollToContact} className={styles.primaryBtn}>
              Get In Touch
              <svg
                width="18"
                height="18"
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

          <motion.div
            className={styles.socialRow}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <a
              href="https://github.com/joemark2k15-506"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="GitHub"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/joe-mark-9b921a380"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="LinkedIn"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href="mailto:joemark2k15@gmail.com"
              className={styles.socialLink}
              aria-label="Email"
            >
              <HiOutlineMail size={18} />
            </a>
          </motion.div>
        </motion.div>

        {/* Right — Profile Image with Orbiting Icons */}
        <motion.div
          className={styles.profileSection}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1, type: "spring", bounce: 0.3 }}
        >
          <div className={styles.profileWrapper}>
            {/* Glow */}
            <div className={styles.profileGlow} />

            {/* Orbit Ring 1 */}
            <div className={styles.orbitRing}>
              <div className={styles.orbitIcon} style={{ top: "-20px", left: "50%", marginLeft: "-20px" }}>
                <SiReact />
              </div>
              <div className={styles.orbitIcon} style={{ bottom: "-20px", left: "50%", marginLeft: "-20px" }}>
                <SiNodedotjs />
              </div>
              <div className={styles.orbitIcon} style={{ top: "50%", left: "-20px", marginTop: "-20px" }}>
                <SiMongodb />
              </div>
              <div className={styles.orbitIcon} style={{ top: "50%", right: "-20px", marginTop: "-20px" }}>
                <SiTypescript />
              </div>
            </div>

            {/* Orbit Ring 2 */}
            <div className={styles.orbitRing2}>
              <div className={styles.orbitIcon2} style={{ top: "10%", right: "-15px" }}>
                <FaJava />
              </div>
              <div className={styles.orbitIcon2} style={{ bottom: "10%", left: "-15px" }}>
                <SiExpress />
              </div>
            </div>

            {/* Blob Profile */}
            <div className={styles.blobContainer}>
              <Image
                src="/pro-2.jpg"
                alt="Joe Mark M"
                width={400}
                height={400}
                className={styles.profileImage}
                priority
                unoptimized
              />
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
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

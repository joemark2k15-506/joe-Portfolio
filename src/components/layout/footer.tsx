"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa6";
import styles from "./footer.module.css";

const socialLinks = [
  { name: "GitHub", href: "https://github.com/joemark2k15-506", icon: <FaGithub /> },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/joe-mark-9b921a380", icon: <FaLinkedin /> },
  { name: "Email", href: "mailto:joemark2k15@gmail.com", icon: <FaEnvelope /> },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        {/* Signature Branding */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.cta}
        >
          <h2 className={styles.signature}>Joe Mark M</h2>
          <p className={styles.ctaText}>
            Building digital experiences that matter.
          </p>
        </motion.div>

        {/* Social Links Pill */}
        <motion.div
          className={styles.socialLinks}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label={link.name}
            >
              {link.icon}
            </a>
          ))}
        </motion.div>

        {/* Quick Navigation */}
        <nav className={styles.quickNav}>
          {["Home", "Work", "About", "Journey", "Contact"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase() === "home" ? "home" : item.toLowerCase()}`}
              className={styles.navLink}
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {currentYear} Joe Mark M. All rights reserved.
          </p>
          <div className={styles.madeWith}>
            Designed & Built with <span className={styles.heart}>♥</span> in India
          </div>
        </div>
      </div>
    </footer>
  );
}

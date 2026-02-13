"use client";

import { useState, FormEvent, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";
import { EMAILJS_CONFIG } from "@/lib/email-config";
import { FaPaperPlane, FaTerminal } from "react-icons/fa";
import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";
import styles from "./contact.module.css";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!EMAILJS_CONFIG.PUBLIC_KEY || !EMAILJS_CONFIG.SERVICE_ID || !EMAILJS_CONFIG.TEMPLATE_ID) {
      toast.error("Contact form is not configured. Please add EmailJS keys.");
      return;
    }

    if (!formRef.current) return;

    setStatus("loading");

    try {
      // Initialize with public key
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

      await emailjs.sendForm(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        formRef.current,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      setStatus("success");
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
      if (formRef.current) formRef.current.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error: any) {
      console.error("EmailJS Error:", error);
      setStatus("error");
      toast.error(error?.text || "Failed to send message. Please try again later.");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className={`${styles.contact} section`}>
      <div className="container">
        <div className={styles.header}>
          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Get In <span className="gradient-text">Touch</span>
          </motion.h2>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Open for freelance opportunities and full-time roles
          </motion.p>
        </div>

        <div className={styles.grid}>
          {/* Left Side Info */}
          <div className={styles.info}>
            <motion.div
              className={styles.availabilityBadge}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className={styles.pulseDot} />
              Available for work
            </motion.div>

            {[
              { title: "Email", value: "joemark2k15@gmail.com", icon: <FiMail /> },
              { title: "Location", value: "Madurai, Tamil Nadu, India", icon: <FiMapPin /> },
              { title: "Phone", value: "+91 82483 44143", icon: <FiPhone /> },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className={styles.infoCard}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <div className={styles.iconBox}>{item.icon}</div>
                <div className={styles.infoContent}>
                  <h3>{item.title}</h3>
                  <p>{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Side Terminal Form */}
          <motion.div
            className={styles.formContainer}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Terminal Header */}
            <div className={styles.terminalHeader}>
              <div className={styles.terminalControls}>
                <div className={`${styles.controlDot} ${styles.red}`} />
                <div className={`${styles.controlDot} ${styles.yellow}`} />
                <div className={`${styles.controlDot} ${styles.green}`} />
              </div>
              <div className={styles.terminalTitle}>contact-form.tsx — bash — 80x24</div>
            </div>

            {/* Form Content */}
            <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  <span style={{ color: "var(--primary)" }}>const</span> name =
                </label>
                <div className={styles.inputWrapper}>
                  <span className={styles.prompt}>&gt;</span>
                  <input
                    type="text"
                    id="name"
                    name="from_name"
                    className={styles.input}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    disabled={status === "loading"}
                    placeholder='"Your Name"'
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  <span style={{ color: "var(--primary)" }}>const</span> email =
                </label>
                <div className={styles.inputWrapper}>
                  <span className={styles.prompt}>&gt;</span>
                  <input
                    type="email"
                    id="email"
                    name="reply_to"
                    className={styles.input}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    disabled={status === "loading"}
                    placeholder='"email@example.com"'
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject" className={styles.label}>
                  <span style={{ color: "var(--primary)" }}>const</span> subject =
                </label>
                <div className={styles.inputWrapper}>
                  <span className={styles.prompt}>&gt;</span>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className={styles.input}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    disabled={status === "loading"}
                    placeholder='"Project Inquiry"'
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>
                  <span style={{ color: "var(--primary)" }}>const</span> message =
                </label>
                <div className={styles.inputWrapper}>
                  <span className={styles.prompt}>&gt;</span>
                  <textarea
                    id="message"
                    name="message"
                    className={styles.textarea}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    disabled={status === "loading"}
                    rows={5}
                    placeholder='"Tell me about your project..."'
                  />
                </div>
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  "Sending..."
                ) : status === "success" ? (
                  "Message Sent!"
                ) : (
                  <>
                    <FaPaperPlane /> Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

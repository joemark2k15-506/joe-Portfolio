"use client";

import Image from "next/image";
import styles from "./device-mockup.module.css";

interface DeviceMockupProps {
  type?: "laptop" | "phone" | "tablet";
  screenshot: string;
  alt: string;
}

export default function DeviceMockup({
  type = "laptop",
  screenshot,
  alt,
}: DeviceMockupProps) {
  if (type === "laptop") {
    return (
      <div className={styles.laptop}>
        <div className={styles.laptopScreen}>
          <Image
            src={screenshot}
            alt={alt}
            width={800}
            height={500}
            className={styles.laptopImage}
            unoptimized
          />
        </div>
        <div className={styles.laptopBase}>
          <div className={styles.laptopNotch}></div>
        </div>
      </div>
    );
  }

  if (type === "phone") {
    return (
      <div className={styles.phone}>
        <div className={styles.phoneNotch}></div>
        <div className={styles.phoneScreen}>
          <Image
            src={screenshot}
            alt={alt}
            width={300}
            height={600}
            className={styles.phoneImage}
            unoptimized
          />
        </div>
        <div className={styles.phoneButton}></div>
      </div>
    );
  }

  return null;
}

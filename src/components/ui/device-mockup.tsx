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
  const renderImage = () => (
    <div className={styles.imageWrapper} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Image
        src={screenshot}
        alt={alt}
        fill
        className={type === "laptop" ? styles.laptopImage : styles.phoneImage}
        unoptimized
        style={{ 
          objectFit: type === 'laptop' ? 'cover' : 'contain',
          objectPosition: type === 'laptop' ? 'top' : 'center'
        }}
      />
    </div>
  );

  if (type === "laptop") {
    return (
      <div className={styles.laptop}>
        <div className={styles.laptopScreen}>
          {renderImage()}
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
          {renderImage()}
        </div>
        <div className={styles.phoneButton}></div>
      </div>
    );
  }

  return null;
}

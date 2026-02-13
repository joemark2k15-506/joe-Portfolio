"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, type TargetAndTransition } from "framer-motion";
import { useEffect, useRef, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { LuX, LuExternalLink } from "react-icons/lu";
import DeviceFrame from "@/components/ui/device-frame";
import { Project } from "@/lib/data";

interface ProjectModalProps {
    selectedProject: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

const springConfig = { stiffness: 120, damping: 18 };
const parallaxSpring = { stiffness: 80, damping: 20, mass: 0.8 };

const floatAnimation: TargetAndTransition = {
    y: [0, -6, 0],
    transition: {
        y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    },
};

export default function ProjectModal({ selectedProject, isOpen, onClose }: ProjectModalProps) {
    const deviceAreaRef = useRef<HTMLDivElement>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [mounted, setMounted] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, parallaxSpring);
    const springY = useSpring(mouseY, parallaxSpring);
    const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
    const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Handle Image Slideshow
    useEffect(() => {
        if (!isOpen || !selectedProject) return;

        setCurrentImageIndex(0);

        const images = selectedProject.screenshots?.length
            ? selectedProject.screenshots
            : [selectedProject.image];

        if (images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 3500);

        return () => clearInterval(interval);
    }, [isOpen, selectedProject]);

    // ESC close + body lock
    useEffect(() => {
        if (!isOpen) return;
        document.body.style.overflow = "hidden";
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKey);
        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleKey);
        };
    }, [isOpen, onClose]);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!deviceAreaRef.current) return;
            const rect = deviceAreaRef.current.getBoundingClientRect();
            mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
            mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
        },
        [mouseX, mouseY]
    );

    const handleMouseLeave = useCallback(() => {
        mouseX.set(0);
        mouseY.set(0);
    }, [mouseX, mouseY]);

    if (!mounted || !selectedProject) return null;

    const isDesktop = selectedProject.type === "web";
    const displayImages = selectedProject.screenshots?.length
        ? selectedProject.screenshots
        : [selectedProject.image];



    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Full-screen backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={onClose}
                        style={{
                            position: "fixed",
                            inset: 0,
                            zIndex: 2147483645, // Just below cursor
                            backgroundColor: "rgba(0,0,0,0.9)",
                            backdropFilter: "blur(20px)",
                            WebkitBackdropFilter: "blur(20px)",
                        }}
                    />

                    {/* Device showcase container */}
                    <motion.div
                        ref={deviceAreaRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                        role="dialog"
                        aria-modal="true"
                        aria-label={`${selectedProject.title} preview`}
                        style={{
                            position: "fixed",
                            inset: 0,
                            zIndex: 2147483646, // Just below cursor, above backdrop
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "30px",
                            perspective: "2000px",
                            padding: "32px",
                        }}
                    >
                        {/* Title label */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                            style={{ textAlign: "center", zIndex: 10, position: "relative" }}
                        >
                            <h3 style={{
                                fontSize: "1.75rem",
                                fontWeight: 700,
                                color: "white",
                                margin: 0,
                                textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                                letterSpacing: "-0.02em"
                            }}>
                                {selectedProject.title}
                            </h3>
                            <p style={{
                                fontSize: "0.9rem",
                                color: "rgba(255,255,255,0.6)",
                                marginTop: "4px",
                            }}>
                                {selectedProject.tags.join(" • ")}
                            </p>
                        </motion.div>

                        {/* Close button */}
                        <motion.button
                            onClick={(e) => { e.stopPropagation(); onClose(); }}
                            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                            whileTap={{ scale: 0.9 }}
                            style={{
                                position: "absolute",
                                top: "24px",
                                right: "24px",
                                zIndex: 10,
                                width: "44px",
                                height: "44px",
                                borderRadius: "50%",
                                background: "rgba(255,255,255,0.1)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                color: "rgba(255,255,255,0.9)",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backdropFilter: "blur(10px)",
                            }}
                        >
                            <LuX size={20} strokeWidth={2.5} />
                        </motion.button>

                        {/* 3D floating device */}
                        <motion.div
                            initial={{ scale: 0.88, rotateX: 10, y: 50, opacity: 0 }}
                            animate={{ scale: 1, rotateX: 0, y: 0, opacity: 1 }}
                            exit={{ scale: 0.88, rotateX: 10, y: 50, opacity: 0 }}
                            transition={{ type: "spring", ...springConfig }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                position: "relative",
                                zIndex: 5,
                                cursor: "default",
                                willChange: "transform, opacity",
                                width: "auto",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <motion.div
                                style={{
                                    rotateX,
                                    rotateY,
                                    transformStyle: "preserve-3d",
                                    willChange: "transform",
                                }}
                                animate={floatAnimation}
                            >
                                <DeviceFrame type={isDesktop ? "desktop" : "mobile"}>
                                    <div className="relative">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={currentImageIndex}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                {/* CONDITIONAL IMAGE LAYOUT */}
                                                {isDesktop ? (
                                                    // DESKTOP: Full Width, Auto Height (Scrollable)
                                                    // DESKTOP: Full Width, Auto Height (Scrollable)
                                                    displayImages[currentImageIndex] ? (
                                                        <Image
                                                            src={displayImages[currentImageIndex]}
                                                            alt="Project Screenshot"
                                                            width={0}
                                                            height={0}
                                                            sizes="100vw"
                                                            style={{
                                                                width: "100%",
                                                                height: "auto",
                                                                display: "block"
                                                            }}
                                                            priority
                                                            unoptimized
                                                        />
                                                    ) : null
                                                ) : (
                                                    // MOBILE: Infinity Glass Adaptive
                                                    displayImages[currentImageIndex] ? (
                                                        <Image
                                                            src={displayImages[currentImageIndex]}
                                                            alt="Project Screenshot"
                                                            width={0}
                                                            height={0}
                                                            sizes="100vw"
                                                            style={{
                                                                width: "auto",
                                                                height: "auto",
                                                                maxHeight: "80vh",
                                                                maxWidth: "90vw",
                                                                objectFit: "contain",
                                                                display: "block",
                                                            }}
                                                            priority
                                                            unoptimized
                                                        />
                                                    ) : null
                                                )}
                                            </motion.div>
                                        </AnimatePresence>

                                        {/* Carousel Indicators for Infinity Glass (Mobile Only or Both?) */}
                                        {/* Keeping them for both, just overlaid */}
                                        {displayImages.length > 1 && (
                                            <div style={{
                                                position: "absolute",
                                                bottom: "16px",
                                                left: "50%",
                                                transform: "translateX(-50%)",
                                                display: "flex",
                                                gap: "6px",
                                                zIndex: 30,
                                                padding: "6px 10px",
                                                borderRadius: "20px",
                                                background: "rgba(0,0,0,0.5)",
                                                backdropFilter: "blur(8px)",
                                                border: "1px solid rgba(255,255,255,0.1)"
                                            }}>
                                                {displayImages.map((_, idx) => (
                                                    <div
                                                        key={idx}
                                                        style={{
                                                            width: "6px",
                                                            height: "6px",
                                                            borderRadius: "50%",
                                                            backgroundColor: idx === currentImageIndex ? "#fff" : "rgba(255,255,255,0.3)",
                                                            transition: "background-color 0.3s",
                                                            cursor: "pointer"
                                                        }}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setCurrentImageIndex(idx);
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </DeviceFrame>

                                {/* Ground shadow */}
                                <div
                                    style={{
                                        position: "absolute",
                                        bottom: isDesktop ? "-60px" : "-50px", // Lower shadow for laptop
                                        left: "15%",
                                        right: "15%",
                                        height: "40px",
                                        background: "radial-gradient(ellipse, rgba(60, 120, 255, 0.15) 0%, transparent 70%)",
                                        filter: "blur(30px)",
                                        borderRadius: "50%",
                                        pointerEvents: "none",
                                    }}
                                />
                            </motion.div>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ delay: 0.3, type: "spring" }}
                            className="fixed z-[100] flex items-center gap-3 
                                       bottom-8 left-1/2 -translate-x-1/2 flex-row 
                                       md:top-1/2 md:right-10 md:left-auto md:bottom-auto md:-translate-y-1/2 md:translate-x-0 md:flex-col"
                        >
                            <Link
                                href={`/work/${selectedProject.slug}`}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <motion.button
                                    whileHover={{ y: -4, scale: 1.05 }}
                                    whileTap={{ y: 0, scale: 0.95 }}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: "64px",
                                        height: "64px",
                                        background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                                        borderRadius: "20px",
                                        color: "white",
                                        border: "1px solid rgba(255,255,255,0.2)",
                                        boxShadow: "0 10px 25px -5px rgba(37,99,235,0.5), 0 4px 6px -2px rgba(37,99,235,0.3)",
                                        cursor: "pointer",
                                    }}
                                >
                                    <LuExternalLink size={26} strokeWidth={2.5} />
                                </motion.button>
                            </Link>
                            <span style={{
                                color: "rgba(255,255,255,0.9)",
                                fontSize: "0.8rem",
                                fontWeight: 600,
                                textShadow: "0 2px 4px rgba(0,0,0,0.8)",
                                background: "rgba(0,0,0,0.4)",
                                padding: "4px 8px",
                                borderRadius: "8px",
                                backdropFilter: "blur(4px)"
                            }}>
                                Open Case Study
                            </span>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}

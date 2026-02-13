"use client";

import { useState, useEffect } from "react";

export function useActiveSection(sectionIds: string[], offset = 100) {
    const [activeSection, setActiveSection] = useState<string>("");

    useEffect(() => {
        const handleScroll = () => {
            // Find the section that is currently in view
            // We'll use a simple strategy: the section top is closest to 0 (top of viewport)
            // but not too far negative (scrolled past)

            let currentSection = "";
            let minDistance = Infinity;

            // Check if we are at the bottom of the page
            if (
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 50
            ) {
                setActiveSection(sectionIds[sectionIds.length - 1]);
                return;
            }

            for (const id of sectionIds) {
                const element = document.getElementById(id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Distance from the top of viewport (offset by header height)
                    const distance = Math.abs(rect.top - offset);

                    if (distance < minDistance) {
                        minDistance = distance;
                        currentSection = id;
                    }
                }
            }

            if (currentSection) {
                setActiveSection(currentSection);
            }
        };

        // Throttle the scroll event
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        // Initial check
        handleScroll();

        return () => window.removeEventListener("scroll", onScroll);
    }, [sectionIds, offset]);

    return activeSection;
}

"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis root options={{
            lerp: 0.08,
            duration: 1.5,
            smoothWheel: true,
            touchMultiplier: 1.5,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        }}>
            <>{children}</>
        </ReactLenis>
    );
}

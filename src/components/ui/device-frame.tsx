"use client";

import { ReactNode } from "react";

interface DeviceFrameProps {
    children: ReactNode;
    type: "mobile" | "desktop";
    className?: string;
}

export default function DeviceFrame({ children, type, className = "" }: DeviceFrameProps) {
    if (type === "mobile") {
        return (
            <div className={`relative mx-auto ${className}`}>
                {/* Infinity Glass Frame (Mobile) - User Approved */}
                <div
                    className="relative"
                    style={{
                        display: "inline-block",
                        borderRadius: "32px",
                        background: "rgba(18, 18, 18, 0.4)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        boxShadow:
                            "0 20px 50px -10px rgba(0, 0, 0, 0.5), " +
                            "0 0 0 1px rgba(0,0,0,0.2), " +
                            "inset 0 1px 0 rgba(255,255,255,0.1)",
                        overflow: "hidden",
                    }}
                >
                    <div className="relative z-10 overflow-hidden" style={{ borderRadius: "31px" }}>
                        {children}
                    </div>
                    <div
                        className="absolute inset-0 pointer-events-none z-20"
                        style={{
                            background: "linear-gradient(130deg, rgba(255,255,255,0.12) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.05) 100%)",
                            borderRadius: "32px",
                        }}
                    />
                </div>
            </div>
        );
    }

    // ===== Desktop / MacBook Pro M3 (Space Black) =====
    return (
        <div className={`relative mx-auto ${className}`} style={{ perspective: "1000px" }}>
            {/* Lid Assembly */}
            <div
                className="relative box-border"
                style={{
                    width: "min(80vw, 1000px)", // Large generous width
                    aspectRatio: "16 / 10",     // MacBook 16" Ratio
                    background: "#0d0d0d",      // Deep bezel black
                    borderRadius: "20px 20px 0 0", // Lid corners
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1), 0 20px 50px -20px rgba(0,0,0,0.8)",
                    border: "1px solid #1a1a1a",
                    borderBottom: "none",
                    position: "relative",
                    zIndex: 20,
                    // Lid Bezel Thickness
                    padding: "14px 14px 0 14px",
                }}
            >
                {/* Screen Housing */}
                <div className="relative w-full h-full bg-black overflow-hidden rounded-t-[10px] shadow-inner">

                    {/* The Content (Website) */}
                    <div className="absolute inset-0 bg-[#050505]" style={{ overflowY: "auto", scrollbarWidth: "none" }}>
                        {children}
                    </div>

                    {/* Camera Notch Area */}
                    <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#0d0d0d] z-30"
                        style={{
                            width: "120px",
                            height: "22px",
                            borderRadius: "0 0 12px 12px",
                        }}
                    >
                        {/* Cam Lens */}
                        <div className="absolute right-[30px] top-[50%] -translate-y-1/2 w-2 h-2 rounded-full bg-[#1a1a1a] shadow-[0_0_0_1px_rgba(255,255,255,0.1)]" />
                    </div>

                    {/* Screen Refection / Gloss */}
                    <div
                        className="absolute inset-0 pointer-events-none z-10"
                        style={{
                            background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 40%)",
                        }}
                    />
                </div>
            </div>

            {/* Hinge & Base Deck */}
            <div className="relative z-10">
                {/* Hinge Cylinder */}
                <div
                    className="mx-auto"
                    style={{
                        width: "calc(100% - 40px)",
                        height: "12px",
                        background: "linear-gradient(to bottom, #1a1a1a, #050505)",
                        borderRadius: "0 0 4px 4px",
                    }}
                />

                {/* Bottom Deck (Perspective Top View) */}
                <div
                    style={{
                        width: "calc(100% + 100px)", // Deck is wider than screen
                        marginLeft: "-50px",
                        height: "14px", // Thin profile
                        background: "#161617", // Space Black Aluminum
                        border: "1px solid #2a2a2a",
                        borderRadius: "4px 4px 16px 16px",
                        boxShadow: "0 30px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)",
                        marginTop: "-8px", // Tuck under hinge
                    }}
                >
                    {/* Trackpad indentation hint (subtle) */}
                    <div
                        className="absolute left-1/2 -translate-x-1/2 top-0"
                        style={{
                            width: "30%",
                            height: "4px",
                            background: "rgba(0,0,0,0.3)",
                            borderRadius: "0 0 4px 4px",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

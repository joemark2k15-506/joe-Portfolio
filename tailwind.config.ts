import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            screens: {
                xs: "320px",
                sm: "480px",
                md: "768px",
                lg: "1024px",
                xl: "1440px",
                "2xl": "1920px",
            },
            colors: {
                primary: {
                    DEFAULT: "var(--primary)",
                    light: "var(--primary-light)",
                    dark: "var(--primary-dark)",
                },
                secondary: {
                    DEFAULT: "var(--secondary)",
                    light: "var(--secondary-light)",
                    dark: "var(--secondary-dark)",
                },
                accent: {
                    DEFAULT: "var(--accent)",
                    light: "var(--accent-light)",
                    dark: "var(--accent-dark)", // Added for completeness if defined in CSS
                },
                background: "var(--background)",
                surface: "var(--surface)",
                // Custom text colors mapping
                text: {
                    primary: "var(--text-primary)",
                    secondary: "var(--text-secondary)",
                    tertiary: "var(--text-tertiary)",
                }
            },
            fontFamily: {
                heading: ["var(--font-heading)"],
                body: ["var(--font-body)"],
                accent: ["var(--font-accent)"],
                mono: ["var(--font-mono)"],
            },
            transitionTimingFunction: {
                fast: "cubic-bezier(0.4, 0, 0.2, 1)",
                base: "cubic-bezier(0.4, 0, 0.2, 1)",
                slow: "cubic-bezier(0.4, 0, 0.2, 1)",
            },
            borderRadius: {
                sm: "var(--radius-sm)",
                md: "var(--radius-md)",
                lg: "var(--radius-lg)",
                xl: "var(--radius-xl)",
                "2xl": "var(--radius-2xl)",
                full: "var(--radius-full)",
            },
            spacing: {
                xs: "var(--space-xs)",
                sm: "var(--space-sm)",
                md: "var(--space-md)",
                lg: "var(--space-lg)",
                xl: "var(--space-xl)",
                "2xl": "var(--space-2xl)",
                "3xl": "var(--space-3xl)",
                "4xl": "var(--space-4xl)",
                "5xl": "var(--space-5xl)",
            },
            boxShadow: {
                sm: "var(--shadow-sm)",
                md: "var(--shadow-md)",
                lg: "var(--shadow-lg)",
                xl: "var(--shadow-xl)",
            },
        },
    },
    plugins: [],
};
export default config;

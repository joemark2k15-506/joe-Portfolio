import type { Metadata } from "next";
import { Inter, Space_Grotesk, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import CustomCursor from "@/components/ui/custom-cursor";
import CommandPalette from "@/components/ui/command-palette";
import BackToTop from "@/components/ui/back-to-top";
import { Toaster } from "react-hot-toast";
import SmoothScrolling from "@/components/providers/smooth-scrolling";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-accent",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://joemark-portfolio.vercel.app'),
  title: "Joe Mark M | Aspiring Software Engineer & MERN Stack Developer",
  description: "Recent MCA graduate and Full-Stack Engineer ready to build scalable web applications with MongoDB, Express.js, React.js, and Node.js.",
  keywords: ["portfolio", "MERN stack developer", "full-stack engineer", "web developer", "fresh graduate", "software engineer", "React Native", "Node.js", "Joe Mark M"],
  authors: [{ name: "Joe Mark M" }],
  openGraph: {
    title: "Joe Mark M | Aspiring Software Engineer",
    description: "Recent MCA graduate specializing in building scalable full-stack applications.",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Joe Mark M Portfolio Preview",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${outfit.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
        <ThemeProvider>
          <SmoothScrolling>
            <Toaster position="bottom-right" />
            <CustomCursor />
            <CommandPalette />
            <a href="#main" className="skip-to-content">
              Skip to content
            </a>
            <Navbar />
            <main id="main">{children}</main>
            <Footer />
            <BackToTop />
          </SmoothScrolling>
        </ThemeProvider>
      </body>
    </html>
  );
}

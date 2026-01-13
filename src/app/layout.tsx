import type { Metadata } from "next";
import { Inter, Space_Grotesk, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import CustomCursor from "@/components/ui/custom-cursor";
import CommandPalette from "@/components/ui/command-palette";
import { Toaster } from "react-hot-toast";

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

export const metadata: Metadata = {
  metadataBase: new URL('https://joemark-portfolio.vercel.app'),
  title: "Portfolio | Joe Mark M",
  description: "MERN Stack Developer & Full-Stack Engineer specializing in building scalable full-stack applications using MongoDB, Express.js, React.js, and Node.js.",
  keywords: ["portfolio", "MERN stack developer", "full-stack engineer", "web developer", "React Native", "Node.js", "Joe Mark M"],
  authors: [{ name: "Joe Mark M" }],
  openGraph: {
    title: "Portfolio | Joe Mark M",
    description: "MERN Stack Developer & Full-Stack Engineer specializing in building scalable full-stack applications.",
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
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Joe Mark M",
    description: "MERN Stack Developer & Full-Stack Engineer specializing in building scalable full-stack applications.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${outfit.variable}`}>
        <ThemeProvider>
          <Toaster position="bottom-right" />
          <CustomCursor />
          <CommandPalette />
          <a href="#main" className="skip-to-content">
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

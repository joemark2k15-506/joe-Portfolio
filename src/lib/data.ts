export type ProjectTag = "All" | "Web" | "Mobile" | "Design";

export interface Project {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  screenshots: string[];
  tags: ProjectTag[];
  technologies: string[];
  link: string;
  githubUrl: string;
  // Case Study Content
  challenge: string;
  solution: string;
  features: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "consumer-goods-seller",
    title: "Consumer Goods Seller",
    subtitle: "Modern E-commerce Platform",
    description:
      "A comprehensive e-commerce solution built with the MERN stack, designed to provide a seamless shopping experience. It features a dynamic product catalog, real-time inventory updates, and a modular component architecture for scalability.",
    image: "/E-1.png",
    screenshots: [
      "/E-1.png",
      "/E-2.png",
      "/E-3.png",
      "/E-4.png",
      "/E-5.png",
      "/E-6.png",
    ],
    tags: ["Web"],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    link: "https://github.com/joemark2k15-506/electric-shop",
    githubUrl: "https://github.com/joemark2k15-506/electric-shop",
    challenge:
      "The primary challenge was to create a scalable and responsive e-commerce platform that could handle real-time product updates and manage complex state across various components. Ensuring a seamless user experience on both mobile and desktop devices while maintaining high performance was critical.",
    solution:
      "I implemented a full-stack MERN architecture with a RESTful API to manage data efficiently. React's component-based structure allowed for reusable UI elements, while Redux (or Context API) managed the global state. For the backend, I used Node.js and Express to handle concurrent requests, and MongoDB for flexible data storage. Responsive design was achieved using a mobile-first approach with CSS Grid and Flexbox.",
    features: [
      "Dynamic Product Catalog with filtering and search",
      "Secure User Authentication and Authorization",
      "Responsive Mobile-First Design",
      "Real-time Inventory Management Integration",
      "Shopping Cart and Checkout Process Flow",
    ],
  },
  {
    id: 2,
    slug: "vibe-player",
    title: "Vibe Player",
    subtitle: "High-Fidelity Audio Experience",
    description:
      "An ultra-performance mobile audio player engineered for audiophiles. It supports high-fidelity formats like FLAC and ALAC via real-time FFmpeg transcoding and delivers buttery smooth 60fps animations on Android devices.",
    image: "/vibeimage.jpg",
    screenshots: ["/vibe1.jpg", "/vibe2.jpg", "/vibe3.jpg", "/vibe4.jpg"],
    tags: ["Mobile"],
    technologies: ["React Native", "Expo", "TypeScript", "FFmpeg", "Reanimated"],
    link: "https://github.com/joemark2k15-506/vibe-Player",
    githubUrl: "https://github.com/joemark2k15-506/vibe-Player",
    challenge:
      "Handling high-resolution audio files on mobile devices without lag or battery drain is difficult. The native players often lack support for formats like FLAC or ALAC. Additionally, creating complex, fluid visualizations and UI animations in React Native while maintaining 60fps performance on mid-range Android devices posed a significant technical hurdle.",
    solution:
      "I leveraged React Native with Expo for cross-platform compatibility but dropped down to native modules where necessary. I integrated FFmpeg for efficient, on-the-fly audio transcoding. For the UI, I used React Native Reanimated to run animations on the UI thread, bypassing the JS bridge completely to ensure jank-free performance. TypeScript ensured type safety across the complex codebase.",
    features: [
      "Real-time FFmpeg Audio Transcoding",
      "Support for FLAC, ALAC, WAV, and MP3",
      "60fps Smooth UI Animations using Reanimated",
      "Offline Playback and Local File Management",
      "Custom Audio Visualization Engine",
    ],
  },
];

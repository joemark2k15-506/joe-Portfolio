"use client";

import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";
import About from "@/components/sections/about";
import Timeline from "@/components/sections/timeline";
import Skills from "@/components/sections/skills";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <About />
      <Timeline />
      <Skills />
      <Contact />
    </>
  );
}

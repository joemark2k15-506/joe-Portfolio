"use client";

import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";
import About from "@/components/sections/about";
import CareerJourney from "@/components/sections/career-journey";
import Skills from "@/components/sections/skills";
import Contact from "@/components/sections/contact";


export default function Home() {
  return (
    <>
      <Hero />
      <div className="section-divider" />
      <Projects />
      <div className="section-divider" />

      <About />
      <div className="section-divider" />
      <CareerJourney />
      <div className="section-divider" />
      <Skills />
      <div className="section-divider" />
      <Contact />
    </>
  );
}

import Nav          from "@/components/Nav";
import Hero         from "@/components/sections/Hero";
import Experience   from "@/components/sections/Experience";
import Projects     from "@/components/sections/Projects";
import Skills       from "@/components/sections/Skills";
import Education    from "@/components/sections/Education";
import Contact      from "@/components/sections/Contact";
import Footer       from "@/components/sections/Footer";
import CursorOverlay from "@/components/CursorOverlay";
import ParticleCanvas from "@/components/ParticleCanvas";

export default function Home() {
  return (
    <>
      <CursorOverlay />
      <div className="scanlines-overlay"  aria-hidden="true" />
      <div className="scanline-sweep"     aria-hidden="true" />
      <div className="noise-overlay"      aria-hidden="true" />

      <ParticleCanvas />

      <Nav />

      <main className="relative z-10">
        <Hero />
        <div className="section-divider" />
        <Experience />
        <div className="section-divider" />
        <Projects />
        <div className="section-divider" />
        <Skills />
        <div className="section-divider" />
        <Education />
        <div className="section-divider" />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

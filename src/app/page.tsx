import Nav               from "@/components/ui/Nav";
import Hero              from "@/components/sections/Hero";
import Experience        from "@/components/sections/Experience";
import Projects          from "@/components/sections/Projects";
import Skills            from "@/components/sections/Skills";
import Education         from "@/components/sections/Education";
import Contact           from "@/components/sections/Contact";
import Footer            from "@/components/sections/Footer";
import CursorOverlay     from "@/components/ui/CursorOverlay";
import ParticleCanvas    from "@/components/ui/ParticleCanvas";
import SectionDividerCanvas from "@/components/ui/SectionDividerCanvas";
import ClientShell       from "@/components/ui/ClientShell";

export default function Home() {
  return (
    <ClientShell>
      {/* Atmosphere overlays */}
      <CursorOverlay />
      <div className="scanlines-overlay"  aria-hidden="true" />
      <div className="scanline-sweep"     aria-hidden="true" />
      <div className="noise-overlay"      aria-hidden="true" />

      <ParticleCanvas />
      <Nav />

      <main className="relative z-10">
        <Hero />
        <SectionDividerCanvas />
        <Experience />
        <SectionDividerCanvas />
        <Projects />
        <SectionDividerCanvas />
        <Skills />
        <SectionDividerCanvas />
        <Education />
        <SectionDividerCanvas />
        <Contact />
      </main>

      <Footer />
    </ClientShell>
  );
}

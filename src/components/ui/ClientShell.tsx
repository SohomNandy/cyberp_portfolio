"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Extend window type globally
declare global {
  interface Window {
    __playSound?: (type: string) => void;
    __soundAttached?: boolean;
  }
}

const BootSequence       = dynamic(() => import("@/components/ui/BootSequence"),       { ssr: false });
const CursorTrail        = dynamic(() => import("@/components/ui/CursorTrail"),        { ssr: false });
const SoundManager       = dynamic(() => import("@/components/ui/SoundManager"),       { ssr: false });
const KonamiEgg          = dynamic(() => import("@/components/ui/KonamiEgg"),          { ssr: false });
const GlitchScrollEffect = dynamic(() => import("@/components/ui/GlitchScrollEffect"), { ssr: false });

interface ClientShellProps { children: React.ReactNode; }

export default function ClientShell({ children }: ClientShellProps) {
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    if (!booted) return;
    const attach = () => {
      document.querySelectorAll<HTMLElement>("a, button, [data-hover]").forEach(el => {
        if (el.dataset.soundAttached) return;
        el.dataset.soundAttached = "1";
        el.addEventListener("mouseenter", () => window.__playSound?.("hover"));
        el.addEventListener("click",      () => window.__playSound?.("click"));
      });
    };
    attach();
    const mo = new MutationObserver(attach);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, [booted]);

  return (
    <>
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      <CursorTrail />
      <GlitchScrollEffect />
      <KonamiEgg />
      <SoundManager />
      <div style={{ opacity: booted ? 1 : 0, transition: "opacity 0.5s ease" }}>
        {children}
      </div>
    </>
  );
}
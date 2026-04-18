"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const BootSequence      = dynamic(() => import("@/components/ui/BootSequence"),      { ssr: false });
const CursorTrail       = dynamic(() => import("@/components/ui/CursorTrail"),       { ssr: false });
const SoundManager      = dynamic(() => import("@/components/ui/SoundManager"),      { ssr: false });
const KonamiEgg         = dynamic(() => import("@/components/ui/KonamiEgg"),         { ssr: false });
const GlitchScrollEffect= dynamic(() => import("@/components/ui/GlitchScrollEffect"),{ ssr: false });

interface ClientShellProps {
  children: React.ReactNode;
}

export default function ClientShell({ children }: ClientShellProps) {
  const [booted, setBooted] = useState(false);

  // Attach sound triggers to all interactive elements after boot
  useEffect(() => {
    if (!booted) return;

    const attach = () => {
      document.querySelectorAll("a, button, [data-hover]").forEach(el => {
        if ((el as HTMLElement).dataset.soundAttached) return;
        (el as HTMLElement).dataset.soundAttached = "1";

        el.addEventListener("mouseenter", () => {
          (window as any).__playSound?.("hover");
        });
        el.addEventListener("click", () => {
          (window as any).__playSound?.("click");
        });
      });
    };

    attach();
    // Re-attach after DOM changes
    const mo = new MutationObserver(attach);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, [booted]);

  return (
    <>
      {/* Boot sequence — shows once per session */}
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}

      {/* Always-on effects */}
      <CursorTrail />
      <GlitchScrollEffect />
      <KonamiEgg />
      <SoundManager />

      {/* Main content — visible after boot */}
      <div
        style={{
          opacity: booted ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        {children}
      </div>
    </>
  );
}

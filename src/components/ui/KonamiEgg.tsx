"use client";
import { useEffect, useState, useCallback } from "react";

const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

const MESSAGES = [
  "ACCESS GRANTED // WELCOME TO THE INNER SANCTUM",
  "YOU FOUND THE SECRET. SOHOM APPROVES.",
  "NEURAL LINK ESTABLISHED // IDENTITY CONFIRMED",
  "> sudo su -c 'unlock_all_secrets' nexus",
];

export default function KonamiEgg() {
  const [progress,  setProgress]  = useState(0);
  const [triggered, setTriggered] = useState(false);
  const [phase,     setPhase]     = useState(0);

  const activate = useCallback(() => {
    if (triggered) return;
    setTriggered(true);
    window.__playSound?.("glitch");
    setPhase(1);
    setTimeout(() => setPhase(2), 400);
    setTimeout(() => window.__playSound?.("boot"), 500);
    setTimeout(() => setPhase(3), 4000);
    setTimeout(() => { setPhase(0); setTriggered(false); }, 5000);
  }, [triggered]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const next = progress + 1;
      if (e.key.toLowerCase() === KONAMI[progress].toLowerCase()) {
        if (next === KONAMI.length) { setProgress(0); activate(); }
        else setProgress(next);
      } else {
        setProgress(e.key.toLowerCase() === KONAMI[0].toLowerCase() ? 1 : 0);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [progress, activate]);

  if (phase === 0) return null;

  const msg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];

  return (
    <div className="fixed inset-0 z-[99998] flex items-center justify-center pointer-events-none"
      style={{
        background: phase === 1 ? "rgba(0,255,136,0.15)" : phase === 3 ? "rgba(0,0,0,0)" : "rgba(0,0,0,0.85)",
        transition: phase === 3 ? "background 1s ease,opacity 1s ease" : "background 0.3s ease",
        opacity: phase === 3 ? 0 : 1,
      }}>
      <div className="absolute inset-0"
        style={{ background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.3) 2px,rgba(0,0,0,0.3) 4px)" }} />

      {phase === 2 && (
        <div className="relative text-center px-8">
          <div className="relative">
            <div className="font-display font-black text-2xl sm:text-4xl text-accent tracking-widest"
              style={{ textShadow: "0 0 30px rgba(0,255,136,0.8),0 0 60px rgba(0,255,136,0.4)", animation: "rgbShift 0.5s ease-in-out infinite" }}>
              ⚡ KONAMI CODE ACTIVATED ⚡
            </div>
            <div className="absolute inset-0 font-display font-black text-2xl sm:text-4xl tracking-widest"
              style={{ color: "#ff00ff", opacity: 0.3, transform: "translate(-3px,0)", clipPath: "polygon(0 0,100% 0,100% 45%,0 45%)" }}
              aria-hidden>
              ⚡ KONAMI CODE ACTIVATED ⚡
            </div>
          </div>
          <div className="mt-6 font-mono text-sm sm:text-base text-[#e0e0e0] max-w-lg mx-auto leading-relaxed"
            style={{ textShadow: "0 0 8px rgba(0,255,136,0.4)" }}>
            {msg}
          </div>
          <div className="mt-8 flex justify-center gap-3 flex-wrap">
            {["GNN ARCHITECT","LLM WHISPERER","THREAT HUNTER","KOLKATA REPRESENT"].map(tag => (
              <span key={tag} className="px-3 py-1 font-label text-xs border border-accent text-accent"
                style={{
                  clipPath: "polygon(0 4px,4px 0,calc(100% - 4px) 0,100% 4px,100% calc(100% - 4px),calc(100% - 4px) 100%,4px 100%,0 calc(100% - 4px))",
                  background: "rgba(0,255,136,0.08)", boxShadow: "0 0 8px rgba(0,255,136,0.3)",
                }}>
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-6 font-label text-xs text-muted-fg tracking-widest">
            ↑↑↓↓←→←→BA — YOU KNOW WHAT&apos;S UP
          </div>
        </div>
      )}
    </div>
  );
}
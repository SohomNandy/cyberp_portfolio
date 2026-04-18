"use client";
import { useEffect, useState, useCallback } from "react";

const BOOT_LINES = [
  { text: "NEXUS OS v4.2.1 — INITIALIZING...",          delay: 0    },
  { text: "▸ Loading kernel modules............[OK]",    delay: 300  },
  { text: "▸ Establishing neural link...........[OK]",   delay: 600  },
  { text: "▸ Mounting encrypted volumes.........[OK]",   delay: 900  },
  { text: "▸ Scanning threat vectors............[OK]",   delay: 1200 },
  { text: "▸ Calibrating GNN inference engine...[OK]",   delay: 1500 },
  { text: "▸ Authenticating user identity.......[OK]",   delay: 1800 },
  { text: "▸ Decrypting portfolio data..........[OK]",   delay: 2100 },
  { text: "► SYSTEM ONLINE — WELCOME, OPERATOR",         delay: 2500 },
];

type Phase =
  | "booting"      // lines appearing
  | "waiting"      // "press any key" shown — waiting for input
  | "transition"   // cinematic transition playing
  | "done";        // unmount

interface Props { onComplete: () => void; }

export default function BootSequence({ onComplete }: Props) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [progress,     setProgress]     = useState(0);
  const [phase,        setPhase]        = useState<Phase>("booting");
  const [scanY,        setScanY]        = useState(0);   // for transition scan line
  const [glitchFrames, setGlitchFrames] = useState(0);

  // Check session — skip if already booted
  useEffect(() => {
    if (sessionStorage.getItem("nexus_booted")) {
      onComplete();
    }
  }, [onComplete]);

  // Boot lines
  useEffect(() => {
    if (sessionStorage.getItem("nexus_booted")) return;

    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, i]);
        setProgress(Math.round(((i + 1) / BOOT_LINES.length) * 100));
      }, line.delay);
    });

    setTimeout(() => setPhase("waiting"), 2900);
  }, []);

  // Trigger transition
  const startTransition = useCallback(() => {
    if (phase !== "waiting") return;
    setPhase("transition");
    (window as any).__playSound?.("transition");

    // Animate the scan line from top to bottom over 1.4s
    let start: number | null = null;
    const duration = 1400;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const pct = Math.min((ts - start) / duration, 1);
      setScanY(pct * 100);
      if (pct < 1) {
        requestAnimationFrame(animate);
      } else {
        // Glitch flicker before done
        let count = 0;
        const flicker = setInterval(() => {
          setGlitchFrames(f => f + 1);
          count++;
          if (count > 6) {
            clearInterval(flicker);
            setPhase("done");
            sessionStorage.setItem("nexus_booted", "1");
            setTimeout(onComplete, 100);
          }
        }, 60);
      }
    };
    requestAnimationFrame(animate);
  }, [phase, onComplete]);

  // Listen for any key or click
  useEffect(() => {
    if (phase !== "waiting") return;
    const onKey   = () => startTransition();
    const onClick = () => startTransition();
    window.addEventListener("keydown", onKey);
    window.addEventListener("click",   onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click",   onClick);
    };
  }, [phase, startTransition]);

  if (phase === "done") return null;

  const isGlitching = glitchFrames % 2 === 0 && phase === "transition" && scanY > 80;

  return (
    <div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center select-none"
      style={{ background: "#0a0a0f" }}
    >
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.15) 2px,rgba(0,0,0,0.15) 4px)" }} />

      {/* ── TRANSITION: green scan line wipes down ── */}
      {phase === "transition" && (
        <>
          {/* The wipe line itself */}
          <div
            className="absolute left-0 right-0 pointer-events-none"
            style={{
              top: `${scanY}%`,
              height: "3px",
              background: "linear-gradient(90deg,transparent,#00ff88,#00d4ff,#00ff88,transparent)",
              boxShadow: "0 0 30px #00ff88, 0 0 80px rgba(0,255,136,0.6)",
              zIndex: 2,
            }}
          />
          {/* Everything above the wipe line fades to reveal the site */}
          <div
            className="absolute left-0 right-0 top-0 pointer-events-none"
            style={{
              height: `${scanY}%`,
              background: isGlitching
                ? `rgba(0,255,136,${0.05 + Math.random() * 0.08})`
                : "rgba(0,0,0,0)",
              transition: "background 0.05s",
              zIndex: 1,
            }}
          />
          {/* Chromatic aberration lines during glitch */}
          {isGlitching && (
            <>
              <div className="absolute left-0 right-0 pointer-events-none"
                style={{ top: `${scanY - 2}%`, height:"1px", background:"rgba(255,0,255,0.6)", zIndex: 3 }} />
              <div className="absolute left-0 right-0 pointer-events-none"
                style={{ top: `${scanY + 1}%`, height:"1px", background:"rgba(0,212,255,0.6)", zIndex: 3 }} />
            </>
          )}
        </>
      )}

      {/* ── BOOT CONTENT ── */}
      <div
        className="w-full max-w-2xl px-6 relative z-10"
        style={{
          opacity: phase === "transition" && scanY > 60 ? Math.max(0, 1 - (scanY - 60) / 40) : 1,
          transition: "opacity 0.1s",
        }}
      >
        {/* Logo */}
        <div className="mb-8 text-center">
          <div
            className="font-display font-black text-4xl sm:text-5xl text-accent tracking-widest"
            style={{ textShadow: "0 0 30px rgba(0,255,136,0.6), 0 0 60px rgba(0,255,136,0.3)" }}
          >
            NEXUS
          </div>
          <div className="font-label text-xs text-muted-fg tracking-[0.4em] mt-1">
            SOHOM NANDY // AI-ML ENGINEER
          </div>
        </div>

        {/* Terminal lines */}
        <div className="font-mono text-xs sm:text-sm space-y-1.5 mb-8" style={{ minHeight: "200px" }}>
          {BOOT_LINES.map((line, i) => (
            <div
              key={i}
              className="flex items-center gap-2"
              style={{
                opacity: visibleLines.includes(i) ? 1 : 0,
                transform: visibleLines.includes(i) ? "translateX(0)" : "translateX(-8px)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
                color: i === BOOT_LINES.length - 1 ? "#00ff88" : "#6b7280",
                textShadow: i === BOOT_LINES.length - 1 ? "0 0 8px rgba(0,255,136,0.6)" : "none",
              }}
            >
              {visibleLines.includes(i) && (
                <>
                  <span style={{ color: i === BOOT_LINES.length - 1 ? "#00ff88" : "#2a2a3a" }}>│</span>
                  <span>{line.text}</span>
                  {/* Blinking cursor on last visible line while still booting */}
                  {i === visibleLines[visibleLines.length - 1] && i < BOOT_LINES.length - 1 && (
                    <span className="inline-block w-2 h-3 bg-accent animate-pulse ml-1"
                      style={{ boxShadow: "0 0 6px #00ff88" }} />
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between font-label text-xs text-muted-fg">
            <span>LOADING PORTFOLIO</span>
            <span className="text-accent">{progress}%</span>
          </div>
          <div className="h-1 bg-muted relative overflow-hidden">
            <div
              className="h-full transition-all duration-300 ease-out"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg,#00ff88,#00d4ff)",
                boxShadow: "0 0 10px #00ff88",
              }}
            />
          </div>
        </div>

        {/* Press any key — only shown in "waiting" phase */}
        <div
          className="text-center font-label text-xs tracking-widest transition-opacity duration-500"
          style={{ opacity: phase === "waiting" ? 1 : 0 }}
        >
          <span
            className="text-accent animate-pulse"
            style={{ textShadow: "0 0 12px rgba(0,255,136,0.8)" }}
          >
            ▶ PRESS ANY KEY TO CONTINUE
          </span>
        </div>
      </div>
    </div>
  );
}
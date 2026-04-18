"use client";
import { useEffect, useState, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function SoundManager() {
  const [muted,   setMuted]   = useState(true);
  const [visible, setVisible] = useState(false);
  // Keep a single shared AudioContext — browsers block new ones until user gesture
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(t);
  }, []);

  // Create AudioContext lazily on first user interaction
  const getCtx = useCallback((): AudioContext | null => {
    try {
      const Ctor = window.AudioContext || (window as any).webkitAudioContext;
      if (!Ctor) return null;
      if (audioCtx) {
        if (audioCtx.state === "suspended") audioCtx.resume();
        return audioCtx;
      }
      const ctx = new Ctor();
      setAudioCtx(ctx);
      return ctx;
    } catch { return null; }
  }, [audioCtx]);

  const playSound = useCallback((type: string) => {
    if (muted) return;
    const ctx = getCtx();
    if (!ctx) return;

    try {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      const t = ctx.currentTime;

      switch (type) {
        case "hover":
          osc.type = "sine";
          osc.frequency.setValueAtTime(600, t);
          osc.frequency.exponentialRampToValueAtTime(900, t + 0.04);
          gain.gain.setValueAtTime(0.04, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
          osc.start(t); osc.stop(t + 0.1);
          break;
        case "click":
          osc.type = "square";
          osc.frequency.setValueAtTime(300, t);
          osc.frequency.exponentialRampToValueAtTime(600, t + 0.06);
          gain.gain.setValueAtTime(0.12, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
          osc.start(t); osc.stop(t + 0.15);
          break;
        case "boot":
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(80, t);
          osc.frequency.exponentialRampToValueAtTime(1200, t + 0.5);
          gain.gain.setValueAtTime(0.15, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
          osc.start(t); osc.stop(t + 0.7);
          break;
        case "glitch":
          osc.type = "square";
          osc.frequency.setValueAtTime(150, t);
          osc.frequency.setValueAtTime(900, t + 0.02);
          osc.frequency.setValueAtTime(80,  t + 0.04);
          osc.frequency.setValueAtTime(1800,t + 0.06);
          osc.frequency.setValueAtTime(200, t + 0.08);
          gain.gain.setValueAtTime(0.1, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
          osc.start(t); osc.stop(t + 0.15);
          break;
        case "transition":
          // Deep cinematic boom for boot→hero transition
          osc.type = "sine";
          osc.frequency.setValueAtTime(60, t);
          osc.frequency.exponentialRampToValueAtTime(30, t + 1.2);
          gain.gain.setValueAtTime(0.0, t);
          gain.gain.linearRampToValueAtTime(0.2, t + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 1.4);
          osc.start(t); osc.stop(t + 1.5);
          // Add high frequency shimmer
          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          osc2.connect(gain2); gain2.connect(ctx.destination);
          osc2.type = "sine";
          osc2.frequency.setValueAtTime(2000, t);
          osc2.frequency.exponentialRampToValueAtTime(400, t + 1.0);
          gain2.gain.setValueAtTime(0.06, t);
          gain2.gain.exponentialRampToValueAtTime(0.001, t + 1.2);
          osc2.start(t); osc2.stop(t + 1.3);
          break;
      }
    } catch { /* silently ignore */ }
  }, [muted, getCtx]);

  // Expose globally
  useEffect(() => {
    (window as any).__playSound = playSound;
  }, [playSound]);

  const toggle = () => {
    const next = !muted;
    setMuted(next);
    if (!next) {
      // Create context on this user gesture (required by browsers)
      const Ctor = window.AudioContext || (window as any).webkitAudioContext;
      if (Ctor) {
        const ctx = new Ctor();
        setAudioCtx(ctx);
        // Play directly on this ctx — no state delay issue
        try {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain); gain.connect(ctx.destination);
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(80, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.5);
          gain.gain.setValueAtTime(0.15, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
          osc.start(); osc.stop(ctx.currentTime + 0.7);
        } catch { /* ignore */ }
      }
    }
  };

  if (!visible) return null;

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-[9999] w-10 h-10 flex items-center justify-center border border-border bg-card/80 backdrop-blur-sm text-muted-fg hover:text-accent hover:border-accent transition-all duration-200"
      style={{
        clipPath: "polygon(0 6px,6px 0,calc(100% - 6px) 0,100% 6px,100% calc(100% - 6px),calc(100% - 6px) 100%,6px 100%,0 calc(100% - 6px))",
        boxShadow: muted ? "none" : "0 0 12px rgba(0,255,136,0.3)",
      }}
      title={muted ? "Enable sounds" : "Mute sounds"}
      data-hover
    >
      {muted
        ? <VolumeX size={15} strokeWidth={1.5} />
        : <Volume2 size={15} strokeWidth={1.5} className="text-accent" />
      }
    </button>
  );
}
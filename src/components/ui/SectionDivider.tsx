"use client";
import { useEffect, useRef } from "react";

export default function SectionDivider() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // ── 1. Base grid line ──────────────────────────────────────────
      const baseGrad = ctx.createLinearGradient(0, 0, W, 0);
      baseGrad.addColorStop(0,    "transparent");
      baseGrad.addColorStop(0.2,  "rgba(0,255,136,0.15)");
      baseGrad.addColorStop(0.5,  "rgba(0,255,136,0.35)");
      baseGrad.addColorStop(0.8,  "rgba(0,255,136,0.15)");
      baseGrad.addColorStop(1,    "transparent");
      ctx.beginPath();
      ctx.moveTo(0, H / 2);
      ctx.lineTo(W, H / 2);
      ctx.strokeStyle = baseGrad;
      ctx.lineWidth   = 1;
      ctx.stroke();

      // ── 2. Travelling bright pulse ─────────────────────────────────
      const pulseX = ((t * 0.6) % (W + 300)) - 150;
      const pulseGrad = ctx.createRadialGradient(
        pulseX, H / 2, 0,
        pulseX, H / 2, 180
      );
      pulseGrad.addColorStop(0,   "rgba(0,255,136,0.95)");
      pulseGrad.addColorStop(0.3, "rgba(0,212,255,0.5)");
      pulseGrad.addColorStop(0.7, "rgba(255,0,255,0.15)");
      pulseGrad.addColorStop(1,   "transparent");

      ctx.beginPath();
      ctx.moveTo(Math.max(0, pulseX - 180), H / 2);
      ctx.lineTo(Math.min(W, pulseX + 180), H / 2);
      ctx.strokeStyle = pulseGrad;
      ctx.lineWidth   = 2.5;
      ctx.shadowColor = "#00ff88";
      ctx.shadowBlur  = 18;
      ctx.stroke();
      ctx.shadowBlur  = 0;

      // ── 3. Data tick marks ─────────────────────────────────────────
      const tickCount = 18;
      for (let i = 0; i <= tickCount; i++) {
        const x       = (W / tickCount) * i;
        const phase   = (t * 0.04 + i * 0.4);
        const flicker = 0.3 + 0.7 * Math.abs(Math.sin(phase));
        const isMajor = i % 3 === 0;
        const tickH   = isMajor ? 10 : 5;

        ctx.beginPath();
        ctx.moveTo(x, H / 2 - tickH / 2);
        ctx.lineTo(x, H / 2 + tickH / 2);
        ctx.strokeStyle = `rgba(0,255,136,${flicker * (isMajor ? 0.7 : 0.3)})`;
        ctx.lineWidth   = isMajor ? 1.5 : 0.8;
        ctx.stroke();
      }

      // ── 4. Waveform ripple around pulse ────────────────────────────
      const wavePoints = 80;
      ctx.beginPath();
      for (let i = 0; i <= wavePoints; i++) {
        const x    = (W / wavePoints) * i;
        const dist = Math.abs(x - pulseX);
        const amp  = Math.max(0, 1 - dist / 200) * 6;
        const y    = H / 2 + Math.sin(i * 0.4 - t * 0.08) * amp;
        if (i === 0) { ctx.moveTo(x, y); } else { ctx.lineTo(x, y); }
      }
      ctx.strokeStyle = "rgba(0,212,255,0.4)";
      ctx.lineWidth   = 1;
      ctx.stroke();

      // ── 5. Corner accent brackets — inset from edge for alignment ──
      const bW = 20; const bH = 8;
      // Match page content padding: ~16px on mobile, ~24px on sm, ~32px on lg
      const pad = W < 640 ? 16 : W < 1024 ? 24 : 32;
      [0, 1].forEach((side) => {
        const ox = side === 0 ? pad : W - pad;
        const alpha = 0.4 + 0.3 * Math.sin(t * 0.05 + side);
        ctx.strokeStyle = `rgba(0,255,136,${alpha})`;
        ctx.shadowColor = `rgba(0,255,136,${alpha * 0.6})`;
        ctx.shadowBlur  = 6;
        ctx.lineWidth   = 1.5;
        const dir = side === 0 ? 1 : -1;
        // top arm
        ctx.beginPath();
        ctx.moveTo(ox, H / 2 - bH);
        ctx.lineTo(ox + dir * bW, H / 2 - bH);
        ctx.stroke();
        // bottom arm
        ctx.beginPath();
        ctx.moveTo(ox, H / 2 + bH);
        ctx.lineTo(ox + dir * bW, H / 2 + bH);
        ctx.stroke();
        // vertical connector
        ctx.beginPath();
        ctx.moveTo(ox, H / 2 - bH);
        ctx.lineTo(ox, H / 2 + bH);
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      t++;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative w-full" style={{ height: "40px" }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: "block" }}
      />
    </div>
  );
}
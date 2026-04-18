"use client";
import { useEffect, useRef } from "react";

interface TrailDot {
  x: number;
  y: number;
  alpha: number;
  size: number;
  color: string;
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Only on non-touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const trail: TrailDot[] = [];
    const COLORS = ["#00ff88", "#00d4ff", "#ff00ff"];
    let colorIndex = 0;
    let frameCount = 0;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      frameCount++;
      // Add dot every 2 frames for performance
      if (frameCount % 2 !== 0) return;

      // Cycle colors slowly
      if (trail.length % 12 === 0) colorIndex = (colorIndex + 1) % COLORS.length;

      trail.push({
        x: e.clientX,
        y: e.clientY,
        alpha: 0.7,
        size: 3 + Math.random() * 2,
        color: COLORS[colorIndex],
      });

      // Keep trail short
      if (trail.length > 28) trail.shift();
    };

    window.addEventListener("mousemove", onMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      trail.forEach((dot, i) => {
        // Fade out from head to tail
        dot.alpha = (i / trail.length) * 0.65;
        dot.size  = Math.max(0.5, (i / trail.length) * 3.5);

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = dot.color + Math.floor(dot.alpha * 255).toString(16).padStart(2, "0");
        ctx.shadowColor = dot.color;
        ctx.shadowBlur  = dot.size * 3;
        ctx.fill();
        ctx.shadowBlur  = 0;
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 99997 }}
    />
  );
}

"use client";
import { useEffect, useRef } from "react";

interface Shard {
  x: number; y: number; z: number;
  vx: number; vy: number; vz: number;
  size: number; rotX: number; rotY: number;
  rotSpeedX: number; rotSpeedY: number;
  color: string; alpha: number; pulse: number;
}

export default function FloatingShards() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;
    let mouseX = 0.5, mouseY = 0.5;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth;
      mouseY = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMouseMove);

    const COLORS = ["#00ff88", "#00d4ff", "#ff00ff", "#ffb000"];

    const shards: Shard[] = Array.from({ length: 18 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 200,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      vz: (Math.random() - 0.5) * 0.2,
      size: 6 + Math.random() * 20,
      rotX: Math.random() * Math.PI * 2,
      rotY: Math.random() * Math.PI * 2,
      rotSpeedX: (Math.random() - 0.5) * 0.02,
      rotSpeedY: (Math.random() - 0.5) * 0.02,
      color: COLORS[i % COLORS.length],
      alpha: 0.3 + Math.random() * 0.5,
      pulse: Math.random() * Math.PI * 2,
    }));

    const drawDiamond = (
      x: number, y: number, size: number,
      rotX: number, rotY: number,
      color: string, alpha: number
    ) => {
      const s = size * (1 + Math.sin(rotY) * 0.3);
      const h = s * 1.4 * (1 + Math.cos(rotX) * 0.3);

      // 3D diamond with face shading
      const faces = [
        { pts: [[0,-h*0.6],[s,0],[0,h*0.4]], shade: 0.9 },
        { pts: [[0,-h*0.6],[-s,0],[0,h*0.4]], shade: 0.5 },
        { pts: [[0,-h*0.6],[s,0],[0,-h*0.1]], shade: 0.7 },
        { pts: [[0,-h*0.6],[-s,0],[0,-h*0.1]], shade: 0.4 },
      ];

      faces.forEach(({ pts, shade }) => {
        ctx.beginPath();
        pts.forEach(([px, py], i) => {
          const mx = x + px;
          const my = y + py;
          if (i === 0) { ctx.moveTo(mx, my); } else { ctx.lineTo(mx, my); }
        });
        ctx.closePath();

        const hex = color.replace("#", "");
        const r = parseInt(hex.slice(0,2), 16);
        const g = parseInt(hex.slice(2,4), 16);
        const b = parseInt(hex.slice(4,6), 16);

        ctx.fillStyle = `rgba(${r},${g},${b},${alpha * shade * 0.6})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha * 0.9})`;
        ctx.lineWidth   = 0.8;
        ctx.stroke();
      });

      // Glow core
      ctx.beginPath();
      ctx.arc(x, y - h * 0.1, s * 0.25, 0, Math.PI * 2);
      ctx.fillStyle   = `${color}${Math.floor(alpha * 80).toString(16).padStart(2,"0")}`;
      ctx.shadowColor = color;
      ctx.shadowBlur  = 15;
      ctx.fill();
      ctx.shadowBlur  = 0;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = (mouseX - 0.5) * 60;
      const my = (mouseY - 0.5) * 40;

      shards.forEach(s => {
        // Parallax drift from mouse
        const px = s.x + (s.z / 200) * mx;
        const py = s.y + (s.z / 200) * my;

        s.x += s.vx;
        s.y += s.vy;
        s.rotX += s.rotSpeedX;
        s.rotY += s.rotSpeedY;
        s.pulse += 0.02;

        // Wrap around
        if (s.x < -50)  s.x = canvas.width  + 50;
        if (s.x > canvas.width  + 50) s.x = -50;
        if (s.y < -50)  s.y = canvas.height + 50;
        if (s.y > canvas.height + 50) s.y = -50;

        const scale  = 0.5 + (s.z / 200) * 0.5;
        const pulseA = s.alpha * (0.7 + 0.3 * Math.sin(s.pulse));

        drawDiamond(px, py, s.size * scale, s.rotX, s.rotY, s.color, pulseA);
      });

      // Scan line across the section
      const scanY = ((t * 0.8) % (canvas.height + 100)) - 50;
      const scanGrad = ctx.createLinearGradient(0, scanY - 20, 0, scanY + 20);
      scanGrad.addColorStop(0,   "transparent");
      scanGrad.addColorStop(0.5, "rgba(0,255,136,0.04)");
      scanGrad.addColorStop(1,   "transparent");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 20, canvas.width, 40);

      t++;
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
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
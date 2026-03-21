"use client";
import { useEffect, useRef } from "react";

export default function HoloGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width  = 340;
    canvas.height = 340;

    const cx = 170, cy = 170, R = 130;
    let t = 0, mouseX = 0, mouseY = 0;
    let rotX = 0.3, rotY = 0;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / canvas.width  - 0.5) * 2;
      mouseY = ((e.clientY - rect.top)  / canvas.height - 0.5) * 2;
    };
    canvas.addEventListener("mousemove", onMouseMove);

    // Generate globe points
    const points: [number, number, number][] = [];
    for (let lat = -80; lat <= 80; lat += 20) {
      const r = Math.cos((lat * Math.PI) / 180) * R;
      const y = Math.sin((lat * Math.PI) / 180) * R;
      const steps = Math.max(6, Math.round(r / 12));
      for (let i = 0; i < steps; i++) {
        const lng = (i / steps) * Math.PI * 2;
        points.push([r * Math.cos(lng), y, r * Math.sin(lng)]);
      }
    }

    // Meridian lines
    const meridians: [number,number,number][][] = [];
    for (let lng = 0; lng < Math.PI * 2; lng += Math.PI / 6) {
      const line: [number,number,number][] = [];
      for (let lat = -90; lat <= 90; lat += 5) {
        const r2 = Math.cos((lat * Math.PI) / 180) * R;
        const y2 = Math.sin((lat * Math.PI) / 180) * R;
        line.push([r2 * Math.cos(lng), y2, r2 * Math.sin(lng)]);
      }
      meridians.push(line);
    }

    // Parallels
    const parallels: [number,number,number][][] = [];
    for (let lat = -60; lat <= 60; lat += 20) {
      const line: [number,number,number][] = [];
      const r2 = Math.cos((lat * Math.PI) / 180) * R;
      const y2 = Math.sin((lat * Math.PI) / 180) * R;
      for (let i = 0; i <= 64; i++) {
        const lng = (i / 64) * Math.PI * 2;
        line.push([r2 * Math.cos(lng), y2, r2 * Math.sin(lng)]);
      }
      parallels.push(line);
    }

    const project = (x: number, y: number, z: number) => {
      // Rotate Y
      const ry = rotY + t * 0.003;
      const x1 =  x * Math.cos(ry) + z * Math.sin(ry);
      const z1 = -x * Math.sin(ry) + z * Math.cos(ry);
      // Rotate X
      const rx = rotX + mouseY * 0.4;
      const y2 =  y * Math.cos(rx) - z1 * Math.sin(rx);
      const z2 =  y * Math.sin(rx) + z1 * Math.cos(rx);
      const scale = 1 + z2 / (R * 4);
      return { sx: cx + x1 * scale, sy: cy + y2 * scale, z: z2, vis: z2 > -R * 0.1 };
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      rotY += (mouseX * 0.5 - rotY) * 0.02;

      // Outer glow ring
      const outerGlow = ctx.createRadialGradient(cx, cy, R * 0.7, cx, cy, R * 1.3);
      outerGlow.addColorStop(0,   "rgba(0,255,136,0.0)");
      outerGlow.addColorStop(0.6, "rgba(0,255,136,0.06)");
      outerGlow.addColorStop(1,   "rgba(0,255,136,0.0)");
      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // Inner atmosphere
      const atmo = ctx.createRadialGradient(cx - 30, cy - 30, 0, cx, cy, R);
      atmo.addColorStop(0,   "rgba(0,212,255,0.08)");
      atmo.addColorStop(0.6, "rgba(0,255,136,0.04)");
      atmo.addColorStop(1,   "rgba(255,0,255,0.02)");
      ctx.fillStyle = atmo;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // Meridian lines
      meridians.forEach(line => {
        ctx.beginPath();
        let started = false;
        line.forEach(([x, y, z]) => {
          const p = project(x, y, z);
          const alpha = p.vis ? 0.18 + (p.z / R) * 0.15 : 0;
          if (!started) { ctx.moveTo(p.sx, p.sy); started = true; }
          else ctx.lineTo(p.sx, p.sy);
          ctx.strokeStyle = `rgba(0,255,136,${Math.max(0, alpha)})`;
        });
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Parallels
      parallels.forEach(line => {
        ctx.beginPath();
        let started = false;
        line.forEach(([x, y, z]) => {
          const p = project(x, y, z);
          if (!started) { ctx.moveTo(p.sx, p.sy); started = true; }
          else ctx.lineTo(p.sx, p.sy);
        });
        ctx.strokeStyle = "rgba(0,212,255,0.12)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Data points
      const sorted = points
        .map(([x, y, z]) => ({ ...project(x, y, z) }))
        .sort((a, b) => a.z - b.z);

      sorted.forEach(p => {
        if (!p.vis) return;
        const alpha = 0.3 + (p.z / R) * 0.7;
        const size  = 1.2 + (p.z / R) * 1.5;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,136,${Math.max(0, Math.min(1, alpha))})`;
        ctx.shadowColor = "#00ff88";
        ctx.shadowBlur  = 4;
        ctx.fill();
        ctx.shadowBlur  = 0;
      });

      // Equator highlight pulse
      const eq = parallels[3];
      if (eq) {
        ctx.beginPath();
        let s = false;
        eq.forEach(([x, y, z]) => {
          const p = project(x, y, z);
          if (!s) { ctx.moveTo(p.sx, p.sy); s = true; }
          else ctx.lineTo(p.sx, p.sy);
        });
        const pulse = 0.4 + 0.3 * Math.sin(t * 0.05);
        ctx.strokeStyle = `rgba(255,0,255,${pulse})`;
        ctx.lineWidth   = 1.5;
        ctx.shadowColor = "#ff00ff";
        ctx.shadowBlur  = 8;
        ctx.stroke();
        ctx.shadowBlur  = 0;
      }

      // Orbiting satellite dot
      const satAngle = t * 0.02;
      const satX = R * 1.15 * Math.cos(satAngle);
      const satZ = R * 1.15 * Math.sin(satAngle);
      const satY = R * 0.3  * Math.sin(satAngle * 0.7);
      const satP = project(satX, satY, satZ);
      ctx.beginPath();
      ctx.arc(satP.sx, satP.sy, 3, 0, Math.PI * 2);
      ctx.fillStyle   = "#00d4ff";
      ctx.shadowColor = "#00d4ff";
      ctx.shadowBlur  = 12;
      ctx.fill();
      ctx.shadowBlur  = 0;

      // Satellite trail
      for (let i = 1; i <= 8; i++) {
        const ta = satAngle - i * 0.04;
        const tp = project(
          R * 1.15 * Math.cos(ta),
          R * 0.3  * Math.sin(ta * 0.7),
          R * 1.15 * Math.sin(ta)
        );
        ctx.beginPath();
        ctx.arc(tp.sx, tp.sy, 1.5 - i * 0.15, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${0.6 - i * 0.07})`;
        ctx.fill();
      }

      t++;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={340}
      height={340}
      className="w-full max-w-[340px]"
      style={{ imageRendering: "crisp-edges" }}
    />
  );
}

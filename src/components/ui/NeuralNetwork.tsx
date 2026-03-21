"use client";
import { useEffect, useRef } from "react";

interface Node {
  x: number; y: number;
  layer: number; index: number;
  activation: number; pulse: number;
  vPulse: number;
}

export default function NeuralNetwork() {
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

    // Build network topology
    const layers = [4, 6, 8, 6, 4];
    const nodes: Node[] = [];
    const W = () => canvas.width;
    const H = () => canvas.height;

    const buildNodes = () => {
      nodes.length = 0;
      layers.forEach((count, li) => {
        const lx = (W() * 0.15) + (li / (layers.length - 1)) * (W() * 0.7);
        for (let ni = 0; ni < count; ni++) {
          const ly = (H() * 0.15) + (ni / (count - 1 || 1)) * (H() * 0.7);
          nodes.push({
            x: lx, y: ly,
            layer: li, index: ni,
            activation: Math.random(),
            pulse: Math.random() * Math.PI * 2,
            vPulse: 0.02 + Math.random() * 0.03,
          });
        }
      });
    };
    buildNodes();
    window.addEventListener("resize", buildNodes);

    // Signal particles traveling along edges
    const signals: { from: Node; to: Node; progress: number; speed: number; color: string }[] = [];

    const spawnSignal = () => {
      if (signals.length > 30) return;
      const li  = Math.floor(Math.random() * (layers.length - 1));
      const fromNodes = nodes.filter(n => n.layer === li);
      const toNodes   = nodes.filter(n => n.layer === li + 1);
      if (!fromNodes.length || !toNodes.length) return;
      const from  = fromNodes[Math.floor(Math.random() * fromNodes.length)];
      const to    = toNodes[Math.floor(Math.random() * toNodes.length)];
      const COLORS = ["#00ff88", "#00d4ff", "#ff00ff"];
      signals.push({ from, to, progress: 0, speed: 0.008 + Math.random() * 0.012,
        color: COLORS[Math.floor(Math.random() * COLORS.length)] });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw edges
      for (let li = 0; li < layers.length - 1; li++) {
        const fromNodes = nodes.filter(n => n.layer === li);
        const toNodes   = nodes.filter(n => n.layer === li + 1);
        fromNodes.forEach(from => {
          toNodes.forEach(to => {
            const weight = 0.3 + Math.sin(from.pulse + to.pulse) * 0.15;
            ctx.beginPath();
            ctx.moveTo(from.x, from.y);
            ctx.lineTo(to.x, to.y);
            ctx.strokeStyle = `rgba(0,255,136,${weight * 0.25})`;
            ctx.lineWidth   = 0.5;
            ctx.stroke();
          });
        });
      }

      // Draw signal particles
      signals.forEach((sig, i) => {
        sig.progress += sig.speed;
        if (sig.progress >= 1) {
          signals.splice(i, 1);
          return;
        }
        const x = sig.from.x + (sig.to.x - sig.from.x) * sig.progress;
        const y = sig.from.y + (sig.to.y - sig.from.y) * sig.progress;

        // Trail
        for (let j = 1; j <= 5; j++) {
          const tp = Math.max(0, sig.progress - j * 0.02);
          const tx = sig.from.x + (sig.to.x - sig.from.x) * tp;
          const ty = sig.from.y + (sig.to.y - sig.from.y) * tp;
          ctx.beginPath();
          ctx.arc(tx, ty, 2 - j * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = `${sig.color}${Math.floor((0.6 - j * 0.1) * 255).toString(16).padStart(2,"0")}`;
          ctx.fill();
        }

        // Head
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle   = sig.color;
        ctx.shadowColor = sig.color;
        ctx.shadowBlur  = 12;
        ctx.fill();
        ctx.shadowBlur  = 0;
      });

      // Draw nodes
      nodes.forEach(node => {
        node.pulse += node.vPulse;
        node.activation = 0.4 + 0.6 * Math.abs(Math.sin(node.pulse + t * 0.01));

        const r     = 5 + node.activation * 4;
        const alpha = 0.5 + node.activation * 0.5;

        // Outer ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, r + 4, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,255,136,${alpha * 0.3})`;
        ctx.lineWidth   = 0.8;
        ctx.stroke();

        // Node body
        const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r);
        grad.addColorStop(0,   `rgba(0,255,136,${alpha})`);
        grad.addColorStop(0.6, `rgba(0,212,255,${alpha * 0.6})`);
        grad.addColorStop(1,   `rgba(0,255,136,0)`);
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle   = grad;
        ctx.shadowColor = "#00ff88";
        ctx.shadowBlur  = node.activation * 15;
        ctx.fill();
        ctx.shadowBlur  = 0;
      });

      // Spawn signals periodically
      if (t % 8 === 0) spawnSignal();

      t++;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", buildNodes);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}

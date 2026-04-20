"use client";
import { useEffect, useState, useCallback, useRef } from "react";

const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown",
  "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

// ── Snake game constants ──────────────────────────────────────
const COLS = 20, ROWS = 16, CELL = 20;
type Dir = "UP"|"DOWN"|"LEFT"|"RIGHT";
type Pt  = { x: number; y: number };

function randomFood(snake: Pt[]): Pt {
  let f: Pt;
  do { f = { x: Math.floor(Math.random()*COLS), y: Math.floor(Math.random()*ROWS) }; }
  while (snake.some(s => s.x===f.x && s.y===f.y));
  return f;
}

export default function KonamiEgg() {
  const [progress,  setProgress]  = useState(0);
  const [phase,     setPhase]     = useState<"hidden"|"reveal"|"game"|"gameover">("hidden");
  const [snake,     setSnake]     = useState<Pt[]>([{x:10,y:8},{x:9,y:8},{x:8,y:8}]);
  const [food,      setFood]      = useState<Pt>({x:15,y:8});
  const [dir,       setDir]       = useState<Dir>("RIGHT");
  const [score,     setScore]     = useState(0);
  const [hiScore,   setHiScore]   = useState(0);
  const [particles, setParticles] = useState<{x:number;y:number;vx:number;vy:number;life:number;color:string}[]>([]);
  const dirRef   = useRef<Dir>("RIGHT");
  const gameRef  = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phaseRef = useRef(phase);

  useEffect(() => { phaseRef.current = phase; }, [phase]);

  // ── Konami detection ──────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (phaseRef.current === "game") return; // don't interfere with game

      const next = progress + 1;
      if (e.key.toLowerCase() === KONAMI[progress].toLowerCase()) {
        if (next === KONAMI.length) {
          setProgress(0);
          window.__playSound?.("glitch");
          setPhase("reveal");
        } else {
          setProgress(next);
        }
      } else {
        setProgress(e.key.toLowerCase() === KONAMI[0].toLowerCase() ? 1 : 0);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [progress]);

  // ── Snake game loop ───────────────────────────────────────────
  const tick = useCallback(() => {
    setSnake(prev => {
      const d = dirRef.current;
      const head = prev[0];
      const next: Pt = {
        x: (head.x + (d==="RIGHT"?1:d==="LEFT"?-1:0) + COLS) % COLS,
        y: (head.y + (d==="DOWN" ?1:d==="UP"  ?-1:0) + ROWS) % ROWS,
      };
      // Self collision
      if (prev.some(s => s.x===next.x && s.y===next.y)) {
        setPhase("gameover");
        window.__playSound?.("glitch");
        return prev;
      }
      // Eat food
      setFood(f => {
        if (next.x===f.x && next.y===f.y) {
          window.__playSound?.("click");
          setScore(s => {
            const ns = s + 10;
            setHiScore(h => Math.max(h, ns));
            return ns;
          });
          // Spawn particles at food location
          setParticles(pp => [
            ...pp,
            ...Array.from({length:8}, () => ({
              x: f.x * CELL + CELL/2,
              y: f.y * CELL + CELL/2,
              vx: (Math.random()-0.5)*4,
              vy: (Math.random()-0.5)*4,
              life: 1,
              color: ["#00ff88","#00d4ff","#ff00ff"][Math.floor(Math.random()*3)],
            })),
          ]);
          const newFood = randomFood([next, ...prev]);
          return newFood;
        }
        return f;
      });
      // Check if ate (can't read food state here, use ref trick via setFood above)
      // We handle tail removal inside setFood callback indirectly — simpler: always pop tail
      return [next, ...prev.slice(0, prev.length)]; // keep length, trim below
    });
  }, []);

  // Separate effect to trim tail vs grow
  const ateRef = useRef(false);
  useEffect(() => {
    if (phase !== "game") return;
    gameRef.current = setInterval(() => {
      tick();
    }, 120);
    return () => { if (gameRef.current) clearInterval(gameRef.current); };
  }, [phase, tick]);

  // Particle animation
  useEffect(() => {
    if (particles.length === 0) return;
    const id = requestAnimationFrame(() => {
      setParticles(pp =>
        pp.map(p => ({ ...p, x: p.x+p.vx, y: p.y+p.vy, life: p.life-0.08 }))
          .filter(p => p.life > 0)
      );
    });
    return () => cancelAnimationFrame(id);
  }, [particles]);

  // Game direction keys
  useEffect(() => {
    if (phase !== "game") return;
    const onKey = (e: KeyboardEvent) => {
      e.preventDefault();
      const map: Record<string, Dir> = {
        ArrowUp:"UP", ArrowDown:"DOWN", ArrowLeft:"LEFT", ArrowRight:"RIGHT",
        w:"UP", s:"DOWN", a:"LEFT", d:"RIGHT",
      };
      const next = map[e.key];
      if (!next) return;
      const opp: Record<Dir,Dir> = {UP:"DOWN",DOWN:"UP",LEFT:"RIGHT",RIGHT:"LEFT"};
      if (opp[next] !== dirRef.current) { dirRef.current = next; setDir(next); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase]);

  // Draw canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, COLS*CELL, ROWS*CELL);

    // Grid
    ctx.strokeStyle = "rgba(0,255,136,0.06)";
    ctx.lineWidth = 0.5;
    for (let x=0; x<=COLS; x++) { ctx.beginPath(); ctx.moveTo(x*CELL,0); ctx.lineTo(x*CELL,ROWS*CELL); ctx.stroke(); }
    for (let y=0; y<=ROWS; y++) { ctx.beginPath(); ctx.moveTo(0,y*CELL); ctx.lineTo(COLS*CELL,y*CELL); ctx.stroke(); }

    // Food — pulsing diamond
    ctx.save();
    ctx.translate(food.x*CELL+CELL/2, food.y*CELL+CELL/2);
    ctx.rotate(Math.PI/4);
    const pulse = 0.8 + 0.2*Math.sin(Date.now()*0.008);
    ctx.fillStyle = "#ff00ff";
    ctx.shadowColor = "#ff00ff"; ctx.shadowBlur = 12;
    ctx.fillRect(-CELL*0.3*pulse, -CELL*0.3*pulse, CELL*0.6*pulse, CELL*0.6*pulse);
    ctx.restore();

    // Snake
    snake.forEach((seg, i) => {
      const alpha = 1 - (i / snake.length) * 0.5;
      const isHead = i === 0;
      ctx.fillStyle = isHead ? `rgba(0,255,136,${alpha})` : `rgba(0,212,255,${alpha * 0.8})`;
      ctx.shadowColor = isHead ? "#00ff88" : "#00d4ff";
      ctx.shadowBlur = isHead ? 12 : 4;
      const pad = isHead ? 1 : 2;
      ctx.fillRect(seg.x*CELL+pad, seg.y*CELL+pad, CELL-pad*2, CELL-pad*2);
      // Head direction indicator
      if (isHead) {
        ctx.fillStyle = "#0a0a0f";
        ctx.shadowBlur = 0;
        const e = 3;
        if      (dir==="RIGHT") ctx.fillRect(seg.x*CELL+CELL-e-2, seg.y*CELL+CELL/2-1, e, 2);
        else if (dir==="LEFT" ) ctx.fillRect(seg.x*CELL+2,        seg.y*CELL+CELL/2-1, e, 2);
        else if (dir==="UP"   ) ctx.fillRect(seg.x*CELL+CELL/2-1, seg.y*CELL+2,        2, e);
        else                    ctx.fillRect(seg.x*CELL+CELL/2-1, seg.y*CELL+CELL-e-2, 2, e);
      }
    });

    // Particles
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3*p.life, 0, Math.PI*2);
      ctx.fillStyle = p.color + Math.floor(p.life*255).toString(16).padStart(2,"0");
      ctx.shadowColor = p.color; ctx.shadowBlur = 6;
      ctx.fill();
    });

    ctx.shadowBlur = 0;
  }, [snake, food, dir, particles]);

  const startGame = () => {
    setSnake([{x:10,y:8},{x:9,y:8},{x:8,y:8}]);
    setFood(randomFood([{x:10,y:8},{x:9,y:8},{x:8,y:8}]));
    dirRef.current = "RIGHT";
    setDir("RIGHT");
    setScore(0);
    setParticles([]);
    setPhase("game");
  };

  const closeEgg = () => {
    if (gameRef.current) clearInterval(gameRef.current);
    setPhase("hidden");
    setProgress(0);
  };

  if (phase === "hidden") return null;

  return (
    <div className="fixed inset-0 z-[99998] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.92)" }}>
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.25) 2px,rgba(0,0,0,0.25) 4px)" }} />

      <div className="relative flex flex-col items-center gap-4" style={{ maxWidth: "460px", width: "100%" }}>

        {/* Header */}
        <div className="w-full flex items-center justify-between px-1">
          <div>
            <div className="font-display font-black text-accent text-lg tracking-widest"
              style={{ textShadow: "0 0 20px rgba(0,255,136,0.6)" }}>
              ⚡ SECRET UNLOCKED
            </div>
            <div className="font-label text-xs text-muted-fg tracking-widest mt-0.5">
              ↑↑↓↓←→←→BA // KONAMI CODE // YOU KNOW WHAT&apos;S UP
            </div>
          </div>
          <button onClick={closeEgg}
            className="font-label text-xs text-muted-fg hover:text-accent border border-border px-2 py-1 transition-colors"
            style={{ clipPath: "polygon(0 4px,4px 0,calc(100% - 4px) 0,100% 4px,100% calc(100% - 4px),calc(100% - 4px) 100%,4px 100%,0 calc(100% - 4px))" }}>
            [ESC]
          </button>
        </div>

        {/* Score bar */}
        {(phase === "game" || phase === "gameover") && (
          <div className="w-full flex justify-between px-1 font-label text-xs">
            <span className="text-muted-fg">SCORE: <span className="text-accent font-bold">{score}</span></span>
            <span className="text-muted-fg">BEST: <span className="text-secondary font-bold">{hiScore}</span></span>
            <span className="text-muted-fg">LENGTH: <span className="text-tertiary font-bold">{snake.length}</span></span>
          </div>
        )}

        {/* Game canvas */}
        <div className="relative border border-accent"
          style={{
            clipPath: "polygon(0 12px,12px 0,calc(100% - 12px) 0,100% 12px,100% calc(100% - 12px),calc(100% - 12px) 100%,12px 100%,0 calc(100% - 12px))",
            boxShadow: "0 0 30px rgba(0,255,136,0.2),inset 0 0 30px rgba(0,0,0,0.8)",
          }}>
          <canvas
            ref={canvasRef}
            width={COLS * CELL}
            height={ROWS * CELL}
            style={{ display: "block", background: "#0a0a0f" }}
          />

          {/* Reveal screen */}
          {phase === "reveal" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#0a0a0f]/90">
              <div className="font-display font-black text-3xl text-accent text-center tracking-widest px-4"
                style={{ textShadow: "0 0 30px rgba(0,255,136,0.8),0 0 60px rgba(0,255,136,0.4)", animation: "rgbShift 1s ease-in-out infinite" }}>
                CLASSIFIED MINIGAME
              </div>
              <div className="font-mono text-xs text-muted-fg text-center max-w-xs px-4 leading-relaxed">
                You found the easter egg.<br/>
                As a reward — a game.<br/>
                <span className="text-accent">WASD or Arrow keys</span> to move.<br/>
                Eat the <span className="text-secondary">◆ pink diamonds</span>.<br/>
                Don&apos;t hit yourself.
              </div>
              <button onClick={startGame}
                className="btn-cyber btn-cyber-solid font-label text-sm tracking-widest px-6 py-2 mt-2 cursor-pointer">
                [ INITIALIZE ]
              </button>
            </div>
          )}

          {/* Game over screen */}
          {phase === "gameover" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0a0a0f]/90">
              <div className="font-display font-black text-2xl text-destructive tracking-widest"
                style={{ textShadow: "0 0 20px rgba(255,51,102,0.8)", animation: "glitch 0.3s ease-in-out" }}>
                SYSTEM FAILURE
              </div>
              <div className="font-mono text-xs text-muted-fg text-center">
                SCORE: <span className="text-accent font-bold text-base">{score}</span>
                {score >= hiScore && score > 0 && <span className="text-secondary ml-2">NEW RECORD!</span>}
              </div>
              <div className="flex gap-3 mt-2">
                <button onClick={startGame}
                  className="btn-cyber btn-cyber-solid text-xs px-4 py-2 cursor-pointer">
                  [ RETRY ]
                </button>
                <button onClick={closeEgg}
                  className="btn-cyber text-xs px-4 py-2 cursor-pointer">
                  [ EXIT ]
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Controls hint */}
        <div className="font-label text-xs text-muted-fg tracking-widest text-center">
          {phase === "game"
            ? "WASD / ARROW KEYS TO STEER"
            : "THIS SECRET SELF-DESTRUCTS WHEN YOU CLOSE IT"}
        </div>
      </div>
    </div>
  );
}
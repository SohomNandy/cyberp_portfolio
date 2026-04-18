"use client";
import { useTypewriter } from "@/hooks/useTypewriter";
import HoloGlobeCanvas from "@/components/ui/HoloGlobeCanvas";
import MagneticButton from "@/components/ui/MagneticButton";
import { ArrowRight, Terminal, Github, Linkedin, Mail } from "lucide-react";

const roles = [
  "ML SECURITY ENGINEER",
  "GNN RESEARCHER",
  "LLM FINE-TUNER",
  "FULL-STACK BUILDER",
  "CYBERSECURITY ANALYST",
];

export default function Hero() {
  const typed = useTypewriter(roles, 70, 35, 2200);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14">
      <div className="absolute inset-0 grid-bg opacity-50" style={{ backgroundSize: "50px 50px" }} />
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 20% 50%,rgba(0,255,136,0.07) 0%,transparent 55%),radial-gradient(ellipse at 80% 20%,rgba(255,0,255,0.05) 0%,transparent 50%)",
      }} />

      {/* Corner marks */}
      <div className="absolute top-20 left-4 w-10 h-10 sm:w-16 sm:h-16 border-l-2 border-t-2 border-accent opacity-40 hidden sm:block" />
      <div className="absolute top-20 right-4 w-10 h-10 sm:w-16 sm:h-16 border-r-2 border-t-2 border-accent opacity-40 hidden sm:block" />
      <div className="absolute bottom-12 left-4 w-10 h-10 sm:w-16 sm:h-16 border-l-2 border-b-2 border-secondary opacity-30 hidden sm:block" />
      <div className="absolute bottom-12 right-4 w-10 h-10 sm:w-16 sm:h-16 border-r-2 border-b-2 border-secondary opacity-30 hidden sm:block" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">

          {/* LEFT — text */}
          <div className="lg:col-span-3 flex flex-col gap-4 sm:gap-5">

            {/* Status badge */}
            <div className="self-start flex items-center gap-2 px-3 py-1.5 border border-border bg-card/60 backdrop-blur-sm font-label text-xs text-muted-fg"
              style={{ clipPath: "polygon(0 4px,4px 0,calc(100% - 4px) 0,100% 4px,100% calc(100% - 4px),calc(100% - 4px) 100%,4px 100%,0 calc(100% - 4px))" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_6px_#00ff88] shrink-0" />
              <span>PORTFOLIO ONLINE</span>
              <span className="text-accent ml-1">[OK]</span>
            </div>

            {/* Mobile: photo + name side by side */}
            <div className="flex items-start gap-4 lg:block">

              {/* Photo — shown on mobile/tablet inline, hidden on lg (shown in right panel) */}
              <div className="shrink-0 lg:hidden">
                <ProfilePhoto size="sm" />
              </div>

              {/* Name */}
              <div className="font-display font-black uppercase leading-none">
                <div className="text-muted-fg text-xs sm:text-sm font-label tracking-widest mb-2">&gt; IDENTIFY USER...</div>
                <div className="glitch-text text-4xl sm:text-6xl lg:text-7xl text-accent"
                  data-text="SOHOM"
                  style={{ textShadow: "0 0 30px rgba(0,255,136,0.35),0 0 60px rgba(0,255,136,0.15)" }}>
                  SOHOM
                </div>
                <div className="text-4xl sm:text-6xl lg:text-7xl text-[#e0e0e0]"
                  style={{ textShadow: "-2px 0 rgba(255,0,255,0.25),2px 0 rgba(0,212,255,0.25)" }}>
                  NANDY
                </div>
              </div>
            </div>

            {/* Typewriter */}
            <div className="flex items-center gap-2 h-6 sm:h-7 min-w-0 overflow-hidden">
              <span className="text-secondary font-label text-xs sm:text-sm tracking-widest shrink-0">&gt;&gt;</span>
              <span className="font-label text-xs sm:text-sm tracking-widest text-[#e0e0e0] truncate">{typed}</span>
              <span className="typewriter-cursor shrink-0" />
            </div>

            {/* Bio */}
            <p className="text-muted-fg text-xs sm:text-base leading-relaxed font-mono border-l-2 border-accent pl-3 sm:pl-4">
              Final-year B.Tech CS @{" "}
              <span className="text-accent">Sister Nivedita University</span>.
              Building <span className="text-tertiary">multi-cloud threat intelligence</span> with GNNs.
              Fine-tuning <span className="text-secondary">LLaMA 3.1 8B</span> for SIEM log generation.
              CGPA: <span className="text-accent font-bold">8.20</span>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mt-1">
              <MagneticButton href="#projects"
                className="btn-cyber btn-cyber-solid flex items-center gap-1.5 text-xs px-4 py-2 sm:px-5 sm:py-2.5">
                [ VIEW PROJECTS ] <ArrowRight size={12} strokeWidth={2.5} />
              </MagneticButton>
              <MagneticButton href="#contact"
                className="btn-cyber flex items-center gap-1.5 text-xs px-4 py-2 sm:px-5 sm:py-2.5">
                <Terminal size={12} strokeWidth={2.5} /> [ CONTACT ]
              </MagneticButton>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 sm:gap-4 mt-1 flex-wrap">
              {[
                { icon: Github,   label: "github.com/SohomNandy", href: "https://github.com/SohomNandy" },
                { icon: Linkedin, label: "linkedin",               href: "https://linkedin.com/in/sohom-nandy" },
                { icon: Mail,     label: "sohomnandy9@gmail.com",  href: "mailto:sohomnandy9@gmail.com" },
              ].map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-muted-fg hover:text-accent transition-colors duration-200 text-xs font-label group min-w-0"
                  data-hover>
                  <Icon size={13} strokeWidth={1.5} className="shrink-0 group-hover:drop-shadow-[0_0_4px_#00ff88]" />
                  <span className="hidden sm:inline truncate">{label}</span>
                </a>
              ))}
            </div>

            {/* Stats strip — anchors left column bottom on desktop */}
            <div className="hidden lg:flex items-stretch gap-0 mt-2 pt-4 border-t border-border">
              {[
                { val: "83%",   label: "PRECISION GAIN",   color: "#00ff88" },
                { val: "410K+", label: "TRAINING PAIRS",   color: "#00d4ff" },
                { val: "8.20",  label: "CGPA",             color: "#ffb000" },
              ].map((s, i) => (
                <div key={s.label}
                  className="flex-1 px-4 first:pl-0 border-l border-border first:border-0">
                  <div className="font-display font-bold text-lg"
                    style={{ color: s.color, textShadow: `0 0 8px ${s.color}60` }}>
                    {s.val}
                  </div>
                  <div className="font-label text-xs text-muted-fg tracking-widest mt-0.5">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT — HUD panel + photo + globe, desktop only */}
          <div className="lg:col-span-2 hidden lg:block">
            <div className="relative pr-12" style={{ overflow: "visible" }}>

              {/* Globe — glowing behind everything */}
              <div className="absolute -top-20 -left-20 opacity-75 pointer-events-none z-0"
                style={{ filter: "drop-shadow(0 0 30px rgba(0,255,136,0.7)) drop-shadow(0 0 60px rgba(0,255,136,0.3))" }}>
                <HoloGlobeCanvas />
              </div>

              {/* Identity panel — photo now lives inside it */}
              <div className="relative z-10">
                <IdentityPanel />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-fg">
        <span className="font-label text-xs tracking-widest">SCROLL_DOWN</span>
        <div className="w-px h-8 bg-gradient-to-b from-muted-fg to-transparent" />
      </div>
    </section>
  );
}

/* ── Profile Photo ─────────────────────────────────────────── */
function ProfilePhoto({ size = "md" }: { size?: "sm" | "md" }) {
  const w = size === "sm" ? 72 : 96;
  const h = size === "sm" ? 88 : 116;
  const cut = size === "sm" ? 8 : 10;

  const clip = `polygon(0 ${cut}px,${cut}px 0,calc(100% - ${cut}px) 0,100% ${cut}px,100% calc(100% - ${cut}px),calc(100% - ${cut}px) 100%,${cut}px 100%,0 calc(100% - ${cut}px))`;

  return (
    <div className="relative group" style={{ width: `${w}px`, height: `${h}px` }}>

      {/* Neon border frame */}
      <div className="absolute inset-0 border border-accent"
        style={{ clipPath: clip, boxShadow: "0 0 14px rgba(0,255,136,0.4),inset 0 0 12px rgba(0,255,136,0.05)" }} />

      {/* Photo + overlays */}
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: clip }}>
        <img
          src="/yeahh.jpg"
          alt="Sohom Nandy"
          className="w-full h-full object-cover object-top"
          style={{ filter: "grayscale(100%) brightness(0.85) contrast(1.2)", transition: "filter 0.3s ease" }}
        />
        {/* Green phosphor tint */}
        <div className="absolute inset-0" style={{ background: "rgba(0,255,136,0.12)", mixBlendMode: "screen" }} />
        {/* CRT scanlines */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.22) 2px,rgba(0,0,0,0.22) 4px)" }} />
        {/* Magenta hover glitch */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
          style={{ background: "rgba(255,0,255,0.09)", mixBlendMode: "screen" }} />
      </div>

      {/* Corner HUD marks */}
      <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-accent"
        style={{ boxShadow: "-2px -2px 5px rgba(0,255,136,0.5)" }} />
      <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-accent"
        style={{ boxShadow: "2px -2px 5px rgba(0,255,136,0.5)" }} />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-accent" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-accent" />

      {/* [VERIFIED] — overlaid on bottom of photo inside the border */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center"
        style={{
          background: "linear-gradient(transparent, rgba(0,0,0,0.75))",
          clipPath: `polygon(0 0,100% 0,100% calc(100% - ${cut}px),calc(100% - ${cut}px) 100%,${cut}px 100%,0 calc(100% - ${cut}px))`,
          paddingBottom: "4px", paddingTop: "8px",
        }}>
        <span className="font-label tracking-widest text-accent"
          style={{ fontSize: "7px", textShadow: "0 0 6px rgba(0,255,136,1)" }}>
          [VERIFIED]
        </span>
      </div>
    </div>
  );
}

/* ── Identity Panel ────────────────────────────────────────── */
function IdentityPanel() {
  const skills = [
    { label: "ML / GNN",      val: 90, color: "#00ff88" },
    { label: "LLM FINE-TUNE", val: 85, color: "#00d4ff" },
    { label: "CYBERSECURITY", val: 80, color: "#ff00ff" },
    { label: "BACKEND / API", val: 75, color: "#ffb000" },
    { label: "FRONTEND",      val: 65, color: "#00d4ff" },
  ];
  return (
    <div className="relative" style={{ overflow: "visible" }}>
      <div className="border border-border bg-card/80 backdrop-blur-sm overflow-hidden"
        style={{ clipPath: "polygon(0 20px,20px 0,calc(100% - 20px) 0,100% 20px,100% calc(100% - 20px),calc(100% - 20px) 100%,20px 100%,0 calc(100% - 20px))" }}>
        <div className="terminal-header">
          <div className="terminal-dot bg-destructive" />
          <div className="terminal-dot bg-[#ffb000]" />
          <div className="terminal-dot bg-accent" />
          <span className="ml-2">identity.json</span>
          <span className="ml-auto opacity-50 text-xs">UID: SN-0x4A2F</span>
        </div>

        {/* Photo row — sits between header and JSON */}
        <div className="flex items-center gap-4 px-4 py-3 border-b border-border"
          style={{ background: "rgba(0,255,136,0.03)" }}>
          <ProfilePhoto size="sm" />
          <div>
            <div className="font-display font-bold text-sm text-accent tracking-wider"
              style={{ textShadow: "0 0 8px rgba(0,255,136,0.4)" }}>
              SOHOM NANDY
            </div>
            <div className="font-label text-xs text-tertiary tracking-widest mt-0.5">
              AI/ML ENGINEER
            </div>
            <div className="font-label text-xs text-muted-fg tracking-wider mt-0.5">
              Kolkata, IN
            </div>
          </div>
        </div>

        <div className="p-4 font-mono text-xs space-y-1">
          <div className="text-muted-fg">{"{"}</div>
          <JsonLine k="name"        v='"Sohom Nandy"'                           vc="accent"    />
          <JsonLine k="role"        v='"AI/ML Engineer"'                        vc="tertiary"  />
          <JsonLine k="location"    v='"Kolkata, IN"'                           vc="secondary" />
          <JsonLine k="cgpa"        v="8.20"                                    vc="accent"    />
          <JsonLine k="status"      v='"seeking_opportunities"'                 vc="accent"    />
          <JsonLine k="huggingface" v='"sohomn/siem-log-generator-llama31-8b"'  vc="tertiary"  />
          <div className="text-muted-fg">{"}"}</div>
        </div>
        <div className="border-t border-border px-4 py-3">
          <div className="text-accent font-label text-xs mb-3 tracking-widest">&#47;&#47; PROFICIENCY INDEX</div>
          <div className="space-y-2">
            {skills.map((s, i) => (
              <div key={s.label}>
                <div className="flex justify-between text-xs font-label text-muted-fg mb-1">
                  <span>{s.label}</span>
                  <span style={{ color: s.color }}>{s.val}%</span>
                </div>
                <div className="h-1.5 bg-muted">
                  <div className="h-full" style={{
                    width: `${s.val}%`,
                    background: `linear-gradient(90deg,${s.color},${s.color}60)`,
                    boxShadow: `0 0 6px ${s.color}80`,
                    animation: `slideRight 1s ease-out ${i * 150}ms both`,
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vertical OPEN_TO_HIRE tab */}
      <div className="absolute top-0 h-full flex items-center" style={{ left: "calc(100% + 8px)" }} aria-hidden="true">
        <div className="bg-card border border-accent text-accent font-label"
          style={{
            writingMode: "vertical-rl", textOrientation: "mixed",
            transform: "rotate(360deg)", fontSize: "12px", letterSpacing: "3px",
            padding: "18px 6px", boxShadow: "0 0 14px rgba(0,255,136,0.2)", whiteSpace: "nowrap",
            clipPath: "polygon(0 6px,6px 0,calc(100% - 6px) 0,100% 6px,100% calc(100% - 6px),calc(100% - 6px) 100%,6px 100%,0 calc(100% - 6px))",
            display: "flex", alignItems: "center", gap: "6px",
          }}>
          <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse shrink-0"
            style={{ boxShadow: "0 0 5px #00ff88" }} />
          OPEN_TO_HIRE
        </div>
      </div>
    </div>
  );
}

/* ── Json Line ─────────────────────────────────────────────── */
function JsonLine({ k, v, vc }: { k: string; v: string; vc: string }) {
  const colorMap: Record<string, string> = { accent: "#00ff88", secondary: "#ff00ff", tertiary: "#00d4ff", muted: "#6b7280" };
  return (
    <div className="pl-3 flex gap-1 flex-wrap min-w-0">
      <span className="text-[#e0e0e0] shrink-0">&quot;{k}&quot;</span>
      <span className="text-muted-fg shrink-0">:</span>
      <span style={{ color: colorMap[vc] }} className="break-all">{v}</span>
      <span className="text-muted-fg shrink-0">,</span>
    </div>
  );
}
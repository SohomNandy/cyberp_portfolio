"use client";
import { useTypewriter } from "@/hooks/useTypewriter";
import { ArrowRight, Terminal, Github, Linkedin, Mail, Phone } from "lucide-react";

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-50" style={{ backgroundSize: "50px 50px" }} />

      {/* Radial gradient mesh */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(0,255,136,0.07) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(255,0,255,0.05) 0%, transparent 50%), radial-gradient(ellipse at 50% 90%, rgba(0,212,255,0.04) 0%, transparent 50%)",
        }}
      />

      {/* Corner frame decorations */}
      <div className="absolute top-24 left-6 w-16 h-16 border-l-2 border-t-2 border-accent opacity-40" />
      <div className="absolute top-24 right-6 w-16 h-16 border-r-2 border-t-2 border-accent opacity-40" />
      <div className="absolute bottom-16 left-6 w-16 h-16 border-l-2 border-b-2 border-secondary opacity-30" />
      <div className="absolute bottom-16 right-6 w-16 h-16 border-r-2 border-b-2 border-secondary opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">

          {/* Left — Text (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-5">

            {/* Status badge */}
            <div className="flex items-center gap-3 self-start">
              <div
                className="flex items-center gap-2 px-3 py-1.5 border border-border bg-card/60 backdrop-blur-sm font-label text-xs text-muted-fg"
                style={{ clipPath: "polygon(0 4px,4px 0,calc(100% - 4px) 0,100% 4px,100% calc(100% - 4px),calc(100% - 4px) 100%,4px 100%,0 calc(100% - 4px))" }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_6px_#00ff88]" />
                <span>PORTFOLIO ONLINE</span>
                <span className="text-accent ml-1">[OK]</span>
              </div>
            </div>

            {/* Headline */}
            <div className="font-display font-black uppercase leading-none">
              <div className="text-muted-fg text-sm font-label tracking-widest mb-2">
                &gt; IDENTIFY USER...
              </div>
              <div
                className="glitch-text text-5xl sm:text-6xl lg:text-7xl text-accent"
                data-text="SOHOM"
                style={{ textShadow: "0 0 30px rgba(0,255,136,0.35), 0 0 60px rgba(0,255,136,0.15)" }}
              >
                SOHOM
              </div>
              <div
                className="text-5xl sm:text-6xl lg:text-7xl text-[#e0e0e0]"
                style={{ textShadow: "-2px 0 rgba(255,0,255,0.25), 2px 0 rgba(0,212,255,0.25)" }}
              >
                NANDY
              </div>
            </div>

            {/* Typewriter role */}
            <div className="flex items-center gap-2 h-7">
              <span className="text-secondary font-label text-sm tracking-widest">&gt;&gt;</span>
              <span className="font-label text-sm sm:text-base tracking-widest text-[#e0e0e0]">{typed}</span>
              <span className="typewriter-cursor" />
            </div>

            {/* Bio */}
            <p className="text-muted-fg text-sm leading-relaxed max-w-xl font-mono border-l-2 border-accent pl-4">
              Final-year B.Tech CS @ <span className="text-accent">Sister Nivedita University</span>.
              Building <span className="text-tertiary">multi-cloud threat intelligence</span> with GNNs.
              Fine-tuning <span className="text-secondary">LLaMA 3.1 8B</span> for SIEM log generation.
              CGPA: <span className="text-accent font-bold">8.20</span>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 mt-1">
              <a href="#projects" className="btn-cyber btn-cyber-solid flex items-center gap-2 text-xs px-5 py-2.5">
                [ VIEW PROJECTS ] <ArrowRight size={13} strokeWidth={2.5} />
              </a>
              <a href="#contact" className="btn-cyber flex items-center gap-2 text-xs px-5 py-2.5">
                <Terminal size={13} strokeWidth={2.5} /> [ CONTACT ]
              </a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 mt-1">
              {[
                { icon: Github, label: "github.com/SohomNandy", href: "https://github.com/SohomNandy" },
                { icon: Linkedin, label: "linkedin", href: "https://linkedin.com/in/sohom-nandy" },
                { icon: Mail, label: "sohomnandy9@gmail.com", href: "mailto:sohomnandy9@gmail.com" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-muted-fg hover:text-accent transition-colors duration-200 text-xs font-label group"
                  data-hover
                >
                  <Icon size={13} strokeWidth={1.5} className="group-hover:drop-shadow-[0_0_4px_#00ff88]" />
                  <span className="hidden sm:inline">{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right — HUD Panel (2 cols) */}
          <div className="lg:col-span-2 hidden lg:block">
            <IdentityPanel />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-fg">
        <span className="font-label text-xs tracking-widest">SCROLL_DOWN</span>
        <div className="w-px h-10 bg-gradient-to-b from-muted-fg to-transparent" />
      </div>
    </section>
  );
}

function IdentityPanel() {
  const skills = [
    { label: "ML / GNN", val: 90, color: "#00ff88" },
    { label: "LLM FINE-TUNE", val: 85, color: "#00d4ff" },
    { label: "CYBERSECURITY", val: 80, color: "#ff00ff" },
    { label: "BACKEND / API", val: 75, color: "#ffb000" },
    { label: "FRONTEND", val: 65, color: "#00d4ff" },
  ];

  return (
    <div className="relative">
      <div
        className="border border-border bg-card/80 backdrop-blur-sm overflow-hidden"
        style={{ clipPath: "polygon(0 20px,20px 0,calc(100% - 20px) 0,100% 20px,100% calc(100% - 20px),calc(100% - 20px) 100%,20px 100%,0 calc(100% - 20px))" }}
      >
        <div className="terminal-header">
          <div className="terminal-dot bg-destructive" />
          <div className="terminal-dot bg-[#ffb000]" />
          <div className="terminal-dot bg-accent" />
          <span className="ml-2">identity.json</span>
          <span className="ml-auto opacity-50 text-xs">UID: SN-0x4A2F</span>
        </div>

        <div className="p-5 font-mono text-xs space-y-1">
          <div className="text-muted-fg">{"{"}</div>
          <JsonLine k="name" v='"Sohom Nandy"' vc="accent" />
          <JsonLine k="role" v='"AI/ML Engineer"' vc="tertiary" />
          <JsonLine k="location" v='"Kolkata, IN"' vc="secondary" />
          <JsonLine k="cgpa" v="8.20" vc="accent" />
          <JsonLine k="status" v='"seeking_opportunities"' vc="accent" />
          <JsonLine k="huggingface" v='"sohomn/siem-log-generator-llama31-8b"' vc="tertiary" />
          <div className="text-muted-fg">{"}"}</div>
        </div>

        <div className="border-t border-border px-5 py-4">
          <div className="text-accent font-label text-xs mb-3 tracking-widest">
            // PROFICIENCY INDEX
          </div>
          <div className="space-y-2.5">
            {skills.map((s, i) => (
              <div key={s.label}>
                <div className="flex justify-between text-xs font-label text-muted-fg mb-1">
                  <span>{s.label}</span>
                  <span style={{ color: s.color }}>{s.val}%</span>
                </div>
                <div className="h-1.5 bg-muted">
                  <div
                    className="h-full"
                    style={{
                      width: `${s.val}%`,
                      background: `linear-gradient(90deg, ${s.color}, ${s.color}60)`,
                      boxShadow: `0 0 6px ${s.color}80`,
                      animation: `slideRight 1s ease-out ${i * 150}ms both`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Float chip */}
      <div
        className="absolute -top-3 -right-3 px-2 py-1 bg-card border border-accent text-accent font-label text-xs"
        style={{
          clipPath: "polygon(0 4px,4px 0,calc(100% - 4px) 0,100% 4px,100% calc(100% - 4px),calc(100% - 4px) 100%,4px 100%,0 calc(100% - 4px))",
          boxShadow: "0 0 12px rgba(0,255,136,0.3)",
        }}
      >
        OPEN_TO_HIRE
      </div>
    </div>
  );
}

function JsonLine({ k, v, vc }: { k: string; v: string; vc: string }) {
  const colorMap: Record<string, string> = {
    accent: "#00ff88", secondary: "#ff00ff", tertiary: "#00d4ff", muted: "#6b7280",
  };
  return (
    <div className="pl-4 flex gap-1 flex-wrap">
      <span className="text-[#e0e0e0]">&quot;{k}&quot;</span>
      <span className="text-muted-fg">:</span>
      <span style={{ color: colorMap[vc] }}>{v}</span>
      <span className="text-muted-fg">,</span>
    </div>
  );
}

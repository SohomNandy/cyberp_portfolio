"use client";
import { useInView } from "@/hooks/useInView";
import { Github, ExternalLink, ChevronRight, Shield, Brain } from "lucide-react";

const projects = [
  {
    id: "PRJ_001",
    name: "TRINETRA",
    subtitle: "Multi-Cloud Threat Intelligence using GNN",
    year: "2025 – PRESENT",
    status: "ACTIVE",
    color: "#00ff88",
    accentColor: "#00d4ff",
    icon: Shield,
    featured: true,
    description:
      "A production-grade multi-cloud security platform combining Graph Neural Networks for anomaly detection with a QLoRA fine-tuned LLaMA 3.1 8B model for synthetic SIEM log generation.",
    bullets: [
      "Built GNN-based anomaly detection with PyTorch Geometric — 83% precision improvement over statistical baselines.",
      "Modelled cloud infra as a heterogeneous graph with node/edge embeddings; real-time threat visualisation via Flask dashboard.",
      "Fine-tuned LLaMA 3.1 8B (QLoRA, 4-bit NF4) on 410K+ synthetic SIEM log pairs. Published on Hugging Face.",
      "Full MLOps pipeline: wandb, HuggingFace Hub, multi-GPU (T4 ×2, DDP + PEFT), automated checkpoint callbacks.",
    ],
    tags: ["PyTorch Geometric", "GNN", "LLaMA 3.1", "QLoRA", "PEFT", "Flask", "MLOps", "wandb", "HuggingFace", "AWS"],
    links: [
      { label: "HuggingFace Model", href: "https://huggingface.co/sohomn/siem-log-generator-llama31-8b", icon: ExternalLink },
    ],
    metrics: [
      { val: "83%", label: "PRECISION GAIN" },
      { val: "410K+", label: "TRAINING PAIRS" },
      { val: "4-BIT", label: "QUANTIZATION" },
    ],
  },
  {
    id: "PRJ_002",
    name: "REINFORCED REPTILE",
    subtitle: "Game Automation using Reinforcement Learning",
    year: "2024",
    status: "COMPLETE",
    color: "#ff00ff",
    accentColor: "#ffb000",
    icon: Brain,
    featured: false,
    description:
      "A Deep Q-Network (DQN) agent designed for autonomous game automation, achieving high task efficiency through a modular RL pipeline.",
    bullets: [
      "Designed a DQN agent achieving 87% task efficiency compared to random-policy baselines.",
      "Modularised the RL pipeline for scalability and reuse in AI-driven decision systems.",
    ],
    tags: ["Python", "DQN", "Reinforcement Learning", "PyTorch", "OpenAI Gym"],
    links: [
      { label: "GitHub", href: "https://github.com/ReinforcedReptile", icon: Github },
    ],
    metrics: [
      { val: "87%", label: "TASK EFFICIENCY" },
      { val: "DQN", label: "ARCHITECTURE" },
    ],
  },
];

export default function Projects() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="projects" className="relative py-24">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 100% 50%, rgba(0,212,255,0.04) 0%, transparent 55%), radial-gradient(ellipse at 0% 80%, rgba(255,0,255,0.03) 0%, transparent 45%)",
        }}
      />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeaderLocal
          prompt="cat ./projects/manifest.json"
          label="SHOWCASE"
          title="OPERATIONS"
          accent="#00d4ff"
        />

        <div ref={ref} className="mt-12 space-y-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  inView,
}: {
  project: (typeof projects)[0];
  index: number;
  inView: boolean;
}) {
  const Icon = project.icon;

  return (
    <div
      className="group relative border bg-card overflow-hidden transition-all duration-300"
      style={{
        borderColor: `${project.color}25`,
        clipPath: "polygon(0 16px,16px 0,calc(100% - 16px) 0,100% 16px,100% calc(100% - 16px),calc(100% - 16px) 100%,16px 100%,0 calc(100% - 16px))",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${index * 150}ms, transform 0.6s ease ${index * 150}ms`,
      }}
    >
      {/* Top glow bar */}
      <div
        className="h-px w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
      />

      {/* Terminal header */}
      <div
        className="px-5 py-3 flex flex-wrap items-center gap-3 border-b"
        style={{
          borderColor: `${project.color}15`,
          background: `linear-gradient(90deg, ${project.color}06, transparent)`,
        }}
      >
        <div className="terminal-dot" style={{ background: "#ff3366" }} />
        <div className="terminal-dot bg-[#ffb000]" />
        <div className="terminal-dot" style={{ background: project.color, boxShadow: `0 0 4px ${project.color}` }} />
        <span className="font-label text-xs text-muted-fg ml-1">{project.id}</span>
        <span
          className="font-display font-bold text-sm tracking-widest ml-2"
          style={{ color: project.color, textShadow: `0 0 8px ${project.color}50` }}
        >
          {project.name}
        </span>
        <div
          className="ml-auto px-2 py-0.5 font-label text-xs"
          style={{
            color: project.status === "ACTIVE" ? "#00ff88" : "#6b7280",
            border: `1px solid ${project.status === "ACTIVE" ? "#00ff8830" : "#6b728030"}`,
            background: project.status === "ACTIVE" ? "#00ff8810" : "#6b728010",
            clipPath: "polygon(0 3px,3px 0,calc(100% - 3px) 0,100% 3px,100% calc(100% - 3px),calc(100% - 3px) 100%,3px 100%,0 calc(100% - 3px))",
          }}
        >
          {project.status === "ACTIVE" && <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse mr-1" />}
          {project.status}
        </div>
        <span className="text-muted-fg font-label text-xs">{project.year}</span>
      </div>

      <div className="p-5 sm:p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left info */}
          <div className="lg:col-span-2">
            <div className="flex items-start gap-3 mb-4">
              <div
                className="w-9 h-9 flex items-center justify-center shrink-0 border"
                style={{
                  background: `${project.color}10`,
                  borderColor: `${project.color}30`,
                  clipPath: "polygon(0 5px,5px 0,calc(100% - 5px) 0,100% 5px,100% calc(100% - 5px),calc(100% - 5px) 100%,5px 100%,0 calc(100% - 5px))",
                }}
              >
                <Icon size={16} strokeWidth={1.5} style={{ color: project.color }} />
              </div>
              <div>
                <p className="text-[#e0e0e0] text-sm font-mono leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>

            <div className="space-y-2 mb-5">
              {project.bullets.map((b, i) => (
                <div key={i} className="flex gap-2 text-xs text-muted-fg font-mono leading-relaxed">
                  <ChevronRight size={12} strokeWidth={2} className="shrink-0 mt-0.5" style={{ color: project.color }} />
                  <span>{b}</span>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 font-label text-xs border"
                  style={{
                    color: project.color,
                    borderColor: `${project.color}25`,
                    background: `${project.color}08`,
                    clipPath: "polygon(0 3px,3px 0,calc(100% - 3px) 0,100% 3px,100% calc(100% - 3px),calc(100% - 3px) 100%,3px 100%,0 calc(100% - 3px))",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: metrics + links */}
          <div className="flex flex-col gap-4">
            {/* Metrics */}
            <div
              className="border p-4"
              style={{
                borderColor: `${project.color}20`,
                background: `${project.color}05`,
                clipPath: "polygon(0 6px,6px 0,calc(100% - 6px) 0,100% 6px,100% calc(100% - 6px),calc(100% - 6px) 100%,6px 100%,0 calc(100% - 6px))",
              }}
            >
              <div className="font-label text-xs text-muted-fg tracking-widest mb-3">{/* METRICS */}</div>
              <div className="space-y-2">
                {project.metrics.map((m) => (
                  <div key={m.label} className="flex justify-between items-center">
                    <span className="font-label text-xs text-muted-fg">{m.label}</span>
                    <span
                      className="font-display font-bold text-sm"
                      style={{ color: project.color, textShadow: `0 0 6px ${project.color}60` }}
                    >
                      {m.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-2">
              {project.links.map(({ label, href, icon: LinkIcon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-label tracking-wider px-3 py-2 border transition-all duration-200 group/link"
                  style={{
                    color: project.color,
                    borderColor: `${project.color}30`,
                    background: "transparent",
                    clipPath: "polygon(0 5px,5px 0,calc(100% - 5px) 0,100% 5px,100% calc(100% - 5px),calc(100% - 5px) 100%,5px 100%,0 calc(100% - 5px))",
                  }}
                  data-hover
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = `${project.color}15`;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 12px ${project.color}30`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <LinkIcon size={12} strokeWidth={2} />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${project.color}05 0%, transparent 60%)` }}
      />
    </div>
  );
}

function SectionHeaderLocal({
  prompt, label, title, accent,
}: { prompt?: string; label: string; title: string; accent: string }) {
  return (
    <div>
      {prompt && (
        <div className="font-mono text-xs text-muted-fg mb-3 flex items-center gap-2">
          <span style={{ color: accent }}>nexus@sohom:~$</span>
          <span>{prompt}</span>
          <span className="typewriter-cursor" style={{ background: accent }} />
        </div>
      )}
      <div className="flex items-end gap-4">
        <h2
          className="font-display font-black text-3xl sm:text-4xl uppercase tracking-wide"
          style={{ textShadow: "-1px 0 rgba(255,0,255,0.2), 1px 0 rgba(0,212,255,0.2)" }}
        >
          {title}
        </h2>
        <div
          className="px-3 py-1 font-label text-xs border mb-1"
          style={{
            color: accent,
            borderColor: `${accent}40`,
            background: `${accent}10`,
            clipPath: "polygon(0 4px,4px 0,calc(100% - 4px) 0,100% 4px,100% calc(100% - 4px),calc(100% - 4px) 100%,4px 100%,0 calc(100% - 4px))",
          }}
        >
          {label}
        </div>
      </div>
      <div className="section-divider mt-3" />
    </div>
  );
}
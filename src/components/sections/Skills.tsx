"use client";
import { useInView } from "@/hooks/useInView";

const skillGroups = [
  {
    category: "CORE DOMAINS",
    code: "SKL_001",
    color: "#00ff88",
    skills: [
      "Machine Learning", "ML Security", "Graph Neural Networks", "LLM Fine-tuning",
      "QLoRA / PEFT", "Cybersecurity", "Cloud Systems", "Reinforcement Learning",
    ],
  },
  {
    category: "LANGUAGES",
    code: "SKL_002",
    color: "#00d4ff",
    skills: ["Python", "C++", "C", "SQL", "JavaScript"],
  },
  {
    category: "FRAMEWORKS & LIBS",
    code: "SKL_003",
    color: "#ff00ff",
    skills: [
      "PyTorch", "PyTorch Geometric", "HuggingFace Transformers", "PEFT",
      "DSPy", "Flask", "React", "Node.js", "LangChain", "NumPy", "Pandas",
      "Scikit-learn", "OpenCV",
    ],
  },
  {
    category: "TOOLS & PLATFORMS",
    code: "SKL_004",
    color: "#ffb000",
    skills: [
      "AWS", "Kaggle GPU", "wandb", "Git", "GitHub", "Neo4j",
      "Postman", "Burp Suite", "Linux", "Docker",
    ],
  },
];


export default function Skills() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="skills" className="relative py-24">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(0,255,136,0.04) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeaderLocal
          prompt="nexus --list-modules --all"
          label="TECH STACK"
          title="ARSENAL"
          accent="#ff00ff"
        />

        <div ref={ref} className="mt-12 grid md:grid-cols-2 gap-5">
          {skillGroups.map((group, gi) => (
            <div
              key={group.code}
              className="border bg-card/50 overflow-hidden"
              style={{
                borderColor: `${group.color}25`,
                clipPath: "polygon(0 10px,10px 0,calc(100% - 10px) 0,100% 10px,100% calc(100% - 10px),calc(100% - 10px) 100%,10px 100%,0 calc(100% - 10px))",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${gi * 100}ms, transform 0.5s ease ${gi * 100}ms`,
              }}
            >
              {/* Header */}
              <div
                className="px-4 py-2.5 flex items-center gap-3 border-b"
                style={{ borderColor: `${group.color}15`, background: `${group.color}06` }}
              >
                <span className="font-label text-xs text-muted-fg">{group.code}</span>
                <span
                  className="font-display font-bold text-xs tracking-widest"
                  style={{ color: group.color }}
                >
                  {group.category}
                </span>
              </div>

              {/* Skill chips */}
              <div className="p-4 flex flex-wrap gap-2">
                {group.skills.map((skill, si) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 font-label text-xs border hover:scale-105 transition-transform duration-150 cursor-none"
                    style={{
                      color: group.color,
                      borderColor: `${group.color}25`,
                      background: `${group.color}08`,
                      clipPath: "polygon(0 4px,4px 0,calc(100% - 4px) 0,100% 4px,100% calc(100% - 4px),calc(100% - 4px) 100%,4px 100%,0 calc(100% - 4px))",
                      opacity: inView ? 1 : 0,
                      transition: `opacity 0.4s ease ${gi * 100 + si * 40}ms`,
                    }}
                    data-hover
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>


        {/* CERTS HIDDEN — uncomment to re-enable
        <div className="mt-10">
          <div className="font-mono text-xs text-muted-fg mb-5 flex items-center gap-2">
            <span className="text-accent">nexus@sohom:~$</span>
            <span>cat ./certs/achievements.log</span>
            <span className="typewriter-cursor" />
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {certs.map((cert, i) => (
              <div
                key={cert.badge}
                className="border bg-card p-4 group hover:translate-y-[-2px] transition-transform duration-200"
                style={{
                  borderColor: `${cert.color}25`,
                  clipPath: "polygon(0 8px,8px 0,calc(100% - 8px) 0,100% 8px,100% calc(100% - 8px),calc(100% - 8px) 100%,8px 100%,0 calc(100% - 8px))",
                  opacity: inView ? 1 : 0,
                  transition: `opacity 0.5s ease ${400 + i * 100}ms, transform 0.2s ease`,
                }}
              >
                <div
                  className="inline-flex px-2 py-0.5 font-label text-xs mb-3"
                  style={{
                    color: cert.color,
                    border: `1px solid ${cert.color}30`,
                    background: `${cert.color}10`,
                    clipPath: "polygon(0 3px,3px 0,calc(100% - 3px) 0,100% 3px,100% calc(100% - 3px),calc(100% - 3px) 100%,3px 100%,0 calc(100% - 3px))",
                  }}
                >
                  {cert.badge}
                </div>
                <div className="text-[#e0e0e0] text-xs font-mono font-medium mb-1">{cert.title}</div>
                <div className="text-muted-fg text-xs font-label tracking-wider mb-2">{cert.issuer}</div>
                <div className="text-muted-fg text-xs font-mono leading-relaxed">{cert.topics}</div>
              </div>
            ))}
          </div>
        </div>
        */}
      </div>
    </section>
  );
}

function SectionHeaderLocal({ prompt, label, title, accent }: { prompt?: string; label: string; title: string; accent: string }) {
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
        <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-wide"
          style={{ textShadow: "-1px 0 rgba(255,0,255,0.2), 1px 0 rgba(0,212,255,0.2)" }}>
          {title}
        </h2>
        <div className="px-3 py-1 font-label text-xs border mb-1"
          style={{
            color: accent, borderColor: `${accent}40`, background: `${accent}10`,
            clipPath: "polygon(0 4px,4px 0,calc(100% - 4px) 0,100% 4px,100% calc(100% - 4px),calc(100% - 4px) 100%,4px 100%,0 calc(100% - 4px))",
          }}>
          {label}
        </div>
      </div>
      <div className="section-divider mt-3" />
    </div>
  );
}
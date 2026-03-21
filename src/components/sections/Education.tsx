"use client";
import { useInView } from "@/hooks/useInView";
import { GraduationCap, Award, ExternalLink } from "lucide-react";

const education = {
  degree: "Bachelor of Technology – Computer Science",
  institution: "Sister Nivedita University",
  location: "Kolkata, West Bengal, India",
  cgpa: "8.20",
  status: "ONGOING",
  period: "2022 – 2026",
  highlights: [
    "Specialization in AI/ML systems and security engineering",
    "Active member & VP of GeeksforGeeks SNU Chapter",
    "Focus areas: Graph Neural Networks, LLM fine-tuning, Cybersecurity",
  ],
};

const achievements = [
  {
    id: "ACH_001",
    title: "Published Open-Source LLM",
    issuer: "Hugging Face Hub",
    detail: "sohomn/siem-log-generator-llama31-8b — fine-tuned LLaMA 3.1 8B generating synthetic SIEM logs for multi-cloud threat intelligence research.",
    color: "#00d4ff",
    link: "https://huggingface.co/sohomn/siem-log-generator-llama31-8b",
  },
  {
    id: "ACH_002",
    title: "Google Cybersecurity Professional Certificate",
    issuer: "Coursera / Google",
    detail: "Threat detection, network security, incident response — full professional certification track.",
    color: "#00ff88",
    link: "https://coursera.org/share/7c9131fecb14c00cb587ce65f580f1a2",
  },
  {
    id: "ACH_003",
    title: "Postman Student Expert",
    issuer: "Postman Inc.",
    detail: "API testing, automation, security testing — verified expert certification.",
    color: "#ff00ff",
    link: null,
  },
];

export default function Education() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="education" className="relative py-24">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 100% 0%, rgba(0,212,255,0.04) 0%, transparent 50%)",
        }}
      />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12">
          <div className="font-mono text-xs text-muted-fg mb-3 flex items-center gap-2">
            <span className="text-tertiary">nexus@sohom:~$</span>
            <span>cat ./education/transcript.log</span>
            <span className="typewriter-cursor" style={{ background: "#00d4ff" }} />
          </div>
          <div className="flex items-end gap-4">
            <h2
              className="font-display font-black text-3xl sm:text-4xl uppercase tracking-wide"
              style={{ textShadow: "-1px 0 rgba(255,0,255,0.2), 1px 0 rgba(0,212,255,0.2)" }}
            >
              EDUCATION
            </h2>
            <div
              className="px-3 py-1 font-label text-xs border mb-1 text-tertiary"
              style={{
                borderColor: "#00d4ff40",
                background: "#00d4ff10",
                clipPath:
                  "polygon(0 4px,4px 0,calc(100% - 4px) 0,100% 4px,100% calc(100% - 4px),calc(100% - 4px) 100%,4px 100%,0 calc(100% - 4px))",
              }}
            >
              CREDENTIALS
            </div>
          </div>
          <div className="section-divider mt-3" />
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Education card — spans 2 cols */}
          <div
            className="lg:col-span-2 border bg-card overflow-hidden"
            style={{
              borderColor: "#00d4ff25",
              clipPath:
                "polygon(0 16px,16px 0,calc(100% - 16px) 0,100% 16px,100% calc(100% - 16px),calc(100% - 16px) 100%,16px 100%,0 calc(100% - 16px))",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            {/* Terminal header */}
            <div
              className="terminal-header"
              style={{ background: "linear-gradient(90deg, #00d4ff08, transparent)" }}
            >
              <div className="terminal-dot bg-destructive" />
              <div className="terminal-dot bg-[#ffb000]" />
              <div
                className="terminal-dot"
                style={{ background: "#00d4ff", boxShadow: "0 0 4px #00d4ff" }}
              />
              <span className="ml-2 text-tertiary">degree.json</span>
              <span className="ml-auto opacity-50">{education.period}</span>
            </div>

            <div className="p-6">
              {/* Icon */}
              <div
                className="w-12 h-12 flex items-center justify-center mb-5 border"
                style={{
                  background: "#00d4ff10",
                  borderColor: "#00d4ff30",
                  clipPath:
                    "polygon(0 6px,6px 0,calc(100% - 6px) 0,100% 6px,100% calc(100% - 6px),calc(100% - 6px) 100%,6px 100%,0 calc(100% - 6px))",
                }}
              >
                <GraduationCap size={22} strokeWidth={1.5} style={{ color: "#00d4ff" }} />
              </div>

              <div
                className="font-display font-bold text-lg text-[#e0e0e0] mb-1 tracking-wide"
              >
                {education.degree}
              </div>
              <div
                className="font-label text-sm tracking-widest mb-1"
                style={{ color: "#00d4ff" }}
              >
                {education.institution}
              </div>
              <div className="font-label text-xs text-muted-fg tracking-wider mb-5">
                {education.location}
              </div>

              {/* CGPA display */}
              <div
                className="flex items-center gap-4 p-3 border mb-5"
                style={{
                  borderColor: "#00ff8820",
                  background: "#00ff8806",
                  clipPath:
                    "polygon(0 5px,5px 0,calc(100% - 5px) 0,100% 5px,100% calc(100% - 5px),calc(100% - 5px) 100%,5px 100%,0 calc(100% - 5px))",
                }}
              >
                <div>
                  <div
                    className="font-display font-black text-3xl text-accent"
                    style={{ textShadow: "0 0 15px rgba(0,255,136,0.4)" }}
                  >
                    {education.cgpa}
                  </div>
                  <div className="font-label text-xs text-muted-fg tracking-widest">CGPA</div>
                </div>
                <div className="w-px h-10 bg-border" />
                <div>
                  <div
                    className="font-label text-xs mb-0.5 flex items-center gap-1.5"
                    style={{ color: "#00ff88" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    {education.status}
                  </div>
                  <div className="font-label text-xs text-muted-fg">{education.period}</div>
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-2">
                {education.highlights.map((h, i) => (
                  <div key={i} className="flex gap-2 text-xs text-muted-fg font-mono leading-relaxed">
                    <span className="text-tertiary shrink-0 mt-0.5">&gt;</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements — spans 3 cols */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <div className="font-mono text-xs text-muted-fg mb-2">
              <span className="text-tertiary">$</span> ls ./achievements/
            </div>
            {achievements.map((ach, i) => (
              <div
                key={ach.id}
                className="group border bg-card/60 overflow-hidden hover:translate-x-1 transition-all duration-200"
                style={{
                  borderColor: `${ach.color}20`,
                  clipPath:
                    "polygon(0 10px,10px 0,calc(100% - 10px) 0,100% 10px,100% calc(100% - 10px),calc(100% - 10px) 100%,10px 100%,0 calc(100% - 10px))",
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateX(0)" : "translateX(20px)",
                  transition: `opacity 0.5s ease ${100 + i * 120}ms, transform 0.5s ease ${100 + i * 120}ms, border-color 0.2s ease`,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = `${ach.color}50`)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = `${ach.color}20`)
                }
              >
                <div
                  className="px-4 py-2.5 flex items-center gap-3 border-b"
                  style={{
                    borderColor: `${ach.color}15`,
                    background: `linear-gradient(90deg, ${ach.color}06, transparent)`,
                  }}
                >
                  <Award size={13} strokeWidth={1.5} style={{ color: ach.color }} />
                  <span
                    className="font-label text-xs tracking-widest"
                    style={{ color: ach.color }}
                  >
                    {ach.id}
                  </span>
                  <span className="text-muted-fg font-label text-xs ml-auto">
                    {ach.issuer}
                  </span>
                </div>
                <div className="px-4 py-3 flex items-start gap-3">
                  <div className="flex-1">
                    <div className="text-[#e0e0e0] text-sm font-mono font-medium mb-1.5">
                      {ach.title}
                    </div>
                    <div className="text-muted-fg text-xs font-mono leading-relaxed">
                      {ach.detail}
                    </div>
                  </div>
                  {ach.link && (
                    <a
                      href={ach.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 w-7 h-7 flex items-center justify-center border border-border text-muted-fg hover:text-accent hover:border-accent transition-colors duration-200"
                      style={{
                        clipPath:
                          "polygon(0 4px,4px 0,calc(100% - 4px) 0,100% 4px,100% calc(100% - 4px),calc(100% - 4px) 100%,4px 100%,0 calc(100% - 4px))",
                      }}
                      data-hover
                    >
                      <ExternalLink size={11} strokeWidth={2} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

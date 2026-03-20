"use client";
import { useInView } from "@/hooks/useInView";
import { Briefcase, Calendar, MapPin, ChevronRight } from "lucide-react";

const experiences = [
  {
    role: "SDE INTERN",
    company: "ITC INFOTECH",
    location: "Kolkata, IN",
    period: "Jul 2025 – Sep 2025",
    code: "EXP_001",
    color: "#00ff88",
    type: "INDUSTRY",
    bullets: [
      "Optimised complex SQL queries in a production-grade food delivery system, reducing data retrieval latency by 35% for high-frequency operations serving thousands of daily transactions.",
      "Designed and implemented an end-to-end data ingestion and visualisation pipeline, improving analytical interpretability across business dashboards while maintaining <16% data loss.",
      "Collaborated with senior engineers on enterprise backend–frontend integration, shipping features that improved system responsiveness and code maintainability.",
    ],
    tags: ["SQL", "Backend", "Data Pipelines", "Dashboard"],
  },
  {
    role: "VICE-PRESIDENT",
    company: "GEEKSFORGEEKS – SNU CHAPTER",
    location: "Kolkata, IN",
    period: "Dec 2024 – Mar 2026",
    code: "EXP_002",
    color: "#ff00ff",
    type: "LEADERSHIP",
    bullets: [
      "Led a 12-member technical team to conduct 8+ hands-on coding and AI workshops, increasing active participation by 60%.",
      "Mentored junior students in data structures, machine learning fundamentals, and project development through structured sessions and quizzes.",
    ],
    tags: ["Leadership", "AI Workshops", "DSA", "Mentoring"],
  },
  {
    role: "EXPERIENTIAL LEARNER (SECURITY)",
    company: "FEDERATION UNIVERSITY",
    location: "Australia (Virtual)",
    period: "Oct 2024 – Jan 2025",
    code: "EXP_003",
    color: "#00d4ff",
    type: "RESEARCH",
    bullets: [
      "Performed API security testing using Postman and Burp Suite by intercepting and analysing HTTP requests.",
      "Applied OWASP Top 10 security principles to identify vulnerabilities in simulated environments.",
      "Gained hands-on exposure to Linux-based security tooling and browser-level traffic inspection.",
    ],
    tags: ["Burp Suite", "OWASP", "Postman", "Linux", "API Security"],
  },
];

export default function Experience() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="experience" className="relative py-24">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 0% 50%, rgba(0,255,136,0.04) 0%, transparent 50%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          prompt="ls -la ./experience"
          label="WORK HISTORY"
          title="FIELD OPS"
          accent="#00ff88"
        />

        <div ref={ref} className="mt-12 space-y-6">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.code} exp={exp} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  exp,
  index,
  inView,
}: {
  exp: (typeof experiences)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <div
      className="group border border-border bg-card/60 overflow-hidden hover:border-opacity-100 transition-all duration-300"
      style={{
        clipPath: "polygon(0 12px,12px 0,calc(100% - 12px) 0,100% 12px,100% calc(100% - 12px),calc(100% - 12px) 100%,12px 100%,0 calc(100% - 12px))",
        borderColor: `${exp.color}30`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(-30px)",
        transition: `opacity 0.5s ease ${index * 120}ms, transform 0.5s ease ${index * 120}ms, border-color 0.3s ease`,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${exp.color}80`)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${exp.color}30`)}
    >
      {/* Header bar */}
      <div
        className="px-5 py-3 flex flex-wrap items-center gap-3 border-b"
        style={{
          borderColor: `${exp.color}20`,
          background: `linear-gradient(90deg, ${exp.color}08, transparent)`,
        }}
      >
        <div
          className="px-2 py-0.5 font-label text-xs tracking-widest"
          style={{
            background: `${exp.color}15`,
            color: exp.color,
            border: `1px solid ${exp.color}40`,
            clipPath: "polygon(0 3px,3px 0,calc(100% - 3px) 0,100% 3px,100% calc(100% - 3px),calc(100% - 3px) 100%,3px 100%,0 calc(100% - 3px))",
          }}
        >
          {exp.type}
        </div>
        <span className="text-muted-fg font-label text-xs">{exp.code}</span>
        <div className="ml-auto flex flex-wrap items-center gap-4 text-muted-fg font-label text-xs">
          <span className="flex items-center gap-1">
            <MapPin size={10} strokeWidth={2} /> {exp.location}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={10} strokeWidth={2} /> {exp.period}
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="grid sm:grid-cols-4 gap-4 sm:gap-6">
          {/* Role block */}
          <div className="sm:col-span-1">
            <div
              className="font-display font-bold text-base tracking-wide mb-0.5"
              style={{ color: exp.color, textShadow: `0 0 10px ${exp.color}50` }}
            >
              {exp.role}
            </div>
            <div className="text-[#e0e0e0] text-xs font-mono leading-relaxed">
              {exp.company}
            </div>
          </div>

          {/* Bullets */}
          <div className="sm:col-span-3 space-y-2">
            {exp.bullets.map((b, i) => (
              <div key={i} className="flex gap-2 text-xs text-muted-fg font-mono leading-relaxed">
                <ChevronRight
                  size={12}
                  strokeWidth={2}
                  className="shrink-0 mt-0.5"
                  style={{ color: exp.color }}
                />
                <span>{b}</span>
              </div>
            ))}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t" style={{ borderColor: `${exp.color}15` }}>
              {exp.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 font-label text-xs border"
                  style={{
                    color: exp.color,
                    borderColor: `${exp.color}30`,
                    background: `${exp.color}08`,
                    clipPath: "polygon(0 3px,3px 0,calc(100% - 3px) 0,100% 3px,100% calc(100% - 3px),calc(100% - 3px) 100%,3px 100%,0 calc(100% - 3px))",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({
  prompt,
  label,
  title,
  accent = "#00ff88",
}: {
  prompt?: string;
  label: string;
  title: string;
  accent?: string;
}) {
  return (
    <div>
      {prompt && (
        <div className="font-mono text-xs text-muted-fg mb-3 flex items-center gap-2">
          <span style={{ color: accent }}>nexus@sohom:~$</span>
          <span>{prompt}</span>
          <span className="typewriter-cursor" />
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

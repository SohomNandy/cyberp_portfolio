"use client";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

const ASCII_LOGO = `
   ██████╗  ██████╗ ██╗  ██╗ ██████╗ ███╗   ███╗
  ██╔════╝ ██╔═══██╗██║  ██║██╔═══██╗████╗ ████║
  ╚█████╗░ ██║   ██║███████║██║   ██║██╔████╔██║
  ░╚═══██╗ ██║   ██║██╔══██║██║   ██║██║╚██╔╝██║
  ██████╔╝ ╚██████╔╝██║  ██║╚██████╔╝██║ ╚═╝ ██║
  ╚═════╝░  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝
`.trim();

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative py-12 sm:py-16 mt-4 sm:mt-8 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,#00ff88 30%,#00d4ff 60%,transparent)", boxShadow: "0 0 12px rgba(0,255,136,0.4)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 sm:gap-10 items-start">

          {/* ASCII + bio */}
          <div className="md:col-span-2">
            {/* ASCII — hidden on tiny screens where it always overflows */}
            <div className="mb-4 sm:mb-5 hidden sm:block overflow-hidden">
              {ASCII_LOGO.split("\n").map((line, i) => (
                <div key={i} className="font-mono whitespace-pre" style={{
                  fontSize: "clamp(7px, 1.4vw, 14px)",
                  color: "#00ff88",
                  textShadow: "0 0 8px rgba(0,255,136,0.6),-1px 0 rgba(255,0,255,0.3),1px 0 rgba(0,212,255,0.3)",
                  letterSpacing: "0.04em", lineHeight: "1.3",
                }}>
                  {line}
                </div>
              ))}
            </div>

            {/* Mobile fallback — clean wordmark instead of ASCII */}
            <div className="mb-4 sm:hidden">
              <div className="font-display font-black text-3xl text-accent tracking-widest"
                style={{ textShadow: "0 0 20px rgba(0,255,136,0.4),-1px 0 rgba(255,0,255,0.3),1px 0 rgba(0,212,255,0.3)" }}>
                SOHOM
              </div>
              <div className="font-display font-black text-3xl text-[#e0e0e0] tracking-widest"
                style={{ textShadow: "-2px 0 rgba(255,0,255,0.2),2px 0 rgba(0,212,255,0.2)" }}>
                NANDY
              </div>
            </div>

            <p className="text-muted-fg text-xs font-mono leading-relaxed max-w-md border-l-2 border-accent pl-3 mb-4 sm:mb-5">
              &gt; AI/ML Engineer &nbsp;·&nbsp; GNN Researcher &nbsp;·&nbsp; LLM Fine-tuner
              <br />Building the future from <span className="text-accent">Kolkata</span>, one model at a time.
            </p>

            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {[
                { icon: Github,       href: "https://github.com/SohomNandy",                                color: "#ff00ff" },
                { icon: Linkedin,     href: "https://linkedin.com/in/sohom-nandy",                          color: "#00d4ff" },
                { icon: Mail,         href: "mailto:sohomnandy9@gmail.com",                                 color: "#00ff88" },
                { icon: ExternalLink, href: "https://huggingface.co/sohomn/siem-log-generator-llama31-8b",  color: "#ffb000" },
              ].map(({ icon: Icon, href, color }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center border border-border text-muted-fg transition-all duration-200"
                  style={{ clipPath: "polygon(0 5px,5px 0,calc(100% - 5px) 0,100% 5px,100% calc(100% - 5px),calc(100% - 5px) 100%,5px 100%,0 calc(100% - 5px))" }}
                  onMouseEnter={e => { e.currentTarget.style.color = color; e.currentTarget.style.borderColor = color; e.currentTarget.style.boxShadow = `0 0 10px ${color}60`; }}
                  onMouseLeave={e => { e.currentTarget.style.color = ""; e.currentTarget.style.borderColor = ""; e.currentTarget.style.boxShadow = ""; }}
                  data-hover>
                  <Icon size={14} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Sys info */}
          <div className="border border-border bg-card/50 overflow-hidden"
            style={{ clipPath: "polygon(0 10px,10px 0,calc(100% - 10px) 0,100% 10px,100% calc(100% - 10px),calc(100% - 10px) 100%,10px 100%,0 calc(100% - 10px))" }}>
            <div className="terminal-header">
              <div className="terminal-dot bg-destructive" />
              <div className="terminal-dot bg-[#ffb000]" />
              <div className="terminal-dot bg-accent" />
              <span className="ml-2 text-accent">&#47;&#47; SYS_INFO</span>
            </div>
            <div className="p-4 sm:p-5">
              {[
                { label: "NAME",     val: "Sohom Nandy",  color: "#00ff88" },
                { label: "VERSION",  val: "v1.0.0",       color: "#e0e0e0" },
                { label: "STACK",    val: "Next.js 15",   color: "#e0e0e0" },
                { label: "LOCATION", val: "Kolkata, IN",  color: "#00d4ff" },
                { label: "CGPA",     val: "8.20 / 10",    color: "#ffb000" },
                { label: "STATUS",   val: "OPEN_TO_HIRE", color: "#00ff88", pulse: true },
                { label: "YEAR",     val: String(year),   color: "#e0e0e0" },
              ].map(({ label, val, color, pulse }) => (
                <div key={label} className="flex justify-between items-center py-1.5 border-b border-border last:border-0">
                  <span className="font-label text-xs text-muted-fg tracking-wider shrink-0">{label}</span>
                  <span className="font-mono text-xs flex items-center gap-1.5 ml-2"
                    style={{ color, textShadow: pulse ? "0 0 6px rgba(0,255,136,0.5)" : "none" }}>
                    {pulse && <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_4px_#00ff88] shrink-0" />}
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="section-divider mt-8 sm:mt-10 mb-5 sm:mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
          <span className="font-label text-xs text-muted-fg tracking-wider text-center sm:text-left">
            © {year} SOHOM NANDY &nbsp;//&nbsp; ALL RIGHTS RESERVED
          </span>
          <span className="flex items-center gap-2 font-label text-xs text-muted-fg">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_4px_#00ff88] shrink-0" />
            BUILT WITH NEXT.JS · TAILWIND · CANVAS API
          </span>
        </div>
      </div>
    </footer>
  );
}
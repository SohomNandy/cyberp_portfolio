"use client";
import { useState } from "react";
import { Send, Github, Linkedin, Mail, Phone, ExternalLink } from "lucide-react";

const contactLinks = [
  { icon: Mail, label: "EMAIL", value: "sohomnandy9@gmail.com", href: "mailto:sohomnandy9@gmail.com", color: "#00ff88" },
  { icon: Phone, label: "PHONE", value: "+91 9339202157", href: "tel:+919339202157", color: "#00d4ff" },
  { icon: Github, label: "GITHUB", value: "github.com/SohomNandy", href: "https://github.com/SohomNandy", color: "#ff00ff" },
  { icon: Linkedin, label: "LINKEDIN", value: "linkedin.com/in/sohom-nandy", href: "https://linkedin.com/in/sohom-nandy", color: "#ffb000" },
  { icon: ExternalLink, label: "HUGGINGFACE", value: "sohomn/siem-log-generator", href: "https://huggingface.co/sohomn/siem-log-generator-llama31-8b", color: "#00d4ff" },
];

export default function Contact() {
  const [fields, setFields] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1800);
  };

  return (
    <section id="contact" className="relative py-24">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(0,255,136,0.04) 0%, transparent 60%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader />

        <div className="mt-12 grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: Contact Links */}
          <div>
            <div className="font-mono text-xs text-muted-fg mb-6">
              <span className="text-accent">nexus@sohom:~$</span>{" "}
              <span>ping --all-channels</span>
              <span className="typewriter-cursor" />
            </div>
            <div className="space-y-3">
              {contactLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 border border-border bg-card/50 group hover:translate-x-1 transition-all duration-200"
                    style={{
                      clipPath: "polygon(0 6px,6px 0,calc(100% - 6px) 0,100% 6px,100% calc(100% - 6px),calc(100% - 6px) 100%,6px 100%,0 calc(100% - 6px))",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${link.color}50`)}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#2a2a3a")}
                    data-hover
                  >
                    <div
                      className="w-8 h-8 flex items-center justify-center shrink-0"
                      style={{
                        background: `${link.color}12`,
                        border: `1px solid ${link.color}30`,
                        clipPath: "polygon(0 4px,4px 0,calc(100% - 4px) 0,100% 4px,100% calc(100% - 4px),calc(100% - 4px) 100%,4px 100%,0 calc(100% - 4px))",
                      }}
                    >
                      <Icon size={14} strokeWidth={1.5} style={{ color: link.color }} />
                    </div>
                    <div>
                      <div className="font-label text-xs tracking-widest mb-0.5" style={{ color: link.color }}>
                        {link.label}
                      </div>
                      <div className="text-[#e0e0e0] text-xs font-mono">{link.value}</div>
                    </div>
                    <ExternalLink size={12} strokeWidth={1.5} className="ml-auto text-muted-fg group-hover:text-[#e0e0e0] transition-colors" />
                  </a>
                );
              })}
            </div>

            {/* Education block */}
            <div
              className="mt-6 border border-border bg-card/50 p-5"
              style={{ clipPath: "polygon(0 10px,10px 0,calc(100% - 10px) 0,100% 10px,100% calc(100% - 10px),calc(100% - 10px) 100%,10px 100%,0 calc(100% - 10px))" }}
            >
              <div className="font-label text-xs text-accent tracking-widest mb-3">// EDUCATION</div>
              <div className="text-[#e0e0e0] text-sm font-mono">B.Tech – Computer Science</div>
              <div className="text-muted-fg text-xs font-label tracking-wider mt-1">Sister Nivedita University, Kolkata</div>
              <div className="flex items-center gap-3 mt-2">
                <span
                  className="px-2 py-0.5 font-label text-xs"
                  style={{ color: "#00ff88", border: "1px solid #00ff8830", background: "#00ff8810",
                    clipPath: "polygon(0 3px,3px 0,calc(100% - 3px) 0,100% 3px,100% calc(100% - 3px),calc(100% - 3px) 100%,3px 100%,0 calc(100% - 3px))" }}
                >
                  CGPA: 8.20
                </span>
                <span className="text-muted-fg font-label text-xs">ONGOING</span>
              </div>
            </div>
          </div>

          {/* Right: Terminal Form */}
          <div
            className="border border-border bg-card overflow-hidden"
            style={{ clipPath: "polygon(0 16px,16px 0,calc(100% - 16px) 0,100% 16px,100% calc(100% - 16px),calc(100% - 16px) 100%,16px 100%,0 calc(100% - 16px))" }}
          >
            <div className="terminal-header">
              <div className="terminal-dot bg-destructive" />
              <div className="terminal-dot bg-[#ffb000]" />
              <div className="terminal-dot bg-accent" />
              <span className="ml-2">compose_message.sh</span>
            </div>

            {sent ? (
              <div className="p-8 text-center space-y-3">
                <div className="text-accent font-display text-2xl font-bold">[OK] TRANSMITTED</div>
                <div className="text-muted-fg font-mono text-sm">Message delivered to nexus. Awaiting response.</div>
                <div className="flex justify-center mt-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#00ff88]" />
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                {[
                  { key: "name", label: "SENDER_ID", placeholder: "your_name" },
                  { key: "email", label: "RETURN_ADDR", placeholder: "your@email.com" },
                  { key: "subject", label: "SUBJECT", placeholder: "message_subject" },
                ].map(({ key, label, placeholder }) => (
                  <div key={key} className="relative">
                    <div className="font-label text-xs text-muted-fg mb-1.5 tracking-widest">{label}</div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-accent font-mono text-xs">&gt;</span>
                      <input
                        type={key === "email" ? "email" : "text"}
                        required
                        placeholder={placeholder}
                        value={fields[key as keyof typeof fields]}
                        onChange={(e) => setFields((f) => ({ ...f, [key]: e.target.value }))}
                        className="input-cyber w-full"
                      />
                    </div>
                  </div>
                ))}

                <div>
                  <div className="font-label text-xs text-muted-fg mb-1.5 tracking-widest">MESSAGE_BODY</div>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-accent font-mono text-xs">&gt;</span>
                    <textarea
                      required
                      rows={5}
                      placeholder="// enter your transmission here..."
                      value={fields.message}
                      onChange={(e) => setFields((f) => ({ ...f, message: e.target.value }))}
                      className="input-cyber w-full resize-none pt-2.5"
                      style={{ paddingTop: "10px" }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-cyber btn-cyber-solid w-full flex items-center justify-center gap-2 py-3"
                  disabled={sending}
                >
                  {sending ? (
                    <>
                      <span className="animate-pulse">TRANSMITTING</span>
                      <span className="typewriter-cursor" />
                    </>
                  ) : (
                    <>
                      <Send size={13} strokeWidth={2.5} /> [ SEND TRANSMISSION ]
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader() {
  return (
    <div>
      <div className="font-mono text-xs text-muted-fg mb-3 flex items-center gap-2">
        <span className="text-accent">nexus@sohom:~$</span>
        <span>initiate --contact-protocol</span>
        <span className="typewriter-cursor" />
      </div>
      <div className="flex items-end gap-4">
        <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-wide"
          style={{ textShadow: "-1px 0 rgba(255,0,255,0.2), 1px 0 rgba(0,212,255,0.2)" }}>
          CONTACT
        </h2>
        <div className="px-3 py-1 font-label text-xs border mb-1 text-accent"
          style={{
            borderColor: "#00ff8840", background: "#00ff8810",
            clipPath: "polygon(0 4px,4px 0,calc(100% - 4px) 0,100% 4px,100% calc(100% - 4px),calc(100% - 4px) 100%,4px 100%,0 calc(100% - 4px))",
          }}>
          ESTABLISH LINK
        </div>
      </div>
      <div className="section-divider mt-3" />
    </div>
  );
}

"use client";
import { useState, useRef } from "react";
import { Send, Github, Linkedin, Mail, Phone, ExternalLink } from "lucide-react";
import emailjs from "@emailjs/browser";

// ─── Loaded from .env.local ───────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const EMAILJS_PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? "";
// ──────────────────────────────────────────────────────────────────────────────

const contactLinks = [
  { icon: Mail,         label: "EMAIL",      value: "sohomnandy9@gmail.com",          href: "mailto:sohomnandy9@gmail.com",                                            color: "#00ff88" },
  { icon: Phone,        label: "PHONE",      value: "+91 9339202157",                 href: "tel:+919339202157",                                                       color: "#00d4ff" },
  { icon: Github,       label: "GITHUB",     value: "github.com/SohomNandy",          href: "https://github.com/SohomNandy",                                           color: "#ff00ff" },
  { icon: Linkedin,     label: "LINKEDIN",   value: "linkedin.com/in/sohom-nandy",    href: "https://linkedin.com/in/sohom-nandy",                                     color: "#ffb000" },
  { icon: ExternalLink, label: "HUGGINGFACE",value: "huggingface/sohomn",      href: "https://huggingface.co/sohomn",             color: "#00d4ff" },
];

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [fields, setFields] = useState({ from_name: "", from_email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    // // DEBUG — remove after confirming it works
    // console.log("SERVICE_ID:",  EMAILJS_SERVICE_ID);
    // console.log("TEMPLATE_ID:", EMAILJS_TEMPLATE_ID);
    // console.log("PUBLIC_KEY:",  EMAILJS_PUBLIC_KEY);

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current!,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setStatus("success");
      setFields({ from_name: "", from_email: "", subject: "", message: "" });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Transmission failed. Try again.");
    }
  };

  return (
    <section id="contact" className="relative py-24">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(0,255,136,0.04) 0%, transparent 60%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader />

        <div className="mt-12 grid lg:grid-cols-2 gap-8 items-start">

          {/* Left — Contact links + education */}
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
                    style={{ clipPath: "polygon(0 6px,6px 0,calc(100% - 6px) 0,100% 6px,100% calc(100% - 6px),calc(100% - 6px) 100%,6px 100%,0 calc(100% - 6px))" }}
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
                  style={{
                    color: "#00ff88", border: "1px solid #00ff8830", background: "#00ff8810",
                    clipPath: "polygon(0 3px,3px 0,calc(100% - 3px) 0,100% 3px,100% calc(100% - 3px),calc(100% - 3px) 100%,3px 100%,0 calc(100% - 3px))"
                  }}
                >
                  CGPA: 8.20
                </span>
                <span className="text-muted-fg font-label text-xs">ONGOING</span>
              </div>
            </div>
          </div>

          {/* Right — Terminal mail form */}
          <div
            className="border border-border bg-card overflow-hidden"
            style={{ clipPath: "polygon(0 16px,16px 0,calc(100% - 16px) 0,100% 16px,100% calc(100% - 16px),calc(100% - 16px) 100%,16px 100%,0 calc(100% - 16px))" }}
          >
            {/* Terminal header */}
            <div className="terminal-header">
              <div className="terminal-dot bg-destructive" />
              <div className="terminal-dot bg-[#ffb000]" />
              <div className="terminal-dot bg-accent" />
              <span className="ml-2">compose_message.sh</span>
              <span className="ml-auto font-label text-xs text-accent flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                LIVE
              </span>
            </div>

            {/* Success state */}
            {status === "success" ? (
              <div className="p-10 flex flex-col items-center gap-4 text-center">
                <div
                  className="font-display font-black text-2xl text-accent"
                  style={{ textShadow: "0 0 20px rgba(0,255,136,0.5)" }}
                >
                  [OK] TRANSMITTED
                </div>
                <div className="text-muted-fg font-mono text-xs leading-relaxed">
                  &gt; Message delivered to <span className="text-accent">sohomnandy9@gmail.com</span>
                  <br />&gt; Expect a response within 24–48 hours.
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#00ff88] mt-2" />
                <button
                  className="btn-cyber text-xs px-4 py-2 mt-2"
                  onClick={() => setStatus("idle")}
                >
                  [ SEND ANOTHER ]
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="p-5 space-y-4">

                {/* Routing info line */}
                <div className="font-mono text-xs text-muted-fg border-b border-border pb-3 mb-1">
                  <span className="text-accent">&gt;</span> ROUTE: <span className="text-tertiary">you</span>
                  <span className="text-muted-fg mx-1">──▶</span>
                  <span className="text-accent">sohomnandy9@gmail.com</span>
                </div>

                {/* Fields */}
                {[
                  { name: "from_name",  label: "SENDER_ID",   placeholder: "your_name",        type: "text"  },
                  { name: "from_email", label: "RETURN_ADDR", placeholder: "your@email.com",   type: "email" },
                  { name: "subject",    label: "SUBJECT",     placeholder: "message_subject",  type: "text"  },
                ].map(({ name, label, placeholder, type }) => (
                  <div key={name}>
                    <div className="font-label text-xs text-muted-fg mb-1.5 tracking-widest">{label}</div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-accent font-mono text-xs">&gt;</span>
                      <input
                        type={type}
                        name={name}
                        required
                        placeholder={placeholder}
                        value={fields[name as keyof typeof fields]}
                        onChange={(e) => setFields((f) => ({ ...f, [name]: e.target.value }))}
                        className="input-cyber w-full"
                        disabled={status === "sending"}
                      />
                    </div>
                  </div>
                ))}

                {/* Message textarea */}
                <div>
                  <div className="font-label text-xs text-muted-fg mb-1.5 tracking-widest">MESSAGE_BODY</div>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-accent font-mono text-xs">&gt;</span>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="// enter your transmission here..."
                      value={fields.message}
                      onChange={(e) => setFields((f) => ({ ...f, message: e.target.value }))}
                      className="input-cyber w-full resize-none"
                      style={{ paddingTop: "10px" }}
                      disabled={status === "sending"}
                    />
                  </div>
                </div>

                {/* Error message */}
                {status === "error" && (
                  <div
                    className="font-mono text-xs px-3 py-2 border"
                    style={{ color: "#ff3366", borderColor: "#ff336630", background: "#ff336610",
                      clipPath: "polygon(0 4px,4px 0,calc(100% - 4px) 0,100% 4px,100% calc(100% - 4px),calc(100% - 4px) 100%,4px 100%,0 calc(100% - 4px))" }}
                  >
                    <span className="text-destructive">[ERR]</span> {errorMsg}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className="btn-cyber btn-cyber-solid w-full flex items-center justify-center gap-2 py-3"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? (
                    <>
                      <span className="animate-pulse">TRANSMITTING</span>
                      <span className="typewriter-cursor" />
                    </>
                  ) : (
                    <>
                      <Send size={13} strokeWidth={2.5} />[ SEND TRANSMISSION ]
                    </>
                  )}
                </button>

                <div className="font-label text-xs text-muted-fg text-center tracking-wider pt-1">
                  ENCRYPTED · DELIVERED INSTANTLY · NO REDIRECT
                </div>
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
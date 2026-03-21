"use client";
import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";

const navLinks = [
  { label: "// EXP",       href: "#experience" },
  { label: "// PROJECTS",  href: "#projects"   },
  { label: "// SKILLS",    href: "#skills"     },
  { label: "// EDU",       href: "#education"  },
  { label: "// CONTACT",   href: "#contact"    },
];

export default function Nav() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [time,        setTime]        = useState<string | null>(null);
  const [progress,    setProgress]    = useState(0);
  const [activeHash,  setActiveHash]  = useState("");

  /* live clock */
  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  /* scroll progress + active section */
  useEffect(() => {
    const onScroll = () => {
      const scrollTop  = window.scrollY;
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 20);
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);

      // Detect active section
      const sections = navLinks.map(l => l.href.slice(1));
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      setActiveHash(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-border">
        <div
          className="h-full transition-all duration-100"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #00ff88, #00d4ff)",
            boxShadow: "0 0 8px #00ff88",
          }}
        />
      </div>

      <nav
        className={`fixed top-[2px] left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-bg/90 backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">

            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5" data-hover>
              <div
                className="w-7 h-7 flex items-center justify-center bg-accent"
                style={{ clipPath: "polygon(0 4px,4px 0,calc(100% - 4px) 0,100% 4px,100% calc(100% - 4px),calc(100% - 4px) 100%,4px 100%,0 calc(100% - 4px))" }}
              >
                <Zap size={14} className="text-bg" strokeWidth={3} />
              </div>
              <span
                className="text-accent font-display font-bold text-base tracking-widest"
                style={{ textShadow: "0 0 10px rgba(0,255,136,0.5)" }}
              >
                SOHOM.EXE
              </span>
            </a>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = activeHash === link.href.slice(1);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className="nav-link relative"
                    data-hover
                    style={isActive ? { color: "#00ff88", textShadow: "0 0 8px #00ff88" } : {}}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        className="absolute -bottom-0.5 left-0 right-0 h-px"
                        style={{ background: "#00ff88", boxShadow: "0 0 4px #00ff88" }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {time && (
                <div className="hidden md:flex items-center gap-1.5 font-label text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_4px_#00ff88]" />
                  <span className="neon-text" style={{ fontSize: "10px" }}>{time}</span>
                </div>
              )}
              <a href="#contact" className="btn-cyber text-xs px-3 py-1.5 hidden md:block" data-hover>
                [ HIRE ME ]
              </a>
              <button
                className="lg:hidden text-accent"
                style={{ cursor: "none" }}
                onClick={() => setMobileOpen(!mobileOpen)}
                data-hover
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-card/95 backdrop-blur-md border-b border-border">
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="nav-link text-xs py-2"
                  onClick={() => setMobileOpen(false)}
                  data-hover
                >
                  {link.label}
                </a>
              ))}
              <a href="#contact" className="btn-cyber text-xs py-2 mt-1 text-center" data-hover>
                [ HIRE ME ]
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

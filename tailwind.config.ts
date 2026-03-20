import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0f",
        card: "#12121a",
        muted: "#1c1c2e",
        "muted-fg": "#6b7280",
        accent: "#00ff88",
        secondary: "#ff00ff",
        tertiary: "#00d4ff",
        border: "#2a2a3a",
        destructive: "#ff3366",
      },
      fontFamily: {
        display: ["Orbitron", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        label: ["Share Tech Mono", "monospace"],
      },
      animation: {
        blink: "blink 1s step-end infinite",
        glitch: "glitch 0.3s ease-in-out",
        "glitch-slow": "glitch 2s ease-in-out infinite",
        "rgb-shift": "rgbShift 3s ease-in-out infinite",
        scanline: "scanline 8s linear infinite",
        "pulse-neon": "pulseNeon 2s ease-in-out infinite",
        "flicker": "flicker 4s linear infinite",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "slide-right": "slideRight 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "type-cursor": "typeCursor 0.7s step-end infinite",
        float: "float 6s ease-in-out infinite",
        "rotate-slow": "rotateSlow 20s linear infinite",
        "data-stream": "dataStream 2s linear infinite",
      },
      keyframes: {
        blink: { "50%": { opacity: "0" } },
        glitch: {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-3px, 2px)", filter: "hue-rotate(90deg)" },
          "40%": { transform: "translate(3px, -2px)", filter: "hue-rotate(180deg)" },
          "60%": { transform: "translate(-2px, -1px)" },
          "80%": { transform: "translate(2px, 1px)", filter: "hue-rotate(270deg)" },
          "100%": { transform: "translate(0)", filter: "none" },
        },
        rgbShift: {
          "0%, 100%": { textShadow: "-2px 0 #ff00ff, 2px 0 #00d4ff, 0 0 20px rgba(0,255,136,0.5)" },
          "50%": { textShadow: "2px 0 #ff00ff, -2px 0 #00d4ff, 0 0 30px rgba(0,255,136,0.8)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100vh)" },
          "100%": { transform: "translateY(100vh)" },
        },
        pulseNeon: {
          "0%, 100%": { boxShadow: "0 0 5px #00ff88, 0 0 10px #00ff8840, 0 0 20px #00ff8820" },
          "50%": { boxShadow: "0 0 10px #00ff88, 0 0 25px #00ff8870, 0 0 50px #00ff8840" },
        },
        flicker: {
          "0%, 95%, 100%": { opacity: "1" },
          "96%": { opacity: "0.8" },
          "97%": { opacity: "1" },
          "98%": { opacity: "0.4" },
          "99%": { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideRight: {
          from: { opacity: "0", transform: "translateX(-30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        typeCursor: {
          "0%, 100%": { borderColor: "#00ff88" },
          "50%": { borderColor: "transparent" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        rotateSlow: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        dataStream: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(100vh)", opacity: "0" },
        },
      },
      boxShadow: {
        neon: "0 0 5px #00ff88, 0 0 10px #00ff8840, 0 0 20px #00ff8820",
        "neon-lg": "0 0 10px #00ff88, 0 0 30px #00ff8860, 0 0 60px #00ff8830",
        "neon-secondary": "0 0 5px #ff00ff, 0 0 20px #ff00ff60",
        "neon-tertiary": "0 0 5px #00d4ff, 0 0 20px #00d4ff60",
        "inner-neon": "inset 0 0 20px rgba(0,255,136,0.1)",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(0,255,136,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.04) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(ellipse at center, rgba(0,255,136,0.15) 0%, transparent 70%)",
        "hero-mesh":
          "radial-gradient(ellipse at 20% 50%, rgba(0,255,136,0.1) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(255,0,255,0.08) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(0,212,255,0.06) 0%, transparent 50%)",
      },
    },
  },
  plugins: [],
};

export default config;

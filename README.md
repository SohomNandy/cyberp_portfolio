# My Portfolio

A cyberpunk-themed portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 🏗️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + custom CSS (globals.css)
- **Fonts**: Orbitron, JetBrains Mono, Share Tech Mono (Google Fonts)
- **Canvas**: Native Canvas API (particle network background)
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css       # All cyberpunk styles, animations, effects
│   ├── layout.tsx        # Root layout with fonts
│   └── page.tsx          # Main page assembly
├── components/
│   ├── Nav.tsx            # Navigation with live clock
│   ├── ParticleBackground.tsx  # Canvas particle network
│   ├── CursorOverlay.tsx  # Custom diamond cursor
│   └── sections/
│       ├── Hero.tsx       # Glitch headline + identity panel
│       ├── Experience.tsx # Work history as terminal cards
│       ├── Projects.tsx   # Trinetra + Reinforced Reptile
│       ├── Skills.tsx     # Tech stack matrix + certs
│       ├── Contact.tsx    # Terminal form + social links
│       └── Footer.tsx     # ASCII art + system info
├── hooks/
│   ├── useCursor.ts       # Custom cursor with ring lag
│   ├── useTypewriter.ts   # Typewriter effect
│   └── useInView.ts       # Scroll-triggered animations
```

## 🌐 Deployment

### Vercel (Recommended — one click)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload the .next folder or connect your repo
```

### Manual
```bash
npm run build
npm start
```

## ✨ Features

- **Cyberpunk aesthetic** — scanlines, glitch effects, neon glow, chamfered corners
- **Custom diamond cursor** with lagging ring
- **Particle network** background with mouse interaction
- **Typewriter** role cycling in hero
- **Scroll-triggered animations** on all sections
- **Live system clock** in navbar
- **Terminal-style** cards for experience and contact
- **ASCII art** footer logo
- **Fully responsive** — mobile to 4K

## 🎨 Customization

All design tokens live in:
- `tailwind.config.ts` — colors, shadows, animations
- `src/app/globals.css` — component styles, effects

To update content, edit the data arrays in each section component.

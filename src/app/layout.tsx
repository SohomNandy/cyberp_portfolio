import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SOHOM NANDY // AI-ML ENGINEER",
  description:
    "Portfolio of Sohom Nandy — ML Security, GNN Researcher, LLM Fine-tuner. Building multi-cloud threat intelligence from Kolkata.",
  keywords: ["Sohom Nandy", "ML Engineer", "GNN", "LLM", "Cybersecurity", "Portfolio"],
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "SOHOM NANDY // AI-ML ENGINEER",
    description: "ML Security · GNN · LLM Fine-tuning · Cybersecurity",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Share+Tech+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg text-[#e0e0e0] font-mono antialiased">
        {children}
      </body>
    </html>
  );
}

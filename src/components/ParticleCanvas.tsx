"use client";
import dynamic from "next/dynamic";

const ParticleBackground = dynamic(
  () => import("@/components/ParticleBackground"),
  { ssr: false }
);

export default function ParticleCanvas() {
  return <ParticleBackground />;
}

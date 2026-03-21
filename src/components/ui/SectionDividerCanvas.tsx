"use client";
import dynamic from "next/dynamic";

const SectionDivider = dynamic(
  () => import("@/components/ui/SectionDivider"),
  { ssr: false }
);

export default function SectionDividerCanvas() {
  return <SectionDivider />;
}

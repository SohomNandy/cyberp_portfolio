"use client";
import dynamic from "next/dynamic";
const HoloGlobe = dynamic(() => import("@/components/ui/HoloGlobe"), { ssr: false });
export default function HoloGlobeCanvas() { return <HoloGlobe />; }

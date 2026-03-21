"use client";
import dynamic from "next/dynamic";
const FloatingShards = dynamic(() => import("@/components/ui/FloatingShards"), { ssr: false });
export default function FloatingShardsCanvas() { return <FloatingShards />; }

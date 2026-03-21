"use client";
import dynamic from "next/dynamic";
const NeuralNetwork = dynamic(() => import("@/components/ui/NeuralNetwork"), { ssr: false });
export default function NeuralNetworkCanvas() { return <NeuralNetwork />; }

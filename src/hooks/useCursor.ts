"use client";
import { useEffect, useRef } from "react";

export function useCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
    };

    const animate = () => {
      ringX += (mouseX - ringX - 20) * 0.12;
      ringY += (mouseY - ringY - 20) * 0.12;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      rafId = requestAnimationFrame(animate);
    };

    const onEnter = () => {
      cursor.style.width = "20px";
      cursor.style.height = "20px";
      ring.style.width = "60px";
      ring.style.height = "60px";
      ring.style.borderColor = "rgba(0,255,136,0.9)";
    };

    const onLeave = () => {
      cursor.style.width = "12px";
      cursor.style.height = "12px";
      ring.style.width = "40px";
      ring.style.height = "40px";
      ring.style.borderColor = "rgba(0,255,136,0.5)";
    };

    document.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(animate);

    // Attach to all interactive elements
    const attachListeners = () => {
      document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    attachListeners();

    // Re-attach on DOM changes (for dynamically rendered elements)
    const mo = new MutationObserver(attachListeners);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMouseMove);
      mo.disconnect();
      document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return { cursorRef, ringRef };
}

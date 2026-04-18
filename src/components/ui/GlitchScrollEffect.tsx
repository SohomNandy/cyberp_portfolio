"use client";
import { useEffect, useRef } from "react";

export default function GlitchScrollEffect() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const lastTime    = useRef(Date.now());

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    let timeoutId: NodeJS.Timeout;

    const onScroll = () => {
      const now      = Date.now();
      const scrollY  = window.scrollY;
      const delta    = Math.abs(scrollY - lastScrollY.current);
      const elapsed  = now - lastTime.current;
      const velocity = delta / Math.max(elapsed, 1);

      lastScrollY.current = scrollY;
      lastTime.current    = now;

      // Only trigger on fast scrolls
      if (velocity < 1.5) return;

      clearTimeout(timeoutId);

      // Quick flash
      overlay.style.opacity    = String(Math.min(velocity * 0.03, 0.12));
      overlay.style.transform  = `translateX(${(Math.random() - 0.5) * 6}px)`;
      overlay.style.transition = "none";

      timeoutId = setTimeout(() => {
        overlay.style.opacity    = "0";
        overlay.style.transform  = "translateX(0)";
        overlay.style.transition = "opacity 0.15s ease, transform 0.15s ease";
      }, 60);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      {/* RGB split overlay — flashes on fast scroll */}
      <div
        ref={overlayRef}
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 9998,
          opacity: 0,
          background: "linear-gradient(180deg,rgba(255,0,255,0.06) 0%,transparent 30%,transparent 70%,rgba(0,212,255,0.06) 100%)",
          mixBlendMode: "screen",
        }}
      />
    </>
  );
}

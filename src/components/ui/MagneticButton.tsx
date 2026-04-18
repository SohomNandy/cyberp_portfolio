"use client";
import { useRef, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
}

export default function MagneticButton({
  children, className = "", href, onClick, strength = 0.3,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width  / 2) * strength;
    const dy = (e.clientY - rect.top  - rect.height / 2) * strength;
    el.style.transform = `translate(${dx}px,${dy}px)`;
    el.style.transition = "transform 0.1s ease";
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform  = "translate(0,0)";
    el.style.transition = "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)";
  };

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={className}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        data-hover
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={className}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-hover
    >
      {children}
    </button>
  );
}

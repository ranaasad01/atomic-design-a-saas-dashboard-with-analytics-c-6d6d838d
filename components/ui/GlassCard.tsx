import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  noPad?: boolean;
}

export default function GlassCard({ children, className = "", noPad = false }: GlassCardProps) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/[0.07]",
        "bg-white/[0.03] backdrop-blur-sm",
        "shadow-xl shadow-black/20",
        noPad ? "" : "p-5",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

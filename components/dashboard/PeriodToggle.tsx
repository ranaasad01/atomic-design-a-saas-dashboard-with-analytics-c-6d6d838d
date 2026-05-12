"use client";

import type { Period } from "@/lib/types";

interface PeriodToggleProps {
  value: Period;
  onChange: (p: Period) => void;
}

const options: { label: string; value: Period }[] = [
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];

export default function PeriodToggle({ value, onChange }: PeriodToggleProps) {
  return (
    <div className="flex items-center gap-1 bg-white/[0.04] border border-white/[0.07] rounded-lg p-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={[
            "px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150",
            value === opt.value
              ? "bg-indigo-500 text-white shadow-sm shadow-indigo-500/30"
              : "text-slate-400 hover:text-slate-200",
          ].join(" ")}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

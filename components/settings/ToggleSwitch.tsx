"use client";

import { useState } from "react";

interface ToggleSwitchProps {
  defaultChecked?: boolean;
  label: string;
  description?: string;
}

export default function ToggleSwitch({ defaultChecked = false, label, description }: ToggleSwitchProps) {
  const [enabled, setEnabled] = useState(defaultChecked);

  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1 pr-4">
        <p className="text-sm font-medium text-slate-200">{label}</p>
        {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
      </div>
      <button
        onClick={() => setEnabled((e) => !e)}
        className={[
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0",
          enabled ? "bg-indigo-500" : "bg-white/[0.1]",
        ].join(" ")}
      >
        <span
          className={[
            "inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200",
            enabled ? "translate-x-6" : "translate-x-1",
          ].join(" ")}
        />
      </button>
    </div>
  );
}

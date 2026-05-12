"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { RevenueDataPoint } from "@/lib/types";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1a1830] border border-white/[0.1] rounded-xl p-3 shadow-2xl">
      <p className="text-xs text-slate-400 mb-2 font-medium">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 text-sm">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-slate-300 capitalize">{p.name}:</span>
          <span className="text-white font-semibold">${p.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

interface RevenueLineChartProps {
  data: RevenueDataPoint[];
}

export default function RevenueLineChart({ data }: RevenueLineChartProps) {
  const fmtY = (v: number) => "$" + (v / 1000).toFixed(0) + "k";

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <defs>
          <linearGradient id="revenueGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fill: "#64748b", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "#64748b", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={fmtY}
          width={45}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: "12px", color: "#94a3b8", paddingTop: "12px" }}
          iconType="circle"
          iconSize={8}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="url(#revenueGrad)"
          strokeWidth={2.5}
          dot={false}
          activeDot={{ r: 5, fill: "#6366f1", strokeWidth: 0 }}
        />
        <Line
          type="monotone"
          dataKey="mrr"
          stroke="#06b6d4"
          strokeWidth={2}
          strokeDasharray="5 3"
          dot={false}
          activeDot={{ r: 4, fill: "#06b6d4", strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

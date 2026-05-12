import { TrendingUp, TrendingDown, DollarSign, Users, BarChart2 } from 'lucide-react';
import type { KpiMetric } from "@/lib/types";

const iconMap: Record<string, React.ElementType> = {
  DollarSign,
  Users,
  TrendingDown,
  BarChart2,
};

interface KpiCardProps {
  metric: KpiMetric;
}

export default function KpiCard({ metric }: KpiCardProps) {
  const Icon = iconMap[metric.icon] ?? DollarSign;
  const isPositive = metric.change > 0;
  const isNeutral = metric.change === 0;

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm p-5 hover:border-white/[0.12] transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: metric.color + "20" }}
        >
          <Icon size={18} style={{ color: metric.color }} />
        </div>
        <span
          className={[
            "flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full",
            isNeutral
              ? "bg-slate-500/15 text-slate-400"
              : isPositive
              ? "bg-emerald-500/15 text-emerald-400"
              : "bg-rose-500/15 text-rose-400",
          ].join(" ")}
        >
          {isNeutral ? null : isPositive ? (
            <TrendingUp size={11} />
          ) : (
            <TrendingDown size={11} />
          )}
          {isPositive ? "+" : ""}
          {metric.change}%
        </span>
      </div>
      <p className="text-2xl font-bold text-white mb-1 tracking-tight">{metric.value}</p>
      <p className="text-sm text-slate-400">{metric.label}</p>
      <p className="text-xs text-slate-600 mt-1">{metric.changeLabel}</p>
    </div>
  );
}

"use client";

import { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import PeriodToggle from "@/components/dashboard/PeriodToggle";
import RevenueLineChart from "@/components/charts/RevenueLineChart";
import ActiveUsersAreaChart from "@/components/charts/ActiveUsersAreaChart";
import SignupsBarChart from "@/components/charts/SignupsBarChart";
import TrafficDonutChart from "@/components/charts/TrafficDonutChart";
import GlassCard from "@/components/ui/GlassCard";
import {
  revenueDataMonthly,
  revenueDataWeekly,
  revenueDataYearly,
  signupsDataMonthly,
  signupsDataWeekly,
} from "@/lib/mockData";
import type { Period } from "@/lib/types";

const summaryStats = [
  { label: "Avg Session Duration", value: "4m 32s", change: "+8%" },
  { label: "Bounce Rate", value: "34.2%", change: "-3%" },
  { label: "Pages / Session", value: "6.8", change: "+12%" },
  { label: "Conversion Rate", value: "3.7%", change: "+0.4%" },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<Period>("monthly");

  const revenueData =
    period === "weekly"
      ? revenueDataWeekly
      : period === "yearly"
      ? revenueDataYearly
      : revenueDataMonthly;

  const signupsData = period === "weekly" ? signupsDataWeekly : signupsDataMonthly;

  return (
    <DashboardShell title="Analytics">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Analytics</h2>
          <p className="text-sm text-slate-400 mt-0.5">Deep-dive into your product and revenue metrics.</p>
        </div>
        <PeriodToggle value={period} onChange={setPeriod} />
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {summaryStats.map((s) => (
          <GlassCard key={s.label}>
            <p className="text-xs text-slate-500 mb-1">{s.label}</p>
            <p className="text-2xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-emerald-400 mt-1 font-medium">{s.change} vs last period</p>
          </GlassCard>
        ))}
      </div>

      {/* Revenue chart full width */}
      <GlassCard className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-200">Revenue &amp; MRR Over Time</h3>
            <p className="text-xs text-slate-500 mt-0.5">Comparing total revenue against monthly recurring revenue</p>
          </div>
        </div>
        <RevenueLineChart data={revenueData} />
      </GlassCard>

      {/* Two charts side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <GlassCard>
          <h3 className="text-sm font-semibold text-slate-200 mb-1">User Signups vs Churn</h3>
          <p className="text-xs text-slate-500 mb-4">Acquisition and retention by period</p>
          <SignupsBarChart data={signupsData} />
        </GlassCard>
        <GlassCard>
          <h3 className="text-sm font-semibold text-slate-200 mb-1">Active Users Trend</h3>
          <p className="text-xs text-slate-500 mb-4">DAU and MAU growth over the year</p>
          <ActiveUsersAreaChart />
        </GlassCard>
      </div>

      {/* Traffic sources */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <GlassCard>
          <h3 className="text-sm font-semibold text-slate-200 mb-1">Traffic Sources</h3>
          <p className="text-xs text-slate-500 mb-4">Where your users are coming from</p>
          <TrafficDonutChart />
        </GlassCard>
        <GlassCard className="lg:col-span-2">
          <h3 className="text-sm font-semibold text-slate-200 mb-4">Key Insights</h3>
          <div className="space-y-3">
            {[
              { title: "Organic search is your top channel", desc: "38% of new users arrive via organic search. Consider doubling down on SEO content to sustain this growth.", color: "#6366f1" },
              { title: "Churn spiked in September", desc: "Churn reached 62 users in September — correlates with a pricing change. Consider a win-back campaign.", color: "#ec4899" },
              { title: "Enterprise plan drives 61% of MRR", desc: "Despite being only 30% of users, enterprise customers contribute the majority of recurring revenue.", color: "#10b981" },
              { title: "Friday is your highest signup day", desc: "Fridays see 124 average signups — 43% above the weekly mean. Schedule campaigns to peak on Thursdays.", color: "#f59e0b" },
            ].map((insight) => (
              <div key={insight.title} className="flex gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <span className="w-1 rounded-full flex-shrink-0 mt-0.5" style={{ backgroundColor: insight.color }} />
                <div>
                  <p className="text-sm font-medium text-slate-200">{insight.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{insight.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </DashboardShell>
  );
}

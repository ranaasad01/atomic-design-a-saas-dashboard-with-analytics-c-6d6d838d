"use client";

import { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import KpiCard from "@/components/dashboard/KpiCard";
import PeriodToggle from "@/components/dashboard/PeriodToggle";
import TransactionsTable from "@/components/dashboard/TransactionsTable";
import RevenueLineChart from "@/components/charts/RevenueLineChart";
import ActiveUsersAreaChart from "@/components/charts/ActiveUsersAreaChart";
import SignupsBarChart from "@/components/charts/SignupsBarChart";
import TrafficDonutChart from "@/components/charts/TrafficDonutChart";
import GlassCard from "@/components/ui/GlassCard";
import {
  kpiMetrics,
  transactions,
  revenueDataMonthly,
  revenueDataWeekly,
  revenueDataYearly,
  signupsDataMonthly,
  signupsDataWeekly,
} from "@/lib/mockData";
import type { Period } from "@/lib/types";

export default function DashboardPage() {
  const [period, setPeriod] = useState<Period>("monthly");

  const revenueData =
    period === "weekly"
      ? revenueDataWeekly
      : period === "yearly"
      ? revenueDataYearly
      : revenueDataMonthly;

  const signupsData = period === "weekly" ? signupsDataWeekly : signupsDataMonthly;

  return (
    <DashboardShell title="Overview">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Dashboard Overview</h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Welcome back, Sophia. Here&apos;s what&apos;s happening today.
          </p>
        </div>
        <PeriodToggle value={period} onChange={setPeriod} />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {kpiMetrics.map((metric) => (
          <KpiCard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Charts row 1: Revenue + Active Users */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <GlassCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-200">Revenue &amp; MRR</h3>
              <p className="text-xs text-slate-500 mt-0.5">Total revenue vs monthly recurring revenue</p>
            </div>
            <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-full font-medium">
              +12.5% this period
            </span>
          </div>
          <RevenueLineChart data={revenueData} />
        </GlassCard>

        <GlassCard>
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-slate-200">Traffic Sources</h3>
            <p className="text-xs text-slate-500 mt-0.5">Revenue breakdown by channel</p>
          </div>
          <TrafficDonutChart />
        </GlassCard>
      </div>

      {/* Charts row 2: Signups + Active Users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-200">User Signups vs Churn</h3>
              <p className="text-xs text-slate-500 mt-0.5">New signups and churned users per period</p>
            </div>
          </div>
          <SignupsBarChart data={signupsData} />
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-200">Active Users Trend</h3>
              <p className="text-xs text-slate-500 mt-0.5">Daily and monthly active users over time</p>
            </div>
          </div>
          <ActiveUsersAreaChart />
        </GlassCard>
      </div>

      {/* Transactions Table */}
      <GlassCard noPad>
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
          <div>
            <h3 className="text-sm font-semibold text-slate-200">Recent Transactions</h3>
            <p className="text-xs text-slate-500 mt-0.5">Latest payments and subscription events</p>
          </div>
          <a
            href="/revenue"
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
          >
            View all →
          </a>
        </div>
        <TransactionsTable data={transactions} limit={5} />
      </GlassCard>
    </DashboardShell>
  );
}

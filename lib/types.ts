export interface KpiMetric {
  id: string;
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: string;
  color: string;
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  mrr: number;
}

export interface SignupDataPoint {
  period: string;
  signups: number;
  churned: number;
}

export interface TrafficSource {
  name: string;
  value: number;
  color: string;
}

export interface ActiveUsersDataPoint {
  date: string;
  dau: number;
  wau: number;
  mau: number;
}

export interface Transaction {
  id: string;
  customer: string;
  email: string;
  amount: number;
  status: "completed" | "pending" | "failed" | "refunded";
  plan: string;
  date: string;
  avatar: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member" | "viewer";
  plan: "free" | "pro" | "enterprise";
  status: "active" | "inactive";
  joinedAt: string;
  lastSeen: string;
  avatar: string;
}

export type Period = "weekly" | "monthly" | "yearly";

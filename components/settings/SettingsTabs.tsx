"use client";

import { useState } from "react";
import ToggleSwitch from "./ToggleSwitch";
import GlassCard from "@/components/ui/GlassCard";

const tabs = ["Profile", "Notifications", "Billing"] as const;
type Tab = (typeof tabs)[number];

export default function SettingsTabs() {
  const [active, setActive] = useState<Tab>("Profile");

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 bg-white/[0.04] border border-white/[0.07] rounded-xl p-1 mb-6 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={[
              "px-5 py-2 rounded-lg text-sm font-medium transition-all duration-150",
              active === tab
                ? "bg-indigo-500 text-white shadow-sm shadow-indigo-500/30"
                : "text-slate-400 hover:text-slate-200",
            ].join(" ")}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Profile */}
      {active === "Profile" && (
        <div className="space-y-5 max-w-2xl">
          <GlassCard>
            <h3 className="text-sm font-semibold text-slate-200 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "First Name", value: "Sophia" },
                { label: "Last Name", value: "Carter" },
                { label: "Email Address", value: "sophia@acmecorp.io" },
                { label: "Job Title", value: "Head of Growth" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">{field.label}</label>
                  <input
                    defaultValue={field.value}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-colors"
                  />
                </div>
              ))}
            </div>
            <div className="mt-4">
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Bio</label>
              <textarea
                rows={3}
                defaultValue="Building the future of SaaS analytics at PulseAI."
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-colors resize-none"
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button className="px-5 py-2 bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-semibold rounded-lg transition-colors">
                Save Changes
              </button>
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="text-sm font-semibold text-slate-200 mb-4">Change Password</h3>
            <div className="space-y-3">
              {["Current Password", "New Password", "Confirm New Password"].map((label) => (
                <div key={label}>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">{label}</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-colors"
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button className="px-5 py-2 bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-semibold rounded-lg transition-colors">
                Update Password
              </button>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Notifications */}
      {active === "Notifications" && (
        <div className="space-y-5 max-w-2xl">
          <GlassCard>
            <h3 className="text-sm font-semibold text-slate-200 mb-2">Email Notifications</h3>
            <p className="text-xs text-slate-500 mb-4">Choose which emails you want to receive.</p>
            <div className="divide-y divide-white/[0.05]">
              <ToggleSwitch defaultChecked label="Weekly digest" description="A summary of your key metrics every Monday." />
              <ToggleSwitch defaultChecked label="New user signups" description="Get notified when a new user joins your workspace." />
              <ToggleSwitch label="Failed payments" description="Alerts for failed or declined transactions." />
              <ToggleSwitch defaultChecked label="Churn alerts" description="Notify when a user cancels their subscription." />
              <ToggleSwitch label="Product updates" description="News about new features and improvements." />
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="text-sm font-semibold text-slate-200 mb-2">In-App Notifications</h3>
            <p className="text-xs text-slate-500 mb-4">Control real-time alerts within the dashboard.</p>
            <div className="divide-y divide-white/[0.05]">
              <ToggleSwitch defaultChecked label="Revenue milestones" description="Celebrate when you hit MRR goals." />
              <ToggleSwitch defaultChecked label="System alerts" description="Critical system and security notifications." />
              <ToggleSwitch label="Team activity" description="Updates when teammates make changes." />
            </div>
          </GlassCard>
        </div>
      )}

      {/* Billing */}
      {active === "Billing" && (
        <div className="space-y-5 max-w-2xl">
          <GlassCard>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-200">Current Plan</h3>
                <p className="text-xs text-slate-500 mt-0.5">You are on the Pro plan.</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 text-xs font-semibold">
                Pro
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: "Monthly Cost", value: "$99/mo" },
                { label: "Next Billing", value: "Jan 1, 2025" },
                { label: "Seats Used", value: "8 / 20" },
              ].map((item) => (
                <div key={item.label} className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06]">
                  <p className="text-xs text-slate-500 mb-1">{item.label}</p>
                  <p className="text-sm font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-semibold rounded-lg transition-colors">
                Upgrade to Enterprise
              </button>
              <button className="px-4 py-2 bg-white/[0.05] hover:bg-white/[0.08] text-slate-300 text-sm font-medium rounded-lg transition-colors border border-white/[0.08]">
                Manage Billing
              </button>
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="text-sm font-semibold text-slate-200 mb-4">Payment Method</h3>
            <div className="flex items-center gap-4 p-3 bg-white/[0.03] rounded-xl border border-white/[0.06] mb-4">
              <div className="w-10 h-7 bg-gradient-to-br from-blue-600 to-blue-800 rounded flex items-center justify-center text-white text-xs font-bold">
                VISA
              </div>
              <div>
                <p className="text-sm text-slate-200 font-medium">•••• •••• •••• 4242</p>
                <p className="text-xs text-slate-500">Expires 08/2027</p>
              </div>
              <button className="ml-auto text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                Update
              </button>
            </div>
            <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
              + Add payment method
            </button>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

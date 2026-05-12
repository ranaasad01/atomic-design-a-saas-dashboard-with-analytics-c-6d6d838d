"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layout, Activity, Users, BarChart2, Settings, Sparkles, X, ChevronRight } from 'lucide-react';

const navItems = [
  { href: "/", label: "Overview", icon: Layout },
  { href: "/analytics", label: "Analytics", icon: Activity },
  { href: "/users", label: "Users", icon: Users },
  { href: "/revenue", label: "Revenue", icon: BarChart2 },
  { href: "/settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={[
          "fixed top-0 left-0 z-30 h-full w-64 flex flex-col",
          "bg-[#0f0e1a] border-r border-white/[0.06]",
          "transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:static lg:z-auto",
        ].join(" ")}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">
              Pulse<span className="text-indigo-400">AI</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <p className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-widest">
            Main Menu
          </p>
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={[
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium",
                  "transition-all duration-150 group relative",
                  isActive
                    ? "bg-indigo-500/15 text-indigo-300 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]",
                ].join(" ")}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-indigo-400 rounded-r-full" />
                )}
                <Icon
                  className={isActive ? "text-indigo-400 flex-shrink-0" : "text-slate-500 group-hover:text-slate-300 flex-shrink-0"}
                  size={18}
                />
                <span className="flex-1">{label}</span>
                {isActive && (
                  <ChevronRight className="w-3.5 h-3.5 text-indigo-400/60" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-white/[0.06]">
          <div className="rounded-xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 border border-indigo-500/20 p-4">
            <p className="text-xs font-semibold text-indigo-300 mb-1">Upgrade to Pro</p>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Unlock advanced analytics and unlimited seats.
            </p>
            <button className="w-full py-1.5 px-3 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-semibold transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

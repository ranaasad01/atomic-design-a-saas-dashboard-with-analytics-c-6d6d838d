"use client";

import type { User } from "@/lib/types";

const roleStyles: Record<User["role"], string> = {
  admin: "bg-violet-500/15 text-violet-400 border-violet-500/20",
  member: "bg-indigo-500/15 text-indigo-400 border-indigo-500/20",
  viewer: "bg-slate-500/15 text-slate-400 border-slate-500/20",
};

const planStyles: Record<User["plan"], string> = {
  enterprise: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  pro: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
  free: "bg-slate-500/15 text-slate-400 border-slate-500/20",
};

const avatarColors = [
  "from-indigo-500 to-violet-600",
  "from-cyan-500 to-blue-600",
  "from-emerald-500 to-teal-600",
  "from-rose-500 to-pink-600",
  "from-amber-500 to-orange-600",
];

interface UserTableProps {
  data: User[];
}

export default function UserTable({ data }: UserTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/[0.06]">
            {["User", "Role", "Plan", "Status", "Joined", "Last Seen"].map((h) => (
              <th
                key={h}
                className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.04]">
          {data.map((user, i) => (
            <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
              <td className="py-3.5 px-4">
                <div className="flex items-center gap-3">
                  <div
                    className={[
                      "w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-xs font-bold flex-shrink-0",
                      avatarColors[i % avatarColors.length],
                    ].join(" ")}
                  >
                    {user.avatar}
                  </div>
                  <div>
                    <p className="text-slate-200 font-medium leading-none">{user.name}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{user.email}</p>
                  </div>
                </div>
              </td>
              <td className="py-3.5 px-4">
                <span
                  className={[
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize",
                    roleStyles[user.role],
                  ].join(" ")}
                >
                  {user.role}
                </span>
              </td>
              <td className="py-3.5 px-4">
                <span
                  className={[
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize",
                    planStyles[user.plan],
                  ].join(" ")}
                >
                  {user.plan}
                </span>
              </td>
              <td className="py-3.5 px-4">
                <span className="flex items-center gap-1.5">
                  <span
                    className={[
                      "w-1.5 h-1.5 rounded-full",
                      user.status === "active" ? "bg-emerald-400" : "bg-slate-500",
                    ].join(" ")}
                  />
                  <span
                    className={user.status === "active" ? "text-emerald-400" : "text-slate-500"}
                  >
                    {user.status}
                  </span>
                </span>
              </td>
              <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">{user.joinedAt}</td>
              <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">{user.lastSeen}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

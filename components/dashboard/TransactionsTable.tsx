"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { Transaction } from "@/lib/types";

const statusStyles: Record<Transaction["status"], string> = {
  completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  pending: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  failed: "bg-rose-500/15 text-rose-400 border-rose-500/20",
  refunded: "bg-slate-500/15 text-slate-400 border-slate-500/20",
};

const avatarColors = [
  "from-indigo-500 to-violet-600",
  "from-cyan-500 to-blue-600",
  "from-emerald-500 to-teal-600",
  "from-rose-500 to-pink-600",
  "from-amber-500 to-orange-600",
];

interface TransactionsTableProps {
  data: Transaction[];
  limit?: number;
}

export default function TransactionsTable({ data, limit }: TransactionsTableProps) {
  const [page, setPage] = useState(0);
  const pageSize = limit ?? 6;
  const totalPages = Math.ceil(data.length / pageSize);
  const visible = data.slice(page * pageSize, page * pageSize + pageSize);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {["Customer", "Plan", "Amount", "Status", "Date"].map((h) => (
                <th
                  key={h}
                  className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap"
                >
                  <span className="flex items-center gap-1">
                    {h}
                    <ChevronDown size={12} className="opacity-40" />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {visible.map((tx, i) => (
              <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={[
                        "w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-xs font-bold flex-shrink-0",
                        avatarColors[i % avatarColors.length],
                      ].join(" ")}
                    >
                      {tx.avatar}
                    </div>
                    <div>
                      <p className="text-slate-200 font-medium leading-none">{tx.customer}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{tx.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="text-slate-300">{tx.plan}</span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="text-white font-semibold">${tx.amount}</span>
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={[
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize",
                      statusStyles[tx.status],
                    ].join(" ")}
                  >
                    {tx.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!limit && totalPages > 1 && (
        <div className="flex items-center justify-between px-4 pt-4 border-t border-white/[0.06]">
          <p className="text-xs text-slate-500">
            Showing {page * pageSize + 1}–{Math.min((page + 1) * pageSize, data.length)} of {data.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-white/[0.06] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={[
                  "w-7 h-7 rounded-lg text-xs font-medium transition-colors",
                  i === page
                    ? "bg-indigo-500 text-white"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.06]",
                ].join(" ")}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-white/[0.06] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Next <ChevronRight size={12} className="inline" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

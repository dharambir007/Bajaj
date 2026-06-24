import React from "react";

export default function SummaryCard({ summary }) {
  if (!summary) return null;

  const stats = [
    {
      label: "Total Trees",
      value: summary.total_trees,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7l9-4 9 4M3 7v10l9 4m0-14v14m9-14v10l-9 4" />
        </svg>
      ),
      color: "from-indigo-500 to-blue-500",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/20",
    },
    {
      label: "Total Cycles",
      value: summary.total_cycles,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      color: "from-amber-500 to-orange-500",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
    {
      label: "Largest Tree Root",
      value: summary.largest_tree_root || "—",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
        </svg>
      ),
      color: "from-emerald-500 to-teal-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-300 mb-4 flex items-center gap-2">
        <span className="w-1.5 h-5 bg-indigo-500 rounded-full inline-block" />
        Summary
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`glass-card p-5 ${s.bg} border ${s.border} flex items-center gap-4 transition-transform hover:-translate-y-0.5 duration-200`}
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white shrink-0`}>
              {s.icon}
            </div>
            <div>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">{s.label}</p>
              <p className="text-2xl font-bold text-white mt-0.5">{s.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

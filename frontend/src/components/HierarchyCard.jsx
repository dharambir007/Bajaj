import React, { useState } from "react";

function TreeNode({ label, children, depth }) {
  const [open, setOpen] = useState(true);
  const hasChildren = children && Object.keys(children).length > 0;

  return (
    <div style={{ marginLeft: depth * 16 + "px" }} className="mt-1">
      <div
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => hasChildren && setOpen((o) => !o)}
      >
        <span
          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-200
            ${depth === 0
              ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
              : depth === 1
              ? "bg-violet-500/70 text-white"
              : "bg-slate-700 text-slate-300 group-hover:bg-slate-600"
            }`}
        >
          {label}
        </span>
        {hasChildren && (
          <svg
            className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </div>
      {hasChildren && open && (
        <div className="border-l border-slate-700/50 ml-3.5 pl-1 mt-1">
          {Object.entries(children).map(([child, grandchildren]) => (
            <TreeNode key={child} label={child} children={grandchildren} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function HierarchyCard({ hierarchy, index }) {
  return (
    <div className="glass-card p-6 transition-all duration-200 hover:border-white/20">
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
              Component {index + 1}
            </span>
            {hierarchy.has_cycle ? (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                ⚠ Cycle
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                ✓ Tree
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 text-xs">Root:</span>
              <span className="text-white font-bold text-lg font-mono">{hierarchy.root}</span>
            </div>
            {!hierarchy.has_cycle && (
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 text-xs">Depth:</span>
                <span className="text-indigo-400 font-bold text-lg">{hierarchy.depth}</span>
              </div>
            )}
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
          <span className="text-indigo-400 font-bold text-sm">{index + 1}</span>
        </div>
      </div>

      {hierarchy.has_cycle ? (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-center gap-3">
          <svg className="w-5 h-5 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z" />
          </svg>
          <p className="text-amber-300 text-sm">Cycle detected — tree structure unavailable.</p>
        </div>
      ) : (
        <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
          <p className="text-slate-500 text-xs uppercase tracking-widest mb-3 font-medium">Tree Structure</p>
          <TreeNode label={hierarchy.root} children={hierarchy.tree} depth={0} />
        </div>
      )}
    </div>
  );
}

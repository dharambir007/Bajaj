import React from "react";

function TagList({ items, colorClass, emptyMsg }) {
  if (!items || items.length === 0) {
    return <p className="text-slate-600 text-sm italic">{emptyMsg}</p>;
  }
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {items.map((item, i) => (
        <span key={i} className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold border ${colorClass}`}>
          {item}
        </span>
      ))}
    </div>
  );
}

export default function MetaSection({ invalid_entries, duplicate_edges }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-slate-300">Invalid Entries</h3>
          <span className="ml-auto text-xs font-bold bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full border border-red-500/30">
            {(invalid_entries || []).length}
          </span>
        </div>
        <TagList items={invalid_entries} colorClass="bg-red-500/10 text-red-400 border-red-500/20" emptyMsg="No invalid entries" />
      </div>

      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-slate-300">Duplicate Edges</h3>
          <span className="ml-auto text-xs font-bold bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full border border-yellow-500/30">
            {(duplicate_edges || []).length}
          </span>
        </div>
        <TagList items={duplicate_edges} colorClass="bg-yellow-500/10 text-yellow-400 border-yellow-500/20" emptyMsg="No duplicate edges" />
      </div>
    </div>
  );
}

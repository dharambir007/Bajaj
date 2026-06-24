import React, { useState } from "react";
import Spinner from "./components/Spinner.jsx";
import SummaryCard from "./components/SummaryCard.jsx";
import HierarchyCard from "./components/HierarchyCard.jsx";
import MetaSection from "./components/MetaSection.jsx";

const API_BASE = import.meta.env.VITE_API_URL || "";
const PLACEHOLDER = `A->B\nA->C\nB->D`;

export default function App() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setResult(null);

    const lines = input
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    if (lines.length === 0) {
      setError("Please enter at least one edge.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/bfhl`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: lines }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `HTTP ${res.status}`);
      }

      const json = await res.json();
      setResult(json);
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setInput("");
    setResult(null);
    setError(null);
  }

  function handleExample() {
    setInput(PLACEHOLDER);
    setResult(null);
    setError(null);
  }

  return (
    <div className="min-h-screen px-4 py-10 md:py-16">
      <div className="max-w-5xl mx-auto space-y-10">

        <header className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-2">
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
            Chitkara BFHL Challenge
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold gradient-text leading-tight">
            Graph Hierarchy Analyzer
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
            Paste directed edges line-by-line to detect tree hierarchies, cycles, and duplicates instantly.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-5">
          <div className="flex items-center justify-between">
            <label htmlFor="edge-input" className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Edge Input
            </label>
            <button
              type="button"
              onClick={handleExample}
              className="text-xs text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors"
            >
              Load example
            </button>
          </div>

          <textarea
            id="edge-input"
            rows={8}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={"A->B\nA->C\nB->D"}
            className="w-full bg-slate-900/70 border border-slate-700/60 rounded-xl px-4 py-3 text-slate-100 font-mono text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 resize-y transition-all duration-200"
            spellCheck={false}
          />

          <div className="flex items-center gap-3 flex-wrap">
            <button
              id="submit-btn"
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Analyze
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl border border-slate-700 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              Clear
            </button>
            <p className="text-slate-600 text-xs ml-auto hidden md:block">
              Format: <span className="font-mono text-slate-500">X-&gt;Y</span> — single uppercase letters
            </p>
          </div>

          {loading && (
            <div className="pt-2">
              <Spinner />
            </div>
          )}

          {error && (
            <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <svg className="w-4 h-4 text-red-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z" />
              </svg>
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}
        </form>

        {result && (
          <div className="space-y-8">
            <div className="glass-card px-6 py-4 flex flex-wrap gap-x-8 gap-y-2 text-xs text-slate-500">
              <span><span className="text-slate-400 font-medium">User ID:</span> {result.user_id}</span>
              <span><span className="text-slate-400 font-medium">Email:</span> {result.email_id}</span>
              <span><span className="text-slate-400 font-medium">Roll No:</span> {result.college_roll_number}</span>
            </div>

            <SummaryCard summary={result.summary} />

            {result.hierarchies && result.hierarchies.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-slate-300 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-violet-500 rounded-full inline-block" />
                  Hierarchies
                  <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-violet-500/20 text-violet-400 border border-violet-500/30 font-bold">
                    {result.hierarchies.length}
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {result.hierarchies.map((h, i) => (
                    <HierarchyCard key={i} hierarchy={h} index={i} />
                  ))}
                </div>
              </div>
            )}

            <MetaSection
              invalid_entries={result.invalid_entries}
              duplicate_edges={result.duplicate_edges}
            />

            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-slate-300">Raw JSON Response</h3>
              </div>
              <pre className="bg-slate-900/80 rounded-xl p-4 text-xs text-slate-400 font-mono overflow-x-auto leading-relaxed border border-slate-800">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>

      <footer className="mt-20 text-center text-slate-700 text-xs">
        Chitkara Full Stack Engineering Challenge · BFHL API
      </footer>
    </div>
  );
}

import { useState } from "react";
import {
  BarChart3,
  Bell,
  HelpCircle,
  Layers,
  LineChart,
  Search,
  Settings,
} from "lucide-react";
import Dashboard from "./pages/Dashboard";
import RevenueIntel from "./pages/RevenueIntel";

type View = "dashboard" | "revenue";

export default function App() {
  const [view, setView] = useState<View>("dashboard");

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f8fb]">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-ink-200">
        <div className="max-w-[1440px] mx-auto flex items-center gap-4 px-6 py-2.5">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-ink-900 text-white grid place-items-center">
              <Layers className="h-4 w-4" />
            </div>
            <div className="leading-tight">
              <div className="text-[13px] font-semibold text-ink-900 tracking-tight">
                VoC Intelligence
              </div>
              <div className="text-[10px] text-ink-500">
                HDFC Life · Contact Center (prototype)
              </div>
            </div>
          </div>

          <nav className="ml-6 flex items-center gap-1 text-xs">
            <button
              onClick={() => setView("dashboard")}
              className={
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md " +
                (view === "dashboard"
                  ? "bg-ink-900 text-white"
                  : "text-ink-600 hover:text-ink-900")
              }
            >
              <BarChart3 className="h-3.5 w-3.5" /> VoC Analytics
            </button>
            <button
              onClick={() => setView("revenue")}
              className={
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md " +
                (view === "revenue"
                  ? "bg-ink-900 text-white"
                  : "text-ink-600 hover:text-ink-900")
              }
            >
              <LineChart className="h-3.5 w-3.5" /> Revenue Intelligence
            </button>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 bg-ink-50 rounded-md px-2.5 py-1.5 text-xs text-ink-500 w-72">
              <Search className="h-3.5 w-3.5" />
              <input
                className="bg-transparent outline-none w-full placeholder:text-ink-400"
                placeholder="Search customer, policy, call ID"
              />
              <span className="text-[10px] text-ink-400 border border-ink-200 rounded px-1">
                /
              </span>
            </div>
            <button className="p-1.5 rounded-md text-ink-500 hover:text-ink-900 hover:bg-ink-100">
              <Bell className="h-4 w-4" />
            </button>
            <button className="p-1.5 rounded-md text-ink-500 hover:text-ink-900 hover:bg-ink-100">
              <HelpCircle className="h-4 w-4" />
            </button>
            <button className="p-1.5 rounded-md text-ink-500 hover:text-ink-900 hover:bg-ink-100">
              <Settings className="h-4 w-4" />
            </button>
            <div className="h-7 w-7 rounded-full bg-brand-600 text-white text-[11px] grid place-items-center font-semibold">
              SR
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full">
        <div className="max-w-[1440px] mx-auto px-6 py-6">
          {view === "dashboard" ? <Dashboard /> : <RevenueIntel />}
        </div>
      </main>

      <footer className="border-t border-ink-200 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-ink-500">
          <span>
            Prototype · sample data · not affiliated with HDFC Life. Built as a
            design reference for Voice of Customer analytics.
          </span>
          <span>v0.1 · {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}

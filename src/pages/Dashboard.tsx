import {
  Area,
  AreaChart,
  Bar as RBar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Filter,
  Lightbulb,
  PhoneCall,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  agentLeaderboard,
  callVolumeByHour,
  complianceFlags,
  kpiStrip,
  productInterest,
  qaDefects,
  recentCalls,
  sentimentTrend,
  topDrivers,
} from "../data";
import { Bar, Card, Kpi, LensBadge, Pill, SectionHeader } from "../components/ui";

const palette = {
  brand: "#2a52e6",
  brandSoft: "#8db0ff",
  good: "#10b981",
  warn: "#f59e0b",
  bad: "#ef4444",
  ink: "#334155",
  inkSoft: "#94a3b8",
};

const pieColors = ["#ef4444", "#f59e0b", "#6366f1", "#0ea5e9", "#10b981"];

function money(n: number) {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(1)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-brand-700">
            Voice of Customer · Contact Center
          </div>
          <h1 className="text-xl font-semibold text-ink-900 tracking-tight">
            Call analytics — Customer / Business / Regulator
          </h1>
          <p className="text-xs text-ink-500 mt-1">
            18,426 calls analysed today across 14 queues · speech-to-text on
            100% of recordings · sample dashboard for HDFC Life.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-lg bg-white border border-ink-200 p-1 text-xs">
            {["Today", "7d", "30d", "QTD"].map((k, i) => (
              <button
                key={k}
                className={
                  i === 1
                    ? "px-2.5 py-1 rounded-md bg-ink-900 text-white"
                    : "px-2.5 py-1 text-ink-600 hover:text-ink-900"
                }
              >
                {k}
              </button>
            ))}
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-ink-200 px-3 py-1.5 text-xs text-ink-700 hover:bg-ink-50">
            <Filter className="h-3.5 w-3.5" /> Queue · Product · Agent
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 text-white px-3 py-1.5 text-xs hover:bg-brand-700">
            <Sparkles className="h-3.5 w-3.5" /> Ask VoC Copilot
          </button>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
        {kpiStrip.map((k) => (
          <Kpi {...k} key={k.key} />
        ))}
      </div>

      {/* Row: Volume + Sentiment trend */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card
          title="Call volume · hour of day"
          subtitle="Inbound vs outbound · all queues"
          action={
            <span className="inline-flex items-center gap-1">
              <PhoneCall className="h-3.5 w-3.5" /> Live
            </span>
          }
          className="xl:col-span-2"
        >
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={callVolumeByHour} margin={{ left: -10, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="gInbound" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={palette.brand} stopOpacity={0.25} />
                    <stop offset="100%" stopColor={palette.brand} stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="gOutbound" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={palette.good} stopOpacity={0.22} />
                    <stop offset="100%" stopColor={palette.good} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#eef2f7" vertical={false} />
                <XAxis dataKey="hour" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={36} />
                <Tooltip cursor={{ stroke: "#cbd5e1" }} />
                <Area type="monotone" dataKey="inbound" stroke={palette.brand} fill="url(#gInbound)" strokeWidth={2} />
                <Area type="monotone" dataKey="outbound" stroke={palette.good} fill="url(#gOutbound)" strokeWidth={2} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card
          title="Sentiment mix · last 7 days"
          subtitle="Positive / neutral / negative share of calls"
        >
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sentimentTrend}
                stackOffset="expand"
                margin={{ left: -10, right: 8, top: 8 }}
              >
                <CartesianGrid stroke="#eef2f7" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <YAxis
                  tickFormatter={(v: number) => `${Math.round(v * 100)}%`}
                  tickLine={false}
                  axisLine={false}
                  width={36}
                />
                <Tooltip formatter={(v) => `${v}%`} />
                <RBar dataKey="positive" stackId="s" fill={palette.good} radius={[4, 4, 0, 0]} />
                <RBar dataKey="neutral" stackId="s" fill={palette.inkSoft} />
                <RBar dataKey="negative" stackId="s" fill={palette.bad} radius={[0, 0, 4, 4]} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* 3-lens panels */}
      <SectionHeader
        eyebrow="3-lens view"
        title="What customers are really calling about"
        desc="Same call, read through three lenses — what matters to the customer, the business, and the regulator."
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card
          title={
            <span className="inline-flex items-center gap-2">
              <Users className="h-4 w-4 text-brand-600" /> Critical to customer
            </span>
          }
          subtitle="Top drivers of CSAT, effort & NPS"
        >
          <ul className="space-y-3">
            {topDrivers.customer.map((d) => (
              <li key={d.label} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ink-800">{d.label}</span>
                  <span className="text-ink-500">
                    {d.volume.toLocaleString("en-IN")}{" "}
                    <span className={d.change >= 0 ? "text-rose-600" : "text-emerald-600"}>
                      {d.change >= 0 ? "▲" : "▼"}
                      {Math.abs(d.change)}%
                    </span>
                  </span>
                </div>
                <Bar value={d.volume} max={2000} tone="brand" />
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-lg bg-brand-50 border border-brand-100 p-3 text-xs text-brand-800 flex gap-2">
            <Lightbulb className="h-4 w-4 shrink-0 mt-0.5" />
            <span>
              Surrender-value confusion is up 18% WoW on ULIP calls — propose a
              simplified pre-call WhatsApp explainer for maturing policies.
            </span>
          </div>
        </Card>

        <Card
          title={
            <span className="inline-flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-600" /> Critical to business
            </span>
          }
          subtitle="Revenue, retention & productivity signals"
        >
          <ul className="space-y-3">
            {topDrivers.business.map((d) => (
              <li key={d.label} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ink-800">{d.label}</span>
                  <span className="text-ink-500">
                    {d.volume.toLocaleString("en-IN")}{" "}
                    <span className={d.change >= 0 ? "text-emerald-600" : "text-rose-600"}>
                      {d.change >= 0 ? "▲" : "▼"}
                      {Math.abs(d.change)}%
                    </span>
                  </span>
                </div>
                <Bar value={d.volume} max={500} tone="good" />
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-lg bg-emerald-50 border border-emerald-100 p-3 text-xs text-emerald-800 flex gap-2">
            <Lightbulb className="h-4 w-4 shrink-0 mt-0.5" />
            <span>
              Annuity enquiries from maturing endowments jumped 31% — route
              these to the Smart Pension Plus desk automatically.
            </span>
          </div>
        </Card>

        <Card
          title={
            <span className="inline-flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-amber-600" /> Critical to regulator
            </span>
          }
          subtitle="IRDAI exposure & grievance signals"
        >
          <ul className="space-y-3">
            {topDrivers.regulator.map((d) => (
              <li key={d.label} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ink-800">{d.label}</span>
                  <span className="text-ink-500">
                    {d.volume.toLocaleString("en-IN")}{" "}
                    <span className={d.change >= 0 ? "text-rose-600" : "text-emerald-600"}>
                      {d.change >= 0 ? "▲" : "▼"}
                      {Math.abs(d.change)}%
                    </span>
                  </span>
                </div>
                <Bar value={d.volume} max={150} tone="warn" />
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-lg bg-amber-50 border border-amber-100 p-3 text-xs text-amber-800 flex gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>
              Mis-selling keyword triggers rose 19% on ULIP calls — auto-attach
              free-look disclosure and queue for QA sampling.
            </span>
          </div>
        </Card>
      </div>

      {/* Call quality + Revenue intel */}
      <SectionHeader
        eyebrow="Operations"
        title="Call quality & revenue intelligence"
        desc="Where to improve the floor and where the next rupee is hiding."
      />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card
          title="QA defect mix"
          subtitle="Auto-scored + sampled manual audits"
        >
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={qaDefects}
                  innerRadius={50}
                  outerRadius={78}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                >
                  {qaDefects.map((_, i) => (
                    <Cell key={i} fill={pieColors[i % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-xs text-ink-500">
            “Disclosure missed” remains the #1 defect — target coaching on
            free-look + charges language.
          </div>
        </Card>

        <Card
          title="Agent leaderboard"
          subtitle="Composite of CSAT, QA, AHT & revenue influenced"
          className="xl:col-span-2"
          padded={false}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="text-ink-500 bg-ink-50/60">
                <tr>
                  <th className="text-left font-medium px-5 py-2">Agent</th>
                  <th className="text-left font-medium px-3 py-2">Team</th>
                  <th className="text-right font-medium px-3 py-2">CSAT</th>
                  <th className="text-right font-medium px-3 py-2">QA</th>
                  <th className="text-right font-medium px-3 py-2">AHT</th>
                  <th className="text-right font-medium px-3 py-2">Revenue influenced</th>
                  <th className="text-right font-medium px-5 py-2">Alerts</th>
                </tr>
              </thead>
              <tbody>
                {agentLeaderboard.map((a) => (
                  <tr key={a.name} className="border-t border-ink-100">
                    <td className="px-5 py-2.5 font-medium text-ink-900">{a.name}</td>
                    <td className="px-3 py-2.5 text-ink-600">{a.team}</td>
                    <td className="px-3 py-2.5 text-right">
                      <span className={a.csat >= 88 ? "text-emerald-600" : a.csat >= 83 ? "text-ink-800" : "text-rose-600"}>
                        {a.csat}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-right">{a.qa}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums">{a.aht}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums">{money(a.revenue)}</td>
                    <td className="px-5 py-2.5 text-right">
                      {a.alerts === 0 ? (
                        <Pill tone="good">
                          <BadgeCheck className="h-3 w-3" /> clean
                        </Pill>
                      ) : (
                        <Pill tone={a.alerts > 1 ? "bad" : "warn"}>
                          <AlertTriangle className="h-3 w-3" /> {a.alerts}
                        </Pill>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card
          title="Product interest mined from calls"
          subtitle="Mentions vs. conversion to warm lead"
          className="xl:col-span-2"
        >
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={productInterest}
                layout="vertical"
                margin={{ left: 8, right: 24, top: 8 }}
              >
                <CartesianGrid stroke="#eef2f7" horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} />
                <YAxis
                  type="category"
                  dataKey="product"
                  width={190}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip />
                <RBar dataKey="mentions" fill={palette.brand} radius={[0, 6, 6, 0]} barSize={14}>
                  {productInterest.map((_, i) => (
                    <Cell key={i} fill={palette.brand} />
                  ))}
                </RBar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2 text-[11px]">
            {productInterest.map((p) => (
              <div
                key={p.product}
                className="flex items-center justify-between rounded-lg bg-ink-50 px-2.5 py-1.5"
              >
                <span className="truncate text-ink-700">{p.product.split(" (")[0]}</span>
                <span className="text-emerald-700 font-medium">
                  {p.conversion}% conv
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card
          title="Compliance index · IRDAI"
          subtitle="Disclosure, consent & grievance adherence"
        >
          <ul className="space-y-3">
            {complianceFlags.map((c) => {
              const invert = c.invert;
              const pct = invert
                ? Math.min(100, (c.value / (c.target || 1)) * 100)
                : (c.value / c.target) * 100;
              const tone = invert
                ? c.value <= c.target * 0.5
                  ? "good"
                  : c.value <= c.target
                  ? "warn"
                  : "bad"
                : pct >= 98
                ? "good"
                : pct >= 92
                ? "warn"
                : "bad";
              return (
                <li key={c.label} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-ink-800">{c.label}</span>
                    <span className="text-ink-700 tabular-nums">
                      {c.value}
                      {c.suffix ?? "%"}
                    </span>
                  </div>
                  <Bar value={Math.min(100, pct)} tone={tone as "good" | "warn" | "bad"} />
                </li>
              );
            })}
          </ul>
          <div className="mt-4 rounded-lg bg-ink-900 text-white p-3 text-xs flex gap-2">
            <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5 text-amber-400" />
            <span>
              2.9% of ULIP calls missed the mandatory free-look restatement —
              auto-coach bot queued for 38 agents.
            </span>
          </div>
        </Card>
      </div>

      {/* Recent calls */}
      <SectionHeader
        eyebrow="Call stream"
        title="Recent calls · auto-tagged"
        desc="Live sample of calls analysed in the last hour."
        right={
          <a className="text-xs text-brand-700 inline-flex items-center gap-1 cursor-pointer">
            View all 18,426 <ArrowRight className="h-3.5 w-3.5" />
          </a>
        }
      />
      <Card padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="text-ink-500 bg-ink-50/60">
              <tr>
                <th className="text-left font-medium px-5 py-2">Call</th>
                <th className="text-left font-medium px-3 py-2">Customer</th>
                <th className="text-left font-medium px-3 py-2">Product</th>
                <th className="text-left font-medium px-3 py-2">Agent</th>
                <th className="text-left font-medium px-3 py-2">Intent</th>
                <th className="text-left font-medium px-3 py-2">Sentiment</th>
                <th className="text-left font-medium px-3 py-2">VoC flags</th>
                <th className="text-right font-medium px-5 py-2">Revenue impact</th>
              </tr>
            </thead>
            <tbody>
              {recentCalls.map((c) => (
                <tr key={c.id} className="border-t border-ink-100 hover:bg-ink-50/40">
                  <td className="px-5 py-2.5">
                    <div className="font-medium text-ink-900">{c.id}</div>
                    <div className="text-ink-500">{c.duration}</div>
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="text-ink-900">{c.customer}</div>
                    <div className="text-ink-500">{c.policy}</div>
                  </td>
                  <td className="px-3 py-2.5 text-ink-700">{c.product}</td>
                  <td className="px-3 py-2.5 text-ink-700">{c.agent}</td>
                  <td className="px-3 py-2.5 text-ink-700">{c.intent}</td>
                  <td className="px-3 py-2.5">
                    <Pill tone={c.sentiment === "positive" ? "good" : c.sentiment === "neutral" ? "ink" : "bad"}>
                      {c.sentiment}
                    </Pill>
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex flex-wrap gap-1">
                      {c.flags.map((f) => {
                        const tone = /mis-sell|escalation|grievance/i.test(f)
                          ? "bad"
                          : /free-look|compliance/i.test(f)
                          ? "warn"
                          : /upsell|retention|cross-sell|annuity/i.test(f)
                          ? "good"
                          : "brand";
                        return (
                          <Pill key={f} tone={tone as "bad" | "warn" | "good" | "brand"}>
                            {f}
                          </Pill>
                        );
                      })}
                    </div>
                  </td>
                  <td className="px-5 py-2.5 text-right tabular-nums">
                    {c.revenueImpact > 0 ? (
                      <span className="text-emerald-700 font-medium">{money(c.revenueImpact)}</span>
                    ) : (
                      <span className="text-ink-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Lens legend */}
      <div className="flex flex-wrap items-center gap-3 text-[11px] text-ink-500">
        <span>Lens:</span>
        <LensBadge lens="customer" />
        <LensBadge lens="business" />
        <LensBadge lens="regulator" />
        <span className="ml-auto">
          Data shown is illustrative. Signals are mined from call audio via
          speech-to-text + topic / sentiment / compliance models.
        </span>
      </div>

      {/* Suppress unused import warning */}
      <div className="hidden">
        <LineChart data={[]} width={0} height={0}>
          <Line dataKey="x" />
        </LineChart>
      </div>
    </div>
  );
}

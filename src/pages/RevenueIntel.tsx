import {
  Bar as RBar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowRight,
  BadgeDollarSign,
  Building2,
  Clock,
  Crosshair,
  Minus,
  Sparkles,
  Swords,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  actionableInsights,
  competitorIntel,
  funnelStages,
  objectionAnalysis,
} from "../data";
import { Bar, Card, Pill, SectionHeader } from "../components/ui";

function inr(n: number) {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(1)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

const stageTones = ["brand", "brand", "warn", "bad", "good"] as const;

export default function RevenueIntel() {
  const topOfFunnel = funnelStages[0].count;
  const sold = funnelStages[funnelStages.length - 1].count;
  const overallConv = ((sold / topOfFunnel) * 100).toFixed(2);
  const totalRevLost = objectionAnalysis.reduce(
    (a, b) => a + b.revenueLost,
    0
  );

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-brand-700">
            Revenue Intelligence · Contact Center
          </div>
          <h1 className="text-xl font-semibold text-ink-900 tracking-tight">
            Where the rupees leak, and where to win them back
          </h1>
          <p className="text-xs text-ink-500 mt-1">
            {topOfFunnel.toLocaleString("en-IN")} inbound + outbound sales
            interactions · {overallConv}% end-to-end conversion · {inr(totalRevLost)} of
            recoverable revenue mapped below.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-ink-200 px-3 py-1.5 text-xs text-ink-700 hover:bg-ink-50">
            <Clock className="h-3.5 w-3.5" /> Last 30 days
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 text-white px-3 py-1.5 text-xs hover:bg-brand-700">
            <Sparkles className="h-3.5 w-3.5" /> Ask Revenue Copilot
          </button>
        </div>
      </div>

      {/* Funnel */}
      <SectionHeader
        eyebrow="Call funnel"
        title="Life-insurance call funnel · 5 stages"
        desc="Call volume, conversion, talk-time and the top reasons people fall out at each stage."
      />
      <Card padded={false}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 divide-x divide-ink-100">
          {funnelStages.map((s, i) => {
            const prev = i === 0 ? null : funnelStages[i - 1];
            const dropoff = prev ? prev.count - s.count : 0;
            const dropPct = prev ? ((dropoff / prev.count) * 100).toFixed(1) : null;
            const widthPct = Math.max(
              10,
              Math.round((s.count / topOfFunnel) * 100)
            );
            const tone = stageTones[i];
            return (
              <div key={s.stage} className="p-4 flex flex-col gap-3 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="text-[11px] font-semibold text-ink-900">
                    {s.stage}
                  </div>
                  <span className="text-[10px] text-ink-500 tabular-nums">
                    AHT {s.avgDuration}
                  </span>
                </div>

                <div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-semibold tabular-nums text-ink-900">
                      {s.count.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[11px] text-ink-500">calls</span>
                  </div>
                  <div className="h-2 rounded-full bg-ink-100 mt-2 overflow-hidden">
                    <div
                      className={
                        tone === "brand"
                          ? "h-full bg-brand-500"
                          : tone === "warn"
                          ? "h-full bg-amber-500"
                          : tone === "bad"
                          ? "h-full bg-rose-500"
                          : "h-full bg-emerald-500"
                      }
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span className="text-ink-600">
                      Stage conv.{" "}
                      <span className="font-semibold text-ink-900">
                        {s.conversion}%
                      </span>
                    </span>
                    {prev ? (
                      <span className="inline-flex items-center gap-1 text-rose-700">
                        <TrendingDown className="h-3 w-3" />
                        {dropoff.toLocaleString("en-IN")} drop · {dropPct}%
                      </span>
                    ) : (
                      <span className="text-emerald-700">Top of funnel</span>
                    )}
                  </div>
                </div>

                <div className="mt-1">
                  <div className="text-[10px] uppercase tracking-wider text-ink-500 font-medium mb-1.5">
                    Top drop-off reasons
                  </div>
                  <ul className="space-y-1.5">
                    {s.dropReasons.map((r) => (
                      <li key={r.reason} className="text-[11px]">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-ink-700 truncate">
                            {r.reason}
                          </span>
                          <span className="text-ink-500 tabular-nums">
                            {r.share}%
                          </span>
                        </div>
                        <Bar
                          value={r.share}
                          max={50}
                          tone={
                            tone === "brand"
                              ? "brand"
                              : tone === "warn"
                              ? "warn"
                              : tone === "bad"
                              ? "bad"
                              : "good"
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
        <div className="px-5 py-3 bg-ink-50 border-t border-ink-100 text-[11px] text-ink-600 flex flex-wrap items-center gap-3">
          <span>
            End-to-end conversion: <b>{overallConv}%</b>
          </span>
          <span className="text-ink-400">·</span>
          <span>
            Biggest single drop: <b>Application → Sold</b> (medical tests &
            payment)
          </span>
          <span className="ml-auto inline-flex items-center gap-1 text-brand-700">
            Drill into any stage <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </Card>

      {/* Competitor intelligence */}
      <SectionHeader
        eyebrow="Competitor intelligence"
        title="Who are customers naming on HDFC Life calls?"
        desc="Speech-mined from 6,750 competitive mentions this month — trend, share and the reasons behind each."
        right={
          <Pill tone="warn">
            <Swords className="h-3 w-3" /> 6,750 competitive mentions · 30d
          </Pill>
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {competitorIntel.map((c) => {
          const TrendIcon =
            c.trend === "up"
              ? TrendingUp
              : c.trend === "down"
              ? TrendingDown
              : Minus;
          const trendCls =
            c.trend === "up"
              ? "text-rose-600 bg-rose-50 ring-rose-100"
              : c.trend === "down"
              ? "text-emerald-600 bg-emerald-50 ring-emerald-100"
              : "text-ink-600 bg-ink-100 ring-ink-200";
          return (
            <Card key={c.name}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="inline-flex items-center gap-2">
                    <div className="h-7 w-7 rounded-md bg-ink-900 text-white grid place-items-center">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-[13px] font-semibold text-ink-900 tracking-tight">
                        {c.name}
                      </div>
                      <div className="text-[11px] text-ink-500">
                        {c.mentions.toLocaleString("en-IN")} mentions · {c.share}% share
                      </div>
                    </div>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center gap-1 rounded-full text-[11px] font-medium px-2 py-0.5 ring-1 ring-inset ${trendCls}`}
                >
                  <TrendIcon className="h-3 w-3" />
                  {c.delta}
                </span>
              </div>

              <div className="mt-4">
                <div className="text-[10px] uppercase tracking-wider text-ink-500 font-medium mb-2">
                  Why customers bring them up
                </div>
                <ul className="space-y-2">
                  {c.reasons.map((r) => (
                    <li key={r.reason} className="space-y-1">
                      <div className="flex items-center justify-between gap-2 text-[11px]">
                        <span className="text-ink-800 truncate">{r.reason}</span>
                        <span className="flex items-center gap-1.5 shrink-0">
                          <Pill
                            tone={
                              r.impact === "high"
                                ? "bad"
                                : r.impact === "medium"
                                ? "warn"
                                : "ink"
                            }
                          >
                            {r.impact}
                          </Pill>
                          <span className="text-ink-500 tabular-nums">
                            {r.share}%
                          </span>
                        </span>
                      </div>
                      <Bar
                        value={r.share}
                        max={50}
                        tone={
                          r.impact === "high"
                            ? "bad"
                            : r.impact === "medium"
                            ? "warn"
                            : "ink"
                        }
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Objection analysis */}
      <SectionHeader
        eyebrow="Objection analysis"
        title="Where is revenue leaking, and how much is recoverable?"
        desc="Sorted by revenue-at-risk. Win-back % is the historical conversion after targeted intervention."
        right={
          <Pill tone="bad">
            <BadgeDollarSign className="h-3 w-3" /> {inr(totalRevLost)} revenue at risk
          </Pill>
        }
      />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card
          title="Revenue lost by objection (₹)"
          subtitle="Monthly annualised"
          className="xl:col-span-1"
        >
          <div className="h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[...objectionAnalysis].sort(
                  (a, b) => b.revenueLost - a.revenueLost
                )}
                layout="vertical"
                margin={{ left: 8, right: 16, top: 4 }}
              >
                <CartesianGrid stroke="#eef2f7" horizontal={false} />
                <XAxis
                  type="number"
                  tickFormatter={(v: number) => inr(v)}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="category"
                  width={170}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip formatter={(v) => inr(Number(v))} />
                <RBar dataKey="revenueLost" radius={[0, 6, 6, 0]} barSize={14}>
                  {objectionAnalysis.map((o, i) => (
                    <Cell
                      key={i}
                      fill={
                        o.winBack >= 50
                          ? "#10b981"
                          : o.winBack >= 30
                          ? "#f59e0b"
                          : "#ef4444"
                      }
                    />
                  ))}
                </RBar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex items-center gap-3 text-[11px] text-ink-500">
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> High recover (&gt;50%)
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-amber-500" /> Medium
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-rose-500" /> Low
            </span>
          </div>
        </Card>

        <Card
          title="Objection table"
          subtitle="Volume · revenue lost · win-back potential · what's driving it"
          className="xl:col-span-2"
          padded={false}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="text-ink-500 bg-ink-50/60">
                <tr>
                  <th className="text-left font-medium px-5 py-2">Objection</th>
                  <th className="text-right font-medium px-3 py-2">Volume / mo</th>
                  <th className="text-right font-medium px-3 py-2">Revenue lost</th>
                  <th className="text-left font-medium px-3 py-2">Win-back potential</th>
                  <th className="text-left font-medium px-3 py-2">Recoverability</th>
                  <th className="text-left font-medium px-5 py-2">Primary driver</th>
                </tr>
              </thead>
              <tbody>
                {[...objectionAnalysis]
                  .sort((a, b) => b.winBack - a.winBack)
                  .map((o) => (
                    <tr
                      key={o.category}
                      className="border-t border-ink-100 align-top"
                    >
                      <td className="px-5 py-2.5 font-medium text-ink-900">
                        {o.category}
                      </td>
                      <td className="px-3 py-2.5 text-right tabular-nums">
                        {o.volume.toLocaleString("en-IN")}
                      </td>
                      <td className="px-3 py-2.5 text-right tabular-nums text-rose-700 font-medium">
                        {inr(o.revenueLost)}
                      </td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2 min-w-[140px]">
                          <div className="flex-1">
                            <Bar
                              value={o.winBack}
                              tone={
                                o.winBack >= 50
                                  ? "good"
                                  : o.winBack >= 30
                                  ? "warn"
                                  : "bad"
                              }
                            />
                          </div>
                          <span className="tabular-nums text-ink-800 font-medium">
                            {o.winBack}%
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-2.5">
                        <Pill
                          tone={
                            o.recoverability === "High"
                              ? "good"
                              : o.recoverability === "Medium"
                              ? "warn"
                              : "bad"
                          }
                        >
                          {o.recoverability}
                        </Pill>
                      </td>
                      <td className="px-5 py-2.5 text-ink-600">{o.driver}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Actionable insights */}
      <SectionHeader
        eyebrow="Turn data into action"
        title="5 prioritized actions · owners & timeframes"
        desc="Recommendations ranked by revenue impact × recoverability. Each card is one-click assignable to an owner."
        right={
          <Pill tone="brand">
            <Target className="h-3 w-3" /> Total modelled impact · ₹46.4 Cr
          </Pill>
        }
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {actionableInsights.map((a, i) => (
          <Card key={a.title}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <Pill tone={a.tone}>{a.priority}</Pill>
                  <span className="text-[10px] uppercase tracking-wider text-ink-500 font-medium">
                    Action #{i + 1}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-ink-900 leading-snug">
                  {a.title}
                </h3>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[10px] uppercase tracking-wider text-ink-500">
                  Win-back
                </div>
                <div className="text-lg font-semibold text-emerald-700 tabular-nums">
                  {a.winBack}
                </div>
              </div>
            </div>

            <div className="mt-3 text-xs text-ink-700 leading-relaxed">
              <div>
                <span className="text-[11px] font-semibold text-ink-500 uppercase tracking-wider">
                  Why now ·{" "}
                </span>
                {a.why}
              </div>
              <div className="mt-2">
                <span className="text-[11px] font-semibold text-ink-500 uppercase tracking-wider">
                  Recommendation ·{" "}
                </span>
                {a.recommendation}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 text-[11px]">
              <InfoCell
                icon={<BadgeDollarSign className="h-3.5 w-3.5 text-emerald-600" />}
                label="Revenue impact"
                value={a.impact}
              />
              <InfoCell
                icon={<Users className="h-3.5 w-3.5 text-brand-600" />}
                label="Owner"
                value={a.owner}
              />
              <InfoCell
                icon={<Clock className="h-3.5 w-3.5 text-amber-600" />}
                label="Timeframe"
                value={a.timeframe}
              />
            </div>

            <div className="mt-4 flex items-center gap-2">
              <button className="text-[11px] rounded-md bg-ink-900 text-white px-3 py-1.5 hover:bg-ink-800 inline-flex items-center gap-1">
                <Crosshair className="h-3.5 w-3.5" /> Assign owner
              </button>
              <button className="text-[11px] rounded-md bg-white border border-ink-200 text-ink-700 px-3 py-1.5 hover:bg-ink-50">
                Add to roadmap
              </button>
              <button className="ml-auto text-[11px] text-brand-700 inline-flex items-center gap-1 hover:text-brand-900">
                View evidence calls <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-[11px] text-ink-500">
        Data is illustrative. Funnel, competitor and objection signals are
        extracted from speech-to-text + topic/entity/intent models over sales and
        service calls.
      </div>
    </div>
  );
}

function InfoCell({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg bg-ink-50 border border-ink-100 p-2.5 min-w-0">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-ink-500 font-medium">
        {icon}
        {label}
      </div>
      <div className="text-[12px] text-ink-900 font-medium mt-0.5 leading-snug">
        {value}
      </div>
    </div>
  );
}

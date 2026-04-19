# HDFC Life · Voice of Customer (prototype)

An interactive design prototype for a Voice-of-Customer analytics platform built
around a life-insurance contact centre. Every call is read through three lenses:

- **Critical to customer** — CSAT, effort, NPS, plain-language clarity
- **Critical to business** — revenue influenced, cross-sell, retention saves, AHT
- **Critical to regulator** — IRDAI compliance, free-look, grievance TAT, mis-sell flags

### Screens

1. **VoC Analytics Dashboard** — KPI strip, call volume, sentiment mix, 3-lens
   drivers, QA defect mix, agent leaderboard, product-interest mining,
   compliance index and an auto-tagged call stream.
2. **Revenue Intelligence** — 5-stage life-insurance call funnel with drop-off
   reasons, competitor intelligence (LIC, ICICI Prudential, Max Life, SBI Life),
   objection analysis table with win-back potential, and 5 prioritised
   actionable insights (owner, timeframe, revenue impact).

### Stack

Vite + React + TypeScript + Tailwind CSS + Recharts + lucide-react.

### Run

```bash
npm install
npm run dev
```

### Build + deploy

```bash
npm run build
# upload `dist/` to any static host
```

Sample data is illustrative — nothing in this repo is affiliated with HDFC Life.

// Realistic-looking sample data for a life-insurance voice-of-customer
// analytics prototype. Values are fabricated but shaped for HDFC Life's
// contact-center context (IRDAI regulation, ULIPs, term plans, annuities).

export type Lens = "customer" | "business" | "regulator";

export const kpiStrip = [
  {
    key: "calls",
    label: "Calls handled (today)",
    value: "18,426",
    delta: "+4.2%",
    trend: "up" as const,
    hint: "vs. 7-day avg",
    lens: "business" as Lens,
  },
  {
    key: "csat",
    label: "CSAT",
    value: "84.6",
    suffix: "/100",
    delta: "+1.8",
    trend: "up" as const,
    hint: "post-call IVR survey",
    lens: "customer" as Lens,
  },
  {
    key: "fcr",
    label: "First-Call Resolution",
    value: "71.3%",
    delta: "-0.6pp",
    trend: "down" as const,
    hint: "target 75%",
    lens: "customer" as Lens,
  },
  {
    key: "aht",
    label: "Avg Handle Time",
    value: "5m 42s",
    delta: "-8s",
    trend: "down" as const,
    good: true,
    hint: "goal < 6m 00s",
    lens: "business" as Lens,
  },
  {
    key: "revenue",
    label: "Revenue influenced",
    value: "₹3.12 Cr",
    delta: "+₹46 L",
    trend: "up" as const,
    hint: "cross-sell + retention saves",
    lens: "business" as Lens,
  },
  {
    key: "compliance",
    label: "Compliance score",
    value: "96.4%",
    delta: "+0.3pp",
    trend: "up" as const,
    hint: "IRDAI adherence index",
    lens: "regulator" as Lens,
  },
  {
    key: "grievance",
    label: "Grievance TAT",
    value: "3.1 days",
    delta: "-0.4d",
    trend: "down" as const,
    good: true,
    hint: "IGMS SLA ≤ 14 d",
    lens: "regulator" as Lens,
  },
  {
    key: "nps",
    label: "NPS",
    value: "+41",
    delta: "+3",
    trend: "up" as const,
    hint: "rolling 30-day",
    lens: "customer" as Lens,
  },
];

export const callVolumeByHour = [
  { hour: "08", inbound: 640, outbound: 210 },
  { hour: "09", inbound: 1080, outbound: 320 },
  { hour: "10", inbound: 1420, outbound: 410 },
  { hour: "11", inbound: 1680, outbound: 460 },
  { hour: "12", inbound: 1540, outbound: 380 },
  { hour: "13", inbound: 1180, outbound: 260 },
  { hour: "14", inbound: 1390, outbound: 420 },
  { hour: "15", inbound: 1620, outbound: 510 },
  { hour: "16", inbound: 1580, outbound: 540 },
  { hour: "17", inbound: 1340, outbound: 470 },
  { hour: "18", inbound: 980, outbound: 300 },
  { hour: "19", inbound: 640, outbound: 180 },
];

export const sentimentTrend = [
  { day: "Mon", positive: 62, neutral: 24, negative: 14 },
  { day: "Tue", positive: 58, neutral: 26, negative: 16 },
  { day: "Wed", positive: 64, neutral: 23, negative: 13 },
  { day: "Thu", positive: 60, neutral: 25, negative: 15 },
  { day: "Fri", positive: 66, neutral: 22, negative: 12 },
  { day: "Sat", positive: 69, neutral: 21, negative: 10 },
  { day: "Sun", positive: 67, neutral: 22, negative: 11 },
];

export const topDrivers = {
  customer: [
    { label: "Premium payment / auto-debit failed", volume: 1820, change: 12 },
    { label: "Policy status & bonus enquiry", volume: 1540, change: -4 },
    { label: "Surrender value confusion", volume: 980, change: 18 },
    { label: "ULIP fund switch / NAV", volume: 760, change: 9 },
    { label: "Claim intimation & documents", volume: 690, change: -7 },
    { label: "Address / nominee update", volume: 610, change: 3 },
  ],
  business: [
    { label: "Cross-sell: term top-up", volume: 480, change: 22 },
    { label: "Retention save (lapse risk)", volume: 365, change: 14 },
    { label: "Annuity enquiry from maturing policies", volume: 290, change: 31 },
    { label: "ULIP reinstatement", volume: 210, change: 8 },
    { label: "Group-to-retail conversion", volume: 140, change: 12 },
  ],
  regulator: [
    { label: "Free-look / cooling-off mentions", volume: 118, change: -6 },
    { label: "Mis-selling complaint keywords", volume: 74, change: 19 },
    { label: "Unclaimed amount enquiry", volume: 62, change: 4 },
    { label: "Grievance escalation (IGMS)", volume: 41, change: -8 },
    { label: "KYC / sanction screening flags", volume: 28, change: 2 },
  ],
};

export const qaDefects = [
  { name: "Disclosure missed", value: 38 },
  { name: "Incorrect info", value: 22 },
  { name: "Soft-skill breach", value: 18 },
  { name: "Process deviation", value: 14 },
  { name: "Data capture error", value: 8 },
];

export const agentLeaderboard = [
  { name: "Pooja Nair", team: "Mumbai · Retention", csat: 92, qa: 96, aht: "5:18", revenue: 1840000, alerts: 0 },
  { name: "Rohan Mehta", team: "Pune · Servicing", csat: 90, qa: 94, aht: "5:41", revenue: 920000, alerts: 1 },
  { name: "Aisha Qureshi", team: "Hyderabad · Sales", csat: 88, qa: 91, aht: "6:02", revenue: 2140000, alerts: 0 },
  { name: "Vikram Joshi", team: "Gurugram · Claims", csat: 86, qa: 93, aht: "6:24", revenue: 340000, alerts: 2 },
  { name: "Nandini Rao", team: "Bengaluru · Sales", csat: 85, qa: 90, aht: "6:10", revenue: 1720000, alerts: 0 },
  { name: "Arjun Saxena", team: "Mumbai · Sales", csat: 81, qa: 82, aht: "7:05", revenue: 610000, alerts: 3 },
];

export const productInterest = [
  { product: "Sanchay Plus (non-par)", mentions: 2140, conversion: 11.4 },
  { product: "Click 2 Protect Super (term)", mentions: 1820, conversion: 18.7 },
  { product: "Smart Pension Plus (annuity)", mentions: 1260, conversion: 22.1 },
  { product: "Click 2 Wealth (ULIP)", mentions: 990, conversion: 9.2 },
  { product: "Systematic Retirement Plan", mentions: 740, conversion: 14.5 },
  { product: "Sampoorn Nivesh", mentions: 520, conversion: 7.8 },
];

export const complianceFlags = [
  { label: "Recording & consent coverage", value: 99.6, target: 100 },
  { label: "Mandatory disclosures read", value: 97.1, target: 100 },
  { label: "Free-look period communicated", value: 94.3, target: 100 },
  { label: "Mis-selling keyword triggers", value: 0.41, target: 0.5, invert: true, suffix: "%" },
  { label: "Grievance TAT (days)", value: 3.1, target: 14, invert: true, suffix: "d" },
  { label: "DNC / outbound compliance", value: 99.8, target: 100 },
];

export const recentCalls = [
  {
    id: "CL-8821",
    customer: "Meera Iyer",
    policy: "HL-PRO-4429121",
    product: "Click 2 Protect Super",
    agent: "Pooja Nair",
    duration: "6:12",
    sentiment: "negative" as const,
    intent: "Premium auto-debit failed · lapse risk",
    flags: ["Retention opportunity", "Free-look reminder"],
    revenueImpact: 48000,
  },
  {
    id: "CL-8822",
    customer: "Rahul Deshpande",
    policy: "HL-SNC-3310044",
    product: "Sanchay Plus",
    agent: "Rohan Mehta",
    duration: "4:48",
    sentiment: "neutral" as const,
    intent: "Maturity payout query",
    flags: ["Annuity cross-sell"],
    revenueImpact: 0,
  },
  {
    id: "CL-8823",
    customer: "Farhan Ali",
    policy: "HL-ULP-7781902",
    product: "Click 2 Wealth",
    agent: "Aisha Qureshi",
    duration: "8:31",
    sentiment: "negative" as const,
    intent: "Surrender value dispute · mis-sell keyword",
    flags: ["Mis-sell flag", "QA review"],
    revenueImpact: 0,
  },
  {
    id: "CL-8824",
    customer: "Shruti Kapoor",
    policy: "HL-SRP-2290011",
    product: "Systematic Retirement Plan",
    agent: "Nandini Rao",
    duration: "5:02",
    sentiment: "positive" as const,
    intent: "Top-up interest",
    flags: ["Upsell opportunity"],
    revenueImpact: 120000,
  },
  {
    id: "CL-8825",
    customer: "Vivek Bhatia",
    policy: "HL-CL-5560077",
    product: "Click 2 Protect",
    agent: "Vikram Joshi",
    duration: "9:44",
    sentiment: "negative" as const,
    intent: "Claim document rejection",
    flags: ["Escalation", "Grievance risk"],
    revenueImpact: 0,
  },
];


// -------- Revenue Intelligence screen --------

export const funnelStages = [
  {
    stage: "1. Initial contact",
    count: 18426,
    avgDuration: "0:48",
    conversion: 100,
    dropReasons: [
      { reason: "IVR navigation abandoned", share: 38 },
      { reason: "Wrong queue / no agent match", share: 24 },
      { reason: "Hung up before connect", share: 21 },
      { reason: "Callback requested", share: 17 },
    ],
  },
  {
    stage: "2. Needs discovery",
    count: 12940,
    avgDuration: "2:35",
    conversion: 70.2,
    dropReasons: [
      { reason: "Not the decision-maker (spouse/family)", share: 34 },
      { reason: "Premium indicative vs budget", share: 27 },
      { reason: "Already insured elsewhere", share: 18 },
      { reason: "Lead quality poor — not in market", share: 13 },
      { reason: "Language mismatch", share: 8 },
    ],
  },
  {
    stage: "3. Product illustration",
    count: 8410,
    avgDuration: "5:22",
    conversion: 65.0,
    dropReasons: [
      { reason: "IRR / returns below expectation", share: 31 },
      { reason: "Competitor quote cheaper", share: 29 },
      { reason: "Confused by charges / lock-in", share: 19 },
      { reason: "Too much information — will review", share: 12 },
      { reason: "Wants face-to-face meeting", share: 9 },
    ],
  },
  {
    stage: "4. Application & underwriting",
    count: 3180,
    avgDuration: "7:48",
    conversion: 37.8,
    dropReasons: [
      { reason: "Medical tests required — declined", share: 36 },
      { reason: "Income / document proof delay", share: 24 },
      { reason: "Sum assured reduced at UW — lost interest", share: 18 },
      { reason: "Nominee / KYC issue", share: 13 },
      { reason: "Free-look anxiety after reading terms", share: 9 },
    ],
  },
  {
    stage: "5. Policy sold · premium paid",
    count: 1944,
    avgDuration: "3:10",
    conversion: 61.1,
    dropReasons: [
      { reason: "Payment gateway / auto-debit failed", share: 41 },
      { reason: "Changed mind during cooling-off", share: 26 },
      { reason: "Competitor counter-offer at last step", share: 18 },
      { reason: "Co-applicant signature pending", share: 15 },
    ],
  },
];

export const competitorIntel = [
  {
    name: "LIC",
    mentions: 2840,
    trend: "up" as const,
    delta: "+14%",
    share: 42.1,
    reasons: [
      { reason: "Cheaper term premium at similar cover", impact: "high" as const, share: 38 },
      { reason: "Trust / government-backed perception", impact: "high" as const, share: 27 },
      { reason: "Family already holds LIC policy", impact: "medium" as const, share: 22 },
      { reason: "Agent relationship in hometown", impact: "low" as const, share: 13 },
    ],
  },
  {
    name: "ICICI Prudential",
    mentions: 1620,
    trend: "up" as const,
    delta: "+9%",
    share: 24.0,
    reasons: [
      { reason: "ULIP fund performance comparison", impact: "high" as const, share: 41 },
      { reason: "Lower allocation & fund mgmt charges", impact: "high" as const, share: 26 },
      { reason: "Digital onboarding experience", impact: "medium" as const, share: 19 },
      { reason: "Relationship with bank channel", impact: "low" as const, share: 14 },
    ],
  },
  {
    name: "Max Life",
    mentions: 1180,
    trend: "stable" as const,
    delta: "±1%",
    share: 17.5,
    reasons: [
      { reason: "Claim-settlement ratio marketing", impact: "high" as const, share: 35 },
      { reason: "Smart Secure Plus term comparison", impact: "high" as const, share: 31 },
      { reason: "Rider stacking (critical illness)", impact: "medium" as const, share: 21 },
      { reason: "Axis Bank co-branded trust", impact: "low" as const, share: 13 },
    ],
  },
  {
    name: "SBI Life",
    mentions: 1110,
    trend: "down" as const,
    delta: "-6%",
    share: 16.4,
    reasons: [
      { reason: "Sold by bank RM at branch", impact: "high" as const, share: 44 },
      { reason: "Cheaper endowment illustration", impact: "medium" as const, share: 23 },
      { reason: "Existing SBI banking relationship", impact: "medium" as const, share: 20 },
      { reason: "Agent follow-up persistence", impact: "low" as const, share: 13 },
    ],
  },
];

export const objectionAnalysis = [
  {
    category: "Price / premium too high",
    volume: 2410,
    revenueLost: 182_500_000, // ₹18.25 Cr
    winBack: 28,
    recoverability: "Medium",
    driver: "LIC & SBI Life undercut on term pricing",
  },
  {
    category: "Medical tests required",
    volume: 1180,
    revenueLost: 96_000_000, // ₹9.6 Cr
    winBack: 62,
    recoverability: "High",
    driver: "Threshold at ₹50L — competitor waives up to ₹75L",
  },
  {
    category: "ULIP charges & lock-in confusion",
    volume: 1040,
    revenueLost: 74_500_000, // ₹7.45 Cr
    winBack: 45,
    recoverability: "High",
    driver: "Mis-interpretation of discontinuation + FMC",
  },
  {
    category: "Need to consult family / spouse",
    volume: 1960,
    revenueLost: 58_000_000, // ₹5.8 Cr
    winBack: 51,
    recoverability: "High",
    driver: "No mechanism to pull decision-maker in real-time",
  },
  {
    category: "Claim settlement doubts",
    volume: 640,
    revenueLost: 41_000_000, // ₹4.1 Cr
    winBack: 34,
    recoverability: "Medium",
    driver: "Max Life CSR marketing creates doubt",
  },
  {
    category: "Returns / IRR below expectation",
    volume: 870,
    revenueLost: 38_500_000, // ₹3.85 Cr
    winBack: 22,
    recoverability: "Low",
    driver: "Compared to mutual funds & ICICI Pru ULIPs",
  },
  {
    category: "Already insured / adequately covered",
    volume: 720,
    revenueLost: 22_000_000, // ₹2.2 Cr
    winBack: 14,
    recoverability: "Low",
    driver: "Legitimate saturation — shift to top-up sell",
  },
];

export const actionableInsights = [
  {
    priority: "P0 · This quarter",
    tone: "bad" as const,
    title: 'Launch "HDFC Life Term Lite" to compete with LIC pricing',
    why: "LIC mentions up 14% WoW · 38% cite cheaper premium · losing ₹18.5 Cr annualised on price-led objections",
    recommendation:
      "Stripped-down term SKU priced within 4% of LIC's Tech Term, positioned for first-time buyers aged 28–40. Pilot in top-3 metros.",
    impact: "₹18.5 Cr revenue recovery (est.)",
    winBack: "28%",
    owner: "Head of Product · with Appointed Actuary",
    timeframe: "Q1 → Q2 (90 days)",
  },
  {
    priority: "P0 · This quarter",
    tone: "brand" as const,
    title: "AI-powered needs assessment on every call",
    why: "2,140 calls/week drop at needs-discovery due to non-DM or budget mismatch · personalised illustration lifts conversion +22% in pilot",
    recommendation:
      "Deploy real-time co-pilot that reads financial goals, existing cover & family structure in first 90 seconds, auto-generates 3 tailored illustrations.",
    impact: "₹5.0 Cr opportunity · 45% win-back",
    winBack: "45%",
    owner: "CX Tech · with Contact-Center Ops",
    timeframe: "6–10 weeks",
  },
  {
    priority: "P1 · Next 60 days",
    tone: "warn" as const,
    title: "Competitive ULIP comparison sheets vs. ICICI Prudential",
    why: "ICICI Pru mentions up 9% · 41% cite fund performance · ULIP charge confusion = ₹7.45 Cr lost",
    recommendation:
      "Side-by-side comparator (returns, charges, fund options) auto-sent on WhatsApp after any ICICI Pru mention. Include 5-yr NAV track record for Opportunities Fund.",
    impact: "₹7.45 Cr protected · +3pp ULIP close rate",
    winBack: "45%",
    owner: "Marketing · with ULIP Product",
    timeframe: "30–45 days",
  },
  {
    priority: "P1 · Next 60 days",
    tone: "good" as const,
    title: "Raise medical-free threshold to ₹75L for under-40 salaried",
    why: "1,180 objections/mo · 62% win-back potential · largest recoverable category after underwriting",
    recommendation:
      "Underwriting review to lift non-medical limit, gated on salary-slip + credit score. Communicate as 'No medicals up to ₹75L' in outbound scripts.",
    impact: "₹9.6 Cr addressable · 62% win-back",
    winBack: "62%",
    owner: "Chief Underwriting Officer",
    timeframe: "45–60 days",
  },
  {
    priority: "P2 · Next quarter",
    tone: "ink" as const,
    title: '"Family Call-In" — pull the decision-maker into the same call',
    why: "1,960 objections/mo are 'need to consult family' · ₹5.8 Cr lost · 51% recoverable when both parties engaged same call",
    recommendation:
      "One-click conference to add spouse/parent via WhatsApp voice or 3-way PSTN, with consent capture. Train agents on joint-decision scripts.",
    impact: "₹5.8 Cr opportunity · 51% win-back",
    winBack: "51%",
    owner: "Contact-Center Ops · with Legal/Compliance",
    timeframe: "60–90 days",
  },
];

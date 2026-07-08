/**
 * Inventory · Sell-in / Sell-out Forecast (WENR) — shared types + mock data.
 * US retail lens: $ currency, US retailers (Walmart / Kroger / Costco / Target),
 * WENR forecast cycles, weeks-of-cover, cases/pallets. The deterministic engine
 * computes every figure; Helix AI only proposes and narrates.
 */

export type CampaignStatus = "Active" | "Completed" | "Draft";

export interface Campaign {
  id: string;
  /** Forecast-cycle name (Budget, Reforecast 1-3). */
  name: string;
  createdDate: string;
  forecastPeriod: string;
  status: CampaignStatus;
  /** US retailer names (rendered with ChannelIcon) or the string "all". */
  channels: string[] | "all";
}

export const CAMPAIGNS: Campaign[] = [
  {
    id: "budget",
    name: "Budget FY26",
    createdDate: "Jan 15, 2026",
    forecastPeriod: "52 weeks",
    status: "Active",
    channels: ["Walmart", "Kroger"],
  },
  {
    id: "reforecast-1",
    name: "Reforecast 1",
    createdDate: "Jan 10, 2026",
    forecastPeriod: "26 weeks",
    status: "Completed",
    channels: ["Walmart", "Target"],
  },
  {
    id: "reforecast-2",
    name: "Reforecast 2",
    createdDate: "Jan 5, 2026",
    forecastPeriod: "13 weeks",
    status: "Draft",
    channels: "all",
  },
  {
    id: "reforecast-3",
    name: "Reforecast 3",
    createdDate: "Dec 28, 2025",
    forecastPeriod: "26 weeks",
    status: "Completed",
    channels: ["Walmart", "Kroger", "Costco"],
  },
];

/** WENR cycle presets — weeks, not days. */
export const FORECAST_PERIODS = ["4 weeks", "13 weeks", "26 weeks", "52 weeks"];

/** US retailers for sell-in / replenishment selection. */
export const RETAILERS = ["All retailers", "Walmart", "Kroger", "Costco", "Target"];
export const DISTRIBUTION_CENTERS = [
  "All DCs",
  "DC-01 · Dallas",
  "DC-02 · Atlanta",
  "DC-03 · Chicago",
  "DC-04 · Fontana",
];

export type RiskLevel = "Low" | "Medium" | "High";

export interface ForecastRow {
  /** Item / UPC. */
  sku: string;
  periodQty: number;
  totalQty: number;
  totalValue: string;
  /** Weeks of cover vs target. */
  woc: string;
  risk: RiskLevel;
  insight: string;
}

export const FORECAST_ROWS: ForecastRow[] = [
  { sku: "UPC 0 41–213980", periodQty: 934, totalQty: 2800, totalValue: "$200,800", woc: "8.2 wk", risk: "Low", insight: "Peak demand" },
  { sku: "Smart Watch Series 5", periodQty: 600, totalQty: 1800, totalValue: "$100,800", woc: "5.4 wk", risk: "Medium", insight: "Trade-driven lift" },
  { sku: "Wireless Earbuds Pro", periodQty: 1210, totalQty: 3630, totalValue: "$284,400", woc: "9.1 wk", risk: "Low", insight: "Steady sell-out" },
  { sku: "4K Action Camera", periodQty: 340, totalQty: 1020, totalValue: "$142,900", woc: "3.1 wk", risk: "High", insight: "Below WOC target" },
  { sku: "Fitness Tracker Band", periodQty: 880, totalQty: 2640, totalValue: "$118,600", woc: "6.0 wk", risk: "Medium", insight: "Returns watch" },
];

export const FORECAST_TOTAL = { periodQty: 7302, totalQty: 21900, totalValue: "$2,100,900", woc: "6.9 wk" };

/** KPI cards on the forecast detail screen (CFO story: capital locked vs revenue protected). */
export const FORECAST_KPIS = [
  { label: "Inventory $", value: "$4.2M" },
  { label: "Cash locked", value: "$4.2M" },
  { label: "Weeks of cover (WOC)", value: "6.9 wk" },
  { label: "Stockout risk", value: "8%" },
  { label: "Revenue Cover", value: "$12M" },
];

/** Constraints bar — cases/pallets + per-DC lead time round the plan to shippable qtys. */
export const CONSTRAINTS = [
  { label: "Items (UPCs)", value: "1,248" },
  { label: "Forecast period", value: "Next 26 weeks" },
  { label: "Look-back", value: "Prior WENR cycle actuals" },
  { label: "Case pack", value: "12 / case" },
  { label: "Pallet", value: "48 cases" },
  { label: "Lead time (per DC)", value: "5–9 days" },
];

/** Select Target Items — filter labels (US retail lens). */
export const DEFAULT_FILTERS = [
  "Retailer",
  "SKUs",
  "Product ID",
  "ParentId",
  "Category / segment",
  "Item / UPC",
];

export interface ItemRow {
  sku: string;
  onHand: number; // On-hand (cases)
  ordered: number; // Ordered Qty (PO variant)
  pending: number; // Pending Qty (PO variant)
}

export const ITEM_ROWS: ItemRow[] = [
  { sku: "SKU213980", onHand: 1000, ordered: 1000, pending: 1000 },
  { sku: "Smart Watch Series 5", onHand: 2000, ordered: 2000, pending: 2000 },
  { sku: "Bluetooth Speaker X10", onHand: 3000, ordered: 3000, pending: 3000 },
  { sku: "USB-C Cable Premium", onHand: 2000, ordered: 2000, pending: 2000 },
  { sku: "Wireless Earbuds Pro", onHand: 3000, ordered: 3000, pending: 3000 },
  { sku: "4K Action Camera", onHand: 1200, ordered: 1200, pending: 900 },
  { sku: "Fitness Tracker Band", onHand: 2600, ordered: 2600, pending: 1800 },
];

export interface PoRow {
  id: string;
  retailer: string; // was "Manufacturer" in the India design
  date: string;
  value: string; // $ (was PO Value ₹)
  otif: string; // OTIF % (was Fill Rate)
}

export const PO_LIST: PoRow[] = [
  { id: "PO 10001", retailer: "Walmart", date: "Feb 1, 2026", value: "$565K", otif: "60%" },
  { id: "PO 10002", retailer: "Walmart", date: "Jan 20, 2026", value: "$355K", otif: "60%" },
  { id: "PO 10003", retailer: "Kroger", date: "Jan 25, 2026", value: "$732K", otif: "40%" },
  { id: "PO 10004", retailer: "Costco", date: "Jan 20, 2026", value: "$355K", otif: "60%" },
  { id: "PO 10005", retailer: "Target", date: "Jan 18, 2026", value: "$410K", otif: "72%" },
];

export interface Strategy {
  key: string;
  name: string;
  recommended?: boolean;
  inventory: string;
  cashImpact: string;
  wocChange: string;
  revenueProtected: string;
  summary: string;
}

export const STRATEGIES: Strategy[] = [
  {
    key: "conservative",
    name: "Conservative",
    inventory: "$3.4M",
    cashImpact: "-$0.3M",
    wocChange: "+0.2 wk",
    revenueProtected: "$9.6M",
    summary: "+$3.4M inventory → +0.2 wk WOC → $9.6M revenue protected",
  },
  {
    key: "balanced",
    name: "Balanced",
    recommended: true,
    inventory: "$3.8M",
    cashImpact: "-$0.4M",
    wocChange: "+0.4 wk",
    revenueProtected: "$10.8M",
    summary: "+$3.8M inventory → +0.4 wk WOC → $10.8M revenue protected",
  },
  {
    key: "aggressive",
    name: "Aggressive",
    inventory: "$4.6M",
    cashImpact: "-$0.6M",
    wocChange: "+0.8 wk",
    revenueProtected: "$12.4M",
    summary: "+$4.6M inventory → +0.8 wk WOC → $12.4M revenue protected",
  },
];

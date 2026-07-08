/**
 * Inventory · Demand Forecasting — shared types + USA-localized mock data.
 * Built from the Figma "forecast" design, localized to the US market
 * ($ currency, US channels, US seasonal names).
 */

export type CampaignStatus = "Active" | "Completed" | "Draft";

export interface Campaign {
  id: string;
  name: string;
  createdDate: string;
  forecastPeriod: string;
  status: CampaignStatus;
  /** Channel names (rendered with ChannelBadge) or the string "All Channels". */
  channels: string[] | "all";
}

export const CAMPAIGNS: Campaign[] = [
  {
    id: "bf-push",
    name: "Black Friday Push Campaign",
    createdDate: "Jan 15, 2026",
    forecastPeriod: "90 days",
    status: "Active",
    channels: ["Amazon", "Walmart"],
  },
  {
    id: "q1-2026",
    name: "Q1 2026 Forecast",
    createdDate: "Jan 10, 2026",
    forecastPeriod: "60 days",
    status: "Completed",
    channels: ["Amazon", "Target"],
  },
  {
    id: "q2-2026",
    name: "Q2 2026 Forecast",
    createdDate: "Jan 5, 2026",
    forecastPeriod: "120 days",
    status: "Draft",
    channels: "all",
  },
  {
    id: "summer",
    name: "Summer Inventory Planning",
    createdDate: "Dec 28, 2025",
    forecastPeriod: "90 days",
    status: "Completed",
    channels: ["Amazon", "Walmart", "eBay"],
  },
];

export const FORECAST_PERIODS = ["30 days", "60 days", "90 days", "120 days", "180 days"];

export type RiskLevel = "Low" | "Medium" | "High";

export interface ForecastRow {
  sku: string;
  monthQty: number;
  totalQty: number;
  totalValue: string;
  risk: RiskLevel;
  insight: string;
}

export const FORECAST_ROWS: ForecastRow[] = [
  { sku: "SKU213980", monthQty: 934, totalQty: 2800, totalValue: "$200,800", risk: "Low", insight: "Peak Demand" },
  { sku: "Smart Watch Series 5", monthQty: 600, totalQty: 1800, totalValue: "$100,800", risk: "Medium", insight: "Ad-driven lift" },
  { sku: "Wireless Earbuds Pro", monthQty: 1210, totalQty: 3630, totalValue: "$284,400", risk: "Low", insight: "Steady seller" },
  { sku: "4K Action Camera", monthQty: 340, totalQty: 1020, totalValue: "$142,900", risk: "High", insight: "Stockout risk" },
  { sku: "Fitness Tracker Band", monthQty: 880, totalQty: 2640, totalValue: "$118,600", risk: "Medium", insight: "Returns watch" },
];

export const FORECAST_TOTAL = { monthQty: 7302, totalQty: 21900, totalValue: "$2,100,900" };

/** KPI cards on the forecast detail screen. */
export const FORECAST_KPIS = [
  { label: "Inventory $", value: "$4.2M" },
  { label: "Cash locked", value: "$4.2M" },
  { label: "DIO", value: "48 days" },
  { label: "Stockout risk", value: "8%" },
  { label: "Revenue Cover", value: "$12M" },
];

export interface Strategy {
  key: string;
  name: string;
  recommended?: boolean;
  inventory: string;
  cashImpact: string;
  dioChange: string;
  revenueProtected: string;
  summary: string;
}

export const STRATEGIES: Strategy[] = [
  {
    key: "conservative",
    name: "Conservative",
    inventory: "$3.4M",
    cashImpact: "-$0.3M",
    dioChange: "+1 day",
    revenueProtected: "$9.6M",
    summary: "+$3.4M inventory → +1 day DIO → $9.6M revenue coverage",
  },
  {
    key: "balanced",
    name: "Balanced",
    recommended: true,
    inventory: "$3.8M",
    cashImpact: "-$0.4M",
    dioChange: "+2 days",
    revenueProtected: "$10.8M",
    summary: "+$3.8M inventory → +2 days DIO → $10.8M revenue coverage",
  },
  {
    key: "aggressive",
    name: "Aggressive",
    inventory: "$4.6M",
    cashImpact: "-$0.6M",
    dioChange: "+4 days",
    revenueProtected: "$12.4M",
    summary: "+$4.6M inventory → +4 days DIO → $12.4M revenue coverage",
  },
];

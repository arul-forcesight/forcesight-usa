import { useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  Filter,
  Pencil,
  BarChart3,
  Search,
  MoreVertical,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Campaign,
  RiskLevel,
  FORECAST_KPIS,
  FORECAST_ROWS,
  FORECAST_TOTAL,
  CONSTRAINTS,
} from "./data";

const riskStyles: Record<RiskLevel, string> = {
  Low: "bg-green-100 text-green-700 border-transparent",
  Medium: "bg-amber-100 text-amber-700 border-transparent",
  High: "bg-red-100 text-red-700 border-transparent",
};

export function ForecastDetail({
  campaign,
  onBack,
}: {
  campaign: Campaign | null;
  onBack: () => void;
}) {
  const [strategy, setStrategy] = useState<"push" | "balanced">("push");
  const [insightOpen, setInsightOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [constraintsOpen, setConstraintsOpen] = useState(false);

  // Edit Constraints form state (mock)
  const [forecastPeriod, setForecastPeriod] = useState("26");
  const [lookBack, setLookBack] = useState("Prior WENR cycle actuals");
  const [casePack, setCasePack] = useState("12 / case");
  const [pallet, setPallet] = useState("48 cases");
  const [leadTime, setLeadTime] = useState("5–9 days");
  const items = "1,248";

  const rows = FORECAST_ROWS.filter((r) =>
    r.sku.toLowerCase().includes(search.trim().toLowerCase()),
  );

  return (
    <div className="w-full space-y-4">
        {/* Back link */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="gap-1.5 -ml-2 text-gray-500 hover:text-[#0a335c]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to campaigns
        </Button>

        {/* Header row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Input
            defaultValue={campaign?.name ?? "Budget FY26"}
            className="w-full sm:w-[360px] h-11 font-semibold text-[#0a335c] focus-visible:ring-[#007fff]/40 focus-visible:border-[#007fff]"
          />
          <Button data-tour="approve" className="bg-[#007fff] hover:bg-[#0069d6] shrink-0">
            Approve Plan
          </Button>
        </div>

        {/* Strategy tabs row */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStrategy("push")}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
              strategy === "push"
                ? "border-[#007fff] bg-[#f5f9ff] text-[#0a335c] font-semibold"
                : "border-[#e6e8ea] text-gray-600 hover:border-gray-300"
            }`}
          >
            <Checkbox checked={strategy === "push"} className="pointer-events-none" />
            Budget
          </button>
          <button
            onClick={() => setStrategy("balanced")}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
              strategy === "balanced"
                ? "border-[#007fff] bg-[#f5f9ff] text-[#0a335c] font-semibold"
                : "border-[#e6e8ea] text-gray-600 hover:border-gray-300"
            }`}
          >
            <Checkbox checked={strategy === "balanced"} className="pointer-events-none" />
            Balanced Strategy: $3.8M
          </button>
          <button className="ml-auto text-gray-400 hover:text-gray-600 p-1.5 rounded-md hover:bg-gray-100">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {/* Constraints bar */}
        <div className="bg-[#f7f8fb] border border-[#e6e8ea] rounded-xl px-4 py-3 flex flex-wrap items-center gap-x-6 gap-y-2">
          {CONSTRAINTS.map((c) => (
            <span key={c.label} className="text-sm text-gray-500">
              {c.label}:{" "}
              <span className="font-semibold text-[#0a335c]">{c.value}</span>
            </span>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="ml-auto gap-1.5"
            onClick={() => setConstraintsOpen(true)}
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit Constraints
          </Button>
        </div>

        {/* Actions row */}
        <div className="flex flex-wrap items-center gap-2">
          <Button className="bg-[#007fff] hover:bg-[#0069d6] gap-1.5">
            Generate
            <ChevronDown className="w-4 h-4" />
          </Button>
          <Button variant="ghost" className="text-gray-600">
            Cancel
          </Button>
          <Button variant="ghost" className="text-gray-600">
            Reset All
          </Button>
        </div>

        {/* Helix AI Insight collapsible bar */}
        <button
          onClick={() => setInsightOpen((o) => !o)}
          className="w-full bg-[#f7f8fb] rounded-xl px-4 py-3 flex items-center gap-3 text-left"
        >
          <p className="flex-1 text-sm text-[#0a335c] min-w-0">
            <span className="font-semibold">Helix AI Insight:</span>{" "}
            {insightOpen ? (
              <span className="text-gray-600">
                Based on the prior WENR cycle and current trade / co-op plan, the engine protects
                $12M revenue with $4.2M cash locked while holding stockout risk at 8%.
              </span>
            ) : (
              <span className="text-gray-600">
                Based on the prior WENR cycle and current trade / co-op plan, the engine protec…
              </span>
            )}
          </p>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${
              insightOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* KPI cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
          {FORECAST_KPIS.map((k) => (
            <div
              key={k.label}
              className="bg-white border border-[#e6e8ea] rounded-xl px-4 py-3"
            >
              <p className="text-xs text-gray-400 mb-1">{k.label}</p>
              <p className="text-lg font-semibold text-[#0a335c]">{k.value}</p>
            </div>
          ))}
        </div>

        {/* Forecast Table card */}
        <div data-tour="forecast-table" className="bg-white border border-[#e6e8ea] rounded-2xl p-4 sm:p-5">
          <p className="text-[#0a335c] mb-4">
            <span className="font-semibold">Forecast Table:</span>{" "}
            <span className="text-gray-500">Engine generated</span>
          </p>

          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="relative w-full sm:w-56">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search SKU..."
                className="pl-9 h-9"
              />
            </div>
            <button className="h-9 w-9 flex items-center justify-center rounded-md border border-[#e6e8ea] text-gray-500 hover:bg-gray-50">
              <Filter className="w-4 h-4" />
            </button>
            <button className="h-9 flex items-center gap-1.5 rounded-md border border-[#e6e8ea] px-3 text-sm text-gray-600 hover:bg-gray-50">
              Month
              <ChevronDown className="w-4 h-4" />
            </button>
            <Button variant="ghost" size="sm" className="gap-1.5 text-gray-600">
              <Pencil className="w-3.5 h-3.5" />
              Customize
            </Button>
            <Button variant="outline" size="sm" className="ml-auto gap-1.5">
              <BarChart3 className="w-4 h-4" />
              Insights
            </Button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-y border-[#eef1f4] text-left">
                  {[
                    "Item / UPC",
                    "Wk 1–13",
                    "Total Qty",
                    "Total Value",
                    "Weeks of cover",
                    "Risk Level",
                    "Ai Insights",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-[11px] font-semibold tracking-wide uppercase text-gray-400 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr
                    key={r.sku}
                    className="border-b border-[#f1f4f7] hover:bg-gray-50/60 transition-colors"
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="font-semibold text-[#0a335c]">{r.sku}</span>
                    </td>
                    <td className="px-4 py-4 text-sm text-right text-[#0a335c] whitespace-nowrap">
                      {r.periodQty.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 text-sm text-[#007fff] font-medium whitespace-nowrap">
                      {r.totalQty.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 text-sm text-[#0a335c] whitespace-nowrap">
                      {r.totalValue}
                    </td>
                    <td className="px-4 py-4 text-sm text-[#0a335c] whitespace-nowrap">
                      {r.woc}
                    </td>
                    <td className="px-4 py-4">
                      <Badge className={riskStyles[r.risk]}>{r.risk}</Badge>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
                      {r.insight}
                    </td>
                  </tr>
                ))}

                {/* Total row */}
                <tr className="border-t border-[#e6e8ea] bg-[#f7f8fb]">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="font-semibold text-[#0a335c]">Total</span>
                  </td>
                  <td className="px-4 py-4 text-sm text-right font-semibold text-[#0a335c] whitespace-nowrap">
                    {FORECAST_TOTAL.periodQty.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 text-sm font-semibold text-[#007fff] whitespace-nowrap">
                    {FORECAST_TOTAL.totalQty.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 text-sm font-semibold text-[#0a335c] whitespace-nowrap">
                    {FORECAST_TOTAL.totalValue}
                  </td>
                  <td className="px-4 py-4 text-sm font-semibold text-[#0a335c] whitespace-nowrap">
                    {FORECAST_TOTAL.woc}
                  </td>
                  <td className="px-4 py-4" />
                  <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
                    Ai Insights
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Constraints modal */}
        <Dialog open={constraintsOpen} onOpenChange={setConstraintsOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Constraints</DialogTitle>
            </DialogHeader>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Items (UPCs) */}
              <div className="space-y-1.5">
                <Label htmlFor="constraint-items">Items (UPCs)</Label>
                <Input
                  id="constraint-items"
                  value={items}
                  readOnly
                  className="bg-[#f7f8fb] text-gray-500"
                />
              </div>

              {/* Forecast period */}
              <div className="space-y-1.5">
                <Label htmlFor="constraint-period">Forecast period</Label>
                <Select value={forecastPeriod} onValueChange={setForecastPeriod}>
                  <SelectTrigger id="constraint-period">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="13">Next 13 weeks</SelectItem>
                    <SelectItem value="26">Next 26 weeks</SelectItem>
                    <SelectItem value="52">Next 52 weeks</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Look-back */}
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="constraint-lookback">Look-back</Label>
                <Select value={lookBack} onValueChange={setLookBack}>
                  <SelectTrigger id="constraint-lookback">
                    <SelectValue placeholder="Select look-back" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Prior WENR cycle actuals">
                      Prior WENR cycle actuals
                    </SelectItem>
                    <SelectItem value="Last 26 weeks of last year">
                      Last 26 weeks of last year
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Case pack */}
              <div className="space-y-1.5">
                <Label htmlFor="constraint-casepack">Case pack</Label>
                <Input
                  id="constraint-casepack"
                  value={casePack}
                  onChange={(e) => setCasePack(e.target.value)}
                />
              </div>

              {/* Pallet */}
              <div className="space-y-1.5">
                <Label htmlFor="constraint-pallet">Pallet</Label>
                <Input
                  id="constraint-pallet"
                  value={pallet}
                  onChange={(e) => setPallet(e.target.value)}
                />
              </div>

              {/* Lead time (per DC) */}
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="constraint-leadtime">Lead time (per DC)</Label>
                <Input
                  id="constraint-leadtime"
                  value={leadTime}
                  onChange={(e) => setLeadTime(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="ghost"
                className="text-gray-600"
                onClick={() => setConstraintsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-[#007fff] hover:bg-[#0069d6]"
                onClick={() => setConstraintsOpen(false)}
              >
                Save constraints
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    </div>
  );
}

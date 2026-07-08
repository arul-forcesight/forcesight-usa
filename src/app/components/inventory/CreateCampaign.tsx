import { useState } from "react";
import {
  Calendar,
  Database,
  TrendingUp,
  ChevronRight,
  Target,
  Sparkles,
  Pencil,
  ArrowRight,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { HelixPanel } from "./HelixPanel";
import { FORECAST_PERIODS } from "./data";

/**
 * Inventory · Demand Forecasting — "Create New Campaign" wizard (Setup step).
 * USA market only ($ currency, US seasonal names). Content area only —
 * the app already provides the sidebar and top bar.
 */
export function CreateCampaign({
  onCancel,
  onBack,
  onNext,
}: {
  onCancel: () => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const [campaignName, setCampaignName] = useState("Campaign 1");
  const [forecastPeriod, setForecastPeriod] = useState("90 days");
  const [target, setTarget] = useState("direct");

  return (
    <div className="flex flex-col xl:flex-row gap-6 items-start">
      {/* Main wizard card */}
      <div className="flex-1 min-w-0 w-full bg-white border border-[#e6e8ea] rounded-2xl overflow-hidden">
        {/* Wizard step tabs */}
        <div className="flex items-center gap-2 flex-wrap p-4 border-b border-[#eef1f4]">
          <div className="flex items-center gap-2 rounded-lg px-3 py-2 bg-[#e0f0ff] text-[#007fff]">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">Setup</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
          <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground">
            <Database className="w-4 h-4" />
            <span className="text-sm">Reference Data</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
          <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">Adjustments</span>
          </div>
        </div>

        {/* Setup content */}
        <div className="space-y-8 p-6">
          {/* Step 1 — Campaign name */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#007fff]" />
              <h3 className="font-semibold text-[#0a335c]">
                Step 1: Enter Campaign Name
              </h3>
            </div>
            <p className="text-sm text-muted-foreground">
              On creating the restock plan you can choose this forecast by
              selecting this name
            </p>
            <Input
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              className="max-w-[420px]"
            />
          </div>

          {/* Step 2 — Forecast period */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#007fff]" />
              <h3 className="font-semibold text-[#0a335c]">
                Step 2: Forecast Period
              </h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Select the time horizon for your demand forecast. This determines
              how far into the future you want to predict sales and inventory
              needs.
            </p>
            <Select value={forecastPeriod} onValueChange={setForecastPeriod}>
              <SelectTrigger className="max-w-[420px]">
                <SelectValue placeholder="Select forecast period" />
              </SelectTrigger>
              <SelectContent>
                {FORECAST_PERIODS.map((period) => (
                  <SelectItem key={period} value={period}>
                    {period}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Step 3 — Target selection */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-[#007fff]" />
                <h3 className="font-semibold text-[#0a335c]">
                  Step 3: Target Selection
                </h3>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  These are the items that are going to get the forecast for the
                  selected period:{" "}
                  <span className="text-[#0a335c] font-medium">12,345 Items</span>
                </p>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#007fff] bg-[#e0f0ff] px-3 py-1.5 text-xs font-medium text-[#007fff] hover:bg-[#d0e8ff] transition-colors shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Use Helix ai prompts to choose inventory
                </button>
              </div>
            </div>

            <RadioGroup
              value={target}
              onValueChange={setTarget}
              className="flex flex-wrap items-center gap-6"
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <RadioGroupItem value="direct" id="target-direct" />
                <span className="text-sm text-[#0a335c]">
                  Select Items Directly
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <RadioGroupItem value="b2b" id="target-b2b" />
                <span className="text-sm text-[#0a335c]">
                  Select from B2B PO
                </span>
              </label>
            </RadioGroup>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-[#007fff]">
                Total Selection
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#f2f4f6] px-3 py-1.5 text-sm font-medium text-[#0a335c]">
                Based On Black Friday Push 2025: 1828 Items Selected
                <Pencil className="w-3.5 h-3.5 text-[#007fff]" />
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-4 border-t border-[#eef1f4] p-4">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onBack}
              className="text-sm font-medium text-[#007fff] hover:text-[#0069d6] transition-colors"
            >
              Back To The Campaigns Table
            </button>
            <Button
              onClick={onNext}
              className="bg-[#007fff] hover:bg-[#0069d6] text-white gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Helix AI side panel */}
      <HelixPanel
        mode="simple"
        className="hidden xl:flex w-[340px] shrink-0 h-[560px]"
      />
    </div>
  );
}

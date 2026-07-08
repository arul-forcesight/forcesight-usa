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
  CheckCircle2,
  DollarSign,
  Tag,
  Zap,
  X,
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
import { Switch } from "../ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";
import {
  FORECAST_PERIODS,
  RETAILERS,
  DISTRIBUTION_CENTERS,
} from "./data";

type Tab = "setup" | "reference" | "adjustments";

const TAB_ORDER: Tab[] = ["setup", "reference", "adjustments"];

/** Look-back presets for reference data (weeks-based, US market). */
const LOOK_BACK_OPTIONS = [
  "Prior WENR cycle actuals",
  "Last 26 weeks of last year",
  "Last 52 weeks",
];

/** US demand events shown as toggle chips in the Adjustments tab. */
const US_EVENTS = [
  "Back-to-School",
  "Thanksgiving",
  "Prime Day",
  "WIC cycle changes",
];

/**
 * Inventory · Demand Forecasting — "Create New Campaign" wizard.
 * Three functional tabs (Setup / Reference Data / Adjustments) plus a
 * Weighted Average Modeling modal. USA market only ($ currency, US seasonal
 * names). Content area only — the app already provides the sidebar and top
 * bar. The deterministic engine drives every figure; Helix AI only proposes.
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
  const [tab, setTab] = useState<Tab>("setup");

  // Setup state
  const [campaignName, setCampaignName] = useState("Reforecast 4");
  const [forecastPeriod, setForecastPeriod] = useState("13 weeks");
  const [target, setTarget] = useState("direct");
  const [retailer, setRetailer] = useState("All retailers");
  const [distributionCenter, setDistributionCenter] = useState("All DCs");

  // Reference Data state
  const [changeReference, setChangeReference] = useState(false);
  const [lookBack, setLookBack] = useState(LOOK_BACK_OPTIONS[0]);

  // Weighted Average Modeling modal
  const [wamOpen, setWamOpen] = useState(false);
  const [weights, setWeights] = useState<number[]>([
    13, 12, 13, 12, 13, 12, 13, 12,
  ]);
  const totalWeight = weights.reduce((sum, w) => sum + (w || 0), 0);
  const maxWeight = Math.max(...weights, 1);
  const isBalanced = totalWeight === 100;

  const setWeightAt = (index: number, raw: string) => {
    const value = Number(raw);
    setWeights((prev) =>
      prev.map((w, i) => (i === index ? (Number.isNaN(value) ? 0 : value) : w)),
    );
  };

  // Adjustments state
  const [spendValue, setSpendValue] = useState("$25,000");
  const [impactDirection, setImpactDirection] = useState("Increase");
  const [impactAmount, setImpactAmount] = useState("2");
  const [impactUnit, setImpactUnit] = useState("%");
  const [activeEvents, setActiveEvents] = useState<string[]>([]);

  const toggleEvent = (name: string) =>
    setActiveEvents((prev) =>
      prev.includes(name) ? prev.filter((e) => e !== name) : [...prev, name],
    );

  const currentIndex = TAB_ORDER.indexOf(tab);

  const handleNext = () => {
    if (tab === "adjustments") {
      onNext();
      return;
    }
    setTab(TAB_ORDER[currentIndex + 1]);
  };

  const handleBack = () => {
    if (tab === "setup") {
      onBack();
      return;
    }
    setTab(TAB_ORDER[currentIndex - 1]);
  };

  /** Renders a single wizard step pill. */
  const StepPill = ({
    value,
    icon: Icon,
    label,
  }: {
    value: Tab;
    icon: typeof Calendar;
    label: string;
  }) => {
    const index = TAB_ORDER.indexOf(value);
    const isActive = tab === value;
    const isComplete = index < currentIndex;
    return (
      <button
        type="button"
        onClick={() => setTab(value)}
        className={
          "flex items-center gap-2 rounded-lg px-3 py-2 transition-colors " +
          (isActive
            ? "bg-[#e0f0ff] text-[#007fff]"
            : isComplete
              ? "bg-[#e6f7ee] text-[#1f9d55] hover:bg-[#d7f2e3]"
              : "text-muted-foreground hover:bg-[#f2f4f6]")
        }
      >
        {isComplete ? (
          <CheckCircle2 className="w-4 h-4" />
        ) : (
          <Icon className="w-4 h-4" />
        )}
        <span
          className={"text-sm " + (isActive || isComplete ? "font-medium" : "")}
        >
          {label}
        </span>
      </button>
    );
  };

  return (
    <div className="w-full">
      {/* Main wizard card */}
      <div className="w-full bg-white border border-[#e6e8ea] rounded-2xl overflow-hidden">
        {/* Wizard step tabs */}
        <div className="flex items-center gap-2 flex-wrap p-4 border-b border-[#eef1f4]">
          <StepPill value="setup" icon={Calendar} label="Setup" />
          <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
          <StepPill value="reference" icon={Database} label="Reference Data" />
          <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
          <StepPill
            value="adjustments"
            icon={TrendingUp}
            label="Adjustments"
          />
        </div>

        {/* SETUP tab */}
        {tab === "setup" && (
          <div className="space-y-8 p-6">
            {/* Step 1 — Campaign name */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#007fff]" />
                <h3 className="font-semibold text-[#0a335c]">
                  Step 1: Name this forecast cycle
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                You can pick this cycle name later on the replenishment plan to
                apply this forecast.
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
                Select the time horizon for your demand forecast. This
                determines how far into the future you want to predict sales and
                inventory needs.
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
                    These are the items that are going to get the forecast for
                    the selected period:{" "}
                    <span className="text-[#0a335c] font-medium">
                      12,345 Items
                    </span>
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
                    Select from replenishment orders
                  </span>
                </label>
              </RadioGroup>

              {/* Retailer + distribution center scope */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:max-w-[860px]">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-[#0a335c]">
                    Retailer
                  </label>
                  <Select value={retailer} onValueChange={setRetailer}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select retailer" />
                    </SelectTrigger>
                    <SelectContent>
                      {RETAILERS.map((r) => (
                        <SelectItem key={r} value={r}>
                          {r}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-[#0a335c]">
                    Distribution center
                  </label>
                  <Select
                    value={distributionCenter}
                    onValueChange={setDistributionCenter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select distribution center" />
                    </SelectTrigger>
                    <SelectContent>
                      {DISTRIBUTION_CENTERS.map((dc) => (
                        <SelectItem key={dc} value={dc}>
                          {dc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium text-[#007fff]">
                  Total Selection
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#f2f4f6] px-3 py-1.5 text-sm font-medium text-[#0a335c]">
                  Based On Budget FY25: 1,828 Items Selected
                  <Pencil className="w-3.5 h-3.5 text-[#007fff]" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* REFERENCE DATA tab */}
        {tab === "reference" && (
          <div className="space-y-8 p-6 min-h-[360px]">
            {/* Step 4 — Reference source */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-[#007fff]" />
                <h3 className="font-semibold text-[#0a335c]">
                  Step 4: Do you want to change the source for reference data?
                </h3>
              </div>
              <p className="text-sm text-muted-foreground max-w-3xl">
                Reference data is used to build your forecast baseline. By
                default, we&apos;ll use the same channels/categories as your
                target. You can choose different data sources (e.g., use Fashion
                data to forecast Electronics).
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="text-sm font-medium text-[#0a335c]">
                  Currently we use the Target Items: Do you want to change the
                  Reference Source:
                </span>
                <Switch
                  checked={changeReference}
                  onCheckedChange={setChangeReference}
                />
              </div>
            </div>

            {/* Step 5 — Look-back period */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#007fff]" />
                <h3 className="font-semibold text-[#0a335c]">
                  Step 5: Look-back Period
                </h3>
              </div>
              <p className="text-sm text-muted-foreground max-w-3xl">
                Select which historical time period to analyze. This data will
                be used to identify patterns and build your forecast model.
              </p>
              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
                <Select value={lookBack} onValueChange={setLookBack}>
                  <SelectTrigger className="max-w-[420px]">
                    <SelectValue placeholder="Select look-back period" />
                  </SelectTrigger>
                  <SelectContent>
                    {LOOK_BACK_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <button
                  type="button"
                  onClick={() => setWamOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#007fff] bg-[#e0f0ff] px-3 py-2 text-sm font-medium text-[#007fff] hover:bg-[#d0e8ff] transition-colors shrink-0"
                >
                  <Sparkles className="w-4 h-4" />
                  Weighted Average Modeling
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ADJUSTMENTS tab */}
        {tab === "adjustments" && (
          <div className="space-y-6 p-6 min-h-[360px]">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#007fff]" />
                <h3 className="font-semibold text-[#0a335c]">
                  Configure Adjustments
                </h3>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#007fff] bg-[#e0f0ff] px-3 py-1.5 text-xs font-medium text-[#007fff] hover:bg-[#d0e8ff] transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Auto Generate Adjustments With Helix AI
                </button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Fine-tune your forecast by adding adjustments for ad spend,
              events, pricing changes, and custom factors like seasonality or
              market trends.
            </p>

            <Accordion
              type="single"
              collapsible
              defaultValue="ads"
              className="rounded-xl border border-[#e6e8ea] divide-y divide-[#eef1f4]"
            >
              {/* Ads Adjustments */}
              <AccordionItem value="ads" className="px-4">
                <AccordionTrigger className="hover:no-underline">
                  <span className="flex items-center gap-2 text-[#0a335c]">
                    <DollarSign className="w-4 h-4 text-[#007fff]" />
                    Ads Adjustments
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Trade / co-op spend — enter your planned trade budget and
                      the expected lift in sales. This is factored into the
                      demand forecast.
                    </p>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#007fff] bg-[#e0f0ff] px-3 py-1.5 text-xs font-medium text-[#007fff] hover:bg-[#d0e8ff] transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      AI Suggestion of Ads Adjustments here
                    </button>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-[#0a335c]">
                          Spend Value
                        </label>
                        <Input
                          value={spendValue}
                          onChange={(e) => setSpendValue(e.target.value)}
                          className="w-[160px]"
                        />
                      </div>
                      <div className="hidden h-10 w-px self-end bg-[#eef1f4] sm:block" />
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-[#0a335c]">
                          Impact Factor
                        </label>
                        <div className="flex items-center gap-2">
                          <Select
                            value={impactDirection}
                            onValueChange={setImpactDirection}
                          >
                            <SelectTrigger className="w-[130px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Increase">Increase</SelectItem>
                              <SelectItem value="Decrease">Decrease</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input
                            value={impactAmount}
                            onChange={(e) => setImpactAmount(e.target.value)}
                            className="w-[72px]"
                          />
                          <Select
                            value={impactUnit}
                            onValueChange={setImpactUnit}
                          >
                            <SelectTrigger className="w-[80px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="%">%</SelectItem>
                              <SelectItem value="units">units</SelectItem>
                            </SelectContent>
                          </Select>
                          <button
                            type="button"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#e0f0ff] text-[#007fff] hover:bg-[#d0e8ff] transition-colors"
                            aria-label="AI suggestion"
                          >
                            <Sparkles className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            className="inline-flex h-9 items-center justify-center rounded-md bg-[#f2f4f6] px-2 text-[#0a335c] hover:bg-[#e6e8ea] transition-colors"
                            aria-label="More options"
                          >
                            &middot;&middot;&middot;
                          </button>
                          <button
                            type="button"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-[#f2f4f6] transition-colors"
                            aria-label="Remove adjustment"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Events & Seasonality */}
              <AccordionItem value="events" className="px-4">
                <AccordionTrigger className="hover:no-underline">
                  <span className="flex items-center gap-2 text-[#0a335c]">
                    <Zap className="w-4 h-4 text-[#007fff]" />
                    Events &amp; Seasonality
                    <Sparkles className="w-3.5 h-3.5 text-[#007fff]" />
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Turn on the US demand events that apply to this forecast
                      cycle.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {US_EVENTS.map((event) => {
                        const on = activeEvents.includes(event);
                        return (
                          <button
                            key={event}
                            type="button"
                            onClick={() => toggleEvent(event)}
                            className={
                              "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors " +
                              (on
                                ? "border-[#007fff] bg-[#e0f0ff] text-[#007fff]"
                                : "border-[#e6e8ea] bg-white text-[#0a335c] hover:bg-[#f2f4f6]")
                            }
                          >
                            {event}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Pricing */}
              <AccordionItem value="pricing" className="px-4">
                <AccordionTrigger className="hover:no-underline">
                  <span className="flex items-center gap-2 text-[#0a335c]">
                    <Tag className="w-4 h-4 text-[#007fff]" />
                    Pricing
                    <Sparkles className="w-3.5 h-3.5 text-[#007fff]" />
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-wrap items-end gap-3">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-[#0a335c]">
                        Price change
                      </label>
                      <div className="flex items-center gap-2">
                        <Input defaultValue="-5" className="w-[80px]" />
                        <span className="text-sm text-muted-foreground">
                          % vs current shelf price
                        </span>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Custom */}
              <AccordionItem value="custom" className="px-4">
                <AccordionTrigger className="hover:no-underline">
                  <span className="flex items-center gap-2 text-[#0a335c]">
                    <Pencil className="w-4 h-4 text-[#007fff]" />
                    Custom
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[#0a335c]">
                      Custom factor
                    </label>
                    <Input
                      placeholder="Describe a custom adjustment (e.g. new store openings)"
                      className="max-w-[420px]"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between gap-4 border-t border-[#eef1f4] p-4">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <div className="flex flex-wrap items-center justify-end gap-4">
            {tab === "setup" ? (
              <button
                type="button"
                onClick={onBack}
                className="text-sm font-medium text-[#007fff] hover:text-[#0069d6] transition-colors"
              >
                Back To The Campaigns Table
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={onNext}
                  className="text-sm font-medium text-[#007fff] hover:text-[#0069d6] transition-colors"
                >
                  Skip and Generate Forecast
                </button>
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
              </>
            )}
            <Button
              onClick={handleNext}
              className="bg-[#007fff] hover:bg-[#0069d6] text-white gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Weighted Average Modeling modal */}
      <Dialog open={wamOpen} onOpenChange={setWamOpen}>
        <DialogContent className="max-w-3xl sm:max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Weighted Average Modeling</DialogTitle>
            <p className="text-sm text-muted-foreground">
              Look-back period: 26 weeks
            </p>
          </DialogHeader>

          {/* Controls row */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[#0a335c]">
                View by:
              </span>
              <Select defaultValue="Weeks">
                <SelectTrigger className="w-[130px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Weeks">Weeks</SelectItem>
                  <SelectItem value="Months">Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 self-start rounded-full border border-[#007fff] bg-[#e0f0ff] px-3 py-1.5 text-xs font-medium text-[#007fff] hover:bg-[#d0e8ff] transition-colors sm:self-auto"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Auto Generate Adjustments With Helix AI
            </button>
          </div>

          {/* Instruction box */}
          <div className="rounded-lg border border-[#e6e8ea] bg-[#f8fafc] px-4 py-3">
            <p className="text-sm text-[#0a335c]">
              Adjust the weight percentage for each period. The total must equal
              100%.
            </p>
          </div>

          {/* Periods grid */}
          <div className="overflow-x-auto rounded-lg border border-[#e6e8ea]">
            <div className="min-w-[720px]">
              {/* Header row */}
              <div className="flex border-b border-[#eef1f4] bg-[#f8fafc]">
                <div className="w-24 shrink-0 px-3 py-2 text-xs font-medium text-muted-foreground">
                  Period
                </div>
                {weights.map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 px-2 py-2 text-center text-sm font-medium text-[#0a335c]"
                  >
                    {i + 1}
                  </div>
                ))}
              </div>

              {/* Weight (%) row */}
              <div className="flex border-b border-[#eef1f4]">
                <div className="w-24 shrink-0 px-3 py-3 text-xs font-medium text-muted-foreground">
                  Weight (%)
                </div>
                {weights.map((w, i) => (
                  <div key={i} className="flex-1 px-2 py-3 text-center">
                    <Input
                      type="number"
                      value={String(w)}
                      onChange={(e) => setWeightAt(i, e.target.value)}
                      className="mx-auto h-9 w-16 text-center"
                    />
                  </div>
                ))}
              </div>

              {/* Visual row */}
              <div className="flex">
                <div className="w-24 shrink-0 px-3 py-3 text-xs font-medium text-muted-foreground">
                  Visual
                </div>
                {weights.map((w, i) => (
                  <div
                    key={i}
                    className="flex flex-1 flex-col items-center justify-end px-2 py-3"
                  >
                    <div className="flex h-20 w-full items-end justify-center">
                      <div
                        className="w-8 rounded-t bg-[#e0f0ff]"
                        style={{
                          height: `${Math.max((w / maxWeight) * 100, 4)}%`,
                        }}
                      />
                    </div>
                    <div className="mt-1 h-0.5 w-8 rounded bg-[#007fff]" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Total footer bar */}
          <div
            className={
              "flex items-center justify-between rounded-lg border px-4 py-3 " +
              (isBalanced
                ? "border-[#c3ead2] bg-[#e6f7ee]"
                : "border-[#f4d6c3] bg-[#fdf1ea]")
            }
          >
            <span className="text-sm font-medium text-[#0a335c]">
              Total Weight
            </span>
            <span className="flex items-center gap-2">
              <span
                className={
                  "text-sm font-semibold " +
                  (isBalanced ? "text-[#1f9d55]" : "text-[#d97236]")
                }
              >
                {totalWeight}%
              </span>
              {isBalanced && (
                <CheckCircle2 className="w-5 h-5 text-[#1f9d55]" />
              )}
            </span>
          </div>

          {/* Caption + footer actions */}
          <p className="text-xs text-muted-foreground">
            Deterministic engine method — the weights drive the math.
          </p>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button variant="ghost" onClick={() => setWamOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => setWamOpen(false)}
              className="bg-[#007fff] hover:bg-[#0069d6] text-white"
            >
              Apply Weights
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

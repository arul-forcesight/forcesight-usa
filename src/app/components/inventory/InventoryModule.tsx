import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { CampaignsList } from "./CampaignsList";
import { CreateCampaign } from "./CreateCampaign";
import { ForecastDetail } from "./ForecastDetail";
import { HelixPanel } from "./HelixPanel";
import { InventoryTour, TourStep } from "./InventoryTour";
import { Campaign } from "./data";

type View = "list" | "create" | "detail";

/** Guided-tour steps — one simple line each, walking the whole flow. */
const TOUR: (TourStep & { view: View })[] = [
  { view: "list", target: "new-cycle", title: "Start here", body: "Create a new forecast cycle." },
  { view: "list", target: "cycles-table", title: "Your cycles", body: "Every forecast cycle lives in this table." },
  { view: "create", target: "wizard-tabs", title: "Three steps", body: "Setup, then reference data, then adjustments." },
  { view: "create", target: "target", title: "Pick items", body: "Choose the items to forecast — filter to narrow down." },
  { view: "detail", target: "forecast-table", title: "The forecast", body: "Review what the engine generated." },
  { view: "detail", target: "approve", title: "Approve", body: "Approve the plan when it looks right." },
  { view: "list", target: "ask-ai", title: "Ask AI", body: "Ask about any scenario, anytime." },
];

/**
 * Inventory · Sell-in / Sell-out Forecast (WENR) module.
 * Renders inside the app's existing content area (sidebar + header stay as-is).
 *
 * FULL-PAGE flow (matches the Figma): campaigns list → create wizard → forecast
 * detail. The real popups live INSIDE these pages (Select Target Items, Select
 * PO, Weighted Average Modeling, Edit Constraints).
 *
 * Browser Back walks the pushed history entries (detail → create → list) instead
 * of leaving the app.  One Helix AI panel, toggled by the header button.
 */
export function InventoryModule({
  aiOpen,
  onCloseAI,
}: {
  aiOpen: boolean;
  onCloseAI: () => void;
}) {
  const [view, setView] = useState<View>("list");
  const [active, setActive] = useState<Campaign | null>(null);
  const [tourStep, setTourStep] = useState<number | null>(null);

  // While the tour runs, drive the page to each step's view.
  useEffect(() => {
    if (tourStep !== null) setView(TOUR[tourStep].view);
  }, [tourStep]);

  useEffect(() => {
    window.history.replaceState({ inv: "list" }, "");
    const onPop = (e: PopStateEvent) =>
      setView((e.state && (e.state as { inv?: View }).inv) || "list");
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = (v: View, c?: Campaign | null) => {
    if (c !== undefined) setActive(c);
    window.history.pushState({ inv: v }, "");
    setView(v);
  };

  return (
    <div className="relative min-h-full pb-24">
      <div className={aiOpen ? "lg:pr-[420px]" : ""}>
        {view === "list" && (
          <CampaignsList
            onCreate={() => navigate("create")}
            onOpen={(c) => navigate("detail", c)}
            onStartTour={() => setTourStep(0)}
          />
        )}

        {view === "create" && (
          <CreateCampaign
            onCancel={() => navigate("list")}
            onBack={() => navigate("list")}
            onNext={() => navigate("detail")}
          />
        )}

        {view === "detail" && (
          <ForecastDetail campaign={active} onBack={() => navigate("list")} />
        )}
      </div>

      {/* Single Helix AI panel — toggled by the header "Ask Helix AI" button */}
      {aiOpen && (
        <div className="hidden lg:block fixed right-6 top-[88px] bottom-6 w-[400px] z-50">
          <HelixPanel
            mode={view === "detail" ? "strategies" : "simple"}
            onClose={onCloseAI}
            className="h-full w-full"
          />
        </div>
      )}

      {/* Persistent Ask AI bar — pinned to the bottom of the viewport (inventory only) */}
      <div
        className={`fixed bottom-6 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none ${
          aiOpen ? "lg:pr-[440px]" : ""
        }`}
      >
        <div
          data-tour="ask-ai"
          className="pointer-events-auto flex items-center gap-3 w-full max-w-[620px] bg-gradient-to-r from-[#1f8bff] to-[#0069d6] text-white rounded-full pl-5 pr-2 py-2 shadow-lg shadow-blue-500/25"
        >
          <input
            className="flex-1 bg-transparent placeholder-white/80 text-sm text-white outline-none"
            placeholder={`Ask AI... "What if demand drops 20%?" or "Explain this scenario"`}
          />
          <button className="w-9 h-9 rounded-full bg-white/25 hover:bg-white/35 flex items-center justify-center transition-colors">
            <ArrowUp className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Guided tour */}
      {tourStep !== null && (
        <InventoryTour
          steps={TOUR}
          index={tourStep}
          onNext={() => setTourStep((s) => (s === null ? null : Math.min(s + 1, TOUR.length - 1)))}
          onBack={() => setTourStep((s) => (s === null ? null : Math.max(s - 1, 0)))}
          onClose={() => setTourStep(null)}
        />
      )}
    </div>
  );
}

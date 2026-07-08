import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { CampaignsList } from "./CampaignsList";
import { CreateCampaign } from "./CreateCampaign";
import { ForecastDetail } from "./ForecastDetail";
import { HelixPanel } from "./HelixPanel";
import { Campaign } from "./data";

type View = "list" | "create" | "detail";

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

      {/* Persistent Ask AI bar */}
      <div className="sticky bottom-4 z-30 mt-6 flex justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-3 w-full max-w-[620px] bg-gradient-to-r from-[#1f8bff] to-[#0069d6] text-white rounded-full pl-5 pr-2 py-2 shadow-lg shadow-blue-500/25">
          <input
            className="flex-1 bg-transparent placeholder-white/80 text-sm text-white outline-none"
            placeholder={`Ask AI... "What if demand drops 20%?" or "Explain this scenario"`}
          />
          <button className="w-9 h-9 rounded-full bg-white/25 hover:bg-white/35 flex items-center justify-center transition-colors">
            <ArrowUp className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
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
 * The create wizard and the forecast detail open as MODAL POPUPS over the
 * campaigns list (each with the Helix AI panel inside, matching the Figma).
 * Browser Back closes the open popup and returns to the list instead of
 * leaving the app — every popup push()es a history entry.
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

  // Browser Back closes whatever popup is open (returns to the list), keeping
  // the user inside the app rather than navigating away.
  useEffect(() => {
    const onPop = () => setView("list");
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const openView = (v: Exclude<View, "list">, c?: Campaign | null) => {
    if (c !== undefined) setActive(c);
    // One history entry per popup session: push when opening from the list,
    // replace when moving popup→popup (e.g. create → detail).
    if (view === "list") window.history.pushState({ inv: v }, "");
    else window.history.replaceState({ inv: v }, "");
    setView(v);
  };

  // Close a popup the "app" way — consume the history entry so Back stays in sync.
  const closeToList = () => {
    if (view !== "list") window.history.back();
    else setView("list");
  };

  return (
    <div className="relative min-h-full pb-24">
      {/* Base screen — always mounted */}
      <CampaignsList
        onCreate={() => openView("create")}
        onOpen={(c) => openView("detail", c)}
      />

      {/* Create wizard — popup */}
      <Dialog open={view === "create"} onOpenChange={(o) => !o && closeToList()}>
        <DialogContent className="p-0 gap-0 w-[95vw] sm:max-w-[1080px] h-[90vh] max-h-[880px] overflow-hidden">
          <DialogTitle className="sr-only">Create forecast cycle</DialogTitle>
          <div className="flex h-full overflow-hidden">
            <div className="flex-1 min-w-0 overflow-y-auto p-5 sm:p-6">
              <CreateCampaign
                onCancel={closeToList}
                onBack={closeToList}
                onNext={() => openView("detail")}
              />
            </div>
            <div className="hidden lg:block w-[340px] shrink-0 border-l border-[#eef1f4] overflow-hidden">
              <HelixPanel mode="simple" className="h-full w-full border-0 rounded-none" />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Forecast detail — popup */}
      <Dialog open={view === "detail"} onOpenChange={(o) => !o && closeToList()}>
        <DialogContent className="p-0 gap-0 w-[96vw] sm:max-w-[1320px] h-[92vh] max-h-[920px] overflow-hidden">
          <DialogTitle className="sr-only">Forecast detail</DialogTitle>
          <div className="flex h-full overflow-hidden">
            <div className="flex-1 min-w-0 overflow-y-auto p-5 sm:p-6">
              <ForecastDetail campaign={active} onBack={closeToList} />
            </div>
            <div className="hidden lg:block w-[380px] shrink-0 border-l border-[#eef1f4] overflow-hidden">
              <HelixPanel mode="strategies" className="h-full w-full border-0 rounded-none" />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Single Helix AI panel on the list — toggled by the header button */}
      {aiOpen && view === "list" && (
        <div className="hidden lg:block fixed right-6 top-[88px] bottom-6 w-[400px] z-50">
          <HelixPanel mode="simple" onClose={onCloseAI} className="h-full w-full" />
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

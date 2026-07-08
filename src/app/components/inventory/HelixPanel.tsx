import { useState } from "react";
import { Sparkles, X, ChevronUp } from "lucide-react";
import { Badge } from "../ui/badge";
import { STRATEGIES } from "./data";

function HelixOrb() {
  return (
    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center shrink-0">
      <Sparkles className="w-3.5 h-3.5 text-white" />
    </div>
  );
}

/**
 * Right-hand Helix AI panel from the Figma design.
 * mode="simple"      → Insight/Action tabs + greeting (create wizard)
 * mode="strategies"  → Co-Pilot/Manual + AI Chat/Assumptions/Your Actions + strategy compare (forecast detail)
 */
export function HelixPanel({
  mode = "simple",
  onClose,
  className = "",
}: {
  mode?: "simple" | "strategies";
  onClose?: () => void;
  className?: string;
}) {
  const simpleTabs = ["Insight", "Action"];
  const richTabs = ["AI Chat", "Assumptions", "Your Actions"];
  const [tab, setTab] = useState(mode === "simple" ? simpleTabs[0] : richTabs[0]);
  const [copilot, setCopilot] = useState(true);
  const [selected, setSelected] = useState("balanced");
  const tabs = mode === "simple" ? simpleTabs : richTabs;

  return (
    <div className={`bg-white border border-[#e6e8ea] rounded-2xl flex flex-col overflow-hidden ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#eef1f4]">
        <h3 className="text-[#0a335c]">Helix AI</h3>
        <div className="flex items-center gap-2">
          {mode === "strategies" && (
            <div className="flex items-center rounded-full bg-gray-100 p-0.5 text-xs">
              <button
                onClick={() => setCopilot(true)}
                className={`px-3 py-1 rounded-full transition-colors ${copilot ? "bg-white shadow-sm text-[#007fff]" : "text-gray-500"}`}
              >
                Co-Pilot
              </button>
              <button
                onClick={() => setCopilot(false)}
                className={`px-3 py-1 rounded-full transition-colors ${!copilot ? "bg-white shadow-sm text-[#007fff]" : "text-gray-500"}`}
              >
                Manual
              </button>
            </div>
          )}
          {onClose && (
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-5 px-4 border-b border-[#eef1f4]">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`py-2.5 text-sm relative transition-colors ${
              tab === t ? "text-[#007fff]" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t}
            {tab === t && <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-[#007fff] rounded-full" />}
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex items-start gap-2.5">
          <HelixOrb />
          <div className="flex-1">
            <p className="text-sm text-[#0a335c] mb-1">AI Assistant</p>
            {mode === "simple" ? (
              <div className="bg-[#eef4ff] rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-sm text-[#0a335c] max-w-[85%]">
                Hi! I'm your ForceSight assistant. I propose and explain — the engine computes every figure. How can I
                help with your sell-in / sell-out forecast?
              </div>
            ) : (
              <p className="text-sm text-[#0a335c]">
                <span className="font-semibold">Budget cycle:</span> Based on the prior WENR cycle and current
                trade / co-op plan, the engine protects <span className="font-semibold">$12M revenue</span> with{" "}
                <span className="font-semibold">$4.2M cash locked</span>.
              </p>
            )}
            <p className="text-[11px] text-gray-400 mt-1">11:38</p>
          </div>
        </div>

        {mode === "strategies" && (
          <>
            <div className="flex flex-wrap gap-2">
              <button className="text-xs px-3 py-1.5 rounded-full border border-[#d5e6fb] text-[#007fff] hover:bg-blue-50">
                + Try Strategy
              </button>
              <button className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50">
                + Add Adjustments
              </button>
              <button className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Ask What If?
              </button>
            </div>

            <div>
              <p className="text-sm text-[#0a335c] mb-1">Selected: Try Strategy</p>
              <p className="text-sm text-gray-600 mb-3">Would you like to compare this with other scenarios?</p>

              <div className="space-y-2.5">
                {STRATEGIES.map((s) => {
                  const active = selected === s.key;
                  return (
                    <button
                      key={s.key}
                      onClick={() => setSelected(s.key)}
                      className={`w-full text-left rounded-xl border p-3 transition-colors ${
                        active ? "border-[#007fff] bg-[#f5f9ff]" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#0a335c]">{s.name}:</span>
                          {s.recommended && (
                            <Badge className="bg-[#e0f0ff] text-[#007fff] border-transparent text-[10px]">
                              Recommended
                            </Badge>
                          )}
                        </div>
                        <ChevronUp className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-xs">
                        <Metric label="Inventory $" value={s.inventory} />
                        <Metric label="Cash Impact" value={s.cashImpact} />
                        <Metric label="WOC Change" value={s.wocChange} />
                        <Metric label="Revenue Protected" value={s.revenueProtected} />
                      </div>
                      <p className="text-[11px] text-gray-500 mt-2">{s.summary}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-gray-400 leading-tight mb-0.5">{label}</p>
      <p className="font-semibold text-[#0a335c]">{value}</p>
    </div>
  );
}

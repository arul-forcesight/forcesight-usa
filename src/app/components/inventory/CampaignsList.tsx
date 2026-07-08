import { Plus, Eye, Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ChannelIcon } from "../ChannelBadge";
import { Campaign, CampaignStatus, CAMPAIGNS } from "./data";

const statusStyles: Record<CampaignStatus, string> = {
  Active: "bg-green-100 text-green-700 border-transparent",
  Completed: "bg-blue-100 text-blue-700 border-transparent",
  Draft: "bg-amber-100 text-amber-700 border-transparent",
};

function Channels({ channels }: { channels: Campaign["channels"] }) {
  if (channels === "all") {
    return <span className="text-sm text-[#0a335c]">All Channels</span>;
  }
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
      {channels.map((c) => (
        <span key={c} className="inline-flex items-center gap-1.5 text-sm text-[#0a335c]">
          <ChannelIcon channel={c} size="xs" />
          {c}
        </span>
      ))}
    </div>
  );
}

export function CampaignsList({
  onCreate,
  onOpen,
}: {
  onCreate: () => void;
  onOpen: (c: Campaign) => void;
}) {
  return (
    <div className="w-full">
      {/* Main card */}
      <div className="min-w-0 w-full bg-white border border-[#e6e8ea] rounded-2xl">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 p-6">
          <div>
            <h2 className="text-[#0a335c]">Sell-in / Sell-out Forecast (WENR)</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Create and manage your WENR forecast cycles
            </p>
          </div>
          <Button onClick={onCreate} className="gap-2 bg-[#007fff] hover:bg-[#0069d6] shrink-0">
            <Plus className="w-4 h-4" />
            New Forecast Cycle
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead>
              <tr className="border-y border-[#eef1f4] text-left">
                {["Forecast Cycle", "Created Date", "Forecast Period", "Status", "Retailers", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-6 py-3.5 text-[11px] font-semibold tracking-wide uppercase text-gray-400 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {CAMPAIGNS.map((c) => (
                <tr key={c.id} className="border-b border-[#f1f4f7] hover:bg-gray-50/60 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-semibold text-[#0a335c]">{c.name}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400 whitespace-nowrap">{c.createdDate}</td>
                  <td className="px-6 py-4 text-sm text-[#0a335c] whitespace-nowrap">{c.forecastPeriod}</td>
                  <td className="px-6 py-4">
                    <Badge className={statusStyles[c.status]}>{c.status}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Channels channels={c.channels} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1.5 h-8"
                        onClick={() => onOpen(c)}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => onOpen(c)}>
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Settings2, ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

interface MonthlyData {
  metric: string;
  feb25: { value: number | string; change?: number; changePercent?: number };
  aug25: { value: number | string; change?: number; changePercent?: number };
  sep25: { value: number | string; change?: number; changePercent?: number };
  oct25: { value: number | string; change?: number; changePercent?: number };
  isExpanded?: boolean;
  children?: MonthlyData[];
  isHighlighted?: boolean;
}

const monthlyData: MonthlyData[] = [
  {
    metric: "Gross Qty",
    feb25: { value: 19992 },
    aug25: { value: 95175, change: 75183, changePercent: 79 },
    sep25: { value: 214889, change: 119714, changePercent: 56 },
    oct25: { value: 122683, change: -92206, changePercent: -75 }
  },
  {
    metric: "Cancelled Qty",
    feb25: { value: -3248 },
    aug25: { value: -2066 },
    sep25: { value: -6622 },
    oct25: { value: -25112 }
  },
  {
    metric: "Replaced Qty",
    feb25: { value: -214 },
    aug25: { value: -624 },
    sep25: { value: -1224 },
    oct25: { value: -357 }
  },
  {
    metric: "Return Qty",
    feb25: { value: -2223 },
    aug25: { value: -2810 },
    sep25: { value: -1373 },
    oct25: { value: -2176 }
  },
  {
    metric: "Claimed Qty",
    feb25: { value: 169 },
    aug25: { value: 33 },
    sep25: { value: 192 },
    oct25: { value: 24 }
  },
  {
    metric: "Net Qty",
    feb25: { value: 14474 },
    aug25: { value: 89708, change: 75234, changePercent: 84 },
    sep25: { value: 199863, change: 110155, changePercent: 55 },
    oct25: { value: 95084, change: -104779, changePercent: -110 },
    isHighlighted: true
  },
  {
    metric: "Gross Sales",
    feb25: { value: "$8,059,252" },
    aug25: { value: "$27,599,802", change: 195405, changePercent: 71 },
    sep25: { value: "$62,916,243", change: 353164, changePercent: 56 },
    oct25: { value: "$32,585,109", change: -303311, changePercent: -93 }
  },
  {
    metric: "Cancelled Sales",
    feb25: { value: "-$1,110,718" },
    aug25: { value: "-$1,739,097" },
    sep25: { value: "-$3,979,995" },
    oct25: { value: "-$2,016,188" }
  },
  {
    metric: "Replaced Sales",
    feb25: { value: "$0" },
    aug25: { value: "$0" },
    sep25: { value: "$0" },
    oct25: { value: "$0" }
  },
  {
    metric: "Return Sales",
    feb25: { value: "-$1,218,900" },
    aug25: { value: "-$2,771,440" },
    sep25: { value: "-$6,398,246" },
    oct25: { value: "-$1,737,429" }
  },
  {
    metric: "Claimed Sales",
    feb25: { value: "$48,608" },
    aug25: { value: "$35,366" },
    sep25: { value: "$81,467" },
    oct25: { value: "$6,702" }
  },
  {
    metric: "Net Sales",
    feb25: { value: "$5,776,259" },
    aug25: { value: "$23,124,611", change: 173483, changePercent: 75 },
    sep25: { value: "$52,619,457", change: 294948, changePercent: 56 },
    oct25: { value: "$28,834,212", change: -237852, changePercent: -82 },
    isHighlighted: true
  },
  {
    metric: "Marketplace Fees",
    feb25: { value: "-$1,371,408", change: 0, changePercent: 24 },
    aug25: { value: "-$5,043,302", change: 0, changePercent: 22 },
    sep25: { value: "-$8,634,434", change: 0, changePercent: 16 },
    oct25: { value: "$3,689,544", change: 0, changePercent: 13 },
    isExpanded: false,
    children: []
  },
  {
    metric: "Shipping Fees",
    feb25: { value: "-$768,002", change: 0, changePercent: 13 },
    aug25: { value: "-$764,833", change: 0, changePercent: 3 },
    sep25: { value: "-$2,004,930", change: 0, changePercent: 4 },
    oct25: { value: "-$1,175,872", change: 0, changePercent: 4 }
  },
  {
    metric: "Std Cost",
    feb25: { value: "-$3,043,968", change: 0, changePercent: 53 },
    aug25: { value: "-$4,017,886", change: 0, changePercent: 18 },
    sep25: { value: "-$10,465,923", change: 0, changePercent: 20 },
    oct25: { value: "-$7,448,481", change: 0, changePercent: 26 }
  },
  {
    metric: "Ad Fees",
    feb25: { value: "-$428,438", change: 0, changePercent: 7 },
    aug25: { value: "-$9,877,776", change: 0, changePercent: 43 },
    sep25: { value: "-$20,499,186", change: 0, changePercent: 39 },
    oct25: { value: "-$10,962,336", change: 0, changePercent: 38 }
  },
  {
    metric: "Account Charges",
    feb25: { value: "$0" },
    aug25: { value: "$0" },
    sep25: { value: "-$1,031", change: 0, changePercent: 0 },
    oct25: { value: "-$107,455", change: 0, changePercent: 0 }
  },
  {
    metric: "Total Operating Expenses",
    feb25: { value: "-$5,611,816" },
    aug25: { value: "-$19,703,797", change: -140919, changePercent: 85 },
    sep25: { value: "-$41,705,504", change: -220017, changePercent: 53 },
    oct25: { value: "-$23,294,688", change: -184108, changePercent: -81 },
    isHighlighted: true
  },
  {
    metric: "Gross Profit",
    feb25: { value: "$8,719,227" },
    aug25: { value: "$28,142,913", change: 194236, changePercent: 69 },
    sep25: { value: "$63,381,367", change: 352384, changePercent: 56 },
    oct25: { value: "$36,283,593", change: -271015, changePercent: -75 },
    isHighlighted: true
  },
  {
    metric: "Net Profit",
    feb25: { value: "$3,107,411" },
    aug25: { value: "$8,439,116", change: 53317, changePercent: 63 },
    sep25: { value: "$21,675,863", change: 132368, changePercent: 61 },
    oct25: { value: "$12,988,905", change: -86879, changePercent: -67 },
    isHighlighted: true
  },
  {
    metric: "Net Profit Margin %",
    feb25: { value: "53.8%" },
    aug25: { value: "36.5%", changePercent: -17.3 },
    sep25: { value: "41.2%", changePercent: 4.7 },
    oct25: { value: "45.0%", changePercent: 3.8 }
  },
  {
    metric: "Avg Order Value",
    feb25: { value: "$399" },
    aug25: { value: "$258", changePercent: -35 },
    sep25: { value: "$263", changePercent: 2 },
    oct25: { value: "$303", changePercent: 15 }
  },
  {
    metric: "Avg Order Profit",
    feb25: { value: "$215" },
    aug25: { value: "$94", changePercent: -56 },
    sep25: { value: "$108", changePercent: 15 },
    oct25: { value: "$137", changePercent: 27 }
  },
  {
    metric: "Monthly Growth %",
    feb25: { value: "-" },
    aug25: { value: "+171.6%" },
    sep25: { value: "+156.9%" },
    oct25: { value: "-40.1%" }
  }
];

export function MonthlyViewTable() {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (metric: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(metric)) {
      newExpanded.delete(metric);
    } else {
      newExpanded.add(metric);
    }
    setExpandedRows(newExpanded);
  };

  const formatValue = (val: number | string) => {
    if (typeof val === 'string') return val;
    return new Intl.NumberFormat('en-US').format(val);
  };

  const formatChange = (change: number) => {
    const formatted = new Intl.NumberFormat('en-US').format(Math.abs(change));
    return change >= 0 ? `+${formatted}` : `-${formatted}`;
  };

  const getChangeColor = (changePercent?: number) => {
    if (!changePercent) return "text-gray-500";
    if (changePercent > 0) return "text-green-600";
    return "text-red-600";
  };

  const getBgColor = (metric: string, isHighlighted?: boolean) => {
    if (isHighlighted) {
      return "bg-blue-50";
    }
    if (metric === "Net Qty" || metric === "Net Sales" || metric === "Gross Profit" || metric === "Net Profit") {
      return "bg-green-50";
    }
    if (metric === "Total Operating Expenses") {
      return "bg-red-50";
    }
    if (metric.startsWith("Marketplace") || metric.startsWith("Shipping") || metric.startsWith("Ad") || metric.includes("Cost") || metric.includes("Charges")) {
      return "bg-orange-50";
    }
    if (metric.includes("Margin") || metric.includes("Avg") || metric.includes("Growth")) {
      return "bg-purple-50";
    }
    return "bg-white";
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-base">Monthly View</h3>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings2 className="w-4 h-4" />
          Configure
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-gray-700 w-48">Metric</th>
              <th className="px-4 py-3 text-center text-xs uppercase tracking-wider text-gray-700 min-w-[200px]">Feb/25</th>
              <th className="px-4 py-3 text-center text-xs uppercase tracking-wider text-gray-700 min-w-[200px]">Aug/25</th>
              <th className="px-4 py-3 text-center text-xs uppercase tracking-wider text-gray-700 min-w-[200px]">Sep/25</th>
              <th className="px-4 py-3 text-center text-xs uppercase tracking-wider text-gray-700 min-w-[200px]">Oct/25</th>
            </tr>
          </thead>
          <tbody>
            {monthlyData.map((row, idx) => (
              <tr
                key={idx}
                className={`border-b border-gray-100 ${getBgColor(row.metric, row.isHighlighted)} hover:bg-gray-50 transition-colors`}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {row.children && (
                      <button
                        onClick={() => toggleRow(row.metric)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {expandedRows.has(row.metric) ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                    )}
                    <span className={row.isHighlighted ? "font-semibold text-gray-900" : "text-gray-700"}>
                      {row.metric}
                    </span>
                  </div>
                </td>
                
                {/* Feb/25 */}
                <td className="px-4 py-3">
                  <div className="flex flex-col items-center">
                    <div className="text-sm text-gray-900">{formatValue(row.feb25.value)}</div>
                  </div>
                </td>

                {/* Aug/25 */}
                <td className="px-4 py-3">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-gray-900">{formatValue(row.aug25.value)}</div>
                      {row.aug25.changePercent !== undefined && (
                        <span className={`text-xs ${getChangeColor(row.aug25.changePercent)}`}>
                          ({row.aug25.changePercent > 0 ? '+' : ''}{row.aug25.changePercent}%)
                        </span>
                      )}
                    </div>
                    {row.aug25.change !== undefined && (
                      <div className={`text-xs mt-0.5 ${getChangeColor(row.aug25.changePercent)}`}>
                        {formatChange(row.aug25.change)}
                      </div>
                    )}
                  </div>
                </td>

                {/* Sep/25 */}
                <td className="px-4 py-3">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-gray-900">{formatValue(row.sep25.value)}</div>
                      {row.sep25.changePercent !== undefined && (
                        <span className={`text-xs ${getChangeColor(row.sep25.changePercent)}`}>
                          ({row.sep25.changePercent > 0 ? '+' : ''}{row.sep25.changePercent}%)
                        </span>
                      )}
                    </div>
                    {row.sep25.change !== undefined && (
                      <div className={`text-xs mt-0.5 ${getChangeColor(row.sep25.changePercent)}`}>
                        {formatChange(row.sep25.change)}
                      </div>
                    )}
                  </div>
                </td>

                {/* Oct/25 */}
                <td className="px-4 py-3">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-gray-900">{formatValue(row.oct25.value)}</div>
                      {row.oct25.changePercent !== undefined && (
                        <span className={`text-xs ${getChangeColor(row.oct25.changePercent)}`}>
                          ({row.oct25.changePercent > 0 ? '+' : ''}{row.oct25.changePercent}%)
                        </span>
                      )}
                    </div>
                    {row.oct25.change !== undefined && (
                      <div className={`text-xs mt-0.5 ${getChangeColor(row.oct25.changePercent)}`}>
                        {formatChange(row.oct25.change)}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

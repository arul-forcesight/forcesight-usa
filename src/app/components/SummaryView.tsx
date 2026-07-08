import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Sparkles,
  ArrowUpRight,
  Lightbulb,
  Package,
} from "lucide-react";
import { USMapInteractive } from "./USMapInteractive";
import { DateRangeFilter } from "./DateRangeFilter";
import { ChannelPerformanceChart } from "./ChannelPerformanceChart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";

interface SummaryViewProps {
  onNavigate?: (view: string, subView: string) => void;
}

export function SummaryView({ onNavigate }: SummaryViewProps) {
  const [selectedMetric, setSelectedMetric] = useState("sales");
  
  const handleFilterApply = (filters: any) => {
    console.log("Filters applied to Summary View:", filters);
    // API call here
  };

  return (
    <div className="space-y-6">
      {/* Filter Section */}
      <DateRangeFilter onFilterApply={handleFilterApply} />
      
      {/* Helix AI Insight Banner - Hero */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
        <div className="flex items-start gap-4 p-6">
          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              Helix Insight
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-700 border-blue-200"
              >
                This Week
              </Badge>
            </h3>
            <ul className="space-y-1.5 text-sm text-gray-700 mb-3">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Profit up +4.2% vs last month — driven by 2 top SKUs and lower ad spend</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Amazon margin increased 3.1%, Shopify remains stable</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>FBA fees rose 8% month-over-month, impacting margin by −2%</span>
              </li>
            </ul>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-100 gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Ask Helix about this
            </Button>
          </div>
        </div>
      </Card>

      {/* Hero KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Gross Sales */}
        <Card className="border border-gray-200">
          <div className="p-5">
            <p className="text-sm text-gray-600 mb-2">
              Gross Sales
            </p>
            <div className="flex flex-row flex-wrap items-baseline gap-2 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">
                $2,384,291
              </h2>
              <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200 flex items-center gap-1 w-fit">
                <TrendingUp className="w-3 h-3" />
                +8.2%
              </Badge>
            </div>
            <p className="text-sm text-gray-500">
              28,854 Orders Fulfilled
            </p>
          </div>
        </Card>

        {/* Net Sales */}
        <Card className="border border-gray-200">
          <div className="p-5">
            <p className="text-sm text-gray-600 mb-2">
              Net Sales
            </p>
            <div className="flex flex-row flex-wrap items-baseline gap-2 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">
                $2,244,291
              </h2>
              <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200 flex items-center gap-1 w-fit">
                <TrendingUp className="w-3 h-3" />
                +7.8%
              </Badge>
            </div>
            <p className="text-sm text-gray-500">
              (After returns & fees)
            </p>
          </div>
        </Card>

        {/* Net Profit */}
        <Card className="border border-gray-200">
          <div className="p-5">
            <p className="text-sm text-gray-600 mb-2">
              Net Profit
            </p>
            <div className="flex flex-row flex-wrap items-baseline gap-2 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">
                $950,534
              </h2>
              <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200 flex items-center gap-1 w-fit">
                <TrendingUp className="w-3 h-3" />
                +4.2%
              </Badge>
            </div>
            <p className="text-sm text-gray-500">
              40% Profit Margin
            </p>
          </div>
        </Card>

        {/* Expected Payout */}
        <Card className="border border-gray-200">
          <div className="p-5">
            <p className="text-sm text-gray-600 mb-2">
              Expected Payout
            </p>
            <div className="flex flex-row flex-wrap items-baseline gap-2 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">
                $18,900
              </h2>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200 w-fit">
                This Week
              </Badge>
            </div>
            <p className="text-sm text-gray-500">
              Next Payout: Oct 25, 2025
            </p>
          </div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gross & Net Sales Chart */}
        <Card className="border border-gray-200">
          <div className="p-5">
            <h3 className="mb-4">Gross Sales</h3>

            {/* Summary bars */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">
                  Gross Sales
                </span>
                <span className="font-semibold text-gray-900">
                  $2,384,291
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Net Sales
                </span>
                <span className="font-semibold text-gray-900">
                  $2,244,291
                </span>
              </div>
            </div>

            {/* Mini Chart Visualization */}
            <div className="h-48 flex items-end justify-around gap-2 px-4">
              {[
                { gross: 90, net: 80 },
                { gross: 100, net: 92 },
                { gross: 75, net: 68 },
                { gross: 80, net: 72 },
                { gross: 70, net: 62 },
                { gross: 85, net: 78 },
                { gross: 100, net: 92 },
              ].map((data, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center flex-1"
                >
                  <div className="w-full flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-gradient-to-t from-blue-400 to-blue-300 rounded-t"
                      style={{
                        height: `${data.gross * 0.65}px`,
                      }}
                    />
                    <div
                      className="w-full bg-gradient-to-t from-blue-600 to-blue-500 rounded-b"
                      style={{ height: `${data.net * 0.65}px` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 mt-2">
                    {i + 1} Jan
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Net Profit Chart */}
        <Card className="border border-gray-200">
          <div className="p-5 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3>Net Profit</h3>
              <Badge className="bg-green-100 text-green-700 border-green-200">
                40% Profit Margin
              </Badge>
            </div>

            {/* Chart */}
            <div className="flex-1 relative min-h-[200px]">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between py-4">
                {[100, 80, 60, 40, 20, 0].map((value, i) => (
                  <div key={i} className="flex items-center">
                    <span className="text-xs text-gray-400 w-10 text-right mr-2">
                      {value}k
                    </span>
                    <div className="flex-1 border-t border-gray-100" />
                  </div>
                ))}
              </div>

              {/* Line chart */}
              <svg
                className="absolute inset-0 w-full h-full pl-12 pr-4"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                {/* Net Sales Line (lighter blue) */}
                <path
                  d="M 0 40 Q 16 30, 33 35 Q 50 38, 66 45 Q 83 50, 100 32"
                  fill="none"
                  stroke="#93C5FD"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Net Profit Line (darker blue) */}
                <path
                  d="M 0 60 Q 16 55, 33 58 Q 50 62, 66 68 Q 83 72, 100 58"
                  fill="none"
                  stroke="#007FFF"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Legend */}
              <div className="absolute top-4 right-4 flex gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-0.5 bg-[#93C5FD]" />
                  <span className="text-gray-600">
                    Net Sales
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-0.5 bg-[#007FFF]" />
                  <span className="text-gray-600">
                    Net Profit
                  </span>
                </div>
              </div>

              {/* X-axis labels */}
              <div className="absolute bottom-0 left-12 right-4 flex justify-between text-xs text-gray-400">
                {[
                  "1 Jan",
                  "2 Jan",
                  "3 Jan",
                  "4 Jan",
                  "5 Jan",
                  "6 Jan",
                  "7 Jan",
                ].map((label, i) => (
                  <span key={i}>{label}</span>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Secondary Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Cancelled Orders */}
        <Card className="bg-gray-50 border border-gray-200">
          <div className="p-4">
            <p className="text-sm text-gray-700 mb-2">
              Cancelled
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                21 Units
              </span>
              <span className="font-medium text-gray-900">
                $28,854
              </span>
            </div>
          </div>
        </Card>

        {/* Customer Returns */}
        <Card className="bg-gray-50 border border-gray-200">
          <div className="p-4">
            <p className="text-sm text-gray-700 mb-2">
              Customer Returns
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                21 Units
              </span>
              <span className="font-medium text-gray-900">
                $28,854
              </span>
            </div>
          </div>
        </Card>

        {/* Ads Spend */}
        <Card className="bg-gray-50 border border-gray-200">
          <div className="p-4">
            <p className="text-sm text-gray-700 mb-2">
              Ads Spend
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">14%</span>
              <span className="font-medium text-gray-900">
                $28,854
              </span>
            </div>
          </div>
        </Card>

        {/* Expense */}
        <Card className="bg-gray-50 border border-gray-200">
          <div className="p-4">
            <p className="text-sm text-gray-700 mb-2">
              Expense
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">20%</span>
              <span className="font-medium text-gray-900">
                $28,854
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Performance by State and Channel Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance by State with Dropdown */}
        <Card className="border border-gray-200">
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3>Performance by State</h3>
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger className="w-[180px] border-gray-300">
                  <SelectValue placeholder="Select metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="units">Units Sold</SelectItem>
                  <SelectItem value="profit">Profit</SelectItem>
                  <SelectItem value="returns">Returns</SelectItem>
                  <SelectItem value="shipping">Shipping</SelectItem>
                  <SelectItem value="inventory">Inventory</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="h-64">
              <USMapInteractive metric={selectedMetric} />
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-gray-600">
              <span>
                Low {selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)}
              </span>
              <div className="flex-1 mx-4 h-2 bg-gradient-to-r from-blue-100 via-blue-500 to-blue-900 rounded-full" />
              <span>
                High {selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)}
              </span>
            </div>

            {/* Summary Data Row */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Active States</p>
                  <p className="font-semibold text-gray-900">48</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Top State</p>
                  <p className="font-semibold text-gray-900">California</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Avg per State</p>
                  <p className="font-semibold text-gray-900">$49,673</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Coverage</p>
                  <p className="font-semibold text-gray-900">96%</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Performance by Channel Chart */}
        <ChannelPerformanceChart
          onViewMore={() => onNavigate?.("profit", "table")}
        />
      </div>

      {/* Inventory Insights and IDs Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inventory Insight - AI Powered */}
        <Card className="border border-purple-200 bg-gradient-to-br from-purple-50 via-white to-blue-50">
          <div className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900">Inventory Insight</h3>
                <Badge className="bg-purple-100 text-purple-700 border-purple-200 mt-1">
                  AI Powered
                </Badge>
              </div>
            </div>
            
            <div className="space-y-3">
              {/* Alert Card */}
              <Card className="bg-orange-50 border-orange-200">
                <div className="p-3">
                  <div className="flex items-start gap-2">
                    <Package className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        81 SKUs Need Restocking
                      </p>
                      <p className="text-xs text-gray-600">
                        Estimated lost revenue: $28,854
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* AI Recommendations */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-600">
                  Recommended Actions:
                </p>
                <div className="space-y-1.5">
                  <div className="flex items-start gap-2 text-xs">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      Prioritize restocking top 12 SKUs (78% of revenue impact)
                    </p>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      FBA inventory arriving in 3-5 days for 45 SKUs
                    </p>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      Consider removing 23 slow-moving items to reduce storage fees
                    </p>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full mt-2 gap-2 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700"
              >
                <Sparkles className="w-4 h-4" />
                Ask Helix for Details
              </Button>
            </div>
          </div>
        </Card>

        {/* Profit IDs */}
        <Card className="border border-gray-200">
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Profit IDs</h3>
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Profitable IDs</span>
                <span className="font-semibold text-gray-900">#8 IDs</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Profit Generated</span>
                <span className="text-2xl font-bold text-green-600">$28,854</span>
              </div>
              <div className="h-px bg-gray-200 my-3" />
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-600 mb-2">Top Performers:</p>
                {[
                  { id: "SKU-1234", profit: "$8,450" },
                  { id: "SKU-5678", profit: "$6,230" },
                  { id: "SKU-9012", profit: "$5,180" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-xs bg-green-50 rounded p-2">
                    <span className="font-medium text-gray-700">{item.id}</span>
                    <span className="text-green-700">{item.profit}</span>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-2 hover:bg-green-50 hover:border-green-300 hover:text-green-700"
                onClick={() => onNavigate?.("profit", "table")}
              >
                View All Profit IDs
              </Button>
            </div>
          </div>
        </Card>

        {/* Loss IDs */}
        <Card className="border border-gray-200">
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Loss IDs</h3>
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <TrendingDown className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Loss-Making IDs</span>
                <span className="font-semibold text-gray-900">#8 IDs</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Loss</span>
                <span className="text-2xl font-bold text-red-600">-$28,854</span>
              </div>
              <div className="h-px bg-gray-200 my-3" />
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-600 mb-2">Highest Losses:</p>
                {[
                  { id: "SKU-3456", loss: "-$12,340" },
                  { id: "SKU-7890", loss: "-$8,920" },
                  { id: "SKU-2345", loss: "-$4,580" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-xs bg-red-50 rounded p-2">
                    <span className="font-medium text-gray-700">{item.id}</span>
                    <span className="text-red-700">{item.loss}</span>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-2 hover:bg-red-50 hover:border-red-300 hover:text-red-700"
                onClick={() => onNavigate?.("profit", "table")}
              >
                View All Loss IDs
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Ask Helix Suggestions */}
      <Card className="border border-blue-200 bg-gradient-to-r from-white to-blue-50">
        <div className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h3 className="text-gray-900">Ask Helix</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              "Why did Amazon margin increase?",
              "How to reduce FBA fees?",
              "Which SKUs to restock first?",
            ].map((question, i) => (
              <Button
                key={i}
                variant="outline"
                className="justify-start text-left h-auto py-3 px-4 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700"
              >
                <span className="text-sm">{question}</span>
              </Button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
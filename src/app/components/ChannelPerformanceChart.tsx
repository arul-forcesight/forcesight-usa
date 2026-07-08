import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ArrowUpRight, TrendingUp, TrendingDown } from "lucide-react";
import { ChannelIcon } from "./ChannelBadge";

interface ChannelData {
  label: string;
  heights: number[];
  colors: string[];
  hoverColors: string[];
  sales: string;
  orders: number;
  margin: string;
  change: number;
  avgOrderValue: string;
  returnRate: string;
}

const channelsData: ChannelData[] = [
  {
    label: "Amazon",
    heights: [20, 25, 25, 18, 82],
    colors: [
      "bg-blue-200",
      "bg-blue-300",
      "bg-blue-400",
      "bg-blue-500",
      "bg-blue-600",
    ],
    hoverColors: [
      "group-hover:bg-blue-300",
      "group-hover:bg-blue-400",
      "group-hover:bg-blue-500",
      "group-hover:bg-blue-600",
      "group-hover:bg-blue-700",
    ],
    sales: "$1,234,567",
    orders: 8542,
    margin: "42.3%",
    change: 12.5,
    avgOrderValue: "$145",
    returnRate: "2.8%",
  },
  {
    label: "Walmart",
    heights: [16, 20, 20, 14, 70],
    colors: [
      "bg-orange-200",
      "bg-orange-300",
      "bg-orange-400",
      "bg-orange-500",
      "bg-orange-600",
    ],
    hoverColors: [
      "group-hover:bg-orange-300",
      "group-hover:bg-orange-400",
      "group-hover:bg-orange-500",
      "group-hover:bg-orange-600",
      "group-hover:bg-orange-700",
    ],
    sales: "$856,432",
    orders: 6234,
    margin: "38.7%",
    change: 8.3,
    avgOrderValue: "$137",
    returnRate: "3.2%",
  },
  {
    label: "Shopify",
    heights: [14, 18, 18, 12, 60],
    colors: [
      "bg-purple-200",
      "bg-purple-300",
      "bg-purple-400",
      "bg-purple-500",
      "bg-purple-600",
    ],
    hoverColors: [
      "group-hover:bg-purple-300",
      "group-hover:bg-purple-400",
      "group-hover:bg-purple-500",
      "group-hover:bg-purple-600",
      "group-hover:bg-purple-700",
    ],
    sales: "$456,789",
    orders: 3876,
    margin: "45.1%",
    change: 15.7,
    avgOrderValue: "$118",
    returnRate: "1.9%",
  },
  {
    label: "eBay",
    heights: [10, 13, 13, 8, 45],
    colors: [
      "bg-green-200",
      "bg-green-300",
      "bg-green-400",
      "bg-green-500",
      "bg-green-600",
    ],
    hoverColors: [
      "group-hover:bg-green-300",
      "group-hover:bg-green-400",
      "group-hover:bg-green-500",
      "group-hover:bg-green-600",
      "group-hover:bg-green-700",
    ],
    sales: "$234,567",
    orders: 2145,
    margin: "35.8%",
    change: -2.4,
    avgOrderValue: "$109",
    returnRate: "4.1%",
  },
];

interface ChannelPerformanceChartProps {
  onViewMore?: () => void;
}

export function ChannelPerformanceChart({ onViewMore }: ChannelPerformanceChartProps) {
  const [hoveredChannel, setHoveredChannel] = useState<string | null>(null);

  return (
    <Card className="border border-gray-200">
      <div className="p-5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3>Performance by Channel</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Hover over channels for detailed metrics
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onViewMore}
            className="gap-2 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700"
          >
            View More
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Stacked Bar Chart */}
        <div className="relative h-64 flex items-end justify-start gap-8 px-8">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-400">
            <span>50k</span>
            <span>40k</span>
            <span>30k</span>
            <span>20k</span>
            <span>10k</span>
            <span>0k</span>
          </div>

          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border-t border-gray-100" />
            ))}
          </div>

          {/* Bars */}
          {channelsData.map((channel, i) => (
            <div
              key={i}
              className="flex flex-col items-center flex-1 cursor-pointer group relative"
              onMouseEnter={() => setHoveredChannel(channel.label)}
              onMouseLeave={() => setHoveredChannel(null)}
            >
              {/* Enhanced Tooltip on hover */}
              <div
                className={`absolute -top-32 left-1/2 -translate-x-1/2 transition-all duration-200 z-10 ${
                  hoveredChannel === channel.label
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2 pointer-events-none"
                }`}
              >
                <div className="bg-gray-900 text-white text-xs rounded-lg p-3 shadow-xl whitespace-nowrap min-w-[200px]">
                  <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-700">
                    <span className="inline-flex items-center gap-1.5 font-semibold text-sm">
                      <ChannelIcon channel={channel.label} size="xs" />
                      {channel.label}
                    </span>
                    <div className="flex items-center gap-1">
                      {channel.change >= 0 ? (
                        <TrendingUp className="w-3 h-3 text-green-400" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-400" />
                      )}
                      <span
                        className={
                          channel.change >= 0 ? "text-green-400" : "text-red-400"
                        }
                      >
                        {channel.change >= 0 ? "+" : ""}
                        {channel.change}%
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Sales:</span>
                      <span className="font-medium">{channel.sales}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Orders:</span>
                      <span className="font-medium">
                        {channel.orders.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Profit Margin:</span>
                      <span className="font-medium text-green-400">
                        {channel.margin}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Avg Order:</span>
                      <span className="font-medium">{channel.avgOrderValue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Return Rate:</span>
                      <span className="font-medium">{channel.returnRate}</span>
                    </div>
                  </div>
                </div>
                {/* Tooltip arrow */}
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-gray-900 rotate-45"></div>
              </div>

              <div className="w-8 flex flex-col items-center transition-all duration-300 group-hover:scale-110">
                {channel.heights.map((height, j) => (
                  <div
                    key={j}
                    className={`w-full ${channel.colors[j]} ${channel.hoverColors[j]} transition-all duration-300`}
                    style={{ height: `${height}px` }}
                  />
                ))}
              </div>
              <span
                className={`inline-flex items-center gap-1.5 text-xs text-gray-600 mt-3 transition-all duration-300 group-hover:text-gray-900 group-hover:font-semibold`}
              >
                <ChannelIcon channel={channel.label} size="xs" />
                {channel.label}
              </span>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-xs text-gray-600 mb-1">Total Revenue</p>
            <p className="font-semibold text-gray-900">$2,782,355</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600 mb-1">Total Orders</p>
            <p className="font-semibold text-gray-900">20,797</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600 mb-1">Avg Margin</p>
            <Badge className="bg-green-100 text-green-700 border-green-200">
              40.5%
            </Badge>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600 mb-1">Top Channel</p>
            <Badge className="bg-blue-100 text-blue-700 border-blue-200 inline-flex items-center gap-1.5">
              <ChannelIcon channel="Amazon" size="xs" />
              Amazon
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}

import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Download } from "lucide-react";
import { ChannelIcon } from "./ChannelBadge";

const data = [
  { date: "Jan 1", sales: 12400, profit: 4200, returns: 890 },
  { date: "Jan 8", sales: 15600, profit: 5300, returns: 1120 },
  { date: "Jan 15", sales: 18900, profit: 6800, returns: 1340 },
  { date: "Jan 22", sales: 16200, profit: 5900, returns: 980 },
  { date: "Jan 29", sales: 21500, profit: 8200, returns: 1560 },
  { date: "Feb 5", sales: 24300, profit: 9500, returns: 1780 },
  { date: "Feb 12", sales: 22100, profit: 8900, returns: 1420 },
  { date: "Feb 19", sales: 26800, profit: 10800, returns: 1890 },
  { date: "Feb 26", sales: 29400, profit: 12100, returns: 2020 },
  { date: "Mar 5", sales: 31200, profit: 13400, returns: 2150 },
  { date: "Mar 12", sales: 28900, profit: 11900, returns: 1920 },
  { date: "Mar 19", sales: 33600, profit: 14800, returns: 2280 },
];

// Sample data for the detailed breakdown table
const getDailyBreakdownData = (viewBy: string, metric: string) => {
  const dates = ["Oct 1", "Oct 2", "Oct 3", "Oct 4", "Oct 5", "Oct 6", "Oct 7", "Oct 8", "Oct 9", "Oct 10", "Oct 11", "Oct 12", "Oct 13", "Oct 14", "Oct 15"];
  
  if (viewBy === "channel") {
    return {
      rows: ["Amazon", "Walmart", "Shopify", "eBay"],
      data: {
        "Amazon": metric === "grossQty" ? [1250, 1340, 1180, 1420, 1560, 1390, 1480, 1620, 1550, 1470, 1680, 1590, 1720, 1640, 1580] :
                 metric === "grossAmount" ? [42500, 45560, 40120, 48280, 53040, 47260, 50320, 55080, 52700, 49980, 57120, 54060, 58480, 55760, 53720] :
                 metric === "netQty" ? [1180, 1260, 1120, 1350, 1480, 1320, 1410, 1540, 1470, 1400, 1600, 1510, 1640, 1560, 1500] :
                 metric === "netAmount" ? [40120, 42840, 38080, 45900, 50320, 44880, 47940, 52360, 49980, 47600, 54400, 51340, 55760, 53040, 51000] :
                 metric === "returns" ? [70, 80, 60, 70, 80, 70, 70, 80, 80, 70, 80, 80, 80, 80, 80] :
                 [2380, 2720, 2040, 2380, 2720, 2380, 2380, 2720, 2720, 2380, 2720, 2720, 2720, 2720, 2720],
        "Walmart": metric === "grossQty" ? [980, 1050, 920, 1120, 1230, 1100, 1170, 1280, 1220, 1160, 1320, 1260, 1360, 1300, 1250] :
                  metric === "grossAmount" ? [33320, 35700, 31280, 38080, 41820, 37400, 39780, 43520, 41480, 39440, 44880, 42840, 46240, 44200, 42500] :
                  metric === "netQty" ? [920, 990, 870, 1060, 1170, 1040, 1110, 1220, 1160, 1100, 1260, 1200, 1300, 1240, 1190] :
                  metric === "netAmount" ? [31280, 33660, 29580, 36040, 39780, 35360, 37740, 41480, 39440, 37400, 42840, 40800, 44200, 42160, 40460] :
                  metric === "returns" ? [60, 60, 50, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60] :
                  [2040, 2040, 1700, 2040, 2040, 2040, 2040, 2040, 2040, 2040, 2040, 2040, 2040, 2040, 2040],
        "Shopify": metric === "grossQty" ? [620, 660, 580, 700, 770, 690, 730, 800, 760, 730, 830, 790, 850, 820, 780] :
                  metric === "grossAmount" ? [22320, 23760, 20880, 25200, 27720, 24840, 26280, 28800, 27360, 26280, 29880, 28440, 30600, 29520, 28080] :
                  metric === "netQty" ? [590, 630, 550, 670, 740, 660, 700, 770, 730, 700, 800, 760, 820, 790, 750] :
                  metric === "netAmount" ? [21240, 22680, 19800, 24120, 26640, 23760, 25200, 27720, 26280, 25200, 28800, 27360, 29520, 28440, 27000] :
                  metric === "returns" ? [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30] :
                  [1080, 1080, 1080, 1080, 1080, 1080, 1080, 1080, 1080, 1080, 1080, 1080, 1080, 1080, 1080],
        "eBay": metric === "grossQty" ? [420, 450, 390, 470, 520, 470, 490, 540, 520, 490, 560, 530, 580, 550, 530] :
               metric === "grossAmount" ? [13440, 14400, 12480, 15040, 16640, 15040, 15680, 17280, 16640, 15680, 17920, 16960, 18560, 17600, 16960] :
               metric === "netQty" ? [400, 430, 370, 450, 500, 450, 470, 520, 500, 470, 540, 510, 560, 530, 510] :
               metric === "netAmount" ? [12800, 13760, 11840, 14400, 16000, 14400, 15040, 16640, 16000, 15040, 17280, 16320, 17920, 16960, 16320] :
               metric === "returns" ? [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20] :
               [640, 640, 640, 640, 640, 640, 640, 640, 640, 640, 640, 640, 640, 640, 640],
      },
      dates
    };
  } else if (viewBy === "sku") {
    return {
      rows: ["SKU-001", "SKU-002", "SKU-003", "SKU-004", "SKU-005"],
      data: {
        "SKU-001": metric === "grossQty" ? [450, 480, 420, 510, 560, 500, 530, 580, 550, 520, 590, 560, 610, 580, 560] :
                  metric === "grossAmount" ? [13500, 14400, 12600, 15300, 16800, 15000, 15900, 17400, 16500, 15600, 17700, 16800, 18300, 17400, 16800] :
                  metric === "netQty" ? [420, 450, 390, 480, 530, 470, 500, 550, 520, 490, 560, 530, 580, 550, 530] :
                  metric === "netAmount" ? [12600, 13500, 11700, 14400, 15900, 14100, 15000, 16500, 15600, 14700, 16800, 15900, 17400, 16500, 15900] :
                  metric === "returns" ? [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30] :
                  [900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900],
        "SKU-002": metric === "grossQty" ? [580, 620, 540, 660, 720, 650, 680, 750, 710, 680, 770, 730, 790, 760, 730] :
                  metric === "grossAmount" ? [29000, 31000, 27000, 33000, 36000, 32500, 34000, 37500, 35500, 34000, 38500, 36500, 39500, 38000, 36500] :
                  metric === "netQty" ? [550, 590, 510, 630, 690, 620, 650, 720, 680, 650, 740, 700, 760, 730, 700] :
                  metric === "netAmount" ? [27500, 29500, 25500, 31500, 34500, 31000, 32500, 36000, 34000, 32500, 37000, 35000, 38000, 36500, 35000] :
                  metric === "returns" ? [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30] :
                  [1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500],
        "SKU-003": metric === "grossQty" ? [680, 730, 640, 770, 850, 760, 800, 880, 840, 800, 900, 860, 930, 890, 860] :
                  metric === "grossAmount" ? [23800, 25550, 22400, 26950, 29750, 26600, 28000, 30800, 29400, 28000, 31500, 30100, 32550, 31150, 30100] :
                  metric === "netQty" ? [650, 700, 610, 740, 820, 730, 770, 850, 810, 770, 870, 830, 900, 860, 830] :
                  metric === "netAmount" ? [22750, 24500, 21350, 25900, 28700, 25550, 26950, 29750, 28350, 26950, 30450, 29050, 31500, 30100, 29050] :
                  metric === "returns" ? [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30] :
                  [1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050],
        "SKU-004": metric === "grossQty" ? [520, 560, 490, 590, 650, 580, 620, 680, 650, 610, 690, 660, 710, 680, 660] :
                  metric === "grossAmount" ? [20800, 22400, 19600, 23600, 26000, 23200, 24800, 27200, 26000, 24400, 27600, 26400, 28400, 27200, 26400] :
                  metric === "netQty" ? [490, 530, 460, 560, 620, 550, 590, 650, 620, 580, 660, 630, 680, 650, 630] :
                  metric === "netAmount" ? [19600, 21200, 18400, 22400, 24800, 22000, 23600, 26000, 24800, 23200, 26400, 25200, 27200, 26000, 25200] :
                  metric === "returns" ? [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30] :
                  [1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200],
        "SKU-005": metric === "grossQty" ? [380, 410, 360, 430, 480, 430, 450, 500, 470, 450, 510, 480, 520, 500, 480] :
                  metric === "grossAmount" ? [17100, 18450, 16200, 19350, 21600, 19350, 20250, 22500, 21150, 20250, 22950, 21600, 23400, 22500, 21600] :
                  metric === "netQty" ? [360, 390, 340, 410, 460, 410, 430, 480, 450, 430, 490, 460, 500, 480, 460] :
                  metric === "netAmount" ? [16200, 17550, 15300, 18450, 20700, 18450, 19350, 21600, 20250, 19350, 22050, 20700, 22500, 21600, 20700] :
                  metric === "returns" ? [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20] :
                  [900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900],
      },
      dates
    };
  } else {
    // Order ID view
    return {
      rows: ["ORD-10234", "ORD-10235", "ORD-10236", "ORD-10237", "ORD-10238"],
      data: {
        "ORD-10234": metric === "grossQty" ? [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] :
                    metric === "grossAmount" ? [425, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] :
                    metric === "netQty" ? [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] :
                    metric === "netAmount" ? [425, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] :
                    metric === "returns" ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] :
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "ORD-10235": metric === "grossQty" ? [0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] :
                    metric === "grossAmount" ? [0, 680, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] :
                    metric === "netQty" ? [0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] :
                    metric === "netAmount" ? [0, 680, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] :
                    metric === "returns" ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] :
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "ORD-10236": metric === "grossQty" ? [0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] :
                    metric === "grossAmount" ? [0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] :
                    metric === "netQty" ? [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] :
                    metric === "netAmount" ? [0, 0, 170, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] :
                    metric === "returns" ? [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] :
                    [0, 0, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "ORD-10237": metric === "grossQty" ? [0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] :
                    metric === "grossAmount" ? [0, 0, 0, 1020, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] :
                    metric === "netQty" ? [0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] :
                    metric === "netAmount" ? [0, 0, 0, 1020, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] :
                    metric === "returns" ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] :
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "ORD-10238": metric === "grossQty" ? [0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] :
                    metric === "grossAmount" ? [0, 0, 0, 0, 510, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] :
                    metric === "netQty" ? [0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] :
                    metric === "netAmount" ? [0, 0, 0, 0, 510, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] :
                    metric === "returns" ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] :
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      dates
    };
  }
};

export function SalesChart() {
  const [viewBy, setViewBy] = useState("channel");
  const [metric, setMetric] = useState("grossQty");
  
  const handleExport = () => {
    // Mock export functionality
    console.log("Exporting sales chart data...");
  };

  const breakdownData = getDailyBreakdownData(viewBy, metric);
  
  // Calculate row totals
  const rowTotals = breakdownData.rows.map(row => {
    return breakdownData.data[row].reduce((sum, val) => sum + val, 0);
  });
  
  // Calculate column totals
  const columnTotals = breakdownData.dates.map((_, colIndex) => {
    return breakdownData.rows.reduce((sum, row) => {
      return sum + breakdownData.data[row][colIndex];
    }, 0);
  });
  
  // Calculate grand total
  const grandTotal = rowTotals.reduce((sum, val) => sum + val, 0);

  const formatValue = (value: number) => {
    if (metric.includes("Amount")) {
      return `${value.toLocaleString()}`;
    }
    return value.toLocaleString();
  };

  const getMetricLabel = (metricValue: string) => {
    const labels: Record<string, string> = {
      grossQty: "Gross Quantity",
      grossAmount: "Gross Amount",
      netQty: "Net Quantity",
      netAmount: "Net Amount",
      returns: "Returns",
      returnAmount: "Return Amount"
    };
    return labels[metricValue] || metricValue;
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 border border-gray-200 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Sales & Profit Trend</h3>
            <p className="text-sm text-muted-foreground mt-1">Last 7 days — tracking revenue momentum</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExport} className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="date" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="sales" 
              stroke="#3b82f6" 
              fillOpacity={1} 
              fill="url(#colorSales)"
              strokeWidth={3}
            />
            <Area 
              type="monotone" 
              dataKey="profit" 
              stroke="#10b981" 
              fillOpacity={1} 
              fill="url(#colorProfit)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Daily Breakdown Table */}
      <Card className="border border-gray-200">
        <div className="p-5 border-b border-gray-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h4 className="text-gray-900">Daily Performance Breakdown</h4>
              <p className="text-sm text-gray-600 mt-1">Detailed day-by-day analysis</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">View by:</span>
                <Select value={viewBy} onValueChange={setViewBy}>
                  <SelectTrigger className="w-[140px] border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="channel">Channel</SelectItem>
                    <SelectItem value="sku">SKU</SelectItem>
                    <SelectItem value="orderId">Order ID</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">Metric:</span>
                <Select value={metric} onValueChange={setMetric}>
                  <SelectTrigger className="w-[160px] border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grossQty">Gross Quantity</SelectItem>
                    <SelectItem value="grossAmount">Gross Amount</SelectItem>
                    <SelectItem value="netQty">Net Quantity</SelectItem>
                    <SelectItem value="netAmount">Net Amount</SelectItem>
                    <SelectItem value="returns">Returns</SelectItem>
                    <SelectItem value="returnAmount">Return Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
              <tr>
                <th className="py-3 px-4 text-left font-semibold text-gray-700 sticky left-0 bg-gray-50 z-10 border-r border-gray-200 min-w-[140px]">
                  {viewBy === "channel" ? "Channel" : viewBy === "sku" ? "SKU" : "Order ID"}
                </th>
                {breakdownData.dates.map((date, idx) => (
                  <th key={idx} className="py-3 px-4 text-right font-semibold text-gray-700 whitespace-nowrap min-w-[100px]">
                    {date}
                  </th>
                ))}
                <th className="py-3 px-4 text-right font-semibold text-gray-700 sticky right-0 bg-gray-50 z-10 border-l border-gray-200 min-w-[120px]">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {breakdownData.rows.map((row, rowIdx) => (
                <tr key={rowIdx} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900 sticky left-0 bg-white z-10 border-r border-gray-200">
                    {viewBy === "channel" ? (
                      <span className="inline-flex items-center gap-1.5">
                        <ChannelIcon channel={row} size="xs" />
                        {row}
                      </span>
                    ) : (
                      row
                    )}
                  </td>
                  {breakdownData.data[row].map((value, colIdx) => (
                    <td key={colIdx} className="py-3 px-4 text-right text-gray-900 whitespace-nowrap">
                      {formatValue(value)}
                    </td>
                  ))}
                  <td className="py-3 px-4 text-right font-semibold text-gray-900 sticky right-0 bg-gray-50 z-10 border-l border-gray-200">
                    {formatValue(rowTotals[rowIdx])}
                  </td>
                </tr>
              ))}
              {/* Total Row */}
              <tr className="bg-gray-100 border-t-2 border-gray-300">
                <td className="py-3 px-4 font-bold text-gray-900 sticky left-0 bg-gray-100 z-10 border-r border-gray-200">
                  Total
                </td>
                {columnTotals.map((total, idx) => (
                  <td key={idx} className="py-3 px-4 text-right font-bold text-gray-900 whitespace-nowrap">
                    {formatValue(total)}
                  </td>
                ))}
                <td className="py-3 px-4 text-right font-bold text-gray-900 sticky right-0 bg-gray-100 z-10 border-l border-gray-200">
                  {formatValue(grandTotal)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

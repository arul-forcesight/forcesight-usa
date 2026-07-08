import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { RotateCcw, TrendingDown, AlertCircle, CheckCircle, DollarSign, Package, Clock, XCircle } from "lucide-react";
import { ChannelIcon } from "./ChannelBadge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, LineChart, Line, ComposedChart } from "recharts";

interface ReturnsAnalyticsProps {
  data: any;
}

const returnReasons = [
  { reason: "Size Issues", count: 234, percentage: 42, color: "#3b82f6" },
  { reason: "Product Damage", count: 156, percentage: 28, color: "#ef4444" },
  { reason: "Changed Mind", count: 112, percentage: 20, color: "#f59e0b" },
  { reason: "Wrong Item", count: 56, percentage: 10, color: "#8b5cf6" },
];

const returnTrend = [
  { date: "Oct 15", returns: 45, rate: 3.2, refunds: 2345, restocked: 32 },
  { date: "Oct 16", returns: 52, rate: 3.5, refunds: 2678, restocked: 38 },
  { date: "Oct 17", returns: 48, rate: 3.1, refunds: 2456, restocked: 36 },
  { date: "Oct 18", returns: 39, rate: 2.8, refunds: 1989, restocked: 29 },
  { date: "Oct 19", returns: 43, rate: 2.9, refunds: 2234, restocked: 31 },
  { date: "Oct 20", returns: 37, rate: 2.6, refunds: 1898, restocked: 28 },
  { date: "Oct 21", returns: 42, rate: 2.8, refunds: 2145, restocked: 30 },
];

const categoryReturns = [
  { category: "Electronics", returns: 89, rate: 3.8, value: 8234, restockRate: 68 },
  { category: "Clothing", returns: 156, rate: 5.2, value: 12456, restockRate: 82 },
  { category: "Home & Garden", returns: 67, rate: 2.9, value: 4567, restockRate: 75 },
  { category: "Sports", returns: 45, rate: 3.1, value: 3597, restockRate: 71 },
];

const returnTimeframe = [
  { days: "0-7 days", count: 223, percentage: 40 },
  { days: "8-14 days", count: 195, percentage: 35 },
  { days: "15-21 days", count: 90, percentage: 16 },
  { days: "22-30 days", count: 50, percentage: 9 },
];

const channelReturns = [
  { channel: "Amazon", returns: 189, rate: 3.5, value: 9234 },
  { channel: "Shopify", returns: 145, rate: 2.8, value: 7456 },
  { channel: "Walmart", returns: 134, rate: 3.2, value: 6789 },
  { channel: "eBay", returns: 90, rate: 4.1, value: 5375 },
];

export function ReturnsAnalytics({ data }: ReturnsAnalyticsProps) {
  const totalReturns = categoryReturns.reduce((sum, c) => sum + c.returns, 0);
  const totalValue = categoryReturns.reduce((sum, c) => sum + c.value, 0);
  const avgRestockRate = categoryReturns.reduce((sum, c) => sum + c.restockRate, 0) / categoryReturns.length;

  return (
    <div className="space-y-6">
      {/* Key Metrics Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border border-gray-200 bg-gradient-to-br from-red-50 to-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Returns</p>
              <h3 className="text-gray-900">{totalReturns}</h3>
              <div className="flex items-center gap-1 mt-2">
                <TrendingDown className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">-8.2%</span>
              </div>
            </div>
            <div className="p-2 bg-red-500 rounded-lg">
              <RotateCcw className="w-4 h-4 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-4 border border-gray-200 bg-gradient-to-br from-orange-50 to-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Return Rate</p>
              <h3 className="text-gray-900">2.9%</h3>
              <div className="flex items-center gap-1 mt-2">
                <TrendingDown className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">-0.4%</span>
              </div>
            </div>
            <div className="p-2 bg-orange-500 rounded-lg">
              <AlertCircle className="w-4 h-4 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-4 border border-gray-200 bg-gradient-to-br from-purple-50 to-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Refund Amount</p>
              <h3 className="text-gray-900">${totalValue.toLocaleString()}</h3>
              <div className="flex items-center gap-1 mt-2">
                <TrendingDown className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">-12.3%</span>
              </div>
            </div>
            <div className="p-2 bg-purple-500 rounded-lg">
              <DollarSign className="w-4 h-4 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-4 border border-gray-200 bg-gradient-to-br from-green-50 to-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Restocked</p>
              <h3 className="text-gray-900">412</h3>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-xs text-green-600">73.8%</span>
              </div>
            </div>
            <div className="p-2 bg-green-500 rounded-lg">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Key Metrics Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border border-gray-200 bg-gradient-to-br from-blue-50 to-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg Return Value</p>
              <h3 className="text-gray-900">${(totalValue / totalReturns).toFixed(2)}</h3>
              <div className="flex items-center gap-1 mt-2">
                <TrendingDown className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">-4.5%</span>
              </div>
            </div>
            <div className="p-2 bg-blue-500 rounded-lg">
              <DollarSign className="w-4 h-4 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-4 border border-gray-200 bg-gradient-to-br from-teal-50 to-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg Processing Time</p>
              <h3 className="text-gray-900">2.3 days</h3>
              <div className="flex items-center gap-1 mt-2">
                <TrendingDown className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">-0.8 days</span>
              </div>
            </div>
            <div className="p-2 bg-teal-500 rounded-lg">
              <Clock className="w-4 h-4 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-4 border border-gray-200 bg-gradient-to-br from-pink-50 to-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Write-offs</p>
              <h3 className="text-gray-900">146</h3>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-xs text-red-600">26.2%</span>
              </div>
            </div>
            <div className="p-2 bg-pink-500 rounded-lg">
              <XCircle className="w-4 h-4 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-4 border border-gray-200 bg-gradient-to-br from-indigo-50 to-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Restock Rate</p>
              <h3 className="text-gray-900">{avgRestockRate.toFixed(1)}%</h3>
              <div className="flex items-center gap-1 mt-2">
                <TrendingDown className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">+5.2%</span>
              </div>
            </div>
            <div className="p-2 bg-indigo-500 rounded-lg">
              <Package className="w-4 h-4 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Return Trend */}
      <Card className="p-6 border border-gray-200">
        <div className="mb-4">
          <h4>Return Trend (Last 7 Days)</h4>
          <p className="text-sm text-muted-foreground mt-1">Daily return volume, rate, and refunds</p>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={returnTrend}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="date" className="text-xs" />
            <YAxis yAxisId="left" className="text-xs" />
            <YAxis yAxisId="right" orientation="right" className="text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="returns" fill="#ef4444" name="Returns" />
            <Line yAxisId="right" type="monotone" dataKey="rate" stroke="#f59e0b" strokeWidth={2} name="Return Rate (%)" />
            <Line yAxisId="left" type="monotone" dataKey="restocked" stroke="#10b981" strokeWidth={2} name="Restocked" />
          </ComposedChart>
        </ResponsiveContainer>
      </Card>

      {/* Return Reasons & Category Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border border-gray-200">
          <div className="mb-4">
            <h4>Return Reasons</h4>
            <p className="text-sm text-muted-foreground mt-1">Why customers return products</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={returnReasons}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ reason, percentage }) => `${reason}: ${percentage}%`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="count"
              >
                {returnReasons.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="mb-4">
            <h4>Returns by Category</h4>
            <p className="text-sm text-muted-foreground mt-1">Return rate across product categories</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={categoryReturns}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="category" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="rate" fill="#ef4444" name="Return Rate (%)" />
              <Bar dataKey="restockRate" fill="#10b981" name="Restock Rate (%)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Return Timeframe & Channel Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border border-gray-200">
          <div className="mb-4">
            <h4>Return Timeframe Distribution</h4>
            <p className="text-sm text-muted-foreground mt-1">When customers initiate returns after purchase</p>
          </div>
          <div className="space-y-3 mt-4">
            {returnTimeframe.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-700">{item.days}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{item.count} returns</span>
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                      {item.percentage}%
                    </Badge>
                  </div>
                </div>
                <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-blue-500 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="mb-4">
            <h4>Returns by Channel</h4>
            <p className="text-sm text-muted-foreground mt-1">Return performance across sales channels</p>
          </div>
          <div className="space-y-3">
            {channelReturns.map((channel, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center gap-1.5 font-medium text-gray-900">
                    <ChannelIcon channel={channel.channel} size="xs" />
                    {channel.channel}
                  </span>
                  <Badge
                    className={
                      channel.rate < 3.0
                        ? "bg-green-100 text-green-700 border-green-200"
                        : channel.rate < 3.5
                        ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                        : "bg-red-100 text-red-700 border-red-200"
                    }
                  >
                    {channel.rate}% Rate
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-600">Returns</p>
                    <p className="font-medium">{channel.returns}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Value</p>
                    <p className="font-medium">${channel.value.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 border border-gray-200">
          <h4 className="mb-4">Return Reason Breakdown</h4>
          <div className="space-y-3">
            {returnReasons.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-700">{item.reason}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{item.count} returns</span>
                    <Badge className="bg-gray-100 text-gray-700 border-gray-200">
                      {item.percentage}%
                    </Badge>
                  </div>
                </div>
                <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full rounded-full"
                    style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <h4 className="mb-4">Return Insights & Benchmarks</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div>
                <p className="text-sm text-gray-600">Lowest Return Category</p>
                <p className="font-semibold text-gray-900">Home & Garden (2.9%)</p>
              </div>
              <Badge className="bg-green-100 text-green-700 border-green-200">Best</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
              <div>
                <p className="text-sm text-gray-600">Highest Return Category</p>
                <p className="font-semibold text-gray-900">Clothing (5.2%)</p>
              </div>
              <Badge className="bg-red-100 text-red-700 border-red-200">Action Needed</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div>
                <p className="text-sm text-gray-600">Fastest Processing</p>
                <p className="font-semibold text-gray-900">2.3 days</p>
              </div>
              <Badge className="bg-blue-100 text-blue-700 border-blue-200">Fast</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div>
                <p className="text-sm text-gray-600">Best Restock Rate</p>
                <p className="font-semibold text-gray-900">Clothing (82%)</p>
              </div>
              <Badge className="bg-purple-100 text-purple-700 border-purple-200">Excellent</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
              <div>
                <p className="text-sm text-gray-600">Lowest Channel Return Rate</p>
                <p className="inline-flex items-center gap-1.5 font-semibold text-gray-900">
                  <ChannelIcon channel="Shopify" size="xs" />
                  Shopify (2.8%)
                </p>
              </div>
              <Badge className="bg-orange-100 text-orange-700 border-orange-200">Top</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg border border-teal-200">
              <div>
                <p className="text-sm text-gray-600">Return Window Compliance</p>
                <p className="font-semibold text-gray-900">91.2%</p>
              </div>
              <Badge className="bg-teal-100 text-teal-700 border-teal-200">Good</Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="p-6 border border-blue-200 bg-gradient-to-r from-blue-50 to-white">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-500 rounded-lg">
            <AlertCircle className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-gray-900 mb-2">AI-Powered Recommendations to Reduce Returns</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span><strong>Size Issues (42%):</strong> Implement AI-powered size recommendation engine and add detailed size charts with customer measurements for clothing items</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span><strong>Product Damage (28%):</strong> Enhance packaging quality standards, conduct carrier performance audit, and implement photo verification at packaging stage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span><strong>Changed Mind (20%):</strong> Improve product descriptions with 360° views, add AR try-on features, and include verified customer reviews with photos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span><strong>Wrong Item (10%):</strong> Implement barcode scanning at fulfillment centers and add photo verification before shipment to reduce picking errors</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

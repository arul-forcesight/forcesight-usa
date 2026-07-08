import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { TrendingUp, TrendingDown, DollarSign, CreditCard, Percent, Calendar, PiggyBank, Wallet, ShoppingCart, Target, Sparkles, ArrowRight, TrendingDownIcon, PackageIcon, PercentIcon, DollarSignIcon, Lightbulb, AlertCircle } from "lucide-react";
import { ChannelIcon } from "./ChannelBadge";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell, LineChart, Line } from "recharts";

interface FinanceAnalyticsProps {
  data: any;
}

const revenueData = [
  { date: "Oct 15", revenue: 12400, profit: 4960, cost: 7440, netProfit: 3472 },
  { date: "Oct 16", revenue: 15600, profit: 6240, cost: 9360, netProfit: 4368 },
  { date: "Oct 17", revenue: 18900, profit: 7560, cost: 11340, netProfit: 5292 },
  { date: "Oct 18", revenue: 16200, profit: 6480, cost: 9720, netProfit: 4536 },
  { date: "Oct 19", revenue: 21500, profit: 8600, cost: 12900, netProfit: 6020 },
  { date: "Oct 20", revenue: 24300, profit: 9720, cost: 14580, netProfit: 6804 },
  { date: "Oct 21", revenue: 22100, profit: 8840, cost: 13260, netProfit: 6188 },
];

const cashFlowData = [
  { month: "Jun", inflow: 145000, outflow: 98000, net: 47000 },
  { month: "Jul", inflow: 168000, outflow: 112000, net: 56000 },
  { month: "Aug", inflow: 189000, outflow: 125000, net: 64000 },
  { month: "Sep", inflow: 212000, outflow: 138000, net: 74000 },
  { month: "Oct", inflow: 245000, outflow: 156000, net: 89000 },
];

const profitabilityData = [
  { name: "COGS", value: 456789, color: "#3b82f6" },
  { name: "Shipping", value: 123456, color: "#8b5cf6" },
  { name: "Fees", value: 89012, color: "#f59e0b" },
  { name: "Ad Spend", value: 67890, color: "#ec4899" },
  { name: "Other", value: 45678, color: "#6b7280" },
  { name: "Net Profit", value: 320987, color: "#10b981" },
];

const kpiTrendData = [
  { month: "Jun", grossMargin: 38.5, netMargin: 24.2, roi: 165, roas: 11.8 },
  { month: "Jul", grossMargin: 39.8, netMargin: 25.5, roi: 172, roas: 12.1 },
  { month: "Aug", grossMargin: 40.2, netMargin: 26.1, roi: 178, roas: 12.3 },
  { month: "Sep", grossMargin: 41.5, netMargin: 27.3, roi: 183, roas: 12.4 },
  { month: "Oct", grossMargin: 42.3, netMargin: 28.1, roi: 187, roas: 12.5 },
];

export function FinanceAnalytics({ data }: FinanceAnalyticsProps) {
  return (
    <div className="space-y-6">
      {/* Key Metrics Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border border-gray-200 bg-gradient-to-br from-blue-50 to-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
              <h3 className="text-gray-900">${(data.revenue || 1234567).toLocaleString()}</h3>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">+12.5%</span>
              </div>
            </div>
            <div className="p-2 bg-blue-500 rounded-lg">
              <DollarSign className="w-4 h-4 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-4 border border-gray-200 bg-gradient-to-br from-green-50 to-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Gross Profit</p>
              <h3 className="text-gray-900">${(data.profit || 522263).toLocaleString()}</h3>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">+8.3%</span>
              </div>
            </div>
            <div className="p-2 bg-green-500 rounded-lg">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-4 border border-gray-200 bg-gradient-to-br from-purple-50 to-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Net Profit</p>
              <h3 className="text-gray-900">${(data.netProfit || 320987).toLocaleString()}</h3>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">+15.7%</span>
              </div>
            </div>
            <div className="p-2 bg-purple-500 rounded-lg">
              <Wallet className="w-4 h-4 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-4 border border-gray-200 bg-gradient-to-br from-orange-50 to-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">COGS</p>
              <h3 className="text-gray-900">${(data.cogs || 617284).toLocaleString()}</h3>
              <div className="flex items-center gap-1 mt-2">
                <TrendingDown className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">-2.1%</span>
              </div>
            </div>
            <div className="p-2 bg-orange-500 rounded-lg">
              <ShoppingCart className="w-4 h-4 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Key Metrics Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border border-gray-200 bg-gradient-to-br from-teal-50 to-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Gross Margin</p>
              <h3 className="text-gray-900">{(data.margin || 42.3).toFixed(1)}%</h3>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">+2.1%</span>
              </div>
            </div>
            <div className="p-2 bg-teal-500 rounded-lg">
              <Percent className="w-4 h-4 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-4 border border-gray-200 bg-gradient-to-br from-pink-50 to-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Net Margin</p>
              <h3 className="text-gray-900">28.1%</h3>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">+3.8%</span>
              </div>
            </div>
            <div className="p-2 bg-pink-500 rounded-lg">
              <Target className="w-4 h-4 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-4 border border-gray-200 bg-gradient-to-br from-indigo-50 to-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">ROI</p>
              <h3 className="text-gray-900">187%</h3>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">+14.2%</span>
              </div>
            </div>
            <div className="p-2 bg-indigo-500 rounded-lg">
              <PiggyBank className="w-4 h-4 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-4 border border-gray-200 bg-gradient-to-br from-cyan-50 to-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg Order Value</p>
              <h3 className="text-gray-900">${(data.aov || 144.56).toFixed(2)}</h3>
              <div className="flex items-center gap-1 mt-2">
                <TrendingDown className="w-3 h-3 text-red-600" />
                <span className="text-xs text-red-600">-3.2%</span>
              </div>
            </div>
            <div className="p-2 bg-cyan-500 rounded-lg">
              <CreditCard className="w-4 h-4 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Unit Economics & AI Insights Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Unit Economics & P&L Breakdown */}
        <Card className="border border-gray-200">
          <div className="p-5">
            <h4 className="mb-4">Channel & P&L Summary</h4>
            
            {/* Unit-Level Metrics */}
            <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-200">
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-600 mb-1">Total Units Sold</p>
                <p className="text-lg font-semibold text-gray-900">28,854</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-600 mb-1">Avg Price per Unit</p>
                <p className="text-lg font-semibold text-gray-900">$82.58</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-600 mb-1">Avg Cost per Unit</p>
                <p className="text-lg font-semibold text-gray-900">$42.15</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-600 mb-1">Avg Profit per Unit</p>
                <p className="text-lg font-semibold text-gray-900">$32.94</p>
              </div>
            </div>

            {/* Profit Breakdown Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-left py-2 px-2 text-xs text-gray-700">Line Item</th>
                    <th className="text-right py-2 px-2 text-xs text-gray-700">Amount</th>
                    <th className="text-right py-2 px-2 text-xs text-gray-700">%</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {/* Gross Sales */}
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-2 font-semibold text-gray-900">Gross Sales</td>
                    <td className="py-2 px-2 text-right font-semibold text-gray-900">$2,384,291</td>
                    <td className="py-2 px-2 text-right text-gray-600">100.0%</td>
                  </tr>

                  {/* Returns & Refunds */}
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-2 pl-4 text-gray-700">Returns & Refunds</td>
                    <td className="py-2 px-2 text-right text-gray-900">-$140,000</td>
                    <td className="py-2 px-2 text-right text-gray-600">5.9%</td>
                  </tr>

                  {/* Net Sales */}
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="py-2 px-2 font-semibold text-gray-900">Net Sales</td>
                    <td className="py-2 px-2 text-right font-semibold text-gray-900">$2,244,291</td>
                    <td className="py-2 px-2 text-right text-gray-600">94.1%</td>
                  </tr>

                  {/* COGS */}
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-2 pl-4 text-gray-700">COGS</td>
                    <td className="py-2 px-2 text-right text-gray-900">-$1,216,000</td>
                    <td className="py-2 px-2 text-right text-gray-600">51.0%</td>
                  </tr>

                  {/* Gross Profit */}
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="py-2 px-2 font-semibold text-gray-900">Gross Profit</td>
                    <td className="py-2 px-2 text-right font-semibold text-gray-900">$1,028,291</td>
                    <td className="py-2 px-2 text-right text-gray-600">43.1%</td>
                  </tr>

                  {/* Operating Expenses Header */}
                  <tr className="bg-gray-100">
                    <td colSpan={3} className="py-1.5 px-2 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Operating Expenses
                    </td>
                  </tr>

                  {/* Marketing & Ad Spend */}
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-2 pl-4 text-gray-700">Marketing & Ads</td>
                    <td className="py-2 px-2 text-right text-gray-900">-$334,000</td>
                    <td className="py-2 px-2 text-right text-gray-600">14.0%</td>
                  </tr>

                  {/* Fulfillment & Shipping */}
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-2 pl-4 text-gray-700">Fulfillment & Shipping</td>
                    <td className="py-2 px-2 text-right text-gray-900">-$190,000</td>
                    <td className="py-2 px-2 text-right text-gray-600">8.0%</td>
                  </tr>

                  {/* Platform Fees */}
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-2 pl-4 text-gray-700">Platform Fees</td>
                    <td className="py-2 px-2 text-right text-gray-900">-$286,000</td>
                    <td className="py-2 px-2 text-right text-gray-600">12.0%</td>
                  </tr>

                  {/* Payment Processing */}
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-2 pl-4 text-gray-700">Payment Processing</td>
                    <td className="py-2 px-2 text-right text-gray-900">-$67,000</td>
                    <td className="py-2 px-2 text-right text-gray-600">2.8%</td>
                  </tr>

                  {/* Other Operating */}
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-2 pl-4 text-gray-700">Other Operating</td>
                    <td className="py-2 px-2 text-right text-gray-900">-$100,757</td>
                    <td className="py-2 px-2 text-right text-gray-600">4.2%</td>
                  </tr>

                  {/* Net Profit */}
                  <tr className="border-t-2 border-gray-300 bg-gray-50">
                    <td className="py-2.5 px-2 font-bold text-gray-900">Net Profit</td>
                    <td className="py-2.5 px-2 text-right font-bold text-gray-900">$950,534</td>
                    <td className="py-2.5 px-2 text-right font-bold text-gray-900">39.9%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* Helix AI Insights */}
        <Card className="border border-blue-200 bg-gradient-to-br from-blue-50/30 to-white">
          <div className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-gray-900">Helix AI Insights</h4>
                <p className="text-xs text-gray-600">Strategic Recommendations</p>
              </div>
            </div>

            <div className="space-y-3">
              {/* Insight 1 */}
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <PercentIcon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 mb-1">Reduce Platform Fees</p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Marketplace fees at 12% ($286K). Negotiate better rates or shift volume to Shopify with 45.1% margin vs 38-42% on marketplaces.
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="outline" className="text-xs border-blue-200 text-blue-700">Potential: +$50K</Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Insight 2 */}
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-orange-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 mb-1">Optimize Ad Spend</p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      ROAS is strong at 12.5x, but reduce spend on underperforming SKUs and reallocate to top 12 performers driving 78% of revenue.
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="outline" className="text-xs border-orange-200 text-orange-700">Efficiency +15%</Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Insight 3 */}
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <PackageIcon className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 mb-1">Lower Fulfillment Costs</p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      FBA fees rose 8% MoM, reducing margin by -2%. Review dimensional weight pricing and consider 3PL alternatives for oversized items.
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="outline" className="text-xs border-purple-200 text-purple-700">Margin Impact -2%</Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Insight 4 */}
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Target className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 mb-1">Target 42% Net Margin</p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Currently at 39.9% net margin. Implementing optimizations above can reach 42% margin (+$50K/month) at current volume.
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="outline" className="text-xs border-green-200 text-green-700">Goal: 42%</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2">
                <Lightbulb className="w-4 h-4" />
                Get Detailed Action Plan
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Revenue & Profit Trend */}
      <Card className="p-6 border border-gray-200">
        <div className="mb-4">
          <h4 className="flex items-center gap-2">
            Revenue & Profit Trend (Last 7 Days)
          </h4>
          <p className="text-sm text-muted-foreground mt-1">Daily revenue, gross profit, and net profit breakdown</p>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorNetProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="date" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorRevenue)"
              strokeWidth={2}
              name="Revenue"
            />
            <Area
              type="monotone"
              dataKey="profit"
              stroke="#10b981"
              fillOpacity={1}
              fill="url(#colorProfit)"
              strokeWidth={2}
              name="Gross Profit"
            />
            <Area
              type="monotone"
              dataKey="netProfit"
              stroke="#8b5cf6"
              fillOpacity={1}
              fill="url(#colorNetProfit)"
              strokeWidth={2}
              name="Net Profit"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Financial KPIs Trend */}
      <Card className="p-6 border border-gray-200">
        <div className="mb-4">
          <h4>Financial KPIs Trend</h4>
          <p className="text-sm text-muted-foreground mt-1">Key performance indicators over time</p>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={kpiTrendData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="month" className="text-xs" />
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
            <Line yAxisId="left" type="monotone" dataKey="grossMargin" stroke="#10b981" strokeWidth={2} name="Gross Margin %" />
            <Line yAxisId="left" type="monotone" dataKey="netMargin" stroke="#8b5cf6" strokeWidth={2} name="Net Margin %" />
            <Line yAxisId="right" type="monotone" dataKey="roi" stroke="#f59e0b" strokeWidth={2} name="ROI %" />
            <Line yAxisId="right" type="monotone" dataKey="roas" stroke="#ec4899" strokeWidth={2} name="ROAS" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Cash Flow Analysis and Profitability Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border border-gray-200">
          <div className="mb-4">
            <h4 className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Cash Flow Analysis
            </h4>
            <p className="text-sm text-muted-foreground mt-1">Monthly inflow vs outflow</p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="inflow" fill="#10b981" name="Cash Inflow" />
              <Bar dataKey="outflow" fill="#ef4444" name="Cash Outflow" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="mb-4">
            <h4>Revenue Alocation By Cost Center</h4>
            <p className="text-sm text-muted-foreground mt-1">Revenue allocation by category</p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={profitabilityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {profitabilityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => `$${value.toLocaleString()}`}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Payout Conversion Timeline */}
      <Card className="p-6 border border-gray-200">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-blue-600" />
                Payout Conversion Timeline
              </h4>
              <p className="text-sm text-muted-foreground mt-1">Expected payout days vs actual delays by channel</p>
            </div>
            <Badge className="bg-blue-100 text-blue-700 border-blue-200">
              Avg: 14 days
            </Badge>
          </div>
        </div>

        {/* Timeline Visualization */}
        <div className="space-y-4">
          {/* Amazon Timeline */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-900">
                <ChannelIcon channel="Amazon" size="xs" />
                Amazon
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600">Expected: 14d</span>
                <span className="text-xs text-green-600">Actual: 14d</span>
                <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">On Time</Badge>
              </div>
            </div>
            <div className="relative h-10 bg-gray-100 rounded-lg overflow-hidden">
              <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-400 to-green-500 rounded-lg flex items-center justify-between px-3" style={{ width: "46.67%" }}>
                <span className="text-xs font-medium text-white">Day 0</span>
                <span className="text-xs font-medium text-white">Day 14</span>
              </div>
              <div className="absolute top-0 h-full border-l-2 border-dashed border-gray-400" style={{ left: "46.67%" }}></div>
              <span className="absolute top-1/2 -translate-y-1/2 text-xs text-gray-500" style={{ left: "50%" }}>30 days max</span>
            </div>
          </div>

          {/* Walmart Timeline */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-900">
                <ChannelIcon channel="Walmart" size="xs" />
                Walmart
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600">Expected: 14d</span>
                <span className="text-xs text-orange-600">Actual: 21d</span>
                <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs">+7d delay</Badge>
              </div>
            </div>
            <div className="relative h-10 bg-gray-100 rounded-lg overflow-hidden">
              <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-400 to-green-500 rounded-lg flex items-center px-3" style={{ width: "46.67%" }}>
                <span className="text-xs font-medium text-white">Day 0</span>
              </div>
              <div className="absolute top-0 h-full bg-gradient-to-r from-orange-400 to-orange-500 flex items-center justify-end px-3" style={{ left: "46.67%", width: "23.33%" }}>
                <span className="text-xs font-medium text-white">Day 21</span>
              </div>
              <div className="absolute top-0 h-full border-l-2 border-dashed border-gray-400" style={{ left: "46.67%" }}></div>
              <span className="absolute top-1/2 -translate-y-1/2 text-xs text-gray-500" style={{ left: "73%" }}>30 days max</span>
            </div>
          </div>

          {/* Shopify Timeline */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-900">
                <ChannelIcon channel="Shopify" size="xs" />
                Shopify
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600">Expected: 3d</span>
                <span className="text-xs text-green-600">Actual: 3d</span>
                <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">On Time</Badge>
              </div>
            </div>
            <div className="relative h-10 bg-gray-100 rounded-lg overflow-hidden">
              <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-400 to-green-500 rounded-lg flex items-center justify-between px-3" style={{ width: "10%" }}>
                <span className="text-xs font-medium text-white">Day 0</span>
                <span className="text-xs font-medium text-white">3d</span>
              </div>
              <div className="absolute top-0 h-full border-l-2 border-dashed border-gray-400" style={{ left: "10%" }}></div>
              <span className="absolute top-1/2 -translate-y-1/2 text-xs text-gray-500" style={{ left: "50%" }}>30 days max</span>
            </div>
          </div>

          {/* eBay Timeline */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-900">
                <ChannelIcon channel="eBay" size="xs" />
                eBay
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600">Expected: 1d</span>
                <span className="text-xs text-green-600">Actual: 1d</span>
                <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">On Time</Badge>
              </div>
            </div>
            <div className="relative h-10 bg-gray-100 rounded-lg overflow-hidden">
              <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-400 to-green-500 rounded-lg flex items-center justify-between px-3" style={{ width: "3.33%" }}>
                <span className="text-xs font-medium text-white">0</span>
                <span className="text-xs font-medium text-white">1d</span>
              </div>
              <div className="absolute top-0 h-full border-l-2 border-dashed border-gray-400" style={{ left: "3.33%" }}></div>
              <span className="absolute top-1/2 -translate-y-1/2 text-xs text-gray-500" style={{ left: "50%" }}>30 days max</span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-green-500 rounded"></div>
            <span className="text-gray-600">On-time / Expected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-r from-orange-400 to-orange-500 rounded"></div>
            <span className="text-gray-600">Delayed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-dashed border-gray-400 rounded"></div>
            <span className="text-gray-600">Expected timeline</span>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <p className="text-xs text-gray-600 mb-1">On-Time Payouts</p>
            <p className="font-semibold text-gray-900">87.3%</p>
            <p className="text-xs text-green-600 mt-1">$1,829,891</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <p className="text-xs text-gray-600 mb-1">Delayed Payouts</p>
            <p className="font-semibold text-gray-900">12.7%</p>
            <p className="text-xs text-orange-600 mt-1">$265,276</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-xs text-gray-600 mb-1">Avg Delay Impact</p>
            <p className="font-semibold text-gray-900">+5.2 days</p>
            <p className="text-xs text-gray-600 mt-1">For delayed orders</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <p className="text-xs text-gray-600 mb-1">Working Capital</p>
            <p className="font-semibold text-gray-900">$149,124</p>
            <p className="text-xs text-gray-600 mt-1">Tied up in delays</p>
          </div>
        </div>
      </Card>

      {/* Cost Breakdown and Financial Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 border border-gray-200">
          <h4 className="mb-4">Detailed Cost Breakdown</h4>
          <div className="space-y-3">
            {[
              { name: "Cost of Goods Sold", amount: 617284, percentage: 50, color: "bg-blue-500" },
              { name: "Shipping & Handling", amount: 111394, percentage: 9, color: "bg-purple-500" },
              { name: "Platform Fees", amount: 148148, percentage: 12, color: "bg-orange-500" },
              { name: "Marketing & Ad Spend", amount: 222588, percentage: 18, color: "bg-pink-500" },
              { name: "Returns & Refunds", amount: 24691, percentage: 2, color: "bg-red-500" },
              { name: "Other Operating Expenses", amount: 61857, percentage: 5, color: "bg-gray-500" },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-700">{item.name}</span>
                  <span className="text-sm font-medium">${item.amount.toLocaleString()}</span>
                </div>
                <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`absolute left-0 top-0 h-full ${item.color} rounded-full`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <h4 className="mb-4">Financial Highlights</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div>
                <p className="text-sm text-gray-600">Operating Profit</p>
                <p className="font-semibold text-gray-900">$345,678</p>
              </div>
              <Badge className="bg-green-100 text-green-700 border-green-200">+15.2%</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div>
                <p className="text-sm text-gray-600">EBITDA</p>
                <p className="font-semibold text-gray-900">$298,456</p>
              </div>
              <Badge className="bg-blue-100 text-blue-700 border-blue-200">+12.8%</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div>
                <p className="text-sm text-gray-600">ROAS</p>
                <p className="font-semibold text-gray-900">12.5x</p>
              </div>
              <Badge className="bg-purple-100 text-purple-700 border-purple-200">Excellent</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
              <div>
                <p className="text-sm text-gray-600">Break-even Point</p>
                <p className="font-semibold text-gray-900">$567,890</p>
              </div>
              <Badge className="bg-orange-100 text-orange-700 border-orange-200">Achieved</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg border border-teal-200">
              <div>
                <p className="text-sm text-gray-600">Customer LTV</p>
                <p className="font-semibold text-gray-900">$1,247</p>
              </div>
              <Badge className="bg-teal-100 text-teal-700 border-teal-200">+18.9%</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg border border-indigo-200">
              <div>
                <p className="text-sm text-gray-600">CAC Payback Period</p>
                <p className="font-semibold text-gray-900">2.3 months</p>
              </div>
              <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200">Strong</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

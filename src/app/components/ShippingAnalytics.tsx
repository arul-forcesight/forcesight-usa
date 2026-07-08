import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Truck, Clock, Package, MapPin, DollarSign, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, LineChart, Line, ComposedChart } from "recharts";

interface ShippingAnalyticsProps {
  data: any;
}

const deliveryTimes = [
  { carrier: "USPS", avgTime: 3.2, onTime: 94, cost: 4.20, volume: 1248 },
  { carrier: "FedEx", avgTime: 2.8, onTime: 97, cost: 6.80, volume: 832 },
  { carrier: "UPS", avgTime: 2.5, onTime: 96, cost: 6.50, volume: 654 },
  { carrier: "DHL", avgTime: 3.5, onTime: 92, cost: 7.20, volume: 238 },
];

const shippingCosts = [
  { zone: "Zone 1-3", cost: 3245, packages: 1234, avgCost: 2.63 },
  { zone: "Zone 4-5", cost: 4389, packages: 876, avgCost: 5.01 },
  { zone: "Zone 6-7", cost: 5456, packages: 543, avgCost: 10.05 },
  { zone: "Zone 8", cost: 3298, packages: 321, avgCost: 10.27 },
];

const carrierDistribution = [
  { name: "USPS", value: 42, color: "#3b82f6" },
  { name: "FedEx", value: 28, color: "#8b5cf6" },
  { name: "UPS", value: 22, color: "#10b981" },
  { name: "DHL", value: 8, color: "#f59e0b" },
];

const shippingTrend = [
  { date: "Oct 15", packages: 412, cost: 1924, avgTime: 3.1 },
  { date: "Oct 16", packages: 456, cost: 2156, avgTime: 3.0 },
  { date: "Oct 17", packages: 489, cost: 2389, avgTime: 2.9 },
  { date: "Oct 18", packages: 398, cost: 1876, avgTime: 3.2 },
  { date: "Oct 19", packages: 534, cost: 2598, avgTime: 2.8 },
  { date: "Oct 20", packages: 567, cost: 2876, avgTime: 2.7 },
  { date: "Oct 21", packages: 518, cost: 2569, avgTime: 2.9 },
];

const delayReasons = [
  { reason: "Weather", count: 45, percentage: 38 },
  { reason: "High Volume", count: 32, percentage: 27 },
  { reason: "Address Issues", count: 24, percentage: 20 },
  { reason: "Carrier Delays", count: 18, percentage: 15 },
];

export function ShippingAnalytics({ data }: ShippingAnalyticsProps) {
  const totalPackages = deliveryTimes.reduce((sum, c) => sum + c.volume, 0);
  const totalCost = shippingCosts.reduce((sum, z) => sum + z.cost, 0);
  const avgCostPerPackage = totalCost / shippingCosts.reduce((sum, z) => sum + z.packages, 0);

  return (
    <div className="space-y-6">
      {/* Key Metrics Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border border-gray-200 bg-gradient-to-br from-blue-50 to-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Shipments</p>
              <h3 className="text-gray-900">{totalPackages.toLocaleString()}</h3>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">+15.3%</span>
              </div>
            </div>
            <div className="p-2 bg-blue-500 rounded-lg">
              <Package className="w-4 h-4 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-4 border border-gray-200 bg-gradient-to-br from-green-50 to-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg Delivery Time</p>
              <h3 className="text-gray-900">2.9 days</h3>
              <div className="flex items-center gap-1 mt-2">
                <TrendingDown className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">-0.4 days</span>
              </div>
            </div>
            <div className="p-2 bg-green-500 rounded-lg">
              <Clock className="w-4 h-4 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-4 border border-gray-200 bg-gradient-to-br from-purple-50 to-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">On-Time Rate</p>
              <h3 className="text-gray-900">95.2%</h3>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">+2.1%</span>
              </div>
            </div>
            <div className="p-2 bg-purple-500 rounded-lg">
              <Truck className="w-4 h-4 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-4 border border-gray-200 bg-gradient-to-br from-orange-50 to-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Shipping Cost</p>
              <h3 className="text-gray-900">${totalCost.toLocaleString()}</h3>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3 text-red-600" />
                <span className="text-xs text-red-600">+5.7%</span>
              </div>
            </div>
            <div className="p-2 bg-orange-500 rounded-lg">
              <DollarSign className="w-4 h-4 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Key Metrics Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border border-gray-200 bg-gradient-to-br from-teal-50 to-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg Cost per Package</p>
              <h3 className="text-gray-900">${avgCostPerPackage.toFixed(2)}</h3>
              <div className="flex items-center gap-1 mt-2">
                <TrendingDown className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">-2.3%</span>
              </div>
            </div>
            <div className="p-2 bg-teal-500 rounded-lg">
              <DollarSign className="w-4 h-4 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-4 border border-gray-200 bg-gradient-to-br from-pink-50 to-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Delayed Shipments</p>
              <h3 className="text-gray-900">119</h3>
              <div className="flex items-center gap-1 mt-2">
                <TrendingDown className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">-18.7%</span>
              </div>
            </div>
            <div className="p-2 bg-pink-500 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-4 border border-gray-200 bg-gradient-to-br from-indigo-50 to-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Same-Day Shipping</p>
              <h3 className="text-gray-900">1,456</h3>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">+24.5%</span>
              </div>
            </div>
            <div className="p-2 bg-indigo-500 rounded-lg">
              <Clock className="w-4 h-4 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-4 border border-gray-200 bg-gradient-to-br from-cyan-50 to-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Tracking Accuracy</p>
              <h3 className="text-gray-900">98.7%</h3>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">+1.2%</span>
              </div>
            </div>
            <div className="p-2 bg-cyan-500 rounded-lg">
              <MapPin className="w-4 h-4 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Shipping Trend Over Time */}
      <Card className="p-6 border border-gray-200">
        <div className="mb-4">
          <h4>Shipping Performance Trend</h4>
          <p className="text-sm text-muted-foreground mt-1">Daily packages, costs, and delivery times</p>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={shippingTrend}>
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
            <Bar yAxisId="left" dataKey="packages" fill="#3b82f6" name="Packages" />
            <Line yAxisId="right" type="monotone" dataKey="avgTime" stroke="#10b981" strokeWidth={2} name="Avg Time (days)" />
            <Line yAxisId="left" type="monotone" dataKey="cost" stroke="#f59e0b" strokeWidth={2} name="Cost ($)" />
          </ComposedChart>
        </ResponsiveContainer>
      </Card>

      {/* Carrier Performance & Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border border-gray-200">
          <div className="mb-4">
            <h4>Carrier Performance Comparison</h4>
            <p className="text-sm text-muted-foreground mt-1">Delivery time and on-time rate by carrier</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={deliveryTimes}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="carrier" className="text-xs" />
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
              <Bar yAxisId="left" dataKey="avgTime" fill="#3b82f6" name="Avg Time (days)" />
              <Line yAxisId="right" type="monotone" dataKey="onTime" stroke="#10b981" strokeWidth={2} name="On-Time %" />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="mb-4">
            <h4>Carrier Distribution</h4>
            <p className="text-sm text-muted-foreground mt-1">Shipment volume by carrier</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={carrierDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {carrierDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Shipping Costs by Zone & Delay Reasons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border border-gray-200">
          <div className="mb-4">
            <h4>Shipping Costs by Zone</h4>
            <p className="text-sm text-muted-foreground mt-1">Cost analysis across shipping zones</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={shippingCosts}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="zone" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="cost" fill="#10b981" name="Total Cost ($)" />
              <Bar dataKey="packages" fill="#3b82f6" name="Packages" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="mb-4">
            <h4>Delay Reasons</h4>
            <p className="text-sm text-muted-foreground mt-1">Root causes of shipping delays</p>
          </div>
          <div className="space-y-3 mt-4">
            {delayReasons.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-700">{item.reason}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{item.count} delays</span>
                    <Badge className="bg-red-100 text-red-700 border-red-200">
                      {item.percentage}%
                    </Badge>
                  </div>
                </div>
                <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-red-500 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Detailed Carrier Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 border border-gray-200">
          <h4 className="mb-4">Detailed Carrier Metrics</h4>
          <div className="space-y-3">
            {deliveryTimes.map((carrier, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{carrier.carrier}</span>
                  <Badge
                    className={
                      carrier.onTime >= 95
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "bg-yellow-100 text-yellow-700 border-yellow-200"
                    }
                  >
                    {carrier.onTime}% On-Time
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="text-gray-600">Avg Time</p>
                    <p className="font-medium">{carrier.avgTime} days</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Avg Cost</p>
                    <p className="font-medium">${carrier.cost.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Volume</p>
                    <p className="font-medium">{carrier.volume.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <h4 className="mb-4">Shipping Insights & Benchmarks</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div>
                <p className="text-sm text-gray-600">Fastest Carrier</p>
                <p className="font-semibold text-gray-900">UPS (2.5 days)</p>
              </div>
              <Badge className="bg-blue-100 text-blue-700 border-blue-200">Best</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div>
                <p className="text-sm text-gray-600">Most Reliable</p>
                <p className="font-semibold text-gray-900">FedEx (97%)</p>
              </div>
              <Badge className="bg-green-100 text-green-700 border-green-200">Excellent</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div>
                <p className="text-sm text-gray-600">Most Cost Effective</p>
                <p className="font-semibold text-gray-900">USPS ($4.20)</p>
              </div>
              <Badge className="bg-purple-100 text-purple-700 border-purple-200">Economy</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
              <div>
                <p className="text-sm text-gray-600">Most Used</p>
                <p className="font-semibold text-gray-900">USPS (42%)</p>
              </div>
              <Badge className="bg-orange-100 text-orange-700 border-orange-200">Popular</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg border border-teal-200">
              <div>
                <p className="text-sm text-gray-600">Domestic Avg Transit</p>
                <p className="font-semibold text-gray-900">2.9 days</p>
              </div>
              <Badge className="bg-teal-100 text-teal-700 border-teal-200">Industry Avg</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg border border-indigo-200">
              <div>
                <p className="text-sm text-gray-600">Weekend Deliveries</p>
                <p className="font-semibold text-gray-900">487 packages</p>
              </div>
              <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200">Growing</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

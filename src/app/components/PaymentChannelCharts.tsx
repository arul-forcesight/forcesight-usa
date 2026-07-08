import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { AlertTriangle, Clock } from "lucide-react";
import { ChannelIcon } from "./ChannelBadge";

const channelPaymentData = [
  {
    channel: "Amazon",
    expected: 15477,
    received: 15400,
    pending: 77,
    color: "#FF9900",
  },
  {
    channel: "Shopify",
    expected: 4208,
    received: 4200,
    pending: 8,
    color: "#96BF48",
  },
  {
    channel: "Walmart",
    expected: 1629,
    received: 1600,
    pending: 29,
    color: "#0071CE",
  },
];

const overduePayouts = [
  {
    channel: "Walmart",
    orderId: "WMT-2143-042",
    amount: 95.00,
    daysOverdue: 3,
    payoutDate: "Oct 18, 2025",
  },
  {
    channel: "Amazon",
    orderId: "AMZ-2141-088",
    amount: 234.50,
    daysOverdue: 5,
    payoutDate: "Oct 16, 2025",
  },
];

export function PaymentChannelCharts() {
  const totalExpected = channelPaymentData.reduce((sum, ch) => sum + ch.expected, 0);
  const totalReceived = channelPaymentData.reduce((sum, ch) => sum + ch.received, 0);
  const totalPending = channelPaymentData.reduce((sum, ch) => sum + ch.pending, 0);
  const achievementRate = ((totalReceived / totalExpected) * 100).toFixed(1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Channel Payment Analytics Chart */}
      <Card className="border border-gray-200">
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Channel Payment Analytics</h3>
              <p className="text-sm text-gray-600 mt-1">Expected vs Received vs Pending</p>
            </div>
            <Badge className="bg-green-100 text-green-700 border-green-200">
              {achievementRate}% Received
            </Badge>
          </div>
          
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={channelPaymentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="channel" 
                tick={{ fontSize: 12 }}
                stroke="#6B7280"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="#6B7280"
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    // Payout delay mapping by channel
                    const payoutDelays: Record<string, number> = {
                      'Amazon': 14,
                      'Walmart': 21,
                      'Shopify': 3,
                      'eBay': 1
                    };
                    
                    const avgDelay = payoutDelays[label as string] || 0;
                    
                    return (
                      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
                        <p className="font-semibold text-gray-900 mb-2 inline-flex items-center gap-1.5">
                          <ChannelIcon channel={label as string} size="xs" />
                          {label}
                        </p>
                        {payload.map((entry: any, index: number) => (
                          <div key={index} className="flex items-center justify-between gap-4 mb-1">
                            <span className="text-xs text-gray-600">{entry.name}:</span>
                            <span className="text-xs font-semibold" style={{ color: entry.color }}>
                              ${entry.value.toLocaleString()}
                            </span>
                          </div>
                        ))}
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3 text-blue-600" />
                            <span className="text-xs text-gray-600">Avg Payout Delay:</span>
                            <span className="text-xs font-semibold text-blue-600">
                              {avgDelay} {avgDelay === 1 ? 'day' : 'days'}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend 
                wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
              />
              <Bar dataKey="expected" fill="#3B82F6" name="Expected" radius={[4, 4, 0, 0]} />
              <Bar dataKey="received" fill="#10B981" name="Received" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pending" fill="#F59E0B" name="Pending" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-1">Total Expected</p>
              <p className="text-lg font-semibold text-blue-600">
                ${totalExpected.toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-1">Total Received</p>
              <p className="text-lg font-semibold text-green-600">
                ${totalReceived.toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-1">Total Pending</p>
              <p className="text-lg font-semibold text-yellow-600">
                ${totalPending.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Missing/Overdue Payouts Mini Table */}
      <Card className="border border-red-200 bg-red-50/20">
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-red-900">Overdue Payouts</h3>
                <p className="text-sm text-gray-600 mt-1">Require immediate attention</p>
              </div>
            </div>
            <Badge className="bg-red-100 text-red-700 border-red-200">
              {overduePayouts.length} Issues
            </Badge>
          </div>

          {/* Mini Table */}
          <div className="bg-white rounded-lg border border-red-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-red-50 border-b border-red-100">
                <tr>
                  <th className="text-left p-3 text-xs uppercase tracking-wider text-gray-600">Channel</th>
                  <th className="text-left p-3 text-xs uppercase tracking-wider text-gray-600">Order ID</th>
                  <th className="text-right p-3 text-xs uppercase tracking-wider text-gray-600">Amount</th>
                  <th className="text-right p-3 text-xs uppercase tracking-wider text-gray-600">Overdue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {overduePayouts.map((payout, index) => (
                  <tr key={index} className="hover:bg-red-50/30">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <ChannelIcon channel={payout.channel} size="sm" />
                        <span className="text-sm font-medium">{payout.channel}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="text-sm font-mono">{payout.orderId}</span>
                    </td>
                    <td className="p-3 text-right">
                      <span className="text-sm font-semibold font-mono">
                        ${payout.amount.toFixed(2)}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <Badge className="bg-red-100 text-red-700 border-red-200 text-xs">
                        {payout.daysOverdue}d
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Additional Info */}
          <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-100">
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-red-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-red-900">Action Required</p>
                <p className="text-xs text-gray-600 mt-1">
                  2 payouts are overdue by 3+ days. Contact payment processors to resolve settlement delays.
                </p>
              </div>
            </div>
          </div>

          {/* Expected Payment Schedule */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm font-semibold text-blue-900 mb-2">Next Scheduled Payouts</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <ChannelIcon channel="Amazon" size="xs" />
                  <span className="text-gray-700">Amazon</span>
                </div>
                <span className="font-semibold text-gray-900">Thursday, Oct 24</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <ChannelIcon channel="Shopify" size="xs" />
                  <span className="text-gray-700">Shopify</span>
                </div>
                <span className="font-semibold text-gray-900">Monday, Oct 21</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <ChannelIcon channel="Walmart" size="xs" />
                  <span className="text-gray-700">Walmart</span>
                </div>
                <span className="font-semibold text-gray-900">Friday, Oct 25</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

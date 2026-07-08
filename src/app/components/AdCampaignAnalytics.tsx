import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Target, TrendingUp, MousePointerClick, DollarSign, Eye, Users, ShoppingBag } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, ComposedChart } from "recharts";
import { ChannelIcon } from "./ChannelBadge";

interface AdCampaignAnalyticsProps {
  data: any;
}

const campaignPerformance = [
  { date: "Oct 15", impressions: 12400, clicks: 620, conversions: 89, spend: 1240, revenue: 4896 },
  { date: "Oct 16", impressions: 15600, clicks: 780, conversions: 112, spend: 1560, revenue: 6160 },
  { date: "Oct 17", impressions: 18900, clicks: 945, conversions: 145, spend: 1890, revenue: 7990 },
  { date: "Oct 18", impressions: 16200, clicks: 810, conversions: 121, spend: 1620, revenue: 6655 },
  { date: "Oct 19", impressions: 21500, clicks: 1075, conversions: 178, spend: 2150, revenue: 9790 },
  { date: "Oct 20", impressions: 24300, clicks: 1215, conversions: 203, spend: 2430, revenue: 11165 },
  { date: "Oct 21", impressions: 22100, clicks: 1105, conversions: 189, spend: 2210, revenue: 10395 },
];

const roasData = [
  { campaign: "Google Ads", spend: 12500, revenue: 56200, roas: 4.5 },
  { campaign: "Facebook Ads", spend: 9800, revenue: 38400, roas: 3.9 },
  { campaign: "Amazon PPC", spend: 15600, revenue: 78900, roas: 5.1 },
  { campaign: "TikTok Ads", spend: 5400, revenue: 18900, roas: 3.5 },
];

const campaignTableData = [
  { 
    campaign: "Google Shopping - Electronics", 
    platform: "Google Ads",
    status: "active",
    impressions: 245678, 
    clicks: 12284, 
    ctr: 5.0,
    conversions: 2048, 
    conversionRate: 16.7,
    spend: 12500, 
    revenue: 56200, 
    cpc: 1.02,
    cpa: 6.10,
    roas: 4.5,
    profit: 27850,
    trend: "+12.3%"
  },
  { 
    campaign: "Amazon PPC - Best Sellers", 
    platform: "Amazon PPC",
    status: "active",
    impressions: 312456, 
    clicks: 15623, 
    ctr: 5.0,
    conversions: 2605, 
    conversionRate: 16.7,
    spend: 15600, 
    revenue: 78900, 
    cpc: 1.00,
    cpa: 5.99,
    roas: 5.1,
    profit: 39450,
    trend: "+18.7%"
  },
  { 
    campaign: "Facebook Dynamic Ads", 
    platform: "Facebook",
    status: "active",
    impressions: 189234, 
    clicks: 9462, 
    ctr: 5.0,
    conversions: 1578, 
    conversionRate: 16.7,
    spend: 9800, 
    revenue: 38400, 
    cpc: 1.04,
    cpa: 6.21,
    roas: 3.9,
    profit: 18620,
    trend: "+8.4%"
  },
  { 
    campaign: "TikTok Video Ads - Gen Z", 
    platform: "TikTok",
    status: "active",
    impressions: 456789, 
    clicks: 22839, 
    ctr: 5.0,
    conversions: 3807, 
    conversionRate: 16.7,
    spend: 5400, 
    revenue: 18900, 
    cpc: 0.24,
    cpa: 1.42,
    roas: 3.5,
    profit: 8505,
    trend: "+15.2%"
  },
  { 
    campaign: "Google Display Network", 
    platform: "Google Ads",
    status: "active",
    impressions: 567123, 
    clicks: 17014, 
    ctr: 3.0,
    conversions: 2382, 
    conversionRate: 14.0,
    spend: 8900, 
    revenue: 31150, 
    cpc: 0.52,
    cpa: 3.74,
    roas: 3.5,
    profit: 13360,
    trend: "+5.8%"
  },
  { 
    campaign: "Instagram Stories Campaign", 
    platform: "Meta",
    status: "active",
    impressions: 234567, 
    clicks: 11729, 
    ctr: 5.0,
    conversions: 1954, 
    conversionRate: 16.7,
    spend: 6700, 
    revenue: 25480, 
    cpc: 0.57,
    cpa: 3.43,
    roas: 3.8,
    profit: 11724,
    trend: "+22.1%"
  },
  { 
    campaign: "YouTube Pre-roll Ads", 
    platform: "Google Ads",
    status: "paused",
    impressions: 389456, 
    clicks: 7789, 
    ctr: 2.0,
    conversions: 1091, 
    conversionRate: 14.0,
    spend: 4200, 
    revenue: 10920, 
    cpc: 0.54,
    cpa: 3.85,
    roas: 2.6,
    profit: 4368,
    trend: "-3.2%"
  },
];

export function AdCampaignAnalytics({ data }: AdCampaignAnalyticsProps) {
  const totalSpend = campaignTableData.reduce((sum, c) => sum + c.spend, 0);
  const totalRevenue = campaignTableData.reduce((sum, c) => sum + c.revenue, 0);
  const totalProfit = campaignTableData.reduce((sum, c) => sum + c.profit, 0);
  const totalConversions = campaignTableData.reduce((sum, c) => sum + c.conversions, 0);
  const avgROAS = totalRevenue / totalSpend;

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border border-gray-200 bg-gradient-to-br from-blue-50 to-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Ad Spend</p>
              <h3 className="text-gray-900">${totalSpend.toLocaleString()}</h3>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">+8.2%</span>
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
              <p className="text-sm text-gray-600 mb-1">Ad Revenue</p>
              <h3 className="text-gray-900">${totalRevenue.toLocaleString()}</h3>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">+15.7%</span>
              </div>
            </div>
            <div className="p-2 bg-green-500 rounded-lg">
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-4 border border-gray-200 bg-gradient-to-br from-purple-50 to-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg ROAS</p>
              <h3 className="text-gray-900">{avgROAS.toFixed(2)}x</h3>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">+12.5%</span>
              </div>
            </div>
            <div className="p-2 bg-purple-500 rounded-lg">
              <Target className="w-4 h-4 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-4 border border-gray-200 bg-gradient-to-br from-orange-50 to-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Ad Profit</p>
              <h3 className="text-gray-900">${totalProfit.toLocaleString()}</h3>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">+18.3%</span>
              </div>
            </div>
            <div className="p-2 bg-orange-500 rounded-lg">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border border-gray-200 bg-gradient-to-br from-cyan-50 to-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Impressions</p>
              <h3 className="text-gray-900">2.4M</h3>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">+18.4%</span>
              </div>
            </div>
            <div className="p-2 bg-cyan-500 rounded-lg">
              <Eye className="w-4 h-4 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-4 border border-gray-200 bg-gradient-to-br from-pink-50 to-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Clicks</p>
              <h3 className="text-gray-900">96,740</h3>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">+12.7%</span>
              </div>
            </div>
            <div className="p-2 bg-pink-500 rounded-lg">
              <MousePointerClick className="w-4 h-4 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-4 border border-gray-200 bg-gradient-to-br from-teal-50 to-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg CTR</p>
              <h3 className="text-gray-900">4.1%</h3>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">+1.8%</span>
              </div>
            </div>
            <div className="p-2 bg-teal-500 rounded-lg">
              <Target className="w-4 h-4 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-4 border border-gray-200 bg-gradient-to-br from-indigo-50 to-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Conversions</p>
              <h3 className="text-gray-900">{totalConversions.toLocaleString()}</h3>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">+23.5%</span>
              </div>
            </div>
            <div className="p-2 bg-indigo-500 rounded-lg">
              <Users className="w-4 h-4 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Campaign Performance Table */}
      <Card className="border border-gray-200 overflow-hidden">
        <div className="p-6 pb-4">
          <h4>Campaign Performance Details</h4>
          <p className="text-sm text-muted-foreground mt-1">Comprehensive metrics for all active campaigns</p>
        </div>
        <div className="overflow-x-scroll">
          <div className="px-6 pb-6">
          <Table className="min-w-[1200px]">
            <TableHeader>
              <TableRow className="border-b border-gray-200">
                <TableHead className="sticky left-0 z-20 bg-white shadow-[2px_0_4px_rgba(0,0,0,0.05)] w-[200px]">Campaign Name</TableHead>
                <TableHead className="px-3 w-[110px]">Platform</TableHead>
                <TableHead className="px-3 w-[90px]">Status</TableHead>
                <TableHead className="text-right px-3 w-[100px]">Impressions</TableHead>
                <TableHead className="text-right px-3 w-[85px]">Clicks</TableHead>
                <TableHead className="text-right px-3 w-[70px]">CTR</TableHead>
                <TableHead className="text-right px-3 w-[75px]">Conv.</TableHead>
                <TableHead className="text-right px-3 w-[95px]">Conv. Rate</TableHead>
                <TableHead className="text-right px-3 w-[95px]">Spend</TableHead>
                <TableHead className="text-right px-3 w-[100px]">Revenue</TableHead>
                <TableHead className="text-right px-3 w-[75px]">CPC</TableHead>
                <TableHead className="text-right px-3 w-[75px]">CPA</TableHead>
                <TableHead className="text-right px-3 w-[75px]">ROAS</TableHead>
                <TableHead className="text-right px-3 w-[90px]">Profit</TableHead>
                <TableHead className="sticky right-0 z-20 bg-white shadow-[-2px_0_4px_rgba(0,0,0,0.05)] text-right w-[85px]">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaignTableData.map((campaign, index) => (
                <TableRow key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <TableCell className="font-medium sticky left-0 z-10 bg-white group-hover:bg-gray-50 shadow-[2px_0_4px_rgba(0,0,0,0.05)] text-sm">{campaign.campaign}</TableCell>
                  <TableCell className="px-3">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200 text-xs whitespace-nowrap inline-flex items-center gap-1.5">
                      <ChannelIcon channel={campaign.platform} size="xs" />
                      {campaign.platform}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-3">
                    <Badge
                      className={
                        campaign.status === "active"
                          ? "bg-green-100 text-green-700 border-green-200 text-xs"
                          : "bg-gray-100 text-gray-700 border-gray-200 text-xs"
                      }
                    >
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-3 text-sm">{campaign.impressions.toLocaleString()}</TableCell>
                  <TableCell className="text-right px-3 text-sm">{campaign.clicks.toLocaleString()}</TableCell>
                  <TableCell className="text-right px-3 text-sm">{campaign.ctr.toFixed(1)}%</TableCell>
                  <TableCell className="text-right px-3 text-sm">{campaign.conversions.toLocaleString()}</TableCell>
                  <TableCell className="text-right px-3 text-sm">{campaign.conversionRate.toFixed(1)}%</TableCell>
                  <TableCell className="text-right text-orange-600 font-medium px-3 text-sm">${campaign.spend.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-medium px-3 text-sm">${campaign.revenue.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-muted-foreground px-3 text-sm">${campaign.cpc.toFixed(2)}</TableCell>
                  <TableCell className="text-right text-muted-foreground px-3 text-sm">${campaign.cpa.toFixed(2)}</TableCell>
                  <TableCell className="text-right px-3">
                    <Badge className="bg-purple-100 text-purple-700 border-purple-200 text-xs whitespace-nowrap">
                      {campaign.roas.toFixed(1)}x
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-green-600 font-medium px-3 text-sm">${campaign.profit.toLocaleString()}</TableCell>
                  <TableCell className="text-right sticky right-0 z-10 bg-white group-hover:bg-gray-50 shadow-[-2px_0_4px_rgba(0,0,0,0.05)] text-sm">
                    <span className={campaign.trend.startsWith('+') ? "text-green-600" : "text-red-600"}>
                      {campaign.trend}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
              {/* Totals Row */}
              <TableRow className="bg-gray-100 border-t-2 border-gray-300 font-medium">
                <TableCell className="font-bold sticky left-0 z-10 bg-gray-100 shadow-[2px_0_4px_rgba(0,0,0,0.05)] text-sm" colSpan={3}>TOTAL / AVERAGE</TableCell>
                <TableCell className="text-right font-bold px-3 text-sm">
                  {campaignTableData.reduce((sum, c) => sum + c.impressions, 0).toLocaleString()}
                </TableCell>
                <TableCell className="text-right font-bold px-3 text-sm">
                  {campaignTableData.reduce((sum, c) => sum + c.clicks, 0).toLocaleString()}
                </TableCell>
                <TableCell className="text-right px-3 text-sm">
                  {(campaignTableData.reduce((sum, c) => sum + c.ctr, 0) / campaignTableData.length).toFixed(1)}%
                </TableCell>
                <TableCell className="text-right font-bold px-3 text-sm">{totalConversions.toLocaleString()}</TableCell>
                <TableCell className="text-right px-3 text-sm">
                  {(campaignTableData.reduce((sum, c) => sum + c.conversionRate, 0) / campaignTableData.length).toFixed(1)}%
                </TableCell>
                <TableCell className="text-right text-orange-600 font-bold px-3 text-sm">${totalSpend.toLocaleString()}</TableCell>
                <TableCell className="text-right font-bold px-3 text-sm">${totalRevenue.toLocaleString()}</TableCell>
                <TableCell className="text-right px-3 text-sm">
                  ${(campaignTableData.reduce((sum, c) => sum + c.cpc, 0) / campaignTableData.length).toFixed(2)}
                </TableCell>
                <TableCell className="text-right px-3 text-sm">
                  ${(campaignTableData.reduce((sum, c) => sum + c.cpa, 0) / campaignTableData.length).toFixed(2)}
                </TableCell>
                <TableCell className="text-right px-3">
                  <Badge className="bg-purple-100 text-purple-700 border-purple-200 text-xs whitespace-nowrap">
                    {avgROAS.toFixed(1)}x
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-green-600 font-bold px-3 text-sm">${totalProfit.toLocaleString()}</TableCell>
                <TableCell className="sticky right-0 z-10 bg-gray-100 shadow-[-2px_0_4px_rgba(0,0,0,0.05)]"></TableCell>
              </TableRow>
            </TableBody>
          </Table>
          </div>
        </div>
      </Card>

      {/* Campaign Performance Trend */}
      <Card className="p-6 border border-gray-200">
        <div className="mb-4">
          <h4>Campaign Performance Trend</h4>
          <p className="text-sm text-muted-foreground mt-1">Daily performance metrics over time</p>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={campaignPerformance}>
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
            <Bar yAxisId="left" dataKey="impressions" fill="#3b82f6" name="Impressions" />
            <Line yAxisId="right" type="monotone" dataKey="clicks" stroke="#8b5cf6" strokeWidth={2} name="Clicks" />
            <Line yAxisId="right" type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={2} name="Conversions" />
          </ComposedChart>
        </ResponsiveContainer>
      </Card>

      {/* ROAS and Spend Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border border-gray-200">
          <div className="mb-4">
            <h4>ROAS by Platform</h4>
            <p className="text-sm text-muted-foreground mt-1">Return on ad spend across platforms</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={[...roasData].sort((a, b) => b.roas - a.roas)}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="campaign" className="text-xs" angle={-15} textAnchor="end" height={80} />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="roas" fill="#10b981" name="ROAS" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="mb-4">
            <h4>Spend vs Revenue by Platform</h4>
            <p className="text-sm text-muted-foreground mt-1">Investment and returns comparison</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={roasData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="campaign" className="text-xs" angle={-15} textAnchor="end" height={80} />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="spend" fill="#f59e0b" name="Ad Spend" />
              <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { DateRangeFilter } from "./DateRangeFilter";
import { GlobalFilterSystem, FilterValues } from "./GlobalFilterSystem";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { 
  ChevronRight,
  Download,
  Filter,
  Columns,
  Sparkles
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { ChannelIcon } from "./ChannelBadge";

type DrillLevel = "channel" | "order" | "sku";

interface AppliedFilter {
  id: string;
  type: keyof FilterValues;
  label: string;
  value: any;
}

interface ChannelData {
  id: string;
  name: string;
  orderCount: number;
  processor: string;
  totalRevenue: number;
  platformFees: number;
  fulfillmentFee: number;
  refundFee: number;
  returnShipping: number;
  payoutAmount: number;
  variance: number;
}

interface OrderData {
  id: string;
  orderId: string;
  orderDate: string;
  processor: string;
  payoutId: string;
  payoutDate: string;
  status: "scheduled" | "processing" | "overdue" | "paid";
  revenue: number;
  platformFees: number;
  fulfillmentFee: number;
  refundFee: number;
  returnShipping: number;
  payoutAmount: number;
  variance: number;
}

interface SKUData {
  sku: string;
  productName: string;
  quantity: number;
  revenue: number;
  platformFees: number;
  fulfillmentFee: number;
  refundFee: number;
  returnShipping: number;
  payoutAmount: number;
  variance: number;
}

const channelsData: ChannelData[] = [
  {
    id: "amazon",
    name: "Amazon",
    orderCount: 234,
    processor: "Multiple",
    totalRevenue: 18942.00,
    platformFees: -2310.00,
    fulfillmentFee: -1232.00,
    refundFee: -27.00,
    returnShipping: -22.00,
    payoutAmount: 15400.00,
    variance: 77.00,
  },
  {
    id: "shopify",
    name: "Shopify",
    orderCount: 87,
    processor: "Multiple",
    totalRevenue: 4662.00,
    platformFees: -294.00,
    fulfillmentFee: -168.00,
    refundFee: 0,
    returnShipping: 0,
    payoutAmount: 4200.00,
    variance: 8.40,
  },
  {
    id: "walmart",
    name: "Walmart",
    orderCount: 42,
    processor: "Multiple",
    totalRevenue: 1946.00,
    platformFees: -250.00,
    fulfillmentFee: -96.00,
    refundFee: 0,
    returnShipping: 0,
    payoutAmount: 1600.00,
    variance: 28.80,
  },
];

const ordersData: Record<string, OrderData[]> = {
  amazon: [
    {
      id: "ord-001",
      orderId: "AMZ-2141-001",
      orderDate: "Oct 18, 2025",
      processor: "Amazon Payments",
      payoutId: "AMZ-P-2141",
      payoutDate: "Thursday, Oct 24",
      status: "scheduled",
      revenue: 450.00,
      platformFees: -67.50,
      fulfillmentFee: -22.50,
      refundFee: 0,
      returnShipping: 0,
      payoutAmount: 342.00,
      variance: 8.10,
    },
    {
      id: "ord-002",
      orderId: "AMZ-2141-002",
      orderDate: "Oct 18, 2025",
      processor: "Amazon Payments",
      payoutId: "AMZ-P-2141",
      payoutDate: "Thursday, Oct 24",
      status: "scheduled",
      revenue: 89.99,
      platformFees: -13.50,
      fulfillmentFee: -4.50,
      refundFee: -15.00,
      returnShipping: -12.00,
      payoutAmount: 44.99,
      variance: 0.0,
    },
    {
      id: "ord-003",
      orderId: "AMZ-2141-003",
      orderDate: "Oct 17, 2025",
      processor: "Amazon Payments",
      payoutId: "AMZ-P-2141",
      payoutDate: "Thursday, Oct 24",
      status: "scheduled",
      revenue: 1200.00,
      platformFees: -180.00,
      fulfillmentFee: -65.00,
      refundFee: 0,
      returnShipping: 0,
      payoutAmount: 945.00,
      variance: 15.00,
    },
  ],
  shopify: [
    {
      id: "ord-101",
      orderId: "SHOP-2142-087",
      orderDate: "Oct 17, 2025",
      processor: "Stripe",
      payoutId: "SHOP-P-2142",
      payoutDate: "Monday, Oct 21",
      status: "paid",
      revenue: 289.50,
      platformFees: -20.27,
      fulfillmentFee: -8.69,
      refundFee: 0,
      returnShipping: 0,
      payoutAmount: 260.54,
      variance: 0.58,
    },
    {
      id: "ord-102",
      orderId: "SHOP-2142-088",
      orderDate: "Oct 17, 2025",
      processor: "PayPal",
      payoutId: "SHOP-P-2142-PP",
      payoutDate: "Monday, Oct 21",
      status: "paid",
      revenue: 580.00,
      platformFees: -40.60,
      fulfillmentFee: -17.40,
      refundFee: 0,
      returnShipping: 0,
      payoutAmount: 498.80,
      variance: 6.96,
    },
  ],
  walmart: [
    {
      id: "ord-201",
      orderId: "WMT-2143-042",
      orderDate: "Oct 15, 2025",
      processor: "PayPal",
      payoutId: "WMT-P-2143",
      payoutDate: "Friday, Oct 18",
      status: "overdue",
      revenue: 125.00,
      platformFees: -18.75,
      fulfillmentFee: -6.25,
      refundFee: 0,
      returnShipping: 0,
      payoutAmount: 95.00,
      variance: -0.50,
    },
  ],
};

const skusData: Record<string, SKUData[]> = {
  "ord-001": [
    {
      sku: "ELC-001",
      productName: "Wireless Headphones",
      quantity: 3,
      revenue: 450.00,
      platformFees: -67.50,
      fulfillmentFee: -22.50,
      refundFee: 0,
      returnShipping: 0,
      payoutAmount: 342.00,
      variance: 8.10,
    }
  ],
  "ord-002": [
    {
      sku: "SPT-089",
      productName: "Yoga Mat",
      quantity: 1,
      revenue: 89.99,
      platformFees: -13.50,
      fulfillmentFee: -4.50,
      refundFee: -15.00,
      returnShipping: -12.00,
      payoutAmount: 44.99,
      variance: 0.0,
    }
  ],
  "ord-003": [
    {
      sku: "ELC-012",
      productName: "Smart Watch",
      quantity: 8,
      revenue: 1200.00,
      platformFees: -180.00,
      fulfillmentFee: -65.00,
      refundFee: 0,
      returnShipping: 0,
      payoutAmount: 945.00,
      variance: 15.00,
    }
  ],
  "ord-101": [
    {
      sku: "CLT-045",
      productName: "Cotton T-Shirt",
      quantity: 2,
      revenue: 289.50,
      platformFees: -20.27,
      fulfillmentFee: -8.69,
      refundFee: 0,
      returnShipping: 0,
      payoutAmount: 260.54,
      variance: 0.58,
    }
  ],
  "ord-102": [
    {
      sku: "ELC-012",
      productName: "Smart Watch",
      quantity: 4,
      revenue: 580.00,
      platformFees: -40.60,
      fulfillmentFee: -17.40,
      refundFee: 0,
      returnShipping: 0,
      payoutAmount: 498.80,
      variance: 6.96,
    }
  ],
  "ord-201": [
    {
      sku: "HOM-234",
      productName: "Ceramic Vase",
      quantity: 1,
      revenue: 125.00,
      platformFees: -18.75,
      fulfillmentFee: -6.25,
      refundFee: 0,
      returnShipping: 0,
      payoutAmount: 95.00,
      variance: -0.50,
    }
  ],
};

export function PaymentTableView() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilter[]>([]);
  const [currentLevel, setCurrentLevel] = useState<DrillLevel>("channel");
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  
  const handleFilterApply = (filters: FilterValues) => {
    console.log("Filters applied to Payment Table View:", filters);
  };

  const handleDrillDown = (id: string, level: DrillLevel) => {
    if (level === "channel") {
      setSelectedChannel(id);
      setCurrentLevel("order");
    } else if (level === "order") {
      setSelectedOrder(id);
      setCurrentLevel("sku");
    }
  };

  const handleBreadcrumbClick = (level: DrillLevel) => {
    if (level === "channel") {
      setCurrentLevel("channel");
      setSelectedChannel(null);
      setSelectedOrder(null);
    } else if (level === "order") {
      setCurrentLevel("order");
      setSelectedOrder(null);
    }
  };

  const formatCurrency = (value: number) => {
    const formatted = Math.abs(value).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return value < 0 ? `-$${formatted}` : `$${formatted}`;
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "scheduled":
        return { label: "Scheduled", className: "bg-green-100 text-green-700 border-green-200" };
      case "processing":
        return { label: "Processing", className: "bg-blue-100 text-blue-700 border-blue-200" };
      case "paid":
        return { label: "Paid", className: "bg-green-100 text-green-700 border-green-200" };
      case "overdue":
        return { label: "Overdue 3d", className: "bg-red-100 text-red-700 border-red-200" };
      default:
        return { label: status, className: "bg-gray-100 text-gray-700 border-gray-200" };
    }
  };

  const getCurrentData = () => {
    if (currentLevel === "channel") return channelsData;
    if (currentLevel === "order" && selectedChannel) return ordersData[selectedChannel] || [];
    if (currentLevel === "sku" && selectedOrder) return skusData[selectedOrder] || [];
    return [];
  };

  const getChannelName = () => {
    if (!selectedChannel) return "";
    return channelsData.find(c => c.id === selectedChannel)?.name || "";
  };

  const getOrderId = () => {
    if (!selectedOrder || !selectedChannel) return "";
    const orders = ordersData[selectedChannel] || [];
    return orders.find(o => o.id === selectedOrder)?.orderId || "";
  };

  const calculateVariancePercent = (variance: number, revenue: number) => {
    if (revenue === 0) return 0;
    return ((variance / revenue) * 100);
  };

  const getAIVarianceReasons = (variancePercent: number, variance: number, channelName?: string, level?: string) => {
    const absVariance = Math.abs(variancePercent);
    const isNegative = variancePercent < 0;
    
    const reasons: string[] = [];
    
    if (absVariance < 1) {
      reasons.push("✓ Variance is within acceptable range");
      reasons.push("• Payment processing aligned with expectations");
      reasons.push("• No significant fee discrepancies detected");
    } else if (absVariance < 5) {
      if (isNegative) {
        reasons.push("⚠ Minor underpayment detected");
        reasons.push(`• Possible ${channelName || 'platform'} fee adjustment`);
        reasons.push("• Could be promotional discount impact");
        reasons.push("• Review recent fee schedule changes");
      } else {
        reasons.push("⚠ Minor overpayment detected");
        reasons.push("• Possible credit or refund reversal");
        reasons.push("• Check for duplicate payments");
      }
    } else if (absVariance < 10) {
      if (isNegative) {
        reasons.push("⚠ Moderate variance - requires attention");
        reasons.push(`• ${channelName || 'Platform'} may have applied additional fees`);
        reasons.push("• Fulfillment costs exceeded estimate");
        reasons.push("• Return/refund fees not fully accounted");
        reasons.push("🔍 Recommended: Review fee breakdown");
      } else {
        reasons.push("⚠ Moderate overpayment");
        reasons.push("• Possible fee waiver or promotion");
        reasons.push("• Double-check payout reconciliation");
      }
    } else {
      if (isNegative) {
        reasons.push("🚨 Significant variance - immediate review needed");
        reasons.push(`• Major discrepancy in ${channelName || 'platform'} calculations`);
        reasons.push("• Potential: Incorrect fee tier applied");
        reasons.push("• Potential: Chargeback or reserve hold");
        reasons.push("• Potential: Tax/VAT deductions");
        reasons.push("💡 Action: Contact platform support");
        reasons.push("💡 Action: Verify fee agreement");
      } else {
        reasons.push("🚨 Significant overpayment - verify immediately");
        reasons.push("• Unusual credit applied");
        reasons.push("• Potential payment system error");
        reasons.push("💡 Action: Reconcile with platform");
      }
    }
    
    return reasons;
  };

  const calculateExpectedPayoutDate = (orderDate: string, channelName: string) => {
    const payoutLagDays: Record<string, number> = {
      'Amazon': 14,
      'Walmart': 21,
      'Shopify': 3,
      'eBay': 1
    };
    
    const lagDays = payoutLagDays[channelName] || 14;
    const order = new Date(orderDate);
    const expected = new Date(order);
    expected.setDate(expected.getDate() + lagDays);
    
    return expected.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getPayoutDelayDays = (expectedDate: string, actualDate: string) => {
    const expected = new Date(expectedDate);
    const actual = new Date(actualDate);
    const diffTime = actual.getTime() - expected.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const data = getCurrentData();

  return (
    <div className="space-y-6">
      {/* Date Range & Global Filter Section */}
      <div className="space-y-4">
        <DateRangeFilter onFilterApply={handleFilterApply} />
        <GlobalFilterSystem
          onApply={handleFilterApply}
          isOpen={isFilterOpen}
          onOpenChange={setIsFilterOpen}
          filtersVisible={filtersVisible}
          appliedFilters={appliedFilters}
          onFiltersChange={setAppliedFilters}
        />
      </div>

      {/* Payment Details Table */}
      <Card className="border border-gray-200">
        <div className="border-b border-gray-200 p-4 bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Payment Details</h3>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Columns className="w-4 h-4" />
                Columns
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>

          {/* Navigation Breadcrumb */}
          {currentLevel !== "channel" && (
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink 
                    onClick={() => handleBreadcrumbClick("channel")}
                    className="cursor-pointer hover:text-blue-600"
                  >
                    All Channels
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {currentLevel === "order" && selectedChannel && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="inline-flex items-center gap-1.5">
                        <ChannelIcon channel={getChannelName()} size="xs" />
                        {getChannelName()}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
                {currentLevel === "sku" && selectedChannel && selectedOrder && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        onClick={() => handleBreadcrumbClick("order")}
                        className="cursor-pointer hover:text-blue-600 inline-flex items-center gap-1.5"
                      >
                        <ChannelIcon channel={getChannelName()} size="xs" />
                        {getChannelName()}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{getOrderId()}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          )}
        </div>
        
        <div className="overflow-x-auto relative">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-gray-600 sticky left-0 z-20 bg-gray-50 shadow-[2px_0_4px_rgba(0,0,0,0.05)] min-w-[200px]">
                  {currentLevel === "channel" ? "CHANNEL / ORDER / SKU" : 
                   currentLevel === "order" ? "ORDER ID" : "SKU"}
                </th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-gray-600">
                  {currentLevel === "channel" ? "COUNT / DATE" : 
                   currentLevel === "order" ? "COUNT / DATE" : "PRODUCT"}
                </th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-gray-600">PROCESSOR</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-gray-600">PAYOUT ID</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-gray-600">PAYOUT DATE</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-gray-600">STATUS</th>
                <th className="text-right p-4 text-xs uppercase tracking-wider text-gray-600">REVENUE</th>
                <th className="text-right p-4 text-xs uppercase tracking-wider text-gray-600">PLATFORM FEES</th>
                <th className="text-right p-4 text-xs uppercase tracking-wider text-gray-600">FULFILLMENT</th>
                <th className="text-right p-4 text-xs uppercase tracking-wider text-gray-600">REFUND FEE</th>
                <th className="text-right p-4 text-xs uppercase tracking-wider text-gray-600">RETURN SHIP</th>
                <th className="text-right p-4 text-xs uppercase tracking-wider text-gray-600">PAYOUT AMOUNT</th>
                <th className="text-right p-4 text-xs uppercase tracking-wider text-gray-600">VARIANCE</th>
                <th className="text-right p-4 text-xs uppercase tracking-wider text-gray-600">
                  <div className="flex items-center justify-end gap-1">
                    VARIANCE %
                    <Sparkles className="w-3 h-3 text-blue-600" />
                  </div>
                </th>
                <th className="text-center p-4 text-xs uppercase tracking-wider text-gray-600 w-16 sticky right-0 z-20 bg-gray-50 shadow-[-2px_0_4px_rgba(0,0,0,0.05)]"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentLevel === "channel" && (channelsData as ChannelData[]).map((channel) => {
                const variancePercent = calculateVariancePercent(channel.variance, channel.totalRevenue);
                const aiReasons = getAIVarianceReasons(variancePercent, channel.variance, channel.name, "channel");
                
                return (
                  <tr 
                    key={channel.id}
                    className="hover:bg-gray-50 cursor-pointer group"
                    onClick={() => handleDrillDown(channel.id, "channel")}
                  >
                    <td className="p-4 sticky left-0 z-10 bg-white group-hover:bg-gray-50 shadow-[2px_0_4px_rgba(0,0,0,0.05)]">
                      <div className="flex items-center gap-3">
                        <ChannelIcon channel={channel.name} size="md" />
                        <span className="font-semibold">{channel.name}</span>
                      </div>
                    </td>
                    <td className="p-4 font-semibold">{channel.orderCount} orders</td>
                    <td className="p-4 text-sm text-gray-600">{channel.processor}</td>
                    <td className="p-4 text-sm text-gray-600">—</td>
                    <td className="p-4 text-sm text-gray-600">—</td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
                        Summary
                      </Badge>
                    </td>
                    <td className="p-4 text-right font-mono font-semibold">{formatCurrency(channel.totalRevenue)}</td>
                    <td className="p-4 text-right font-mono text-red-600">{formatCurrency(channel.platformFees)}</td>
                    <td className="p-4 text-right font-mono text-red-600">{formatCurrency(channel.fulfillmentFee)}</td>
                    <td className="p-4 text-right font-mono text-gray-600">{formatCurrency(channel.refundFee)}</td>
                    <td className="p-4 text-right font-mono text-gray-600">{formatCurrency(channel.returnShipping)}</td>
                    <td className="p-4 text-right font-mono font-semibold text-green-600">{formatCurrency(channel.payoutAmount)}</td>
                    <td className="p-4 text-right font-mono text-yellow-600">{formatCurrency(channel.variance)}</td>
                    <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <TooltipProvider>
                        <Tooltip delayDuration={200}>
                          <TooltipTrigger asChild>
                            <div className={`font-mono font-semibold cursor-help inline-flex items-center gap-1 ${
                              Math.abs(variancePercent) < 1 ? 'text-green-600' :
                              Math.abs(variancePercent) < 5 ? 'text-yellow-600' :
                              Math.abs(variancePercent) < 10 ? 'text-orange-600' :
                              'text-red-600'
                            }`}>
                              {variancePercent >= 0 ? '+' : ''}{variancePercent.toFixed(2)}%
                              <Sparkles className="w-3 h-3" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs p-4 bg-white border border-blue-200 shadow-lg">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-200">
                                <Sparkles className="w-4 h-4 text-blue-600" />
                                <span className="font-semibold text-gray-900">Helix AI Analysis</span>
                              </div>
                              <div className="space-y-1">
                                {aiReasons.map((reason, idx) => (
                                  <p key={idx} className="text-xs text-gray-700 leading-relaxed">{reason}</p>
                                ))}
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </td>
                    <td className="p-4 text-center sticky right-0 z-10 bg-white group-hover:bg-gray-50 shadow-[-2px_0_4px_rgba(0,0,0,0.05)]">
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded bg-blue-50/50 hover:bg-blue-100">
                        <ChevronRight className="w-5 h-5 text-blue-500" />
                      </div>
                    </td>
                  </tr>
                );
              })}

              {currentLevel === "order" && (data as OrderData[]).map((order) => {
                const statusConfig = getStatusConfig(order.status);
                const variancePercent = calculateVariancePercent(order.variance, order.revenue);
                const channelName = getChannelName();
                const aiReasons = getAIVarianceReasons(variancePercent, order.variance, channelName, "order");
                const expectedPayoutDate = calculateExpectedPayoutDate(order.orderDate, channelName);
                const delayDays = getPayoutDelayDays(expectedPayoutDate, order.payoutDate);
                
                return (
                  <tr 
                    key={order.id}
                    className="hover:bg-gray-50 cursor-pointer group"
                    onClick={() => handleDrillDown(order.id, "order")}
                  >
                    <td className="p-4 font-mono font-semibold sticky left-0 z-10 bg-white group-hover:bg-gray-50 shadow-[2px_0_4px_rgba(0,0,0,0.05)]">{order.orderId}</td>
                    <td className="p-4 text-sm text-gray-600">{order.orderDate}</td>
                    <td className="p-4 text-sm">{order.processor}</td>
                    <td className="p-4 font-mono text-blue-600">{order.payoutId}</td>
                    <td className="p-4 text-sm" onClick={(e) => e.stopPropagation()}>
                      <TooltipProvider>
                        <Tooltip delayDuration={200}>
                          <TooltipTrigger asChild>
                            <div className={`cursor-help ${
                              delayDays < 0 ? 'text-green-600' :
                              delayDays === 0 ? 'text-gray-900' :
                              delayDays <= 3 ? 'text-yellow-600' :
                              delayDays <= 7 ? 'text-orange-600' :
                              'text-red-600'
                            }`}>
                              {order.payoutDate}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="p-3 bg-white border border-gray-200 shadow-lg">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between gap-4 pb-2 border-b border-gray-200">
                                <span className="text-xs font-semibold text-gray-700">Expected Date:</span>
                                <span className="text-xs text-gray-900">{expectedPayoutDate}</span>
                              </div>
                              <div className="flex items-center justify-between gap-4 pb-2 border-b border-gray-200">
                                <span className="text-xs font-semibold text-gray-700">Actual Date:</span>
                                <span className="text-xs text-gray-900">{order.payoutDate}</span>
                              </div>
                              <div className="flex items-center justify-between gap-4">
                                <span className="text-xs font-semibold text-gray-700">Status:</span>
                                <span className={`text-xs font-semibold ${
                                  delayDays < 0 ? 'text-green-600' :
                                  delayDays === 0 ? 'text-gray-900' :
                                  delayDays <= 3 ? 'text-yellow-600' :
                                  delayDays <= 7 ? 'text-orange-600' :
                                  'text-red-600'
                                }`}>
                                  {delayDays < 0 ? `${Math.abs(delayDays)} days early ✓` :
                                   delayDays === 0 ? 'On Time ✓' :
                                   `${delayDays} days delayed ⚠`}
                                </span>
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </td>
                    <td className="p-4">
                      <Badge className={`${statusConfig.className} border text-xs`}>
                        {statusConfig.label}
                      </Badge>
                    </td>
                    <td className="p-4 text-right font-mono">{formatCurrency(order.revenue)}</td>
                    <td className="p-4 text-right font-mono text-red-600">{formatCurrency(order.platformFees)}</td>
                    <td className="p-4 text-right font-mono text-red-600">{formatCurrency(order.fulfillmentFee)}</td>
                    <td className="p-4 text-right font-mono text-gray-600">{formatCurrency(order.refundFee)}</td>
                    <td className="p-4 text-right font-mono text-gray-600">{formatCurrency(order.returnShipping)}</td>
                    <td className="p-4 text-right font-mono font-semibold text-green-600">{formatCurrency(order.payoutAmount)}</td>
                    <td className="p-4 text-right font-mono text-yellow-600">{formatCurrency(order.variance)}</td>
                    <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <TooltipProvider>
                        <Tooltip delayDuration={200}>
                          <TooltipTrigger asChild>
                            <div className={`font-mono font-semibold cursor-help inline-flex items-center gap-1 ${
                              Math.abs(variancePercent) < 1 ? 'text-green-600' :
                              Math.abs(variancePercent) < 5 ? 'text-yellow-600' :
                              Math.abs(variancePercent) < 10 ? 'text-orange-600' :
                              'text-red-600'
                            }`}>
                              {variancePercent >= 0 ? '+' : ''}{variancePercent.toFixed(2)}%
                              <Sparkles className="w-3 h-3" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs p-4 bg-white border border-blue-200 shadow-lg">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-200">
                                <Sparkles className="w-4 h-4 text-blue-600" />
                                <span className="font-semibold text-gray-900">Helix AI Analysis</span>
                              </div>
                              <div className="space-y-1">
                                {aiReasons.map((reason, idx) => (
                                  <p key={idx} className="text-xs text-gray-700 leading-relaxed">{reason}</p>
                                ))}
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </td>
                    <td className="p-4 text-center sticky right-0 z-10 bg-white group-hover:bg-gray-50 shadow-[-2px_0_4px_rgba(0,0,0,0.05)]">
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded bg-blue-50/50 hover:bg-blue-100">
                        <ChevronRight className="w-5 h-5 text-blue-500" />
                      </div>
                    </td>
                  </tr>
                );
              })}

              {currentLevel === "sku" && (data as SKUData[]).map((sku, index) => {
                const variancePercent = calculateVariancePercent(sku.variance, sku.revenue);
                const channelName = getChannelName();
                const aiReasons = getAIVarianceReasons(variancePercent, sku.variance, channelName, "sku");
                
                // Get parent order information for payout date
                const parentOrder = selectedOrder && selectedChannel ? 
                  (ordersData[selectedChannel] || []).find(o => o.id === selectedOrder) : null;
                const expectedPayoutDate = parentOrder ? calculateExpectedPayoutDate(parentOrder.orderDate, channelName) : '';
                const delayDays = parentOrder ? getPayoutDelayDays(expectedPayoutDate, parentOrder.payoutDate) : 0;
                
                return (
                  <tr key={index} className="hover:bg-gray-50 group">
                    <td className="p-4 sticky left-0 z-10 bg-white group-hover:bg-gray-50 shadow-[2px_0_4px_rgba(0,0,0,0.05)]">
                      <div className="font-mono font-semibold">{sku.sku}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">{sku.productName}</div>
                      <div className="text-xs text-gray-600">Qty: {sku.quantity}</div>
                    </td>
                    <td className="p-4"></td>
                    <td className="p-4"></td>
                    <td className="p-4">
                      {parentOrder && (
                        <TooltipProvider>
                          <Tooltip delayDuration={200}>
                            <TooltipTrigger asChild>
                              <div className={`cursor-help text-sm ${
                                delayDays < 0 ? 'text-green-600' :
                                delayDays === 0 ? 'text-gray-900' :
                                delayDays <= 3 ? 'text-yellow-600' :
                                delayDays <= 7 ? 'text-orange-600' :
                                'text-red-600'
                              }`}>
                                {parentOrder.payoutDate}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent className="p-3 bg-white border border-gray-200 shadow-lg">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between gap-4 pb-2 border-b border-gray-200">
                                  <span className="text-xs font-semibold text-gray-700">Expected Date:</span>
                                  <span className="text-xs text-gray-900">{expectedPayoutDate}</span>
                                </div>
                                <div className="flex items-center justify-between gap-4 pb-2 border-b border-gray-200">
                                  <span className="text-xs font-semibold text-gray-700">Actual Date:</span>
                                  <span className="text-xs text-gray-900">{parentOrder.payoutDate}</span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                  <span className="text-xs font-semibold text-gray-700">Status:</span>
                                  <span className={`text-xs font-semibold ${
                                    delayDays < 0 ? 'text-green-600' :
                                    delayDays === 0 ? 'text-gray-900' :
                                    delayDays <= 3 ? 'text-yellow-600' :
                                    delayDays <= 7 ? 'text-orange-600' :
                                    'text-red-600'
                                  }`}>
                                    {delayDays < 0 ? `${Math.abs(delayDays)} days early ✓` :
                                     delayDays === 0 ? 'On Time ✓' :
                                     `${delayDays} days delayed ⚠`}
                                  </span>
                                </div>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </td>
                    <td className="p-4"></td>
                    <td className="p-4 text-right font-mono">{formatCurrency(sku.revenue)}</td>
                    <td className="p-4 text-right font-mono text-red-600">{formatCurrency(sku.platformFees)}</td>
                    <td className="p-4 text-right font-mono text-red-600">{formatCurrency(sku.fulfillmentFee)}</td>
                    <td className="p-4 text-right font-mono text-gray-600">{formatCurrency(sku.refundFee)}</td>
                    <td className="p-4 text-right font-mono text-gray-600">{formatCurrency(sku.returnShipping)}</td>
                    <td className="p-4 text-right font-mono font-semibold text-green-600">{formatCurrency(sku.payoutAmount)}</td>
                    <td className="p-4 text-right font-mono text-yellow-600">{formatCurrency(sku.variance)}</td>
                    <td className="p-4 text-right">
                      <TooltipProvider>
                        <Tooltip delayDuration={200}>
                          <TooltipTrigger asChild>
                            <div className={`font-mono font-semibold cursor-help inline-flex items-center gap-1 ${
                              Math.abs(variancePercent) < 1 ? 'text-green-600' :
                              Math.abs(variancePercent) < 5 ? 'text-yellow-600' :
                              Math.abs(variancePercent) < 10 ? 'text-orange-600' :
                              'text-red-600'
                            }`}>
                              {variancePercent >= 0 ? '+' : ''}{variancePercent.toFixed(2)}%
                              <Sparkles className="w-3 h-3" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs p-4 bg-white border border-blue-200 shadow-lg">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-200">
                                <Sparkles className="w-4 h-4 text-blue-600" />
                                <span className="font-semibold text-gray-900">Helix AI Analysis</span>
                              </div>
                              <div className="space-y-1">
                                {aiReasons.map((reason, idx) => (
                                  <p key={idx} className="text-xs text-gray-700 leading-relaxed">{reason}</p>
                                ))}
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </td>
                    <td className="p-4 text-center sticky right-0 z-10 bg-white group-hover:bg-gray-50 shadow-[-2px_0_4px_rgba(0,0,0,0.05)]">
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded bg-gray-50">
                        <ChevronRight className="w-5 h-5 text-gray-300" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

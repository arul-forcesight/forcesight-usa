import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { DateRangeFilter } from "./DateRangeFilter";
import { GlobalFilterSystem, FilterValues } from "./GlobalFilterSystem";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { 
  Download, 
  Settings2, 
  Activity,
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  XCircle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard
} from "lucide-react";
import { ChannelBadge } from "./ChannelBadge";

interface PaymentsTableProps {
  view: "orders" | "payouts" | "fees" | "refunds" | "ads" | "variance";
}

interface AppliedFilter {
  id: string;
  type: keyof FilterValues;
  label: string;
  value: any;
}

interface PaymentData {
  orderId: string;
  orderDate: string;
  channel: "amazon" | "shopify" | "walmart";
  processor: "Amazon" | "Stripe" | "PayPal";
  payoutBatchId: string;
  payoutDate: string;
  batchAge: number; // in days
  status: "paid" | "pending" | "scheduled" | "disputed" | "failed";
  quantity: number;
  revenue: number;
  platformFees: number;
  fulfillmentFee: number;
  refundFee: number;
  returnShipping: number;
  adDeductions: number;
  payoutAmount: number;
  variance: number;
  revenueImpactPercent?: number; // for refunds view
  adSpendVsRevenuePercent?: number; // for ads view
  hasIssue?: boolean;
}

const mockPayments: PaymentData[] = [
  {
    orderId: "AMZ-2141-001",
    orderDate: "Oct 15, 2025",
    channel: "amazon",
    processor: "Amazon",
    payoutBatchId: "P-2141",
    payoutDate: "Oct 24",
    batchAge: 3,
    status: "scheduled",
    quantity: 3,
    revenue: 450.00,
    platformFees: -67.50,
    fulfillmentFee: -22.50,
    refundFee: 0,
    returnShipping: 0,
    adDeductions: -18.00,
    payoutAmount: 342.00,
    variance: 1.8,
    revenueImpactPercent: 0,
    adSpendVsRevenuePercent: 4.0,
    hasIssue: true,
  },
  {
    orderId: "SHOP-2142-087",
    orderDate: "Oct 16, 2025",
    channel: "shopify",
    processor: "Stripe",
    payoutBatchId: "P-2142",
    payoutDate: "Oct 21",
    batchAge: 6,
    status: "paid",
    quantity: 2,
    revenue: 289.50,
    platformFees: -20.27,
    fulfillmentFee: -8.69,
    refundFee: 0,
    returnShipping: 0,
    adDeductions: 0,
    payoutAmount: 260.54,
    variance: 0.2,
    revenueImpactPercent: 0,
    adSpendVsRevenuePercent: 0,
  },
  {
    orderId: "WMT-2143-042",
    orderDate: "Oct 18, 2025",
    channel: "walmart",
    processor: "PayPal",
    payoutBatchId: "P-2143",
    payoutDate: "Oct 25",
    batchAge: 2,
    status: "scheduled",
    quantity: 1,
    revenue: 125.00,
    platformFees: -18.75,
    fulfillmentFee: -6.25,
    refundFee: 0,
    returnShipping: 0,
    adDeductions: -5.00,
    payoutAmount: 95.00,
    variance: -0.5,
    revenueImpactPercent: 0,
    adSpendVsRevenuePercent: 4.0,
  },
  {
    orderId: "AMZ-2141-002",
    orderDate: "Oct 15, 2025",
    channel: "amazon",
    processor: "Amazon",
    payoutBatchId: "P-2141",
    payoutDate: "Oct 24",
    batchAge: 3,
    status: "scheduled",
    quantity: 1,
    revenue: 89.99,
    platformFees: -13.50,
    fulfillmentFee: -4.50,
    refundFee: -15.00,
    returnShipping: -12.00,
    adDeductions: 0,
    payoutAmount: 44.99,
    variance: 0.0,
    revenueImpactPercent: 30.0,
    adSpendVsRevenuePercent: 0,
  },
  {
    orderId: "SHOP-2142-088",
    orderDate: "Oct 17, 2025",
    channel: "shopify",
    processor: "Stripe",
    payoutBatchId: "P-2142",
    payoutDate: "Oct 21",
    batchAge: 6,
    status: "paid",
    quantity: 4,
    revenue: 580.00,
    platformFees: -40.60,
    fulfillmentFee: -17.40,
    refundFee: 0,
    returnShipping: 0,
    adDeductions: -23.20,
    payoutAmount: 498.80,
    variance: 1.2,
    revenueImpactPercent: 0,
    adSpendVsRevenuePercent: 4.0,
    hasIssue: true,
  },
  {
    orderId: "AMZ-2141-003",
    orderDate: "Oct 16, 2025",
    channel: "amazon",
    processor: "Amazon",
    payoutBatchId: "P-2141",
    payoutDate: "Oct 24",
    batchAge: 3,
    status: "disputed",
    quantity: 2,
    revenueImpactPercent: 15.5,
    adSpendVsRevenuePercent: 3.2,
    revenue: 199.99,
    platformFees: -30.00,
    fulfillmentFee: -10.00,
    refundFee: -15.00,
    returnShipping: -10.00,
    adDeductions: 0,
    payoutAmount: 134.99,
    variance: -1.2,
    hasIssue: true,
  },
];

const statusConfig = {
  "paid": { 
    label: "Paid", 
    color: "bg-green-100 text-green-700 border-green-200",
    icon: CheckCircle2
  },
  "pending": { 
    label: "Pending", 
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
    icon: Clock
  },
  "scheduled": { 
    label: "Scheduled", 
    color: "bg-blue-100 text-blue-700 border-blue-200",
    icon: Clock
  },
  "disputed": { 
    label: "Disputed", 
    color: "bg-red-100 text-red-700 border-red-200",
    icon: AlertCircle
  },
  "failed": { 
    label: "Failed", 
    color: "bg-gray-100 text-gray-700 border-gray-200",
    icon: XCircle
  },
};

const viewConfig = {
  orders: {
    title: "Order Settlements",
    insights: [
      "$18,900 scheduled this week across all channels",
      "$2,130 pending refunds may impact next settlement",
      "3 orders require attention for settlement discrepancies"
    ],
    columns: ["order", "channel", "status", "revenue", "platformFees", "fulfillmentFee", "payoutAmount"],
  },
  payouts: {
    title: "Payout Batches",
    insights: [
      "7 payouts this week totaling $18,900",
      "Amazon weekly (Monday), Shopify daily settlements",
      "Stripe has 2-3 days processing lag"
    ],
    columns: ["order", "channel", "processor", "payoutBatchId", "payoutDate", "batchAge", "status", "payoutAmount"],
  },
  fees: {
    title: "Fee Breakdown",
    insights: [
      "Platform fees average 15% across all channels",
      "Fulfillment fees vary by product size and weight",
      "Click any row to view complete fee breakdown"
    ],
    columns: ["order", "channel", "revenue", "platformFees", "fulfillmentFee", "refundFee", "returnShipping", "payoutAmount"],
  },
  refunds: {
    title: "Refunds & Returns",
    insights: [
      "$2,130 in pending refunds awaiting processing",
      "Amazon charges $15 refund administration fee",
      "Average return shipping cost is $12 per order"
    ],
    columns: ["order", "channel", "status", "refundFee", "returnShipping", "revenueImpactPercent", "payoutAmount"],
  },
  ads: {
    title: "Ad Deductions",
    insights: [
      "Ad spend tracked separately by each platform",
      "Amazon ads settled separately from product sales",
      "Shopify/Meta ads deducted directly from payouts"
    ],
    columns: ["order", "channel", "payoutDate", "adDeductions", "revenue", "adSpendVsRevenuePercent", "payoutAmount"],
  },
  variance: {
    title: "Variance Tracking",
    insights: [
      "3 orders flagged with variance greater than 1%",
      "Review for potential platform overcharges",
      "Check for calculation errors or fee discrepancies"
    ],
    columns: ["order", "channel", "payoutBatchId", "revenue", "payoutAmount", "variance"],
  },
};

export function PaymentsTableEnhanced({ view }: PaymentsTableProps) {
  const config = viewConfig[view];
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
    Object.fromEntries(config.columns.map(col => [col, true]))
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const totalPages = 14;

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilter[]>([]);

  const handleFilterApply = (filters: FilterValues) => {
    console.log("Filters applied to Payments:", filters);
  };

  const formatCurrency = (value: number) => {
    const color = value < 0 ? "text-red-600" : value > 0 ? "text-green-600" : "text-gray-600";
    return <span className={`${color} font-mono`}>${Math.abs(value).toFixed(2)}</span>;
  };

  const formatVariance = (variance: number) => {
    const color = Math.abs(variance) > 1 ? "text-red-600" : variance > 0 ? "text-yellow-600" : "text-green-600";
    const Icon = variance > 0 ? TrendingUp : variance < 0 ? TrendingDown : Activity;
    return (
      <div className={`flex items-center gap-1 ${color}`}>
        <Icon className="w-3 h-3" />
        <span className="font-semibold">{variance > 0 ? '+' : ''}{variance.toFixed(1)}%</span>
      </div>
    );
  };

  const formatBatchAge = (days: number) => {
    const color = days <= 3 ? "text-green-600" : days <= 7 ? "text-yellow-600" : "text-red-600";
    return (
      <div className={`flex items-center gap-1 ${color}`}>
        <Clock className="w-3 h-3" />
        <span className="font-semibold">{days}d</span>
      </div>
    );
  };

  const formatPercentage = (value: number) => {
    const color = value > 10 ? "text-red-600" : value > 5 ? "text-yellow-600" : "text-green-600";
    return (
      <span className={`font-semibold ${color}`}>
        {value.toFixed(1)}%
      </span>
    );
  };

  const handleExport = () => {
    console.log("Exporting data...");
  };

  const toggleRow = (orderId: string) => {
    setExpandedRow(expandedRow === orderId ? null : orderId);
  };

  const getProcessorDetails = (processor: string) => {
    const details: Record<string, { method: string; accountLast4: string; transferTime: string; fees: string }> = {
      "Amazon": {
        method: "Amazon Pay",
        accountLast4: "****8421",
        transferTime: "14 days",
        fees: "15% referral fee"
      },
      "Stripe": {
        method: "Stripe Connect",
        accountLast4: "****3892",
        transferTime: "2-3 days",
        fees: "2.9% + $0.30"
      },
      "PayPal": {
        method: "PayPal Business",
        accountLast4: "****5267",
        transferTime: "1-2 days",
        fees: "2.99% per transaction"
      }
    };
    return details[processor] || details["Amazon"];
  };

  // Calculate column totals
  const totals = mockPayments.reduce((acc, payment) => ({
    revenue: acc.revenue + payment.revenue,
    platformFees: acc.platformFees + payment.platformFees,
    fulfillmentFee: acc.fulfillmentFee + payment.fulfillmentFee,
    refundFee: acc.refundFee + payment.refundFee,
    returnShipping: acc.returnShipping + payment.returnShipping,
    adDeductions: acc.adDeductions + payment.adDeductions,
    payoutAmount: acc.payoutAmount + payment.payoutAmount,
  }), {
    revenue: 0,
    platformFees: 0,
    fulfillmentFee: 0,
    refundFee: 0,
    returnShipping: 0,
    adDeductions: 0,
    payoutAmount: 0,
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Filter Section */}
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
      
      {/* Helix AI Insight Banner */}
      <Card className="border-2 border-blue-400 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 shadow-md">
        <div className="flex items-start gap-3 p-4">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl shadow-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              Helix AI Insights
              <Badge className="bg-blue-100 text-blue-700 border-blue-300">LIVE</Badge>
            </h3>
            <ul className="space-y-1.5 text-sm text-gray-700">
              {config.insights.map((insight, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-100">
            <Activity className="w-4 h-4 mr-1" />
            Details
          </Button>
        </div>
      </Card>

      {/* Main Table Card */}
      <Card className="border border-gray-200">
        {/* Header */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg">{config.title}</h2>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={handleExport} className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Settings2 className="w-4 h-4" />
                    Columns
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[220px]">
                  <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {config.columns.map(col => (
                    <DropdownMenuCheckboxItem
                      key={col}
                      checked={visibleColumns[col]}
                      onCheckedChange={(checked) => setVisibleColumns(prev => ({ ...prev, [col]: checked }))}
                    >
                      {col.charAt(0).toUpperCase() + col.slice(1).replace(/([A-Z])/g, ' $1')}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-3 text-xs uppercase tracking-wider text-gray-600 w-10"></th>
                {visibleColumns.order && <th className="text-left p-3 text-xs uppercase tracking-wider text-gray-600">Order ID</th>}
                {visibleColumns.channel && <th className="text-left p-3 text-xs uppercase tracking-wider text-gray-600">Channel</th>}
                {visibleColumns.processor && <th className="text-left p-3 text-xs uppercase tracking-wider text-gray-600">Processor</th>}
                {visibleColumns.payoutBatchId && <th className="text-left p-3 text-xs uppercase tracking-wider text-gray-600">Payout ID</th>}
                {visibleColumns.payoutDate && <th className="text-left p-3 text-xs uppercase tracking-wider text-gray-600">Payout Date</th>}
                {visibleColumns.batchAge && <th className="text-left p-3 text-xs uppercase tracking-wider text-gray-600">Batch Age</th>}
                {visibleColumns.status && <th className="text-left p-3 text-xs uppercase tracking-wider text-gray-600">Status</th>}
                {visibleColumns.revenue && <th className="text-right p-3 text-xs uppercase tracking-wider text-gray-600">Revenue</th>}
                {visibleColumns.platformFees && <th className="text-right p-3 text-xs uppercase tracking-wider text-gray-600">Platform Fees</th>}
                {visibleColumns.fulfillmentFee && <th className="text-right p-3 text-xs uppercase tracking-wider text-gray-600">Fulfillment</th>}
                {visibleColumns.refundFee && <th className="text-right p-3 text-xs uppercase tracking-wider text-gray-600">Refund Fee</th>}
                {visibleColumns.returnShipping && <th className="text-right p-3 text-xs uppercase tracking-wider text-gray-600">Return Ship</th>}
                {visibleColumns.revenueImpactPercent && <th className="text-right p-3 text-xs uppercase tracking-wider text-gray-600">% of Revenue Impact</th>}
                {visibleColumns.adDeductions && <th className="text-right p-3 text-xs uppercase tracking-wider text-gray-600">Ad Spend</th>}
                {visibleColumns.adSpendVsRevenuePercent && <th className="text-right p-3 text-xs uppercase tracking-wider text-gray-600">% of Ad Spend vs Revenue</th>}
                {visibleColumns.payoutAmount && <th className="text-right p-3 text-xs uppercase tracking-wider text-gray-600">Payout</th>}
                {visibleColumns.variance && <th className="text-right p-3 text-xs uppercase tracking-wider text-gray-600">Variance</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockPayments.map((payment, idx) => {
                const StatusIcon = statusConfig[payment.status].icon;
                const isExpanded = expandedRow === payment.orderId;
                
                return (
                  <React.Fragment key={payment.orderId}>
                    <tr 
                      className={`hover:bg-gray-50 transition-colors cursor-pointer ${payment.hasIssue ? 'bg-red-50/50' : ''}`}
                      onClick={() => toggleRow(payment.orderId)}
                    >
                      <td className="p-3">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        )}
                      </td>
                      {visibleColumns.order && (
                        <td className="p-3 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="font-mono">{payment.orderId}</span>
                            {payment.hasIssue && <AlertCircle className="w-4 h-4 text-red-600" />}
                          </div>
                        </td>
                      )}
                      {visibleColumns.channel && (
                        <td className="p-3 text-sm">
                          <ChannelBadge channel={payment.channel} size="sm" />
                        </td>
                      )}
                      {visibleColumns.processor && (
                        <td className="p-3 text-sm" onClick={(e) => e.stopPropagation()}>
                          <TooltipProvider>
                            <Tooltip delayDuration={200}>
                              <TooltipTrigger asChild>
                                <div className="flex items-center gap-1 cursor-help">
                                  <CreditCard className="w-4 h-4 text-gray-400" />
                                  <span>{payment.processor}</span>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent className="p-3 bg-white border border-gray-200 shadow-lg">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                                    <CreditCard className="w-4 h-4 text-blue-600" />
                                    <span className="font-semibold text-gray-900">Payment Details</span>
                                  </div>
                                  <div className="space-y-1 text-xs">
                                    <div className="flex justify-between gap-4">
                                      <span className="text-gray-600">Method:</span>
                                      <span className="font-semibold text-gray-900">{getProcessorDetails(payment.processor).method}</span>
                                    </div>
                                    <div className="flex justify-between gap-4">
                                      <span className="text-gray-600">Account:</span>
                                      <span className="font-mono text-gray-900">{getProcessorDetails(payment.processor).accountLast4}</span>
                                    </div>
                                    <div className="flex justify-between gap-4">
                                      <span className="text-gray-600">Transfer Time:</span>
                                      <span className="text-gray-900">{getProcessorDetails(payment.processor).transferTime}</span>
                                    </div>
                                    <div className="flex justify-between gap-4">
                                      <span className="text-gray-600">Fees:</span>
                                      <span className="text-gray-900">{getProcessorDetails(payment.processor).fees}</span>
                                    </div>
                                  </div>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </td>
                      )}
                      {visibleColumns.payoutBatchId && (
                        <td className="p-3 text-sm font-mono text-blue-600">{payment.payoutBatchId}</td>
                      )}
                      {visibleColumns.payoutDate && (
                        <td className="p-3 text-sm">{payment.payoutDate}</td>
                      )}
                      {visibleColumns.batchAge && (
                        <td className="p-3 text-sm">{formatBatchAge(payment.batchAge)}</td>
                      )}
                      {visibleColumns.status && (
                        <td className="p-3">
                          <Badge className={`${statusConfig[payment.status].color} border flex items-center gap-1 w-fit`}>
                            <StatusIcon className="w-3 h-3" />
                            {statusConfig[payment.status].label}
                          </Badge>
                        </td>
                      )}
                      {visibleColumns.revenue && (
                        <td className="p-3 text-sm text-right">{formatCurrency(payment.revenue)}</td>
                      )}
                      {visibleColumns.platformFees && (
                        <td className="p-3 text-sm text-right">{formatCurrency(payment.platformFees)}</td>
                      )}
                      {visibleColumns.fulfillmentFee && (
                        <td className="p-3 text-sm text-right">{formatCurrency(payment.fulfillmentFee)}</td>
                      )}
                      {visibleColumns.refundFee && (
                        <td className="p-3 text-sm text-right">{formatCurrency(payment.refundFee)}</td>
                      )}
                      {visibleColumns.returnShipping && (
                        <td className="p-3 text-sm text-right">{formatCurrency(payment.returnShipping)}</td>
                      )}
                      {visibleColumns.revenueImpactPercent && (
                        <td className="p-3 text-sm text-right">{formatPercentage(payment.revenueImpactPercent || 0)}</td>
                      )}
                      {visibleColumns.adDeductions && (
                        <td className="p-3 text-sm text-right">{formatCurrency(payment.adDeductions)}</td>
                      )}
                      {visibleColumns.adSpendVsRevenuePercent && (
                        <td className="p-3 text-sm text-right">{formatPercentage(payment.adSpendVsRevenuePercent || 0)}</td>
                      )}
                      {visibleColumns.payoutAmount && (
                        <td className="p-3 text-sm text-right font-semibold">{formatCurrency(payment.payoutAmount)}</td>
                      )}
                      {visibleColumns.variance && (
                        <td className="p-3 text-sm text-right">{formatVariance(payment.variance)}</td>
                      )}
                    </tr>
                    
                    {/* Drill-down Details Row */}
                    {isExpanded && (
                      <tr className="bg-blue-50/30">
                        <td colSpan={20} className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card className="border border-blue-200 bg-white p-4">
                              <p className="text-xs text-gray-600 mb-2">Order Details</p>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Date:</span>
                                  <span className="font-semibold">{payment.orderDate}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Quantity:</span>
                                  <span className="font-semibold">{payment.quantity} units</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Revenue:</span>
                                  {formatCurrency(payment.revenue)}
                                </div>
                              </div>
                            </Card>

                            <Card className="border border-blue-200 bg-white p-4">
                              <p className="text-xs text-gray-600 mb-2">Fee Breakdown</p>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Platform:</span>
                                  {formatCurrency(payment.platformFees)}
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Fulfillment:</span>
                                  {formatCurrency(payment.fulfillmentFee)}
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Refund:</span>
                                  {formatCurrency(payment.refundFee)}
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Ads:</span>
                                  {formatCurrency(payment.adDeductions)}
                                </div>
                              </div>
                            </Card>

                            <Card className="border border-blue-200 bg-white p-4">
                              <p className="text-xs text-gray-600 mb-2">Settlement Info</p>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Batch:</span>
                                  <span className="font-mono text-blue-600">{payment.payoutBatchId}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Payout Date:</span>
                                  <span className="font-semibold">{payment.payoutDate}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Paid Via:</span>
                                  <span className="font-semibold">{getProcessorDetails(payment.processor).method}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Account:</span>
                                  <span className="font-mono text-xs">{getProcessorDetails(payment.processor).accountLast4}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Net Payout:</span>
                                  <span className="font-semibold">{formatCurrency(payment.payoutAmount)}</span>
                                </div>
                                {payment.hasIssue && (
                                  <div className="mt-2 pt-2 border-t border-gray-200">
                                    <Badge className="bg-red-100 text-red-700 border-red-200 w-full justify-center">
                                      <AlertCircle className="w-3 h-3 mr-1" />
                                      Requires Review
                                    </Badge>
                                  </div>
                                )}
                              </div>
                            </Card>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
            
            {/* Totals Row */}
            <tfoot className="bg-gray-100 border-t-2 border-gray-300">
              <tr>
                <td className="p-3"></td>
                {visibleColumns.order && <td className="p-3 text-sm font-semibold">Totals</td>}
                {visibleColumns.channel && <td className="p-3"></td>}
                {visibleColumns.processor && <td className="p-3"></td>}
                {visibleColumns.payoutBatchId && <td className="p-3"></td>}
                {visibleColumns.payoutDate && <td className="p-3"></td>}
                {visibleColumns.batchAge && <td className="p-3"></td>}
                {visibleColumns.status && <td className="p-3"></td>}
                {visibleColumns.revenue && (
                  <td className="p-3 text-sm text-right font-semibold">{formatCurrency(totals.revenue)}</td>
                )}
                {visibleColumns.platformFees && (
                  <td className="p-3 text-sm text-right font-semibold">{formatCurrency(totals.platformFees)}</td>
                )}
                {visibleColumns.fulfillmentFee && (
                  <td className="p-3 text-sm text-right font-semibold">{formatCurrency(totals.fulfillmentFee)}</td>
                )}
                {visibleColumns.refundFee && (
                  <td className="p-3 text-sm text-right font-semibold">{formatCurrency(totals.refundFee)}</td>
                )}
                {visibleColumns.returnShipping && (
                  <td className="p-3 text-sm text-right font-semibold">{formatCurrency(totals.returnShipping)}</td>
                )}
                {visibleColumns.revenueImpactPercent && <td className="p-3"></td>}
                {visibleColumns.adDeductions && (
                  <td className="p-3 text-sm text-right font-semibold">{formatCurrency(totals.adDeductions)}</td>
                )}
                {visibleColumns.adSpendVsRevenuePercent && <td className="p-3"></td>}
                {visibleColumns.payoutAmount && (
                  <td className="p-3 text-sm text-right font-semibold">{formatCurrency(totals.payoutAmount)}</td>
                )}
                {visibleColumns.variance && <td className="p-3"></td>}
              </tr>

              {/* Conditional footer rows based on view */}
              {view === "orders" && (
                <tr className="border-t border-gray-300">
                  <td className="p-3"></td>
                  {visibleColumns.order && (
                    <td className="p-3 text-sm font-semibold text-green-700 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      Recovered from Disputes ($)
                    </td>
                  )}
                  {visibleColumns.channel && <td className="p-3"></td>}
                  {visibleColumns.processor && <td className="p-3"></td>}
                  {visibleColumns.payoutBatchId && <td className="p-3"></td>}
                  {visibleColumns.payoutDate && <td className="p-3"></td>}
                  {visibleColumns.batchAge && <td className="p-3"></td>}
                  {visibleColumns.status && <td className="p-3"></td>}
                  {visibleColumns.revenue && <td className="p-3"></td>}
                  {visibleColumns.platformFees && <td className="p-3"></td>}
                  {visibleColumns.fulfillmentFee && <td className="p-3"></td>}
                  {visibleColumns.refundFee && <td className="p-3"></td>}
                  {visibleColumns.returnShipping && <td className="p-3"></td>}
                  {visibleColumns.revenueImpactPercent && <td className="p-3"></td>}
                  {visibleColumns.adDeductions && <td className="p-3"></td>}
                  {visibleColumns.adSpendVsRevenuePercent && <td className="p-3"></td>}
                  {visibleColumns.payoutAmount && (
                    <td className="p-3 text-sm text-right font-semibold text-green-700">
                      +$342.50
                    </td>
                  )}
                  {visibleColumns.variance && <td className="p-3"></td>}
                </tr>
              )}

              {view === "payouts" && (
                <tr className="border-t border-gray-300">
                  <td className="p-3"></td>
                  {visibleColumns.order && (
                    <td className="p-3 text-sm font-semibold text-blue-700 flex items-center gap-1">
                      <Activity className="w-4 h-4" />
                      AI Forecast: Next 7 day payouts $
                    </td>
                  )}
                  {visibleColumns.channel && <td className="p-3"></td>}
                  {visibleColumns.processor && <td className="p-3"></td>}
                  {visibleColumns.payoutBatchId && <td className="p-3"></td>}
                  {visibleColumns.payoutDate && <td className="p-3"></td>}
                  {visibleColumns.batchAge && <td className="p-3"></td>}
                  {visibleColumns.status && <td className="p-3"></td>}
                  {visibleColumns.revenue && <td className="p-3"></td>}
                  {visibleColumns.platformFees && <td className="p-3"></td>}
                  {visibleColumns.fulfillmentFee && <td className="p-3"></td>}
                  {visibleColumns.refundFee && <td className="p-3"></td>}
                  {visibleColumns.returnShipping && <td className="p-3"></td>}
                  {visibleColumns.revenueImpactPercent && <td className="p-3"></td>}
                  {visibleColumns.adDeductions && <td className="p-3"></td>}
                  {visibleColumns.adSpendVsRevenuePercent && <td className="p-3"></td>}
                  {visibleColumns.payoutAmount && (
                    <td className="p-3 text-sm text-right font-semibold text-blue-700">
                      $24,450.00
                    </td>
                  )}
                  {visibleColumns.variance && <td className="p-3"></td>}
                </tr>
              )}

              {view === "refunds" && (
                <tr className="border-t border-gray-300">
                  <td className="p-3"></td>
                  {visibleColumns.order && (
                    <td className="p-3 text-sm font-semibold text-red-700 flex items-center gap-1">
                      <TrendingDown className="w-4 h-4" />
                      Total Refund Drag On Margin %
                    </td>
                  )}
                  {visibleColumns.channel && <td className="p-3"></td>}
                  {visibleColumns.processor && <td className="p-3"></td>}
                  {visibleColumns.payoutBatchId && <td className="p-3"></td>}
                  {visibleColumns.payoutDate && <td className="p-3"></td>}
                  {visibleColumns.batchAge && <td className="p-3"></td>}
                  {visibleColumns.status && <td className="p-3"></td>}
                  {visibleColumns.revenue && <td className="p-3"></td>}
                  {visibleColumns.platformFees && <td className="p-3"></td>}
                  {visibleColumns.fulfillmentFee && <td className="p-3"></td>}
                  {visibleColumns.refundFee && <td className="p-3"></td>}
                  {visibleColumns.returnShipping && <td className="p-3"></td>}
                  {visibleColumns.revenueImpactPercent && (
                    <td className="p-3 text-sm text-right font-semibold text-red-700">
                      8.2%
                    </td>
                  )}
                  {visibleColumns.adDeductions && <td className="p-3"></td>}
                  {visibleColumns.adSpendVsRevenuePercent && <td className="p-3"></td>}
                  {visibleColumns.payoutAmount && <td className="p-3"></td>}
                  {visibleColumns.variance && <td className="p-3"></td>}
                </tr>
              )}

              {view === "ads" && (
                <tr className="border-t border-gray-300">
                  <td className="p-3"></td>
                  {visibleColumns.order && (
                    <td className="p-3 text-sm font-semibold text-orange-700 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      Total ad leakage on payouts ($)
                    </td>
                  )}
                  {visibleColumns.channel && <td className="p-3"></td>}
                  {visibleColumns.processor && <td className="p-3"></td>}
                  {visibleColumns.payoutBatchId && <td className="p-3"></td>}
                  {visibleColumns.payoutDate && <td className="p-3"></td>}
                  {visibleColumns.batchAge && <td className="p-3"></td>}
                  {visibleColumns.status && <td className="p-3"></td>}
                  {visibleColumns.revenue && <td className="p-3"></td>}
                  {visibleColumns.platformFees && <td className="p-3"></td>}
                  {visibleColumns.fulfillmentFee && <td className="p-3"></td>}
                  {visibleColumns.refundFee && <td className="p-3"></td>}
                  {visibleColumns.returnShipping && <td className="p-3"></td>}
                  {visibleColumns.revenueImpactPercent && <td className="p-3"></td>}
                  {visibleColumns.adDeductions && (
                    <td className="p-3 text-sm text-right font-semibold text-orange-700">
                      -$182.50
                    </td>
                  )}
                  {visibleColumns.adSpendVsRevenuePercent && <td className="p-3"></td>}
                  {visibleColumns.payoutAmount && <td className="p-3"></td>}
                  {visibleColumns.variance && <td className="p-3"></td>}
                </tr>
              )}
            </tfoot>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-gray-200 p-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages} · Showing 6 of 8,451 results
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

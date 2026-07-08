import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { DateRangeFilter } from "./DateRangeFilter";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Search, Download, Settings2, TrendingUp, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { ChannelIcon } from "./ChannelBadge";

const handleFilterApply = (filters: any) => {
  console.log("Filters applied to Reconcile Orders:", filters);
  // API call here
};

interface OrderData {
  orderId: string;
  orderDate: string;
  channel: "amazon" | "shopify" | "walmart";
  status: "rto-received" | "unsettled" | "shipped" | "delivered";
  quantity: number;
  invoice: number;
  platformFees: number;
  fulfillmentFee: number;
  customerReturns: number;
  payoutAmount: number;
  bankTransfer: string | number;
  processorPayments: number;
}

const mockOrders: OrderData[] = [
  {
    orderId: "2025-03-01 / 127261503774854400_1",
    orderDate: "2025-03-01",
    channel: "amazon",
    status: "rto-received",
    quantity: 200,
    invoice: -183891,
    platformFees: -183891,
    fulfillmentFee: -48654,
    customerReturns: -48654,
    payoutAmount: -183891,
    bankTransfer: "Not Received",
    processorPayments: -183891,
  },
  {
    orderId: "2025-03-01 / 127260507748540_2",
    orderDate: "2025-03-01",
    channel: "amazon",
    status: "unsettled",
    quantity: 2,
    invoice: 0,
    platformFees: 0,
    fulfillmentFee: 0,
    customerReturns: 0,
    payoutAmount: 0,
    bankTransfer: "Not Received",
    processorPayments: 0,
  },
  {
    orderId: "2025-03-01 / 127260507748540_3",
    orderDate: "2025-03-01",
    channel: "amazon",
    status: "shipped",
    quantity: 2,
    invoice: 1000,
    platformFees: 0,
    fulfillmentFee: 0,
    customerReturns: 0,
    payoutAmount: 0,
    bankTransfer: 0,
    processorPayments: 0,
  },
  {
    orderId: "2025-03-01 / 127260507748540_4",
    orderDate: "2025-03-01",
    channel: "amazon",
    status: "shipped",
    quantity: 2,
    invoice: 0,
    platformFees: 0,
    fulfillmentFee: 0,
    customerReturns: 0,
    payoutAmount: 0,
    bankTransfer: 0,
    processorPayments: 0,
  },
  {
    orderId: "2025-03-01 / 127260507748540_5",
    orderDate: "2025-03-01",
    channel: "shopify",
    status: "shipped",
    quantity: 2,
    invoice: 0,
    platformFees: 0,
    fulfillmentFee: 0,
    customerReturns: 0,
    payoutAmount: 0,
    bankTransfer: 0,
    processorPayments: 231,
  },
  {
    orderId: "2025-03-01 / 127260507748540_6",
    orderDate: "2025-03-01",
    channel: "shopify",
    status: "shipped",
    quantity: 2,
    invoice: 0,
    platformFees: 0,
    fulfillmentFee: 0,
    customerReturns: 0,
    payoutAmount: 0,
    bankTransfer: 0,
    processorPayments: 821,
  },
  {
    orderId: "2025-03-01 / 127260507748540_7",
    orderDate: "2025-03-01",
    channel: "walmart",
    status: "shipped",
    quantity: 0,
    invoice: 0,
    platformFees: 0,
    fulfillmentFee: 0,
    customerReturns: 0,
    payoutAmount: 0,
    bankTransfer: 0,
    processorPayments: 0,
  },
];

const statusConfig = {
  "rto-received": { label: "Return Received", color: "bg-red-100 text-red-700 border-red-200" },
  "unsettled": { label: "Unsettled", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  "shipped": { label: "Shipped", color: "bg-green-100 text-green-700 border-green-200" },
  "delivered": { label: "Delivered", color: "bg-blue-100 text-blue-700 border-blue-200" },
};

export function ReconcileOrders() {
  const [visibleColumns, setVisibleColumns] = useState({
    order: true,
    channel: true,
    status: true,
    quantity: true,
    invoice: true,
    platformFees: true,
    fulfillmentFee: true,
    customerReturns: true,
    payoutAmount: true,
    bankTransfer: true,
    processorPayments: true,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 14;
  const [settlementFilter, setSettlementFilter] = useState<"all" | "settled" | "unsettled">("all");
  
  const filteredOrders = mockOrders.filter(order => {
    if (settlementFilter === "settled") return order.status === "delivered" || order.status === "shipped";
    if (settlementFilter === "unsettled") return order.status === "unsettled" || order.status === "rto-received";
    return true;
  });

  const handleExport = () => {
    console.log("Exporting data...");
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Filter Section */}
      <DateRangeFilter onFilterApply={handleFilterApply} />
      
      {/* Helix AI Insight Banner */}
      <Card className="border-2 border-blue-400 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 shadow-md">
        <div className="flex items-start gap-3 p-4">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl shadow-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              Helix AI Insights
              <Badge className="bg-blue-100 text-blue-700 border-blue-300">LIVE</Badge>
            </h3>
            <ul className="space-y-1.5 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>$18,900 scheduled payout this week across all channels</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>$2,130 pending refunds may impact next settlement cycle</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>3 orders require immediate attention for settlement discrepancies</span>
              </li>
            </ul>
          </div>
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-100">
            View Details
          </Button>
        </div>
      </Card>

      {/* Main Table Card */}
      <Card className="border border-gray-200">
        {/* Header */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg">Order Settlements</h2>
              <AlertCircle className="w-5 h-5 text-gray-400" />
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
                    Column Settings
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[220px]">
                  <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={visibleColumns.order}
                    onCheckedChange={(checked) => setVisibleColumns(prev => ({ ...prev, order: checked }))}
                  >
                    Order ID
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={visibleColumns.channel}
                    onCheckedChange={(checked) => setVisibleColumns(prev => ({ ...prev, channel: checked }))}
                  >
                    Channel
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={visibleColumns.status}
                    onCheckedChange={(checked) => setVisibleColumns(prev => ({ ...prev, status: checked }))}
                  >
                    Status
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={visibleColumns.quantity}
                    onCheckedChange={(checked) => setVisibleColumns(prev => ({ ...prev, quantity: checked }))}
                  >
                    Quantity
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={visibleColumns.invoice}
                    onCheckedChange={(checked) => setVisibleColumns(prev => ({ ...prev, invoice: checked }))}
                  >
                    Invoice
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={visibleColumns.platformFees}
                    onCheckedChange={(checked) => setVisibleColumns(prev => ({ ...prev, platformFees: checked }))}
                  >
                    Platform Fees
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={visibleColumns.fulfillmentFee}
                    onCheckedChange={(checked) => setVisibleColumns(prev => ({ ...prev, fulfillmentFee: checked }))}
                  >
                    Fulfillment Fee
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={visibleColumns.customerReturns}
                    onCheckedChange={(checked) => setVisibleColumns(prev => ({ ...prev, customerReturns: checked }))}
                  >
                    Customer Returns
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={visibleColumns.payoutAmount}
                    onCheckedChange={(checked) => setVisibleColumns(prev => ({ ...prev, payoutAmount: checked }))}
                  >
                    Payout Amount
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={visibleColumns.bankTransfer}
                    onCheckedChange={(checked) => setVisibleColumns(prev => ({ ...prev, bankTransfer: checked }))}
                  >
                    Bank Transfer
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={visibleColumns.processorPayments}
                    onCheckedChange={(checked) => setVisibleColumns(prev => ({ ...prev, processorPayments: checked }))}
                  >
                    Processor Payments
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Search */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search By Key Word"
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {visibleColumns.channel && (
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Channel</th>
                )}
                {visibleColumns.order && (
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Order</th>
                )}
                {visibleColumns.status && (
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">Status</th>
                )}
                {visibleColumns.quantity && (
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">Quantity</th>
                )}
                {visibleColumns.invoice && (
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">Invoice</th>
                )}
                {visibleColumns.platformFees && (
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">Platform Fees</th>
                )}
                {visibleColumns.fulfillmentFee && (
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">Fulfillment Fee</th>
                )}
                {visibleColumns.customerReturns && (
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">Customer Returns</th>
                )}
                {visibleColumns.payoutAmount && (
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">Payout Amount</th>
                )}
                {visibleColumns.bankTransfer && (
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">Bank Transfer</th>
                )}
                {visibleColumns.processorPayments && (
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">Processor Payments</th>
                )}
                <th className="px-4 py-3 w-12"></th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  {visibleColumns.channel && (
                    <td className="px-4 py-3">
                      <ChannelIcon channel={order.channel} size="sm" />
                    </td>
                  )}
                  {visibleColumns.order && (
                    <td className="px-4 py-3">
                      <div className="text-xs font-mono text-gray-900">{order.orderId}</div>
                    </td>
                  )}
                  {visibleColumns.status && (
                    <td className="px-4 py-3 text-center">
                      <Badge variant="secondary" className={statusConfig[order.status].color}>
                        {statusConfig[order.status].label}
                      </Badge>
                    </td>
                  )}
                  {visibleColumns.quantity && (
                    <td className="px-4 py-3 text-right text-xs text-gray-700">{order.quantity}</td>
                  )}
                  {visibleColumns.invoice && (
                    <td className="px-4 py-3 text-right text-xs text-gray-700">
                      ${order.invoice.toLocaleString()}
                    </td>
                  )}
                  {visibleColumns.platformFees && (
                    <td className="px-4 py-3 text-right text-xs text-gray-700">
                      ${order.platformFees.toLocaleString()}
                    </td>
                  )}
                  {visibleColumns.fulfillmentFee && (
                    <td className="px-4 py-3 text-right text-xs text-gray-700">
                      ${order.fulfillmentFee.toLocaleString()}
                    </td>
                  )}
                  {visibleColumns.customerReturns && (
                    <td className="px-4 py-3 text-right text-xs text-gray-700">
                      ${order.customerReturns.toLocaleString()}
                    </td>
                  )}
                  {visibleColumns.payoutAmount && (
                    <td className="px-4 py-3 text-right text-xs text-gray-700">
                      ${order.payoutAmount.toLocaleString()}
                    </td>
                  )}
                  {visibleColumns.bankTransfer && (
                    <td className="px-4 py-3 text-right text-xs">
                      {typeof order.bankTransfer === "string" ? (
                        <span className="text-red-600">{order.bankTransfer}</span>
                      ) : (
                        <span className="text-gray-700">${order.bankTransfer.toLocaleString()}</span>
                      )}
                    </td>
                  )}
                  {visibleColumns.processorPayments && (
                    <td className="px-4 py-3 text-right text-xs text-gray-700">
                      {order.processorPayments > 0 && `$${order.processorPayments}`}
                    </td>
                  )}
                  <td className="px-4 py-3">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Row */}
        <div className="border-t border-gray-300 bg-gray-50 px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm text-gray-900">Total</span>
            <div className="flex items-center gap-8 text-xs text-gray-700">
              <div>
                <span className="font-medium">Invoice:</span> $2,22,593
              </div>
              <div>
                <span className="font-medium">Platform Fees:</span> $2,22,593
              </div>
              <div>
                <span className="font-medium">Total Payout:</span> -$48,654
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <div className="flex items-center gap-2">
              {[1, 2, 3, '...', 12, 13, 14].map((page, idx) => (
                <button
                  key={idx}
                  onClick={() => typeof page === 'number' && setCurrentPage(page)}
                  className={`px-3 py-1 rounded text-sm ${
                    page === currentPage
                      ? 'bg-blue-600 text-white'
                      : page === '...'
                      ? 'text-gray-400 cursor-default'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  disabled={page === '...'}
                >
                  {page}
                </button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

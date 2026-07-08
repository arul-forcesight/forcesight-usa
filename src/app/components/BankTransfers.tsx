import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Calendar, Download, MoreVertical, Search } from "lucide-react";
import { ChannelIcon } from "./ChannelBadge";
import { DateRangeFilter } from "./DateRangeFilter";

export function BankTransfers() {
  const handleFilterApply = (filters: any) => {
    console.log("Filters applied to Bank Transfers:", filters);
    // API call here
  };
  const transfers = [
    {
      id: "4200093153",
      channel: "Amazon",
      orderDate: "21.04.25",
      depositDate: "21.04.25",
      qty: 1,
      paidAmount: "$30,051",
      totalSettlement: "$66,37,847",
      outstanding: "$30,051",
      otherSettlements: 2,
    },
    {
      id: "ABC00093153",
      channel: "Amazon",
      orderDate: "21.04.25",
      depositDate: "21.04.25",
      qty: 1,
      paidAmount: "$30,051",
      totalSettlement: "$10,99,786",
      outstanding: "$30,051",
      otherSettlements: 3,
    },
    {
      id: "ABC00093153",
      channel: "Amazon",
      orderDate: "21.04.25",
      depositDate: "21.04.25",
      qty: 1,
      paidAmount: "$30,051",
      totalSettlement: "$1,45,119",
      outstanding: "$30,051",
      otherSettlements: 3,
    },
    {
      id: "ABC00093153",
      channel: "Amazon",
      orderDate: "21.04.25",
      depositDate: "21.04.25",
      qty: 1,
      paidAmount: "$30,051",
      totalSettlement: "-$8,11,810",
      outstanding: "$30,051",
      otherSettlements: 3,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Filter Section */}
      <DateRangeFilter onFilterApply={handleFilterApply} />
      
      <Card className="border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <div>
            <h3 className="text-base font-medium text-gray-900">Bank Transfers</h3>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by transfer ID..."
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Channel</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Transfer ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Settlement ID</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">Transfer Date</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">Deposit Date</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">QTY</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">Transferred Amount</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">Total Settlement</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">Outstanding</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">Related Transfers</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {transfers.map((transfer, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <ChannelIcon channel={transfer.channel} size="md" />
                </td>
                <td className="px-4 py-4 text-sm font-semibold text-gray-900">
                  {transfer.id}
                </td>
                <td className="px-4 py-4 text-sm font-semibold text-gray-900">
                  {transfer.id}
                </td>
                <td className="px-4 py-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {transfer.orderDate}
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {transfer.depositDate}
                  </div>
                </td>
                <td className="px-4 py-4 text-center text-sm text-gray-600">
                  {transfer.qty}
                </td>
                <td className="px-4 py-4 text-right text-sm text-gray-600">
                  {transfer.paidAmount}
                </td>
                <td className="px-4 py-4 text-right text-sm text-gray-900 font-medium underline cursor-pointer hover:text-blue-600">
                  {transfer.totalSettlement}
                </td>
                <td className="px-4 py-4 text-right text-sm text-gray-600">
                  {transfer.outstanding}
                </td>
                <td className="px-4 py-4 text-center">
                  <Badge variant="secondary" className="bg-blue-50 text-blue-600 hover:bg-blue-100">
                    {transfer.otherSettlements} more
                  </Badge>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Download className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50 border-t">
            <tr>
              <td colSpan={6} className="px-4 py-3 text-sm font-medium text-gray-900">
                Total
              </td>
              <td className="px-4 py-3 text-right text-sm font-medium text-gray-900">28</td>
              <td className="px-4 py-3 text-right text-sm font-medium text-gray-900">$10,99,786</td>
              <td className="px-4 py-3 text-right text-sm font-medium text-gray-900">$10,99,786</td>
              <td className="px-4 py-3 text-right text-sm font-medium text-gray-900">$10,99,786</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Card>
    </div>
  );
}

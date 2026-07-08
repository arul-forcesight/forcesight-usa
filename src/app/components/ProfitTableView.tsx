import { useState } from "react";
import { Search, Info, Columns, ChevronDown, BarChart2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ChannelIcon } from "./ChannelBadge";

interface ChannelData {
  id: string;
  name: string;
  netQty: number;
  returnQty: number | string;
  returnPercent: number | string;
  netSale: number;
  mpFees: number;
  shipping: number;
  adSpend: number;
  stdCost: number;
  tax: number;
  profit: number;
  profitPercent: number;
  payoutLag: number;
  netCashRealised: number;
  profitToCashConversion: number;
  profitToCashConversionPercent: number;
}

const channelData: ChannelData[] = [
  {
    id: "amazon",
    name: "Amazon",
    netQty: 1595,
    returnQty: "-",
    returnPercent: "-",
    netSale: 511049,
    mpFees: -211402,
    shipping: 0,
    adSpend: 0,
    stdCost: -183891,
    tax: -40177,
    profit: 75550,
    profitPercent: 15,
    payoutLag: 14,
    netCashRealised: 68250,
    profitToCashConversion: -7300,
    profitToCashConversionPercent: 90.3
  },
  {
    id: "shopify",
    name: "Shopify",
    netQty: 37,
    returnQty: "-",
    returnPercent: "-",
    netSale: 72026,
    mpFees: -1191,
    shipping: 0,
    adSpend: 0,
    stdCost: 0,
    tax: -7299,
    profit: 63537,
    profitPercent: 88,
    payoutLag: 3,
    netCashRealised: 62180,
    profitToCashConversion: -1357,
    profitToCashConversionPercent: 97.9
  },
  {
    id: "ebay",
    name: "EBay",
    netQty: 47,
    returnQty: -1,
    returnPercent: 2,
    netSale: 34180,
    mpFees: 0,
    shipping: -2950,
    adSpend: 0,
    stdCost: 0,
    tax: -1178,
    profit: 30051,
    profitPercent: 88,
    payoutLag: 1,
    netCashRealised: 29850,
    profitToCashConversion: -201,
    profitToCashConversionPercent: 99.3
  },
  {
    id: "walmart",
    name: "Walmart",
    netQty: 37,
    returnQty: "-",
    returnPercent: "-",
    netSale: 72026,
    mpFees: -1191,
    shipping: 0,
    adSpend: 0,
    stdCost: 0,
    tax: -7299,
    profit: 63537,
    profitPercent: 88,
    payoutLag: 14,
    netCashRealised: 59180,
    profitToCashConversion: -4357,
    profitToCashConversionPercent: 93.1
  }
];

export function ProfitTableView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate totals
  const totals = channelData.reduce((acc, channel) => ({
    netQty: acc.netQty + channel.netQty,
    returnQty: typeof channel.returnQty === 'number' ? acc.returnQty + channel.returnQty : acc.returnQty,
    netSale: acc.netSale + channel.netSale,
    mpFees: acc.mpFees + channel.mpFees,
    shipping: acc.shipping + channel.shipping,
    adSpend: acc.adSpend + channel.adSpend,
    stdCost: acc.stdCost + channel.stdCost,
    tax: acc.tax + channel.tax,
    profit: acc.profit + channel.profit,
    netCashRealised: acc.netCashRealised + channel.netCashRealised,
    profitToCashConversion: acc.profitToCashConversion + channel.profitToCashConversion,
    totalPayoutDays: acc.totalPayoutDays + (channel.payoutLag * channel.netQty)
  }), {
    netQty: 0,
    returnQty: 0,
    netSale: 0,
    mpFees: 0,
    shipping: 0,
    adSpend: 0,
    stdCost: 0,
    tax: 0,
    profit: 0,
    netCashRealised: 0,
    profitToCashConversion: 0,
    totalPayoutDays: 0
  });

  const totalProfitPercent = totals.netSale > 0 ? (totals.profit / totals.netSale * 100) : 0;
  const avgPayoutLag = totals.netQty > 0 ? Math.round(totals.totalPayoutDays / totals.netQty) : 0;
  const totalProfitToCashConversionPercent = totals.profit > 0 ? ((totals.netCashRealised / totals.profit) * 100) : 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(Math.abs(value));
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <div className="bg-white rounded-lg border border-[#ebf0f4] shadow-[0px_0px_8px_0px_#f2f4f5]">
      {/* Header */}
      <div className="h-[72px] border-b border-gray-100 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="text-base text-[#262e36]">Profit Table</span>
            <Info className="w-6 h-6 text-[#959EA7]" />
          </div>
          <div className="relative w-[312px]">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Search className="w-5 h-5 text-[#959EA7]" />
            </div>
            <Input
              type="text"
              placeholder="Search Channel name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#f3f5f6] border-0 h-10 rounded-lg text-sm"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="h-9 px-3 gap-3 bg-[#f5faff] border-0 text-[#007fff] hover:bg-[#e6f4ff] hover:text-[#0066cc]"
          >
            Column Settings
            <Columns className="w-6 h-6" strokeWidth={2.5} />
          </Button>
          <Button className="h-9 px-3 bg-[#0a335c] hover:bg-[#082542] text-white gap-2">
            Export
            <ChevronDown className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[rgba(195,223,254,0)] border-b border-[#c1c2c3]">
              <th className="h-[60px] px-1 text-center text-xs text-[#01132d] w-[60px]">Logo</th>
              <th className="h-[60px] px-8 text-center text-xs text-[#01132d] w-[78px]">Channels</th>
              <th className="h-[60px] px-8 text-center text-xs text-[#01132d] w-[76px]">Net Qty</th>
              <th className="h-[60px] px-8 text-center text-xs text-[#01132d] w-[86px]">Return Qty</th>
              <th className="h-[60px] px-8 text-center text-xs text-[#01132d] w-[49px]">Ret %</th>
              <th className="h-[60px] px-8 text-center text-xs text-[#01132d] w-[107px]">Net Sale</th>
              <th className="h-[60px] px-8 text-center text-xs text-[#01132d] w-[99px]">MP Fees</th>
              <th className="h-[60px] px-8 text-center text-xs text-[#01132d] w-[85px]">Shipping</th>
              <th className="h-[60px] px-8 text-center text-xs text-[#01132d] w-[89px]">Ad Spend</th>
              <th className="h-[60px] px-8 text-center text-xs text-[#01132d] w-[99px]">STD Cost</th>
              <th className="h-[60px] px-8 text-center text-xs text-[#01132d] w-[85px]">Tax</th>
              <th className="h-[60px] px-8 text-center text-xs text-[#01132d] w-[86px]">Profit</th>
              <th className="h-[60px] px-8 text-center text-xs text-[#01132d] w-[46px]">Pro %</th>
              <th className="h-[60px] px-8 text-center text-xs text-[#01132d] w-[95px]">Payout Lag (days)</th>
              <th className="h-[60px] px-8 text-center text-xs text-[#01132d] w-[110px]">Net Cash Realised ($)</th>
              <th className="h-[60px] px-8 text-center text-xs text-[#01132d] w-[120px]">Profit to Cash Conv ($)</th>
              <th className="h-[60px] px-8 text-center text-xs text-[#01132d] w-[100px]">Profit to Cash Conv (%)</th>
              <th className="h-[60px] px-2 text-center text-xs text-[#01132d] w-[91px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {channelData.map((channel) => (
              <tr key={channel.id} className="border-b border-[#eaecf0] bg-white">
                <td className="h-[72px] px-1 text-center">
                  <div className="flex items-center justify-center">
                    <ChannelIcon channel={channel.id} size="md" />
                  </div>
                </td>
                <td className="h-[72px] px-1 text-center text-xs text-[#484b4c]">{channel.name}</td>
                <td className="h-[72px] px-1 text-center text-xs text-[#484b4c]">{formatNumber(channel.netQty)}</td>
                <td className="h-[72px] px-1 text-center text-xs text-[#747b81]">{channel.returnQty}</td>
                <td className="h-[72px] px-1 text-center text-xs text-[#484b4c]">{channel.returnPercent === "-" ? "-" : `${channel.returnPercent}%`}</td>
                <td className="h-[72px] px-1 text-center text-xs text-[#484b4c]">${formatCurrency(channel.netSale)}</td>
                <td className="h-[72px] px-1 text-center text-xs text-[#f42f2f]">
                  {channel.mpFees < 0 ? `-${formatCurrency(channel.mpFees)}` : formatCurrency(channel.mpFees)}
                </td>
                <td className="h-[72px] px-1 text-center text-xs text-[#747b81]">
                  {channel.shipping === 0 ? "$0" : channel.shipping < 0 ? `-${formatCurrency(channel.shipping)}` : formatCurrency(channel.shipping)}
                </td>
                <td className="h-[72px] px-1 text-center text-xs text-[#747b81]">${formatCurrency(channel.adSpend)}</td>
                <td className="h-[72px] px-1 text-center text-xs text-[#f42f2f]">
                  {channel.stdCost === 0 ? "$0" : channel.stdCost < 0 ? `-${formatCurrency(channel.stdCost)}` : formatCurrency(channel.stdCost)}
                </td>
                <td className="h-[72px] px-1 text-center text-xs text-[#747b81]">
                  {channel.tax < 0 ? `-${formatCurrency(channel.tax)}` : formatCurrency(channel.tax)}
                </td>
                <td className="h-[72px] px-1 text-center text-xs text-[#484b4c]">${formatCurrency(channel.profit)}</td>
                <td className="h-[72px] px-1 text-center text-xs text-[#4fc359]">{channel.profitPercent}%</td>
                <td className="h-[72px] px-1 text-center text-xs text-[#007fff]">{channel.payoutLag}</td>
                <td className="h-[72px] px-1 text-center text-xs text-[#484b4c]">${formatCurrency(channel.netCashRealised)}</td>
                <td className="h-[72px] px-1 text-center text-xs text-[#f42f2f]">
                  {channel.profitToCashConversion < 0 ? `-${formatCurrency(Math.abs(channel.profitToCashConversion))}` : `+${formatCurrency(channel.profitToCashConversion)}`}
                </td>
                <td className="h-[72px] px-1 text-center text-xs text-[#4fc359]">{channel.profitToCashConversionPercent.toFixed(1)}%</td>
                <td className="h-[72px] px-2">
                  <div className="flex items-center justify-end gap-3 pr-4">
                    <button className="w-6 h-6 rounded border border-[#E0F0FF] flex items-center justify-center hover:bg-gray-50">
                      <BarChart2 className="w-4 h-4 text-[#007FFF]" strokeWidth={2.5} />
                    </button>
                    <button className="w-6 h-6 rounded border border-[#EEE2FE] flex items-center justify-center hover:bg-gray-50">
                      <BarChart2 className="w-4 h-4 text-[#7405FB]" strokeWidth={2.5} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Row */}
      <div className="h-[60px] bg-[#eff0f1] border-t border-[#eaecf0] flex items-center">
        <div className="flex items-center w-full">
          <div className="w-[60px]"></div>
          <div className="w-[78px] px-1 text-center text-sm text-black">Total</div>
          <div className="w-[76px] px-1 text-center text-sm text-black">{formatNumber(totals.netQty)}</div>
          <div className="w-[86px] px-1 text-center text-xs text-[#f42f2f]">{totals.returnQty}</div>
          <div className="w-[49px] px-1 text-center text-xs text-black">0%</div>
          <div className="w-[107px] px-1 text-center text-sm text-black">${formatCurrency(totals.netSale)}</div>
          <div className="w-[99px] px-1 text-center text-xs text-[#f42f2f]">-${formatCurrency(totals.mpFees)}</div>
          <div className="w-[85px] px-1 text-center text-xs text-[#f42f2f]">
            {totals.shipping === 0 ? "$0" : `-${formatCurrency(totals.shipping)}`}
          </div>
          <div className="w-[89px] px-1 text-center text-xs text-black">$0</div>
          <div className="w-[99px] px-1 text-center text-xs text-[#f42f2f]">-${formatCurrency(totals.stdCost)}</div>
          <div className="w-[85px] px-1 text-center text-xs text-[#f42f2f]">-${formatCurrency(totals.tax)}</div>
          <div className="w-[86px] px-1 text-center text-sm text-black">${formatCurrency(totals.profit)}</div>
          <div className="w-[46px] px-1 text-center text-sm text-[#4fc359]">{Math.round(totalProfitPercent)}%</div>
          <div className="w-[95px] px-1 text-center text-sm text-[#007fff]">{avgPayoutLag}</div>
          <div className="w-[110px] px-1 text-center text-sm text-black">${formatCurrency(totals.netCashRealised)}</div>
          <div className="w-[120px] px-1 text-center text-xs text-[#f42f2f]">
            {totals.profitToCashConversion < 0 ? `-${formatCurrency(Math.abs(totals.profitToCashConversion))}` : `+${formatCurrency(totals.profitToCashConversion)}`}
          </div>
          <div className="w-[100px] px-1 text-center text-sm text-[#4fc359]">{totalProfitToCashConversionPercent.toFixed(1)}%</div>
          <div className="w-[91px] px-2 flex justify-end pr-4">
            <button className="w-6 h-6 rounded border border-[#EEE2FE] flex items-center justify-center hover:bg-gray-50">
              <BarChart2 className="w-4 h-4 text-[#7405FB]" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="border-t border-[#eaecf0] px-6 py-4">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            className="gap-2 bg-gray-50 text-[#d0d5dd] border-gray-200"
            disabled
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
              <path d="M15.8333 10H4.16667M4.16667 10L10 15.8333M4.16667 10L10 4.16667" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Previous
          </Button>

          <div className="flex items-center gap-0.5">
            {[1, 2, 3, "...", 8, 9, 10].map((page, idx) => (
              <button
                key={idx}
                className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm ${
                  page === currentPage
                    ? "bg-[#007fff] text-white"
                    : "text-[#747474] hover:bg-gray-100"
                }`}
                onClick={() => typeof page === 'number' && setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            className="gap-2 bg-gray-50 text-[#344054] border-gray-200"
          >
            Next
            <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
              <path d="M4.16667 10H15.8333M15.8333 10L10 4.16667M15.8333 10L10 15.8333" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}

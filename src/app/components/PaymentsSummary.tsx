import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { DateRangeFilter } from "./DateRangeFilter";
import {
  GlobalFilterSystem,
  FilterValues,
} from "./GlobalFilterSystem";
import { PaymentChannelCharts } from "./PaymentChannelCharts";
import {
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface AppliedFilter {
  id: string;
  type: keyof FilterValues;
  label: string;
  value: any;
}

export function PaymentsSummary() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [appliedFilters, setAppliedFilters] = useState<
    AppliedFilter[]
  >([]);

  const handleFilterApply = (filters: FilterValues) => {
    console.log(
      "Filters applied to Payments Summary:",
      filters,
    );
  };

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

      {/* Helix AI Insight Banner */}
      <Card className="border-2 border-blue-400 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
        <div className="flex items-start gap-3 p-4">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              Helix AI Payment Intelligence
              <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                LIVE
              </Badge>
            </h3>
            <ul className="space-y-1.5 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>
                  Expected $21,230 this week, received $18,900
                  (89% achievement) — Amazon payout Thursday
                  $15,400
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>
                  3 orders have settlement variance {">"} 1%
                  requiring review for potential overcharges
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>
                  $2,130 pending refunds may reduce next payout
                  — 2 payouts overdue by 3+ days
                </span>
              </li>
            </ul>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-100"
          >
            Details
          </Button>
        </div>
      </Card>

      {/* 4 Combined Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Payment Status - Combines Expected, Received, Pending, Achievement */}
        <Card className="border border-gray-200 p-5">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">
                Payment Status
              </p>
              <h3 className="text-2xl mb-1">$21,230</h3>
              <p className="text-xs text-gray-600">
                Expected Payments
              </p>
            </div>
          </div>
          <div className="space-y-2 border-t border-gray-100 pt-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">
                Received:
              </span>
              <span className="text-sm font-semibold text-green-600">
                $18,900
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">
                Pending:
              </span>
              <span className="text-sm font-semibold text-yellow-600">
                $2,330
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">
                Achievement:
              </span>
              <span className="text-sm font-semibold text-purple-600">
                89%
              </span>
            </div>
          </div>
        </Card>

        {/* Issues & Alerts - Combines Overdue and Variance */}
        <Card className="border border-red-200 p-5 bg-red-50/30">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">
                Exceptions & Risk
              </p>
              <h3 className="text-2xl mb-1">5</h3>
              <p className="text-xs text-gray-600">
                Requires Attention
              </p>
            </div>
          </div>
          <div className="space-y-2 border-t border-red-100 pt-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">
                Overdue Payouts:
              </span>
              <span className="text-sm font-semibold text-red-600">
                2
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">
                Variance Alerts:
              </span>
              <span className="text-sm font-semibold text-red-600">
                3
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-red-600 mt-2">
              <AlertTriangle className="w-3 h-3" />
              <span>Review required</span>
            </div>
          </div>
        </Card>

        {/* Fees & Deductions - Combines Platform Fees and Refunds */}
        <Card className="border border-gray-200 p-5">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <ArrowDownRight className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">
                Fees & Deductions
              </p>
              <h3 className="text-2xl mb-1">$2,854</h3>
              <p className="text-xs text-gray-600">
                Platform Fees
              </p>
            </div>
          </div>
          <div className="space-y-2 border-t border-gray-100 pt-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">
                Pending Refunds:
              </span>
              <span className="text-sm font-semibold text-orange-600">
                $2,130
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">
                Total Impact:
              </span>
              <span className="text-sm font-semibold text-red-600">
                -$4,984
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-blue-600 mt-2">
              <Activity className="w-3 h-3" />
              <span>15.1% of revenue</span>
            </div>
          </div>
        </Card>

        {/* Weekly Performance - Total Payouts with trend */}
        <Card className="border border-gray-200 p-5">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <ArrowUpRight className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">
                Weekly Performance
              </p>
              <h3 className="text-2xl mb-1">$18,900</h3>
              <p className="text-xs text-gray-600">
                Total Payouts
              </p>
            </div>
          </div>
          <div className="space-y-2 border-t border-gray-100 pt-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">
                vs Last Week:
              </span>
              <span className="text-sm font-semibold text-green-600">
                +12%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">
                Total Orders:
              </span>
              <span className="text-sm font-semibold">363</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-2">
              <TrendingUp className="w-3 h-3" />
              <span>Strong growth</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Channel Payment Performance Charts */}
      <PaymentChannelCharts />
    </div>
  );
}
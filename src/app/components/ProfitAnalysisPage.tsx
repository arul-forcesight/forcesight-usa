import { useState } from "react";
import { ProfitTableView } from "./ProfitTableView";
import { MonthlyViewTable } from "./MonthlyViewTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { DateRangeFilter } from "./DateRangeFilter";

export function ProfitAnalysisPage() {
  const [activeView, setActiveView] = useState<"profit" | "monthly">("profit");

  const handleFilterApply = (filters: any) => {
    console.log("Filters applied to Profit Analysis Page:", filters);
    // API call here
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl text-gray-900">Profit & Sales Analysis</h1>
        <p className="text-sm text-gray-600">
          Comprehensive view of profit margins, sales performance, and returns across all channels
        </p>
      </div>

      {/* Filter Section */}
      <DateRangeFilter onFilterApply={handleFilterApply} />

      {/* Tabs for switching views */}
      <Tabs value={activeView} onValueChange={(v) => setActiveView(v as "profit" | "monthly")} className="w-full">
        <TabsList className="bg-white border border-gray-200">
          <TabsTrigger value="profit" className="data-[state=active]:bg-[#007fff] data-[state=active]:text-white">
            Profit Table View
          </TabsTrigger>
          <TabsTrigger value="monthly" className="data-[state=active]:bg-[#007fff] data-[state=active]:text-white">
            Monthly View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profit" className="mt-6">
          <ProfitTableView />
        </TabsContent>

        <TabsContent value="monthly" className="mt-6">
          <MonthlyViewTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}

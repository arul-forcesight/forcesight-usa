import { useState } from "react";
import svgPaths from "../imports/svg-8wiwvveed6";
import svg2Paths from "../imports/svg-9n8w2dfzlv";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { Button } from "./ui/button";
import { format } from "date-fns";
import { GlobalFilterSystem, FilterValues } from "./GlobalFilterSystem";
import { useIsMobile } from "./ui/use-mobile";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

function CalendarIcon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Calendar">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g>
          <path d={svgPaths.p1d716900} stroke="#0A335C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
        </g>
      </svg>
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <path d="M6 9L12 15L18 9" stroke="#0A335C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Filter() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Filter">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g>
          <path d={svgPaths.p3bb38a00} stroke="#0A335C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
        </g>
      </svg>
    </div>
  );
}

function HideFilterIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g>
          <path clipRule="evenodd" d={svg2Paths.p338f2df0} fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d={svg2Paths.p3b27f100} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
        </g>
      </svg>
    </div>
  );
}

function ClearAllIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g>
          <path d={svg2Paths.p264869c0} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M2.5 2.5V6.66667H6.66667" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svg2Paths.p35db0100} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svg2Paths.p1db38700} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

interface DateRangeOption {
  id: string;
  label: string;
  hasIcon?: boolean;
}

interface DateRangeFilterProps {
  onFilterApply?: (filters: FilterValues) => void;
  onDateRangeChange?: (rangeId: string, customRange?: { from: Date; to: Date }) => void;
}

interface AppliedFilter {
  id: string;
  type: keyof FilterValues;
  label: string;
  value: any;
}

export function DateRangeFilter({ onFilterApply, onDateRangeChange }: DateRangeFilterProps) {
  const isMobile = useIsMobile();
  const [selectedRange, setSelectedRange] = useState<string>("7D");
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilter[]>([]);
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });

  const dateRanges: DateRangeOption[] = [
    { id: "custom", label: "Custom", hasIcon: true },
    { id: "yesterday", label: "Yesterday" },
    { id: "7D", label: "7D" },
    { id: "30D", label: "30D" },
    { id: "3M", label: "3M" },
    { id: "6M", label: "6M" },
    { id: "thisMonth", label: "This Month" },
  ];

  const handleRangeClick = (rangeId: string) => {
    if (rangeId === "custom") {
      setIsCustomOpen(true);
      return;
    }
    setSelectedRange(rangeId);
    if (onDateRangeChange) {
      onDateRangeChange(rangeId);
    }
  };

  const handleApplyCustomRange = () => {
    if (dateRange.from && dateRange.to) {
      setSelectedRange("custom");
      if (onDateRangeChange) {
        onDateRangeChange("custom", { from: dateRange.from, to: dateRange.to });
      }
      setIsCustomOpen(false);
    }
  };

  const getCustomLabel = () => {
    if (selectedRange === "custom" && dateRange.from && dateRange.to) {
      return `${format(dateRange.from, "MMM d")} - ${format(dateRange.to, "MMM d")}`;
    }
    return "Custom";
  };

  const handleClearAll = () => {
    setAppliedFilters([]);
    setFiltersVisible(true);
    onFilterApply?.({});
  };

  return (
    <div className="space-y-4 w-full">
      {/* Date Range and Filter Controls Row */}
      <div className="content-stretch flex gap-[16px] items-center relative w-full flex-wrap">
        {/* Date Range Selector - Mobile Dropdown */}
        {isMobile ? (
          <div className="relative">
            <Select value={selectedRange} onValueChange={(value) => {
              if (value === "custom") {
                setIsCustomOpen(true);
              }
              handleRangeClick(value);
            }}>
              <SelectTrigger className="h-[36px] min-w-[140px] border-[#dedede] font-['Outfit',_sans-serif]">
                <SelectValue>
                  {selectedRange === "custom" ? getCustomLabel() : 
                   dateRanges.find(r => r.id === selectedRange)?.label || "7D"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="7D">7D</SelectItem>
                <SelectItem value="30D">30D</SelectItem>
                <SelectItem value="3M">3M</SelectItem>
                <SelectItem value="6M">6M</SelectItem>
                <SelectItem value="1Y">1Y</SelectItem>
                <SelectItem value="YTD">YTD</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Custom Date Range Popup for Mobile */}
            <Popover open={isCustomOpen} onOpenChange={setIsCustomOpen}>
              <PopoverTrigger asChild>
                <div className="hidden" />
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start" side="bottom">
                <div className="p-4 space-y-4">
                  <div>
                    <h4 className="font-medium mb-3 text-gray-900">Select Date Range</h4>
                    <div className="bg-white rounded-md border border-gray-200">
                      <CalendarComponent
                        mode="range"
                        selected={dateRange}
                        onSelect={(range: any) => setDateRange(range || { from: undefined, to: undefined })}
                        numberOfMonths={1}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4 pt-3 border-t border-gray-200">
                    <div className="text-sm flex-1">
                      {dateRange.from && dateRange.to ? (
                        <div className="flex flex-col gap-1">
                          <span className="text-xs text-gray-500">Selected Range</span>
                          <span className="font-medium text-gray-900">
                            {format(dateRange.from, "MMM d, yyyy")} - {format(dateRange.to, "MMM d, yyyy")}
                          </span>
                        </div>
                      ) : dateRange.from ? (
                        <div className="flex flex-col gap-1">
                          <span className="text-xs text-gray-500">Start Date</span>
                          <span className="font-medium text-gray-900">
                            {format(dateRange.from, "MMM d, yyyy")}
                          </span>
                          <span className="text-xs text-gray-500 mt-1">Select end date</span>
                        </div>
                      ) : (
                        <span className="text-gray-500">Select start and end date</span>
                      )}
                    </div>
                    <Button
                      onClick={handleApplyCustomRange}
                      disabled={!dateRange.from || !dateRange.to}
                      size="sm"
                      className="bg-[#007fff] hover:bg-[#0066cc] text-white disabled:bg-gray-300 disabled:text-gray-500"
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          /* Date Range Selector - Desktop Horizontal Layout */
          <div className="relative rounded-[8px] shrink-0">
          <div className="content-stretch flex items-center overflow-clip relative rounded-[inherit]">
            {/* Vertical Line */}
            <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "36", "--transform-inner-height": "0" } as React.CSSProperties}>
              <div className="flex-none rotate-[90deg]">
                <div className="h-0 relative w-[36px]">
                  <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 1">
                      <line stroke="#DEDEDE" x2="36" y1="0.5" y2="0.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Date Range Options */}
            {dateRanges.map((range, index) => (
              <div key={range.id} className="flex flex-row items-center self-stretch">
                {range.id === "custom" ? (
                  <Popover open={isCustomOpen} onOpenChange={setIsCustomOpen}>
                    <PopoverTrigger asChild>
                      <div
                        className={`box-border content-stretch flex gap-[10px] h-full items-center justify-center px-[12px] py-0 relative shrink-0 cursor-pointer transition-colors ${
                          selectedRange === range.id ? "bg-[#e0f0ff]" : "hover:bg-gray-50"
                        }`}
                        onClick={() => handleRangeClick(range.id)}
                      >
                        <div aria-hidden="true" className="absolute border-[#dedede] border-[0px_0px_0px_1px] border-solid inset-0 pointer-events-none" />
                        <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
                          <CalendarIcon />
                          <p className={`font-['Outfit',_sans-serif] leading-[normal] relative shrink-0 text-[14px] text-nowrap tracking-[-0.28px] whitespace-pre ${
                            selectedRange === range.id ? "font-medium text-[#007fff]" : "font-normal text-[#0a335c]"
                          }`}>
                            {getCustomLabel()}
                          </p>
                        </div>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start" side="bottom">
                      <div className="p-4 space-y-4">
                        <div>
                          <h4 className="font-medium mb-3 text-gray-900">Select Date Range</h4>
                          <div className="bg-white rounded-md border border-gray-200">
                            <CalendarComponent
                              mode="range"
                              selected={dateRange}
                              onSelect={(range: any) => setDateRange(range || { from: undefined, to: undefined })}
                              numberOfMonths={2}
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-4 pt-3 border-t border-gray-200">
                          <div className="text-sm flex-1">
                            {dateRange.from && dateRange.to ? (
                              <div className="flex flex-col gap-1">
                                <span className="text-xs text-gray-500">Selected Range</span>
                                <span className="font-medium text-gray-900">
                                  {format(dateRange.from, "MMM d, yyyy")} - {format(dateRange.to, "MMM d, yyyy")}
                                </span>
                              </div>
                            ) : dateRange.from ? (
                              <div className="flex flex-col gap-1">
                                <span className="text-xs text-gray-500">Start Date</span>
                                <span className="font-medium text-gray-900">
                                  {format(dateRange.from, "MMM d, yyyy")}
                                </span>
                                <span className="text-xs text-gray-500 mt-1">Select end date</span>
                              </div>
                            ) : (
                              <span className="text-gray-500">Select start and end date</span>
                            )}
                          </div>
                          <Button
                            onClick={handleApplyCustomRange}
                            disabled={!dateRange.from || !dateRange.to}
                            size="sm"
                            className="bg-[#007fff] hover:bg-[#0066cc] text-white disabled:bg-gray-300 disabled:text-gray-500"
                          >
                            Apply
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                ) : (
                  <div
                    className={`box-border content-stretch flex gap-[10px] h-full items-center justify-center px-[12px] py-0 relative shrink-0 cursor-pointer transition-colors ${
                      selectedRange === range.id ? "bg-[#e0f0ff]" : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleRangeClick(range.id)}
                  >
                    <div aria-hidden="true" className="absolute border-[#dedede] border-[0px_0px_0px_1px] border-solid inset-0 pointer-events-none" />
                    <p className={`font-['Outfit',_sans-serif] leading-[normal] relative shrink-0 text-nowrap whitespace-pre ${
                      selectedRange === range.id 
                        ? "font-medium text-[#007fff] text-[16px] tracking-[-0.32px]" 
                        : "font-normal text-[#0a335c] text-[14px] tracking-[-0.28px]"
                    }`}>
                      {range.label}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {/* Chevron Down */}
            <div className="flex flex-row items-center self-stretch">
              <div className="box-border content-stretch flex gap-[10px] h-full items-center justify-center px-[12px] py-0 relative shrink-0 cursor-pointer hover:bg-gray-50">
                <div aria-hidden="true" className="absolute border-[#dedede] border-[0px_0px_0px_1px] border-solid inset-0 pointer-events-none" />
                <ChevronDown />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[#dedede] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        )}

        {/* Add Filter / Hide Filter / Show Filter Button */}
        {appliedFilters.length === 0 ? (
          <div 
            className="h-[36px] relative rounded-[8px] shrink-0 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setIsFilterOpen(true)}
          >
            <div className="box-border content-stretch flex gap-[12px] h-[36px] items-center overflow-clip px-[12px] py-0 relative rounded-[inherit]">
              <p className="font-['Outfit',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#0a335c] text-[14px] text-nowrap tracking-[-0.28px] whitespace-pre">
                + Add Filter
              </p>
              <Filter />
            </div>
            <div aria-hidden="true" className="absolute border border-[#dedede] border-solid inset-0 pointer-events-none rounded-[8px]" />
          </div>
        ) : (
          <>
            {/* Hide/Show Filter Button */}
            <button
              onClick={() => setFiltersVisible(!filtersVisible)}
              className="h-[36px] relative rounded-[8px] shrink-0 hover:bg-gray-50 transition-colors"
            >
              <div className="box-border content-stretch flex gap-[8px] h-[36px] items-center overflow-clip px-[12px] py-0 relative rounded-[inherit]">
                <p className="font-['Outfit',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#0a335c] text-[14px] text-nowrap tracking-[-0.28px] whitespace-pre">
                  {filtersVisible ? `Hide Filter (${appliedFilters.length})` : `Show Filter (${appliedFilters.length})`}
                </p>
                <div className="text-[#0a335c]">
                  <HideFilterIcon />
                </div>
              </div>
              <div aria-hidden="true" className="absolute border border-[#dedede] border-solid inset-0 pointer-events-none rounded-[8px]" />
            </button>

            {/* Clear All Button */}
            <button
              onClick={handleClearAll}
              className="h-[36px] relative rounded-[8px] shrink-0 hover:bg-red-50 transition-colors"
            >
              <div className="box-border content-stretch flex gap-[8px] h-[36px] items-center overflow-clip px-[12px] py-0 relative rounded-[inherit]">
                <p className="font-['Outfit',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#0a335c] text-[14px] text-nowrap tracking-[-0.28px] whitespace-pre">
                  Clear All
                </p>
                <div className="text-[#0a335c]">
                  <ClearAllIcon />
                </div>
              </div>
              <div aria-hidden="true" className="absolute border border-[#dedede] border-solid inset-0 pointer-events-none rounded-[8px]" />
            </button>
          </>
        )}
      </div>

      {/* Global Filter System - renders filter chips below */}
      <GlobalFilterSystem 
        isOpen={isFilterOpen} 
        onOpenChange={setIsFilterOpen}
        onApply={onFilterApply}
        filtersVisible={filtersVisible}
        appliedFilters={appliedFilters}
        onFiltersChange={setAppliedFilters}
      />
    </div>
  );
}

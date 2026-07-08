import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { X } from "lucide-react";
import { ChannelIcon } from "./ChannelBadge";
import svgPaths from "../imports/svg-9n8w2dfzlv";

// SVG Icons from Figma
function FilterIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Filter">
          <path d={svgPaths.p3bb38a00} id="Icon" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function EditIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g>
          <path clipRule="evenodd" d={svgPaths.p3a319980} fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.pfc70e80} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function CloseIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g>
          <path d="M15 5L5 15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M5 5L15 15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
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
          <path d={svgPaths.p264869c0} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M2.5 2.5V6.66667H6.66667" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p35db0100} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1db38700} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
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
          <path clipRule="evenodd" d={svgPaths.p338f2df0} fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          <path d={svgPaths.p3b27f100} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
        </g>
      </svg>
    </div>
  );
}

// Filter Types
export interface FilterValues {
  productName?: string;
  skus?: string;
  orderIds?: string;
  categories?: string[];
  channels?: string[];
  colors?: string[];
  sizes?: string[];
  orderStatus?: string[];
  priceMin?: string;
  priceMax?: string;
  profitMarginMin?: string;
  profitMarginMax?: string;
  stockMin?: string;
  stockMax?: string;
}

interface AppliedFilter {
  id: string;
  type: keyof FilterValues;
  label: string;
  value: any;
}

interface FilterSystemProps {
  onApply?: (filters: FilterValues) => void;
}

const CHANNELS = ["Amazon", "Walmart", "Shopify", "eBay", "Target", "Etsy", "WooCommerce", "Magento", "BigCommerce", "Alibaba", "Facebook Marketplace", "Instagram Shop"];
const CATEGORIES = ["Electronics", "Clothing & Apparel", "Home & Garden", "Sports & Outdoors", "Books & Media", "Toys & Games", "Health & Beauty", "Automotive", "Office Supplies", "Pet Supplies"];
const COLORS = ["Red", "Blue", "Green", "Yellow", "Black", "White", "Gray", "Purple", "Orange", "Pink"];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
const ORDER_STATUS = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Returned", "Refunded"];

export function FilterSystem({ onApply }: FilterSystemProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilter[]>([]);
  const [tempFilters, setTempFilters] = useState<FilterValues>({});

  const handleOpenPopup = () => {
    // Pre-fill with current filters if editing
    const currentValues: FilterValues = {};
    appliedFilters.forEach(filter => {
      currentValues[filter.type] = filter.value;
    });
    setTempFilters(currentValues);
    setIsPopupOpen(true);
  };

  const handleApply = () => {
    // Convert temp filters to applied filters
    const newAppliedFilters: AppliedFilter[] = [];
    
    if (tempFilters.productName) {
      newAppliedFilters.push({
        id: 'productName',
        type: 'productName',
        label: `Product: ${tempFilters.productName}`,
        value: tempFilters.productName
      });
    }

    if (tempFilters.skus) {
      const skuArray = tempFilters.skus.split(/[,\n]/).map(s => s.trim()).filter(Boolean);
      newAppliedFilters.push({
        id: 'skus',
        type: 'skus',
        label: `SKUs: ${skuArray.length} entered`,
        value: tempFilters.skus
      });
    }

    if (tempFilters.orderIds) {
      const orderArray = tempFilters.orderIds.split(/[,\n]/).map(s => s.trim()).filter(Boolean);
      newAppliedFilters.push({
        id: 'orderIds',
        type: 'orderIds',
        label: `Order IDs: ${orderArray.length} entered`,
        value: tempFilters.orderIds
      });
    }

    if (tempFilters.channels && tempFilters.channels.length > 0) {
      newAppliedFilters.push({
        id: 'channels',
        type: 'channels',
        label: `Channels: ${tempFilters.channels.length} selected`,
        value: tempFilters.channels
      });
    }

    if (tempFilters.categories && tempFilters.categories.length > 0) {
      newAppliedFilters.push({
        id: 'categories',
        type: 'categories',
        label: tempFilters.categories.length === 1 
          ? `Category: ${tempFilters.categories[0]}` 
          : `Categories: ${tempFilters.categories.length} selected`,
        value: tempFilters.categories
      });
    }

    if (tempFilters.colors && tempFilters.colors.length > 0) {
      newAppliedFilters.push({
        id: 'colors',
        type: 'colors',
        label: tempFilters.colors.length === 1 
          ? `Color: ${tempFilters.colors[0]}` 
          : `Colors: ${tempFilters.colors.length} selected`,
        value: tempFilters.colors
      });
    }

    if (tempFilters.sizes && tempFilters.sizes.length > 0) {
      newAppliedFilters.push({
        id: 'sizes',
        type: 'sizes',
        label: `Size: ${tempFilters.sizes.length} selected`,
        value: tempFilters.sizes
      });
    }

    if (tempFilters.orderStatus && tempFilters.orderStatus.length > 0) {
      newAppliedFilters.push({
        id: 'orderStatus',
        type: 'orderStatus',
        label: `Order Status: ${tempFilters.orderStatus.length} selected`,
        value: tempFilters.orderStatus
      });
    }

    if (tempFilters.priceMin || tempFilters.priceMax) {
      newAppliedFilters.push({
        id: 'price',
        type: 'priceMin',
        label: `Price: $${tempFilters.priceMin || '0'} - $${tempFilters.priceMax || '∞'}`,
        value: { min: tempFilters.priceMin, max: tempFilters.priceMax }
      });
    }

    if (tempFilters.profitMarginMin || tempFilters.profitMarginMax) {
      newAppliedFilters.push({
        id: 'profitMargin',
        type: 'profitMarginMin',
        label: `Profit Margin: ${tempFilters.profitMarginMin || '0'}% - ${tempFilters.profitMarginMax || '100'}%`,
        value: { min: tempFilters.profitMarginMin, max: tempFilters.profitMarginMax }
      });
    }

    if (tempFilters.stockMin || tempFilters.stockMax) {
      newAppliedFilters.push({
        id: 'stock',
        type: 'stockMin',
        label: `Stock: ${tempFilters.stockMin || '0'} - ${tempFilters.stockMax || '∞'}`,
        value: { min: tempFilters.stockMin, max: tempFilters.stockMax }
      });
    }

    setAppliedFilters(newAppliedFilters);
    setIsPopupOpen(false);
    setFiltersVisible(true);

    // Call the API with filters
    onApply?.(tempFilters);
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
    setTempFilters({});
  };

  const handleDeleteFilter = (filterId: string) => {
    const newFilters = appliedFilters.filter(f => f.id !== filterId);
    setAppliedFilters(newFilters);
    
    // Remove from tempFilters
    const filterToDelete = appliedFilters.find(f => f.id === filterId);
    if (filterToDelete) {
      const newTempFilters = { ...tempFilters };
      delete newTempFilters[filterToDelete.type];
      setTempFilters(newTempFilters);
      onApply?.(newTempFilters);
    }
  };

  const handleClearAll = () => {
    setAppliedFilters([]);
    setTempFilters({});
    setFiltersVisible(true);
    onApply?.({});
  };

  const toggleArrayValue = (field: keyof FilterValues, value: string) => {
    const current = (tempFilters[field] as string[]) || [];
    const newValue = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    setTempFilters({ ...tempFilters, [field]: newValue });
  };

  return (
    <div className="w-full">
      {/* Filter Controls Row */}
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        {/* Show filter cards when visible and has filters */}
        {filtersVisible && appliedFilters.length > 0 && (
          <>
            {appliedFilters.map((filter) => (
              <div
                key={filter.id}
                className="h-[36px] relative rounded-[8px] shrink-0"
              >
                <div className="box-border content-stretch flex gap-[12px] h-[36px] items-center overflow-clip px-[12px] py-0 relative rounded-[inherit]">
                  <p className="font-['Outfit',_sans-serif] font-medium leading-[normal] relative shrink-0 text-[#0a335c] text-[16px] text-nowrap tracking-[-0.32px] whitespace-pre">
                    {filter.label}
                  </p>
                  <button
                    onClick={handleOpenPopup}
                    className="text-[#0a335c] hover:text-blue-600 transition-colors"
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={() => handleDeleteFilter(filter.id)}
                    className="text-[#0a335c] hover:text-red-600 transition-colors"
                  >
                    <CloseIcon />
                  </button>
                </div>
                <div aria-hidden="true" className="absolute border border-[#dedede] border-solid inset-0 pointer-events-none rounded-[8px]" />
              </div>
            ))}
          </>
        )}

        {/* Add Filter or Hide Filter Button */}
        {appliedFilters.length === 0 ? (
          <button
            onClick={handleOpenPopup}
            className="box-border content-stretch flex gap-[12px] h-[36px] items-center overflow-clip px-[12px] py-0 relative rounded-[8px] shrink-0 hover:bg-gray-50 transition-colors"
          >
            <p className="font-['Outfit',_sans-serif] font-medium leading-[normal] relative shrink-0 text-[#0a335c] text-[16px] text-nowrap tracking-[-0.32px] whitespace-pre">
              + Add Filter
            </p>
            <div className="text-[#0a335c]">
              <FilterIcon />
            </div>
          </button>
        ) : (
          <button
            onClick={() => setFiltersVisible(!filtersVisible)}
            className="h-[36px] relative rounded-[8px] shrink-0 hover:bg-gray-50 transition-colors"
          >
            <div className="box-border content-stretch flex gap-[12px] h-[36px] items-center overflow-clip px-[12px] py-0 relative rounded-[inherit]">
              <p className="font-['Outfit',_sans-serif] font-medium leading-[normal] relative shrink-0 text-[#0a335c] text-[16px] text-nowrap tracking-[-0.32px] whitespace-pre">
                {filtersVisible ? `Hide Filter (${appliedFilters.length})` : `Show Filter (${appliedFilters.length})`}
              </p>
              <div className="text-[#0a335c]">
                <HideFilterIcon />
              </div>
            </div>
            <div aria-hidden="true" className="absolute border border-[#dedede] border-solid inset-0 pointer-events-none rounded-[8px]" />
          </button>
        )}

        {/* Clear All Button */}
        {appliedFilters.length > 0 && (
          <button
            onClick={handleClearAll}
            className="box-border content-stretch flex gap-[12px] h-[36px] items-center overflow-clip px-[12px] py-0 relative rounded-[8px] shrink-0 hover:bg-red-50 transition-colors"
          >
            <p className="font-['Outfit',_sans-serif] font-medium leading-[normal] relative shrink-0 text-[#0a335c] text-[16px] text-nowrap tracking-[-0.32px] whitespace-pre">
              Clear All
            </p>
            <div className="text-[#0a335c]">
              <ClearAllIcon />
            </div>
          </button>
        )}
      </div>

      {/* Filter Popup Dialog */}
      <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-[#0a335c]">Add Filters</DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              Configure multiple filter parameters to refine your data. Click Apply to execute the filters.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            {/* Product Name */}
            <div className="space-y-2">
              <Label htmlFor="productName" className="text-[#0a335c] font-medium">Product Name</Label>
              <Input
                id="productName"
                placeholder="Enter product name"
                value={tempFilters.productName || ''}
                onChange={(e) => setTempFilters({ ...tempFilters, productName: e.target.value })}
                className="border-[#dedede]"
              />
            </div>

            {/* SKUs - Bulk Input */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="skus" className="text-[#0a335c] font-medium">
                SKUs (Bulk Input)
              </Label>
              <Textarea
                id="skus"
                placeholder="Enter SKUs separated by commas or new lines&#10;e.g., SKU-001, SKU-002, SKU-003&#10;or one per line"
                value={tempFilters.skus || ''}
                onChange={(e) => setTempFilters({ ...tempFilters, skus: e.target.value })}
                className="min-h-[100px] border-[#dedede] font-mono text-sm"
              />
              <p className="text-xs text-gray-500">Accepts comma-separated or line-separated values</p>
            </div>

            {/* Order IDs - Bulk Input */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="orderIds" className="text-[#0a335c] font-medium">
                Order IDs (Bulk Input)
              </Label>
              <Textarea
                id="orderIds"
                placeholder="Enter Order IDs separated by commas or new lines&#10;e.g., ORD-10234, ORD-10235"
                value={tempFilters.orderIds || ''}
                onChange={(e) => setTempFilters({ ...tempFilters, orderIds: e.target.value })}
                className="min-h-[100px] border-[#dedede] font-mono text-sm"
              />
              <p className="text-xs text-gray-500">Accepts comma-separated or line-separated values</p>
            </div>

            {/* Channels */}
            <div className="space-y-2 md:col-span-2">
              <Label className="text-[#0a335c] font-medium">Sales Channels</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-[200px] overflow-y-auto p-2 border border-[#dedede] rounded-md">
                {CHANNELS.map((channel) => (
                  <div key={channel} className="flex items-center space-x-2">
                    <Checkbox
                      id={`channel-${channel}`}
                      checked={(tempFilters.channels || []).includes(channel)}
                      onCheckedChange={() => toggleArrayValue('channels', channel)}
                    />
                    <label htmlFor={`channel-${channel}`} className="text-sm cursor-pointer inline-flex items-center gap-1.5">
                      <ChannelIcon channel={channel} size="xs" />
                      {channel}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <Label className="text-[#0a335c] font-medium">Categories</Label>
              <div className="space-y-2 max-h-[200px] overflow-y-auto p-2 border border-[#dedede] rounded-md">
                {CATEGORIES.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={(tempFilters.categories || []).includes(category)}
                      onCheckedChange={() => toggleArrayValue('categories', category)}
                    />
                    <label htmlFor={`category-${category}`} className="text-sm cursor-pointer">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="space-y-2">
              <Label className="text-[#0a335c] font-medium">Colors</Label>
              <div className="space-y-2 max-h-[200px] overflow-y-auto p-2 border border-[#dedede] rounded-md">
                {COLORS.map((color) => (
                  <div key={color} className="flex items-center space-x-2">
                    <Checkbox
                      id={`color-${color}`}
                      checked={(tempFilters.colors || []).includes(color)}
                      onCheckedChange={() => toggleArrayValue('colors', color)}
                    />
                    <label htmlFor={`color-${color}`} className="text-sm cursor-pointer">
                      {color}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-2">
              <Label className="text-[#0a335c] font-medium">Sizes</Label>
              <div className="space-y-2 p-2 border border-[#dedede] rounded-md">
                {SIZES.map((size) => (
                  <div key={size} className="flex items-center space-x-2">
                    <Checkbox
                      id={`size-${size}`}
                      checked={(tempFilters.sizes || []).includes(size)}
                      onCheckedChange={() => toggleArrayValue('sizes', size)}
                    />
                    <label htmlFor={`size-${size}`} className="text-sm cursor-pointer">
                      {size}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Status */}
            <div className="space-y-2">
              <Label className="text-[#0a335c] font-medium">Order Status</Label>
              <div className="space-y-2 p-2 border border-[#dedede] rounded-md">
                {ORDER_STATUS.map((status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <Checkbox
                      id={`status-${status}`}
                      checked={(tempFilters.orderStatus || []).includes(status)}
                      onCheckedChange={() => toggleArrayValue('orderStatus', status)}
                    />
                    <label htmlFor={`status-${status}`} className="text-sm cursor-pointer">
                      {status}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <Label className="text-[#0a335c] font-medium">Price Range</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={tempFilters.priceMin || ''}
                  onChange={(e) => setTempFilters({ ...tempFilters, priceMin: e.target.value })}
                  className="border-[#dedede]"
                />
                <span className="text-gray-500">-</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={tempFilters.priceMax || ''}
                  onChange={(e) => setTempFilters({ ...tempFilters, priceMax: e.target.value })}
                  className="border-[#dedede]"
                />
              </div>
            </div>

            {/* Profit Margin Range */}
            <div className="space-y-2">
              <Label className="text-[#0a335c] font-medium">Profit Margin %</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="Min %"
                  value={tempFilters.profitMarginMin || ''}
                  onChange={(e) => setTempFilters({ ...tempFilters, profitMarginMin: e.target.value })}
                  className="border-[#dedede]"
                />
                <span className="text-gray-500">-</span>
                <Input
                  type="number"
                  placeholder="Max %"
                  value={tempFilters.profitMarginMax || ''}
                  onChange={(e) => setTempFilters({ ...tempFilters, profitMarginMax: e.target.value })}
                  className="border-[#dedede]"
                />
              </div>
            </div>

            {/* Stock Range */}
            <div className="space-y-2">
              <Label className="text-[#0a335c] font-medium">Stock Quantity</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={tempFilters.stockMin || ''}
                  onChange={(e) => setTempFilters({ ...tempFilters, stockMin: e.target.value })}
                  className="border-[#dedede]"
                />
                <span className="text-gray-500">-</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={tempFilters.stockMax || ''}
                  onChange={(e) => setTempFilters({ ...tempFilters, stockMax: e.target.value })}
                  className="border-[#dedede]"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-[#dedede]">
            <div className="h-[36px] relative rounded-[8px] shrink-0">
              <button
                onClick={handleCancel}
                className="box-border content-stretch flex gap-[12px] h-[36px] items-center overflow-clip px-[12px] py-0 relative rounded-[inherit] hover:bg-gray-50 transition-colors"
              >
                <p className="font-['Outfit',_sans-serif] font-bold leading-[normal] relative shrink-0 text-[#0a335c] text-[14px] text-nowrap whitespace-pre">
                  Cancel
                </p>
              </button>
              <div aria-hidden="true" className="absolute border border-[#dedede] border-solid inset-0 pointer-events-none rounded-[8px]" />
            </div>

            <button
              onClick={handleApply}
              className="bg-[#007fff] box-border content-stretch flex gap-[8px] h-[36px] items-center overflow-clip px-[12px] py-0 relative rounded-[8px] shrink-0 hover:bg-[#0066dd] transition-colors"
            >
              <p className="font-['Outfit',_sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre">
                Apply
              </p>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ChannelIcon } from "./ChannelBadge";
import svgPaths from "../imports/svg-9n8w2dfzlv";

// SVG Icons from Figma
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

function FilterIcon() {
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

interface GlobalFilterSystemProps {
  onApply?: (filters: FilterValues) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  filtersVisible: boolean;
  appliedFilters: AppliedFilter[];
  onFiltersChange: (filters: AppliedFilter[]) => void;
}

const CHANNELS = ["Amazon", "Walmart", "Shopify", "eBay", "Target", "Etsy", "WooCommerce", "Magento", "BigCommerce", "Alibaba", "Facebook Marketplace", "Instagram Shop"];
const CATEGORIES = ["Electronics", "Clothing & Apparel", "Home & Garden", "Sports & Outdoors", "Books & Media", "Toys & Games", "Health & Beauty", "Automotive", "Office Supplies", "Pet Supplies"];
const COLORS = ["Red", "Blue", "Green", "Yellow", "Black", "White", "Gray", "Purple", "Orange", "Pink"];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
const ORDER_STATUS = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Returned", "Refunded"];

export function GlobalFilterSystem({ onApply, isOpen, onOpenChange, filtersVisible, appliedFilters, onFiltersChange }: GlobalFilterSystemProps) {
  const [tempFilters, setTempFilters] = useState<FilterValues>({});
  const [editingFilter, setEditingFilter] = useState<AppliedFilter | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  // Reset tempFilters when dialog opens
  useEffect(() => {
    if (isOpen) {
      setTempFilters({});
      setHasChanges(false);
    }
  }, [isOpen]);

  // Track changes in tempFilters
  useEffect(() => {
    const hasAnyValue = Object.values(tempFilters).some(value => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== undefined && value !== '';
    });
    setHasChanges(hasAnyValue);
  }, [tempFilters]);

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

    onFiltersChange([...appliedFilters, ...newAppliedFilters]);
    onOpenChange(false);

    // Call the API with combined filters
    const combinedFilters: FilterValues = {};
    [...appliedFilters, ...newAppliedFilters].forEach(filter => {
      combinedFilters[filter.type] = filter.value;
    });
    onApply?.(combinedFilters);
  };

  const handleCancel = () => {
    onOpenChange(false);
    setEditingFilter(null);
    setTempFilters({});
  };

  const handleDeleteFilter = (filterId: string) => {
    const newFilters = appliedFilters.filter(f => f.id !== filterId);
    onFiltersChange(newFilters);
    
    // Build complete filter object for API call
    const completeFilters: FilterValues = {};
    newFilters.forEach(filter => {
      completeFilters[filter.type] = filter.value;
    });
    onApply?.(completeFilters);
  };

  const toggleArrayValue = (field: keyof FilterValues, value: string) => {
    const current = (tempFilters[field] as string[]) || [];
    const newValue = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    setTempFilters({ ...tempFilters, [field]: newValue });
  };

  const handleEditFilter = (filter: AppliedFilter) => {
    setEditingFilter(filter);
    // Pre-fill with current filter value
    const editFilters: FilterValues = {};
    editFilters[filter.type] = filter.value;
    setTempFilters(editFilters);
  };

  const handleEditApply = () => {
    // Update the specific filter
    const updatedFilters = appliedFilters.map(f => {
      if (f.id === editingFilter?.id) {
        const newValue = tempFilters[editingFilter.type];
        let newLabel = f.label;
        
        // Update label based on filter type
        if (editingFilter.type === 'productName') {
          newLabel = `Product: ${newValue}`;
        } else if (editingFilter.type === 'skus') {
          const skuArray = (newValue as string).split(/[,\n]/).map(s => s.trim()).filter(Boolean);
          newLabel = `SKUs: ${skuArray.length} entered`;
        } else if (editingFilter.type === 'orderIds') {
          const orderArray = (newValue as string).split(/[,\n]/).map(s => s.trim()).filter(Boolean);
          newLabel = `Order IDs: ${orderArray.length} entered`;
        } else if (editingFilter.type === 'channels') {
          newLabel = `Channels: ${(newValue as string[]).length} selected`;
        } else if (editingFilter.type === 'categories') {
          const cats = newValue as string[];
          newLabel = cats.length === 1 ? `Category: ${cats[0]}` : `Categories: ${cats.length} selected`;
        } else if (editingFilter.type === 'colors') {
          const colors = newValue as string[];
          newLabel = colors.length === 1 ? `Color: ${colors[0]}` : `Colors: ${colors.length} selected`;
        } else if (editingFilter.type === 'sizes') {
          newLabel = `Size: ${(newValue as string[]).length} selected`;
        } else if (editingFilter.type === 'orderStatus') {
          newLabel = `Order Status: ${(newValue as string[]).length} selected`;
        }
        
        return { ...f, label: newLabel, value: newValue };
      }
      return f;
    });
    
    onFiltersChange(updatedFilters);
    setEditingFilter(null);
    
    // Build complete filter object for API call
    const completeFilters: FilterValues = {};
    updatedFilters.forEach(filter => {
      completeFilters[filter.type] = filter.value;
    });
    onApply?.(completeFilters);
  };

  const renderEditPopover = (filter: AppliedFilter) => {
    return (
      <Popover open={editingFilter?.id === filter.id} onOpenChange={(open) => !open && setEditingFilter(null)}>
        <PopoverTrigger asChild>
          <button
            onClick={() => handleEditFilter(filter)}
            className="text-[#0a335c] hover:text-blue-600 transition-colors"
          >
            <EditIcon />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0" align="start" side="bottom">
          <div className="p-4 space-y-4">
            <div className="space-y-3">
              {/* Render specific filter field */}
              {filter.type === 'productName' && (
                <div className="space-y-2">
                  <Label htmlFor="edit-productName" className="text-[#0a335c] font-medium">Product Name</Label>
                  <Input
                    id="edit-productName"
                    placeholder="Enter product name"
                    value={tempFilters.productName || ''}
                    onChange={(e) => setTempFilters({ ...tempFilters, productName: e.target.value })}
                    className="border-[#dedede]"
                  />
                </div>
              )}
              
              {filter.type === 'skus' && (
                <div className="space-y-2">
                  <Label htmlFor="edit-skus" className="text-[#0a335c] font-medium">SKUs (Bulk Input)</Label>
                  <Textarea
                    id="edit-skus"
                    placeholder="Enter SKUs separated by commas or new lines"
                    value={tempFilters.skus || ''}
                    onChange={(e) => setTempFilters({ ...tempFilters, skus: e.target.value })}
                    className="min-h-[100px] border-[#dedede] font-mono text-sm"
                  />
                </div>
              )}
              
              {filter.type === 'orderIds' && (
                <div className="space-y-2">
                  <Label htmlFor="edit-orderIds" className="text-[#0a335c] font-medium">Order IDs (Bulk Input)</Label>
                  <Textarea
                    id="edit-orderIds"
                    placeholder="Enter Order IDs separated by commas or new lines"
                    value={tempFilters.orderIds || ''}
                    onChange={(e) => setTempFilters({ ...tempFilters, orderIds: e.target.value })}
                    className="min-h-[100px] border-[#dedede] font-mono text-sm"
                  />
                </div>
              )}
              
              {filter.type === 'channels' && (
                <div className="space-y-2">
                  <Label className="text-[#0a335c] font-medium">Sales Channels</Label>
                  <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto p-2 border border-[#dedede] rounded-md">
                    {CHANNELS.map((channel) => (
                      <div key={channel} className="flex items-center space-x-2">
                        <Checkbox
                          id={`edit-channel-${channel}`}
                          checked={(tempFilters.channels || []).includes(channel)}
                          onCheckedChange={() => toggleArrayValue('channels', channel)}
                        />
                        <label htmlFor={`edit-channel-${channel}`} className="text-sm cursor-pointer inline-flex items-center gap-1.5">
                          <ChannelIcon channel={channel} size="xs" />
                          {channel}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filter.type === 'categories' && (
                <div className="space-y-2">
                  <Label className="text-[#0a335c] font-medium">Categories</Label>
                  <div className="space-y-2 max-h-[200px] overflow-y-auto p-2 border border-[#dedede] rounded-md">
                    {CATEGORIES.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`edit-category-${category}`}
                          checked={(tempFilters.categories || []).includes(category)}
                          onCheckedChange={() => toggleArrayValue('categories', category)}
                        />
                        <label htmlFor={`edit-category-${category}`} className="text-sm cursor-pointer">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filter.type === 'colors' && (
                <div className="space-y-2">
                  <Label className="text-[#0a335c] font-medium">Colors</Label>
                  <div className="space-y-2 max-h-[200px] overflow-y-auto p-2 border border-[#dedede] rounded-md">
                    {COLORS.map((color) => (
                      <div key={color} className="flex items-center space-x-2">
                        <Checkbox
                          id={`edit-color-${color}`}
                          checked={(tempFilters.colors || []).includes(color)}
                          onCheckedChange={() => toggleArrayValue('colors', color)}
                        />
                        <label htmlFor={`edit-color-${color}`} className="text-sm cursor-pointer">
                          {color}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filter.type === 'sizes' && (
                <div className="space-y-2">
                  <Label className="text-[#0a335c] font-medium">Sizes</Label>
                  <div className="space-y-2 p-2 border border-[#dedede] rounded-md">
                    {SIZES.map((size) => (
                      <div key={size} className="flex items-center space-x-2">
                        <Checkbox
                          id={`edit-size-${size}`}
                          checked={(tempFilters.sizes || []).includes(size)}
                          onCheckedChange={() => toggleArrayValue('sizes', size)}
                        />
                        <label htmlFor={`edit-size-${size}`} className="text-sm cursor-pointer">
                          {size}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filter.type === 'orderStatus' && (
                <div className="space-y-2">
                  <Label className="text-[#0a335c] font-medium">Order Status</Label>
                  <div className="space-y-2 p-2 border border-[#dedede] rounded-md">
                    {ORDER_STATUS.map((status) => (
                      <div key={status} className="flex items-center space-x-2">
                        <Checkbox
                          id={`edit-status-${status}`}
                          checked={(tempFilters.orderStatus || []).includes(status)}
                          onCheckedChange={() => toggleArrayValue('orderStatus', status)}
                        />
                        <label htmlFor={`edit-status-${status}`} className="text-sm cursor-pointer">
                          {status}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-3 border-t border-[#dedede]">
              <div className="h-[32px] relative rounded-[8px]">
                <button
                  onClick={() => setEditingFilter(null)}
                  className="box-border content-stretch flex gap-[8px] h-[32px] items-center overflow-clip px-[12px] py-0 relative rounded-[inherit] hover:bg-gray-50 transition-colors"
                >
                  <p className="font-['Outfit',_sans-serif] font-normal leading-[normal] text-[#0a335c] text-[13px] whitespace-pre">
                    Cancel
                  </p>
                </button>
                <div aria-hidden="true" className="absolute border border-[#dedede] border-solid inset-0 pointer-events-none rounded-[8px]" />
              </div>

              <button
                onClick={handleEditApply}
                className="bg-[#007fff] content-stretch flex gap-[8px] h-[32px] items-center overflow-clip px-[12px] py-0 relative rounded-[8px] hover:bg-[#0066dd] transition-colors"
              >
                <p className="font-['Outfit',_sans-serif] font-normal leading-[normal] text-[13px] text-white whitespace-pre">
                  Apply
                </p>
              </button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <>
      {/* Filter Cards Container - Below Date Range */}
      {appliedFilters.length > 0 && filtersVisible && (
        <div className="w-full rounded-[8px] border border-[#dedede] p-4 bg-white">
          {/* Filter Cards Row with inline Add Filter button */}
          <div className="flex items-center gap-3 flex-wrap">
            {appliedFilters.map((filter) => (
              <div
                key={filter.id}
                className="h-[36px] relative rounded-[8px] shrink-0"
              >
                <div className="box-border content-stretch flex gap-[12px] h-[36px] items-center overflow-clip px-[12px] py-0 relative rounded-[inherit]">
                  <p className="font-['Outfit',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#0a335c] text-[14px] text-nowrap tracking-[-0.28px] whitespace-pre">
                    {filter.label}
                  </p>
                  {renderEditPopover(filter)}
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

            {/* Add Filter Button - Inline with filters */}
            <button
              onClick={() => onOpenChange(true)}
              className="h-[36px] relative rounded-[8px] shrink-0 hover:bg-gray-50 transition-colors"
            >
              <div className="box-border content-stretch flex gap-[8px] h-[36px] items-center overflow-clip px-[12px] py-0 relative rounded-[inherit]">
                <p className="font-['Outfit',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#0a335c] text-[14px] text-nowrap tracking-[-0.28px] whitespace-pre">
                  + Add Filter
                </p>
              </div>
              <div aria-hidden="true" className="absolute border border-[#dedede] border-solid inset-0 pointer-events-none rounded-[8px]" />
            </button>
          </div>
        </div>
      )}

      {/* Full Filter Dialog */}
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="!w-[80vw] !max-w-[1600px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-[#0a335c]">Add Filters</DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              Configure multiple filter parameters to refine your data. Click Apply to execute the filters.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
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

            {/* SKUs - Bulk Input */}
            <div className="space-y-2 md:col-span-3">
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
            <div className="space-y-2 md:col-span-3">
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
            <div className="space-y-2 md:col-span-3">
              <Label className="text-[#0a335c] font-medium">Sales Channels</Label>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3 max-h-[200px] overflow-y-auto p-3 border border-[#dedede] rounded-md">
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
              <div className="space-y-2 max-h-[200px] overflow-y-auto p-3 border border-[#dedede] rounded-md">
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
              <div className="space-y-2 max-h-[200px] overflow-y-auto p-3 border border-[#dedede] rounded-md">
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

            {/* Sizes & Order Status Combined */}
            <div className="space-y-2">
              <Label className="text-[#0a335c] font-medium">Sizes</Label>
              <div className="space-y-2 p-3 border border-[#dedede] rounded-md mb-4">
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
            <div className="space-y-2 md:col-span-3">
              <Label className="text-[#0a335c] font-medium">Order Status</Label>
              <div className="grid grid-cols-4 md:grid-cols-7 gap-3 p-3 border border-[#dedede] rounded-md">
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

            {/* Stock Range */}
            <div className="space-y-2 md:col-span-3">
              <Label className="text-[#0a335c] font-medium">Stock Quantity</Label>
              <div className="flex items-center gap-2 max-w-md">
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
            <div className={`h-[36px] relative rounded-[8px] shrink-0 ${!hasChanges ? 'opacity-50' : ''}`}>
              <button
                onClick={handleCancel}
                disabled={!hasChanges}
                className="box-border content-stretch flex gap-[12px] h-[36px] items-center overflow-clip px-[12px] py-0 relative rounded-[inherit] hover:bg-gray-50 transition-colors disabled:cursor-not-allowed"
              >
                <p className="font-['Outfit',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#0a335c] text-[14px] text-nowrap whitespace-pre">
                  Cancel
                </p>
              </button>
              <div aria-hidden="true" className="absolute border border-[#dedede] border-solid inset-0 pointer-events-none rounded-[8px]" />
            </div>

            <button
              onClick={handleApply}
              disabled={!hasChanges}
              className={`box-border content-stretch flex gap-[8px] h-[36px] items-center overflow-clip px-[12px] py-0 relative rounded-[8px] shrink-0 transition-colors ${
                hasChanges 
                  ? 'bg-[#007fff] hover:bg-[#0066dd]' 
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              <p className="font-['Outfit',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre">
                Apply
              </p>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

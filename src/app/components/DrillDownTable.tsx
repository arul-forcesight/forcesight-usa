import { useState } from "react";
import { Card } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ChevronRight, BarChart3, ChevronLeft, ChevronDown } from "lucide-react";
import { AnalyticsPopup } from "./AnalyticsPopup";
import { ChannelIcon } from "./ChannelBadge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

// Types
type DrillLevel = "channel" | "order" | "sku";
type ViewByOption = "channel" | "order" | "sku" | "category" | "fulfillment";

interface ChannelData {
  id: string;
  name: string;
  revenue: number;
  cogs: number;
  adSpend: number;
  shipping: number;
  fees: number;
  returns: number;
  returnCost: number;
  orders: number;
  units: number;
  margin: number;
  profit: number;
  netProfit: number;
  roas: number;
  aov: number;
  change: number;
  payoutLag: number;
  netCashRealised: number;
  profitToCashConversion: number;
  profitToCashConversionPercent: number;
}

interface OrderData {
  id: string;
  orderNumber: string;
  date: string;
  customer: string;
  revenue: number;
  cogs: number;
  shipping: number;
  tax: number;
  discount: number;
  fees: number;
  adSpend: number;
  returns: number;
  returnCost: number;
  items: number;
  status: string;
  profit: number;
  netProfit: number;
  payoutLag: number;
  netCashRealised: number;
  profitToCashConversion: number;
  profitToCashConversionPercent: number;
}

interface SKUData {
  sku: string;
  product: string;
  category: string;
  quantity: number;
  unitPrice: number;
  revenue: number;
  stdCost: number;
  landedCost: number;
  cogs: number;
  shipping: number;
  fees: number;
  adSpend: number;
  returns: number;
  profit: number;
  netProfit: number;
  margin: number;
  roi: number;
  payoutLag: number;
  netCashRealised: number;
  profitToCashConversion: number;
  profitToCashConversionPercent: number;
}

// Mock Data
const channelsData: ChannelData[] = [
  { 
    id: "amazon", 
    name: "Amazon", 
    revenue: 1234567, 
    cogs: 617284,
    adSpend: 98765,
    shipping: 49383,
    fees: 148148,
    returns: 456,
    returnCost: 24691,
    orders: 8542, 
    units: 15234,
    margin: 42.3, 
    profit: 522263,
    netProfit: 320987,
    roas: 12.5,
    aov: 144.56,
    change: 12.5,
    payoutLag: 14,
    netCashRealised: 1185419,
    profitToCashConversion: 298845,
    profitToCashConversionPercent: 93.1
  },
  { 
    id: "walmart", 
    name: "Walmart", 
    revenue: 856432,
    cogs: 428216,
    adSpend: 68515,
    shipping: 34257,
    fees: 102771,
    returns: 289,
    returnCost: 17134,
    orders: 6234, 
    units: 11234,
    margin: 38.7, 
    profit: 331439,
    netProfit: 222673,
    roas: 12.5,
    aov: 137.42,
    change: 8.3,
    payoutLag: 21,
    netCashRealised: 805370,
    profitToCashConversion: 207509,
    profitToCashConversionPercent: 93.2
  },
  { 
    id: "shopify", 
    name: "Shopify", 
    revenue: 456789,
    cogs: 228395,
    adSpend: 36543,
    shipping: 18272,
    fees: 54814,
    returns: 187,
    returnCost: 9134,
    orders: 3876, 
    units: 6543,
    margin: 45.1, 
    profit: 206011,
    netProfit: 118765,
    roas: 12.5,
    aov: 117.87,
    change: 15.7,
    payoutLag: 7,
    netCashRealised: 447930,
    profitToCashConversion: 116451,
    profitToCashConversionPercent: 98.1
  },
  { 
    id: "ebay", 
    name: "eBay", 
    revenue: 234567,
    cogs: 117284,
    adSpend: 18765,
    shipping: 9383,
    fees: 28148,
    returns: 98,
    returnCost: 5894,
    orders: 2145, 
    units: 3421,
    margin: 35.8, 
    profit: 83975,
    netProfit: 60987,
    roas: 12.5,
    aov: 109.35,
    change: -2.4,
    payoutLag: 28,
    netCashRealised: 222378,
    profitToCashConversion: 57836,
    profitToCashConversionPercent: 94.8
  },
];

const ordersData: Record<string, OrderData[]> = {
  amazon: [
    { 
      id: "ord-001", 
      orderNumber: "AMZ-2025-001234", 
      date: "Oct 20, 2025", 
      customer: "John Smith", 
      revenue: 1245,
      cogs: 623,
      shipping: 50,
      tax: 112,
      discount: 0,
      fees: 149,
      adSpend: 99,
      returns: 0,
      returnCost: 0,
      items: 3, 
      status: "delivered", 
      profit: 498,
      netProfit: 224,
      payoutLag: 14,
      netCashRealised: 1196,
      profitToCashConversion: 209,
      profitToCashConversionPercent: 93.3
    },
    { 
      id: "ord-002", 
      orderNumber: "AMZ-2025-001235", 
      date: "Oct 20, 2025", 
      customer: "Sarah Johnson", 
      revenue: 856,
      cogs: 428,
      shipping: 34,
      tax: 77,
      discount: 50,
      fees: 103,
      adSpend: 68,
      returns: 1,
      returnCost: 54,
      items: 2, 
      status: "shipped", 
      profit: 342,
      netProfit: 123,
      payoutLag: 12,
      netCashRealised: 803,
      profitToCashConversion: 115,
      profitToCashConversionPercent: 93.5
    },
    { 
      id: "ord-003", 
      orderNumber: "AMZ-2025-001236", 
      date: "Oct 19, 2025", 
      customer: "Mike Davis", 
      revenue: 2340,
      cogs: 1170,
      shipping: 94,
      tax: 211,
      discount: 100,
      fees: 281,
      adSpend: 187,
      returns: 0,
      returnCost: 0,
      items: 5, 
      status: "delivered", 
      profit: 936,
      netProfit: 307,
      payoutLag: 15,
      netCashRealised: 2246,
      profitToCashConversion: 286,
      profitToCashConversionPercent: 93.2
    },
    { 
      id: "ord-004", 
      orderNumber: "AMZ-2025-001237", 
      date: "Oct 19, 2025", 
      customer: "Emily Wilson", 
      revenue: 678,
      cogs: 339,
      shipping: 27,
      tax: 61,
      discount: 0,
      fees: 81,
      adSpend: 54,
      returns: 0,
      returnCost: 0,
      items: 1, 
      status: "processing", 
      profit: 271,
      netProfit: 116,
      payoutLag: 10,
      netCashRealised: 651,
      profitToCashConversion: 108,
      profitToCashConversionPercent: 93.1
    },
    { 
      id: "ord-005", 
      orderNumber: "AMZ-2025-001238", 
      date: "Oct 18, 2025", 
      customer: "David Brown", 
      revenue: 1567,
      cogs: 784,
      shipping: 63,
      tax: 141,
      discount: 0,
      fees: 188,
      adSpend: 125,
      returns: 2,
      returnCost: 156,
      items: 4, 
      status: "delivered", 
      profit: 627,
      netProfit: 266,
      payoutLag: 16,
      netCashRealised: 1504,
      profitToCashConversion: 248,
      profitToCashConversionPercent: 93.2
    },
  ],
  walmart: [
    { 
      id: "ord-101", 
      orderNumber: "WMT-2025-005678", 
      date: "Oct 20, 2025", 
      customer: "Lisa Anderson", 
      revenue: 934,
      cogs: 467,
      shipping: 37,
      tax: 84,
      discount: 0,
      fees: 112,
      adSpend: 75,
      returns: 0,
      returnCost: 0,
      items: 2, 
      status: "delivered", 
      profit: 361,
      netProfit: 159,
      payoutLag: 21,
      netCashRealised: 877,
      profitToCashConversion: 148,
      profitToCashConversionPercent: 93.1
    },
    { 
      id: "ord-102", 
      orderNumber: "WMT-2025-005679", 
      date: "Oct 19, 2025", 
      customer: "Robert Taylor", 
      revenue: 1123,
      cogs: 562,
      shipping: 45,
      tax: 101,
      discount: 50,
      fees: 135,
      adSpend: 90,
      returns: 1,
      returnCost: 89,
      items: 3, 
      status: "shipped", 
      profit: 435,
      netProfit: 140,
      payoutLag: 19,
      netCashRealised: 1054,
      profitToCashConversion: 130,
      profitToCashConversionPercent: 92.9
    },
    { 
      id: "ord-103", 
      orderNumber: "WMT-2025-005680", 
      date: "Oct 19, 2025", 
      customer: "Jennifer Lee", 
      revenue: 2567,
      cogs: 1284,
      shipping: 103,
      tax: 231,
      discount: 100,
      fees: 308,
      adSpend: 205,
      returns: 0,
      returnCost: 0,
      items: 6, 
      status: "delivered", 
      profit: 993,
      netProfit: 336,
      payoutLag: 22,
      netCashRealised: 2412,
      profitToCashConversion: 313,
      profitToCashConversionPercent: 93.2
    },
  ],
  shopify: [
    { 
      id: "ord-201", 
      orderNumber: "SHP-2025-009012", 
      date: "Oct 20, 2025", 
      customer: "Amanda White", 
      revenue: 1890,
      cogs: 945,
      shipping: 76,
      tax: 170,
      discount: 0,
      fees: 227,
      adSpend: 151,
      returns: 0,
      returnCost: 0,
      items: 4, 
      status: "delivered", 
      profit: 852,
      netProfit: 321
    },
    { 
      id: "ord-202", 
      orderNumber: "SHP-2025-009013", 
      date: "Oct 19, 2025", 
      customer: "Chris Martin", 
      revenue: 756,
      cogs: 378,
      shipping: 30,
      returns: 1,
      returnCost: 67,
      tax: 68,
      discount: 0,
      fees: 91,
      adSpend: 60,
      items: 2, 
      status: "processing", 
      profit: 341,
      netProfit: 129
    },
  ],
  ebay: [
    { 
      id: "ord-301", 
      orderNumber: "EBY-2025-012345", 
      date: "Oct 20, 2025", 
      customer: "Patricia Garcia", 
      revenue: 567,
      cogs: 284,
      shipping: 23,
      tax: 51,
      discount: 0,
      fees: 68,
      adSpend: 45,
      items: 1, 
      status: "delivered", 
      profit: 203,
      netProfit: 96
    },
    { 
      id: "ord-302", 
      orderNumber: "EBY-2025-012346", 
      date: "Oct 19, 2025", 
      customer: "Mark Rodriguez", 
      revenue: 1234,
      cogs: 617,
      shipping: 49,
      tax: 111,
      discount: 50,
      fees: 148,
      adSpend: 99,
      items: 3, 
      status: "shipped", 
      profit: 442,
      netProfit: 160
    },
  ],
};

const skusData: Record<string, SKUData[]> = {
  "ord-001": [
    { 
      sku: "ELC-001", 
      product: "Wireless Headphones Pro", 
      category: "Electronics",
      quantity: 1, 
      unitPrice: 450,
      revenue: 450,
      stdCost: 200,
      landedCost: 220,
      cogs: 220,
      shipping: 18,
      fees: 54,
      adSpend: 36,
      returns: 0,
      profit: 180,
      netProfit: 122,
      margin: 40,
      roi: 55.5,
      payoutLag: 14,
      netCashRealised: 432,
      profitToCashConversion: 114,
      profitToCashConversionPercent: 93.4
    },
    { 
      sku: "ELC-002", 
      product: "Smart Watch Series 5", 
      category: "Electronics",
      quantity: 1, 
      unitPrice: 595,
      revenue: 595,
      stdCost: 280,
      landedCost: 308,
      cogs: 308,
      shipping: 24,
      fees: 71,
      adSpend: 48,
      returns: 0,
      profit: 238,
      netProfit: 144,
      margin: 40,
      roi: 46.8,
      payoutLag: 14,
      netCashRealised: 571,
      profitToCashConversion: 134,
      profitToCashConversionPercent: 93.1
    },
    { 
      sku: "ACC-101", 
      product: "Phone Case Premium", 
      category: "Accessories",
      quantity: 1, 
      unitPrice: 200,
      revenue: 200,
      stdCost: 80,
      landedCost: 88,
      cogs: 88,
      shipping: 8,
      fees: 24,
      adSpend: 16,
      returns: 0,
      profit: 80,
      netProfit: 64,
      margin: 40,
      roi: 72.7,
      payoutLag: 14,
      netCashRealised: 192,
      profitToCashConversion: 60,
      profitToCashConversionPercent: 93.8
    },
  ],
  "ord-002": [
    { 
      sku: "CLO-001", 
      product: "Cotton T-Shirt Blue", 
      category: "Clothing",
      quantity: 2, 
      unitPrice: 214,
      revenue: 428,
      stdCost: 100,
      landedCost: 110,
      cogs: 220,
      shipping: 17,
      fees: 51,
      adSpend: 34,
      returns: 21,
      profit: 171,
      netProfit: 85,
      margin: 40,
      roi: 38.6,
      payoutLag: 12,
      netCashRealised: 407,
      profitToCashConversion: 79,
      profitToCashConversionPercent: 92.9
    },
  ],
  "ord-003": [
    { 
      sku: "HOM-001", 
      product: "Ceramic Plant Pot", 
      category: "Home & Garden",
      quantity: 3, 
      unitPrice: 300,
      revenue: 900,
      stdCost: 120,
      landedCost: 132,
      cogs: 396,
      shipping: 36,
      fees: 108,
      adSpend: 72,
      returns: 0,
      profit: 360,
      netProfit: 288,
      margin: 40,
      roi: 72.7,
      payoutLag: 15,
      netCashRealised: 864,
      profitToCashConversion: 268,
      profitToCashConversionPercent: 93.1
    },
    { 
      sku: "HOM-002", 
      product: "LED Desk Lamp", 
      category: "Home & Garden",
      quantity: 2, 
      unitPrice: 360,
      revenue: 720,
      stdCost: 180,
      landedCost: 198,
      cogs: 396,
      shipping: 29,
      fees: 86,
      adSpend: 58,
      returns: 0,
      profit: 288,
      netProfit: 151,
      margin: 40,
      roi: 38.1
    },
  ],
  "ord-101": [
    { 
      sku: "SPO-001", 
      product: "Yoga Mat Premium", 
      category: "Sports",
      quantity: 1, 
      unitPrice: 534,
      revenue: 534,
      stdCost: 240,
      landedCost: 264,
      cogs: 264,
      shipping: 21,
      fees: 64,
      adSpend: 43,
      returns: 0,
      profit: 214,
      netProfit: 142,
      margin: 40,
      roi: 53.8
    },
    { 
      sku: "SPO-002", 
      product: "Running Shoes Elite", 
      category: "Sports",
      quantity: 1, 
      unitPrice: 400,
      revenue: 400,
      stdCost: 160,
      landedCost: 176,
      cogs: 176,
      shipping: 16,
      fees: 48,
      adSpend: 32,
      returns: 0,
      profit: 160,
      netProfit: 128,
      margin: 40,
      roi: 72.7
    },
  ],
  "ord-201": [
    { 
      sku: "ELC-003", 
      product: "Bluetooth Speaker", 
      category: "Electronics",
      quantity: 2, 
      unitPrice: 630,
      revenue: 1260,
      stdCost: 280,
      landedCost: 308,
      cogs: 616,
      shipping: 50,
      fees: 151,
      adSpend: 101,
      returns: 0,
      profit: 504,
      netProfit: 342,
      margin: 40,
      roi: 55.5
    },
    { 
      sku: "ACC-102", 
      product: "Laptop Stand", 
      category: "Accessories",
      quantity: 2, 
      unitPrice: 315,
      revenue: 630,
      stdCost: 130,
      landedCost: 143,
      cogs: 286,
      shipping: 25,
      fees: 76,
      adSpend: 50,
      returns: 0,
      profit: 252,
      netProfit: 193,
      margin: 40,
      roi: 67.5
    },
  ],
};

// Mock data for Category view
const categoriesData: ChannelData[] = [
  { id: "electronics", name: "Electronics", revenue: 987543, cogs: 493772, adSpend: 78954, shipping: 39502, fees: 118509, returns: 342, returnCost: 19756, orders: 6543, units: 10234, margin: 40.2, profit: 395558, netProfit: 256806, roas: 12.5, aov: 150.95, change: 18.4 },
  { id: "clothing", name: "Clothing & Apparel", revenue: 654321, cogs: 327161, adSpend: 52346, shipping: 26173, fees: 78518, returns: 287, returnCost: 13086, orders: 5234, units: 8932, margin: 38.9, profit: 254485, netProfit: 170123, roas: 12.5, aov: 125.03, change: 12.7 },
  { id: "home", name: "Home & Garden", revenue: 543210, cogs: 271605, adSpend: 43457, shipping: 21728, fees: 65186, returns: 198, returnCost: 10864, orders: 4321, units: 6543, margin: 42.1, profit: 228691, netProfit: 141234, roas: 12.5, aov: 125.72, change: 9.5 },
  { id: "sports", name: "Sports & Outdoors", revenue: 432198, cogs: 216099, adSpend: 34576, shipping: 17288, fees: 51864, returns: 156, returnCost: 8644, orders: 3654, units: 5432, margin: 39.4, profit: 170283, netProfit: 112371, roas: 12.5, aov: 118.27, change: -3.2 },
  { id: "beauty", name: "Beauty & Personal Care", revenue: 321987, cogs: 160994, adSpend: 25759, shipping: 12879, fees: 38638, returns: 134, returnCost: 6440, orders: 2987, units: 4321, margin: 44.2, profit: 142308, netProfit: 83717, roas: 12.5, aov: 107.80, change: 22.1 },
];

// Mock data for Fulfillment view
const fulfillmentData: ChannelData[] = [
  { id: "fba", name: "FBA (Fulfillment by Amazon)", revenue: 1456789, cogs: 728395, adSpend: 116543, shipping: 58271, fees: 174868, returns: 523, returnCost: 29175, orders: 9876, units: 17654, margin: 41.8, profit: 608587, netProfit: 378712, roas: 12.5, aov: 147.52, change: 15.3 },
  { id: "fbm", name: "FBM (Merchant Fulfilled)", revenue: 789432, cogs: 394716, adSpend: 63154, shipping: 31577, fees: 94832, returns: 287, returnCost: 15786, orders: 5432, units: 9234, margin: 38.2, profit: 301637, netProfit: 205153, roas: 12.5, aov: 145.34, change: 8.7 },
  { id: "wfs", name: "WFS (Walmart Fulfillment)", revenue: 543210, cogs: 271605, adSpend: 43457, shipping: 21728, fees: 65186, returns: 189, returnCost: 10342, orders: 4123, units: 7321, margin: 40.1, profit: 217776, netProfit: 141234, roas: 12.5, aov: 131.77, change: 11.2 },
  { id: "3pl", name: "3PL (Third Party Logistics)", revenue: 456789, cogs: 228395, adSpend: 36543, shipping: 18272, fees: 54814, returns: 145, returnCost: 7913, orders: 3654, units: 5987, margin: 42.7, profit: 195079, netProfit: 118765, roas: 12.5, aov: 125.04, change: 6.4 },
  { id: "self", name: "Self-Fulfilled", revenue: 234567, cogs: 117284, adSpend: 18765, shipping: 9383, fees: 28148, returns: 89, returnCost: 4569, orders: 2134, units: 3542, margin: 37.9, profit: 88935, netProfit: 60987, roas: 12.5, aov: 109.93, change: -1.8 },
];

interface DrillDownTableProps {
  initialLevel?: DrillLevel;
}

export function DrillDownTable({ initialLevel = "channel" }: DrillDownTableProps) {
  const [currentLevel, setCurrentLevel] = useState<DrillLevel>(initialLevel);
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [viewBy, setViewBy] = useState<ViewByOption>("channel");

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

  const openAnalytics = (data: any, type: string) => {
    setAnalyticsData({ ...data, type });
    setAnalyticsOpen(true);
  };

  const getCurrentData = () => {
    // At channel level, use viewBy to determine data
    if (currentLevel === "channel") {
      if (viewBy === "channel") return channelsData;
      if (viewBy === "category") return categoriesData;
      if (viewBy === "fulfillment") return fulfillmentData;
      // For order and sku views at top level, show aggregated data
      return channelsData;
    }
    if (currentLevel === "order" && selectedChannel) return ordersData[selectedChannel] || [];
    if (currentLevel === "sku" && selectedOrder) return skusData[selectedOrder] || [];
    return [];
  };

  const getChannelName = () => {
    if (!selectedChannel) return "";
    return channelsData.find(c => c.id === selectedChannel)?.name || "";
  };

  const getOrderNumber = () => {
    if (!selectedOrder || !selectedChannel) return "";
    const orders = ordersData[selectedChannel] || [];
    return orders.find(o => o.id === selectedOrder)?.orderNumber || "";
  };

  // Calculate totals for current view
  const calculateTotals = () => {
    const data = getCurrentData();
    
    if (currentLevel === "channel") {
      const channels = data as ChannelData[];
      const totalUnits = channels.reduce((sum, c) => sum + c.units, 0);
      const totalPayoutDays = channels.reduce((sum, c) => sum + (c.payoutLag * c.units), 0);
      return {
        revenue: channels.reduce((sum, c) => sum + c.revenue, 0),
        cogs: channels.reduce((sum, c) => sum + c.cogs, 0),
        adSpend: channels.reduce((sum, c) => sum + c.adSpend, 0),
        shipping: channels.reduce((sum, c) => sum + c.shipping, 0),
        fees: channels.reduce((sum, c) => sum + c.fees, 0),
        orders: channels.reduce((sum, c) => sum + c.orders, 0),
        units: totalUnits,
        profit: channels.reduce((sum, c) => sum + c.profit, 0),
        netProfit: channels.reduce((sum, c) => sum + c.netProfit, 0),
        returns: channels.reduce((sum, c) => sum + c.returns, 0),
        returnCost: channels.reduce((sum, c) => sum + c.returnCost, 0),
        payoutLag: totalUnits > 0 ? Math.round(totalPayoutDays / totalUnits) : 0,
        netCashRealised: channels.reduce((sum, c) => sum + c.netCashRealised, 0),
        profitToCashConversion: channels.reduce((sum, c) => sum + c.profitToCashConversion, 0),
      };
    } else if (currentLevel === "order") {
      const orders = data as OrderData[];
      return {
        revenue: orders.reduce((sum, o) => sum + o.revenue, 0),
        cogs: orders.reduce((sum, o) => sum + o.cogs, 0),
        shipping: orders.reduce((sum, o) => sum + o.shipping, 0),
        tax: orders.reduce((sum, o) => sum + o.tax, 0),
        discount: orders.reduce((sum, o) => sum + o.discount, 0),
        fees: orders.reduce((sum, o) => sum + o.fees, 0),
        adSpend: orders.reduce((sum, o) => sum + o.adSpend, 0),
        items: orders.reduce((sum, o) => sum + o.items, 0),
        profit: orders.reduce((sum, o) => sum + o.profit, 0),
        netProfit: orders.reduce((sum, o) => sum + o.netProfit, 0),
      };
    } else if (currentLevel === "sku") {
      const skus = data as SKUData[];
      return {
        quantity: skus.reduce((sum, s) => sum + s.quantity, 0),
        revenue: skus.reduce((sum, s) => sum + s.revenue, 0),
        cogs: skus.reduce((sum, s) => sum + s.cogs, 0),
        shipping: skus.reduce((sum, s) => sum + s.shipping, 0),
        fees: skus.reduce((sum, s) => sum + s.fees, 0),
        adSpend: skus.reduce((sum, s) => sum + s.adSpend, 0),
        returns: skus.reduce((sum, s) => sum + s.returns, 0),
        profit: skus.reduce((sum, s) => sum + s.profit, 0),
        netProfit: skus.reduce((sum, s) => sum + s.netProfit, 0),
      };
    }
    return {};
  };

  const totals = calculateTotals();

  return (
    <Card className="border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">View By:</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  {viewBy === "channel" && "Channel"}
                  {viewBy === "order" && "Orders"}
                  {viewBy === "sku" && "SKUs"}
                  {viewBy === "category" && "Category"}
                  {viewBy === "fulfillment" && "Fulfillment"}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {currentLevel === "channel" && (
                  <>
                    <DropdownMenuItem onClick={() => setViewBy("channel")}>
                      Channel {viewBy === "channel" && "(current)"}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setViewBy("order")}>Order</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setViewBy("sku")}>SKU</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setViewBy("category")}>Category</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setViewBy("fulfillment")}>Fulfillment</DropdownMenuItem>
                  </>
                )}
                {currentLevel === "order" && (
                  <>
                    <DropdownMenuItem onClick={() => setViewBy("order")}>
                      Orders {viewBy === "order" && "(current)"}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setViewBy("sku")}>SKUs</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setViewBy("category")}>Category</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setViewBy("fulfillment")}>Fulfillment</DropdownMenuItem>
                  </>
                )}
                {currentLevel === "sku" && (
                  <>
                    <DropdownMenuItem onClick={() => setViewBy("sku")}>
                      SKUs {viewBy === "sku" && "(current)"}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setViewBy("category")}>Category</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setViewBy("fulfillment")}>Fulfillment</DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Breadcrumb Navigation */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              {currentLevel === "channel" ? (
                <BreadcrumbPage>Channels</BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  className="cursor-pointer hover:text-blue-600"
                  onClick={() => handleBreadcrumbClick("channel")}
                >
                  Channels
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            
            {(currentLevel === "order" || currentLevel === "sku") && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {currentLevel === "order" ? (
                    <BreadcrumbPage className="inline-flex items-center gap-1.5">
                      {selectedChannel && <ChannelIcon channel={selectedChannel} size="xs" />}
                      {getChannelName()}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink
                      className="cursor-pointer hover:text-blue-600 inline-flex items-center gap-1.5"
                      onClick={() => handleBreadcrumbClick("order")}
                    >
                      {selectedChannel && <ChannelIcon channel={selectedChannel} size="xs" />}
                      {getChannelName()}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </>
            )}
            
            {currentLevel === "sku" && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{getOrderNumber()}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="overflow-x-auto relative">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200">
              {currentLevel === "channel" && (
                <>
                  <TableHead className="sticky left-0 z-20 bg-white shadow-[2px_0_4px_rgba(0,0,0,0.05)] min-w-[140px]">
                    {viewBy === "channel" && "Channel"}
                    {viewBy === "category" && "Category"}
                    {viewBy === "fulfillment" && "Fulfillment"}
                    {viewBy === "order" && "Order"}
                    {viewBy === "sku" && "SKU"}
                  </TableHead>
                  <TableHead className="text-right px-6">Revenue</TableHead>
                  <TableHead className="text-right px-6">COGS</TableHead>
                  <TableHead className="text-right px-6">Ad Spend</TableHead>
                  <TableHead className="text-right px-6">Shipping</TableHead>
                  <TableHead className="text-right px-6">Fees</TableHead>
                  <TableHead className="text-right px-6">Returns</TableHead>
                  <TableHead className="text-right px-6">Return Cost</TableHead>
                  <TableHead className="text-right px-6">Orders</TableHead>
                  <TableHead className="text-right px-6">Units</TableHead>
                  <TableHead className="text-right px-6">Profit</TableHead>
                  <TableHead className="text-right px-6">Net Profit</TableHead>
                  <TableHead className="text-right px-6">Margin</TableHead>
                  <TableHead className="text-right px-6">ROAS</TableHead>
                  <TableHead className="text-right px-6">AOV</TableHead>
                  <TableHead className="text-right px-6">Change</TableHead>
                  <TableHead className="text-right px-6">Payout Lag (days)</TableHead>
                  <TableHead className="text-right px-6">Net Cash Realised ($)</TableHead>
                  <TableHead className="text-right px-6">Profit to Cash Conv ($)</TableHead>
                  <TableHead className="text-right px-6">Profit to Cash Conv (%)</TableHead>
                  <TableHead className="sticky right-0 z-20 bg-white shadow-[-2px_0_4px_rgba(0,0,0,0.05)] text-center min-w-[120px]">Actions</TableHead>
                </>
              )}
              {currentLevel === "order" && (
                <>
                  <TableHead className="sticky left-0 z-20 bg-white shadow-[2px_0_4px_rgba(0,0,0,0.05)] min-w-[180px]">Order Number</TableHead>
                  <TableHead className="px-6">Date</TableHead>
                  <TableHead className="px-6">Customer</TableHead>
                  <TableHead className="text-right px-6">Revenue</TableHead>
                  <TableHead className="text-right px-6">COGS</TableHead>
                  <TableHead className="text-right px-6">Shipping</TableHead>
                  <TableHead className="text-right px-6">Tax</TableHead>
                  <TableHead className="text-right px-6">Discount</TableHead>
                  <TableHead className="text-right px-6">Fees</TableHead>
                  <TableHead className="text-right px-6">Ad Spend</TableHead>
                  <TableHead className="text-right px-6">Returns</TableHead>
                  <TableHead className="text-right px-6">Return Cost</TableHead>
                  <TableHead className="text-right px-6">Items</TableHead>
                  <TableHead className="text-right px-6">Profit</TableHead>
                  <TableHead className="text-right px-6">Net Profit</TableHead>
                  <TableHead className="px-6">Status</TableHead>
                  <TableHead className="sticky right-0 z-20 bg-white shadow-[-2px_0_4px_rgba(0,0,0,0.05)] text-center min-w-[120px]">Actions</TableHead>
                </>
              )}
              {currentLevel === "sku" && (
                <>
                  <TableHead className="sticky left-0 z-20 bg-white shadow-[2px_0_4px_rgba(0,0,0,0.05)] min-w-[140px]">SKU</TableHead>
                  <TableHead className="px-6">Product</TableHead>
                  <TableHead className="px-6">Category</TableHead>
                  <TableHead className="text-right px-6">Qty</TableHead>
                  <TableHead className="text-right px-6">Unit Price</TableHead>
                  <TableHead className="text-right px-6">Revenue</TableHead>
                  <TableHead className="text-right px-6">Std Cost</TableHead>
                  <TableHead className="text-right px-6">Landed Cost</TableHead>
                  <TableHead className="text-right px-6">COGS</TableHead>
                  <TableHead className="text-right px-6">Shipping</TableHead>
                  <TableHead className="text-right px-6">Fees</TableHead>
                  <TableHead className="text-right px-6">Ad Spend</TableHead>
                  <TableHead className="text-right px-6">Returns</TableHead>
                  <TableHead className="text-right px-6">Profit</TableHead>
                  <TableHead className="text-right px-6">Net Profit</TableHead>
                  <TableHead className="text-right px-6">Margin</TableHead>
                  <TableHead className="text-right px-6">ROI</TableHead>
                  <TableHead className="sticky right-0 z-20 bg-white shadow-[-2px_0_4px_rgba(0,0,0,0.05)] text-center min-w-[120px]">Actions</TableHead>
                </>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentLevel === "channel" && (getCurrentData() as ChannelData[]).map((channel) => (
              <TableRow key={channel.id} className="border-b border-gray-100 hover:bg-gray-50">
                <TableCell className="font-medium sticky left-0 z-10 bg-white group-hover:bg-gray-50 shadow-[2px_0_4px_rgba(0,0,0,0.05)]">
                  {viewBy === "channel" ? (
                    <span className="inline-flex items-center gap-2">
                      <ChannelIcon channel={channel.id} size="sm" />
                      {channel.name}
                    </span>
                  ) : (
                    channel.name
                  )}
                </TableCell>
                <TableCell className="text-right px-6">${channel.revenue.toLocaleString()}</TableCell>
                <TableCell className="text-right text-muted-foreground px-6">${channel.cogs.toLocaleString()}</TableCell>
                <TableCell className="text-right text-orange-600 px-6">${channel.adSpend.toLocaleString()}</TableCell>
                <TableCell className="text-right text-muted-foreground px-6">${channel.shipping.toLocaleString()}</TableCell>
                <TableCell className="text-right text-muted-foreground px-6">${channel.fees.toLocaleString()}</TableCell>
                <TableCell className="text-right px-6">{channel.returns}</TableCell>
                <TableCell className="text-right text-red-600 px-6">${channel.returnCost.toLocaleString()}</TableCell>
                <TableCell className="text-right px-6">{channel.orders.toLocaleString()}</TableCell>
                <TableCell className="text-right px-6">{channel.units.toLocaleString()}</TableCell>
                <TableCell className="text-right text-green-600 font-medium px-6">${channel.profit.toLocaleString()}</TableCell>
                <TableCell className="text-right text-blue-600 font-medium px-6">${channel.netProfit.toLocaleString()}</TableCell>
                <TableCell className="text-right px-6">
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    {channel.margin.toFixed(1)}%
                  </Badge>
                </TableCell>
                <TableCell className="text-right px-6">
                  <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                    {channel.roas.toFixed(1)}x
                  </Badge>
                </TableCell>
                <TableCell className="text-right px-6">${channel.aov.toFixed(2)}</TableCell>
                <TableCell className="text-right px-6">
                  <span className={channel.change >= 0 ? "text-green-600" : "text-red-600"}>
                    {channel.change >= 0 ? "+" : ""}{channel.change}%
                  </span>
                </TableCell>
                <TableCell className="text-right px-6">
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                    {channel.payoutLag}
                  </Badge>
                </TableCell>
                <TableCell className="text-right px-6">${channel.netCashRealised.toLocaleString()}</TableCell>
                <TableCell className="text-right px-6">
                  <span className={channel.profitToCashConversion >= 0 ? "text-green-600" : "text-red-600"}>
                    {channel.profitToCashConversion >= 0 ? "+" : ""}{channel.profitToCashConversion < 0 ? `-$${Math.abs(channel.profitToCashConversion).toLocaleString()}` : `$${channel.profitToCashConversion.toLocaleString()}`}
                  </span>
                </TableCell>
                <TableCell className="text-right px-6">
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    {channel.profitToCashConversionPercent.toFixed(1)}%
                  </Badge>
                </TableCell>
                <TableCell className="sticky right-0 z-10 bg-white group-hover:bg-gray-50 shadow-[-2px_0_4px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDrillDown(channel.id, "channel")}
                      className="h-8 w-8 bg-blue-50/50 hover:bg-blue-100 hover:text-blue-600 text-blue-500"
                      title="View orders"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openAnalytics(channel, "channel")}
                      className="h-8 w-8 bg-purple-50/50 hover:bg-purple-100 hover:text-purple-600 text-purple-500"
                      title="View analytics"
                    >
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            
            {currentLevel === "order" && (getCurrentData() as OrderData[]).map((order) => (
              <TableRow key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                <TableCell className="font-mono text-sm sticky left-0 z-10 bg-white group-hover:bg-gray-50 shadow-[2px_0_4px_rgba(0,0,0,0.05)]">{order.orderNumber}</TableCell>
                <TableCell className="text-muted-foreground px-6">{order.date}</TableCell>
                <TableCell className="px-6">{order.customer}</TableCell>
                <TableCell className="text-right px-6">${order.revenue.toLocaleString()}</TableCell>
                <TableCell className="text-right text-muted-foreground px-6">${order.cogs.toLocaleString()}</TableCell>
                <TableCell className="text-right text-muted-foreground px-6">${order.shipping.toLocaleString()}</TableCell>
                <TableCell className="text-right text-muted-foreground px-6">${order.tax.toLocaleString()}</TableCell>
                <TableCell className="text-right text-red-600 px-6">${order.discount.toLocaleString()}</TableCell>
                <TableCell className="text-right text-muted-foreground px-6">${order.fees.toLocaleString()}</TableCell>
                <TableCell className="text-right text-orange-600 px-6">${order.adSpend.toLocaleString()}</TableCell>
                <TableCell className="text-right px-6">{order.returns}</TableCell>
                <TableCell className="text-right text-red-600 px-6">${order.returnCost.toLocaleString()}</TableCell>
                <TableCell className="text-right px-6">{order.items}</TableCell>
                <TableCell className="text-right text-green-600 font-medium px-6">${order.profit.toLocaleString()}</TableCell>
                <TableCell className="text-right text-blue-600 font-medium px-6">${order.netProfit.toLocaleString()}</TableCell>
                <TableCell className="px-6">
                  <Badge
                    variant="secondary"
                    className={
                      order.status === "delivered"
                        ? "bg-green-100 text-green-700 border-green-200"
                        : order.status === "shipped"
                        ? "bg-blue-100 text-blue-700 border-blue-200"
                        : "bg-amber-100 text-amber-700 border-amber-200"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="sticky right-0 z-10 bg-white group-hover:bg-gray-50 shadow-[-2px_0_4px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDrillDown(order.id, "order")}
                      className="h-8 w-8 bg-blue-50/50 hover:bg-blue-100 hover:text-blue-600 text-blue-500"
                      title="View SKUs"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openAnalytics(order, "order")}
                      className="h-8 w-8 bg-purple-50/50 hover:bg-purple-100 hover:text-purple-600 text-purple-500"
                      title="View analytics"
                    >
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            
            {currentLevel === "sku" && (getCurrentData() as SKUData[]).map((sku) => (
              <TableRow key={sku.sku} className="border-b border-gray-100 hover:bg-gray-50">
                <TableCell className="font-mono text-sm sticky left-0 z-10 bg-white group-hover:bg-gray-50 shadow-[2px_0_4px_rgba(0,0,0,0.05)]">{sku.sku}</TableCell>
                <TableCell className="px-6">{sku.product}</TableCell>
                <TableCell className="text-muted-foreground px-6">{sku.category}</TableCell>
                <TableCell className="text-right px-6">{sku.quantity}</TableCell>
                <TableCell className="text-right px-6">${sku.unitPrice.toLocaleString()}</TableCell>
                <TableCell className="text-right px-6">${sku.revenue.toLocaleString()}</TableCell>
                <TableCell className="text-right text-muted-foreground px-6">${sku.stdCost.toLocaleString()}</TableCell>
                <TableCell className="text-right text-muted-foreground px-6">${sku.landedCost.toLocaleString()}</TableCell>
                <TableCell className="text-right text-muted-foreground px-6">${sku.cogs.toLocaleString()}</TableCell>
                <TableCell className="text-right text-muted-foreground px-6">${sku.shipping.toLocaleString()}</TableCell>
                <TableCell className="text-right text-muted-foreground px-6">${sku.fees.toLocaleString()}</TableCell>
                <TableCell className="text-right text-orange-600 px-6">${sku.adSpend.toLocaleString()}</TableCell>
                <TableCell className="text-right text-red-600 px-6">${sku.returns.toLocaleString()}</TableCell>
                <TableCell className="text-right text-green-600 font-medium px-6">${sku.profit.toLocaleString()}</TableCell>
                <TableCell className="text-right text-blue-600 font-medium px-6">${sku.netProfit.toLocaleString()}</TableCell>
                <TableCell className="text-right px-6">
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    {sku.margin.toFixed(1)}%
                  </Badge>
                </TableCell>
                <TableCell className="text-right px-6">
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                    {sku.roi.toFixed(1)}%
                  </Badge>
                </TableCell>
                <TableCell className="sticky right-0 z-10 bg-white group-hover:bg-gray-50 shadow-[-2px_0_4px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openAnalytics(sku, "sku")}
                      className="h-8 w-8 bg-purple-50/50 hover:bg-purple-100 hover:text-purple-600 text-purple-500"
                      title="View analytics"
                    >
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {/* Totals Row */}
            {getCurrentData().length > 0 && (
              <TableRow className="bg-gray-100 border-t-2 border-gray-300 font-medium">
                {currentLevel === "channel" && (
                  <>
                    <TableCell className="font-bold sticky left-0 z-10 bg-gray-100 shadow-[2px_0_4px_rgba(0,0,0,0.05)]">TOTAL</TableCell>
                    <TableCell className="text-right font-bold px-6">${totals.revenue?.toLocaleString()}</TableCell>
                    <TableCell className="text-right px-6">${totals.cogs?.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-orange-600 px-6">${totals.adSpend?.toLocaleString()}</TableCell>
                    <TableCell className="text-right px-6">${totals.shipping?.toLocaleString()}</TableCell>
                    <TableCell className="text-right px-6">${totals.fees?.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-bold px-6">{totals.returns?.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-red-600 font-bold px-6">${totals.returnCost?.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-bold px-6">{totals.orders?.toLocaleString()}</TableCell>
                    <TableCell className="text-right px-6">{totals.units?.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-green-600 font-bold px-6">${totals.profit?.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-blue-600 font-bold px-6">${totals.netProfit?.toLocaleString()}</TableCell>
                    <TableCell className="text-right px-6">
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        {totals.revenue ? ((totals.profit / totals.revenue) * 100).toFixed(1) : 0}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right px-6">
                      <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                        {totals.adSpend ? (totals.revenue / totals.adSpend).toFixed(1) : 0}x
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right px-6">${totals.orders ? (totals.revenue / totals.orders).toFixed(2) : 0}</TableCell>
                    <TableCell className="px-6"></TableCell>
                    <TableCell className="text-right px-6">
                      <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                        {totals.payoutLag || 0}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-bold px-6">${totals.netCashRealised?.toLocaleString()}</TableCell>
                    <TableCell className="text-right px-6">
                      <span className={totals.profitToCashConversion >= 0 ? "text-green-600" : "text-red-600"}>
                        {totals.profitToCashConversion >= 0 ? "+" : ""}{totals.profitToCashConversion < 0 ? `-$${Math.abs(totals.profitToCashConversion).toLocaleString()}` : `$${totals.profitToCashConversion.toLocaleString()}`}
                      </span>
                    </TableCell>
                    <TableCell className="text-right px-6">
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        {totals.profit && totals.netCashRealised ? ((totals.netCashRealised / totals.profit) * 100).toFixed(1) : 0}%
                      </Badge>
                    </TableCell>
                    <TableCell className="sticky right-0 z-10 bg-gray-100 shadow-[-2px_0_4px_rgba(0,0,0,0.05)]"></TableCell>
                  </>
                )}
                {currentLevel === "order" && (
                  <>
                    <TableCell className="font-bold sticky left-0 z-10 bg-gray-100 shadow-[2px_0_4px_rgba(0,0,0,0.05)]" colSpan={3}>TOTAL</TableCell>
                    <TableCell className="text-right font-bold px-6">${totals.revenue?.toLocaleString()}</TableCell>
                    <TableCell className="text-right px-6">${totals.cogs?.toLocaleString()}</TableCell>
                    <TableCell className="text-right px-6">${totals.shipping?.toLocaleString()}</TableCell>
                    <TableCell className="text-right px-6">${totals.tax?.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-red-600 px-6">${totals.discount?.toLocaleString()}</TableCell>
                    <TableCell className="text-right px-6">${totals.fees?.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-orange-600 px-6">${totals.adSpend?.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-bold px-6">{totals.items?.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-green-600 font-bold px-6">${totals.profit?.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-blue-600 font-bold px-6">${totals.netProfit?.toLocaleString()}</TableCell>
                    <TableCell className="px-6"></TableCell>
                    <TableCell className="sticky right-0 z-10 bg-gray-100 shadow-[-2px_0_4px_rgba(0,0,0,0.05)]"></TableCell>
                  </>
                )}
                {currentLevel === "sku" && (
                  <>
                    <TableCell className="font-bold sticky left-0 z-10 bg-gray-100 shadow-[2px_0_4px_rgba(0,0,0,0.05)]" colSpan={3}>TOTAL</TableCell>
                    <TableCell className="text-right font-bold px-6">{totals.quantity?.toLocaleString()}</TableCell>
                    <TableCell className="px-6"></TableCell>
                    <TableCell className="text-right font-bold px-6">${totals.revenue?.toLocaleString()}</TableCell>
                    <TableCell className="px-6"></TableCell>
                    <TableCell className="px-6"></TableCell>
                    <TableCell className="text-right px-6">${totals.cogs?.toLocaleString()}</TableCell>
                    <TableCell className="text-right px-6">${totals.shipping?.toLocaleString()}</TableCell>
                    <TableCell className="text-right px-6">${totals.fees?.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-orange-600 px-6">${totals.adSpend?.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-red-600 px-6">${totals.returns?.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-green-600 font-bold px-6">${totals.profit?.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-blue-600 font-bold px-6">${totals.netProfit?.toLocaleString()}</TableCell>
                    <TableCell className="text-right px-6">
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        {totals.revenue ? ((totals.profit / totals.revenue) * 100).toFixed(1) : 0}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right px-6">
                      <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                        {totals.cogs ? ((totals.netProfit / totals.cogs) * 100).toFixed(1) : 0}%
                      </Badge>
                    </TableCell>
                    <TableCell className="sticky right-0 z-10 bg-gray-100 shadow-[-2px_0_4px_rgba(0,0,0,0.05)]"></TableCell>
                  </>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Analytics Popup */}
      <AnalyticsPopup
        open={analyticsOpen}
        onOpenChange={setAnalyticsOpen}
        data={analyticsData}
      />
    </Card>
  );
}

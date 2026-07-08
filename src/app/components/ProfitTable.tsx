import { useState } from "react";
import { Card } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ArrowUpDown, ArrowUp, ArrowDown, Settings, Download } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { ChannelBadge } from "./ChannelBadge";

interface ProfitData {
  sku: string;
  product: string;
  category: string;
  unitsSold: number;
  revenue: number;
  cost: number;
  profit: number;
  margin: number;
  status: "active" | "low-stock" | "out-of-stock";
  channel: "amazon" | "shopify";
}

const mockData: ProfitData[] = [
  { sku: "ELC-001", product: "Wireless Headphones Pro", category: "Electronics", unitsSold: 234, revenue: 35100, cost: 21060, profit: 14040, margin: 40.0, status: "active", channel: "amazon" },
  { sku: "ELC-002", product: "Smart Watch Series 5", category: "Electronics", unitsSold: 189, revenue: 56700, cost: 34020, profit: 22680, margin: 40.0, status: "active", channel: "shopify" },
  { sku: "CLO-001", product: "Cotton T-Shirt Blue", category: "Clothing", unitsSold: 456, revenue: 13680, cost: 8208, profit: 5472, margin: 40.0, status: "low-stock", channel: "amazon" },
  { sku: "CLO-002", product: "Denim Jeans Classic", category: "Clothing", unitsSold: 298, revenue: 17880, cost: 10728, profit: 7152, margin: 40.0, status: "active", channel: "shopify" },
  { sku: "HOM-001", product: "Ceramic Plant Pot", category: "Home & Garden", unitsSold: 567, revenue: 17010, cost: 10206, profit: 6804, margin: 40.0, status: "active", channel: "amazon" },
  { sku: "HOM-002", product: "LED Desk Lamp", category: "Home & Garden", unitsSold: 345, revenue: 17250, cost: 10350, profit: 6900, margin: 40.0, status: "active", channel: "shopify" },
  { sku: "SPO-001", product: "Yoga Mat Premium", category: "Sports", unitsSold: 423, revenue: 21150, cost: 12690, profit: 8460, margin: 40.0, status: "active", channel: "amazon" },
  { sku: "SPO-002", product: "Running Shoes Elite", category: "Sports", unitsSold: 234, revenue: 28080, cost: 16848, profit: 11232, margin: 40.0, status: "low-stock", channel: "shopify" },
  { sku: "ELC-003", product: "Bluetooth Speaker", category: "Electronics", unitsSold: 567, revenue: 39690, cost: 23814, profit: 15876, margin: 40.0, status: "active", channel: "amazon" },
  { sku: "CLO-003", product: "Winter Jacket", category: "Clothing", unitsSold: 123, revenue: 18450, cost: 11070, profit: 7380, margin: 40.0, status: "out-of-stock", channel: "shopify" },
];

type SortField = keyof ProfitData;
type SortDirection = "asc" | "desc" | null;

export function ProfitTable() {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [visibleColumns, setVisibleColumns] = useState({
    sku: true,
    product: true,
    category: true,
    channel: true,
    unitsSold: true,
    revenue: true,
    cost: true,
    profit: true,
    margin: true,
    status: true,
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortField(null);
        setSortDirection(null);
      } else {
        setSortDirection("asc");
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedData = [...mockData].sort((a, b) => {
    if (!sortField || !sortDirection) return 0;
    
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }
    
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    return 0;
  });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />;
    }
    if (sortDirection === "asc") {
      return <ArrowUp className="ml-2 h-4 w-4 text-primary" />;
    }
    return <ArrowDown className="ml-2 h-4 w-4 text-primary" />;
  };

  const statusColors = {
    active: "bg-green-100 text-green-700 border-green-200",
    "low-stock": "bg-amber-100 text-amber-700 border-amber-200",
    "out-of-stock": "bg-red-100 text-red-700 border-red-200",
  };

  const handleExport = () => {
    // Mock export functionality
    const csvContent = "data:text/csv;charset=utf-8," + 
      "SKU,Product,Category,Channel,Units Sold,Revenue,Cost,Profit,Margin,Status\n" +
      sortedData.map(row => 
        `${row.sku},${row.product},${row.category},${row.channel},${row.unitsSold},${row.revenue},${row.cost},${row.profit},${row.margin},${row.status}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "profit_table_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3>Profit by SKU</h3>
            <p className="text-sm text-muted-foreground mt-1">Detailed profit analysis for all products</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleExport} className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="w-4 h-4" />
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={visibleColumns.sku}
                onCheckedChange={(checked) => setVisibleColumns(prev => ({ ...prev, sku: checked }))}
              >
                SKU
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={visibleColumns.product}
                onCheckedChange={(checked) => setVisibleColumns(prev => ({ ...prev, product: checked }))}
              >
                Product
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={visibleColumns.category}
                onCheckedChange={(checked) => setVisibleColumns(prev => ({ ...prev, category: checked }))}
              >
                Category
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={visibleColumns.channel}
                onCheckedChange={(checked) => setVisibleColumns(prev => ({ ...prev, channel: checked }))}
              >
                Channel
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={visibleColumns.unitsSold}
                onCheckedChange={(checked) => setVisibleColumns(prev => ({ ...prev, unitsSold: checked }))}
              >
                Units Sold
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={visibleColumns.revenue}
                onCheckedChange={(checked) => setVisibleColumns(prev => ({ ...prev, revenue: checked }))}
              >
                Revenue
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={visibleColumns.cost}
                onCheckedChange={(checked) => setVisibleColumns(prev => ({ ...prev, cost: checked }))}
              >
                Cost
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={visibleColumns.profit}
                onCheckedChange={(checked) => setVisibleColumns(prev => ({ ...prev, profit: checked }))}
              >
                Profit
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={visibleColumns.margin}
                onCheckedChange={(checked) => setVisibleColumns(prev => ({ ...prev, margin: checked }))}
              >
                Margin %
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={visibleColumns.status}
                onCheckedChange={(checked) => setVisibleColumns(prev => ({ ...prev, status: checked }))}
              >
                Status
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200">
              {visibleColumns.sku && (
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2"
                    onClick={() => handleSort("sku")}
                  >
                    SKU
                    <SortIcon field="sku" />
                  </Button>
                </TableHead>
              )}
              {visibleColumns.product && (
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2"
                    onClick={() => handleSort("product")}
                  >
                    Product
                    <SortIcon field="product" />
                  </Button>
                </TableHead>
              )}
              {visibleColumns.category && (
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2"
                    onClick={() => handleSort("category")}
                  >
                    Category
                    <SortIcon field="category" />
                  </Button>
                </TableHead>
              )}
              {visibleColumns.channel && (
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2"
                    onClick={() => handleSort("channel")}
                  >
                    Channel
                    <SortIcon field="channel" />
                  </Button>
                </TableHead>
              )}
              {visibleColumns.unitsSold && (
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2"
                    onClick={() => handleSort("unitsSold")}
                  >
                    Units Sold
                    <SortIcon field="unitsSold" />
                  </Button>
                </TableHead>
              )}
              {visibleColumns.revenue && (
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2"
                    onClick={() => handleSort("revenue")}
                  >
                    Revenue
                    <SortIcon field="revenue" />
                  </Button>
                </TableHead>
              )}
              {visibleColumns.cost && (
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2"
                    onClick={() => handleSort("cost")}
                  >
                    Cost
                    <SortIcon field="cost" />
                  </Button>
                </TableHead>
              )}
              {visibleColumns.profit && (
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2"
                    onClick={() => handleSort("profit")}
                  >
                    Profit
                    <SortIcon field="profit" />
                  </Button>
                </TableHead>
              )}
              {visibleColumns.margin && (
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2"
                    onClick={() => handleSort("margin")}
                  >
                    Margin %
                    <SortIcon field="margin" />
                  </Button>
                </TableHead>
              )}
              {visibleColumns.status && <TableHead>Status</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((item) => (
              <TableRow key={item.sku} className="border-b border-gray-100 hover:bg-gray-50">
                {visibleColumns.sku && <TableCell className="font-mono text-sm">{item.sku}</TableCell>}
                {visibleColumns.product && <TableCell>{item.product}</TableCell>}
                {visibleColumns.category && <TableCell className="text-muted-foreground">{item.category}</TableCell>}
                {visibleColumns.channel && (
                  <TableCell>
                    <ChannelBadge channel={item.channel} size="xs" />
                  </TableCell>
                )}
                {visibleColumns.unitsSold && <TableCell className="text-right">{item.unitsSold.toLocaleString()}</TableCell>}
                {visibleColumns.revenue && <TableCell className="text-right">${item.revenue.toLocaleString()}</TableCell>}
                {visibleColumns.cost && <TableCell className="text-right text-muted-foreground">${item.cost.toLocaleString()}</TableCell>}
                {visibleColumns.profit && <TableCell className="text-right text-green-600 font-medium">${item.profit.toLocaleString()}</TableCell>}
                {visibleColumns.margin && (
                  <TableCell className="text-right">
                    <span className="inline-flex items-center px-2 py-1 rounded bg-blue-100 text-blue-700 text-sm">
                      {item.margin.toFixed(1)}%
                    </span>
                  </TableCell>
                )}
                {visibleColumns.status && (
                  <TableCell>
                    <Badge variant="secondary" className={statusColors[item.status]}>
                      {item.status.replace("-", " ")}
                    </Badge>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}

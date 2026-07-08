import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";
import { Download } from "lucide-react";

const reasonData = [
  { name: "Size Issues", value: 42, color: "#f59e0b" },
  { name: "Product Damage", value: 28, color: "#ef4444" },
  { name: "Changed Mind", value: 30, color: "#8b5cf6" },
];

const categoryData = [
  { category: "Electronics", returns: 234, rate: 3.2 },
  { category: "Clothing", returns: 456, rate: 8.9 },
  { category: "Home & Garden", returns: 123, rate: 4.5 },
  { category: "Sports", returns: 89, rate: 5.1 },
  { category: "Books", returns: 45, rate: 2.3 },
];

export function ReturnsChart() {
  const handleExport = () => {
    console.log("Exporting returns chart data...");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6 border border-gray-200 bg-gradient-to-br from-white via-orange-50/30 to-red-50/30">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Return Reasons</h3>
            <p className="text-sm text-muted-foreground mt-1">Distribution of return causes</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExport} className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={reasonData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {reasonData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6 border border-gray-200 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Returns by Category</h3>
            <p className="text-sm text-muted-foreground mt-1">Category-wise return analysis</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExport} className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="category" className="text-xs" angle={-45} textAnchor="end" height={80} />
            <YAxis className="text-xs" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }}
            />
            <Bar dataKey="returns" fill="url(#colorBar)" radius={[8, 8, 0, 0]} />
            <defs>
              <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

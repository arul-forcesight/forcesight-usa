import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  AlertTriangle, 
  TrendingDown, 
  TrendingUp, 
  Package, 
  RotateCcw,
  DollarSign,
  Clock,
  ArrowRight
} from "lucide-react";

interface Action {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  category: "profit" | "inventory" | "returns" | "sales";
  impact: string;
  date: string;
}

const mockActions: Action[] = [
  {
    id: "1",
    title: "Low Profit Margin Alert - Cotton T-Shirt Blue",
    description: "Profit margin has dropped to 32% from the target of 40%. Cost of goods increased by 12% while price remained stable.",
    priority: "high",
    category: "profit",
    impact: "-$1,234 potential monthly loss",
    date: "2 hours ago"
  },
  {
    id: "2",
    title: "Inventory Restock Needed - Wireless Headphones Pro",
    description: "Stock level critically low (12 units remaining). Based on current sales velocity, stock will be depleted in 3 days.",
    priority: "high",
    category: "inventory",
    impact: "~$2,340 daily revenue at risk",
    date: "5 hours ago"
  },
  {
    id: "3",
    title: "High Return Rate - Denim Jeans Classic",
    description: "Return rate increased to 18% (industry average 8%). Main reason: Size issues (67% of returns).",
    priority: "high",
    category: "returns",
    impact: "$890 in return costs this week",
    date: "1 day ago"
  },
  {
    id: "4",
    title: "Sales Velocity Declining - Bluetooth Speaker",
    description: "30% decrease in daily sales over the past 7 days. Competitor launched similar product at 15% lower price.",
    priority: "medium",
    category: "sales",
    impact: "-$1,850 weekly revenue",
    date: "1 day ago"
  },
  {
    id: "5",
    title: "Inventory Overstocked - Ceramic Plant Pot",
    description: "Current stock (450 units) will take 90 days to sell at current velocity. Tying up $6,750 in capital.",
    priority: "medium",
    category: "inventory",
    impact: "$6,750 capital tied up",
    date: "2 days ago"
  },
  {
    id: "6",
    title: "Price Optimization Opportunity - Smart Watch Series 5",
    description: "Analysis shows 8% price increase would have minimal impact on conversion (-2%) while improving margins significantly.",
    priority: "medium",
    category: "profit",
    impact: "+$3,240 potential monthly profit",
    date: "2 days ago"
  },
  {
    id: "7",
    title: "Seasonal Stock Alert - Winter Jacket",
    description: "Out of stock during peak season. Lost sales opportunity estimated at 150+ units.",
    priority: "high",
    category: "inventory",
    impact: "$22,500 in lost revenue",
    date: "3 days ago"
  },
  {
    id: "8",
    title: "Return Processing Delay - Multiple Products",
    description: "Average return processing time increased to 5.2 days (target: 2 days). 24 returns pending processing.",
    priority: "low",
    category: "returns",
    impact: "Customer satisfaction risk",
    date: "3 days ago"
  },
  {
    id: "9",
    title: "Cost Increase Alert - Yoga Mat Premium",
    description: "Supplier increased costs by 15%. Need to either increase price or find alternative supplier to maintain margins.",
    priority: "medium",
    category: "profit",
    impact: "-$680 monthly profit",
    date: "4 days ago"
  }
];

export function ActionRequired() {
  const priorityConfig = {
    high: {
      color: "bg-red-100 text-red-700 border-red-200",
      icon: <AlertTriangle className="w-4 h-4" />
    },
    medium: {
      color: "bg-amber-100 text-amber-700 border-amber-200",
      icon: <Clock className="w-4 h-4" />
    },
    low: {
      color: "bg-blue-100 text-blue-700 border-blue-200",
      icon: <Clock className="w-4 h-4" />
    }
  };

  const categoryConfig = {
    profit: {
      icon: <DollarSign className="w-5 h-5" />,
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      borderColor: "border-green-200"
    },
    inventory: {
      icon: <Package className="w-5 h-5" />,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      borderColor: "border-purple-200"
    },
    returns: {
      icon: <RotateCcw className="w-5 h-5" />,
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      borderColor: "border-orange-200"
    },
    sales: {
      icon: <TrendingDown className="w-5 h-5" />,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-200"
    }
  };

  const highPriorityCount = mockActions.filter(a => a.priority === "high").length;
  const mediumPriorityCount = mockActions.filter(a => a.priority === "medium").length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">High Priority</p>
              <h2 className="mt-1 text-red-700">{highPriorityCount}</h2>
              <p className="text-xs text-muted-foreground mt-1">Requires immediate attention</p>
            </div>
            <div className="p-3 bg-red-500 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Medium Priority</p>
              <h2 className="mt-1 text-amber-700">{mediumPriorityCount}</h2>
              <p className="text-xs text-muted-foreground mt-1">Review within 3 days</p>
            </div>
            <div className="p-3 bg-amber-500 rounded-xl">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Actions</p>
              <h2 className="mt-1 text-blue-700">{mockActions.length}</h2>
              <p className="text-xs text-muted-foreground mt-1">Across all categories</p>
            </div>
            <div className="p-3 bg-blue-500 rounded-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Action Items - 3 per row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockActions.map((action) => {
          const categoryStyle = categoryConfig[action.category];
          const priorityStyle = priorityConfig[action.priority];

          return (
            <Card 
              key={action.id} 
              className={`p-5 bg-gradient-to-br ${categoryStyle.bgGradient} border ${categoryStyle.borderColor} hover:shadow-lg transition-all group`}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 bg-gradient-to-br ${categoryStyle.gradient} rounded-lg`}>
                    <div className="text-white">
                      {categoryStyle.icon}
                    </div>
                  </div>
                  <Badge variant="secondary" className={`${priorityStyle.color} flex items-center gap-1 border`}>
                    {priorityStyle.icon}
                    {action.priority.toUpperCase()}
                  </Badge>
                </div>

                {/* Content */}
                <h4 className="text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">{action.title}</h4>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-3 flex-1">
                  {action.description}
                </p>

                {/* Footer */}
                <div className="pt-3 border-t border-gray-200 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Impact:</span>
                    <span className="font-medium text-gray-900">{action.impact}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">{action.date}</span>
                    <Button size="sm" variant="ghost" className="gap-1 h-7 px-2 group-hover:bg-white">
                      View Details
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

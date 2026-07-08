import { Card } from "./ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: React.ReactNode;
  gradient?: string;
}

export function MetricCard({ title, value, change, changeLabel, icon, gradient }: MetricCardProps) {
  const isPositive = change >= 0;
  
  const defaultGradient = "from-blue-500 to-cyan-500";
  const gradientClass = gradient || defaultGradient;
  
  return (
    <Card className="p-6 relative overflow-hidden group hover:border-gray-300 transition-all duration-300 border border-gray-200">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-5 group-hover:opacity-10 transition-opacity`} />
      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-muted-foreground text-sm">{title}</p>
            <h3 className="mt-2 bg-gradient-to-br bg-clip-text text-transparent from-gray-900 to-gray-600">{value}</h3>
            <div className="flex items-center gap-2 mt-3">
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
              <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? '+' : ''}{change}%
              </span>
              <span className="text-xs text-muted-foreground">{changeLabel}</span>
            </div>
          </div>
          <div className={`p-3 bg-gradient-to-br ${gradientClass} rounded-xl`}>
            <div className="text-white">
              {icon}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

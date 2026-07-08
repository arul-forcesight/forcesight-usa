import {
  LayoutDashboard,
  TrendingUp,
  CreditCard,
  CircleDollarSign,
  Package,
  Sparkles
} from "lucide-react";

interface MobileBottomNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onAIClick: () => void;
}

export function MobileBottomNav({ currentView, onNavigate, onAIClick }: MobileBottomNavProps) {
  const navItems = [
    { id: "overview", label: "Actions", icon: LayoutDashboard },
    { id: "profit", label: "Analyse", icon: TrendingUp },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "money", label: "Money", icon: CircleDollarSign },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-gray-200/60 shadow-[0_-2px_20px_rgba(0,0,0,0.08)] pb-safe-nav">
      {/* Content */}
      <div className="relative flex items-center justify-around px-2 pt-2 pb-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all min-w-[60px] ${
                isActive
                  ? "text-[#007fff] bg-blue-50"
                  : "text-gray-600 active:bg-gray-50"
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? "text-[#007fff]" : ""}`} />
              <span className={`text-[10px] leading-tight ${isActive ? "font-semibold" : "font-medium"}`}>{item.label}</span>
            </button>
          );
        })}
        
        {/* AI Chat Button - Special styling */}
        <button
          onClick={onAIClick}
          className="flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all min-w-[60px] bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg active:scale-95"
        >
          <Sparkles className="w-6 h-6" />
          <span className="text-[10px] leading-tight font-semibold">Helix AI</span>
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Badge } from "./ui/badge";
import { AlertTriangle, X, ChevronRight } from "lucide-react";

interface MobileActionNotificationProps {
  onViewAll: () => void;
}

export function MobileActionNotification({ onViewAll }: MobileActionNotificationProps) {
  const [dismissed, setDismissed] = useState(false);
  
  // Get count of high priority items
  const actionCount = 3;
  
  if (dismissed) return null;
  
  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3 flex-1" onClick={onViewAll}>
          <div className="flex-shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {actionCount} actions require your attention
            </p>
            <p className="text-xs opacity-90">Low margins, stock alerts & more</p>
          </div>
          <ChevronRight className="w-4 h-4 flex-shrink-0" />
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setDismissed(true);
          }}
          className="ml-2 p-1 hover:bg-white/20 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";

const stateData = {
  CA: { name: "California", sales: 245000, color: "#00376F" },
  TX: { name: "Texas", sales: 198000, color: "#005EBC" },
  FL: { name: "Florida", sales: 156000, color: "#007FFF" },
  NY: { name: "New York", sales: 189000, color: "#005EBC" },
  PA: { name: "Pennsylvania", sales: 98000, color: "#3A9CFF" },
  IL: { name: "Illinois", sales: 112000, color: "#3A9CFF" },
  OH: { name: "Ohio", sales: 87000, color: "#3A9CFF" },
  GA: { name: "Georgia", sales: 76000, color: "#73B7FC" },
  NC: { name: "North Carolina", sales: 69000, color: "#73B7FC" },
  MI: { name: "Michigan", sales: 82000, color: "#3A9CFF" },
  NJ: { name: "New Jersey", sales: 93000, color: "#3A9CFF" },
  VA: { name: "Virginia", sales: 71000, color: "#73B7FC" },
  WA: { name: "Washington", sales: 105000, color: "#007FFF" },
  AZ: { name: "Arizona", sales: 94000, color: "#007FFF" },
  MA: { name: "Massachusetts", sales: 88000, color: "#005EBC" },
  TN: { name: "Tennessee", sales: 62000, color: "#E6F2FF" },
  IN: { name: "Indiana", sales: 58000, color: "#73B7FC" },
  MO: { name: "Missouri", sales: 54000, color: "#73B7FC" },
  MD: { name: "Maryland", sales: 67000, color: "#00376F" },
  WI: { name: "Wisconsin", sales: 51000, color: "#73B7FC" },
  CO: { name: "Colorado", sales: 79000, color: "#E6F2FF" },
  MN: { name: "Minnesota", sales: 72000, color: "#005EBC" },
  SC: { name: "South Carolina", sales: 48000, color: "#E6F2FF" },
  AL: { name: "Alabama", sales: 44000, color: "#E6F2FF" },
  LA: { name: "Louisiana", sales: 49000, color: "#005EBC" },
  KY: { name: "Kentucky", sales: 41000, color: "#005EBC" },
  OR: { name: "Oregon", sales: 63000, color: "#00376F" },
  OK: { name: "Oklahoma", sales: 38000, color: "#3A9CFF" },
  CT: { name: "Connecticut", sales: 56000, color: "#005EBC" },
  UT: { name: "Utah", sales: 59000, color: "#007FFF" },
  IA: { name: "Iowa", sales: 35000, color: "#73B7FC" },
  NV: { name: "Nevada", sales: 68000, color: "#00376F" },
  AR: { name: "Arkansas", sales: 32000, color: "#005EBC" },
  MS: { name: "Mississippi", sales: 29000, color: "#E6F2FF" },
  KS: { name: "Kansas", sales: 33000, color: "#3A9CFF" },
  NM: { name: "New Mexico", sales: 37000, color: "#007FFF" },
  NE: { name: "Nebraska", sales: 28000, color: "#73B7FC" },
  WV: { name: "West Virginia", sales: 24000, color: "#F9F9F9" },
  ID: { name: "Idaho", sales: 31000, color: "#00376F" },
  HI: { name: "Hawaii", sales: 42000, color: "#73B7FC" },
  NH: { name: "New Hampshire", sales: 27000, color: "#73B7FC" },
  ME: { name: "Maine", sales: 26000, color: "#73B7FC" },
  MT: { name: "Montana", sales: 22000, color: "#3A9CFF" },
  RI: { name: "Rhode Island", sales: 25000, color: "#73B7FC" },
  DE: { name: "Delaware", sales: 23000, color: "#00376F" },
  SD: { name: "South Dakota", sales: 19000, color: "#005EBC" },
  ND: { name: "North Dakota", sales: 18000, color: "#005EBC" },
  AK: { name: "Alaska", sales: 21000, color: "#E6F2FF" },
  VT: { name: "Vermont", sales: 17000, color: "#005EBC" },
  WY: { name: "Wyoming", sales: 16000, color: "#3A9CFF" },
  DC: { name: "Washington DC", sales: 34000, color: "#F9F9F9" },
};

export function USMap() {
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  const formatCurrency = (value: number) => {
    return `$${(value / 1000).toFixed(0)}K`;
  };

  return (
    <div className="relative">
      {/* Simplified visual representation */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8">
        <div className="grid grid-cols-6 gap-2">
          {Object.entries(stateData)
            .sort((a, b) => b[1].sales - a[1].sales)
            .slice(0, 30)
            .map(([code, data]) => (
              <div
                key={code}
                className="relative group cursor-pointer transition-all hover:scale-105"
                onMouseEnter={() => setHoveredState(code)}
                onMouseLeave={() => setHoveredState(null)}
              >
                <div
                  className="h-12 rounded-lg flex flex-col items-center justify-center p-2 border border-gray-200"
                  style={{ backgroundColor: data.color }}
                >
                  <span className="text-white text-[10px] font-bold">{code}</span>
                  <span className="text-white text-[8px]">{formatCurrency(data.sales)}</span>
                </div>
                
                {/* Tooltip */}
                {hoveredState === code && (
                  <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs rounded px-3 py-2 whitespace-nowrap shadow-lg">
                    <div className="font-semibold">{data.name}</div>
                    <div className="text-gray-300">Sales: ${data.sales.toLocaleString()}</div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-between text-xs text-gray-600">
        <span>Low Sales</span>
        <div className="flex-1 mx-4 h-2 bg-gradient-to-r from-blue-100 via-blue-500 to-blue-900 rounded-full" />
        <span>High Sales</span>
      </div>

      {/* Top States Summary */}
      <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
        {Object.entries(stateData)
          .sort((a, b) => b[1].sales - a[1].sales)
          .slice(0, 3)
          .map(([code, data], index) => (
            <div key={code} className="bg-white rounded p-2 border border-gray-200">
              <div className="font-semibold text-gray-900">
                #{index + 1} {data.name}
              </div>
              <div className="text-gray-600">${data.sales.toLocaleString()}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

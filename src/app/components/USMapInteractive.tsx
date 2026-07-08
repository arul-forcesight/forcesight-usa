import { useState } from "react";
import svgPaths from "../imports/svg-yv3ei63dyt";

interface StateData {
  value: number;
  name: string;
}

interface USMapInteractiveProps {
  metricType?: string;
  metric?: string;
  stateValues?: Record<string, number>;
  colorScheme?: {
    darkest: string;
    dark: string;
    medium: string;
    light: string;
    lighter: string;
    lightest: string;
  };
  valueFormatter?: (value: number) => string;
}

// Default sales data for each state
const defaultStateData: Record<string, { value: number; name: string }> = {
  California: { value: 245000, name: "California" },
  Texas: { value: 198000, name: "Texas" },
  Florida: { value: 156000, name: "Florida" },
  "New York": { value: 189000, name: "New York" },
  Pennsylvania: { value: 98000, name: "Pennsylvania" },
  Illinois: { value: 112000, name: "Illinois" },
  Ohio: { value: 87000, name: "Ohio" },
  Georgia: { value: 76000, name: "Georgia" },
  "North Carolina": { value: 69000, name: "North Carolina" },
  Michigan: { value: 82000, name: "Michigan" },
  "New Jersey": { value: 93000, name: "New Jersey" },
  Virginia: { value: 71000, name: "Virginia" },
  Washington: { value: 105000, name: "Washington" },
  Arizona: { value: 94000, name: "Arizona" },
  Massachusetts: { value: 88000, name: "Massachusetts" },
  Tennessee: { value: 62000, name: "Tennessee" },
  Indiana: { value: 58000, name: "Indiana" },
  Missouri: { value: 54000, name: "Missouri" },
  Maryland: { value: 67000, name: "Maryland" },
  Wisconsin: { value: 51000, name: "Wisconsin" },
  Colorado: { value: 79000, name: "Colorado" },
  Minnesota: { value: 72000, name: "Minnesota" },
  "South Carolina": { value: 48000, name: "South Carolina" },
  Alabama: { value: 44000, name: "Alabama" },
  Louisiana: { value: 49000, name: "Louisiana" },
  Kentucky: { value: 41000, name: "Kentucky" },
  Oregon: { value: 63000, name: "Oregon" },
  Oklahoma: { value: 38000, name: "Oklahoma" },
  Connecticut: { value: 56000, name: "Connecticut" },
  Utah: { value: 59000, name: "Utah" },
  Iowa: { value: 35000, name: "Iowa" },
  Nevada: { value: 68000, name: "Nevada" },
  Arkansas: { value: 32000, name: "Arkansas" },
  Mississippi: { value: 29000, name: "Mississippi" },
  Kansas: { value: 33000, name: "Kansas" },
  "New Mexico": { value: 37000, name: "New Mexico" },
  Nebraska: { value: 28000, name: "Nebraska" },
  "West Virginia": { value: 24000, name: "West Virginia" },
  Idaho: { value: 31000, name: "Idaho" },
  Hawaii: { value: 42000, name: "Hawaii" },
  "New Hampshire": { value: 27000, name: "New Hampshire" },
  Maine: { value: 26000, name: "Maine" },
  Montana: { value: 22000, name: "Montana" },
  "Rhode Island": { value: 25000, name: "Rhode Island" },
  Delaware: { value: 23000, name: "Delaware" },
  "South Dakota": { value: 19000, name: "South Dakota" },
  "North Dakota": { value: 18000, name: "North Dakota" },
  Alaska: { value: 21000, name: "Alaska" },
  Vermont: { value: 17000, name: "Vermont" },
  Wyoming: { value: 16000, name: "Wyoming" },
  "District of Columbia": { value: 34000, name: "District of Columbia" },
};

const defaultColorScheme = {
  darkest: "#00376F",
  dark: "#005EBC",
  medium: "#007FFF",
  light: "#3A9CFF",
  lighter: "#73B7FC",
  lightest: "#E6F2FF",
};

export function USMapInteractive({ 
  metricType = "Sales",
  metric,
  stateValues,
  colorScheme = defaultColorScheme,
  valueFormatter = (value: number) => `${value.toLocaleString()}`
}: USMapInteractiveProps = {}) {
  // Use metric prop if provided, otherwise fall back to metricType
  const displayMetric = metric || metricType;
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [hoveredPosition, setHoveredPosition] = useState({ x: 0, y: 0 });

  // Build state data from props or use defaults
  const stateData: Record<string, StateData> = {};
  Object.keys(defaultStateData).forEach((stateName) => {
    stateData[stateName] = {
      value: stateValues?.[stateName] ?? defaultStateData[stateName].value,
      name: stateName
    };
  });

  // Get all values to determine ranges
  const allValues = Object.values(stateData).map(d => d.value);
  const maxValue = Math.max(...allValues);
  const minValue = Math.min(...allValues);
  const range = maxValue - minValue;

  // Get color based on value with dynamic ranges
  const getColorForValue = (value: number): string => {
    const normalized = (value - minValue) / range;
    if (normalized >= 0.8) return colorScheme.darkest;
    if (normalized >= 0.6) return colorScheme.dark;
    if (normalized >= 0.4) return colorScheme.medium;
    if (normalized >= 0.2) return colorScheme.light;
    if (normalized >= 0.1) return colorScheme.lighter;
    return colorScheme.lightest;
  };

  const handleStateHover = (stateName: string, event: React.MouseEvent) => {
    setHoveredState(stateName);
    const rect = event.currentTarget.getBoundingClientRect();
    setHoveredPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleStateLeave = () => {
    setHoveredState(null);
  };

  return (
    <div className="relative w-full h-full">
      <svg
        className="block w-full h-full"
        viewBox="0 0 316 187"
        preserveAspectRatio="xMidYMid meet"
      >
        <g id="us-map">
          {/* Render each state */}
          {Object.entries(stateData).map(([stateName, data]) => {
            const isHovered = hoveredState === stateName;
            const color = getColorForValue(data.value);
            
            return (
              <path
                key={stateName}
                id={stateName}
                d={svgPaths[`p${
                  Object.keys(svgPaths).find(key => 
                    // Map state names to their path keys
                    stateName === "Massachusetts" && key === "p16184600" ||
                    stateName === "Minnesota" && key === "p312c31f0" ||
                    stateName === "Montana" && key === "p28232780" ||
                    stateName === "North Dakota" && key === "p3d7a7480" ||
                    stateName === "Hawaii" && key === "p1319ac00" ||
                    stateName === "Idaho" && key === "p7c509f0" ||
                    stateName === "Washington" && key === "p2466280" ||
                    stateName === "Arizona" && key === "p10eaed00" ||
                    stateName === "California" && key === "p39322000" ||
                    stateName === "Colorado" && key === "p32db3500" ||
                    stateName === "Nevada" && key === "p39d72ef0" ||
                    stateName === "New Mexico" && key === "p2afd1880" ||
                    stateName === "Oregon" && key === "p269c7280" ||
                    stateName === "Utah" && key === "p1dd0c380" ||
                    stateName === "Wyoming" && key === "p34035b92" ||
                    stateName === "Arkansas" && key === "p1038d380" ||
                    stateName === "Iowa" && key === "p14964300" ||
                    stateName === "Kansas" && key === "p383da700" ||
                    stateName === "Missouri" && key === "p20210b00" ||
                    stateName === "Nebraska" && key === "p5544b80" ||
                    stateName === "Oklahoma" && key === "p21054680" ||
                    stateName === "South Dakota" && key === "pab75c00" ||
                    stateName === "Louisiana" && key === "p14498580" ||
                    stateName === "Texas" && key === "p322a2d00" ||
                    stateName === "Connecticut" && key === "p2755ef20" ||
                    stateName === "New Hampshire" && key === "p35ad1700" ||
                    stateName === "Rhode Island" && key === "p186c2700" ||
                    stateName === "Vermont" && key === "p10ef1f80" ||
                    stateName === "Alabama" && key === "p1092c800" ||
                    stateName === "Florida" && key === "p16981b80" ||
                    stateName === "Georgia" && key === "p1c3ea580" ||
                    stateName === "Mississippi" && key === "p3a085400" ||
                    stateName === "South Carolina" && key === "p26304f80" ||
                    stateName === "Illinois" && key === "pb785100" ||
                    stateName === "Indiana" && key === "p1173f880" ||
                    stateName === "Kentucky" && key === "p11b26100" ||
                    stateName === "North Carolina" && key === "pb114a00" ||
                    stateName === "Ohio" && key === "p2532ec00" ||
                    stateName === "Tennessee" && key === "p3b4bb00" ||
                    stateName === "Virginia" && key === "p2f8e6980" ||
                    stateName === "Wisconsin" && key === "p28d30100" ||
                    stateName === "West Virginia" && key === "p14b02c0" ||
                    stateName === "Delaware" && key === "p19934730" ||
                    stateName === "District of Columbia" && key === "p1cb6c640" ||
                    stateName === "Maryland" && key === "pabff580" ||
                    stateName === "New Jersey" && key === "p38a24300" ||
                    stateName === "New York" && key === "p1a9cdc00" ||
                    stateName === "Pennsylvania" && key === "p3009680" ||
                    stateName === "Maine" && key === "p21f49cd0" ||
                    stateName === "Michigan" && key === "p347ea040" ||
                    stateName === "Alaska" && key === "p76f880"
                  )?.substring(1) || ""
                }`] || ""}
                fill={isHovered ? colorScheme.medium : color}
                stroke={isHovered ? colorScheme.medium : colorScheme.light}
                strokeWidth="0.3"
                strokeLinejoin="round"
                className="cursor-pointer transition-all duration-200"
                style={{
                  filter: isHovered ? "brightness(1.2)" : "none",
                }}
                onMouseEnter={(e) => handleStateHover(stateName, e)}
                onMouseLeave={handleStateLeave}
                fillRule="evenodd"
                clipRule="evenodd"
              />
            );
          })}
        </g>
      </svg>

      {/* Tooltip */}
      {hoveredState && stateData[hoveredState] && (
        <div
          className="absolute z-50 bg-gray-900 text-white text-xs rounded px-3 py-2 pointer-events-none shadow-lg"
          style={{
            left: `${hoveredPosition.x + 10}px`,
            top: `${hoveredPosition.y - 40}px`,
          }}
        >
          <div className="font-semibold">{stateData[hoveredState].name}</div>
          <div className="text-gray-300">
            {displayMetric}: {valueFormatter(stateData[hoveredState].value)}
          </div>
        </div>
      )}
    </div>
  );
}

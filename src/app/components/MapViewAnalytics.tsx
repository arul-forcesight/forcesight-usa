import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin, TrendingUp, DollarSign, Package, RotateCcw, Truck, Archive } from "lucide-react";
import { USMapInteractive } from "./USMapInteractive";

interface MapViewAnalyticsProps {
  data: any;
}

const topStates = [
  { state: "California", sales: 345678, orders: 2345, growth: 15.2, color: "bg-blue-600" },
  { state: "Texas", sales: 289012, orders: 1987, growth: 12.8, color: "bg-blue-500" },
  { state: "New York", sales: 234567, orders: 1654, growth: 18.4, color: "bg-blue-400" },
  { state: "Florida", sales: 198765, orders: 1432, growth: 9.7, color: "bg-blue-300" },
  { state: "Illinois", sales: 156789, orders: 1123, growth: 14.3, color: "bg-blue-200" },
];

const topCities = [
  { city: "Los Angeles, CA", sales: 123456, orders: 876 },
  { city: "New York, NY", sales: 109876, orders: 745 },
  { city: "Houston, TX", sales: 98765, orders: 654 },
  { city: "Chicago, IL", sales: 87654, orders: 598 },
  { city: "Phoenix, AZ", sales: 76543, orders: 521 },
];

const regionalPerformance = [
  { region: "West Coast", sales: 567890, percentage: 35, growth: 16.5 },
  { region: "East Coast", sales: 456789, percentage: 28, growth: 14.2 },
  { region: "Midwest", sales: 345678, percentage: 21, growth: 11.8 },
  { region: "South", sales: 256789, percentage: 16, growth: 13.4 },
];

// Mock data for different map metrics - Complete state data
const salesByState: Record<string, number> = {
  California: 345678, Texas: 289012, "New York": 234567, Florida: 198765, Illinois: 156789,
  Pennsylvania: 124567, Ohio: 109876, Georgia: 98765, "North Carolina": 87654, Michigan: 92345,
  "New Jersey": 112345, Virginia: 86543, Washington: 145678, Arizona: 123456, Massachusetts: 115678,
  Tennessee: 76543, Indiana: 72345, Missouri: 68765, Maryland: 82345, Wisconsin: 65432,
  Colorado: 98765, Minnesota: 87654, "South Carolina": 62345, Alabama: 55678, Louisiana: 64321,
  Kentucky: 53456, Oregon: 78765, Oklahoma: 49876, Connecticut: 69876, Utah: 73456,
  Iowa: 45678, Nevada: 84321, Arkansas: 41234, Mississippi: 38765, Kansas: 43210,
  "New Mexico": 46789, Nebraska: 36543, "West Virginia": 32109, Idaho: 39876, Hawaii: 52345,
  "New Hampshire": 35678, Maine: 34567, Montana: 28765, "Rhode Island": 32456, Delaware: 30123,
  "South Dakota": 25678, "North Dakota": 24567, Alaska: 27890, Vermont: 22345, Wyoming: 21234,
  "District of Columbia": 44321
};

const unitsByState: Record<string, number> = {
  California: 15234, Texas: 12987, "New York": 11245, Florida: 9876, Illinois: 7654,
  Pennsylvania: 6543, Ohio: 5987, Georgia: 5432, "North Carolina": 4876, Michigan: 5123,
  "New Jersey": 6234, Virginia: 4765, Washington: 8234, Arizona: 6876, Massachusetts: 6456,
  Tennessee: 4234, Indiana: 4012, Missouri: 3876, Maryland: 4543, Wisconsin: 3654,
  Colorado: 5432, Minnesota: 4876, "South Carolina": 3456, Alabama: 3087, Louisiana: 3543,
  Kentucky: 2987, Oregon: 4345, Oklahoma: 2765, Connecticut: 3876, Utah: 4087,
  Iowa: 2543, Nevada: 4654, Arkansas: 2298, Mississippi: 2156, Kansas: 2401,
  "New Mexico": 2598, Nebraska: 2032, "West Virginia": 1789, Idaho: 2210, Hawaii: 2901,
  "New Hampshire": 1987, Maine: 1923, Montana: 1598, "Rhode Island": 1801, Delaware: 1678,
  "South Dakota": 1432, "North Dakota": 1367, Alaska: 1554, Vermont: 1243, Wyoming: 1182,
  "District of Columbia": 2456
};

const profitByState: Record<string, number> = {
  California: 125678, Texas: 98432, "New York": 87234, Florida: 65432, Illinois: 54321,
  Pennsylvania: 45678, Ohio: 39876, Georgia: 36543, "North Carolina": 32109, Michigan: 34567,
  "New Jersey": 41234, Virginia: 31876, Washington: 52345, Arizona: 44321, Massachusetts: 42109,
  Tennessee: 28765, Indiana: 26543, Missouri: 25123, Maryland: 30123, Wisconsin: 23987,
  Colorado: 36543, Minnesota: 32109, "South Carolina": 22876, Alabama: 20456, Louisiana: 23456,
  Kentucky: 19654, Oregon: 28765, Oklahoma: 18234, Connecticut: 25678, Utah: 26876,
  Iowa: 16789, Nevada: 30987, Arkansas: 15123, Mississippi: 14234, Kansas: 15876,
  "New Mexico": 17123, Nebraska: 13456, "West Virginia": 11789, Idaho: 14654, Hawaii: 19234,
  "New Hampshire": 13098, Maine: 12678, Montana: 10543, "Rhode Island": 11901, Delaware: 11056,
  "South Dakota": 9432, "North Dakota": 9001, Alaska: 10234, Vermont: 8210, Wyoming: 7789,
  "District of Columbia": 16234
};

const returnsByState: Record<string, number> = {
  California: 12456, Texas: 9876, "New York": 8765, Florida: 7654, Illinois: 5432,
  Pennsylvania: 4567, Ohio: 3987, Georgia: 3654, "North Carolina": 3210, Michigan: 3456,
  "New Jersey": 4123, Virginia: 3187, Washington: 5234, Arizona: 4432, Massachusetts: 4210,
  Tennessee: 2876, Indiana: 2654, Missouri: 2512, Maryland: 3012, Wisconsin: 2398,
  Colorado: 3654, Minnesota: 3210, "South Carolina": 2287, Alabama: 2045, Louisiana: 2345,
  Kentucky: 1965, Oregon: 2876, Oklahoma: 1823, Connecticut: 2567, Utah: 2687,
  Iowa: 1678, Nevada: 3098, Arkansas: 1512, Mississippi: 1423, Kansas: 1587,
  "New Mexico": 1712, Nebraska: 1345, "West Virginia": 1178, Idaho: 1465, Hawaii: 1923,
  "New Hampshire": 1309, Maine: 1267, Montana: 1054, "Rhode Island": 1190, Delaware: 1105,
  "South Dakota": 943, "North Dakota": 900, Alaska: 1023, Vermont: 821, Wyoming: 778,
  "District of Columbia": 1623
};

const shippingByState: Record<string, number> = {
  California: 45678, Texas: 38765, "New York": 32456, Florida: 27654, Illinois: 21234,
  Pennsylvania: 18765, Ohio: 16543, Georgia: 14987, "North Carolina": 13456, Michigan: 14234,
  "New Jersey": 17890, Virginia: 13109, Washington: 22345, Arizona: 18901, Massachusetts: 17654,
  Tennessee: 12345, Indiana: 11234, Missouri: 10678, Maryland: 13012, Wisconsin: 10234,
  Colorado: 15678, Minnesota: 13876, "South Carolina": 9876, Alabama: 8765, Louisiana: 10123,
  Kentucky: 8456, Oregon: 12345, Oklahoma: 7823, Connecticut: 11012, Utah: 11543,
  Iowa: 7234, Nevada: 13321, Arkansas: 6501, Mississippi: 6123, Kansas: 6834,
  "New Mexico": 7345, Nebraska: 5789, "West Virginia": 5067, Idaho: 6298, Hawaii: 8234,
  "New Hampshire": 5612, Maine: 5456, Montana: 4534, "Rhode Island": 5123, Delaware: 4756,
  "South Dakota": 4056, "North Dakota": 3867, Alaska: 4401, Vermont: 3534, Wyoming: 3345,
  "District of Columbia": 6987
};

const inventoryByState: Record<string, number> = {
  California: 8765, Texas: 6543, "New York": 5432, Florida: 4321, Illinois: 3210,
  Pennsylvania: 2987, Ohio: 2654, Georgia: 2398, "North Carolina": 2156, Michigan: 2278,
  "New Jersey": 2865, Virginia: 2098, Washington: 3576, Arizona: 3023, Massachusetts: 2823,
  Tennessee: 1976, Indiana: 1798, Missouri: 1709, Maryland: 2082, Wisconsin: 1638,
  Colorado: 2509, Minnesota: 2221, "South Carolina": 1580, Alabama: 1403, Louisiana: 1619,
  Kentucky: 1353, Oregon: 1975, Oklahoma: 1252, Connecticut: 1761, Utah: 1846,
  Iowa: 1158, Nevada: 2132, Arkansas: 1040, Mississippi: 980, Kansas: 1094,
  "New Mexico": 1175, Nebraska: 926, "West Virginia": 811, Idaho: 1008, Hawaii: 1318,
  "New Hampshire": 898, Maine: 873, Montana: 725, "Rhode Island": 820, Delaware: 761,
  "South Dakota": 649, "North Dakota": 619, Alaska: 704, Vermont: 565, Wyoming: 535,
  "District of Columbia": 1118
};

// Array format for displaying top performers
const stateDataBySales = Object.entries(salesByState)
  .map(([state, value]) => ({ state, value, metric: "Sales" }))
  .sort((a, b) => b.value - a.value);

const stateDataByUnits = Object.entries(unitsByState)
  .map(([state, value]) => ({ state, value, metric: "Units" }))
  .sort((a, b) => b.value - a.value);

const stateDataByProfit = Object.entries(profitByState)
  .map(([state, value]) => ({ state, value, metric: "Profit" }))
  .sort((a, b) => b.value - a.value);

const stateDataByReturns = Object.entries(returnsByState)
  .map(([state, value]) => ({ state, value, metric: "Returns" }))
  .sort((a, b) => b.value - a.value);

const stateDataByShipping = Object.entries(shippingByState)
  .map(([state, value]) => ({ state, value, metric: "Shipping" }))
  .sort((a, b) => b.value - a.value);

const stateDataByInventory = Object.entries(inventoryByState)
  .map(([state, value]) => ({ state, value, metric: "Inventory" }))
  .sort((a, b) => b.value - a.value);

export function MapViewAnalytics({ data }: MapViewAnalyticsProps) {

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border border-gray-200 bg-gradient-to-br from-blue-50 to-white">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total States</p>
            <h3 className="text-gray-900">47</h3>
            <p className="text-xs text-gray-500 mt-2">Active markets</p>
          </div>
        </Card>

        <Card className="p-4 border border-gray-200 bg-gradient-to-br from-green-50 to-white">
          <div>
            <p className="text-sm text-gray-600 mb-1">Top State</p>
            <h3 className="text-gray-900">California</h3>
            <p className="text-xs text-gray-500 mt-2">$345K revenue</p>
          </div>
        </Card>

        <Card className="p-4 border border-gray-200 bg-gradient-to-br from-purple-50 to-white">
          <div>
            <p className="text-sm text-gray-600 mb-1">Growth Leader</p>
            <h3 className="text-gray-900">New York</h3>
            <p className="text-xs text-green-600 mt-2">+18.4% growth</p>
          </div>
        </Card>

        <Card className="p-4 border border-gray-200 bg-gradient-to-br from-orange-50 to-white">
          <div>
            <p className="text-sm text-gray-600 mb-1">Avg Order Value</p>
            <h3 className="text-gray-900">$147.50</h3>
            <p className="text-xs text-gray-500 mt-2">Nationwide</p>
          </div>
        </Card>
      </div>

      {/* Header */}
      <div>
        <h4>Geographic Distribution - United States</h4>
        <p className="text-sm text-muted-foreground mt-1">Interactive heatmaps showing performance across all states by different metrics</p>
      </div>

      {/* All Maps in Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        
        {/* Sales Map Card */}
        <Card className="p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-blue-500 rounded-lg">
              <DollarSign className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="text-gray-900">Sales Distribution</h4>
              <p className="text-xs text-muted-foreground">Revenue by state</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-64 bg-gradient-to-br from-blue-50 to-white rounded-lg p-4">
              <USMapInteractive 
                metricType="Sales"
                stateValues={salesByState}
                colorScheme={{
                  darkest: "#00376F",
                  dark: "#005EBC",
                  medium: "#007FFF",
                  light: "#3A9CFF",
                  lighter: "#73B7FC",
                  lightest: "#E6F2FF"
                }}
                valueFormatter={(value) => `$${value.toLocaleString()}`}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>Low</span>
              <div className="flex-1 mx-3 h-2 bg-gradient-to-r from-blue-100 via-blue-500 to-blue-900 rounded-full" />
              <span>High</span>
            </div>
            <div className="text-center pt-2 border-t border-gray-200">
              <p className="text-lg text-blue-600">${stateDataBySales[0].value.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Top: {stateDataBySales[0].state}</p>
            </div>
          </div>
        </Card>

        {/* Units Map Card */}
        <Card className="p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-purple-500 rounded-lg">
              <Package className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="text-gray-900">Units Distribution</h4>
              <p className="text-xs text-muted-foreground">Units sold by state</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-64 bg-gradient-to-br from-purple-50 to-white rounded-lg p-4">
              <USMapInteractive 
                metricType="Units"
                stateValues={unitsByState}
                colorScheme={{
                  darkest: "#581C87",
                  dark: "#7C3AED",
                  medium: "#A78BFA",
                  light: "#C4B5FD",
                  lighter: "#DDD6FE",
                  lightest: "#F5F3FF"
                }}
                valueFormatter={(value) => `${value.toLocaleString()} units`}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>Low</span>
              <div className="flex-1 mx-3 h-2 bg-gradient-to-r from-purple-100 via-purple-500 to-purple-900 rounded-full" />
              <span>High</span>
            </div>
            <div className="text-center pt-2 border-t border-gray-200">
              <p className="text-lg text-purple-600">{stateDataByUnits[0].value.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Top: {stateDataByUnits[0].state}</p>
            </div>
          </div>
        </Card>

        {/* Profit Map Card */}
        <Card className="p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-green-500 rounded-lg">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="text-gray-900">Profit Distribution</h4>
              <p className="text-xs text-muted-foreground">Profit by state</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-64 bg-gradient-to-br from-green-50 to-white rounded-lg p-4">
              <USMapInteractive 
                metricType="Profit"
                stateValues={profitByState}
                colorScheme={{
                  darkest: "#14532D",
                  dark: "#15803D",
                  medium: "#22C55E",
                  light: "#86EFAC",
                  lighter: "#BBF7D0",
                  lightest: "#F0FDF4"
                }}
                valueFormatter={(value) => `$${value.toLocaleString()}`}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>Low</span>
              <div className="flex-1 mx-3 h-2 bg-gradient-to-r from-green-100 via-green-500 to-green-900 rounded-full" />
              <span>High</span>
            </div>
            <div className="text-center pt-2 border-t border-gray-200">
              <p className="text-lg text-green-600">${stateDataByProfit[0].value.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Top: {stateDataByProfit[0].state}</p>
            </div>
          </div>
        </Card>

        {/* Returns Map Card */}
        <Card className="p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-red-500 rounded-lg">
              <RotateCcw className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="text-gray-900">Returns Distribution</h4>
              <p className="text-xs text-muted-foreground">Returns by state</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-64 bg-gradient-to-br from-red-50 to-white rounded-lg p-4">
              <USMapInteractive 
                metricType="Returns"
                stateValues={returnsByState}
                colorScheme={{
                  darkest: "#7F1D1D",
                  dark: "#DC2626",
                  medium: "#EF4444",
                  light: "#FCA5A5",
                  lighter: "#FECACA",
                  lightest: "#FEF2F2"
                }}
                valueFormatter={(value) => `${value.toLocaleString()} returns`}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>Low</span>
              <div className="flex-1 mx-3 h-2 bg-gradient-to-r from-red-100 via-red-500 to-red-900 rounded-full" />
              <span>High</span>
            </div>
            <div className="text-center pt-2 border-t border-gray-200">
              <p className="text-lg text-red-600">{stateDataByReturns[0].value.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Top: {stateDataByReturns[0].state}</p>
            </div>
          </div>
        </Card>

        {/* Shipping Map Card */}
        <Card className="p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-orange-500 rounded-lg">
              <Truck className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="text-gray-900">Shipping Distribution</h4>
              <p className="text-xs text-muted-foreground">Shipping costs by state</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-64 bg-gradient-to-br from-orange-50 to-white rounded-lg p-4">
              <USMapInteractive 
                metricType="Shipping"
                stateValues={shippingByState}
                colorScheme={{
                  darkest: "#7C2D12",
                  dark: "#EA580C",
                  medium: "#F97316",
                  light: "#FDBA74",
                  lighter: "#FED7AA",
                  lightest: "#FFF7ED"
                }}
                valueFormatter={(value) => `$${value.toLocaleString()}`}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>Low</span>
              <div className="flex-1 mx-3 h-2 bg-gradient-to-r from-orange-100 via-orange-500 to-orange-900 rounded-full" />
              <span>High</span>
            </div>
            <div className="text-center pt-2 border-t border-gray-200">
              <p className="text-lg text-orange-600">${stateDataByShipping[0].value.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Top: {stateDataByShipping[0].state}</p>
            </div>
          </div>
        </Card>

        {/* Inventory Map Card */}
        <Card className="p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-teal-500 rounded-lg">
              <Archive className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="text-gray-900">Inventory Distribution</h4>
              <p className="text-xs text-muted-foreground">Inventory by state</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-64 bg-gradient-to-br from-teal-50 to-white rounded-lg p-4">
              <USMapInteractive 
                metricType="Inventory"
                stateValues={inventoryByState}
                colorScheme={{
                  darkest: "#134E4A",
                  dark: "#0F766E",
                  medium: "#14B8A6",
                  light: "#5EEAD4",
                  lighter: "#99F6E4",
                  lightest: "#F0FDFA"
                }}
                valueFormatter={(value) => `${value.toLocaleString()} units`}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>Low</span>
              <div className="flex-1 mx-3 h-2 bg-gradient-to-r from-teal-100 via-teal-500 to-teal-900 rounded-full" />
              <span>High</span>
            </div>
            <div className="text-center pt-2 border-t border-gray-200">
              <p className="text-lg text-teal-600">{stateDataByInventory[0].value.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Top: {stateDataByInventory[0].state}</p>
            </div>
          </div>
        </Card>

      </div>

      {/* Top States and Cities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border border-gray-200">
          <h4 className="mb-4">Top States by Revenue</h4>
          <div className="space-y-4">
            {topStates.map((state, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-1 h-8 ${state.color} rounded-full`} />
                    <div>
                      <p className="font-medium text-gray-900">{state.state}</p>
                      <p className="text-xs text-gray-600">{state.orders.toLocaleString()} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${(state.sales / 1000).toFixed(0)}K</p>
                    <div className="flex items-center gap-1 justify-end">
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-600">+{state.growth}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <h4 className="mb-4">Top Cities by Revenue</h4>
          <div className="space-y-3">
            {topCities.map((city, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                    <span className="text-sm font-semibold text-blue-600">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{city.city}</p>
                    <p className="text-xs text-gray-600">{city.orders} orders</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${(city.sales / 1000).toFixed(0)}K</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Regional Performance */}
      <Card className="p-6 border border-gray-200">
        <h4 className="mb-4">Regional Performance Analysis</h4>
        <div className="space-y-4">
          {regionalPerformance.map((region, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-medium text-gray-900">{region.region}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-600">${(region.sales / 1000).toFixed(0)}K</span>
                    <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                      +{region.growth}%
                    </Badge>
                  </div>
                </div>
                <span className="font-semibold text-gray-900">{region.percentage}%</span>
              </div>
              <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${region.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Geographic Insights */}
      <Card className="p-6 border border-blue-200 bg-gradient-to-r from-blue-50 to-white">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-500 rounded-lg">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-gray-900 mb-2">Geographic Insights</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span><strong>West Coast dominance:</strong> 35% of total sales, driven by California tech market</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span><strong>Fastest growth:</strong> New York (+18.4%) showing strong momentum in Q4</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span><strong>Return rate:</strong> Lowest in Midwest (3.2%) vs highest in East Coast (5.8%)</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span><strong>Expansion opportunity:</strong> Midwest showing consistent 11.8% growth</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span><strong>Urban focus:</strong> Top 5 cities account for 40% of total revenue</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span><strong>Shipping efficiency:</strong> West Coast fulfillment centers reduce costs by 18%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

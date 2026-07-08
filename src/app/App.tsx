import { useState, useEffect, useRef } from "react";
import { MetricCard } from "./components/MetricCard";
import { SalesChart } from "./components/SalesChart";
import { ReturnsChart } from "./components/ReturnsChart";
import { RecentOrders } from "./components/RecentOrders";
import { AIChatPanel } from "./components/AIChatPanel";
import { MobileAIChatScreen } from "./components/MobileAIChatScreen";
import { MobileBottomNav } from "./components/MobileBottomNav";
import { MobileActionNotification } from "./components/MobileActionNotification";
import { SidebarEnhanced } from "./components/SidebarEnhanced";
import { ProfitTable } from "./components/ProfitTable";
import { ProfitTableView } from "./components/ProfitTableView";
import { DrillDownTable } from "./components/DrillDownTable";
import { MonthlyViewTable } from "./components/MonthlyViewTable";
import { ActionRequired } from "./components/ActionRequired";
import { ReconcileOrders } from "./components/ReconcileOrders";
import { PaymentsTableEnhanced } from "./components/PaymentsTableEnhanced";
import { PaymentsSummary } from "./components/PaymentsSummary";
import { PaymentTableView } from "./components/PaymentTableView";
import { SummaryView } from "./components/SummaryView";
import { BankTransfers } from "./components/BankTransfers";
import { SubMenuTabs } from "./components/SubMenuTabs";
import { DateRangeFilter } from "./components/DateRangeFilter";
import { Button } from "./components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "./components/ui/sheet";
import { VisuallyHidden } from "./components/ui/visually-hidden";
import { Card } from "./components/ui/card";
import { useIsMobile } from "./components/ui/use-mobile";
import { 
  DollarSign, 
  ShoppingCart, 
  TrendingUp, 
  RotateCcw, 
  Sparkles,
  Package,
  Menu,
  Download,
  Search,
  ChevronDown
} from "lucide-react";

export default function App() {
  const [showAIChat, setShowAIChat] = useState(false);
  const [showMobileAIChat, setShowMobileAIChat] = useState(false);
  const [currentView, setCurrentView] = useState("profit");
  const [currentSubView, setCurrentSubView] = useState("summary");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [globalFilters, setGlobalFilters] = useState({});
  const [showMobileSubMenu, setShowMobileSubMenu] = useState(false);

  // Auto-collapse sidebar when AI chat opens
  useEffect(() => {
    if (showAIChat && !sidebarCollapsed) {
      setSidebarCollapsed(true);
    }
  }, [showAIChat]);

  const handleNavigate = (view: string, subView?: string) => {
    setCurrentView(view);
    if (subView) {
      setCurrentSubView(subView);
    } else {
      // Set default subviews
      if (view === "profit") {
        setCurrentSubView("summary");
      } else if (view === "payments") {
        setCurrentSubView("summary");
      } else if (view === "money") {
        setCurrentSubView("brief");
      }
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case "overview":
        return <OverviewContent />;
      case "profit":
        return <ProfitContent activeTab={currentSubView} setActiveTab={setCurrentSubView} setGlobalFilters={setGlobalFilters} />;
      case "payments":
        return <PaymentsContent activeTab={currentSubView} setActiveTab={setCurrentSubView} setGlobalFilters={setGlobalFilters} />;
      case "inventory":
        return <InventoryContent />;
      case "money":
        return <MoneyContent activeTab={currentSubView} setActiveTab={setCurrentSubView} />;
      case "downloads":
        return <DownloadsContent />;
      case "settings":
        return <SettingsContent />;
      default:
        return <ProfitContent activeTab={currentSubView} setActiveTab={setCurrentSubView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex">
      {/* Mobile Action Notification Bar */}
      {currentView !== "overview" && (
        <MobileActionNotification onViewAll={() => handleNavigate("overview")} />
      )}

      {/* Mobile AI Chat Screen - Full Screen Overlay */}
      {showMobileAIChat && (
        <MobileAIChatScreen onClose={() => setShowMobileAIChat(false)} />
      )}

      {/* Desktop Sidebar */}
      <aside className={`hidden lg:block border-r border-[#e6e8ea] bg-white sticky top-0 h-screen transition-all duration-300 ${sidebarCollapsed ? 'w-[70px]' : 'w-[240px]'}`}>
        <SidebarEnhanced 
          currentView={currentView} 
          currentSubView={currentSubView}
          onNavigate={handleNavigate} 
          collapsed={sidebarCollapsed} 
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
      </aside>

      {/* Mobile Submenu Sheet */}
      <Sheet open={showMobileSubMenu} onOpenChange={setShowMobileSubMenu}>
        <SheetContent side="bottom" className="p-0">
          <VisuallyHidden>
            <SheetTitle>Navigation Menu</SheetTitle>
            <SheetDescription>Select a view to navigate to</SheetDescription>
          </VisuallyHidden>
          <div className="p-4">
            <h3 className="mb-4 capitalize">{currentView}</h3>
            <div className="space-y-1">
              {currentView === "profit" && (
                <>
                  <button
                    onClick={() => {
                      setCurrentSubView("summary");
                      setShowMobileSubMenu(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg ${
                      currentSubView === "summary"
                        ? "bg-blue-50 text-[#007fff]"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    Summary
                  </button>
                  <button
                    onClick={() => {
                      setCurrentSubView("sales-trend");
                      setShowMobileSubMenu(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg ${
                      currentSubView === "sales-trend"
                        ? "bg-blue-50 text-[#007fff]"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    Sales Trend
                  </button>
                  <button
                    onClick={() => {
                      setCurrentSubView("table-view");
                      setShowMobileSubMenu(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg ${
                      currentSubView === "table-view"
                        ? "bg-blue-50 text-[#007fff]"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    Profit - Table View
                  </button>
                  <button
                    onClick={() => {
                      setCurrentSubView("monthly-view");
                      setShowMobileSubMenu(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg ${
                      currentSubView === "monthly-view"
                        ? "bg-blue-50 text-[#007fff]"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    Profit - Monthly View
                  </button>
                </>
              )}
              {currentView === "payments" && (
                <>
                  <button
                    onClick={() => {
                      setCurrentSubView("summary");
                      setShowMobileSubMenu(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg ${
                      currentSubView === "summary"
                        ? "bg-blue-50 text-[#007fff]"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    Payment Summary
                  </button>
                  <button
                    onClick={() => {
                      setCurrentSubView("table");
                      setShowMobileSubMenu(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg ${
                      currentSubView === "table"
                        ? "bg-blue-50 text-[#007fff]"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    Payment Table
                  </button>
                  <button
                    onClick={() => {
                      setCurrentSubView("payouts");
                      setShowMobileSubMenu(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg ${
                      currentSubView === "payouts"
                        ? "bg-blue-50 text-[#007fff]"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    Payout Batches
                  </button>
                  <button
                    onClick={() => {
                      setCurrentSubView("refunds");
                      setShowMobileSubMenu(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg ${
                      currentSubView === "refunds"
                        ? "bg-blue-50 text-[#007fff]"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    Refunds & Returns
                  </button>
                  <button
                    onClick={() => {
                      setCurrentSubView("ads");
                      setShowMobileSubMenu(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg ${
                      currentSubView === "ads"
                        ? "bg-blue-50 text-[#007fff]"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    Ad Deductions
                  </button>
                </>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className={`sticky z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${currentView !== "overview" ? "lg:top-0 top-[52px]" : "top-0"}`}>
          <div className="w-full px-4 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="capitalize">
                {currentView === "profit" ? "Analyse" : 
                 currentView === "overview" ? "Actions Required" : 
                 currentView === "payments" ? "Payments" :
                 currentView === "inventory" ? "Inventory" :
                 currentView}
              </h2>
              {/* Mobile Submenu Trigger */}
              {(currentView === "profit" || currentView === "payments") && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMobileSubMenu(true)}
                  className="lg:hidden"
                >
                  <ChevronDown className="w-4 h-4" />
                </Button>
              )}
            </div>
            <div className="flex items-center gap-3">
              {/* Global Search Bar - Desktop Only */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search SKUs, orders, products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
              
              {/* Desktop AI Button */}
              <Button
                variant="default"
                onClick={() => setShowAIChat(!showAIChat)}
                className="hidden lg:flex gap-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-lg"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ask Helix AI</span>
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto pb-20 lg:pb-0">
          <div className="w-full px-4 lg:px-8 py-6">
            <div className={`${showAIChat ? 'lg:pr-[424px]' : ''}`}>
              {renderContent()}
            </div>

            {/* AI Chat Panel - Desktop Fixed Position */}
            {showAIChat && (
              <div className="hidden lg:block fixed right-6 top-[88px] bottom-6 w-[400px] z-50">
                <AIChatPanel onClose={() => setShowAIChat(false)} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        currentView={currentView}
        onNavigate={handleNavigate}
        onAIClick={() => setShowMobileAIChat(true)}
      />
    </div>
  );
}

function OverviewContent() {
  return <ActionRequired />;
}

function ProfitContent({ activeTab, setActiveTab, setGlobalFilters }: { activeTab: string; setActiveTab: (tab: string) => void; setGlobalFilters: (filters: any) => void }) {
  const isMobile = useIsMobile();
  const tabs = [
    { id: "summary", label: "Summary" },
    { id: "sales-trend", label: "Sales Trend" },
    { id: "table-view", label: "Profit - Table View" },
    { id: "monthly-view", label: "Profit - Monthly View" },
    { id: "custom-view", label: "Canvas - MYOR" },
  ];

  const handleNavigation = (view: string, subView: string) => {
    if (view === "profit") {
      setActiveTab(subView === "table" ? "table-view" : subView);
    }
  };

  return (
    <div className="space-y-6">
      {!isMobile && <SubMenuTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />}
      {isMobile && <div className="h-2" />}
      
      {activeTab === "summary" && (
        <div className="space-y-6">
          <SummaryView onNavigate={handleNavigation} />
        </div>
      )}
      
      {activeTab === "sales-trend" && (
        <div className="space-y-6">
          {/* Filter Section */}
          <DateRangeFilter onFilterApply={(filters) => setGlobalFilters(filters)} />
          
          <SalesChart />

          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3>Profit by Category</h3>
                <div className="space-y-3">
                  {[
                    { name: "Electronics", profit: "$56,150", margin: 38.6 },
                    { name: "Clothing", profit: "$39,380", margin: 40.0 },
                    { name: "Home & Garden", profit: "$30,528", margin: 40.0 },
                    { name: "Sports & Outdoors", profit: "$21,684", margin: 40.0 },
                  ].map((category) => (
                    <div key={category.name} className="p-4 border rounded-lg bg-card">
                      <div className="flex items-center justify-between mb-2">
                        <span>{category.name}</span>
                        <span className="text-primary">{category.margin}% margin</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground text-sm">Net Profit</span>
                        <span>{category.profit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3>Profit Insights</h3>
                <div className="space-y-3">
                  <div className="p-4 border rounded-lg bg-card">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4>Margin Improvement</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Overall profit margin increased from 35.5% to 38.7% through better cost management.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-card">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <DollarSign className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4>Best Performers</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Premium electronics and sporting goods show highest profit margins at 42%+.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg bg-card">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                        <Package className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h4>Cost Optimization</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Shipping costs reduced by 12% through new carrier partnerships.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      )}
      
      {activeTab === "table-view" && (
        <div className="space-y-6">
            {/* Filter Section */}
            <DateRangeFilter onFilterApply={(filters) => setGlobalFilters(filters)} />
            
            {/* Helix Insight Row */}
            <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-start gap-3 p-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    This week: 18 SKUs gained margin, 6 dipped due to ad overspend. Electronics leading with +$12K profit increase.
                  </p>
                </div>
              </div>
            </Card>

          {/* Profit Table with Drill-Down */}
          <DrillDownTable />
        </div>
      )}
      
      {activeTab === "monthly-view" && (
        <div className="space-y-6">
          {/* Filter Section */}
          <DateRangeFilter onFilterApply={(filters) => setGlobalFilters(filters)} />
          
          {/* Helix Insight Row */}
          <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-start gap-3 p-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700">
                  September showed strongest growth with 55% increase in Net Sales. October experienced -82% decline due to seasonal trends.
                </p>
              </div>
            </div>
          </Card>

          <MonthlyViewTable />
        </div>
      )}
      
      {activeTab === "custom-view" && (
        <div className="space-y-6">
          <Card className="p-12 border border-gray-200 text-center">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="mb-2">Canvas - MYOR</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Custom canvas view for multi-year order revenue analysis. Create custom visualizations and reports.
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}

function PaymentsContent({ activeTab, setActiveTab, setGlobalFilters }: { activeTab: string; setActiveTab: (tab: string) => void; setGlobalFilters: (filters: any) => void }) {
  const isMobile = useIsMobile();
  // If no activeTab is set, default to summary (this happens on initial load)
  const currentTab = activeTab || "summary";
  
  const tabs = [
    { id: "summary", label: "Summary" },
    { id: "table", label: "Payment Table" },
    { id: "orders", label: "Order Settlements" },
    { id: "payouts", label: "Payout Batches" },
    { id: "refunds", label: "Refunds & Returns" },
    { id: "ads", label: "Ad Deductions" },
  ];
  
  return (
    <div className="space-y-6">
      {!isMobile && <SubMenuTabs tabs={tabs} activeTab={currentTab} onTabChange={setActiveTab} />}
      {isMobile && <div className="h-2" />}
      
      {currentTab === "summary" && <PaymentsSummary />}
      {currentTab === "table" && <PaymentTableView />}
      {currentTab === "orders" && <PaymentsTableEnhanced view="orders" />}
      {currentTab === "payouts" && <PaymentsTableEnhanced view="payouts" />}
      {currentTab === "refunds" && <PaymentsTableEnhanced view="refunds" />}
      {currentTab === "ads" && <PaymentsTableEnhanced view="ads" />}
    </div>
  );
}

const MONEY_TABS = [
  { id: "brief", label: "The Brief" },
  { id: "tracking", label: "Tracking" },
  { id: "team", label: "Team Performance" },
  { id: "dashboard", label: "Analyst Dashboard" },
  { id: "reports", label: "Reports" },
];

function MoneyContent({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const tab = MONEY_TABS.some((t) => t.id === activeTab) ? activeTab : "brief";

  // Drive the embedded Money module's internal navigation from the sidebar/tabs.
  useEffect(() => {
    iframeRef.current?.contentWindow?.postMessage({ type: "money-nav", view: tab }, "*");
  }, [tab]);

  return (
    <div className="space-y-6">
      <SubMenuTabs tabs={MONEY_TABS} activeTab={tab} onTabChange={setActiveTab} />
      <div className="-mx-4 lg:-mx-8 -mb-6">
        <iframe
          ref={iframeRef}
          src={`${import.meta.env.BASE_URL}money.html#${tab}`}
          title="Money"
          className="w-full border-0 bg-white block"
          style={{ height: "calc(100vh - 8.5rem)" }}
          onLoad={() =>
            iframeRef.current?.contentWindow?.postMessage({ type: "money-nav", view: tab }, "*")
          }
        />
      </div>
    </div>
  );
}

function InventoryContent() {
  return (
    <div className="space-y-6">
      <Card className="p-12 border border-gray-200 text-center">
        <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h3 className="mb-2">Inventory Management</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Inventory planning and management features will be available soon. Track stock levels, forecast demand, and optimize working capital.
        </p>
      </Card>
    </div>
  );
}

function DownloadsContent() {
  const handleDownload = (fileName: string) => {
    // Mock download functionality
    console.log(`Downloading ${fileName}...`);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 border border-gray-200">
        <div className="mb-6">
          <h3>Export Data</h3>
          <p className="text-sm text-muted-foreground mt-1">Download your analytics data in various formats</p>
        </div>
        <div className="space-y-3">
          {[
            { name: "Sales Report (CSV)", description: "Complete sales data for the current period", size: "2.4 MB", gradient: "from-blue-500 to-cyan-500" },
            { name: "Profit Analysis (PDF)", description: "Detailed profit breakdown and insights", size: "1.8 MB", gradient: "from-green-500 to-emerald-500" },
            { name: "Returns Report (XLSX)", description: "Return statistics and customer feedback", size: "890 KB", gradient: "from-orange-500 to-red-500" },
            { name: "Orders Database (CSV)", description: "All order information and customer details", size: "5.2 MB", gradient: "from-purple-500 to-pink-500" },
          ].map((file) => (
            <div key={file.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-all group bg-gradient-to-br from-white to-gray-50">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 bg-gradient-to-br ${file.gradient} rounded-lg`}>
                  <Download className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{file.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">{file.size}</span>
                <Button size="sm" onClick={() => handleDownload(file.name)}>Download</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function SettingsContent() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="mb-4">Dashboard Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p>Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive daily analytics summaries</p>
            </div>
            <Button variant="outline">Configure</Button>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p>Data Refresh Rate</p>
              <p className="text-sm text-muted-foreground">Update frequency for dashboard metrics</p>
            </div>
            <Button variant="outline">Configure</Button>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p>Report Timezone</p>
              <p className="text-sm text-muted-foreground">Set your preferred timezone for reports</p>
            </div>
            <Button variant="outline">Configure</Button>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p>API Access</p>
              <p className="text-sm text-muted-foreground">Manage API keys and integrations</p>
            </div>
            <Button variant="outline">Configure</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

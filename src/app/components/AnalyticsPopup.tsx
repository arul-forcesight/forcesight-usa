import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { FinanceAnalytics } from "./FinanceAnalytics";
import { AdCampaignAnalytics } from "./AdCampaignAnalytics";
import { ShippingAnalytics } from "./ShippingAnalytics";
import { ReturnsAnalytics } from "./ReturnsAnalytics";
import { MapViewAnalytics } from "./MapViewAnalytics";
import { DollarSign, Megaphone, Truck, RotateCcw, MapPin } from "lucide-react";

interface AnalyticsPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: any;
}

export function AnalyticsPopup({ open, onOpenChange, data }: AnalyticsPopupProps) {
  if (!data) return null;

  const getTitle = () => {
    if (data.type === "channel") return `${data.name} - Analytics Dashboard`;
    if (data.type === "order") return `${data.orderNumber} - Analytics Dashboard`;
    if (data.type === "sku") return `${data.sku} - Analytics Dashboard`;
    return "Analytics Dashboard";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!w-[90vw] !max-w-[90vw] max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {getTitle()}
            </span>
          </DialogTitle>
          <DialogDescription>
            Comprehensive analytics across finance, campaigns, shipping, returns, and geographic performance
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="finance" className="w-full overflow-hidden">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="finance" className="gap-2">
              <DollarSign className="w-4 h-4" />
              <span className="hidden sm:inline">Finance</span>
            </TabsTrigger>
            <TabsTrigger value="ads" className="gap-2">
              <Megaphone className="w-4 h-4" />
              <span className="hidden sm:inline">Ad Campaigns</span>
            </TabsTrigger>
            <TabsTrigger value="shipping" className="gap-2">
              <Truck className="w-4 h-4" />
              <span className="hidden sm:inline">Shipping</span>
            </TabsTrigger>
            <TabsTrigger value="returns" className="gap-2">
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Returns</span>
            </TabsTrigger>
            <TabsTrigger value="map" className="gap-2">
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">Map View</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="finance" className="mt-6 overflow-hidden">
            <FinanceAnalytics data={data} />
          </TabsContent>

          <TabsContent value="ads" className="mt-6 overflow-hidden">
            <AdCampaignAnalytics data={data} />
          </TabsContent>

          <TabsContent value="shipping" className="mt-6 overflow-hidden">
            <ShippingAnalytics data={data} />
          </TabsContent>

          <TabsContent value="returns" className="mt-6 overflow-hidden">
            <ReturnsAnalytics data={data} />
          </TabsContent>

          <TabsContent value="map" className="mt-6 overflow-hidden">
            <MapViewAnalytics data={data} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

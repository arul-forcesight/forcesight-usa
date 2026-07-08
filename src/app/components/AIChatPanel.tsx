import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Send, Sparkles, X } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface AIChatPanelProps {
  onClose: () => void;
}

const suggestedPrompts = [
  "Show profit by channel",
  "Which SKUs had margin dips?",
  "Forecast next week's payout",
];

export function AIChatPanel({ onClose }: AIChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi! I'm your AI analytics assistant. I can help you understand your sales data, identify trends, and provide insights. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (promptText?: string) => {
    const messageText = promptText || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponse(messageText),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("channel") || lowerQuery.includes("profit by channel")) {
      return "Here's your profit breakdown by channel: Amazon leads with $1.23M (42.3% margin), followed by Walmart at $856K (38.7% margin), Shopify at $457K (45.1% margin), and eBay at $235K (35.8% margin). Shopify shows the highest margin despite lower volume.";
    } else if (lowerQuery.includes("sku") || lowerQuery.includes("margin dip")) {
      return "I've identified 3 SKUs with margin compression this week: SKU-A8834 (-5.2%), SKU-B2291 (-3.8%), and SKU-C9012 (-4.1%). The main drivers are increased FBA fees and higher return rates. Would you like detailed analysis on any specific SKU?";
    } else if (lowerQuery.includes("forecast") || lowerQuery.includes("payout")) {
      return "Based on current settlement patterns, next week's estimated payout is $21,200 (↑12% vs this week). Amazon payout expected Thursday ($15,400), Shopify on Monday ($4,200), Walmart on Friday ($1,600). 3 pending refunds may reduce this by ~$890.";
    } else if (
      lowerQuery.includes("profit") ||
      lowerQuery.includes("revenue")
    ) {
      return "Your profit margin has increased by 15.3% this month! The main drivers are improved conversion rates in Electronics (+23%) and reduced return rates in Clothing (-8%). I recommend focusing more marketing budget on Electronics to capitalize on this trend.";
    } else if (lowerQuery.includes("return")) {
      return "Return rates have decreased by 8.2% compared to last month. The main reasons for returns are: Size issues (42%), Product damage (28%), and Changed mind (30%). Consider improving product descriptions and size guides to further reduce returns.";
    } else if (
      lowerQuery.includes("sales") ||
      lowerQuery.includes("trend")
    ) {
      return "Sales are trending upward with a 12.5% increase this week. Peak sales hours are between 2-4 PM and 7-9 PM. Wednesday and Thursday show the highest conversion rates. Consider running flash sales during these peak times.";
    } else if (
      lowerQuery.includes("category") ||
      lowerQuery.includes("product")
    ) {
      return "Electronics is your top-performing category with $145,230 in revenue this month, followed by Clothing ($98,450) and Home & Garden ($76,320). Electronics has the highest average order value at $245.";
    } else {
      return "Based on your current data, I notice strong performance across most metrics. Your conversion rate is up 18%, and customer satisfaction has improved. Would you like me to analyze any specific area in detail?";
    }
  };

  const handlePromptClick = (prompt: string) => {
    handleSend(prompt);
  };

  const showSuggestedPrompts = messages.length === 1;

  return (
    <div className="flex flex-col h-full w-full border border-blue-300 rounded-lg bg-white overflow-hidden shadow-lg">
      <div className="flex items-center justify-between p-4 border-b border-blue-200 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              Helix AI
              <span className="px-2 py-0.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-[10px] rounded-full">
                BETA
              </span>
            </h3>
            <p className="text-xs text-gray-600">
              Your intelligent analytics partner
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="hover:bg-blue-100"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}

          {/* Suggested Prompts - Show only initially */}
          {showSuggestedPrompts && (
            <div className="space-y-3 pt-4">
              <p className="text-xs text-gray-500 px-1">Suggested questions:</p>
              {suggestedPrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-3 px-4 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 text-sm"
                  onClick={() => handlePromptClick(prompt)}
                >
                  <Sparkles className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{prompt}</span>
                </Button>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <Input
            placeholder="Ask about sales, profit, returns..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={() => handleSend()} size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

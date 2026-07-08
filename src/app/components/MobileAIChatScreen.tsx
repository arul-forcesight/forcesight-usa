import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Send, Sparkles, X, ArrowLeft } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface MobileAIChatScreenProps {
  onClose: () => void;
}

const suggestedPrompts = [
  "Show profit by channel",
  "Which SKUs had margin dips?",
  "Forecast next week's payout",
  "Top performing products this month",
  "Payment settlement timeline",
  "Return rate analysis",
];

export function MobileAIChatScreen({ onClose }: MobileAIChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi! I'm Helix AI, your analytics assistant. I can help you understand your sales data, identify trends, and provide insights. What would you like to know?",
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
    }, 500);
  };

  const getAIResponse = (prompt: string): string => {
    const lowerPrompt = prompt.toLowerCase();
    if (lowerPrompt.includes("profit") && lowerPrompt.includes("channel")) {
      return "Based on your data:\n\n• Amazon: $85,420 profit (42% margin)\n• Shopify: $52,380 profit (38% margin)\n• Walmart: $31,200 profit (35% margin)\n\nAmazon is your top performer, driven by electronics and home goods categories.";
    } else if (lowerPrompt.includes("sku") || lowerPrompt.includes("margin")) {
      return "6 SKUs experienced margin dips this week:\n\n• SKU-1845: Down 8% due to increased ad spend\n• SKU-2103: Down 5% from higher return rates\n• SKU-3421: Down 12% shipping cost increase\n\nRecommendation: Review ad campaigns for SKU-1845 and investigate return causes for SKU-2103.";
    } else if (lowerPrompt.includes("payout") || lowerPrompt.includes("forecast")) {
      return "Forecasted payout for next week:\n\n• Estimated amount: $42,850\n• Expected date: Next Tuesday\n• Based on 287 pending orders\n\nThis is 15% higher than last week's payout due to increased sales volume.";
    } else if (lowerPrompt.includes("top") || lowerPrompt.includes("performing")) {
      return "Top 5 performing products this month:\n\n1. Wireless Headphones - $12,450 profit\n2. Smart Watch - $9,830 profit\n3. Yoga Mat Set - $7,620 profit\n4. Coffee Maker - $6,890 profit\n5. LED Desk Lamp - $5,340 profit\n\nElectronics dominate with 60% of top profits.";
    } else if (lowerPrompt.includes("payment") || lowerPrompt.includes("settlement")) {
      return "Payment settlement timeline:\n\n• Amazon: 14-day settlement cycle\n• Shopify: 2-5 business days\n• Walmart: 15-day settlement cycle\n\nCurrent pending settlements: $156,780\nExpected in next 7 days: $89,450";
    } else if (lowerPrompt.includes("return")) {
      return "Return rate analysis:\n\n• Overall return rate: 3.8%\n• Highest: Clothing (7.2%)\n• Lowest: Electronics (2.1%)\n\nMain return reasons:\n1. Size issues (45%)\n2. Product defects (28%)\n3. Changed mind (27%)";
    }
    return "I can help you with profit analysis, SKU performance, payment forecasts, and more. Try asking about specific metrics or trends you'd like to explore!";
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-gray-200 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold">Helix AI</h2>
                <p className="text-xs text-gray-600">Your Analytics Assistant</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 overflow-auto px-4 py-6">
        <div className="space-y-5 pb-32">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center mr-3">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={`max-w-[85%] px-4 py-3 ${
                  message.role === "user"
                    ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-[20px] rounded-br-[4px] shadow-sm"
                    : "bg-gray-100 text-gray-900 rounded-[20px] rounded-bl-[4px]"
                }`}
              >
                <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          
          {/* Suggested Prompts - Only show if few messages */}
          {messages.length <= 2 && (
            <div className="space-y-3 pt-6">
              <p className="text-xs text-gray-500 font-medium px-1">Try asking:</p>
              <div className="grid grid-cols-1 gap-2.5">
                {suggestedPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleSend(prompt)}
                    className="text-left px-4 py-3.5 text-[14px] border border-gray-200 rounded-2xl bg-white hover:bg-blue-50 hover:border-blue-300 active:bg-blue-100 transition-all shadow-sm"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="flex-shrink-0 border-t border-gray-200 bg-white shadow-lg">
        <div className="p-4 pb-safe">
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <Input
                placeholder="Ask Helix AI anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="w-full rounded-[24px] border-gray-300 bg-gray-50 px-5 py-4 text-[15px] focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>
            <Button
              onClick={() => handleSend()}
              className="rounded-full w-12 h-12 p-0 flex-shrink-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 shadow-lg active:scale-95 transition-transform"
              disabled={!input.trim()}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

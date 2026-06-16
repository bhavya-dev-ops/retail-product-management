import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, ChevronDown } from "lucide-react";

export default function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Namaste! Welcome to Raj Footwear.\nI can help with products, categories, prices, shop timings, and location.",
      sender: "bot",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const quickButtons = [
    "Men's Collection",
    "Women's Collection",
    "Kids Collection",
    "Shop Location",
    "Contact Number",
  ];

  const getBotResponse = (userText) => {
    const lowerText = userText.toLowerCase();
    
    if (lowerText.includes("product") || lowerText.includes("sell")) {
      return "We offer Men's, Women's, and Kids footwear including shoes, slippers, sandals, sports shoes, heels, and school shoes.";
    }
    if (lowerText.includes("location") || lowerText.includes("where")) {
      return (
        <>
          Raj Footwear, Jawahar Ganj, Gangoh.<br />
          <a
            href="https://maps.app.goo.gl/xv3QK8nLVN18pRzX9"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-red hover:underline font-semibold mt-1 inline-block"
          >
            📍 Open in Google Maps
          </a>
        </>
      );
    }
    if (lowerText.includes("time") || lowerText.includes("timing") || lowerText.includes("open") || lowerText.includes("close")) {
      return "Please visit the shop or contact us for current timings.";
    }
    if (lowerText.includes("sport")) {
      return "Yes, sports shoes are available in our Men's Footwear collection.";
    }
    if (lowerText.includes("school") || lowerText.includes("kid")) {
      return "Yes, school shoes are available in our Kids Footwear collection.";
    }
    if (lowerText.includes("women") || lowerText.includes("lady") || lowerText.includes("ladies")) {
      return "Yes, we have women's shoes, slippers, sandals, and heels.";
    }
    if (lowerText.includes("men") || lowerText.includes("boy")) {
      return "We offer Men's footwear including shoes, slippers, sandals, and sports shoes.";
    }

    return "For more queries and detailed assistance, please visit Raj Footwear shop.";
  };

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { text, sender: "user" }]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot thinking and reply
    setTimeout(() => {
      const botResponse = getBotResponse(text);
      setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Chat Window */}
      <div 
        className={`mb-4 flex w-80 flex-col overflow-hidden rounded-2xl bg-white shadow-premium sm:w-96 border border-gray-100 origin-bottom-right transition-all duration-300 ease-out ${
          isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-50 opacity-0 translate-y-10 pointer-events-none absolute bottom-14 right-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-brand-red p-4 text-white">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold leading-none">Raj Footwear</h3>
              <span className="text-xs text-white/80 flex items-center gap-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Online
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-full p-1 transition hover:bg-white/20"
            aria-label="Close chat"
          >
            <ChevronDown className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex h-80 flex-col gap-3 overflow-y-auto p-4 bg-brand-soft/30">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex max-w-[85%] animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                msg.sender === "user" ? "self-end" : "self-start"
              }`}
            >
              <div
                className={`rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap shadow-sm ${
                  msg.sender === "user"
                    ? "bg-brand-red text-white rounded-tr-sm"
                    : "bg-white text-brand-ink border border-gray-100 rounded-tl-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex max-w-[85%] self-start animate-in fade-in duration-300">
              <div className="rounded-2xl px-4 py-3 text-sm bg-white text-brand-ink border border-gray-100 rounded-tl-sm flex items-center gap-1 shadow-sm">
                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Buttons */}
        {messages.length < 3 && !isTyping && (
          <div className="flex flex-wrap gap-2 p-3 pb-0 border-t border-gray-100 bg-gray-50/50 animate-in fade-in duration-500">
            {quickButtons.map((btn) => (
              <button
                key={btn}
                onClick={() => handleSendMessage(btn)}
                className="rounded-full border border-brand-red/20 bg-white px-3 py-1.5 text-xs font-medium text-brand-red transition hover:bg-brand-red hover:text-white"
              >
                {btn}
              </button>
            ))}
          </div>
        )}

        {/* Input Area */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 p-3 bg-white"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-red text-white transition hover:bg-brand-redDark disabled:opacity-50"
          >
            <Send className="h-4 w-4 ml-1" />
          </button>
        </form>
      </div>

      {/* Floating Button */}
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'} relative`}>
        <div className="absolute inset-0 rounded-full bg-brand-red animate-ping opacity-60"></div>
        <button
          onClick={() => setIsOpen(true)}
          className="focus-ring relative flex h-14 w-14 items-center justify-center rounded-full bg-brand-red text-white shadow-premium transition hover:-translate-y-1 hover:bg-brand-redDark"
          aria-label="Open chat assistant"
        >
          <MessageCircle className="h-7 w-7" />
        </button>
      </div>
    </div>
  );
}

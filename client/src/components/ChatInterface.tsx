import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X, Send, Lock } from "lucide-react";
import { useTherapyChat } from "@/hooks/useTherapyChat";

interface ChatInterfaceProps {
  showChat: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: Date;
}

export default function ChatInterface({ showChat, onClose }: ChatInterfaceProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "Hello! I'm Dr. Sarah Johnson. Based on your responses, I understand you've been dealing with anxiety lately, particularly related to academic stress. I'd like to help you work through that. Could you tell me a bit more about what you're experiencing?",
      timestamp: new Date()
    },
    {
      id: "2",
      sender: "user",
      text: "Hi Dr. Johnson. Yes, I've been feeling overwhelmed with my coursework and upcoming exams. I'm having trouble sleeping and concentrating, and I worry constantly about my performance.",
      timestamp: new Date(Date.now() - 60000)
    },
    {
      id: "3",
      sender: "ai",
      text: "Thank you for sharing that with me. What you're describing sounds like academic anxiety, which is quite common, especially during high-pressure periods. The sleep difficulties and concentration issues are typical physiological responses to stress.\n\nLet's start with something simple. On a scale of 1-10, how would you rate your current anxiety level?",
      timestamp: new Date(Date.now() - 30000)
    },
    {
      id: "4",
      sender: "user",
      text: "I'd say it's about a 7 or 8 most days. It gets worse in the evenings when I'm trying to study.",
      timestamp: new Date(Date.now() - 15000)
    }
  ]);
  
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { sendMessage, isLoading, response } = useTherapyChat();

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);
  
  useEffect(() => {
    if (response) {
      setIsThinking(false);
      addMessage("ai", response);
    }
  }, [response]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message
    addMessage("user", message);
    
    // Send to API
    sendMessage(message);
    
    // Show thinking indicator
    setIsThinking(true);
    
    // Clear input
    setMessage("");
  };

  const addMessage = (sender: "ai" | "user", text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender,
      text,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
  };

  if (!showChat) return null;

  return (
    <motion.section 
      id="chat-interface" 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          <div className="flex items-center">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=50&h=50" 
              alt="Dr. Sarah Johnson" 
              className="h-10 w-10 object-cover rounded-full" 
            />
            <div className="ml-3">
              <h4 className="text-sm font-semibold text-neutral-800">Dr. Sarah Johnson</h4>
              <div className="flex items-center">
                <span className="h-2 w-2 bg-green-500 rounded-full mr-1"></span>
                <span className="text-xs text-neutral-500">Online now</span>
              </div>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-700"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto bg-neutral-50" id="chat-messages">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex items-start max-w-[80%] ${
                  msg.sender === "user" ? "ml-auto justify-end" : ""
                }`}
              >
                {msg.sender === "ai" && (
                  <div className="flex-shrink-0 mr-3">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=40&h=40" 
                      alt="Dr. Sarah Johnson" 
                      className="h-8 w-8 object-cover rounded-full" 
                    />
                  </div>
                )}
                <div 
                  className={`p-3 rounded-lg shadow-sm ${
                    msg.sender === "ai" 
                      ? "bg-white rounded-bl-none" 
                      : "bg-primary-500 text-white rounded-br-none"
                  }`}
                >
                  <p className={msg.sender === "ai" ? "text-neutral-800" : ""}>
                    {msg.text.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < msg.text.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            ))}
            
            {/* AI Thinking Indicator */}
            <AnimatePresence>
              {isThinking && (
                <motion.div 
                  className="flex items-center max-w-[80%]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex-shrink-0 mr-3">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=40&h=40" 
                      alt="Dr. Sarah Johnson" 
                      className="h-8 w-8 object-cover rounded-full" 
                    />
                  </div>
                  <div className="bg-white px-4 py-2 rounded-lg shadow-sm flex items-center space-x-1">
                    <motion.div 
                      className="h-2 w-2 bg-neutral-400 rounded-full"
                      animate={{ scale: [1, 0.8, 1] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    />
                    <motion.div 
                      className="h-2 w-2 bg-neutral-400 rounded-full"
                      animate={{ scale: [1, 0.8, 1] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                    />
                    <motion.div 
                      className="h-2 w-2 bg-neutral-400 rounded-full"
                      animate={{ scale: [1, 0.8, 1] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <div className="p-4 border-t border-neutral-200 bg-white">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center">
              <div className="flex-1">
                <Textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all resize-none min-h-[44px]"
                  rows={1}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
              </div>
              <div className="ml-3">
                <Button 
                  type="submit" 
                  size="icon" 
                  className="p-2 rounded-full"
                  disabled={isLoading || !message.trim()}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </form>
          <div className="mt-2 flex justify-between items-center text-xs text-neutral-500">
            <div className="flex items-center">
              <Lock className="h-3 w-3 mr-1" />
              <span>End-to-end encrypted</span>
            </div>
            <div>
              <span>Powered by Hugging Face</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

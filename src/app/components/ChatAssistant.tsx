import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { motion, AnimatePresence } from 'motion/react';
import { sendMessage, getCurrentConversation, type ChatMessage, type Conversation } from '../../services/chatService';

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load conversation when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      loadConversation();
    }
  }, [isOpen]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadConversation = async () => {
    const result = await getCurrentConversation();
    if (result.success && result.data) {
      setCurrentConversation(result.data);
      setMessages(result.data.messages || []);
    } else {
      // Show welcome message if no conversation
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        role: 'assistant',
        content: "Hello! I'm your personal skincare assistant. How can I help you today?",
        timestamp: new Date().toISOString(),
      };
      setMessages([welcomeMessage]);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const userMessageText = message;
    setMessage('');
    setIsLoading(true);

    try {
      const result = await sendMessage(userMessageText, currentConversation?.id);

      if (result.success && result.data) {
        setCurrentConversation(result.data.conversation);
        setMessages(result.data.conversation.messages);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-[#8b9a8d] to-[#a8c4a8] rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-shadow z-50"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[380px] h-[500px] bg-white rounded-2xl shadow-2xl border border-border z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#8b9a8d] to-[#a8c4a8] p-4 text-white">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Skincare Assistant</h3>
                  <p className="text-xs text-white/80">Online • Always here to help</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#fdfbf8]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl p-3 ${
                      msg.role === 'user'
                        ? 'bg-primary text-white rounded-br-sm'
                        : 'bg-white border border-border rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.role === 'user' ? 'text-white/70' : 'text-muted-foreground'
                      }`}
                    >
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-border rounded-2xl rounded-bl-sm p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-white">
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 rounded-xl"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="bg-primary hover:bg-primary/90 rounded-xl"
                  disabled={isLoading}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

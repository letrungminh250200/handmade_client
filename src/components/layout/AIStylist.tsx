
"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X } from 'lucide-react';
import { ChatMessage } from '@/lib/types';

const AIStylist: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '0', role: 'model', text: 'Chào bạn! Mình là Minh Thư 🌿. Bạn cần tư vấn chọn đồ cho dịp nào, hay muốn tìm phong cách gì hôm nay?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.text, history }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: data.text || "..." }]);
    } catch {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: "Xin lỗi, Minh Thư đang bị lạc trôi một chút. Bạn thử lại sau nhé!" }]);
    }
    setIsLoading(false);
  };


  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className={`fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-lg transition-all ${isOpen ? 'bg-stone-200 text-stone-600 rotate-90' : 'bg-terracotta text-white'}`}>
        {isOpen ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-stone-100 flex flex-col z-40 animate-fade-in-up">
          <div className="px-6 py-4 bg-stone-100 border-b flex items-center gap-3">
             <Sparkles className="h-5 w-5 text-terracotta" />
             <div><h3 className="font-serif font-bold">Minh Thư Stylist</h3><p className="text-xs text-stone-500">AI Fashion Assistant</p></div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50 scrollbar-hide">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-terracotta text-white' : 'bg-white text-stone-700 shadow-sm'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 bg-white border-t rounded-b-2xl">
            <div className="flex items-center gap-2 bg-stone-50 rounded-full px-4 py-2 border">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Hỏi Minh Thư..." className="flex-1 bg-transparent border-none focus:ring-0 text-sm" />
              <button onClick={handleSend} disabled={!input.trim()} className="p-1.5 bg-terracotta text-white rounded-full"><Send className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIStylist;


"use client";
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles, Send, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChatMessage, Product } from '@/lib/types';

function parseMarkdown(text: string): string {
  let html = text
    // Links: [text](url) → clickable <a>
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-terracotta underline hover:text-terracotta/80 font-medium">$1</a>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>');
  // Wrap consecutive <li> in <ul>
  html = html.replace(/(?:^|<br\/>)[-•]\s+(.+?)(?=<br\/>|$)/g, '<li>$1</li>');
  if (html.includes('<li>')) {
    html = html.replace(/(<li>(?:.|\n)*<\/li>)/g, '<ul class="list-disc pl-4 my-1 space-y-0.5">$1</ul>');
  }
  return html;
}

function formatPrice(n: number): string {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n);
}

const STORAGE_KEY = 'minhthu_chat_history';
const CHAT_TTL = 3 * 24 * 60 * 60 * 1000; // 3 ngày
const DEFAULT_MESSAGE: ChatMessage = { id: '0', role: 'model', text: 'Chào bạn! Mình là Minh Thư 🌿. Bạn cần tư vấn chọn đồ cho dịp nào, hay muốn tìm phong cách gì hôm nay?' };

const AIStylist: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window === 'undefined') return [DEFAULT_MESSAGE];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const { messages: saved, timestamp } = JSON.parse(stored);
        if (Date.now() - timestamp < CHAT_TTL && saved?.length > 0) {
          return saved;
        }
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch { /* ignore */ }
    return [DEFAULT_MESSAGE];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Product suggestions
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const allProductsRef = useRef<Product[]>([]);
  const suggestTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Fetch all products once for suggestions
  useEffect(() => {
    fetch('/api/products?limit=50')
      .then(res => res.json())
      .then(data => { allProductsRef.current = data.data?.items || []; })
      .catch(() => {});
  }, []);

  // Show 2 random suggestions on page change when chat is closed
  const pickRandom = useCallback(() => {
    if (isOpen || allProductsRef.current.length < 2) return;
    const shuffled = [...allProductsRef.current].sort(() => Math.random() - 0.5);
    setSuggestions(shuffled.slice(0, 2));
    if(showSuggestions === false) setTimeout(() => setShowSuggestions(true), 2000);
    
    // Auto-hide after 8 seconds
    if (suggestTimer.current) clearTimeout(suggestTimer.current);
    // suggestTimer.current = setTimeout(() => setShowSuggestions(false), 8000);
  }, [isOpen, showSuggestions]);

  useEffect(() => {
    pickRandom();
    const timer = suggestTimer.current;
    return () => { if (timer) clearTimeout(timer); };
  }, [pathname, pickRandom]);

  // Hide suggestions when chat opens - use event handler instead of effect
  const handleToggleOpen = useCallback(() => {
    setIsOpen(prev => {
      if (!prev === true) setSuggestions([]);
      return !prev;
    });
  }, []);



  // Save to localStorage on change (skip initial)
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    try {
      const toSave = messages.slice(-50);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ messages: toSave, timestamp: Date.now() }));
    } catch { /* ignore */ }
  }, [messages]);

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
      {/* Suggestion popup */}
      {showSuggestions && !isOpen && suggestions.length > 0 && (
        <div className="fixed bottom-24 right-6 z-30 animate-fade-in-up">
          <div className="bg-white rounded-2xl shadow-xl border border-stone-100 p-4 w-72">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-stone-500 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-terracotta" />
                Gợi ý cho bạn
              </p>
              <button onClick={() => setShowSuggestions(false)} className="text-stone-300 hover:text-stone-500 transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-2.5">
              {suggestions.map((p, idx) => (
                <Link
                  key={p.id}
                  href={`/${p.slug || p.id}`}
                  onClick={() => setShowSuggestions(false)}
                  className={`items-center gap-3 p-2 rounded-xl hover:bg-stone-50 transition-colors group ${idx === 0 ? 'flex' : 'hidden sm:flex'}`}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-stone-100"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-stone-700 truncate group-hover:text-terracotta transition-colors">
                      {p.name}
                    </p>
                    <p className="text-xs font-bold text-stone-900">{formatPrice(p.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <button onClick={handleToggleOpen} className={`fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-lg transition-all ${isOpen ? 'bg-stone-200 text-stone-600 rotate-90' : 'bg-stone-600 text-white'}`}>
        {isOpen ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-white overflow-hidden rounded-2xl shadow-2xl border border-stone-100 flex flex-col z-40 animate-fade-in-up">
          <div className="px-6 py-4 bg-stone-100 border-b flex items-center gap-3">
             <Sparkles className="h-5 w-5 text-terracotta" />
             <div className="flex-1"><h3 className="font-serif font-bold">Minh Thư Stylist</h3><p className="text-xs text-stone-500">AI Fashion Assistant</p></div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50 scrollbar-hide">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-stone-700 text-white' : 'bg-white text-stone-700 shadow-sm'}`}
                  dangerouslySetInnerHTML={{ __html: msg.role === 'model' ? parseMarkdown(msg.text) : msg.text }}
                />
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-stone-400 rounded-2xl px-4 py-3 text-sm shadow-sm">
                  <span className="animate-pulse">Minh Thư đang suy nghĩ...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 bg-white border-t rounded-b-2xl">
            <div className="flex items-center gap-2 bg-stone-50 rounded-full px-4 py-2 border">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Hỏi Minh Thư..." className="flex-1 bg-transparent border-none focus:ring-0 outline-none text-sm" />
              <button onClick={handleSend} disabled={!input.trim()} className="p-1.5 bg-stone-700 text-white rounded-full"><Send className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export default AIStylist;

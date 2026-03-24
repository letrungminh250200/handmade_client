"use client";
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Facebook, Instagram, Twitter } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate send
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Cảm ơn bạn đã liên hệ! Minh Thư sẽ phản hồi sớm nhất có thể.");
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-16 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-800 mb-4">Liên Hệ</h1>
        <p className="text-stone-500 max-w-xl mx-auto">
          Bạn cần tư vấn sản phẩm, đặt hàng riêng hay chỉ đơn giản là muốn trò chuyện? <br/>
          Đừng ngần ngại nhắn tin cho chúng mình nhé.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        
        {/* Contact Info */}
        <div className="space-y-10 animate-fade-in-up delay-100">
           <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
              <h2 className="text-2xl font-serif font-bold text-stone-800 mb-8">Thông Tin Liên Lạc</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center shrink-0 text-terracotta">
                     <MapPin className="w-5 h-5" />
                   </div>
                   <div>
                     <h3 className="font-bold text-stone-900">Địa chỉ Tiệm</h3>
                     <p className="text-stone-600 text-sm mt-1">123 Phố Cổ, Quận Hoàn Kiếm, Hà Nội</p>
                     <p className="text-stone-500 text-xs mt-1 italic">(Vui lòng đặt lịch trước khi ghé thăm)</p>
                   </div>
                </div>

                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center shrink-0 text-terracotta">
                     <Phone className="w-5 h-5" />
                   </div>
                   <div>
                     <h3 className="font-bold text-stone-900">Điện thoại / Zalo</h3>
                     <p className="text-stone-600 text-sm mt-1">090 123 4567</p>
                   </div>
                </div>

                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center shrink-0 text-terracotta">
                     <Mail className="w-5 h-5" />
                   </div>
                   <div>
                     <h3 className="font-bold text-stone-900">Email</h3>
                     <p className="text-stone-600 text-sm mt-1">hi@minhthuhandmade.vn</p>
                   </div>
                </div>

                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center shrink-0 text-terracotta">
                     <Clock className="w-5 h-5" />
                   </div>
                   <div>
                     <h3 className="font-bold text-stone-900">Giờ làm việc</h3>
                     <p className="text-stone-600 text-sm mt-1">Thứ 2 - Thứ 7: 9:00 - 20:00</p>
                     <p className="text-stone-600 text-sm">Chủ Nhật: 10:00 - 18:00</p>
                   </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-stone-100">
                 <h3 className="font-bold text-stone-900 mb-4">Theo dõi chúng mình</h3>
                 <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-stone-800 text-white flex items-center justify-center hover:bg-terracotta transition-colors"><Facebook className="w-5 h-5" /></a>
                    <a href="#" className="w-10 h-10 rounded-full bg-stone-800 text-white flex items-center justify-center hover:bg-terracotta transition-colors"><Instagram className="w-5 h-5" /></a>
                    <a href="#" className="w-10 h-10 rounded-full bg-stone-800 text-white flex items-center justify-center hover:bg-terracotta transition-colors"><Twitter className="w-5 h-5" /></a>
                 </div>
              </div>
           </div>
        </div>

        {/* Contact Form */}
        <div className="animate-fade-in-up delay-200">
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-stone-100">
             <h2 className="text-2xl font-serif font-bold text-stone-800 mb-2">Gửi Tin Nhắn</h2>
             <p className="text-stone-500 text-sm mb-8">Chúng mình sẽ trả lời qua email trong vòng 24h.</p>
             
             <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                   <label className="block text-sm font-medium text-stone-700 mb-2">Họ tên của bạn</label>
                   <input 
                     type="text" 
                     name="name" 
                     required
                     value={formData.name}
                     onChange={handleChange}
                     className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-terracotta focus:border-terracotta outline-none transition-all"
                     placeholder="Ví dụ: Minh Thư"
                   />
                </div>

                <div>
                   <label className="block text-sm font-medium text-stone-700 mb-2">Email liên hệ</label>
                   <input 
                     type="email" 
                     name="email"
                     required
                     value={formData.email}
                     onChange={handleChange}
                     className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-terracotta focus:border-terracotta outline-none transition-all"
                     placeholder="name@example.com"
                   />
                </div>

                <div>
                   <label className="block text-sm font-medium text-stone-700 mb-2">Chủ đề</label>
                   <input 
                     type="text" 
                     name="subject"
                     required
                     value={formData.subject}
                     onChange={handleChange}
                     className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-terracotta focus:border-terracotta outline-none transition-all"
                     placeholder="Tư vấn đặt hàng..."
                   />
                </div>

                <div>
                   <label className="block text-sm font-medium text-stone-700 mb-2">Lời nhắn</label>
                   <textarea 
                     name="message"
                     rows={4}
                     required
                     value={formData.message}
                     onChange={handleChange}
                     className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-terracotta focus:border-terracotta outline-none transition-all"
                     placeholder="Nhập nội dung cần hỗ trợ..."
                   ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-stone-800 text-white py-4 rounded-xl font-bold hover:bg-stone-900 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-wait"
                >
                   {isSubmitting ? 'Đang gửi...' : <><Send className="w-4 h-4" /> Gửi Tin Nhắn</>}
                </button>
             </form>
          </div>
        </div>

      </div>

      {/* Map Placeholder (Simulated) */}
      <div className="max-w-7xl mx-auto mt-20 rounded-3xl overflow-hidden h-80 shadow-md grayscale hover:grayscale-0 transition-all duration-700 relative group animate-fade-in-up delay-300">
         <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Map Location" />
         <div className="absolute inset-0 bg-stone-900/20 flex items-center justify-center">
             <button className="px-6 py-3 bg-white text-stone-900 rounded-full font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
                <MapPin className="w-5 h-5 text-terracotta" /> Xem trên Google Maps
             </button>
         </div>
      </div>
    </div>
  );
};

export default Contact;

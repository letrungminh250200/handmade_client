import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { LOGO_SRC_NO_BG } from '@/lib/utils';

const Footer: React.FC = () => {


  return (
    <footer className="bg-stone-100 pt-12 pb-8 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
               <img src={LOGO_SRC_NO_BG} alt="Minh Thư Handmade" className="h-16 w-16 object-contain" />
            </div>
            <p className="text-stone-600 text-sm leading-relaxed max-w-xs">
              Mang đến những sản phẩm thủ công đầy tâm huyết, <br/>
              gìn giữ vẻ đẹp tự nhiên và sự mộc mạc.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-serif font-semibold text-stone-800 mb-4">Liên Hệ</h3>
            <ul className="space-y-2 text-stone-600 text-sm">
              <li>Địa chỉ: 123 Phố Cổ, Hà Nội</li>
              <li>Điện thoại: 090 123 4567</li>
              <li>Email: hi@minhthuhandmade.vn</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-serif font-semibold text-stone-800 mb-4">Theo Dõi</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-stone-500 hover:text-terracotta transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-stone-500 hover:text-terracotta transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-stone-500 hover:text-terracotta transition-colors"><Twitter className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-stone-200 pt-8 text-center">
          <p className="text-xs text-stone-500">&copy; 2024 Minh Thư Handmade. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
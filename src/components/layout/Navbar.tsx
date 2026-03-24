"use client";
import React from 'react';
import { ShoppingBag, Search, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { LOGO_SRC } from '@/lib/utils';

const Navbar: React.FC = () => {
  const { cartCount, setIsCartOpen } = useCart();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const isActive = (path: string) => pathname === path ? 'text-terracotta font-medium underline underline-offset-8' : 'text-stone-600 hover:text-stone-900';

  return (
    <nav className="sticky top-0 z-40 w-full bg-stone-50/95 backdrop-blur-md border-b border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24 md:h-28 transition-all duration-300">
          <Link href="/" className="flex-shrink-0 group py-2">
            <img 
              src={LOGO_SRC} 
              alt="Minh Thư Handmade Logo" 
              className="h-20 w-auto md:h-24 object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={isActive('/')}>Trang Chủ</Link>
            <Link href="/shop" className={isActive('/shop')}>Cửa Hàng</Link>
            <Link href="/news" className={isActive('/news')}>Tin Tức</Link>
            <Link href="/about" className={isActive('/about')}>Về Tiệm</Link>
            <Link href="/contact" className={isActive('/contact')}>Liên Hệ</Link>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-stone-400 cursor-not-allowed" title="Tính năng đang phát triển">
              <Search className="h-5 w-5" />
            </button>
            <button 
              className="p-2 text-stone-600 hover:text-stone-900 transition-colors relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-terracotta rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              className="md:hidden p-2 text-stone-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-stone-700">Trang Chủ</Link>
            <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-stone-700">Cửa Hàng</Link>
            <Link href="/news" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-stone-700">Tin Tức</Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-stone-700">Về Tiệm</Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-stone-700">Liên Hệ</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

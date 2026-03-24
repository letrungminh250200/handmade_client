"use client";
import React from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types';

interface RelatedProductsSidebarProps {
  products: Product[];
}

const RelatedProductsSidebar: React.FC<RelatedProductsSidebarProps> = ({ products }) => {
  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-stone-100">
      <h3 className="text-xl font-serif font-bold text-stone-900 mb-6 flex items-center gap-2 pb-4 border-b border-stone-100">
        Sản phẩm tương tự
      </h3>
      <div className="space-y-6 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
        {products.length === 0 ? (
          <p className="text-stone-500 italic text-sm">Chưa có sản phẩm liên quan.</p>
        ) : (
          products.map((rp) => (
            <div key={rp.id} className="group flex gap-4 items-center animate-fade-in-up">
              <div className="w-20 h-24 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0 relative">
                <img src={rp.image} alt={rp.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                {rp.originalPrice && rp.originalPrice > rp.price && (
                  <div className="absolute top-1 left-1 bg-terracotta text-white text-[8px] px-1 rounded font-bold">
                    -{Math.round(((rp.originalPrice - rp.price)/rp.originalPrice)*100)}%
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <Link href={`/product/${rp.slug || rp.id}`}>
                  <h4 className="text-sm font-bold text-stone-800 group-hover:text-terracotta transition-colors truncate">{rp.name}</h4>
                </Link>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-terracotta font-medium text-sm">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(rp.price)}
                  </p>
                  {rp.originalPrice && (
                    <p className="text-[10px] text-stone-400 line-through">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(rp.originalPrice)}
                    </p>
                  )}
                </div>
                <Link href={`/product/${rp.slug || rp.id}`} className="inline-block mt-2 text-[10px] uppercase font-bold text-stone-400 hover:text-stone-800 transition-colors">
                  Xem chi tiết
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
      <Link href="/shop" className="block w-full text-center py-3 bg-stone-50 rounded-xl text-stone-600 font-bold text-xs mt-8 hover:bg-stone-100 transition-colors">
        Xem tất cả cửa hàng
      </Link>
    </div>
  );
};

export default RelatedProductsSidebar;

"use client";
import React, { useState } from 'react';
import { Minus, Plus, ShoppingBag, Truck, ShieldCheck, RefreshCw, Star } from 'lucide-react';
import { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';

interface ProductInfoProps {
  product: Product;
  averageRating: string;
  reviewCount: number;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  averageRating,
  reviewCount
}) => {
  // Component tự quản lý state riêng
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant1, setSelectedVariant1] = useState<string>('');
  const [selectedVariant2, setSelectedVariant2] = useState<string>('');
  const [error, setError] = useState<string>('');
  
  const { addToCart } = useCart();

  // Logic xử lý trong component
  const handleAddToCart = () => {
    if (product.variant1.length > 0 && !selectedVariant1) {
      setError('Vui lòng chọn màu sắc');
      return;
    }
    if (product.variant2.length > 0 && !selectedVariant2) {
      setError('Vui lòng chọn kích thước');
      return;
    }
    addToCart(product.variantId || product.id, quantity);
    setError('');
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-terracotta uppercase tracking-wider">{product.category}</span>
        {reviewCount > 0 && (
          <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold">
            <Star className="w-4 h-4 fill-current" />
            <span>{averageRating} ({reviewCount})</span>
          </div>
        )}
      </div>
      
      <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">{product.name}</h1>
      
      <div className="flex items-center gap-4 mb-6">
        <p className="text-3xl font-bold text-stone-800">
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
        </p>
        {product.originalPrice && (
          <p className="text-xl text-stone-400 line-through">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.originalPrice)}
          </p>
        )}
      </div>

      <p className="text-stone-600 mb-8 leading-relaxed">
        {product.description}
      </p>

      <div className="space-y-8 pt-6 border-t border-stone-100">
        {product.variant1.length > 0 && (
          <div>
            <h4 className="text-sm font-bold text-stone-900 mb-4 flex items-center gap-2">
              Màu sắc: <span className="font-normal text-stone-500">{selectedVariant1 || 'Chưa chọn'}</span>
            </h4>
            <div className="flex flex-wrap gap-3">
              {product.variant1.map((v) => (
                <button
                  key={v}
                  onClick={() => { setSelectedVariant1(v); setError(''); }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                    selectedVariant1 === v ? 'bg-stone-800 text-white border-stone-800 shadow-md scale-105' : 'bg-white text-stone-600 border-stone-200 hover:border-terracotta'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        )}

        {product.variant2.length > 0 && (
          <div>
            <h4 className="text-sm font-bold text-stone-900 mb-4 flex items-center gap-2">
              Kích thước: <span className="font-normal text-stone-500">{selectedVariant2 || 'Chưa chọn'}</span>
            </h4>
            <div className="flex flex-wrap gap-3">
              {product.variant2.map((v) => (
                <button
                  key={v}
                  onClick={() => { setSelectedVariant2(v); setError(''); }}
                  className={`w-12 h-12 flex items-center justify-center rounded-xl text-sm font-bold transition-all border ${
                    selectedVariant2 === v ? 'bg-terracotta text-white border-terracotta shadow-md scale-105' : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-6">
          <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-4 hover:bg-stone-50 transition-colors">
              <Minus className="w-4 h-4 text-stone-600" />
            </button>
            <span className="px-4 text-stone-900 font-bold min-w-[3rem] text-center">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="p-4 hover:bg-stone-50 transition-colors">
              <Plus className="w-4 h-4 text-stone-600" />
            </button>
          </div>

          <button 
            onClick={handleAddToCart} 
            className="flex-1 bg-stone-800 text-white py-4 rounded-xl font-bold hover:bg-stone-900 transition-all shadow-lg flex items-center justify-center gap-3 active:scale-95"
          >
            <ShoppingBag className="w-5 h-5" /> Thêm vào giỏ
          </button>
        </div>
        {error && <p className="text-red-500 text-sm font-medium animate-pulse">{error}</p>}
      </div>

      <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-stone-100">
        <div className="text-center">
          <Truck className="w-6 h-6 mx-auto mb-2 text-stone-400" />
          <span className="text-xs text-stone-500 block">Giao hàng nhanh</span>
        </div>
        <div className="text-center">
          <ShieldCheck className="w-6 h-6 mx-auto mb-2 text-stone-400" />
          <span className="text-xs text-stone-500 block">Bảo hành uy tín</span>
        </div>
        <div className="text-center">
          <RefreshCw className="w-6 h-6 mx-auto mb-2 text-stone-400" />
          <span className="text-xs text-stone-500 block">Đổi trả 3 ngày</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;

"use client";
import React, { useRef, useState } from 'react';
import { Product } from '@/lib/types';
import { Plus, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  // 3D Tilt Logic
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    
    setRotation({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative perspective-1000 h-full"
      style={{ perspective: '1000px' }}
    >
      <div 
        className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-200 overflow-hidden border border-stone-100 h-full flex flex-col"
        style={{
          transform: isHovered 
            ? `rotateY(${rotation.x}deg) rotateX(${-rotation.y}deg) scale(1.02)` 
            : 'rotateY(0deg) rotateX(0deg) scale(1)',
          transition: isHovered ? 'none' : 'transform 0.5s ease-out',
          transformStyle: 'preserve-3d'
        }}
      >
        <Link href={`/${product.slug || product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-stone-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
            style={{ transform: isHovered ? 'scale(1.1) translateZ(20px)' : 'scale(1) translateZ(0)' }}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          
          {/* Discount Tag */}
          {discountPercentage > 0 && (
            <div className="absolute top-3 left-3 text-red-500 bg-red-50 text-[10px] font-bold px-2 py-1 rounded-md shadow-lg z-20 animate-pulse">
              -{discountPercentage}%
            </div>
          )}
        </Link>
        <div className="p-4 flex-1 flex flex-col" style={{ transform: 'translateZ(30px)' }}>
          <div>
             <div className="flex justify-between items-start mb-1">
                <p className="text-[10px] text-terracotta font-bold uppercase tracking-widest">{product.category}</p>
                {product.rating && (
                  <div className="flex items-center gap-0.5 text-yellow-500">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-[10px] font-bold">{product.rating}</span>
                  </div>
                )}
             </div>
             <Link href={`/${product.slug || product.id}`}>
              <h3 className="text-base font-serif font-medium text-stone-900 group-hover:text-terracotta transition-colors line-clamp-1 mb-1">
                {product.name}
              </h3>
             </Link>
             {product.soldCount !== undefined && (
               <p className="text-[10px] text-stone-400 mb-2">Đã bán {product.soldCount}</p>
             )}
          </div>
          <div className="mt-auto flex items-center justify-between pt-2 border-t border-stone-50">
            <div className="flex flex-col">
              <span className="text-stone-900 font-bold text-sm">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-stone-400 text-[10px] line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart({ product, variant1: product.variant1?.[0], variant2: product.variant2?.[0] });
              }}
              className="p-2 rounded-full bg-stone-100 text-stone-600 hover:bg-terracotta hover:text-white transition-all duration-300 transform active:scale-95 hover:shadow-md"
              aria-label="Thêm vào giỏ hàng"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

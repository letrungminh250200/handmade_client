"use client";
import React from 'react';
import { Heart } from 'lucide-react';
import { Product } from '@/lib/types';

interface ProductImageProps {
  product: Product;
  discountPercentage: number;
}

const ProductImage: React.FC<ProductImageProps> = ({ product, discountPercentage }) => {
  return (
    <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-stone-100 relative group">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
      />
      <button className="absolute top-4 right-4 p-3 bg-white/80 backdrop-blur-md rounded-full text-stone-400 hover:text-red-500 transition-colors">
        <Heart className="w-5 h-5" />
      </button>
      {discountPercentage > 0 && (
        <div className="absolute top-6 left-6 bg-terracotta text-white font-bold px-4 py-2 rounded-xl shadow-xl z-20">
          TIẾT KIỆM {discountPercentage}%
        </div>
      )}
    </div>
  );
};

export default ProductImage;

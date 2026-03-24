"use client";
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/lib/types';
import ProductCard from '@/components/ProductCard';

interface ProductSliderProps {
  title: string;
  products: Product[];
}

const ProductSlider: React.FC<ProductSliderProps> = ({ title, products }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - (clientWidth * 0.8) : scrollLeft + (clientWidth * 0.8);
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (products.length === 0) return null;

  return (
    <div className="mb-24 relative">
      <div className="flex items-center justify-between mb-8 px-2">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-900">{title}</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => scroll('left')}
            className="p-2.5 rounded-full border border-stone-200 bg-white shadow-sm hover:bg-stone-50 hover:border-stone-400 transition-all text-stone-600 active:scale-90"
            aria-label="Trượt trái"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-2.5 rounded-full border border-stone-200 bg-white shadow-sm hover:bg-stone-50 hover:border-stone-400 transition-all text-stone-600 active:scale-90"
            aria-label="Trượt phải"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-6 px-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((p) => (
          <div 
            key={p.id} 
            className="flex-none w-[70vw] sm:w-[40vw] lg:w-[calc(22%-1.5rem)] snap-start"
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;

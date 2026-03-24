"use client";
import React from 'react';
import { Check } from 'lucide-react';
import { Category } from '@/lib/types';

interface ProductFiltersProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
  selectedColor: string;
  onColorChange: (color: string) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  activeCategory,
  onCategoryChange,
  selectedColor,
  onColorChange
}) => {
  const categories: Category[] = ['All', 'Clothing', 'Bags', 'Accessories'];
  
  const colors = [
    { name: 'All', value: 'All', class: 'bg-white border-stone-300' },
    { name: 'Brown', value: 'Brown', class: 'bg-[#8B4513]' },
    { name: 'Beige', value: 'Beige', class: 'bg-[#D2B48C]' },
    { name: 'Cream', value: 'Cream', class: 'bg-[#FFFDD0] border-stone-200' },
    { name: 'Green', value: 'Green', class: 'bg-[#556B2F]' },
    { name: 'Blue', value: 'Blue', class: 'bg-[#4682B4]' },
    { name: 'White', value: 'White', class: 'bg-white border-stone-200' },
  ];

  return (
    <div className="flex flex-col items-center gap-6 mb-12">
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
              activeCategory === cat
                ? 'bg-stone-800 text-white border-stone-800 shadow-md'
                : 'bg-white text-stone-600 border-stone-200 hover:border-terracotta hover:text-terracotta'
            }`}
          >
            {cat === 'All' ? 'Tất cả' : cat === 'Clothing' ? 'Quần Áo' : cat === 'Bags' ? 'Túi Xách' : 'Phụ Kiện'}
          </button>
        ))}
      </div>

      {/* Color Filter */}
      <div className="flex flex-wrap items-center justify-center gap-3 bg-stone-50 px-6 py-3 rounded-full border border-stone-100">
        <span className="text-sm font-medium text-stone-500 mr-2">Màu sắc:</span>
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => onColorChange(color.value)}
            className={`relative w-8 h-8 rounded-full border transition-transform hover:scale-110 focus:outline-none ${color.class} ${
              selectedColor === color.value 
                ? 'ring-2 ring-offset-2 ring-terracotta scale-110' 
                : 'border-stone-200'
            }`}
            title={color.name === 'All' ? 'Tất cả màu' : color.name}
          >
            {selectedColor === color.value && color.name !== 'All' && (
              <span className="absolute inset-0 flex items-center justify-center">
                <Check className={`w-4 h-4 ${['White', 'Cream', 'Beige'].includes(color.name) ? 'text-stone-800' : 'text-white'}`} />
              </span>
            )}
            {color.name === 'All' && (
              <span className={`absolute inset-0 flex items-center justify-center text-[10px] font-bold ${selectedColor === 'All' ? 'text-stone-800' : 'text-stone-400'}`}>ALL</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductFilters;
